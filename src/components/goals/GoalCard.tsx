import React, { useState } from 'react';
import { Target, Star, Trophy, Sword, Flame, ChevronDown, ChevronUp, Plus, ArrowRight, Calendar } from 'lucide-react';
import { GoalStrategy } from './GoalStrategy';
import { GoalMilestones } from './GoalMilestones';
import { GoalLinkedHabits } from './GoalLinkedHabits';
import { GoalTargets } from './GoalTargets';
import { EditGoalModal } from './EditGoalModal';

interface GoalCardProps {
  title: string;
  level: number;
  maxLevel: number;
  levelDescription: string;
  currentPlan: string;
  planType: 'day' | 'week' | 'month';
  progress: number;
  consistency: number;
  streak: number;
}

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

export function GoalCard({
  title = "Launch startup and gain traction",
  level = 5,
  maxLevel = 10,
  levelDescription = "Achieve ₹1 Lakh in revenue",
  currentPlan = "Complete user interviews with 5 potential customers",
  planType = "week",
  progress = 86,
  consistency = 92,
  streak = 15,
}: GoalCardProps) {
  const [expandedSection, setExpandedSection] = useState<'habits' | 'strategy' | 'targets' | null>(null);
  const [activeStrategyTab, setActiveStrategyTab] = useState<'notes' | 'levels'>('notes');
  const [showEditModal, setShowEditModal] = useState(false);
  const [linkedHabits, setLinkedHabits] = useState<LinkedHabit[]>([]);

  const toggleSection = (section: 'habits' | 'strategy' | 'targets', e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleUpdateLinkedHabits = (newLinkedHabits: LinkedHabit[]) => {
    setLinkedHabits(newLinkedHabits);
  };

  return (
    <>
      <div 
        className="card-dark cursor-pointer"
        onClick={() => setShowEditModal(true)}
      >
        <div className="space-y-6 p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/20 
                flex items-center justify-center border border-[#4F46E5]/20 flex-shrink-0">
                <Target className="w-6 h-6 text-[#4F46E5]" />
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-bold text-white">{title}</h2>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                className="px-3 py-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                  border border-[#4F46E5]/30 flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Trophy className="w-4 h-4" />
                Main goal
              </button>
              <button 
                className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] 
                  border border-[#D4AF37]/30 flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Sword className="w-4 h-4" />
                Career growth
              </button>
            </div>
          </div>

          {/* Next Level & Weekly Plan */}
          <div className="grid grid-cols-2 gap-6">
            {/* Next Level Card */}
            <div className="bg-[#1A1B23]/50 rounded-xl overflow-hidden border border-[#2A2B35]/50
              hover:border-[#4F46E5]/30 transition-all group">
              <div className="p-4 border-b border-[#2A2B35]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#4F46E5]">
                    <Target className="w-5 h-5" />
                    <span className="font-semibold">Next Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm text-[#D4AF37]">+500 XP</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  {levelDescription}
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current Level</span>
                  <span className="text-[#4F46E5] font-medium">{level}/{maxLevel}</span>
                </div>
                <div className="relative">
                  <div className="h-2 bg-[#1A1B23] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full
                        transition-all duration-300 relative overflow-hidden group-hover:shadow-lg
                        group-hover:shadow-[#4F46E5]/20"
                      style={{ width: `${progress}%` }}
                    >
                      <div 
                        className="absolute inset-0 w-full h-full animate-shine"
                        style={{
                          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1) 50%, transparent)',
                          transform: 'skewX(-20deg)',
                        }}
                      />
                    </div>
                  </div>
                  {/* Level Markers */}
                  {Array.from({ length: maxLevel - 1 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 w-px bg-[#2A2B35]/50"
                      style={{ left: `${((i + 1) / maxLevel) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Plan Card */}
            <div className="bg-[#1A1B23]/50 rounded-xl overflow-hidden border border-[#2A2B35]/50
              hover:border-[#4F46E5]/30 transition-all group">
              <div className="p-4 border-b border-[#2A2B35]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#4F46E5]">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold capitalize">{planType}ly Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-300">{streak} days</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  {currentPlan}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Consistency</span>
                  <span className="text-[#4F46E5] font-medium">{consistency}%</span>
                </div>
                <div className="relative">
                  <div className="h-2 bg-[#1A1B23] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full
                        transition-all duration-300 relative overflow-hidden group-hover:shadow-lg
                        group-hover:shadow-[#4F46E5]/20"
                      style={{ width: `${consistency}%` }}
                    >
                      <div 
                        className="absolute inset-0 w-full h-full animate-shine"
                        style={{
                          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1) 50%, transparent)',
                          transform: 'skewX(-20deg)',
                        }}
                      />
                    </div>
                  </div>
                  {/* Consistency Markers */}
                  {[25, 50, 75].map((marker) => (
                    <div
                      key={marker}
                      className="absolute top-0 bottom-0 w-px bg-[#2A2B35]/50"
                      style={{ left: `${marker}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={(e) => toggleSection('habits', e)}
              className={`p-3 rounded-lg border transition-all flex items-center justify-between
                ${expandedSection === 'habits' 
                  ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30 text-[#4F46E5]' 
                  : 'border-[#2A2B35]/30 text-gray-400 hover:bg-[#2A2B35]/20'
                }`}
            >
              <span className="text-sm font-medium">Linked Habits</span>
              {expandedSection === 'habits' ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={(e) => toggleSection('strategy', e)}
              className={`p-3 rounded-lg border transition-all flex items-center justify-between
                ${expandedSection === 'strategy' 
                  ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30 text-[#4F46E5]' 
                  : 'border-[#2A2B35]/30 text-gray-400 hover:bg-[#2A2B35]/20'
                }`}
            >
              <span className="text-sm font-medium">Strategy</span>
              {expandedSection === 'strategy' ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={(e) => toggleSection('targets', e)}
              className={`p-3 rounded-lg border transition-all flex items-center justify-between
                ${expandedSection === 'targets' 
                  ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30 text-[#4F46E5]' 
                  : 'border-[#2A2B35]/30 text-gray-400 hover:bg-[#2A2B35]/20'
                }`}
            >
              <span className="text-sm font-medium">Targets</span>
              {expandedSection === 'targets' ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Sections */}
        {expandedSection && (
          <div 
            className="border-t border-[#2A2B35]/30 p-6 bg-[#1A1B23]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {expandedSection === 'habits' && (
              <GoalLinkedHabits
                linkedHabits={linkedHabits}
                onUpdateLinkedHabits={handleUpdateLinkedHabits}
              />
            )}

            {expandedSection === 'strategy' && (
              <div className="space-y-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveStrategyTab('notes')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeStrategyTab === 'notes'
                        ? 'bg-[#4F46E5] text-white'
                        : 'bg-[#2A2B35]/30 text-gray-400 hover:bg-[#2A2B35]/50'
                    }`}
                  >
                    Strategy Notes
                  </button>
                  <button
                    onClick={() => setActiveStrategyTab('levels')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeStrategyTab === 'levels'
                        ? 'bg-[#4F46E5] text-white'
                        : 'bg-[#2A2B35]/30 text-gray-400 hover:bg-[#2A2B35]/50'
                    }`}
                  >
                    Level Progression
                  </button>
                </div>

                {activeStrategyTab === 'notes' ? (
                  <GoalStrategy />
                ) : (
                  <GoalMilestones />
                )}
              </div>
            )}

            {expandedSection === 'targets' && (
              <GoalTargets />
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <EditGoalModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        goal={{
          id: '1',
          title,
          description: '',
          level,
          maxLevel,
          levelDescription,
          currentPlan,
          planType,
          progress,
          consistency,
          streak
        }}
      />
    </>
  );
}