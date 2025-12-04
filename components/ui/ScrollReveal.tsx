import React, { useRef, useState, useEffect } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 800
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, [threshold]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return `translate3d(0, ${distance}px, 0)`;
        case 'down': return `translate3d(0, -${distance}px, 0)`;
        case 'left': return `translate3d(${distance}px, 0, 0)`;
        case 'right': return `translate3d(-${distance}px, 0, 0)`;
        default: return `translate3d(0, ${distance}px, 0)`;
      }
    }
    return 'translate3d(0, 0, 0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};
