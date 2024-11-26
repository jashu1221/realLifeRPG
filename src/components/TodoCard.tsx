import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, Clock, Tag, AlertCircle,
  ChevronDown, ChevronUp, Plus, X, Edit2, Flag
} from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';
import { TodoModal } from './TodoModal';

interface TodoCardProps {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  dueDate: string;
  timeEstimate?: string;
  tags: string[];
  note?: string;
  checklist?: { id: string; text: string; completed: boolean; }[];
}

export function TodoCard({
  title,
  difficulty,
  dueDate,
  timeEstimate,
  tags = [],
  note,
  checklist = []
}: TodoCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  const difficultyColors = {
    easy: 'text-green-400 bg-green-500/10',
    medium: 'text-yellow-400 bg-yellow-500/10',
    hard: 'text-red-400 bg-red-500/10'
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-[#1A1B23] border border-[#2A2B35]/50 rounded-xl p-4 
          hover:border-[#4F46E5]/30 transition-all cursor-pointer group">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCompleted(!isCompleted);
                  }}
                  className={`mt-1 p-1.5 rounded-lg transition-colors ${
                    isCompleted
                      ? 'bg-green-500/20 text-green-400'
                      : 'hover:bg-[#2A2B35] text-gray-400'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <div>
                  <h3 className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
                    {title}
                  </h3>
                  {note && (
                    <p className="text-sm text-gray-400 mt-1">{note}</p>
                  )}
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${difficultyColors[difficulty]}`}>
                {difficulty}
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{dueDate}</span>
              </div>
              {timeEstimate && (
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{timeEstimate}</span>
                </div>
              )}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs bg-[#4F46E5]/10 text-[#4F46E5]"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {checklist.length > 0 && (
              <div className="space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowChecklist(!showChecklist);
                  }}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300"
                >
                  {showChecklist ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Subtasks ({checklist.filter(item => item.completed).length}/{checklist.length})
                </button>
                {showChecklist && (
                  <div className="space-y-2 pl-6">
                    {checklist.map((item) => (
                      <div key={item.id} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={(e) => {
                            e.stopPropagation();
                            // Handle checklist item toggle
                          }}
                          className="mt-1"
                        />
                        <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <TodoModal
          title={title}
          difficulty={difficulty}
          dueDate={dueDate}
          timeEstimate={timeEstimate}
          tags={tags}
          note={note}
          checklist={checklist}
        />
      </DialogContent>
    </Dialog>
  );
}