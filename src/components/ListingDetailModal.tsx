import React, { useState } from 'react';
import { Listing } from '../types';

interface ListingDetailModalProps {
  listing: Listing;
  onClose: () => void;
  onSelectListing: (listing: Listing) => void;
  allListings: Listing[];
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  onClose,
  onSelectListing,
  allListings
}) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  // Related listings: same category or same type, excluding current
  const relatedListings = allListings
    .filter(l => l.id !== listing.id && (l.category_id === listing.category_id || l.listing_type === listing.listing_type))
    .slice(0, 3);

  // Format updated date
  const formattedDate = listing.updated_at
    ? new Date(listing.updated_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Recently verified';

  // Construct JSON-LD SoftwareApplication schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": listing.title,
    "operatingSystem": listing.android_requirement || "Android",
    "applicationCategory": listing.listing_type === 'game' ? "GameApplication" : "Application",
    "softwareVersion": listing.version,
    "fileSize": listing.app_size,
    "author": {
      "@type": "Organization",
      "name": listing.developer
    },
    "description": listing.short_description || listing.description
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      {/* Dynamic Schema Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#e5eaf0] overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#172033] shadow-md border border-[#e5eaf0] flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#2fa5bd]"
          aria-label="Close detail modal"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        {/* Hero Cover Banner */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-[#f5f7f9] overflow-hidden">
          <img
            src={listing.cover_image_url}
            alt={`${listing.title} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>

          {/* Breadcrumbs inside cover */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 text-xs text-[#172033] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md border border-white/80 shadow-xs">
            <span>Home</span>
            <i className="fa-solid fa-chevron-right text-[9px] text-[#657184]"></i>
            <span className="capitalize">{listing.listing_type}s</span>
            <i className="fa-solid fa-chevron-right text-[9px] text-[#657184]"></i>
            <span className="font-semibold text-[#2fa5bd]">{listing.title}</span>
          </div>
        </div>

        {/* App Header Bar */}
        <div className="px-5 sm:px-8 -mt-12 sm:-mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e5eaf0]">
            <div className="flex items-end gap-4">
              {/* App Icon */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 border-white shadow-lg overflow-hidden shrink-0">
                <img
                  src={listing.icon_url}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Developer */}
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#172033]">
                    {listing.title}
                  </h1>
                  <span className="w-5 h-5 rounded-full bg-[#16865c]/10 text-[#16865c] flex items-center justify-center text-[10px]" title="Authentic Developer Listing">
                    <i className="fa-solid fa-check"></i>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#657184] font-medium mt-0.5">
                  Developer: <span className="text-[#172033] font-semibold">{listing.developer}</span>
                </p>
                {listing.category_name && (
                  <span className="inline-block mt-1 text-[11px] font-semibold text-[#2fa5bd] bg-[#f5f7f9] px-2 py-0.5 rounded border border-[#e5eaf0]">
                    {listing.category_name}
                  </span>
                )}
              </div>
            </div>

            {/* Official Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {listing.official_store_url && (
                <a
                  href={listing.official_store_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#2fa5bd] hover:bg-[#23869b] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
                >
                  <i className="fa-brands fa-google-play"></i>
                  <span>Official Store</span>
                </a>
              )}

              {listing.authorised_download_url && (
                <a
                  href={listing.authorised_download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#f5f7f9] hover:bg-[#e5eaf0] text-[#172033] text-xs font-semibold rounded-lg border border-[#e5eaf0] flex items-center gap-2 transition-colors"
                >
                  <i className="fa-solid fa-download text-[#2fa5bd]"></i>
                  <span>Official Download</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-6">
          
          {/* Factual Technical Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f5f7f9] p-4 rounded-xl border border-[#e5eaf0] text-xs">
            <div>
              <span className="text-[#657184] block text-[11px]">Latest Version</span>
              <span className="font-bold text-[#172033] mt-0.5 block">{listing.version}</span>
            </div>
            <div>
              <span className="text-[#657184] block text-[11px]">Package Size</span>
              <span className="font-bold text-[#172033] mt-0.5 block">{listing.app_size}</span>
            </div>
            <div>
              <span className="text-[#657184] block text-[11px]">Android Requirement</span>
              <span className="font-bold text-[#172033] mt-0.5 block">{listing.android_requirement}</span>
            </div>
            <div>
              <span className="text-[#657184] block text-[11px]">Last Updated</span>
              <span className="font-bold text-[#172033] mt-0.5 block">{formattedDate}</span>
            </div>
          </div>

          {/* About / Description */}
          <div>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mb-2">
              About This {listing.listing_type === 'game' ? 'Game' : 'Application'}
            </h2>
            <p className="text-xs sm:text-sm text-[#172033]/80 leading-relaxed whitespace-pre-line">
              {listing.description || listing.short_description}
            </p>
          </div>

          {/* Screenshots Gallery */}
          {listing.screenshots && listing.screenshots.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mb-3">
                Official Screenshots
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {listing.screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedScreenshot(shot)}
                    className="aspect-video rounded-lg overflow-hidden border border-[#e5eaf0] cursor-pointer hover:border-[#2fa5bd] transition-colors"
                  >
                    <img
                      src={shot}
                      alt={`${listing.title} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Links & Verification Transparency */}
          <div className="p-4 bg-white rounded-xl border border-[#e5eaf0] space-y-3">
            <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider flex items-center gap-1.5">
              <i className="fa-solid fa-link text-[#2fa5bd]"></i>
              External Developer Resources
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {listing.official_website && (
                <a
                  href={listing.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#f5f7f9] hover:bg-[#e5eaf0] rounded-md text-[#172033] border border-[#e5eaf0] flex items-center gap-1.5 font-medium transition-colors"
                >
                  <i className="fa-solid fa-globe text-[#2fa5bd]"></i>
                  Official Developer Site
                  <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-[#657184]"></i>
                </a>
              )}
              {listing.official_store_url && (
                <a
                  href={listing.official_store_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#f5f7f9] hover:bg-[#e5eaf0] rounded-md text-[#172033] border border-[#e5eaf0] flex items-center gap-1.5 font-medium transition-colors"
                >
                  <i className="fa-brands fa-google-play text-[#16865c]"></i>
                  Google Play Store
                  <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-[#657184]"></i>
                </a>
              )}
            </div>
            <p className="text-[11px] text-[#657184] italic">
              Notice: LinkDit Apk links directly to official storefronts and recognized publisher distributions. We do not host modified binaries, altered signatures, or unauthorized keygens.
            </p>
          </div>

          {/* Related Listings */}
          {relatedListings.length > 0 && (
            <div className="pt-4 border-t border-[#e5eaf0]">
              <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mb-3">
                Related {listing.listing_type === 'game' ? 'Games' : 'Apps'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedListings.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => {
                      onSelectListing(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-lg border border-[#e5eaf0] hover:border-[#2fa5bd] hover:bg-[#f5f7f9] flex items-center gap-2.5 text-left transition-all"
                  >
                    <img
                      src={rel.icon_url}
                      alt={rel.title}
                      className="w-10 h-10 rounded-md object-cover border border-[#e5eaf0] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#172033] truncate">
                        {rel.title}
                      </h4>
                      <p className="text-[10px] text-[#657184] truncate">
                        {rel.developer}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Fullscreen Screenshot Lightbox */}
      {selectedScreenshot && (
        <div
          onClick={() => setSelectedScreenshot(null)}
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={selectedScreenshot}
            alt="Expanded screenshot"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
};
