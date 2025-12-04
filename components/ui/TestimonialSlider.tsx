import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

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

  return (
    <div 
      className={`bg-[#1A1A1A] text-white p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex gap-1 mb-6 text-gray-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" className="text-yellow-500/80" />
            ))}
          </div>

          <div className="relative min-h-[120px]">
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
                <p className="text-xl md:text-2xl font-medium leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between">
          <div className="relative min-h-[48px] w-full">
             {testimonials.map((testimonial, index) => (
                <div 
                    key={testimonial.id}
                    className={`flex items-center gap-4 absolute bottom-0 left-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-sm border border-gray-600">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <div className="font-bold">{testimonial.author}</div>
                        <div className="text-gray-400 text-sm">{testimonial.role}, {testimonial.company}</div>
                    </div>
                </div>
             ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex gap-2 mb-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-gray-600 hover:bg-gray-400'
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