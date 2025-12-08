import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, CheckCircle, BarChart3 } from 'lucide-react';

export const TrainingGraphic: React.FC = () => {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = [
    { role: 'user', text: "How do I analyze this quarterly data?" },
    { role: 'ai', text: "I can help with that. Let's look at the revenue trends first. Upload your CSV." },
    { role: 'system', text: "Skill Unlocked: Data Analysis Level 1" },
    { role: 'user', text: "Uploaded. What's the forecast?" },
    { role: 'ai', text: "Based on Q1-Q3, we project a 15% growth in Q4. Here is the breakdown..." }
  ];

  useEffect(() => {
    if (step < messages.length) {
      const timeout = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timeout);
    } else {
        setTimeout(() => setStep(0), 5000);
    }
  }, [step]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full w-full max-h-[400px] md:max-h-[450px] lg:max-h-[500px]">
      {/* Chat Simulator */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden min-h-0">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-black"></div>
             <span className="text-xs font-bold text-gray-600">Training Simulator v2.0</span>
           </div>
        </div>
        <div ref={scrollRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50/50">
          {messages.slice(0, step + 1).map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} ${msg.role === 'system' ? 'justify-center' : ''} animate-fade-in-up`}>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <User size={14} />
                </div>
              )}
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
              )}
              
              {msg.role === 'system' ? (
                 <div className="bg-gray-100 text-black text-xs px-3 py-1 rounded-full flex items-center gap-1 font-bold border border-gray-200">
                    <CheckCircle size={10} /> {msg.text}
                 </div>
              ) : (
                <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-black text-white rounded-tr-sm' : 'bg-white border border-gray-200 shadow-sm rounded-tl-sm'}`}>
                  {msg.text}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-100 bg-white">
          <div className="h-10 bg-gray-100 rounded-full flex items-center px-4 justify-between">
            <div className="h-2 w-24 bg-gray-300 rounded animate-pulse"></div>
            <Send size={14} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Progress / Skills */}
      <div className="hidden md:flex flex-col gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex-1">
           <h4 className="text-xs font-bold uppercase text-gray-400 mb-4">Team Fluency</h4>
           <div className="relative flex items-center justify-center py-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                <circle cx="48" cy="48" r="40" stroke="#000000" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * 0.75)} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute font-bold text-xl">75%</div>
           </div>
           <div className="text-center text-xs text-black font-medium">+12% this week</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex-1 flex flex-col justify-center gap-3">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 text-black rounded-lg"><BarChart3 size={16} /></div>
              <div>
                <div className="text-xs text-gray-400">Productivity</div>
                <div className="font-bold">2.4x Gain</div>
              </div>
           </div>
           <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full bg-black w-[70%]"></div>
           </div>
        </div>
      </div>
    </div>
  );
};