import React, { useState, useRef, useEffect } from 'react';
import { Clock, X } from 'lucide-react';
import { TimeBlockingHeader } from './TimeBlockingHeader';
import { TimeDropdown } from './TimeDropdown';
import { TimeGrid } from './TimeGrid';
import { TimeBlock, TimeOption } from './types';
import { formatTime, to24Hour, calculateDuration, validateTimeBlock } from './utils';

export function TimeBlocking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [newBlockTitle, setNewBlockTitle] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState<TimeOption>({ hour: 9, minute: 0, period: 'AM' });
  const [selectedEndTime, setSelectedEndTime] = useState<TimeOption>({ hour: 10, minute: 0, period: 'AM' });
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [activeTimeField, setActiveTimeField] = useState<'start' | 'end' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Update current time every minute
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      setCurrentTime(minutes);

      // Scroll to current time (positioned at 1/3rd of the viewport)
      if (gridRef.current) {
        const totalMinutes = 24 * 60;
        const scrollPercentage = minutes / totalMinutes;
        const scrollHeight = gridRef.current.scrollHeight - gridRef.current.clientHeight;
        const targetScroll = scrollHeight * scrollPercentage;
        const oneThirdViewport = gridRef.current.clientHeight / 3;
        gridRef.current.scrollTop = targetScroll - oneThirdViewport;
      }
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowTimeDropdown(false);
        setActiveTimeField(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddTimeBlock = () => {
    if (!newBlockTitle) return;

    const validation = validateTimeBlock(selectedStartTime, selectedEndTime, timeBlocks);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    const startHour = to24Hour(selectedStartTime);
    const endHour = to24Hour(selectedEndTime);
    
    const startTimeStr = `${startHour.toString().padStart(2, '0')}:${selectedStartTime.minute.toString().padStart(2, '0')}`;
    const endTimeStr = `${endHour.toString().padStart(2, '0')}:${selectedEndTime.minute.toString().padStart(2, '0')}`;
    const duration = calculateDuration(selectedStartTime, selectedEndTime);

    const newBlock: TimeBlock = {
      id: `${Date.now()}`,
      title: newBlockTitle,
      startTime: startTimeStr,
      endTime: endTimeStr,
      type: 'custom',
      duration
    };

    setTimeBlocks([...timeBlocks, newBlock]);
    setNewBlockTitle('');
    setShowTimeDropdown(false);
    setActiveTimeField(null);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTimeBlock();
    }
  };

  const handleUpdateBlock = (id: string, title: string) => {
    setTimeBlocks(blocks => blocks.map(block => 
      block.id === id ? { ...block, title } : block
    ));
  };

  const handleDeleteBlock = (id: string) => {
    setTimeBlocks(blocks => blocks.filter(block => block.id !== id));
  };

  return (
    <div className="card-dark space-y-3">
      <TimeBlockingHeader 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Quick Add Form */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={newBlockTitle}
            onChange={(e) => setNewBlockTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add new time block"
            className="w-full input-dark text-sm"
          />
          {error && (
            <div className="absolute -bottom-6 left-0 text-xs text-red-400">
              {error}
            </div>
          )}
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setShowTimeDropdown(!showTimeDropdown);
              setActiveTimeField(activeTimeField ? null : 'start');
            }}
            className="p-2 rounded-lg bg-[#2A2B35]/30 border border-[#2A2B35]/50 
              text-gray-400 hover:border-[#4F46E5]/30 transition-colors"
            title="Set time"
          >
            <Clock className="w-4 h-4" />
          </button>
          {showTimeDropdown && (
            <div className="absolute right-0 mt-1 bg-[#1A1B23] border border-[#2A2B35]/50 
              rounded-lg shadow-xl p-4 z-50 min-w-[280px]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveTimeField('start')}
                    className={`text-left ${activeTimeField === 'start' ? 'text-[#4F46E5]' : 'text-gray-400'}`}
                  >
                    <div className="text-xs mb-1">Start Time</div>
                    <div className="text-sm font-medium">{formatTime(selectedStartTime)}</div>
                  </button>
                  <div className="text-gray-500">to</div>
                  <button
                    onClick={() => setActiveTimeField('end')}
                    className={`text-left ${activeTimeField === 'end' ? 'text-[#4F46E5]' : 'text-gray-400'}`}
                  >
                    <div className="text-xs mb-1">End Time</div>
                    <div className="text-sm font-medium">{formatTime(selectedEndTime)}</div>
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowTimeDropdown(false);
                    setActiveTimeField(null);
                  }}
                  className="p-1 rounded hover:bg-[#2A2B35] text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {activeTimeField && (
                <TimeDropdown
                  time={activeTimeField === 'start' ? selectedStartTime : selectedEndTime}
                  onChange={(time) => {
                    if (activeTimeField === 'start') {
                      setSelectedStartTime(time);
                    } else {
                      setSelectedEndTime(time);
                    }
                  }}
                  label={activeTimeField === 'start' ? 'Select Start Time' : 'Select End Time'}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Time Grid with Current Time Indicator */}
      <div 
        ref={gridRef}
        className="relative h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin 
          scrollbar-thumb-[#2A2B35] scrollbar-track-transparent"
      >
        <TimeGrid
          timeBlocks={timeBlocks}
          onUpdateBlock={handleUpdateBlock}
          onDeleteBlock={handleDeleteBlock}
          currentTime={currentTime}
        />
      </div>
    </div>
  );
}