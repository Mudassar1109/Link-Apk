import React, { useState, useRef } from 'react';

interface HomeHeroBannerProps {
  onNavigate: (tab: 'home' | 'games' | 'apps' | 'categories') => void;
  onOpenSearch?: () => void;
}

export const HomeHeroBanner: React.FC<HomeHeroBannerProps> = ({
  onNavigate,
  onOpenSearch
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle interactive 3D perspective effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation 2.5 degrees for smooth, elegant feel
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      {/* Ambient Pulsing Glow Backdrop */}
      <div 
        className="absolute inset-0 -top-4 -bottom-4 bg-gradient-to-r from-[#2fa5bd]/15 via-[#10b981]/15 to-[#3b82f6]/15 blur-3xl rounded-full pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      {/* Main Interactive 3D Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01, 1.01, 1)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="relative group rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c1322] to-[#172033] border border-[#2fa5bd]/30 shadow-2xl shadow-[#2fa5bd]/15 select-none transition-shadow duration-300 hover:shadow-cyan-500/20"
      >
        {/* Banner Graphic Asset */}
        <div className="relative w-full overflow-hidden aspect-[1200/360] min-h-[170px] sm:min-h-[240px] md:min-h-[290px] lg:min-h-[340px] flex items-center justify-center">
          <img
            src="/assets/aistudio/image_c76602a3.png"
            alt="LinkDit Apk - Get Paid Apps & Games for Free"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            loading="eager"
          />

          {/* Animated Light Sweep / Diagonal Gloss Shimmer Effect */}
          <div 
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-light-sweep"
            aria-hidden="true"
          />

          {/* Subtle Top & Bottom Vignette / Glass Depth */}
          <div 
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/10" 
            aria-hidden="true"
          />

          {/* Interactive Floating Quick-Badges & CTAs on the Banner */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex flex-wrap gap-2 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-md shadow-md animate-float-soft">
              <i className="fa-solid fa-shield-halved text-[10px]"></i>
              100% Virus Free & Tested
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#2fa5bd]/90 text-white backdrop-blur-md shadow-md">
              <i className="fa-solid fa-bolt text-[10px]"></i>
              High Speed Direct APK
            </span>
          </div>

          {/* Bottom Interactive Bar inside Banner */}
          <div className="absolute bottom-2 sm:bottom-4 inset-x-2 sm:inset-x-6 flex items-center justify-between pointer-events-auto">
            {/* Left Tag */}
            <div className="hidden md:flex items-center gap-2 text-white/90 text-xs font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Daily Fresh Updates • Premium Unlocked</span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              <button
                type="button"
                onClick={() => onNavigate('games')}
                className="cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95"
              >
                <i className="fa-solid fa-gamepad text-xs"></i>
                <span>Explore Games</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('apps')}
                className="cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 shadow-md transition-all duration-200 active:scale-95"
              >
                <i className="fa-solid fa-mobile-screen-button text-xs"></i>
                <span>Browse Apps</span>
              </button>

              {onOpenSearch && (
                <button
                  type="button"
                  onClick={onOpenSearch}
                  title="Search APKs"
                  className="cursor-pointer p-1.5 sm:p-2 rounded-xl text-white bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/15 transition-all duration-200 active:scale-95"
                >
                  <i className="fa-solid fa-magnifying-glass text-xs sm:text-sm"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
