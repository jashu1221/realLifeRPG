import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Brain,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'insight' | 'recommendation';
  actionable?: boolean;
}

const suggestions = [
  'What would Tyler Durden do in this situation?',
  "I'm feeling lazy, motivate me",
  // 'Help me embrace my alter ego',
  // 'How would my ideal self handle this?',
  // 'Give me a morning affirmation',
  // 'Push me to be stronger',
  'I need intense motivation',
];

export function MotivationChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content:
        "I embody your alter ego's strength. What challenges shall we conquer today?",
      timestamp: new Date(),
      category: 'insight',
    },
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkScroll = () => {
      if (suggestionsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = suggestionsRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const suggestionsElement = suggestionsRef.current;
    if (suggestionsElement) {
      suggestionsElement.addEventListener('scroll', checkScroll);
      checkScroll();

      // Add resize observer for responsive updates
      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(suggestionsElement);

      return () => {
        suggestionsElement.removeEventListener('scroll', checkScroll);
        resizeObserver.disconnect();
      };
    }
  }, []);

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

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content:
            "Your alter ego doesn't accept mediocrity. Here's what you need to do...",
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

  const scrollSuggestions = (direction: 'left' | 'right') => {
    if (suggestionsRef.current) {
      const scrollAmount = Math.min(
        200,
        suggestionsRef.current.clientWidth * 0.8
      );
      suggestionsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#1A1B23]/50 rounded-xl border border-[#2A2B35]/50 overflow-hidden max-h-[87vh] min-h-[400px] ">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-[#2A2B35]/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/20 
                flex items-center justify-center border border-[#4F46E5]/20 relative overflow-hidden"
            >
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-[#4F46E5] relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#4F46E5]/10 animate-pulse" />
            </div>
            <div>
              <h3 className="font-medium text-sm sm:text-base text-white flex items-center gap-2">
                Tyler Durden
                <span
                  className="px-1.5 sm:px-2 py-0.5 rounded-full text-xs bg-red-500/10 text-red-400 
                    border border-red-500/20 animate-pulse whitespace-nowrap"
                >
                  Intense Mode
                </span>
              </h3>
              <p className="text-xs text-gray-400">Your alter ego is ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-xl px-3 sm:px-4 py-2 sm:py-3 ${
                message.type === 'user'
                  ? 'bg-[#4F46E5] text-white'
                  : message.category === 'recommendation'
                  ? 'bg-gradient-to-r from-[#1A1B23] to-[#2A2B35] text-white border border-[#4F46E5]/30'
                  : 'bg-[#2A2B35]/50 text-gray-200'
              }`}
            >
              {message.type === 'assistant' && message.category && (
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#4F46E5] mb-1.5 sm:mb-2">
                  {message.category === 'insight' ? (
                    <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {message.category}
                  </span>
                </div>
              )}
              <p className="text-xs sm:text-sm">{message.content}</p>
              <p className="text-[10px] sm:text-xs mt-1.5 sm:mt-2 opacity-60">
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
      <div className="p-3 sm:p-4 border-t border-[#2A2B35]/50 space-y-2 sm:space-y-3">
        {/* Suggestions */}
        {showSuggestions && (
          <div className="relative flex  items-center gap-1 sm:gap-2">
            {canScrollLeft && (
              <button
                onClick={() => scrollSuggestions('left')}
                className="p-1 rounded-lg bg-[#2A2B35]/50 text-gray-400 hover:text-white
                  transition-colors flex-shrink-0"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            )}

            <div className="relative flex-1 overflow-hidden">
              <div
                ref={suggestionsRef}
                className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none"
              >
                <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-[#4F46E5] flex-shrink-0" />
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-2 sm:px-3 py-1 rounded-lg bg-[#2A2B35]/30 text-[10px] sm:text-xs text-gray-300
                      border border-[#2A2B35]/50 hover:border-[#4F46E5]/30 hover:bg-[#2A2B35]/50
                      transition-all flex items-center gap-1 sm:gap-1.5 group whitespace-nowrap flex-shrink-0"
                  >
                    {suggestion}
                    <ChevronRight
                      className="w-2 h-2 sm:w-3 sm:h-3 text-gray-500 group-hover:text-[#4F46E5] 
                      transform group-hover:translate-x-0.5 transition-all"
                    />
                  </button>
                ))}
              </div>
            </div>

            {canScrollRight && (
              <button
                onClick={() => scrollSuggestions('right')}
                className="p-1 rounded-lg bg-[#2A2B35]/50 text-gray-400 hover:text-white
                  transition-colors flex-shrink-0"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
        )}

        {/* Input Field */}
        <div className="flex gap-1.5 sm:gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Channel your alter ego..."
            className="flex-1 bg-[#2A2B35]/50 border border-[#2A2B35]/50 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2
              text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5]/50"
          />
          <button
            onClick={handleSend}
            className="p-1.5 sm:p-2 rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors
              transform hover:scale-105 hover:shadow-lg hover:shadow-[#4F46E5]/20"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
