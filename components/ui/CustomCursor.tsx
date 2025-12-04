import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Move the small dot cursor instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      // Move the follower with a slight delay/easing (handled by CSS transition usually, or requestAnimationFrame for physics)
      // Here we use direct update for responsiveness, CSS handles the smoothing
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the element is interactive
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') || 
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body { cursor: none; }
          a, button, [role="button"] { cursor: none !important; }
        }
      `}</style>
      
      {/* Main dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform' }}
      />
      
      {/* Glowing follower */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center transition-all duration-300 ease-out ${
          hovering ? 'w-16 h-16' : 'w-8 h-8'
        }`}
        style={{ willChange: 'transform, width, height' }}
      >
        <div className={`w-full h-full rounded-full border border-gray-400 bg-white/10 backdrop-blur-sm transition-all duration-300 ${hovering ? 'border-black opacity-30' : 'opacity-50'}`} />
      </div>
    </>
  );
};