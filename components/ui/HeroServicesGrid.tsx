import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}

interface HeroServicesGridProps {
  services: Service[];
  onServiceClick?: (serviceId: string) => void;
}

// Format title to display on two lines
const formatTitleTwoLines = (title: string): string => {
  // Split titles intelligently for two-line display
  const titleMap: { [key: string]: string } = {
    "Intelligent Operations": "Intelligent\nOperations",
    "Creative Systems": "Creative\nSystems",
    "Training & Adoption": "Training &\nAdoption",
    "Custom Architecture": "Custom\nArchitecture"
  };
  
  return titleMap[title] || title;
};

/**
 * Hero Services Grid Component
 * 
 * Desktop: 4-column grid
 * Tablet: 2x2 grid
 * Mobile: Horizontal scroll carousel with snap points and dot indicators
 * 
 * Features:
 * - Smooth scroll navigation to solutions section
 * - Hover effects (desktop)
 * - Touch-optimized mobile carousel
 * - Dot indicators for mobile
 * - Entry animations
 * - Accessibility support
 */
export const HeroServicesGrid: React.FC<HeroServicesGridProps> = ({ services, onServiceClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Handle scroll to solutions section
  const handleServiceClick = (serviceId: string) => {
    if (onServiceClick) {
      onServiceClick(serviceId);
    } else {
      // Default behavior: scroll to solutions section
      const solutionsSection = document.getElementById('services');
      if (solutionsSection) {
        const headerOffset = 100;
        const elementPosition = solutionsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Trigger solution selection after scroll (if needed)
        setTimeout(() => {
          const solutionIndex = services.findIndex(s => s.id === serviceId);
          if (solutionIndex !== -1) {
            // Dispatch custom event for SolutionsSection to listen to
            window.dispatchEvent(new CustomEvent('selectSolution', { detail: { index: solutionIndex } }));
          }
        }, 800);
      }
    }
  };

  // Mobile scroll handler
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      setIsScrolling(true);
      
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        
        // Calculate active index based on scroll position
        const scrollLeft = container.scrollLeft;
        const cardWidth = window.innerWidth * 0.85;
        const gap = 16; // gap-4 = 16px
        const newIndex = Math.round(scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.min(newIndex, services.length - 1));
      }, 100);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [services.length]);

  // Scroll to specific card (for dot navigation)
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = window.innerWidth * 0.85;
    const gap = 16;
    const scrollPosition = index * (cardWidth + gap);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="w-full">
      {/* Desktop & Tablet Grid */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => {
            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleServiceClick(service.id);
                  }
                }}
                aria-label={`View ${service.title} solution`}
                className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[180px] md:min-h-[200px] h-full text-left"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs md:text-sm text-gray-400">/{service.number}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-black transition-colors"></div>
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 group-hover:translate-x-1 transition-transform text-left whitespace-pre-line leading-tight">{formatTitleTwoLines(service.title)}</h3>
                  <p className="text-xs md:text-sm text-gray-500 group-hover:translate-x-1 transition-transform delay-75 text-left">{service.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Horizontal Scroll Carousel */}
      <div className="md:hidden">
        {/* Full-width wrapper to break out of container padding */}
        <div 
          className="relative overflow-visible"
          style={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
          }}
        >
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto overflow-y-visible gap-4 pb-6 no-scrollbar"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
              scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth',
              paddingLeft: '7.5vw',
              paddingRight: '7.5vw',
            }}
          >
            {services.map((service, index) => {
              return (
                <MobileCardWithPeek
                  key={service.id}
                  index={index}
                  service={service}
                  activeIndex={activeIndex}
                  scrollContainerRef={scrollContainerRef}
                  onServiceClick={handleServiceClick}
                />
              );
            })}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6 px-4">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              aria-label={`Go to service ${index + 1}`}
              className={`
                transition-all duration-300 rounded-full touch-manipulation min-h-[8px]
                ${activeIndex === index
                  ? 'w-8 h-2 bg-black'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }
              `}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

// Mobile card component with peek effect
const MobileCardWithPeek: React.FC<{
  index: number;
  service: Service;
  activeIndex: number;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  onServiceClick: (serviceId: string) => void;
}> = ({ index, service, activeIndex, scrollContainerRef, onServiceClick }) => {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !cardRef.current) return;

    const updateStyle = () => {
      // Get actual card element position relative to viewport
      const cardRect = cardRef.current.getBoundingClientRect();
      const viewportCenter = window.innerWidth / 2;
      const cardCenter = cardRect.left + (cardRect.width / 2);
      const distanceFromCenter = Math.abs(cardCenter - viewportCenter);

      // Card width is 85vw
      const cardWidth = window.innerWidth * 0.85;

      // Use a threshold to determine if card is centered
      const centerThreshold = cardWidth * 0.1;
      const isCenterCard = distanceFromCenter < centerThreshold;

      // Center card: full opacity and scale
      if (isCenterCard) {
        setOpacity(1);
        setScale(1);
        return;
      }

      // Side cards: reduced opacity and scale
      const maxDistance = cardWidth * 0.6;
      const newOpacity = Math.max(0.5, 1 - (distanceFromCenter / maxDistance) * 0.5);
      const newScale = Math.max(0.95, 1 - (distanceFromCenter / maxDistance) * 0.05);

      setOpacity(newOpacity);
      setScale(newScale);
    };

    updateStyle();
    container.addEventListener('scroll', updateStyle, { passive: true });
    window.addEventListener('resize', updateStyle);

    return () => {
      container.removeEventListener('scroll', updateStyle);
      window.removeEventListener('resize', updateStyle);
    };
  }, [index, scrollContainerRef]);

  return (
    <button
      ref={cardRef}
      onClick={() => onServiceClick(service.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onServiceClick(service.id);
        }
      }}
      aria-label={`View ${service.title} solution`}
      className="flex-shrink-0 bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[200px] md:min-h-[180px] flex flex-col justify-between active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-left touch-manipulation"
      style={{
        width: '85vw',
        scrollSnapAlign: 'center',
        scrollSnapStop: 'always',
        opacity: opacity,
        transform: `scale(${scale})`,
        pointerEvents: opacity < 0.6 ? 'none' : 'auto',
      }}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-xs text-gray-400">/{service.number}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
      </div>
      <div className="text-left">
        <h3 className="text-lg font-bold mb-1 text-left whitespace-pre-line leading-tight">{formatTitleTwoLines(service.title)}</h3>
        <p className="text-xs text-gray-500 text-left">{service.subtitle}</p>
      </div>
    </button>
  );
};

