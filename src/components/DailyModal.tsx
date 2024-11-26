import React, { useState, useRef } from 'react';
import {
  Edit2,
  Save,
  Calendar,
  Clock,
  Link2,
  Plus,
  Tags,
  CheckSquare,
  Flag,
  X,
  AlertCircle,
} from 'lucide-react';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { HabitModalProgress } from './HabitModalProgress';
import HabitModalSnooze from './HabitModalSnooze';

interface DailyModalProps {
  title: string;
  priority: 'high' | 'medium' | 'low';
  days: string[];
  duration?: string;
  tags: string[];
  note?: string;
  checklist?: { id: string; text: string; completed: boolean }[];
  onClose?: () => void;
}

export function DailyModal({
  title: initialTitle,
  priority: initialPriority,
  days: initialDays,
  duration: initialDuration = '30 minutes',
  tags: initialTags,
  note: initialNote,
  checklist: initialChecklist = [],
  onClose,
}: DailyModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'progress'>('details');
  const [title, setTitle] = useState(initialTitle);
  const [priority, setPriority] = useState(initialPriority);
  const [days, setDays] = useState(initialDays);
  const [duration, setDuration] = useState(initialDuration);
  const [tags, setTags] = useState(initialTags);
  const [note, setNote] = useState(initialNote || '');
  const [checklist, setChecklist] = useState(initialChecklist);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const titleRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const priorityColors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem) {
      setChecklist([
        ...checklist,
        { id: Date.now().toString(), text: newChecklistItem, completed: false },
      ]);
      setNewChecklistItem('');
    }
  };

  const toggleDay = (day: string) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const handleSave = () => {
    // Save logic here
    onClose?.();
  };

  return (
    <div className="flex flex-col h-[80vh] max-h-[80vh]">
      <DialogHeader className="space-y-4 px-4">
        <div className="space-y-3">
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none 
              border-b border-transparent hover:border-[#4F46E5]/30 focus:border-[#4F46E5]
              transition-colors px-2 py-1"
            placeholder="Daily task title"
          />
          <textarea
            ref={noteRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-[#2A2B35]/20 rounded-lg px-3 py-2 text-sm text-gray-400 
              focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/50 resize-none h-16"
            placeholder="Add a note about your daily task..."
          />
        </div>
      </DialogHeader>

      <div className="flex items-center gap-6 border-b border-[#2A2B35]/50 mt-4 px-4">
        <button
          onClick={() => setActiveTab('details')}
          className={`flex items-center gap-2 px-1 py-2 text-sm font-medium 
            border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
        >
          Main Details
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex items-center gap-2 px-1 py-2 text-sm font-medium 
            border-b-2 transition-all ${
              activeTab === 'progress'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
        >
          Progress
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {activeTab === 'details' ? (
          <div className="space-y-6">
            {/* Main Details */}
            <section className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Priority
                </label>
                <div className="flex gap-2">
                  {(['high', 'medium', 'low'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1.5 rounded-lg border text-sm capitalize ${
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

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Days</label>
                <div className="flex gap-2">
                  {weekDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-lg border text-sm ${
                        days.includes(day)
                          ? 'bg-[#4F46E5]/20 text-[#4F46E5] border-[#4F46E5]/30'
                          : 'border-[#2A2B35]/50 text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-[#2A2B35]/20 rounded-lg px-3 py-2 text-sm text-gray-300
                    border border-[#2A2B35]/50 focus:outline-none focus:border-[#4F46E5]/30"
                >
                  <option value="15m">15 minutes</option>
                  <option value="30m">30 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="2h">2 hours</option>
                  <option value="4h">4 hours</option>
                </select>
              </div>
            </section>
            <section className="space-y-3">
              <HabitModalSnooze />
            </section>
            {/* Tags */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Tags className="w-5 h-5 text-[#4F46E5]" />
                  Tags
                </h3>
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
                      border-[#4F46E5]/30 text-sm flex items-center gap-2"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
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
                      className="bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-2 py-1
                        text-sm text-gray-300 focus:outline-none focus:border-[#4F46E5]/30"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <button
                      onClick={() => setShowTagInput(false)}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Checklist */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-[#4F46E5]" />
                  Checklist
                </h3>
              </div>

              <div className="space-y-2">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-[#2A2B35]/20 
                      border border-[#2A2B35]/50"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => {
                        setChecklist(
                          checklist.map((i) =>
                            i.id === item.id
                              ? { ...i, completed: !i.completed }
                              : i
                          )
                        );
                      }}
                      className="rounded border-[#2A2B35]"
                    />
                    <span
                      className={`flex-1 text-sm ${
                        item.completed
                          ? 'text-gray-500 line-through'
                          : 'text-gray-300'
                      }`}
                    >
                      {item.text}
                    </span>
                    <button
                      onClick={() =>
                        setChecklist(checklist.filter((i) => i.id !== item.id))
                      }
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    placeholder="Add checklist item"
                    className="flex-1 bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                      text-sm text-gray-300 focus:outline-none focus:border-[#4F46E5]/30"
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handleAddChecklistItem()
                    }
                  />
                  <button
                    onClick={handleAddChecklistItem}
                    className="px-3 py-2 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                      hover:bg-[#4F46E5]/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="w-full">
            <HabitModalProgress />
          </div>
        )}
      </div>

      <DialogFooter className="mt-6 px-4">
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#4F46E5] text-white 
              hover:bg-[#4338CA] transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </DialogFooter>
    </div>
  );
}
