import React from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

export function MotivationStats() {
  return (
    <div className="bg-[#1A1B23]/50 rounded-xl border border-[#2A2B35]/50 p-6 space-y-6">
      {/* Overall Status */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-400">System Status</h3>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-lg font-medium text-white">Doubtful</span>
        </div>
        <p className="text-sm text-gray-400">
          Your recent performance shows inconsistency. Prove me wrong.
        </p>
      </div>

      {/* Weekly Progress */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-400">Weekly Progress</h3>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className={`h-8 rounded ${
                i <= 4
                  ? 'bg-[#4F46E5]/20 border border-[#4F46E5]/30'
                  : 'bg-[#2A2B35]/30 border border-[#2A2B35]/50'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Completion Rate</span>
          <span className="text-[#4F46E5]">71.4%</span>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: TrendingUp, label: 'Current Streak', value: '5 days' },
          { icon: Target, label: 'Tasks Complete', value: '24/30' },
          { icon: Calendar, label: 'Perfect Days', value: '12' },
          { icon: Award, label: 'Best Streak', value: '15 days' }
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#2A2B35]/30 rounded-lg p-3 border border-[#2A2B35]/50"
          >
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className="w-4 h-4 text-[#4F46E5]" />
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
            <span className="text-lg font-medium text-white">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Emotional Response */}
      <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-medium text-red-400">System Response</span>
        </div>
        <p className="text-sm text-gray-400">
          Your mediocre performance disappoints me. Step up your game or remain average forever.
        </p>
      </div>
    </div>
  );
}