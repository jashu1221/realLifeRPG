import React, { useState } from 'react';
import { AlertCircle, MessageSquare, Zap, Brain, Target, Volume2, Shield, Flame, Edit2, Flag } from 'lucide-react';

interface MotivationStyle {
  id: string;
  name: string;
  description: string;
  intensity: number;
  icon: any;
}

const motivationStyles: MotivationStyle[] = [
  {
    id: 'drill-sergeant',
    name: 'Drill Sergeant',
    description: 'Intense, no-excuses approach with direct feedback',
    intensity: 9,
    icon: Shield
  },
  {
    id: 'mentor',
    name: 'Strategic Mentor',
    description: 'Balanced guidance with constructive criticism',
    intensity: 6,
    icon: Brain
  },
  {
    id: 'challenger',
    name: 'Challenger',
    description: 'Competitive approach focused on surpassing limits',
    intensity: 8,
    icon: Target
  }
];

const focusAreas = [
  'Career Growth',
  'Skill Development',
  'Health & Fitness',
  'Financial Goals',
  'Personal Projects',
  'Leadership',
  'Learning',
  'Productivity'
];

export function SettingsContent() {
  const [selectedStyle, setSelectedStyle] = useState('drill-sergeant');
  const [rudenessLevel, setRudenessLevel] = useState(8);
  const [flexibility, setFlexibility] = useState(3);
  const [voiceVolume, setVoiceVolume] = useState(70);
  const [personalNote, setPersonalNote] = useState('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [customFocusArea, setCustomFocusArea] = useState('');
  const [systemInstructions, setSystemInstructions] = useState('');
  const [showCustomFocus, setShowCustomFocus] = useState(false);

  const handleToggleFocusArea = (area: string) => {
    setSelectedFocusAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const handleAddCustomFocus = () => {
    if (customFocusArea.trim()) {
      setSelectedFocusAreas(prev => [...prev, customFocusArea.trim()]);
      setCustomFocusArea('');
      setShowCustomFocus(false);
    }
  };

  return (
    <div className="max-h-[calc(100vh-10rem)] overflow-y-auto p-6 space-y-6">
      {/* Personal Note Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Edit2 className="w-5 h-5 text-[#4F46E5]" />
          Personal Note
        </h3>
        <div className="relative">
          <textarea
            value={personalNote}
            onChange={(e) => setPersonalNote(e.target.value)}
            placeholder="Write a personal note about your goals, motivations, or what you want to achieve..."
            rows={4}
            className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-4 py-3
              text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50
              resize-none"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
            Share your story with the system
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Flag className="w-5 h-5 text-[#4F46E5]" />
          Priority Areas
        </h3>
        <div className="flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <button
              key={area}
              onClick={() => handleToggleFocusArea(area)}
              className={`px-3 py-1.5 rounded-lg border transition-all text-sm ${
                selectedFocusAreas.includes(area)
                  ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30 text-[#4F46E5]'
                  : 'border-[#2A2B35]/50 text-gray-400 hover:border-[#4F46E5]/30'
              }`}
            >
              {area}
            </button>
          ))}
          {!showCustomFocus ? (
            <button
              onClick={() => setShowCustomFocus(true)}
              className="px-3 py-1.5 rounded-lg border border-dashed border-[#4F46E5]/30 
                text-[#4F46E5] hover:bg-[#4F46E5]/10 transition-all text-sm"
            >
              + Custom Area
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customFocusArea}
                onChange={(e) => setCustomFocusArea(e.target.value)}
                placeholder="Add custom area"
                className="bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-3 py-1.5
                  text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none 
                  focus:border-[#4F46E5]/50"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomFocus()}
              />
              <button
                onClick={() => setShowCustomFocus(false)}
                className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Motivation Style Selection */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Motivation Style</h3>
        <div className="grid grid-cols-3 gap-4">
          {motivationStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-4 rounded-lg border transition-all text-left group ${
                selectedStyle === style.id
                  ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30 text-[#4F46E5]'
                  : 'bg-[#2A2B35]/30 border-[#2A2B35]/50 text-gray-400 hover:border-[#4F46E5]/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <style.icon className="w-5 h-5" />
                <span className="font-medium">{style.name}</span>
              </div>
              <p className="text-xs text-gray-400">{style.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* System Instructions */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#4F46E5]" />
          System Instructions
        </h3>
        <div className="relative">
          <textarea
            value={systemInstructions}
            onChange={(e) => setSystemInstructions(e.target.value)}
            placeholder="Give specific instructions on how you want the system to interact with you, motivate you, or help you achieve your goals..."
            rows={4}
            className="w-full bg-[#2A2B35]/30 border border-[#2A2B35]/50 rounded-lg px-4 py-3
              text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50
              resize-none"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
            Be specific about your preferences
          </div>
        </div>
      </section>

      {/* Personality Settings */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">System Personality</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Rudeness Level</span>
              <span className="text-[#4F46E5]">{rudenessLevel}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={rudenessLevel}
              onChange={(e) => setRudenessLevel(parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Higher levels result in more aggressive feedback
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">System Flexibility</span>
              <span className="text-[#4F46E5]">{flexibility}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={flexibility}
              onChange={(e) => setFlexibility(parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Determines how easily the system accepts excuses
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Voice Volume</span>
              <span className="text-[#4F46E5]">{voiceVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={voiceVolume}
              onChange={(e) => setVoiceVolume(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Quick Settings */}
      <section className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50 space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#4F46E5]" />
            <h4 className="text-sm font-medium text-white">Reminders</h4>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46E5]">
            </div>
          </label>
        </div>

        <div className="p-4 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50 space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#4F46E5]" />
            <h4 className="text-sm font-medium text-white">Daily Check-ins</h4>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46E5]">
            </div>
          </label>
        </div>

        <div className="p-4 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50 space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#4F46E5]" />
            <h4 className="text-sm font-medium text-white">Intense Mode</h4>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46E5]">
            </div>
          </label>
        </div>
      </section>

      {/* Save Button */}
      <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] 
        hover:from-[#4338CA] hover:to-[#6D28D9] text-white font-medium transition-all
        flex items-center justify-center gap-2">
        Save Configuration
      </button>
    </div>
  );
}