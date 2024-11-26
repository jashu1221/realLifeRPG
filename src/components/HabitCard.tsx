import React, { useState } from 'react';
import { 
  SkipForward, Trophy, Flame, Target, Minus, Plus, 
  AlarmClock, Tags
} from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';
import { HabitModal } from './HabitModal';
import { useDraggable } from '@dnd-kit/core';
import { useHabits } from '../hooks/useHabits';

interface HitLevel {
  hits: number;
  description: string;
}

interface HabitCardProps {
  id: string;
  title: string;
  note?: string;
  maxCount?: number;
  streak?: number;
  hitLevels?: HitLevel[];
  tags?: string[];
}

export function HabitCard({ 
  id,
  title: initialTitle, 
  note: initialNote = "Build a consistent routine",
  maxCount = 4,
  streak = 0,
  hitLevels: initialHitLevels = [
    { hits: 1, description: 'Show up' },
    { hits: 2, description: '30 minutes' },
    { hits: 3, description: '1 hour' },
    { hits: 4, description: '2 hours' }
  ],
  tags = []
}: HabitCardProps) {
  const [count, setCount] = useState(0);
  const [showHitLevels, setShowHitLevels] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { completeHabit } = useHabits();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `habit-${id}`,
    data: {
      type: 'habit',
      title: initialTitle,
      duration: 60
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    cursor: 'grabbing'
  } : undefined;

  const handleIncrement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (count < maxCount) {
      setCount(count + 1);
      await completeHabit(id, 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (count > 0) setCount(count - 1);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <div 
          ref={setNodeRef}
          style={style}
          className="bg-[#1A1B23] border border-[#2A2B35]/50 rounded-xl p-4 
            hover:border-[#4F46E5]/30 transition-all cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-medium">{initialTitle}</h3>
                <p className="text-sm text-gray-400">{initialNote}</p>
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 rounded-full text-xs bg-[#4F46E5]/10 text-[#4F46E5] 
                          border border-[#4F46E5]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Trophy className={`w-5 h-5 ${count === maxCount ? 'text-[#FFD700]' : 'text-gray-600'}`} />
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-400">{streak}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4" onClick={e => e.stopPropagation()}>
              <div className="flex-1 flex items-center gap-2">
                <button 
                  onClick={handleDecrement}
                  className="p-1 rounded-lg hover:bg-[#2A2B35] text-gray-400 transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <div className="flex-1 text-center">
                  <span className="text-lg font-medium text-white">{count}/{maxCount}</span>
                </div>

                <button 
                  onClick={handleIncrement}
                  className="p-1 rounded-lg hover:bg-[#2A2B35] text-gray-400 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div {...attributes} {...listeners} className="flex items-center gap-2 cursor-grab active:cursor-grabbing">
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="p-1.5 rounded-lg hover:bg-[#2A2B35] text-gray-400 transition-all"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="p-1.5 rounded-lg hover:bg-[#2A2B35] text-gray-400 transition-all"
                >
                  <AlarmClock className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setShowHitLevels(!showHitLevels); 
                  }}
                  className="p-1.5 rounded-lg hover:bg-[#2A2B35] text-gray-400 transition-all"
                >
                  <Target className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-full bg-[#2A2B35]/30 rounded-full h-1">
              <div 
                className="bg-[#4F46E5] h-1 rounded-full transition-all"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <HabitModal
          id={id}
          title={initialTitle}
          note={initialNote}
          hitLevels={initialHitLevels}
          streak={streak}
          count={count}
          maxCount={maxCount}
          onClose={() => setIsModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}