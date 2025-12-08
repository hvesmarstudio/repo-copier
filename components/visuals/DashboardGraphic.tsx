import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users, Zap, CheckCircle } from 'lucide-react';

const data = [
  { name: 'Mon', active: 40, processed: 24 },
  { name: 'Tue', active: 30, processed: 13 },
  { name: 'Wed', active: 20, processed: 58 },
  { name: 'Thu', active: 27, processed: 39 },
  { name: 'Fri', active: 18, processed: 48 },
  { name: 'Sat', active: 23, processed: 38 },
  { name: 'Sun', active: 34, processed: 43 },
];

export const DashboardGraphic: React.FC = () => {
  const [activeTask, setActiveTask] = useState(0);
  
  // Simulate live data updates
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev];
        const last = newData.shift();
        if (last) {
           newData.push({ ...last, active: Math.floor(Math.random() * 50) + 10, processed: Math.floor(Math.random() * 60) + 20 });
        }
        return newData;
      });
      setActiveTask(prev => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 w-full h-full overflow-visible flex flex-col gap-4 md:gap-6 relative max-h-[500px]">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex gap-2 items-center">
           <div className="w-3 h-3 rounded-full bg-black" />
           <div className="w-3 h-3 rounded-full bg-gray-300" />
           <div className="w-3 h-3 rounded-full bg-gray-300" />
        </div>
        <div className="text-xs font-mono text-gray-400">LIVE INTELLIGENCE</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
           <div className="flex items-center gap-2 text-gray-500 mb-1">
             <Activity size={14} /> <span className="text-xs">Efficiency</span>
           </div>
           <div className="text-xl font-bold font-display">94.2%</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
           <div className="flex items-center gap-2 text-gray-500 mb-1">
             <Zap size={14} /> <span className="text-xs">Velocity</span>
           </div>
           <div className="text-xl font-bold font-display">1.2s</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
           <div className="flex items-center gap-2 text-gray-500 mb-1">
             <Users size={14} /> <span className="text-xs">Agents</span>
           </div>
           <div className="text-xl font-bold font-display">12</div>
        </div>
      </div>

      <div className="flex-1 min-h-[120px] md:min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <Area type="monotone" dataKey="active" stroke="#000000" strokeWidth={2} fillOpacity={1} fill="url(#colorActive)" />
            <Area type="monotone" dataKey="processed" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="4 4" fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex items-center justify-between p-3 rounded-lg transition-all duration-500 ${activeTask === i ? 'bg-black text-white' : 'bg-gray-50 text-gray-400'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${activeTask === i ? 'bg-white animate-pulse' : 'bg-gray-300'}`} />
              <span className="text-xs font-medium">Auto-scheduling client follow-up #{1024 + i}</span>
            </div>
            {activeTask === i && <CheckCircle size={14} className="animate-bounce text-white" />}
          </div>
        ))}
      </div>
    </div>
  );
};