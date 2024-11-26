export interface HitLevel {
  hits: number;
  title: string;
  difficulty: 'Show Up' | 'Easy' | 'Medium' | 'Hard';
  description?: string;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  completedAt: string;
  hits: number;
  note?: string;
}

export interface Habit {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: 'habit' | 'daily';
  frequency: 'daily' | 'weekly' | 'custom';
  activeDays?: string[];
  priority: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  currentStreak: number;
  bestStreak: number;
  totalHits: number;
  currentHits: number;
  maxHits: number;
  lastCompleted?: string;
  snoozeUntil?: string;
  snoozeReason?: string;
  status: 'active' | 'snoozed' | 'archived';
  createdAt: string;
  updatedAt: string;
  hitLevels: HitLevel[];
  tags?: string[];
  completions?: HabitCompletion[];
}

export interface HabitStats {
  totalCompletions: number;
  totalHits: number;
  averageHits: number;
  currentStreak: number;
  bestStreak: number;
}