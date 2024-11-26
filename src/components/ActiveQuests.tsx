import React from 'react';
import { Sword, Star, Clock, Target } from 'lucide-react';

export function ActiveQuests() {
  return (
    <div className="card-dark h-[200px] flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#4F46E5]/10 flex items-center justify-center">
            <Sword className="w-3.5 h-3.5 text-[#4F46E5]" />
          </div>
          <h3 className="text-sm font-medium text-gray-300">Active Quests</h3>
        </div>
        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#4F46E5]/10 text-[#4F46E5] 
          border border-[#4F46E5]/20 font-medium">2 new</span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#2A2B35] 
        scrollbar-track-transparent">
        <QuestItem 
          title="Master System Design"
          subtitle="Complete advanced architecture patterns"
          difficulty="S"
          rarity="legendary"
          xp={800}
          daysLeft={10}
          progress={75}
        />
        <QuestItem 
          title="Cloud Migration Project"
          subtitle="Migrate legacy systems to cloud infrastructure"
          difficulty="A"
          rarity="rare"
          xp={500}
          daysLeft={5}
          progress={45}
        />
        <QuestItem 
          title="API Optimization"
          subtitle="Improve API performance and response times"
          difficulty="B"
          rarity="common"
          xp={300}
          daysLeft={3}
          progress={25}
        />
        <QuestItem 
          title="Security Audit"
          subtitle="Conduct comprehensive security review"
          difficulty="A"
          rarity="rare"
          xp={600}
          daysLeft={7}
          progress={15}
        />
      </div>
    </div>
  );
}

interface QuestItemProps {
  title: string;
  subtitle: string;
  difficulty: 'S' | 'A' | 'B' | 'C' | 'D' | 'E';
  rarity: 'common' | 'rare' | 'legendary';
  xp: number;
  daysLeft: number;
  progress: number;
}

const difficultyColors = {
  'S': 'text-red-400 border-red-500/30 bg-red-500/10',
  'A': 'text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/10',
  'B': 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  'C': 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  'D': 'text-green-400 border-green-500/30 bg-green-500/10',
  'E': 'text-gray-400 border-gray-500/30 bg-gray-500/10',
};

const rarityConfig = {
  common: {
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    textColor: 'text-blue-400',
  },
  rare: {
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    textColor: 'text-purple-400',
  },
  legendary: {
    bgColor: 'bg-[#D4AF37]/10',
    borderColor: 'border-[#D4AF37]/20',
    textColor: 'text-[#D4AF37]',
  },
};

function QuestItem({ 
  title,
  subtitle,
  difficulty,
  rarity,
  xp, 
  daysLeft,
  progress
}: QuestItemProps) {
  const rarityStyle = rarityConfig[rarity];

  return (
    <div className="p-2.5 rounded-lg bg-[#1A1B23]/50 border border-[#2A2B35]/30 
      hover:border-[#4F46E5]/20 transition-all group">
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`px-1.5 rounded text-[10px] font-bold ${difficultyColors[difficulty]}`}>
              {difficulty}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-medium text-gray-200 truncate">{title}</h4>
              </div>
              <p className="text-[10px] text-gray-500 truncate mt-0.5">{subtitle}</p>
            </div>
          </div>

          {/* Rarity Badge */}
          <div className={`px-1.5 py-0.5 rounded text-[10px] font-medium
            ${rarityStyle.bgColor} ${rarityStyle.textColor} ${rarityStyle.borderColor} border`}>
            {rarity}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* XP */}
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-[10px] font-medium text-[#D4AF37]">{xp}</span>
            </div>

            {/* Days Left */}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-[10px] font-medium text-gray-400">{daysLeft}d</span>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1 bg-[#1A1B23] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full
                  transition-all duration-300 relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div 
                  className="absolute inset-0 w-full h-full animate-shine"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1) 50%, transparent)',
                    transform: 'skewX(-20deg)',
                  }}
                />
              </div>
            </div>
            <span className="text-[10px] font-medium text-gray-400">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}