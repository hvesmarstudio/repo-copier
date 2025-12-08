import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export interface TestimonialData {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialSliderProps {
  testimonials: TestimonialData[];
  className?: string;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPaused, testimonials.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    // Reset timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div 
      className={`bg-[#1A1A1A] text-white p-5 md:p-6 lg:p-8 rounded-2xl flex flex-col relative overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] min-h-[250px] md:min-h-[280px] lg:min-h-[300px] ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={20} className="text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
        aria-label="Next testimonial"
      >
        <ChevronRight size={20} className="text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full min-h-0">
        {/* Quote Section */}
        <div className="flex-1 flex flex-col min-h-0 mb-6 md:mb-8">
          <div className="flex gap-1 mb-4 md:mb-6 shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="md:w-4 md:h-4 text-yellow-500/80 fill-current" />
            ))}
          </div>

          <div className="relative flex-1 min-h-[120px] md:min-h-[140px] lg:min-h-[160px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                  index === currentIndex 
                    ? 'opacity-100 translate-x-0' 
                    : index < currentIndex 
                      ? 'opacity-0 -translate-x-8' 
                      : 'opacity-0 translate-x-8'
                }`}
                style={{ pointerEvents: index === currentIndex ? 'auto' : 'none' }}
              >
                <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-medium leading-relaxed break-words pr-2">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Author Info and Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-gray-700/50 shrink-0">
          <div className="relative w-full sm:w-auto min-h-[40px] md:min-h-[48px]">
             {testimonials.map((testimonial, index) => (
                <div 
                    key={testimonial.id}
                    className={`transition-opacity duration-500 ${index === currentIndex ? 'opacity-100 relative' : 'opacity-0 absolute top-0 left-0 pointer-events-none'}`}
                >
                    <div className="font-bold text-sm md:text-base lg:text-lg">{testimonial.author}</div>
                    <div className="text-gray-400 text-xs md:text-sm lg:text-base">{testimonial.role}, {testimonial.company}</div>
                </div>
             ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex gap-2 shrink-0 items-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 touch-manipulation min-h-[8px] ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-gray-600 hover:bg-gray-400 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};