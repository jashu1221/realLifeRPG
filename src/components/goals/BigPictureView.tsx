import React, { useState } from 'react';
import { Plus, Mountain, ChevronDown, ChevronUp, Target, Flag } from 'lucide-react';
import { BigPictureGoalCard } from './BigPictureGoalCard';
import { AddBigPictureGoalModal } from './AddBigPictureGoalModal';

interface BigPictureGoal {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  progress: number;
  linkedGoals: LinkedGoal[];
  status: 'active' | 'completed' | 'paused';
}

interface LinkedGoal {
  id: string;
  title: string;
  progress: number;
  type: 'milestone' | 'subgoal';
  status: 'active' | 'completed' | 'paused';
}

export function BigPictureView() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);

  const mockBigPictureGoals: BigPictureGoal[] = [
    {
      id: '1',
      title: 'Build a Successful Tech Company',
      description: 'Create a profitable SaaS business with global impact',
      timeframe: '5 years',
      progress: 35,
      status: 'active',
      linkedGoals: [
        {
          id: 'lg1',
          title: 'Launch MVP',
          progress: 75,
          type: 'milestone',
          status: 'active'
        },
        {
          id: 'lg2',
          title: 'Secure Seed Funding',
          progress: 20,
          type: 'subgoal',
          status: 'active'
        },
        {
          id: 'lg3',
          title: 'Build Core Team',
          progress: 45,
          type: 'milestone',
          status: 'active'
        }
      ]
    },
    {
      id: '2',
      title: 'Achieve Financial Independence',
      description: 'Build multiple income streams and investments',
      timeframe: '10 years',
      progress: 25,
      status: 'active',
      linkedGoals: [
        {
          id: 'lg4',
          title: 'Build Investment Portfolio',
          progress: 40,
          type: 'subgoal',
          status: 'active'
        },
        {
          id: 'lg5',
          title: 'Create Passive Income Sources',
          progress: 15,
          type: 'milestone',
          status: 'active'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/20 
            flex items-center justify-center border border-[#4F46E5]/20">
            <Mountain className="w-5 h-5 text-[#4F46E5]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Life Vision</h2>
            <p className="text-sm text-gray-400">Your long-term aspirations and goals</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] 
            transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Big Picture Goal
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {mockBigPictureGoals.map((goal) => (
          <BigPictureGoalCard
            key={goal.id}
            goal={goal}
            isExpanded={expandedGoalId === goal.id}
            onToggleExpand={() => setExpandedGoalId(
              expandedGoalId === goal.id ? null : goal.id
            )}
          />
        ))}
      </div>

      {/* Add Goal Modal */}
      <AddBigPictureGoalModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}