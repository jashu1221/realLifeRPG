import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { 
  Mountain, Calendar, Target, Flag, Plus, Clock, 
  ChevronDown, ChevronUp, X, AlertCircle, Save 
} from 'lucide-react';

interface EditBigPictureGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: any;
  onUpdate: (updatedGoal: any) => void;
}

export function EditBigPictureGoalModal({ 
  isOpen, 
  onClose, 
  goal,
  onUpdate 
}: EditBigPictureGoalModalProps) {
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [timeframe, setTimeframe] = useState(goal.timeframe);
  const [status, setStatus] = useState(goal.status);
  const [linkedGoals, setLinkedGoals] = useState(goal.linkedGoals);
  const [showLinkedGoalForm, setShowLinkedGoalForm] = useState(false);
  const [newLinkedGoal, setNewLinkedGoal] = useState({
    title: '',
    type: 'subgoal' as const,
    deadline: '',
    status: 'active' as const
  });

  const handleSave = () => {
    const updatedGoal = {
      ...goal,
      title,
      description,
      timeframe,
      status,
      linkedGoals
    };
    onUpdate(updatedGoal);
    onClose();
  };

  const handleAddLinkedGoal = () => {
    if (newLinkedGoal.title && newLinkedGoal.deadline) {
      setLinkedGoals([
        ...linkedGoals,
        {
          id: Date.now().toString(),
          progress: 0,
          ...newLinkedGoal
        }
      ]);
      setNewLinkedGoal({
        title: '',
        type: 'subgoal',
        deadline: '',
        status: 'active'
      });
      setShowLinkedGoalForm(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Edit Big Picture Goal</DialogTitle>
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
                <h2 className="text-xl font-semibold text-white">Edit Big Picture Goal</h2>
                <p className="text-sm text-gray-400">Modify your long-term vision</p>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Goal Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-4 py-3
                  text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                  <option value="1 year">1 year</option>
                  <option value="3 years">3 years</option>
                  <option value="5 years">5 years</option>
                  <option value="10 years">10 years</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-4 py-3
                    text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Linked Goals Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-400">Linked Goals</h3>
                <button
                  onClick={() => setShowLinkedGoalForm(true)}
                  className="text-sm px-3 py-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                    hover:bg-[#4F46E5]/20 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add Goal
                </button>
              </div>

              {showLinkedGoalForm && (
                <div className="p-4 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50 space-y-3">
                  <input
                    type="text"
                    value={newLinkedGoal.title}
                    onChange={(e) => setNewLinkedGoal({ ...newLinkedGoal, title: e.target.value })}
                    placeholder="Goal title"
                    className="w-full bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                      text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50"
                  />
                  <div className="flex gap-3">
                    <select
                      value={newLinkedGoal.type}
                      onChange={(e) => setNewLinkedGoal({ 
                        ...newLinkedGoal, 
                        type: e.target.value as 'milestone' | 'subgoal'
                      })}
                      className="flex-1 bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                        text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                    >
                      <option value="subgoal">Subgoal</option>
                      <option value="milestone">Milestone</option>
                    </select>
                    <input
                      type="date"
                      value={newLinkedGoal.deadline}
                      onChange={(e) => setNewLinkedGoal({ ...newLinkedGoal, deadline: e.target.value })}
                      className="flex-1 bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                        text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowLinkedGoalForm(false)}
                      className="px-3 py-1.5 rounded-lg text-gray-400 
                        hover:bg-[#2A2B35]/50 transition-all text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddLinkedGoal}
                      className="px-3 py-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                        hover:bg-[#4F46E5]/20 transition-all text-sm"
                    >
                      Add Goal
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {linkedGoals.map((linkedGoal: any, index: number) => (
                  <div
                    key={linkedGoal.id}
                    className="p-3 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50
                      flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm text-gray-200">{linkedGoal.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          linkedGoal.type === 'milestone'
                            ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30'
                            : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                        }`}>
                          {linkedGoal.type}
                        </span>
                        <span className="text-xs text-gray-400">{linkedGoal.deadline}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setLinkedGoals(linkedGoals.filter((_, i) => i !== index))}
                      className="p-1 rounded-lg hover:bg-[#2A2B35] text-gray-400 
                        opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
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
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] 
                transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}