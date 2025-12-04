import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      viewBox="0 0 140 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Aitoma Logo"
    >
      <text 
        x="0" 
        y="30" 
        fontFamily="'Clash Display', sans-serif" 
        fontWeight="600" 
        fontSize="36" 
        fill="currentColor"
        style={{ letterSpacing: '-0.03em' }}
      >
        aıtoma
      </text>
      {/* Star Accent replacing the dot of the i */}
      <path 
        d="M27 4 L28.5 9.5 L34 11 L28.5 12.5 L27 18 L25.5 12.5 L20 11 L25.5 9.5 Z" 
        fill="#0A4DD3"
      />
    </svg>
  );
};