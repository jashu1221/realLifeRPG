import React from 'react';
import { Flag } from 'lucide-react';

export function GoalStrategy() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Flag className="w-5 h-5 text-[#4F46E5]" />
          Strategy Notes
        </h3>
      </div>

      <div className="bg-[#1A1B23]/50 rounded-xl p-4 border border-[#2A2B35]/50">
        <textarea
          className="w-full h-[300px] bg-transparent text-gray-300 resize-none focus:outline-none"
          placeholder="Write your strategy notes here..."
        />
      </div>
    </div>
  );
}