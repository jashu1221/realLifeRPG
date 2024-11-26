import React, { useState, useRef } from 'react';
import { 
  Edit2, Save, Calendar, Clock, Link2, Plus, 
  Tags, CheckSquare, Flag, X, AlertCircle
} from 'lucide-react';
import { 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from './ui/dialog';

interface TodoModalProps {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  dueDate: string;
  timeEstimate?: string;
  tags: string[];
  note?: string;
  checklist?: { id: string; text: string; completed: boolean; }[];
  onClose?: () => void;
}

export function TodoModal({
  title: initialTitle,
  difficulty: initialDifficulty,
  dueDate: initialDueDate,
  timeEstimate: initialTimeEstimate,
  tags: initialTags,
  note: initialNote,
  checklist: initialChecklist = [],
  onClose
}: TodoModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [timeEstimate, setTimeEstimate] = useState(initialTimeEstimate);
  const [tags, setTags] = useState(initialTags);
  const [note, setNote] = useState(initialNote || '');
  const [checklist, setChecklist] = useState(initialChecklist);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const titleRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30'
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
        { id: Date.now().toString(), text: newChecklistItem, completed: false }
      ]);
      setNewChecklistItem('');
    }
  };

  const handleSave = () => {
    // Save logic here
    onClose?.();
  };

  return (
    <div className="flex flex-col h-[80vh]">
      <DialogHeader className="space-y-4">
        <div className="space-y-3">
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none 
              border-b border-transparent hover:border-[#4F46E5]/30 focus:border-[#4F46E5]
              transition-colors px-2 py-1"
            placeholder="Task title"
          />
          <textarea
            ref={noteRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-[#2A2B35]/20 rounded-lg px-3 py-2 text-sm text-gray-400 
              focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/50 resize-none h-16"
            placeholder="Add a note about your task..."
          />
        </div>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto px-1 py-4 space-y-6">
        {/* Main Details */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-1 block">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#2A2B35]/20 rounded-lg px-3 py-2 text-sm text-gray-300
                  border border-[#2A2B35]/50 focus:outline-none focus:border-[#4F46E5]/30"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-1 block">Time Estimate</label>
              <select
                value={timeEstimate}
                onChange={(e) => setTimeEstimate(e.target.value)}
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
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Difficulty</label>
            <div className="flex gap-2">
              {(['easy', 'medium', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg border text-sm capitalize ${
                    difficulty === diff
                      ? difficultyColors[diff]
                      : 'border-[#2A2B35]/50 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
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
                  onClick={() => setTags(tags.filter(t => t !== tag))}
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
              Subtasks
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
                    setChecklist(checklist.map(i => 
                      i.id === item.id ? { ...i, completed: !i.completed } : i
                    ));
                  }}
                  className="rounded border-[#2A2B35]"
                />
                <span className={`flex-1 text-sm ${
                  item.completed ? 'text-gray-500 line-through' : 'text-gray-300'
                }`}>
                  {item.text}
                </span>
                <button
                  onClick={() => setChecklist(checklist.filter(i => i.id !== item.id))}
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
                placeholder="Add subtask"
                className="flex-1 bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                  text-sm text-gray-300 focus:outline-none focus:border-[#4F46E5]/30"
                onKeyPress={(e) => e.key === 'Enter' && handleAddChecklistItem()}
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

      <DialogFooter className="mt-6">
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