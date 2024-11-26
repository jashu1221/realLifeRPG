import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './slices/habitSlice';
import profileReducer from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    habits: habitReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;