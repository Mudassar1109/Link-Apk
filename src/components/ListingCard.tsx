import React, { useState } from 'react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onClick: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  const [coverError, setCoverError] = useState(false);
  const [iconError, setIconError] = useState(false);

  // Format updated date if available
  const formattedDate = listing.updated_at
    ? new Date(listing.updated_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <div
      onClick={() => onClick(listing)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(listing);
        }
      }}
      role="button"
      tabIndex={0}
      className="group flex flex-col bg-white rounded-xl border border-[#e5eaf0] overflow-hidden hover:border-[#2fa5bd] hover:shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2fa5bd]"
    >
      {/* 16:10 Landscape Cover Image */}
      <div className="relative aspect-[16/10] w-full bg-[#f5f7f9] overflow-hidden">
        {coverError ? (
          <div className="w-full h-full flex items-center justify-center bg-[#f5f7f9] text-[#657184]">
            <i className="fa-solid fa-image text-2xl text-[#657184]/40"></i>
          </div>
        ) : (
          <img
            src={listing.cover_image_url}
            alt={`${listing.title} cover`}
            onError={() => setCoverError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />
        )}

        {/* Type & Requirement Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${
            listing.listing_type === 'game'
              ? 'bg-purple-600/90 text-white'
              : 'bg-[#2fa5bd]/90 text-white'
          }`}>
            {listing.listing_type}
          </span>
          {listing.app_size && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-black/60 text-white backdrop-blur-xs">
              {listing.app_size}
            </span>
          )}
        </div>

        {/* Verified source badge */}
        <div className="absolute top-2 right-2 z-10">
          <span 
            className="w-6 h-6 rounded-full bg-white/90 text-[#16865c] flex items-center justify-center text-xs shadow-xs"
            title="Verified Official Distribution"
          >
            <i className="fa-solid fa-shield-halved text-[10px]"></i>
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div className="flex items-start gap-3">
          {/* Small Square App Icon */}
          <div className="relative w-12 h-12 rounded-lg bg-[#f5f7f9] border border-[#e5eaf0] overflow-hidden shrink-0 shadow-xs">
            {iconError ? (
              <div className="w-full h-full flex items-center justify-center text-[#2fa5bd]">
                <i className="fa-brands fa-android text-lg"></i>
              </div>
            ) : (
              <img
                src={listing.icon_url}
                alt={`${listing.title} icon`}
                onError={() => setIconError(true)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>

          {/* Title, Developer, and Category */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#172033] group-hover:text-[#2fa5bd] transition-colors truncate leading-snug">
              {listing.title}
            </h3>
            
            <p className="text-xs text-[#657184] truncate mt-0.5 font-normal">
              {listing.developer}
            </p>

            {listing.category_name && (
              <span className="inline-block mt-1 text-[11px] font-medium text-[#2fa5bd] bg-[#f5f7f9] px-2 py-0.5 rounded">
                {listing.category_name}
              </span>
            )}
          </div>
        </div>

        {/* Short Description */}
        {listing.short_description && (
          <p className="text-xs text-[#657184] mt-2.5 line-clamp-2 leading-relaxed">
            {listing.short_description}
          </p>
        )}

        {/* Compact Metadata Footer */}
        <div className="mt-3 pt-2.5 border-t border-[#e5eaf0] flex items-center justify-between text-[11px] text-[#657184]">
          <span className="font-medium text-[#172033] bg-[#f5f7f9] px-1.5 py-0.5 rounded border border-[#e5eaf0]">
            {listing.version}
          </span>

          {formattedDate && (
            <span className="text-[10px]">
              Updated {formattedDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
