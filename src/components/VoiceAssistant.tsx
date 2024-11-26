import React, { useState, useEffect } from 'react';
import { Mic, Radio } from 'lucide-react';

const assistantPhrases = [
  "Ready to level up, Hunter?",
  "System Assistant at your command",
  "Performing magic for you...",
  "Tracking your legendary progress",
  "Welcome back, Achievement Hunter"
];

export function VoiceAssistant() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % assistantPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-dark h-[200px] flex flex-col relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/5 to-[#7C3AED]/5" />
      <div className="relative flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/20 
              flex items-center justify-center border border-[#4F46E5]/20">
              <Radio className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300">System Assistant</h3>
              <p className="text-xs text-gray-500 h-4 overflow-hidden">
                {assistantPhrases[currentPhrase]}
              </p>
            </div>
          </div>
          <button className="p-2 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] hover:bg-[#4F46E5]/20 
            transition-all group-hover:animate-pulse">
            <Mic className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 flex items-center">
          <div className="w-full flex items-center gap-1">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full bg-[#4F46E5]/20 overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] transform origin-left scale-x-0 
                    group-hover:scale-x-100 transition-transform duration-300"
                  style={{
                    transitionDelay: `${i * 50}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto text-xs text-center text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity pb-2">
          {currentPhrase % 2 === 0 ? "Analyzing progress..." : "Casting enhancement spells..."}
        </div>
      </div>
    </div>
  );
}