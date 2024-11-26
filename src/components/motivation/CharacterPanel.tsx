import React, { useState } from 'react';
import { Shield, Sword, Brain, Flame, Settings, Crown, Star, ChevronRight, Target, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { CharacterSelection } from './CharacterSelection';

interface Character {
  id: string;
  name: string;
  icon: typeof Shield;
  stats: {
    personality: number;
    socialCharm: number;
    healthFitness: number;
    intelligence: number;
    discipline: number;
  };
  archetype: string;
  description: string;
  keyTraits: string[];
  references: string[];
  quote: string;
}

const defaultCharacter: Character = {
  id: 'tyler',
  name: 'Tyler Durden',
  icon: Shield,
  stats: {
    personality: 10,
    socialCharm: 9,
    healthFitness: 9,
    intelligence: 8,
    discipline: 10
  },
  archetype: 'Alpha Revolutionary',
  description: `The embodiment of primal masculinity and anarchic freedom. Tyler represents the rejection of societal constraints and the embrace of authentic self-expression. He combines raw charisma with calculated intelligence, making him a natural leader who inspires others to break free from their mundane existence.`,
  keyTraits: [
    'Unshakeable confidence',
    'Natural leadership',
    'Physical prowess',
    'Psychological manipulation',
    'Zero fear of consequences'
  ],
  references: [
    'Fight Club',
    'Project Mayhem Leader',
    'Anti-consumerist Icon'
  ],
  quote: "You're not your job. You're not how much money you have in the bank."
};

const getRankFromStat = (value: number): string => {
  if (value === 10) return 'S';
  if (value >= 8) return 'A';
  if (value >= 6) return 'B';
  if (value >= 4) return 'C';
  if (value >= 2) return 'D';
  return 'E';
};

const getStatColor = (value: number): string => {
  if (value === 10) return 'text-red-400';
  if (value >= 8) return 'text-[#D4AF37]';
  if (value >= 6) return 'text-purple-400';
  if (value >= 4) return 'text-blue-400';
  if (value >= 2) return 'text-green-400';
  return 'text-gray-400';
};

export function CharacterPanel() {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  const statDescriptions = {
    personality: 'Raw charisma and force of personality',
    socialCharm: 'Ability to influence and persuade others',
    healthFitness: 'Physical prowess and vitality',
    intelligence: 'Mental acuity and strategic thinking',
    discipline: 'Self-control and unwavering focus'
  };

  // Group stats for 2-2-1 layout
  const statsGroups = [
    ['personality', 'socialCharm'],
    ['healthFitness', 'intelligence'],
    ['discipline']
  ];

  return (
    <div className="bg-[#1A1B23]/50 rounded-xl border border-[#2A2B35]/50 p-6 space-y-6">
      {/* Character Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/20 
            border border-[#4F46E5]/20 flex items-center justify-center relative group
            overflow-hidden transform hover:scale-105 transition-all duration-300">
            <character.icon className="w-7 h-7 text-[#4F46E5] relative z-10 
              transform group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/0 to-[#7C3AED]/20 
              group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 w-full h-full group-hover:animate-shine" 
              style={{
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1) 50%, transparent)',
                transform: 'skewX(-20deg)',
              }} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {character.name}
              <div className="flex items-center gap-1 ml-2">
                <Crown className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span className="text-sm text-[#D4AF37]">Level 8</span>
              </div>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/10 text-red-400 
                border border-red-500/20 animate-pulse">
                Intense Mode
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-[#4F46E5]/10 text-[#4F46E5] 
                border border-[#4F46E5]/20">
                {character.archetype}
              </span>
            </div>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 rounded-lg bg-[#2A2B35]/50 text-gray-400 
              hover:text-white hover:bg-[#2A2B35] transition-all transform hover:scale-105">
              <Settings className="w-5 h-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Choose Your Character</DialogTitle>
            </DialogHeader>
            <CharacterSelection onSelect={setCharacter} currentCharacter={character} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Character Stats */}
      <div className="space-y-3">
        {statsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.map((stat) => (
              <div
                key={stat}
                className={`relative bg-[#2A2B35]/30 rounded-lg p-3 border border-[#2A2B35]/50
                  hover:border-[#4F46E5]/30 transition-all group cursor-pointer overflow-hidden
                  transform hover:scale-[1.02] hover:-translate-y-0.5 duration-300
                  ${group.length === 1 ? 'sm:col-span-2' : ''}`}
                onMouseEnter={() => setHoveredStat(stat)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/0 to-[#7C3AED]/5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 w-full h-full opacity-0 group-hover:animate-shine"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1) 50%, transparent)',
                    transform: 'skewX(-20deg)',
                  }} />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${
                      hoveredStat === stat ? 'bg-[#4F46E5]/20' : 'bg-[#2A2B35]/50'
                    } flex items-center justify-center transition-colors duration-300
                      border ${hoveredStat === stat ? 'border-[#4F46E5]/30' : 'border-[#2A2B35]/50'}`}>
                      <Target className={`w-4 h-4 ${
                        hoveredStat === stat ? 'text-[#4F46E5]' : 'text-gray-400'
                      } transition-colors duration-300`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-white capitalize">
                          {stat.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <div className={`px-1.5 py-0.5 rounded text-xs ${getStatColor(character.stats[stat as keyof typeof character.stats])} 
                          border ${character.stats[stat as keyof typeof character.stats] === 10 ? 'border-red-500/30' : 'border-[#4F46E5]/30'}
                          ${character.stats[stat as keyof typeof character.stats] === 10 ? 'bg-red-500/10' : 'bg-[#4F46E5]/10'}`}>
                          {getRankFromStat(character.stats[stat as keyof typeof character.stats])}
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {statDescriptions[stat as keyof typeof statDescriptions]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]
                      bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      {character.stats[stat as keyof typeof character.stats]}
                    </div>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transform transition-all duration-300 ${
                      hoveredStat === stat ? 'translate-x-1 text-[#4F46E5]' : ''
                    }`} />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A1B23]">
                  <div className={`h-full transition-all duration-500 ${
                    hoveredStat === stat 
                      ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]' 
                      : 'bg-[#2A2B35]'
                  }`} style={{ width: `${(character.stats[stat as keyof typeof character.stats] / 10) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Key Traits */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400">Key Traits</h3>
          <button className="text-xs text-[#4F46E5] hover:text-[#4F46E5]/80 transition-colors
            flex items-center gap-1">
            <Plus className="w-3 h-3" />
            Add Trait
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {character.keyTraits.map((trait, index) => (
            <div
              key={index}
              className="p-2 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50
                hover:border-[#4F46E5]/30 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center
                  border border-[#4F46E5]/20">
                  <Star className="w-3 h-3 text-[#4F46E5]" />
                </div>
                <span className="text-sm text-gray-300">{trait}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Character Quote */}
      <div className="bg-[#2A2B35]/30 rounded-lg p-4 border border-[#2A2B35]/50 
        hover:border-[#4F46E5]/30 transition-all group">
        <p className="text-sm text-gray-400 italic relative">
          <span className="absolute -left-2 -top-2 text-2xl text-[#4F46E5]/20 
            group-hover:text-[#4F46E5]/40 transition-colors duration-300">"</span>
          {character.quote}
          <span className="absolute -right-2 -bottom-2 text-2xl text-[#4F46E5]/20 
            group-hover:text-[#4F46E5]/40 transition-colors duration-300">"</span>
        </p>
      </div>
    </div>
  );
}