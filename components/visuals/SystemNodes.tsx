import React from 'react';

export const SystemNodes: React.FC = () => {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full opacity-80">
      <defs>
        <radialGradient id="nodeGradient" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#1A1A1A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Connecting Lines */}
      <g stroke="#E5E7EB" strokeWidth="1">
        <line x1="100" y1="100" x2="200" y2="200" className="animate-pulse" />
        <line x1="300" y1="100" x2="200" y2="200" className="animate-pulse delay-100" />
        <line x1="100" y1="300" x2="200" y2="200" className="animate-pulse delay-200" />
        <line x1="300" y1="300" x2="200" y2="200" className="animate-pulse delay-300" />
        
        <line x1="100" y1="100" x2="300" y2="100" strokeDasharray="4 4" />
        <line x1="100" y1="300" x2="300" y2="300" strokeDasharray="4 4" />
      </g>

      {/* Nodes */}
      <circle cx="200" cy="200" r="30" fill="white" stroke="#1A1A1A" strokeWidth="2" className="animate-pulse-glow" />
      
      <circle cx="100" cy="100" r="15" fill="#F8F9FA" stroke="#E5E7EB" strokeWidth="1" className="animate-float" />
      <circle cx="300" cy="100" r="15" fill="#F8F9FA" stroke="#E5E7EB" strokeWidth="1" className="animate-float delay-200" />
      <circle cx="100" cy="300" r="15" fill="#F8F9FA" stroke="#E5E7EB" strokeWidth="1" className="animate-float delay-500" />
      <circle cx="300" cy="300" r="15" fill="#F8F9FA" stroke="#E5E7EB" strokeWidth="1" className="animate-float delay-100" />

      {/* Data Packets */}
      <circle r="3" fill="#1A1A1A">
        <animateMotion dur="3s" repeatCount="indefinite" path="M100,100 L200,200" />
      </circle>
      <circle r="3" fill="#1A1A1A">
        <animateMotion dur="4s" repeatCount="indefinite" path="M300,300 L200,200" />
      </circle>
    </svg>
  );
};