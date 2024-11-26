import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { 
  Mountain, Target, Plus, Clock, X, Save,
  Tags, Calendar, AlertCircle
} from 'lucide-react';

interface EditGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: any;
  onUpdate: (updatedGoal: any) => void;
}

export function EditGoalModal({ 
  isOpen, 
  onClose, 
  goal,
  onUpdate 
}: EditGoalModalProps) {
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [tags, setTags] = useState<string[]>(goal.tags || []);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [status, setStatus] = useState(goal.status || 'active');
  const [snoozeUntil, setSnoozeUntil] = useState('');
  const [snoozeReason, setSnoozeReason] = useState('');
  const [showSnoozeOptions, setShowSnoozeOptions] = useState(false);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSnooze = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    setSnoozeUntil(date.toISOString().split('T')[0]);
    setStatus('snoozed');
  };

  const handleSaveSnooze = () => {
    if (snoozeUntil) {
      setStatus('snoozed');
      setShowSnoozeOptions(false);
    }
  };

  const handleSave = () => {
    const updatedGoal = {
      ...goal,
      title,
      description,
      tags,
      status,
      snoozeUntil: status === 'snoozed' ? snoozeUntil : null,
      snoozeReason: status === 'snoozed' ? snoozeReason : null
    };
    onUpdate(updatedGoal);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Edit Goal</DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/20 
                flex items-center justify-center border border-[#4F46E5]/20">
                <Mountain className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Edit Goal</h2>
                <p className="text-sm text-gray-400">Update your goal details</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSnoozeOptions(!showSnoozeOptions)}
                className="px-3 py-1.5 rounded-lg bg-[#2A2B35]/30 text-gray-400 
                  hover:bg-[#2A2B35]/50 transition-all flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Snooze
              </button>
            </div>
          </div>

          {/* Main Form */}
          <div className="space-y-6">
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

            {/* Tags Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <Tags className="w-4 h-4 text-[#4F46E5]" />
                  Tags
                </label>
                <button
                  onClick={() => setShowTagInput(true)}
                  className="text-sm px-2 py-1 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                    hover:bg-[#4F46E5]/20 transition-all flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Tag
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-3 py-1 rounded-full border bg-[#4F46E5]/10 text-[#4F46E5] 
                      border-[#4F46E5]/30 text-sm flex items-center gap-2 group"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-[#4F46E5] hover:text-[#4F46E5]/80"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {showTagInput && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="New tag"
                      className="bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-3 py-1.5
                        text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none 
                        focus:border-[#4F46E5]/50"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <button
                      onClick={() => setShowTagInput(false)}
                      className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Snooze Options */}
            {showSnoozeOptions && (
              <div className="space-y-4 p-4 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50">
                <div className="flex items-center gap-2 text-sm text-yellow-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Snooze this goal</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[1, 3, 7, 14, 30].map((days) => (
                    <button
                      key={days}
                      onClick={() => handleSnooze(days)}
                      className={`p-2 rounded-lg text-sm transition-all ${
                        snoozeUntil === new Date(Date.now() + days * 86400000).toISOString().split('T')[0]
                          ? 'bg-[#4F46E5]/20 text-[#4F46E5] border border-[#4F46E5]/30'
                          : 'bg-[#1A1B23]/50 text-gray-400 hover:bg-[#2A2B35]/50'
                      }`}
                    >
                      {days}d
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="date"
                      value={snoozeUntil}
                      onChange={(e) => setSnoozeUntil(e.target.value)}
                      className="w-full bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                        text-sm text-gray-400 focus:outline-none focus:border-[#4F46E5]/30"
                    />
                  </div>
                  <button
                    onClick={() => setSnoozeUntil('')}
                    className="p-2 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <textarea
                  value={snoozeReason}
                  onChange={(e) => setSnoozeReason(e.target.value)}
                  placeholder="Reason for snoozing (optional)"
                  rows={2}
                  className="w-full bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                    text-sm text-gray-400 placeholder:text-gray-500 focus:outline-none 
                    focus:border-[#4F46E5]/30 resize-none"
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowSnoozeOptions(false)}
                    className="px-3 py-1.5 rounded-lg text-gray-400 
                      hover:bg-[#2A2B35]/50 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSnooze}
                    className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400
                      hover:bg-yellow-500/20 transition-all text-sm border border-yellow-500/30
                      flex items-center gap-1.5"
                  >
                    <Clock className="w-4 h-4" />
                    Confirm Snooze
                  </button>
                </div>
              </div>
            )}
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