import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, dark = false }) => {
  return (
    <section 
      id={id} 
      className={`relative w-full py-8 md:py-12 px-6 md:px-12 lg:px-20 overflow-hidden ${dark ? 'bg-[#0A0A0A] text-white' : 'bg-[#EAEAEA] text-[#0A0A0A]'} ${className}`}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};