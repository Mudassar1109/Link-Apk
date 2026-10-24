import React, { useState, useEffect, useRef } from 'react';
import { Listing } from '../types';
import { dbService } from '../services/db';

interface HeroSearchProps {
  onSelectListing: (listing: Listing) => void;
  onFilterCategory?: (categorySlug: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSelectListing, onFilterCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search against real database listings
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);
    const timer = setTimeout(async () => {
      try {
        const found = await dbService.getListings({
          search: searchTerm,
          status: 'published',
          limit: 8
        });
        setResults(found);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    setIsOpen(false);
  };

  const popularTags = ['Open Source', 'Action', 'Productivity', 'Security', 'Emulator', 'Privacy'];

  return (
    <section className="pt-8 pb-7 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      {/* Primary H1 */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172033] tracking-tight leading-tight">
        Discover the Best <span className="text-[#2fa5bd]">Android Apps & Games</span>
      </h1>
      
      {/* Supporting Copy */}
      <p className="mt-2.5 text-sm sm:text-base text-[#657184] max-w-2xl mx-auto font-normal">
        Explore useful apps, exciting games, productivity tools and entertainment for your Android device.
      </p>

      {/* Centred Search Container */}
      <div ref={containerRef} className="relative mt-6 max-w-2xl mx-auto text-left">
        <div className="relative flex items-center shadow-sm">
          <i className="fa-solid fa-magnifying-glass absolute left-4 text-base text-[#2fa5bd] pointer-events-none"></i>
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => { if (searchTerm.trim()) setIsOpen(true); }}
            placeholder="Search by title, developer, category, or tags..."
            className="w-full pl-11 pr-12 py-3 bg-white text-sm text-[#172033] placeholder-[#657184] border border-[#e5eaf0] rounded-xl focus:border-[#2fa5bd] focus:ring-2 focus:ring-[#2fa5bd]/15 transition-all outline-none"
            aria-label="Search Android apps and games"
          />

          {loading ? (
            <div className="absolute right-4 text-[#2fa5bd] text-sm animate-spin">
              <i className="fa-solid fa-circle-notch"></i>
            </div>
          ) : searchTerm ? (
            <button
              onClick={handleClear}
              className="absolute right-4 text-[#657184] hover:text-[#172033] p-1 text-xs rounded transition-colors"
              aria-label="Clear search input"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          ) : (
            <span className="absolute right-4 text-[11px] font-medium text-[#657184] bg-[#f5f7f9] px-2 py-0.5 rounded border border-[#e5eaf0]">
              Enter
            </span>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-[#e5eaf0] shadow-xl z-50 overflow-hidden divide-y divide-[#e5eaf0] animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="p-2.5 bg-[#f5f7f9] flex items-center justify-between text-xs text-[#657184]">
              <span className="font-semibold text-[#172033]">
                {loading ? 'Searching database...' : `Results for "${searchTerm}" (${results.length})`}
              </span>
              <span>Direct official links</span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-sm text-[#657184]">
                <i className="fa-solid fa-spinner fa-spin text-[#2fa5bd] text-xl mb-2 block"></i>
                Querying DroidNest catalog...
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <i className="fa-solid fa-magnifying-glass-chart text-2xl text-[#657184]/50 mb-2 block"></i>
                <p className="text-sm font-semibold text-[#172033]">No matching applications found</p>
                <p className="text-xs text-[#657184] mt-1">
                  Try checking your spelling or searching for a broader term like &quot;open source&quot; or &quot;action&quot;.
                </p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto divide-y divide-[#e5eaf0]">
                {results.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectListing(item);
                      setIsOpen(false);
                    }}
                    className="w-full p-3 flex items-center gap-3.5 hover:bg-[#f5f7f9] text-left transition-colors group"
                  >
                    <img
                      src={item.icon_url}
                      alt={item.title}
                      className="w-11 h-11 rounded-lg object-cover border border-[#e5eaf0] shrink-0 group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#172033] truncate group-hover:text-[#2fa5bd] transition-colors">
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          item.listing_type === 'game' 
                            ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                            : 'bg-cyan-50 text-[#23869b] border border-cyan-200'
                        }`}>
                          {item.listing_type}
                        </span>
                      </div>
                      <p className="text-xs text-[#657184] truncate mt-0.5">
                        {item.short_description || item.developer}
                      </p>
                    </div>
                    <div className="text-right shrink-0 text-xs">
                      <span className="text-[11px] font-medium text-[#657184] block">{item.version}</span>
                      <span className="text-[10px] text-[#657184]">{item.app_size}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popular Quick Filter Pills */}
      <div className="mt-3.5 flex items-center justify-center flex-wrap gap-1.5 text-xs text-[#657184]">
        <span className="text-[11px] font-medium mr-1">Trending:</span>
        {popularTags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSearchTerm(tag);
              if (onFilterCategory) onFilterCategory(tag);
            }}
            className="px-2.5 py-1 bg-[#f5f7f9] hover:bg-[#e5eaf0] hover:text-[#172033] rounded-md border border-[#e5eaf0] transition-colors text-[11px]"
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};
