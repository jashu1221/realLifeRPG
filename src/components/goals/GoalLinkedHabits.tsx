import React, { useState } from 'react';
import { Sparkles, Plus, Trophy, Flame, Target, Clock, Search, X, Check } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';

interface LinkedHabit {
  id: string;
  title: string;
  progress: number;
  streak: number;
  totalDays: number;
  completedDays: number;
  hits: number;
  totalHits: number;
  consistency: number;
  isCompleted: boolean;
  type: 'habit' | 'daily';
}

// Mock data for existing habits and dailies
const existingHabitsAndDailies: LinkedHabit[] = [
  {
    id: 'h1',
    title: 'Morning Workout',
    progress: 85,
    streak: 12,
    totalDays: 30,
    completedDays: 25,
    hits: 120,
    totalHits: 200,
    consistency: 83,
    isCompleted: true,
    type: 'habit'
  },
  {
    id: 'h2',
    title: 'Read Technical Books',
    progress: 70,
    streak: 8,
    totalDays: 30,
    completedDays: 20,
    hits: 80,
    totalHits: 150,
    consistency: 67,
    isCompleted: false,
    type: 'habit'
  },
  {
    id: 'd1',
    title: 'Code Review',
    progress: 90,
    streak: 15,
    totalDays: 30,
    completedDays: 28,
    hits: 28,
    totalHits: 30,
    consistency: 93,
    isCompleted: true,
    type: 'daily'
  },
  {
    id: 'd2',
    title: 'Team Standup',
    progress: 95,
    streak: 20,
    totalDays: 30,
    completedDays: 29,
    hits: 29,
    totalHits: 30,
    consistency: 97,
    isCompleted: true,
    type: 'daily'
  }
];

interface GoalLinkedHabitsProps {
  linkedHabits: LinkedHabit[];
  onUpdateLinkedHabits: (habits: LinkedHabit[]) => void;
}

export function GoalLinkedHabits({ linkedHabits, onUpdateLinkedHabits }: GoalLinkedHabitsProps) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'habit' | 'daily'>('all');
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);

  const filteredItems = existingHabitsAndDailies.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const notAlreadyLinked = !linkedHabits.some(h => h.id === item.id);
    return matchesSearch && matchesType && notAlreadyLinked;
  });

  const handleToggleHabitSelection = (habitId: string) => {
    setSelectedHabits(prev => 
      prev.includes(habitId) 
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  const handleLinkHabits = () => {
    const newLinkedHabits = existingHabitsAndDailies
      .filter(h => selectedHabits.includes(h.id));
    
    onUpdateLinkedHabits([...linkedHabits, ...newLinkedHabits]);
    setShowLinkModal(false);
    setSelectedHabits([]);
    setSearchQuery('');
    setSelectedType('all');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#4F46E5]" />
          Linked Habits & Dailies
        </h3>
        <button
          onClick={() => setShowLinkModal(true)}
          className="text-sm px-3 py-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
            hover:bg-[#4F46E5]/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Link Habit/Daily
        </button>
      </div>

      {/* Linked Items Grid */}
      <div className="grid grid-cols-3 gap-4">
        {linkedHabits.map((habit) => (
          <div
            key={habit.id}
            className="bg-[#1A1B23]/50 rounded-lg p-4 border border-[#2A2B35]/50
              hover:border-[#4F46E5]/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-white">{habit.title}</h4>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">{habit.streak}</span>
                </div>
                <Trophy className={`w-4 h-4 ${
                  habit.isCompleted ? 'text-[#D4AF37]' : 'text-gray-600'
                }`} />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 bg-[#2A2B35]/30 rounded-lg px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Target className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span className="text-sm font-medium text-white">
                    {habit.hits}/{habit.totalHits}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Hits</span>
              </div>

              <div className="flex-1 bg-[#2A2B35]/30 rounded-lg px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span className="text-sm font-medium text-white">
                    {habit.completedDays}/{habit.totalDays}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Days</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Consistency</span>
                <span className="text-[#4F46E5]">{habit.consistency}%</span>
              </div>
              <div className="h-1.5 bg-[#1A1B23] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full"
                  style={{ width: `${habit.consistency}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                habit.type === 'habit'
                  ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30'
                  : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
              }`}>
                {habit.type}
              </span>
              <button
                onClick={() => onUpdateLinkedHabits(linkedHabits.filter(h => h.id !== habit.id))}
                className="p-1 rounded-lg hover:bg-[#2A2B35] text-gray-400 
                  opacity-0 group-hover:opacity-100 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Link Modal */}
      <Dialog open={showLinkModal} onOpenChange={setShowLinkModal}>
        <DialogContent>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Link Habits & Dailies</h2>
              <button
                onClick={() => setShowLinkModal(false)}
                className="p-2 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search habits and dailies..."
                  className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg pl-10 pr-4 py-3
                    text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'habit', 'daily'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-lg border capitalize transition-all ${
                      selectedType === type
                        ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30 text-[#4F46E5]'
                        : 'border-[#2A2B35]/50 text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleHabitSelection(item.id)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedHabits.includes(item.id)
                      ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30'
                      : 'bg-[#2A2B35]/30 border-[#2A2B35]/50 hover:border-[#4F46E5]/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-white">{item.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.type === 'habit'
                            ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30'
                            : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-red-400" />
                          <span>{item.streak} streak</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3.5 h-3.5 text-[#7C3AED]" />
                          <span>{item.consistency}% consistent</span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border transition-all flex items-center 
                      justify-center ${
                      selectedHabits.includes(item.id)
                        ? 'bg-[#4F46E5]/20 border-[#4F46E5] text-[#4F46E5]'
                        : 'border-[#2A2B35]/50'
                    }`}>
                      {selectedHabits.includes(item.id) && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#2A2B35]/50">
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 rounded-lg text-gray-400 hover:bg-[#2A2B35]/50 
                  transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLinkHabits}
                disabled={selectedHabits.length === 0}
                className="px-4 py-2 rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] 
                  transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Link Selected Items
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}