import React, { useState } from 'react';
import { Shield, Sword, Brain, Crown, Check, Plus, Edit2 } from 'lucide-react';
import { CharacterEditor } from './CharacterEditor';

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

const characters = [
  {
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
  },
  {
    id: 'sigma',
    name: 'Sigma Wolf',
    icon: Crown,
    stats: {
      personality: 8,
      socialCharm: 7,
      healthFitness: 9,
      intelligence: 9,
      discipline: 10
    },
    archetype: 'Lone Wolf',
    description: `The ultimate self-made success archetype who operates outside traditional hierarchies. Combines high intelligence with strategic thinking and unwavering self-discipline. Values independence and personal achievement over social validation.`,
    keyTraits: [
      'Self-reliant',
      'Strategic mindset',
      'Emotional control',
      'Goal-oriented',
      'Independent thinking'
    ],
    references: [
      'John Wick',
      'Thomas Shelby',
      'Lone Wolf Mentality'
    ],
    quote: "I don't follow the path, I make it."
  }
];

interface CharacterSelectionProps {
  onSelect: (character: Character) => void;
  currentCharacter: Character;
}

export function CharacterSelection({ onSelect, currentCharacter }: CharacterSelectionProps) {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleEditCharacter = (character: Character, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCharacter(character);
    setShowEditor(true);
  };

  const handleCreateCharacter = () => {
    setSelectedCharacter(null);
    setShowEditor(true);
  };

  const handleSaveCharacter = (character: Character) => {
    onSelect(character);
    setShowEditor(false);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-6">
        {characters.map((char) => (
          <div
            key={char.id}
            onClick={() => onSelect(char)}
            className={`relative group overflow-hidden rounded-xl border transition-all cursor-pointer ${
              currentCharacter.id === char.id
                ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30'
                : 'bg-[#2A2B35]/30 border-[#2A2B35]/50 hover:border-[#4F46E5]/30'
            }`}
          >
            <div className="relative z-10 p-6 space-y-4">
              {/* Character Icon & Level */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/20 
                  border border-[#4F46E5]/20 flex items-center justify-center">
                  <char.icon className="w-7 h-7 text-[#4F46E5]" />
                </div>
                <div className="flex items-center gap-2">
                  {currentCharacter.id === char.id && (
                    <div className="w-6 h-6 rounded-full bg-[#4F46E5]/20 border border-[#4F46E5]/30 
                      flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#4F46E5]" />
                    </div>
                  )}
                  <button
                    onClick={(e) => handleEditCharacter(char, e)}
                    className="p-1.5 rounded-lg bg-[#2A2B35]/50 text-gray-400 
                      hover:text-white hover:bg-[#2A2B35] transition-all opacity-0 
                      group-hover:opacity-100"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Character Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{char.name}</h3>
                <p className="text-sm text-gray-400">{char.archetype}</p>
              </div>

              {/* Stats Preview */}
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(char.stats).slice(0, 4).map(([stat, value]) => (
                  <div key={stat} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span className="capitalize">{stat.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-[#4F46E5]">{value}</span>
                  </div>
                ))}
              </div>

              {/* Quote Preview */}
              <p className="text-xs text-gray-500 italic line-clamp-2">{char.quote}</p>
            </div>
          </div>
        ))}

        {/* Create New Character Button */}
        <div
          onClick={handleCreateCharacter}
          className="relative group overflow-hidden rounded-xl border border-dashed 
            border-[#4F46E5]/30 hover:border-[#4F46E5]/50 transition-all p-6
            flex flex-col items-center justify-center gap-4 text-[#4F46E5]
            hover:bg-[#4F46E5]/5 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center
            border border-[#4F46E5]/20">
            <Plus className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Create Character</h3>
            <p className="text-sm text-gray-400 mt-1">Add your own alter ego</p>
          </div>
        </div>
      </div>

      {/* Character Editor Modal */}
      {showEditor && (
        <CharacterEditor
          initialCharacter={selectedCharacter}
          onClose={() => setShowEditor(false)}
          onSave={handleSaveCharacter}
        />
      )}
    </>
  );
}