import React, { useState } from 'react';
import { Crown, ChevronRight, Zap, Star } from 'lucide-react';
import { ProfileModal } from './profile/ProfileModal';
import { useAuth } from '../contexts/AuthContext';

export function UserProfile() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  return (
    <>
      <div 
        className="card-dark min-h-[200px] flex flex-col cursor-pointer hover:border-[#4F46E5]/30 
          transition-all group"
        onClick={() => setShowProfileModal(true)}
      >
        {/* Header Section */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] 
              flex items-center justify-center text-sm font-bold relative overflow-hidden
              shadow-lg shadow-indigo-500/20 flex-shrink-0">
              <span className="relative">{userProfile.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-semibold text-white truncate">{userProfile.name}</h2>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] 
                      border border-[#D4AF37]/20 whitespace-nowrap font-medium">
                      {userProfile.character_type || 'Shadow Monarch'}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 font-medium tracking-wide truncate">
                    Alter Ego: {userProfile.alter_ego || 'Not Set'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 text-red-400 
            border border-red-500/20 text-[10px] whitespace-nowrap font-medium flex-shrink-0">
            <Zap className="w-3 h-3" />
            {userProfile.settings?.intenseMode ? 'Intense' : 'Normal'}
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex-1 flex flex-col justify-center mt-2">
          {/* Rank Progress */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 
            bg-[#1A1B23]/50 rounded-lg p-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center
                border border-[#4F46E5]/20 flex-shrink-0">
                <Crown className="w-3.5 h-3.5 text-[#4F46E5]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-gray-400 font-medium">Current Rank</div>
                <div className="text-xs font-medium text-white truncate">Rank {userProfile.rank}</div>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-1.5 px-2">
              <div className="w-4 h-px bg-gradient-to-r from-[#4F46E5] to-[#D4AF37]"></div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            </div>
            
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center
                border border-[#D4AF37]/20 flex-shrink-0">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-gray-400 font-medium">Next Rank</div>
                <div className="text-xs font-medium text-white truncate">
                  Rank {String.fromCharCode(userProfile.rank.charCodeAt(0) - 1)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level & XP Progress */}
        <div className="mt-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-[#4F46E5]" />
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] 
                bg-clip-text text-transparent">
                Level {userProfile.level}
              </span>
            </div>
            <div className="flex-1 h-px bg-[#2A2B35]"></div>
            <div className="flex items-center gap-1 text-xs">
              <span className="font-medium text-[#4F46E5]">{userProfile.experience}</span>
              <span className="text-gray-500">/</span>
              <span className="font-medium text-gray-400">{userProfile.level * 1000}</span>
              <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide ml-0.5">XP</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="h-1.5 bg-[#1A1B23] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full
                  shadow-sm shadow-indigo-500/50 transition-all duration-300 ease-out
                  relative overflow-hidden"
                style={{ width: `${(userProfile.experience / (userProfile.level * 1000)) * 100}%` }}
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
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={userProfile}
      />
    </>
  );
}