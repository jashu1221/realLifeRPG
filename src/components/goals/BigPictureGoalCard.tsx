import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Target, Flag, Plus, Edit2, Calendar, Search, X, Check } from 'lucide-react';
import { EditBigPictureGoalModal } from './EditBigPictureGoalModal';
import { Dialog, DialogContent } from '../ui/dialog';

interface BigPictureGoalProps {
  goal: {
    id: string;
    title: string;
    description: string;
    timeframe: string;
    progress: number;
    status: 'active' | 'completed' | 'paused';
    linkedGoals: Array<{
      id: string;
      title: string;
      progress: number;
      type: 'milestone' | 'subgoal';
      status: 'active' | 'completed' | 'paused';
    }>;
  };
  isExpanded: boolean;
  onToggleExpand: () => void;
}

// Mock existing goals - Replace with actual goals from your state management
const existingGoals = [
  {
    id: '1',
    title: 'Complete User Research',
    description: 'Conduct interviews and analyze user feedback',
    progress: 45,
    type: 'milestone',
    status: 'active'
  },
  {
    id: '2',
    title: 'Launch MVP',
    description: 'Release initial version to early adopters',
    progress: 30,
    type: 'milestone',
    status: 'active'
  },
  {
    id: '3',
    title: 'Marketing Strategy',
    description: 'Develop and implement marketing plan',
    progress: 20,
    type: 'subgoal',
    status: 'active'
  }
];

export function BigPictureGoalCard({ goal, isExpanded, onToggleExpand }: BigPictureGoalProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(goal);
  const [showLinkGoalsModal, setShowLinkGoalsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleUpdateGoal = (updatedGoal: typeof goal) => {
    setCurrentGoal(updatedGoal);
    setShowEditModal(false);
  };

  const filteredGoals = existingGoals.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !currentGoal.linkedGoals.some(lg => lg.id === g.id)
  );

  const handleToggleGoalSelection = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleLinkGoals = () => {
    const newLinkedGoals = existingGoals
      .filter(g => selectedGoals.includes(g.id))
      .map(g => ({
        id: g.id,
        title: g.title,
        progress: g.progress,
        type: g.type,
        status: g.status
      }));

    setCurrentGoal(prev => ({
      ...prev,
      linkedGoals: [...prev.linkedGoals, ...newLinkedGoals]
    }));

    setShowLinkGoalsModal(false);
    setSelectedGoals([]);
    setSearchQuery('');
  };

  return (
    <>
      <div className="bg-[#1A1B23]/95 border border-[#2A2B35]/50 rounded-xl overflow-hidden
        hover:border-[#4F46E5]/30 transition-all group">
        {/* Main Card Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-white">{currentGoal.title}</h3>
              <p className="text-sm text-gray-400">{currentGoal.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="p-2 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400 
                  transition-all opacity-0 group-hover:opacity-100"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={onToggleExpand}
                className="p-2 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400 
                  transition-all"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#4F46E5]" />
              <span className="text-sm text-gray-400">{currentGoal.timeframe}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#4F46E5]" />
              <span className="text-sm text-gray-400">
                {currentGoal.linkedGoals.length} Linked Goals
              </span>
            </div>
            <div className="px-2 py-1 rounded-lg text-xs bg-[#2A2B35]/50 text-gray-400 border border-[#2A2B35]/50">
              {currentGoal.status}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-[#4F46E5]">{currentGoal.progress}%</span>
            </div>
            <div className="h-1.5 bg-[#1A1B23] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full
                  transition-all duration-300 relative overflow-hidden"
                style={{ width: `${currentGoal.progress}%` }}
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
          </div>
        </div>

        {/* Linked Goals Section */}
        {isExpanded && (
          <div className="border-t border-[#2A2B35]/50 p-6 bg-[#1A1B23]/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Flag className="w-5 h-5 text-[#4F46E5]" />
                  Linked Goals
                </h4>
                <button 
                  onClick={() => setShowLinkGoalsModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                    hover:bg-[#4F46E5]/20 transition-all flex items-center gap-1.5
                    border border-[#4F46E5]/30"
                >
                  <Plus className="w-4 h-4" />
                  Link Goal
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {currentGoal.linkedGoals.map((linkedGoal) => (
                  <div
                    key={linkedGoal.id}
                    className="p-4 rounded-lg border border-[#2A2B35]/50 
                      hover:border-[#4F46E5]/30 transition-all bg-[#1A1B23]/50
                      group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="text-sm font-medium text-white">{linkedGoal.title}</h5>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block
                          ${linkedGoal.type === 'milestone'
                            ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30'
                            : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                          }`}>
                          {linkedGoal.type}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400 
                          transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-[#4F46E5]">{linkedGoal.progress}%</span>
                      </div>
                      <div className="h-1 bg-[#1A1B23] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full"
                          style={{ width: `${linkedGoal.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-0.5 rounded-full ${
                          linkedGoal.status === 'completed'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                            : linkedGoal.status === 'paused'
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                            : 'bg-[#2A2B35]/50 text-gray-400 border border-[#2A2B35]/50'
                        }`}>
                          {linkedGoal.status}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Mar 15</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <EditBigPictureGoalModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        goal={currentGoal}
        onUpdate={handleUpdateGoal}
      />

      {/* Link Goals Modal */}
      <Dialog open={showLinkGoalsModal} onOpenChange={setShowLinkGoalsModal}>
        <DialogContent>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Link Existing Goals</h2>
              <button
                onClick={() => setShowLinkGoalsModal(false)}
                className="p-2 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search goals..."
                className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg pl-10 pr-4 py-3
                  text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50"
              />
            </div>

            {/* Goals List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredGoals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => handleToggleGoalSelection(goal.id)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedGoals.includes(goal.id)
                      ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30'
                      : 'bg-[#2A2B35]/30 border-[#2A2B35]/50 hover:border-[#4F46E5]/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white">{goal.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{goal.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          goal.type === 'milestone'
                            ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30'
                            : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                        }`}>
                          {goal.type}
                        </span>
                        <span className="text-xs text-gray-400">{goal.progress}% complete</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border transition-all flex items-center 
                      justify-center ${
                      selectedGoals.includes(goal.id)
                        ? 'bg-[#4F46E5]/20 border-[#4F46E5] text-[#4F46E5]'
                        : 'border-[#2A2B35]/50'
                    }`}>
                      {selectedGoals.includes(goal.id) && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#2A2B35]/50">
              <button
                onClick={() => setShowLinkGoalsModal(false)}
                className="px-4 py-2 rounded-lg text-gray-400 hover:bg-[#2A2B35]/50 
                  transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLinkGoals}
                disabled={selectedGoals.length === 0}
                className="px-4 py-2 rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] 
                  transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Link Selected Goals
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}