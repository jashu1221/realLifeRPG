import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { useAuth } from '../contexts/AuthContext';
import { 
  setHabits,
  setSelectedHabit,
  clearSelectedHabit,
  clearHabitStats,
  updateHabitProgress,
  setLoading,
  setError
} from '../store/slices/habitSlice';
import { 
  createHabit as createHabitInDb,
  updateHabit as updateHabitInDb,
  completeHabit as completeHabitInDb,
  getUserHabits as getHabitsFromDb,
  snoozeHabit as snoozeHabitInDb,
  getHabit as getHabitFromDb
} from '../lib/firebase/habits';
import type { Habit } from '../types';

export function useHabits() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();
  const { habits, selectedHabit, loading, error } = useAppSelector((state) => state.habits);

  // Fetch habits when component mounts or user changes
  useEffect(() => {
    console.log('useHabits: Checking for user to fetch habits');
    if (currentUser) {
      console.log('useHabits: User found, fetching habits');
      fetchHabits();
    }
  }, [currentUser]);

  const fetchHabits = useCallback(async () => {
    if (!currentUser) {
      console.log('fetchHabits: No user found, skipping fetch');
      return;
    }
    
    try {
      dispatch(setLoading(true));
      console.log('fetchHabits: Starting to fetch habits for user', currentUser.uid);
      const fetchedHabits = await getHabitsFromDb(currentUser.uid);
      console.log('fetchHabits: Successfully fetched habits:', fetchedHabits);
      dispatch(setHabits(fetchedHabits));
    } catch (error: any) {
      console.error('fetchHabits: Error fetching habits:', error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentUser, dispatch]);

  const getHabit = useCallback(async (habitId: string) => {
    if (!currentUser) {
      console.log('getHabit: No user found, cannot fetch habit');
      return null;
    }

    try {
      dispatch(setLoading(true));
      const habit = await getHabitFromDb(currentUser.uid, habitId);
      return habit;
    } catch (error: any) {
      console.error('getHabit: Error fetching habit:', error);
      dispatch(setError(error.message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentUser, dispatch]);

  const createHabit = useCallback(async (habitData: Partial<Habit>) => {
    if (!currentUser) {
      console.log('createHabit: No user found, cannot create habit');
      return false;
    }

    try {
      dispatch(setLoading(true));
      console.log('createHabit: Starting to create habit:', habitData);
      const newHabit = await createHabitInDb(currentUser.uid, habitData);
      console.log('createHabit: Successfully created habit:', newHabit);
      await fetchHabits(); // Refresh habits list
      return true;
    } catch (error: any) {
      console.error('createHabit: Error creating habit:', error);
      dispatch(setError(error.message));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentUser, dispatch, fetchHabits]);

  const updateHabit = useCallback(async (id: string, updates: Partial<Habit>) => {
    if (!currentUser) {
      console.log('updateHabit: No user found, cannot update habit');
      return false;
    }

    try {
      dispatch(setLoading(true));
      console.log('updateHabit: Starting to update habit:', id, updates);
      
      const updatedHabit = await updateHabitInDb(currentUser.uid, id, updates);
      console.log('updateHabit: Successfully updated habit:', updatedHabit);
      await fetchHabits(); // Refresh habits list
      return true;
    } catch (error: any) {
      console.error('updateHabit: Error updating habit:', error);
      dispatch(setError(error.message));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentUser, dispatch, fetchHabits]);

  const snoozeHabit = useCallback(async (id: string, snoozeUntil: string, snoozeReason?: string) => {
    if (!currentUser) {
      console.log('snoozeHabit: No user found, cannot snooze habit');
      return false;
    }

    try {
      dispatch(setLoading(true));
      console.log('snoozeHabit: Starting to snooze habit:', id);
      const updatedHabit = await snoozeHabitInDb(currentUser.uid, id, snoozeUntil, snoozeReason);
      console.log('snoozeHabit: Successfully snoozed habit:', updatedHabit);
      await fetchHabits(); // Refresh habits list
      return true;
    } catch (error: any) {
      console.error('snoozeHabit: Error snoozing habit:', error);
      dispatch(setError(error.message));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentUser, dispatch, fetchHabits]);

  const completeHabit = useCallback(async (id: string, hits: number) => {
    if (!currentUser) {
      console.log('completeHabit: No user found, cannot complete habit');
      return false;
    }

    try {
      dispatch(setLoading(true));
      console.log('completeHabit: Starting to complete habit:', id, 'hits:', hits);
      const updatedHabit = await completeHabitInDb(currentUser.uid, id, hits);
      dispatch(updateHabitProgress({ id, hits }));
      console.log('completeHabit: Successfully completed habit:', updatedHabit);
      await fetchHabits(); // Refresh habits list
      return true;
    } catch (error: any) {
      console.error('completeHabit: Error completing habit:', error);
      dispatch(setError(error.message));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentUser, dispatch, fetchHabits]);

  const selectHabit = useCallback((habit: Habit) => {
    console.log('selectHabit: Selecting habit:', habit);
    dispatch(setSelectedHabit(habit));
  }, [dispatch]);

  const clearHabit = useCallback(() => {
    console.log('clearHabit: Clearing selected habit');
    dispatch(clearSelectedHabit());
    dispatch(clearHabitStats());
  }, [dispatch]);

  return {
    habits,
    loading,
    error,
    selectedHabit,
    fetchHabits,
    getHabit,
    createHabit,
    updateHabit,
    completeHabit,
    snoozeHabit,
    selectHabit,
    clearHabit,
  };
}