import React, { useState } from 'react';
import { GoalCard } from '../components/goals/GoalCard';
import { GoalAIStrategist } from '../components/goals/GoalAIStrategist';
import { BigPictureToggle } from '../components/goals/BigPictureToggle';
import { BigPictureView } from '../components/goals/BigPictureView';

export function Goals() {
  const [showBigPicture, setShowBigPicture] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0B0E] p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 
          bg-clip-text text-transparent">
          {showBigPicture ? 'Big Picture Goals' : 'Goals'}
        </h1>
        <BigPictureToggle 
          isActive={showBigPicture} 
          onToggle={() => setShowBigPicture(!showBigPicture)} 
        />
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
        {/* Main Content */}
        <div className="col-span-8 overflow-y-auto pr-2">
          {showBigPicture ? (
            <BigPictureView />
          ) : (
            <GoalCard
              title="Launch a startup and gain traction"
              level={5}
              maxLevel={10}
              levelDescription="Achieve ₹1 Lakh in revenue"
              currentPlan="Complete user interviews with 5 potential customers"
              planType="week"
              progress={86}
              consistency={92}
              streak={15}
            />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4">
          <GoalAIStrategist />
        </div>
      </div>
    </div>
  );
}