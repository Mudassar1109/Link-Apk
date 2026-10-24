import React, { useState, useRef, useEffect } from 'react';
import { Banner } from '../types';

interface ContinuousCarouselProps {
  banners: Banner[];
  onSelectBanner: (destinationUrl: string) => void;
}

export const ContinuousCarousel: React.FC<ContinuousCarouselProps> = ({ banners, onSelectBanner }) => {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // If no active banners, do not render empty space
  if (!banners || banners.length === 0) {
    return null;
  }

  // Duplicate items twice to achieve seamless infinite loop
  const displayBanners = [...banners, ...banners];

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 select-none"
      aria-label="Featured Android Spotlights"
    >
      {/* Header Bar with Pause Status & Prev/Next Controls */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#2fa5bd] animate-pulse"></div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#172033]">
            Editor&apos;s Featured Spotlight
          </h2>
          <span className="hidden sm:inline text-[11px] text-[#657184]">
            (Hover or focus to pause)
          </span>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            className="w-7 h-7 rounded-md bg-[#f5f7f9] hover:bg-[#e5eaf0] text-[#172033] border border-[#e5eaf0] flex items-center justify-center text-xs transition-colors focus:ring-2 focus:ring-[#2fa5bd]"
            aria-label="Previous Featured Card"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-7 h-7 rounded-md bg-[#f5f7f9] hover:bg-[#e5eaf0] text-[#172033] border border-[#e5eaf0] flex items-center justify-center text-xs transition-colors focus:ring-2 focus:ring-[#2fa5bd]"
            aria-label={isPaused ? "Play Carousel" : "Pause Carousel"}
            title={isPaused ? "Play" : "Pause"}
          >
            <i className={`fa-solid ${isPaused ? 'fa-play' : 'fa-pause'} text-[10px]`}></i>
          </button>
          <button
            onClick={handleNext}
            className="w-7 h-7 rounded-md bg-[#f5f7f9] hover:bg-[#e5eaf0] text-[#172033] border border-[#e5eaf0] flex items-center justify-center text-xs transition-colors focus:ring-2 focus:ring-[#2fa5bd]"
            aria-label="Next Featured Card"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Marquee Carousel Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl border border-[#e5eaf0] bg-[#f5f7f9] py-3 shadow-sm"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-live="polite"
      >
        {/* Soft edge blur overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#f5f7f9] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f5f7f9] to-transparent z-10 pointer-events-none"></div>

        {/* Continuous Right-to-Left Track */}
        <div
          ref={trackRef}
          className={`animate-marquee-continuous flex gap-3.5 px-3.5 ${
            isPaused ? 'carousel-paused' : ''
          }`}
          style={{ animationDuration: `${Math.max(25, banners.length * 6)}s` }}
        >
          {displayBanners.map((banner, index) => (
            <div
              key={`${banner.id}-${index}`}
              onClick={() => onSelectBanner(banner.destination_url)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectBanner(banner.destination_url);
                }
              }}
              role="button"
              tabIndex={0}
              className="group relative flex-shrink-0 w-72 sm:w-80 md:w-96 h-40 sm:h-44 rounded-lg overflow-hidden border border-[#e5eaf0] bg-white cursor-pointer transition-all duration-300 hover:shadow-md hover:border-[#2fa5bd] focus:outline-none focus:ring-2 focus:ring-[#2fa5bd]"
            >
              {/* Cover Image */}
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading={index < 4 ? "eager" : "lazy"}
              />

              {/* Gradient Scrim for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/90 via-[#172033]/40 to-transparent"></div>

              {/* Editorial Badge */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-white/90 text-[#172033] backdrop-blur-sm border border-white/50">
                  <i className="fa-solid fa-star text-amber-500 text-[9px]"></i>
                  Featured Pick
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <h3 className="text-sm font-bold text-white group-hover:text-[#2fa5bd] transition-colors line-clamp-1">
                  {banner.title}
                </h3>
                {banner.subtitle && (
                  <p className="text-xs text-slate-200 mt-0.5 line-clamp-1 font-normal">
                    {banner.subtitle}
                  </p>
                )}
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1 text-[#2fa5bd]">
                    Explore official release
                    <i className="fa-solid fa-arrow-right text-[9px] group-hover:translate-x-1 transition-transform"></i>
                  </span>
                  <span className="text-[10px] text-white/70">Verified Source</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
