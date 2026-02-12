import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  outcome: string;
  cta: string;
  graphic: React.ReactNode;
}

interface SolutionsSectionProps {
  services: Service[];
}

/**
 * Horizontal Carousel Solutions Section Component
 * 
 * All Devices: Horizontal scroll carousel with:
 * - Full-width cards centered (max-w-[1400px] to match content width)
 * - Infinite loop scrolling
 * - Smooth snap-to-card behavior
 * - Dot indicators for navigation
 * - Keyboard navigation support
 */
export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const isUserScrollingRef = useRef(false);
  const isAnimatingRef = useRef(false);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track mobile state for responsive width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Duplicate services for infinite loop (3 sets: before, current, after)
  const duplicatedServices = [...services, ...services, ...services];
  const serviceCount = services.length;
  const middleSetStart = serviceCount;

  // Initialize scroll position on mount and handle resize
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Wait for layout to calculate proper widths
    const initScroll = () => {
      // Card width calculation based on screen size
      // On mobile, account for section padding (px-6 = 24px on each side)
      const isSmallMobile = window.innerWidth < 640;
      const isMobile = window.innerWidth < 768;
      const isLargeScreen = window.innerWidth >= 1024;
      const sectionPadding = isMobile ? 48 : 0; // 24px * 2 (left + right) for mobile
      const cardWidth = isSmallMobile 
        ? window.innerWidth - sectionPadding
        : isMobile 
        ? window.innerWidth - sectionPadding
        : isLargeScreen 
        ? window.innerWidth * 0.75 
        : window.innerWidth * 0.85;
      
      if (cardWidth === 0 || container.children.length === 0) {
        setTimeout(initScroll, 50);
        return;
      }
      
      // Scroll to start of middle set
      const scrollPosition = middleSetStart * cardWidth;
      
      // Use instant scroll for initialization
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = scrollPosition;
      
      // Reset scroll behavior after a brief delay
      requestAnimationFrame(() => {
        container.style.scrollBehavior = '';
        setActiveIndex(0);
      });
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(initScroll, 100);
    });

    // Handle window resize - maintain current active index
    const handleResize = () => {
      if (!container || isAnimatingRef.current) return;
      const isSmallMobile = window.innerWidth < 640;
      const isMobile = window.innerWidth < 768;
      const isLargeScreen = window.innerWidth >= 1024;
      const sectionPadding = (isSmallMobile || isMobile) ? 48 : 0; // 24px * 2 for mobile
      const cardWidth = isSmallMobile 
        ? window.innerWidth - sectionPadding
        : isMobile 
        ? window.innerWidth - sectionPadding
        : isLargeScreen 
        ? window.innerWidth * 0.75 
        : window.innerWidth * 0.85;
      const currentScroll = container.scrollLeft;
      const currentCardIndex = Math.round(currentScroll / (currentScroll > 0 ? currentScroll / Math.max(1, Math.round(currentScroll / cardWidth)) : cardWidth));
      const actualIndex = Math.round(currentScroll / cardWidth) % serviceCount;
      const newScrollPosition = (middleSetStart + actualIndex) * cardWidth;
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = newScrollPosition;
      setTimeout(() => {
        container.style.scrollBehavior = '';
      }, 50);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [middleSetStart, serviceCount]);

  // Handle scroll to update active index and infinite loop
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
        
        if (isAnimatingRef.current) return;
        
        const scrollLeft = container.scrollLeft;
        
        // Card width calculation based on screen size
        const isSmallMobile = window.innerWidth < 640;
        const isMobile = window.innerWidth < 768;
        const isLargeScreen = window.innerWidth >= 1024;
        const sectionPadding = (isSmallMobile || isMobile) ? 48 : 0; // 24px * 2 for mobile
        const cardWidth = isSmallMobile 
          ? window.innerWidth - sectionPadding
          : isMobile 
          ? window.innerWidth - sectionPadding
          : isLargeScreen 
          ? window.innerWidth * 0.75 
          : window.innerWidth * 0.85;
        
        if (cardWidth === 0) return;
        
        // Calculate which card index we're at (0-11 for 3 sets of 4)
        const currentCardIndex = Math.round(scrollLeft / cardWidth);
        const actualIndex = currentCardIndex % serviceCount;
        
        // Only update if index actually changed
        setActiveIndex(prevIndex => prevIndex !== actualIndex ? actualIndex : prevIndex);

        // Handle infinite loop - jump to middle set if needed
        // If scrolled to the end (third set), jump to middle set seamlessly
        if (currentCardIndex >= serviceCount * 2 && !isUserScrollingRef.current && !isAnimatingRef.current) {
          isAnimatingRef.current = true;
          const targetIndex = actualIndex;
          const newScroll = (middleSetStart + targetIndex) * cardWidth;
          
          // Use instant scroll to avoid visible jump
          container.style.scrollBehavior = 'auto';
          container.scrollLeft = newScroll;
          
          setTimeout(() => {
            container.style.scrollBehavior = '';
            isAnimatingRef.current = false;
          }, 100);
        }
        // If scrolled to the beginning (first set), jump to middle set seamlessly
        else if (currentCardIndex < serviceCount && !isUserScrollingRef.current && !isAnimatingRef.current) {
          isAnimatingRef.current = true;
          const targetIndex = actualIndex;
          const newScroll = (middleSetStart + targetIndex) * cardWidth;
          
          container.style.scrollBehavior = 'auto';
          container.scrollLeft = newScroll;
          
          setTimeout(() => {
            container.style.scrollBehavior = '';
            isAnimatingRef.current = false;
          }, 100);
        }
      }, 200);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [serviceCount, middleSetStart, duplicatedServices.length]);

  // Scroll to specific card index in the middle set
  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container || isScrolling) return;
    if (index < 0 || index >= serviceCount) return;

    isUserScrollingRef.current = true;
    setActiveIndex(index);
    
    // Card width calculation based on screen size
    const isSmallMobile = window.innerWidth < 640;
    const isMobile = window.innerWidth < 768;
    const isLargeScreen = window.innerWidth >= 1024;
    const sectionPadding = (isSmallMobile || isMobile) ? 48 : 0; // 24px * 2 for mobile
    const cardWidth = isSmallMobile 
      ? window.innerWidth - sectionPadding
      : isMobile 
      ? window.innerWidth - sectionPadding
      : isLargeScreen 
      ? window.innerWidth * 0.75 
      : window.innerWidth * 0.85;
    const targetScroll = (middleSetStart + index) * cardWidth;

    container.scrollTo({
      left: targetScroll,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });

    setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 600);
  }, [isScrolling, middleSetStart, prefersReducedMotion, serviceCount]);

  // Navigate to next card (with proper infinite loop)
  const handleNext = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    isUserScrollingRef.current = true;
    
    // Card width calculation based on screen size
    const isSmallMobile = window.innerWidth < 640;
    const isMobile = window.innerWidth < 768;
    const isLargeScreen = window.innerWidth >= 1024;
    const sectionPadding = (isSmallMobile || isMobile) ? 48 : 0; // 24px * 2 for mobile
    const cardWidth = isSmallMobile 
      ? window.innerWidth - sectionPadding
      : isMobile 
      ? window.innerWidth - sectionPadding
      : isLargeScreen 
      ? window.innerWidth * 0.75 
      : window.innerWidth * 0.85;
    
    // Calculate current position
    const currentScroll = container.scrollLeft;
    const currentCardIndex = Math.round(currentScroll / cardWidth);
    const currentActualIndex = currentCardIndex % serviceCount;
    
    // Determine next index
    const nextActualIndex = (currentActualIndex + 1) % serviceCount;
    setActiveIndex(nextActualIndex);
    
    // Calculate target scroll position
    let targetScroll: number;
    
    // If we're at the last card (index 3), scroll to first card of next set
    if (currentActualIndex === serviceCount - 1) {
      // Scroll to first card of third set (index 8 for 4 services) - seamless loop
      targetScroll = (serviceCount * 2) * cardWidth;
    } else {
      // Normal scroll within the middle set
      targetScroll = (middleSetStart + nextActualIndex) * cardWidth;
    }

    container.scrollTo({
      left: targetScroll,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });

    setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 600);
  }, [serviceCount, middleSetStart, prefersReducedMotion]);

  // Navigate to previous card (with proper infinite loop)
  const handlePrev = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    isUserScrollingRef.current = true;
    
    // Card width calculation based on screen size
    const isSmallMobile = window.innerWidth < 640;
    const isMobile = window.innerWidth < 768;
    const isLargeScreen = window.innerWidth >= 1024;
    const cardWidth = isSmallMobile 
      ? window.innerWidth 
      : isMobile 
      ? window.innerWidth * 0.9 
      : isLargeScreen 
      ? window.innerWidth * 0.75 
      : window.innerWidth * 0.85;
    
    // Calculate current position
    const currentScroll = container.scrollLeft;
    const currentCardIndex = Math.round(currentScroll / cardWidth);
    const currentActualIndex = currentCardIndex % serviceCount;
    
    // Determine previous index
    const prevActualIndex = (currentActualIndex - 1 + serviceCount) % serviceCount;
    setActiveIndex(prevActualIndex);
    
    // Calculate target scroll position
    let targetScroll: number;
    
    // If we're at the first card (index 0), scroll to last card of previous set
    if (currentActualIndex === 0) {
      // Scroll to last card of first set (index 3 for 4 services) - seamless loop backwards
      targetScroll = (serviceCount - 1) * cardWidth;
    } else {
      // Normal scroll within the middle set
      targetScroll = (middleSetStart + prevActualIndex) * cardWidth;
    }

    container.scrollTo({
      left: targetScroll,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });

    setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 600);
  }, [serviceCount, middleSetStart, prefersReducedMotion]);

  // Listen for service selection from hero grid
  useEffect(() => {
    const handleSelectSolution = (event: CustomEvent<{ index: number }>) => {
      const { index } = event.detail;
      if (index >= 0 && index < services.length) {
        scrollToIndex(index);
      }
    };

    window.addEventListener('selectSolution', handleSelectSolution as EventListener);
    return () => {
      window.removeEventListener('selectSolution', handleSelectSolution as EventListener);
    };
  }, [services.length, scrollToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Number keys 1-4 for direct navigation
      if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (index < services.length) {
          scrollToIndex(index);
        }
        return;
      }

      // Arrow keys for sequential navigation
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      }
    };

    // Only attach keyboard listener when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          window.addEventListener('keydown', handleKeyDown);
        } else {
          window.removeEventListener('keydown', handleKeyDown);
        }
      },
      { threshold: 0.3 }
    );

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, [handleNext, handlePrev, scrollToIndex, services.length]);

  // Touch handlers for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div 
      className="relative w-full"
      aria-label="Our Solutions"
    >
      {/* Section Header */}
      <div className="w-full mb-8 md:mb-12 lg:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Our Solutions</h2>
          <div className="flex items-center gap-4 md:gap-6">
            {/* Progress Indicator */}
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-400">
              <span className="font-medium">{activeIndex + 1}</span>
              <span>/</span>
              <span>{services.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div 
        className={`relative overflow-visible ${isMobile ? 'w-full' : ''}`}
        style={!isMobile ? {
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
        } : {}}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Scroll Container - Allow overflow to show side cards */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto overflow-y-visible pb-6 no-scrollbar"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory',
            scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth',
            paddingLeft: typeof window !== 'undefined' 
              ? (window.innerWidth < 640 ? '0px' 
                : window.innerWidth < 768 ? '0px' 
                : window.innerWidth >= 1024 ? '12.5vw' 
                : '7.5vw')
              : '7.5vw',
            paddingRight: typeof window !== 'undefined' 
              ? (window.innerWidth < 640 ? '0px' 
                : window.innerWidth < 768 ? '0px' 
                : window.innerWidth >= 1024 ? '12.5vw' 
                : '7.5vw')
              : '7.5vw',
          }}
        >
          {duplicatedServices.map((service, index) => {
            const actualIndex = index % serviceCount;
            
            return (
              <CardWithPeekEffect
                key={`${service.id}-${index}`}
                index={index}
                service={service}
                serviceCount={serviceCount}
                scrollContainerRef={scrollContainerRef}
              />
            );
          })}
        </div>
      </div>

      {/* Navigation Controls - Below Carousel */}
      <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6 mt-8 md:mt-12 px-4">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous solution"
          className="p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-gray-50 hover:border-black transition-all duration-300 active:scale-95 min-w-[44px] min-h-[44px] w-[44px] h-[44px] flex items-center justify-center touch-manipulation"
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6 text-black" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to solution ${index + 1}`}
              className={`
                transition-all duration-300 rounded-full touch-manipulation
                ${activeIndex === index
                  ? 'w-8 h-2 bg-black min-h-[8px]'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 min-h-[8px]'
                }
              `}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next solution"
          className="p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-gray-50 hover:border-black transition-all duration-300 active:scale-95 min-w-[44px] min-h-[44px] w-[44px] h-[44px] flex items-center justify-center touch-manipulation"
        >
          <ChevronRight size={20} className="md:w-6 md:h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

// Card component with peek effect
const CardWithPeekEffect: React.FC<{
  index: number;
  service: Service;
  serviceCount: number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}> = ({ index, service, serviceCount, scrollContainerRef }) => {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const [zIndex, setZIndex] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !cardRef.current) return;
    
    const updateStyle = () => {
      const isSmallMobile = window.innerWidth < 640;
      const isMobile = window.innerWidth < 768;
      const isLargeScreen = window.innerWidth >= 1024;
      
      // On mobile, reduce peek effect or remove it
      if (isMobile) {
        // On very small screens, no peek effect
        if (isSmallMobile) {
          setOpacity(1);
          setScale(1);
          setZIndex(1);
          return;
        }
        // On tablet-sized mobile, minimal peek (8-10%)
        setOpacity(0.7);
        setScale(0.98);
        setZIndex(1);
        return;
      }
      
      // Get actual card element position relative to viewport
      const cardRect = cardRef.current!.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const viewportCenter = window.innerWidth / 2;
      const cardCenter = cardRect.left + (cardRect.width / 2);
      const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
      
      // Card width calculation based on screen size
      // On mobile, account for section padding
      const sectionPadding = (isSmallMobile || isMobile) ? 48 : 0;
      const cardWidth = isSmallMobile 
        ? window.innerWidth - sectionPadding
        : isMobile 
        ? window.innerWidth - sectionPadding
        : isLargeScreen 
        ? window.innerWidth * 0.75 
        : window.innerWidth * 0.85;
      
      // Use a threshold based on card width to determine if card is centered
      // Center card threshold: within 10% of card width from viewport center
      const centerThreshold = cardWidth * 0.1;
      const isCenterCard = distanceFromCenter < centerThreshold;
      
      // Center card: ALWAYS full opacity, scale 1, highest z-index
      if (isCenterCard) {
        setOpacity(1);
        setScale(1);
        setZIndex(10);
        return;
      }
      
      // Side cards: reduced opacity and scale
      const maxDistance = cardWidth * 0.6;
      const newOpacity = Math.max(0.4, 1 - (distanceFromCenter / maxDistance) * 0.6);
      const newScale = Math.max(0.95, 1 - (distanceFromCenter / maxDistance) * 0.05);
      
      setOpacity(newOpacity);
      setScale(newScale);
      setZIndex(1);
    };
    
    updateStyle();
    container.addEventListener('scroll', updateStyle, { passive: true });
    window.addEventListener('resize', updateStyle);
    
    return () => {
      container.removeEventListener('scroll', updateStyle);
      window.removeEventListener('resize', updateStyle);
    };
  }, [index, scrollContainerRef]);
  
  const isSmallMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isLargeScreen = typeof window !== 'undefined' && window.innerWidth >= 1024;
  
  // Card width based on screen size
  // On mobile, cards should be full width within the section container (accounting for section padding: px-6 = 24px on each side = 48px total)
  // On desktop, use viewport-based widths for peek effect
  const cardWidth = isSmallMobile || isMobile ? '100%' : isLargeScreen ? '75vw' : '85vw';
  
  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 flex items-center justify-center transition-all duration-300 ease-out relative"
      style={{
        width: cardWidth,
        scrollSnapAlign: 'center',
        scrollSnapStop: 'always',
        scrollMarginLeft: '0px',
        scrollMarginRight: '0px',
        opacity: isSmallMobile ? 1 : opacity,
        transform: isSmallMobile ? 'none' : `scale(${scale})`,
        zIndex: isSmallMobile ? 1 : zIndex,
        marginRight: '0',
        pointerEvents: isSmallMobile ? 'auto' : (opacity < 0.6 ? 'none' : 'auto'),
      }}
    >
      <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-8 border border-gray-200 shadow-sm h-full w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 h-full">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            {/* Number */}
            <div className="mb-3 md:mb-4">
              <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-200 leading-none">
                {service.number}
              </span>
            </div>

            {/* Title */}
            <div className="mb-3 md:mb-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-black">
                {service.title}
              </h3>
            </div>

            {/* Tagline Badge */}
            <div className="inline-block px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-bold uppercase tracking-widest text-black subhead w-fit mb-3 md:mb-4">
              {service.tagline}
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-5">
              {service.description}
            </p>

            {/* Deliverables List */}
            <div className="space-y-2.5 md:space-y-3 mb-4 md:mb-5">
              {service.deliverables.slice(0, 4).map((d, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm md:text-base font-medium text-gray-600"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-black shrink-0">
                    <Check size={12} />
                  </div>
                  {d}
                </div>
              ))}
            </div>

            {/* Outcome & CTA */}
            <div className="pt-2 md:pt-4 space-y-4">
              <div className="text-xs md:text-sm text-gray-400 font-bold uppercase">
                Outcome: <span className="text-black">{service.outcome}</span>
              </div>
              <Button 
                variant="primary" 
                className="w-full sm:w-auto min-w-[280px] justify-center group"
                onClick={() => window.open('https://cal.com/aitoma.ai/45discovery-aitoma', '_blank', 'noopener,noreferrer')}
              >
                Book Consultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform ml-2"/>
              </Button>
            </div>
          </div>

          {/* Graphic Area */}
          <div className="bg-[#F8F9FA] rounded-2xl border border-gray-100 overflow-hidden relative flex items-center justify-center p-3 md:p-5 lg:p-6 min-h-[250px] md:min-h-[300px] lg:min-h-[350px] shadow-inner">
            <div className="w-full h-full flex items-center justify-center overflow-auto">
              {service.graphic}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
