import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { 
  Mountain, Calendar, Target, Flag, Plus, Clock, 
  ChevronDown, ChevronUp, X, AlertCircle 
} from 'lucide-react';

interface AddBigPictureGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGoal?: BigPictureGoal;
  isEditing?: boolean;
}

interface BigPictureGoal {
  id?: string;
  title: string;
  description: string;
  timeframe: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'snoozed' | 'completed';
  snoozeUntil?: string;
  subgoals: SubGoal[];
  milestones: Milestone[];
}

interface SubGoal {
  id: string;
  title: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
}

interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  criteria: string;
}

export function AddBigPictureGoalModal({ 
  isOpen, 
  onClose, 
  initialGoal,
  isEditing = false 
}: AddBigPictureGoalModalProps) {
  const [title, setTitle] = useState(initialGoal?.title || '');
  const [description, setDescription] = useState(initialGoal?.description || '');
  const [timeframe, setTimeframe] = useState(initialGoal?.timeframe || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialGoal?.priority || 'medium');
  const [status, setStatus] = useState(initialGoal?.status || 'active');
  const [snoozeUntil, setSnoozeUntil] = useState(initialGoal?.snoozeUntil || '');
  const [showSnoozeOptions, setShowSnoozeOptions] = useState(false);
  const [subgoals, setSubgoals] = useState<SubGoal[]>(initialGoal?.subgoals || []);
  const [milestones, setMilestones] = useState<Milestone[]>(initialGoal?.milestones || []);
  const [showSubgoalForm, setShowSubgoalForm] = useState(false);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);

  // New subgoal form state
  const [newSubgoal, setNewSubgoal] = useState({
    title: '',
    deadline: '',
    priority: 'medium' as const
  });

  // New milestone form state
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    targetDate: '',
    criteria: ''
  });

  const priorityColors = {
    low: 'bg-green-500/10 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    high: 'bg-red-500/10 text-red-400 border-red-500/30'
  };

  const handleAddSubgoal = () => {
    if (newSubgoal.title && newSubgoal.deadline) {
      setSubgoals([...subgoals, {
        id: Date.now().toString(),
        ...newSubgoal
      }]);
      setNewSubgoal({
        title: '',
        deadline: '',
        priority: 'medium'
      });
      setShowSubgoalForm(false);
    }
  };

  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.targetDate) {
      setMilestones([...milestones, {
        id: Date.now().toString(),
        ...newMilestone
      }]);
      setNewMilestone({
        title: '',
        targetDate: '',
        criteria: ''
      });
      setShowMilestoneForm(false);
    }
  };

  const handleSnooze = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    setSnoozeUntil(date.toISOString().split('T')[0]);
    setStatus('snoozed');
    setShowSnoozeOptions(false);
  };

  const handleSubmit = () => {
    const goal = {
      title,
      description,
      timeframe,
      priority,
      status,
      snoozeUntil,
      subgoals,
      milestones
    };

    // Handle goal creation/update logic here
    console.log('Submitting goal:', goal);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {isEditing ? 'Edit Big Picture Goal' : 'Add Big Picture Goal'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/20 
                flex items-center justify-center border border-[#4F46E5]/20">
                <Mountain className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {isEditing ? 'Edit Big Picture Goal' : 'Add Big Picture Goal'}
                </h2>
                <p className="text-sm text-gray-400">Define your long-term vision</p>
              </div>
            </div>

            {isEditing && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSnoozeOptions(!showSnoozeOptions)}
                  className="px-3 py-1.5 rounded-lg bg-[#2A2B35]/30 text-gray-400 
                    hover:bg-[#2A2B35]/50 transition-all flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Snooze
                </button>
                {showSnoozeOptions && (
                  <div className="absolute right-0 mt-32 w-48 bg-[#1A1B23] border border-[#2A2B35]/50 
                    rounded-lg shadow-xl z-50 p-2">
                    {[1, 3, 7, 14, 30].map((days) => (
                      <button
                        key={days}
                        onClick={() => handleSnooze(days)}
                        className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-[#2A2B35]/50 
                          rounded-lg transition-all text-left"
                      >
                        Snooze for {days} day{days > 1 ? 's' : ''}
                      </button>
                    ))}
                    <div className="px-3 py-2">
                      <input
                        type="date"
                        value={snoozeUntil}
                        onChange={(e) => {
                          setSnoozeUntil(e.target.value);
                          setStatus('snoozed');
                        }}
                        className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg 
                          px-3 py-1.5 text-sm text-gray-400"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Main Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Goal Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your big picture goal"
                className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-4 py-3
                  text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your vision and what you want to achieve"
                rows={4}
                className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-4 py-3
                  text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50
                  resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Timeframe</label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-4 py-3
                    text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                >
                  <option value="">Select timeframe</option>
                  <option value="1">1 year</option>
                  <option value="3">3 years</option>
                  <option value="5">5 years</option>
                  <option value="10">10 years</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Priority</label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`flex-1 px-3 py-2 rounded-lg border capitalize transition-all ${
                        priority === p
                          ? priorityColors[p]
                          : 'border-[#2A2B35]/50 text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Subgoals Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-400">Subgoals</h3>
                <button
                  onClick={() => setShowSubgoalForm(!showSubgoalForm)}
                  className="px-2 py-1 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] text-sm
                    hover:bg-[#4F46E5]/20 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add Subgoal
                </button>
              </div>

              {showSubgoalForm && (
                <div className="p-4 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50 space-y-3">
                  <input
                    type="text"
                    value={newSubgoal.title}
                    onChange={(e) => setNewSubgoal({ ...newSubgoal, title: e.target.value })}
                    placeholder="Subgoal title"
                    className="w-full bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                      text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50"
                  />
                  <div className="flex gap-3">
                    <input
                      type="date"
                      value={newSubgoal.deadline}
                      onChange={(e) => setNewSubgoal({ ...newSubgoal, deadline: e.target.value })}
                      className="flex-1 bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                        text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                    />
                    <select
                      value={newSubgoal.priority}
                      onChange={(e) => setNewSubgoal({ 
                        ...newSubgoal, 
                        priority: e.target.value as 'low' | 'medium' | 'high' 
                      })}
                      className="flex-1 bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                        text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowSubgoalForm(false)}
                      className="px-3 py-1.5 rounded-lg text-gray-400 
                        hover:bg-[#2A2B35]/50 transition-all text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSubgoal}
                      className="px-3 py-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                        hover:bg-[#4F46E5]/20 transition-all text-sm"
                    >
                      Add Subgoal
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {subgoals.map((subgoal) => (
                  <div
                    key={subgoal.id}
                    className="p-3 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50
                      flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm text-gray-200">{subgoal.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">{subgoal.deadline}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[subgoal.priority]}`}>
                          {subgoal.priority}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSubgoals(subgoals.filter(sg => sg.id !== subgoal.id))}
                      className="p-1 rounded-lg hover:bg-[#2A2B35] text-gray-400 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-400">Milestones</h3>
                <button
                  onClick={() => setShowMilestoneForm(!showMilestoneForm)}
                  className="px-2 py-1 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] text-sm
                    hover:bg-[#4F46E5]/20 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add Milestone
                </button>
              </div>

              {showMilestoneForm && (
                <div className="p-4 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50 space-y-3">
                  <input
                    type="text"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                    placeholder="Milestone title"
                    className="w-full bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                      text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50"
                  />
                  <div className="flex gap-3">
                    <input
                      type="date"
                      value={newMilestone.targetDate}
                      onChange={(e) => setNewMilestone({ ...newMilestone, targetDate: e.target.value })}
                      className="flex-1 bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                        text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                    />
                  </div>
                  <textarea
                    value={newMilestone.criteria}
                    onChange={(e) => setNewMilestone({ ...newMilestone, criteria: e.target.value })}
                    placeholder="Success criteria"
                    rows={2}
                    className="w-full bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                      text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50
                      resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowMilestoneForm(false)}
                      className="px-3 py-1.5 rounded-lg text-gray-400 
                        hover:bg-[#2A2B35]/50 transition-all text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddMilestone}
                      className="px-3 py-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                        hover:bg-[#4F46E5]/20 transition-all text-sm"
                    >
                      Add Milestone
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="p-3 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm text-gray-200">{milestone.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">{milestone.targetDate}</span>
                        </div>
                        {milestone.criteria && (
                          <p className="text-xs text-gray-500 mt-2">{milestone.criteria}</p>
                        )}
                      </div>
                      <button
                        onClick={() => setMilestones(milestones.filter(m => m.id !== milestone.id))}
                        className="p-1 rounded-lg hover:bg-[#2A2B35] text-gray-400 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#2A2B35]/50">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-400 hover:bg-[#2A2B35]/50 
                transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] 
                transition-all flex items-center gap-2"
            >
              {isEditing ? 'Save Changes' : 'Create Goal'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}