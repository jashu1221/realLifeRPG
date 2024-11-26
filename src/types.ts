export interface Quest {
  id: string;
  title: string;
  description: string;
  experience: number;
  difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  completed: boolean;
  isNew?: boolean;
  deadline: string;
}

export interface Habit {
  id: string;
  title: string;
  streak: number;
  completed: boolean;
  type: 'daily' | 'weekly';
  impact: 'mental' | 'physical' | 'skill';
}

export interface TimeBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: string;
}

export interface UserStats {
  level: number;
  experience: number;
  requiredExperience: number;
  rank: string;
  achievements: number;
  streak: number;
  ranking: number;
  totalPlayers: number;
}