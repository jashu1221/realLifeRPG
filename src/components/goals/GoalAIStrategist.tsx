import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Brain, ChevronRight } from 'lucide-react';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'insight' | 'recommendation';
  actionable?: boolean;
}

const suggestions = [
  "Help me break down my goal into steps",
  "Suggest habits for my goal",
  "How can I improve my progress?",
  "What metrics should I track?",
  "Analyze my goal's timeline"
];

export function GoalAIStrategist() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: "I'm your AI Goal Strategist. How can I help you achieve your goals today?",
      timestamp: new Date(),
      category: 'insight',
    },
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        type: 'user',
        content: input,
        timestamp: new Date(),
      },
    ]);
    setInput('');
    setShowSuggestions(false);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: "Based on your request, here's my strategic recommendation...",
          timestamp: new Date(),
          category: 'recommendation',
          actionable: true,
        },
      ]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="h-[calc(100vh-2rem)] mx-4 my-4 w-full max-w-xl flex flex-col bg-[#1A1B23]/95 backdrop-blur-lg border border-[#4F46E5]/20 rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-[#2A2B35]/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/20 
            flex items-center justify-center border border-[#4F46E5]/20 relative overflow-hidden">
            <Bot className="w-5 h-5 text-[#4F46E5] relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#4F46E5]/10 animate-pulse" />
          </div>
          <div>
            <h3 className="font-medium text-white flex items-center gap-2">
              Goal Strategist
              <span className="px-2 py-0.5 rounded-full text-xs bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20">
                AI Powered
              </span>
            </h3>
            <p className="text-xs text-gray-400">Your personal goal achievement advisor</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-[#4F46E5] text-white'
                  : message.category === 'recommendation'
                  ? 'bg-gradient-to-r from-[#1A1B23] to-[#2A2B35] text-white border border-[#4F46E5]/30'
                  : 'bg-[#2A2B35]/50 text-gray-200'
              }`}
            >
              {message.type === 'assistant' && message.category && (
                <div className="flex items-center gap-2 text-[#4F46E5] mb-2">
                  {message.category === 'insight' ? (
                    <Brain className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {message.category}
                  </span>
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-2 opacity-60">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-[#2A2B35]/50 space-y-3">
        {/* Compact Suggestions */}
        {showSuggestions && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin 
            scrollbar-thumb-[#2A2B35] scrollbar-track-transparent">
            <Brain className="w-4 h-4 text-[#4F46E5] flex-shrink-0" />
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 rounded-lg bg-[#2A2B35]/30 text-sm text-gray-300
                  border border-[#2A2B35]/50 hover:border-[#4F46E5]/30 hover:bg-[#2A2B35]/50
                  transition-all flex items-center gap-2 group whitespace-nowrap flex-shrink-0"
              >
                {suggestion}
                <ChevronRight className="w-3 h-3 text-gray-500 group-hover:text-[#4F46E5] 
                  transform group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        )}

        {/* Input Field */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about your goals..."
            className="flex-1 bg-[#2A2B35]/50 border border-[#2A2B35]/50 rounded-lg px-4 py-2
              text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50"
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors
              transform hover:scale-105 hover:shadow-lg hover:shadow-[#4F46E5]/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}