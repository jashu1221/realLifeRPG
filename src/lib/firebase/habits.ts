import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Habit } from '../../types';

// Helper function to convert Firestore timestamps to regular dates
const convertTimestamps = (data: any) => {
  if (!data) return data;
  
  const result = { ...data };
  Object.keys(result).forEach(key => {
    if (result[key] instanceof Timestamp) {
      result[key] = result[key].toDate().toISOString();
    }
  });
  return result;
};

// Get user's habits collection reference
const getUserHabitsRef = (userId: string) => 
  collection(db, 'users', userId, 'habits');

// Default values for new habits
const defaultHabitValues = {
  type: 'habit',
  frequency: 'daily',
  priority: 'medium',
  difficulty: 'medium',
  maxHits: 4,
  status: 'active',
  currentStreak: 0,
  bestStreak: 0,
  totalHits: 0,
  currentHits: 0,
  tags: [],
  hitLevels: [
    { hits: 1, title: 'Show up', difficulty: 'Show Up' },
    { hits: 2, title: '30 minutes', difficulty: 'Easy' },
    { hits: 3, title: '1 hour', difficulty: 'Medium' },
    { hits: 4, title: '2 hours', difficulty: 'Hard' }
  ]
};

// Create a new habit
export const createHabit = async (userId: string, habitData: Partial<Habit>) => {
  try {
    console.log('Firebase createHabit: Starting to create habit:', habitData);
    const habitsRef = getUserHabitsRef(userId);
    
    const newHabit = {
      ...defaultHabitValues,
      ...habitData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(habitsRef, newHabit);
    console.log('Firebase createHabit: Successfully created habit');
    return { id: docRef.id, ...newHabit };
  } catch (error) {
    console.error('Firebase createHabit: Error creating habit:', error);
    throw error;
  }
};

// Get all habits for a user
export const getUserHabits = async (userId: string) => {
  try {
    console.log('Firebase getUserHabits: Fetching habits for user:', userId);
    const habitsRef = getUserHabitsRef(userId);
    const q = query(habitsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const habits = snapshot.docs.map(doc => ({
      id: doc.id,
      ...defaultHabitValues, // Apply defaults
      ...convertTimestamps(doc.data()) // Override with actual data
    }));
    console.log('Firebase getUserHabits: Successfully fetched habits:', habits);
    return habits;
  } catch (error) {
    console.error('Firebase getUserHabits: Error fetching habits:', error);
    throw error;
  }
};

// Get a single habit
export const getHabit = async (userId: string, habitId: string) => {
  try {
    console.log('Firebase getHabit: Fetching habit:', habitId);
    const habitRef = doc(db, 'users', userId, 'habits', habitId);
    const habitDoc = await getDoc(habitRef);
    
    if (!habitDoc.exists()) {
      throw new Error('Habit not found');
    }

    const habit = {
      id: habitDoc.id,
      ...defaultHabitValues, // Apply defaults
      ...convertTimestamps(habitDoc.data()) // Override with actual data
    };

    console.log('Firebase getHabit: Successfully fetched habit:', habit);
    return habit;
  } catch (error) {
    console.error('Firebase getHabit: Error fetching habit:', error);
    throw error;
  }
};

// Update a habit
export const updateHabit = async (userId: string, habitId: string, updates: Partial<Habit>) => {
  try {
    console.log('Firebase updateHabit: Starting to update habit:', habitId, updates);
    const habitRef = doc(db, 'users', userId, 'habits', habitId);
    
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };

    console.log('Firebase updateHabit: Prepared update data:', updateData);
    await updateDoc(habitRef, updateData);
    
    // Fetch the updated habit to return
    const updatedHabit = await getHabit(userId, habitId);
    console.log('Firebase updateHabit: Successfully updated habit:', updatedHabit);
    return updatedHabit;
  } catch (error) {
    console.error('Firebase updateHabit: Error updating habit:', error);
    throw error;
  }
};

// Complete a habit
export const completeHabit = async (userId: string, habitId: string, hits: number) => {
  try {
    console.log('Firebase completeHabit: Starting to complete habit:', habitId, 'hits:', hits);
    const batch = writeBatch(db);
    
    // Get habit reference
    const habitRef = doc(db, 'users', userId, 'habits', habitId);
    const habitDoc = await getDoc(habitRef);
    
    if (!habitDoc.exists()) {
      throw new Error('Habit not found');
    }

    const habitData = habitDoc.data() as Habit;
    
    // Calculate streak
    const lastCompleted = habitData.lastCompleted 
      ? (habitData.lastCompleted as unknown as Timestamp).toDate() 
      : null;
    
    const now = new Date();
    let newStreak = habitData.currentStreak || 0;

    if (!lastCompleted || isWithinStreakWindow(lastCompleted, now, habitData.frequency)) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    // Update habit
    batch.update(habitRef, {
      currentStreak: newStreak,
      bestStreak: Math.max(newStreak, habitData.bestStreak || 0),
      totalHits: (habitData.totalHits || 0) + hits,
      currentHits: (habitData.currentHits || 0) + hits,
      lastCompleted: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Add completion record
    const completionRef = doc(collection(db, 'users', userId, 'habits', habitId, 'completions'));
    batch.set(completionRef, {
      habitId,
      hits,
      completedAt: serverTimestamp()
    });

    await batch.commit();
    console.log('Firebase completeHabit: Successfully completed habit');

    // Return updated habit
    return await getHabit(userId, habitId);
  } catch (error) {
    console.error('Firebase completeHabit: Error completing habit:', error);
    throw error;
  }
};

// Snooze a habit
export const snoozeHabit = async (userId: string, habitId: string, snoozeUntil: string, snoozeReason?: string) => {
  try {
    console.log('Firebase snoozeHabit: Starting to snooze habit:', habitId);
    const habitRef = doc(db, 'users', userId, 'habits', habitId);
    
    await updateDoc(habitRef, {
      status: 'snoozed',
      snoozeUntil,
      snoozeReason: snoozeReason || null,
      updatedAt: serverTimestamp()
    });

    console.log('Firebase snoozeHabit: Successfully snoozed habit');
    return await getHabit(userId, habitId);
  } catch (error) {
    console.error('Firebase snoozeHabit: Error snoozing habit:', error);
    throw error;
  }
};

// Helper function to check if a date is within the streak window
const isWithinStreakWindow = (lastDate: Date, currentDate: Date, frequency: string = 'daily'): boolean => {
  const diffHours = (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60);
  
  switch (frequency) {
    case 'daily':
      return diffHours <= 36; // Allow for some flexibility
    case 'weekly':
      return diffHours <= 168 + 24; // 7 days + 1 day flexibility
    case 'custom':
      return diffHours <= 36; // Use daily window for custom frequency
    default:
      return false;
  }
};