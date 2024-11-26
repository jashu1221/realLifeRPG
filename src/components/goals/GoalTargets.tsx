import React, { useState } from 'react';
import { Calendar, ChevronDown, Lock, Plus, Edit2, Check, X } from 'lucide-react';

interface Target {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Day extends Target {
  dayNumber: number;
}

interface Week extends Target {
  weekNumber: number;
  isLocked: boolean;
  isExpanded: boolean;
  isEditable: boolean;
  days: Day[];
}

interface Month extends Target {
  monthNumber: number;
  isLocked: boolean;
  isExpanded: boolean;
  isEditable: boolean;
  weeks: Week[];
}

interface Quarter extends Target {
  quarterNumber: number;
  isLocked: boolean;
  isExpanded: boolean;
  isEditable: boolean;
  months: Month[];
}

export function GoalTargets() {
  const [quarters, setQuarters] = useState<Quarter[]>([
    {
      id: 'q1',
      quarterNumber: 1,
      title: 'Q1 Goals',
      isLocked: false,
      isExpanded: true,
      isEditable: true,
      isCompleted: false,
      months: [
        {
          id: 'm1',
          monthNumber: 1,
          title: 'Launch MVP and get initial users',
          isLocked: false,
          isExpanded: true,
          isEditable: true,
          isCompleted: false,
          weeks: [
            {
              id: 'w1',
              weekNumber: 1,
              title: 'Complete user research and initial mockups',
              isLocked: false,
              isExpanded: true,
              isEditable: true,
              isCompleted: false,
              days: [
                { id: 'd1', dayNumber: 1, title: 'User interviews', isCompleted: true },
                { id: 'd2', dayNumber: 2, title: 'Data analysis', isCompleted: false },
                { id: 'd3', dayNumber: 3, title: 'Initial wireframes', isCompleted: false },
                { id: 'd4', dayNumber: 4, title: 'Team review', isCompleted: false },
                { id: 'd5', dayNumber: 5, title: 'Revisions', isCompleted: false }
              ]
            },
            {
              id: 'w2',
              weekNumber: 2,
              title: 'Design and Development Sprint',
              isLocked: false,
              isExpanded: false,
              isEditable: true,
              isCompleted: false,
              days: []
            },
            {
              id: 'w3',
              weekNumber: 3,
              title: 'Testing and Feedback',
              isLocked: false,
              isExpanded: false,
              isEditable: true,
              isCompleted: false,
              days: []
            },
            {
              id: 'w4',
              weekNumber: 4,
              title: 'Launch Preparation',
              isLocked: false,
              isExpanded: false,
              isEditable: true,
              isCompleted: false,
              days: []
            }
          ]
        },
        {
          id: 'm2',
          monthNumber: 2,
          title: 'Scale and Optimize',
          isLocked: false,
          isExpanded: false,
          isEditable: true,
          isCompleted: false,
          weeks: []
        },
        {
          id: 'm3',
          monthNumber: 3,
          title: 'Market Expansion',
          isLocked: false,
          isExpanded: false,
          isEditable: true,
          isCompleted: false,
          weeks: []
        }
      ]
    },
    {
      id: 'q2',
      quarterNumber: 2,
      title: 'Growth and Partnerships',
      isLocked: false,
      isExpanded: false,
      isEditable: true,
      isCompleted: false,
      months: []
    },
    {
      id: 'q3',
      quarterNumber: 3,
      title: 'International Expansion',
      isLocked: false,
      isExpanded: false,
      isEditable: true,
      isCompleted: false,
      months: []
    },
    {
      id: 'q4',
      quarterNumber: 4,
      title: 'Revenue Optimization',
      isLocked: false,
      isExpanded: false,
      isEditable: true,
      isCompleted: false,
      months: []
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleExpand = (id: string, type: 'quarter' | 'month' | 'week') => {
    setQuarters(prevQuarters => 
      prevQuarters.map(q => ({
        ...q,
        isExpanded: type === 'quarter' && q.id === id ? !q.isExpanded : q.isExpanded,
        months: q.months.map(m => ({
          ...m,
          isExpanded: type === 'month' && m.id === id ? !m.isExpanded : m.isExpanded,
          weeks: m.weeks.map(w => ({
            ...w,
            isExpanded: type === 'week' && w.id === id ? !w.isExpanded : w.isExpanded,
            days: w.days
          }))
        }))
      }))
    );
  };

  const handleSave = (id: string) => {
    setQuarters(prevQuarters =>
      prevQuarters.map(q => ({
        ...q,
        title: q.id === id ? editText : q.title,
        months: q.months.map(m => ({
          ...m,
          title: m.id === id ? editText : m.title,
          weeks: m.weeks.map(w => ({
            ...w,
            title: w.id === id ? editText : w.title,
            days: w.days
          }))
        }))
      }))
    );
    setEditingId(null);
    setEditText('');
  };

  const handleToggleDay = (quarterId: string, monthId: string, weekId: string, dayId: string) => {
    setQuarters(prevQuarters =>
      prevQuarters.map(q => q.id === quarterId ? {
        ...q,
        months: q.months.map(m => m.id === monthId ? {
          ...m,
          weeks: m.weeks.map(w => w.id === weekId ? {
            ...w,
            days: w.days.map(d => d.id === dayId ? {
              ...d,
              isCompleted: !d.isCompleted
            } : d)
          } : w)
        } : m)
      } : q)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#4F46E5]" />
          2024 Targets
        </h3>
      </div>

      <div className="space-y-4">
        {quarters.map(quarter => (
          <div key={quarter.id} className="space-y-3">
            <div className={`bg-[#1A1B23]/80 rounded-lg border backdrop-blur-sm transition-all
              border-[#4F46E5]/20 hover:border-[#4F46E5]/40 hover:bg-[#1A1B23]/90`}>
              <div className="p-5 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <span className="text-[#4F46E5] font-semibold px-3 py-1 rounded-lg 
                    bg-[#4F46E5]/10 border border-[#4F46E5]/20">
                    Q{quarter.quarterNumber}
                  </span>
                  {editingId === quarter.id ? (
                    <div className="flex items-center gap-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="min-w-[300px] bg-[#2A2B35]/50 rounded-lg px-3 py-2 text-white 
                          focus:outline-none border border-[#4F46E5]/30 focus:border-[#4F46E5]/60
                          placeholder-gray-500 resize-none"
                        placeholder="Enter quarter goals..."
                        rows={2}
                      />
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleSave(quarter.id)}
                          className="p-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                            hover:bg-[#4F46E5]/20"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 
                            hover:bg-red-500/20"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group/title">
                      <span className="text-gray-300 font-medium">
                        {quarter.title || 'Set quarter goals...'}
                      </span>
                      <button
                        onClick={() => {
                          setEditingId(quarter.id);
                          setEditText(quarter.title);
                        }}
                        className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400
                          opacity-0 group-hover/title:opacity-100 transition-all"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                {quarter.quarterNumber === 1 && (
                  <button
                    onClick={() => handleExpand(quarter.id, 'quarter')}
                    className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400
                      opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${
                      quarter.isExpanded ? 'rotate-180' : ''
                    }`} />
                  </button>
                )}
              </div>

              {quarter.isExpanded && quarter.quarterNumber === 1 && (
                <div className="border-t border-[#2A2B35]/30 p-4 space-y-3">
                  {quarter.months.map(month => (
                    <div key={month.id} className="rounded-lg border border-[#4F46E5]/20 
                      hover:border-[#4F46E5]/40">
                      <div className="p-4 flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[#4F46E5] font-medium">
                            Month {month.monthNumber}
                          </span>
                          {editingId === month.id ? (
                            <div className="flex items-center gap-2">
                              <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="min-w-[300px] bg-[#2A2B35]/50 rounded-lg px-3 py-2 
                                  text-sm text-white focus:outline-none border 
                                  border-[#4F46E5]/30 focus:border-[#4F46E5]/60
                                  placeholder-gray-500 resize-none"
                                placeholder="Enter month goals..."
                                rows={2}
                              />
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() => handleSave(month.id)}
                                  className="p-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                                    hover:bg-[#4F46E5]/20"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 
                                    hover:bg-red-500/20"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 group/title">
                              <span className="text-sm text-gray-300">
                                {month.title || 'Set month goals...'}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingId(month.id);
                                  setEditText(month.title);
                                }}
                                className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400
                                  opacity-0 group-hover/title:opacity-100 transition-all"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                        {month.monthNumber === 1 && (
                          <button
                            onClick={() => handleExpand(month.id, 'month')}
                            className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400
                              opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${
                              month.isExpanded ? 'rotate-180' : ''
                            }`} />
                          </button>
                        )}
                      </div>

                      {month.isExpanded && month.monthNumber === 1 && (
                        <div className="border-t border-[#2A2B35]/30 p-4 space-y-3">
                          {month.weeks.map(week => (
                            <div
                              key={week.id}
                              className="rounded-lg border border-[#4F46E5]/20 
                                hover:border-[#4F46E5]/40"
                            >
                              <div className="p-4">
                                <div className="flex items-center justify-between group mb-3">
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm text-[#4F46E5] font-medium">
                                      Week {week.weekNumber}
                                    </span>
                                    {editingId === week.id ? (
                                      <div className="flex items-center gap-2">
                                        <textarea
                                          value={editText}
                                          onChange={(e) => setEditText(e.target.value)}
                                          className="flex-1 min-w-[300px] bg-[#2A2B35]/50 rounded-lg 
                                            px-3 py-2 text-sm text-white focus:outline-none border 
                                            border-[#4F46E5]/30 focus:border-[#4F46E5]/60
                                            placeholder-gray-500 resize-none"
                                          placeholder="Enter week goals..."
                                          rows={2}
                                        />
                                        <div className="flex flex-col gap-2">
                                          <button
                                            onClick={() => handleSave(week.id)}
                                            className="p-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] 
                                              hover:bg-[#4F46E5]/20"
                                          >
                                            <Check className="w-4 h-4" />
                                          </button>
                                          <button
                                            onClick={() => setEditingId(null)}
                                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 
                                              hover:bg-red-500/20"
                                          >
                                            <X className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2 group/title flex-1">
                                        <span className="text-sm text-gray-300">
                                          {week.title || 'Set week goals...'}
                                        </span>
                                        <button
                                          onClick={() => {
                                            setEditingId(week.id);
                                            setEditText(week.title);
                                          }}
                                          className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400
                                            opacity-0 group-hover/title:opacity-100 transition-all"
                                        >
                                          <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  {week.weekNumber === 1 && (
                                    <button
                                      onClick={() => handleExpand(week.id, 'week')}
                                      className="p-1.5 rounded-lg hover:bg-[#2A2B35]/50 text-gray-400
                                        opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                      <ChevronDown className={`w-4 h-4 transition-transform ${
                                        week.isExpanded ? 'rotate-180' : ''
                                      }`} />
                                    </button>
                                  )}
                                </div>

                                {week.isExpanded && week.weekNumber === 1 && (
                                  <div className="grid grid-cols-5 gap-2 mt-3">
                                    {week.days.map(day => (
                                      <button
                                        key={day.id}
                                        onClick={() => handleToggleDay(quarter.id, month.id, week.id, day.id)}
                                        className={`p-3 rounded-lg border text-sm transition-all ${
                                          day.isCompleted
                                            ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30 text-[#4F46E5]'
                                            : 'border-[#2A2B35]/50 text-gray-400 hover:border-[#4F46E5]/30'
                                        }`}
                                      >
                                        <div className="font-medium mb-1">Day {day.dayNumber}</div>
                                        <div className="text-xs truncate">
                                          {day.title}
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}