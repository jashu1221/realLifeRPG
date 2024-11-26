import React, { useState } from 'react';
import { Trophy, Star, CheckCircle2, Lock, ArrowRight, Edit2, Plus, X, Save } from 'lucide-react';

interface Level {
  number: number;
  title: string;
  description: string;
  xp: number;
  isCompleted: boolean;
  isUnlocked: boolean;
}

interface EditingLevel {
  number: number;
  title: string;
  description: string;
  xp: number;
}

export function GoalMilestones() {
  const [levels, setLevels] = useState<Level[]>([
    {
      number: 1,
      title: "Find a Way to Earn",
      description: "Research and identify potential revenue streams",
      xp: 100,
      isCompleted: false,
      isUnlocked: true
    },
    {
      number: 2,
      title: "Launch MVP",
      description: "Create and launch minimum viable product",
      xp: 200,
      isCompleted: false,
      isUnlocked: false
    },
    {
      number: 3,
      title: "First Customers",
      description: "Acquire initial paying customers",
      xp: 300,
      isCompleted: false,
      isUnlocked: false
    },
    {
      number: 4,
      title: "Market Fit",
      description: "Achieve product-market fit",
      xp: 400,
      isCompleted: false,
      isUnlocked: false
    },
    {
      number: 5,
      title: "Scale Operations",
      description: "Expand team and operations",
      xp: 500,
      isCompleted: false,
      isUnlocked: false
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingLevel, setEditingLevel] = useState<EditingLevel | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLevel, setNewLevel] = useState<EditingLevel>({
    number: levels.length + 1,
    title: '',
    description: '',
    xp: 100
  });

  const handleLevelClick = (clickedLevel: Level) => {
    if (!isEditing && clickedLevel.isUnlocked) {
      // Find the index of the clicked level
      const levelIndex = levels.findIndex(l => l.number === clickedLevel.number);
      
      // Update the clicked level and unlock the next one
      const updatedLevels = levels.map((level, index) => {
        if (level.number === clickedLevel.number) {
          return { ...level, isCompleted: true };
        }
        if (index === levelIndex + 1) {
          return { ...level, isUnlocked: true };
        }
        return level;
      });

      setLevels(updatedLevels);
    }
  };

  const handleStartEdit = (level: Level) => {
    setEditingLevel({
      number: level.number,
      title: level.title,
      description: level.description,
      xp: level.xp
    });
  };

  const handleSaveEdit = () => {
    if (editingLevel) {
      setLevels(levels.map(level => 
        level.number === editingLevel.number
          ? { ...level, ...editingLevel }
          : level
      ));
      setEditingLevel(null);
    }
  };

  const handleAddLevel = () => {
    if (newLevel.title && newLevel.description) {
      const isFirstLevel = levels.length === 0;
      setLevels([...levels, { 
        ...newLevel, 
        isCompleted: false,
        isUnlocked: isFirstLevel // First level is always unlocked
      }]);
      setNewLevel({
        number: levels.length + 2,
        title: '',
        description: '',
        xp: 100
      });
      setShowAddForm(false);
    }
  };

  const handleRemoveLevel = (number: number) => {
    const updatedLevels = levels
      .filter(level => level.number !== number)
      .map((level, index) => ({ 
        ...level, 
        number: index + 1,
        isUnlocked: index === 0 ? true : level.isUnlocked // Ensure first level stays unlocked
      }));
    setLevels(updatedLevels);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#D4AF37]" />
          Level Progression
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-lg bg-[#2A2B35]/30 text-gray-400 
              hover:bg-[#2A2B35]/50 transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          {isEditing && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-3 py-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                hover:bg-[#4F46E5]/20 transition-all flex items-center gap-1.5
                border border-[#4F46E5]/30"
            >
              <Plus className="w-4 h-4" />
              Add Level
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        {/* Level Connection Lines */}
        <div className="absolute top-0 left-[1.75rem] bottom-0 w-px bg-gradient-to-b 
          from-[#4F46E5]/40 via-[#7C3AED]/40 to-[#2A2B35]/40 z-0" />

        <div className="relative z-10 space-y-2">
          {levels.map((level) => {
            const isEditable = isEditing && editingLevel?.number === level.number;

            return (
              <div
                key={level.number}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all backdrop-blur-sm
                  ${level.isUnlocked
                    ? 'bg-gradient-to-r from-[#4F46E5]/5 to-transparent'
                    : 'opacity-40'
                  }`}
              >
                {/* Level Number - Clickable */}
                <button
                  onClick={() => handleLevelClick(level)}
                  disabled={!level.isUnlocked || isEditing}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center relative
                    transition-all duration-300 ${
                    level.isCompleted 
                      ? 'bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/20 border border-[#4F46E5]/30'
                      : level.isUnlocked
                      ? 'bg-[#2A2B35]/30 border border-[#4F46E5]/30 hover:bg-[#4F46E5]/20'
                      : 'bg-[#2A2B35]/30 border border-[#2A2B35]/30'
                    } font-medium text-sm ${
                    level.isUnlocked && !isEditing ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  {level.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#4F46E5]" />
                  ) : level.isUnlocked ? (
                    <span className="text-[#4F46E5]">{level.number}</span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-gray-500" />
                  )}
                  {level.isUnlocked && !level.isCompleted && (
                    <div className="absolute -right-0.5 -top-0.5 w-2 h-2 rounded-full 
                      bg-[#4F46E5] animate-pulse" />
                  )}
                </button>

                {/* Level Content */}
                {isEditable ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editingLevel.title}
                      onChange={(e) => setEditingLevel({ ...editingLevel, title: e.target.value })}
                      className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-3 py-1.5
                        text-sm text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                      placeholder="Level title"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingLevel.description}
                        onChange={(e) => setEditingLevel({ ...editingLevel, description: e.target.value })}
                        className="flex-1 bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-3 py-1.5
                          text-sm text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                        placeholder="Level description"
                      />
                      <input
                        type="number"
                        value={editingLevel.xp}
                        onChange={(e) => setEditingLevel({ ...editingLevel, xp: parseInt(e.target.value) })}
                        className="w-24 bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-3 py-1.5
                          text-sm text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                        placeholder="XP"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingLevel(null)}
                        className="px-2 py-1 rounded-lg text-gray-400 
                          hover:bg-[#2A2B35]/50 transition-all text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-2 py-1 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                          hover:bg-[#4F46E5]/20 transition-all text-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-between min-w-0 group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium truncate ${level.isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                          {level.title}
                        </h4>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full 
                          bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                          <Star className="w-3 h-3 text-[#D4AF37]" />
                          <span className="text-xs text-[#D4AF37]">{level.xp}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{level.description}</p>
                    </div>

                    {isEditing && (
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(level)}
                          className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveLevel(level.number)}
                          className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-red-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {level.isUnlocked && !level.isCompleted && !isEditing && (
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-3 py-1 rounded-md bg-[#4F46E5]/10 text-[#4F46E5] text-xs
                          hover:bg-[#4F46E5]/20 transition-all flex items-center gap-1.5 
                          border border-[#4F46E5]/30">
                          Current
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Add Level Form */}
          {showAddForm && (
            <div className="p-4 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50 space-y-3">
              <input
                type="text"
                value={newLevel.title}
                onChange={(e) => setNewLevel({ ...newLevel, title: e.target.value })}
                className="w-full bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                  text-sm text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                placeholder="Level title"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLevel.description}
                  onChange={(e) => setNewLevel({ ...newLevel, description: e.target.value })}
                  className="flex-1 bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                    text-sm text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                  placeholder="Level description"
                />
                <input
                  type="number"
                  value={newLevel.xp}
                  onChange={(e) => setNewLevel({ ...newLevel, xp: parseInt(e.target.value) })}
                  className="w-24 bg-[#1A1B23]/50 border border-[#2A2B35]/50 rounded-lg px-3 py-2
                    text-sm text-gray-200 focus:outline-none focus:border-[#4F46E5]/50"
                  placeholder="XP"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 rounded-lg text-gray-400 
                    hover:bg-[#2A2B35]/50 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLevel}
                  className="px-3 py-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                    hover:bg-[#4F46E5]/20 transition-all text-sm"
                >
                  Add Level
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}