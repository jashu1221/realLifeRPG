import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Habit } from '../../types';

interface HabitState {
  habits: Habit[];
  selectedHabit: Habit | null;
  loading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  selectedHabit: null,
  loading: false,
  error: null,
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    setHabits: (state, action: PayloadAction<Habit[]>) => {
      console.log('habitSlice: Setting habits:', action.payload);
      state.habits = action.payload;
      state.error = null;
    },
    setSelectedHabit: (state, action: PayloadAction<Habit>) => {
      console.log('habitSlice: Setting selected habit:', action.payload);
      state.selectedHabit = action.payload;
      state.error = null;
    },
    clearSelectedHabit: (state) => {
      console.log('habitSlice: Clearing selected habit');
      state.selectedHabit = null;
    },
    clearHabitStats: (state) => {
      console.log('habitSlice: Clearing habit stats');
      // Clear any stats-related state if needed
    },
    updateHabitProgress: (state, action: PayloadAction<{ id: string; hits: number }>) => {
      console.log('habitSlice: Updating habit progress:', action.payload);
      const habit = state.habits.find(h => h.id === action.payload.id);
      if (habit) {
        habit.currentHits += action.payload.hits;
        habit.totalHits += action.payload.hits;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log('habitSlice: Setting loading:', action.payload);
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      console.log('habitSlice: Setting error:', action.payload);
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setHabits,
  setSelectedHabit,
  clearSelectedHabit,
  clearHabitStats,
  updateHabitProgress,
  setLoading,
  setError,
} = habitSlice.actions;

export default habitSlice.reducer;