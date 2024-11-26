import React from 'react';
import { Mountain, Target } from 'lucide-react';

interface BigPictureToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

export function BigPictureToggle({ isActive, onToggle }: BigPictureToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
        ${isActive 
          ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30' 
          : 'bg-[#2A2B35]/30 text-gray-400 border border-[#2A2B35]/50 hover:border-[#4F46E5]/30'
        }`}
    >
      {isActive ? (
        <>
          <Target className="w-4 h-4" />
          <span className="text-sm font-medium">Regular View</span>
        </>
      ) : (
        <>
          <Mountain className="w-4 h-4" />
          <span className="text-sm font-medium">Big Picture</span>
        </>
      )}
    </button>
  );
}