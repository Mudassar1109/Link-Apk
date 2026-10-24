import React from 'react';

interface EditorialIntroProps {
  title?: string;
  content?: string;
  onExploreOpenSource?: () => void;
  onViewGuidelines?: () => void;
}

export const EditorialIntro: React.FC<EditorialIntroProps> = ({
  title = 'Why LinkDit Apk Is Built Different',
  content,
  onExploreOpenSource,
  onViewGuidelines
}) => {
  return (
    <section className="bg-[#f5f7f9] border border-[#e5eaf0] rounded-2xl p-6 sm:p-8 mt-12 mb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5 text-[#2fa5bd] mb-3">
          <i className="fa-solid fa-certificate text-base"></i>
          <span className="text-xs font-bold uppercase tracking-wider">
            Editorial Integrity & Safety
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
          {title}
        </h2>

        <div className="mt-4 text-xs sm:text-sm text-[#657184] leading-relaxed space-y-3 font-normal">
          {content ? (
            <p className="whitespace-pre-line">{content}</p>
          ) : (
            <>
              <p>
                In a mobile ecosystem clouded by deceptive repackaged APKs, aggressive telemetry, and fake &quot;unlimited money&quot; mods, <strong>LinkDit Apk</strong> was founded on a strict standard: absolute verification and zero malware compromises.
              </p>
              <p>
                Every application and game in our catalog links directly to official developer storefronts, verified Google Play releases, or official GitHub &amp; F-Droid open-source repositories. We never host pirated binaries, altered signatures, or intrusive adware bundles.
              </p>
            </>
          )}
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#e5eaf0]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#e5eaf0] text-[#16865c] flex items-center justify-center shrink-0">
              <i className="fa-solid fa-shield-halved text-sm"></i>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#172033]">Official Sources Only</h3>
              <p className="text-[11px] text-[#657184] mt-0.5">
                We direct users straight to recognized repositories and authorized developer portals.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#e5eaf0] text-[#2fa5bd] flex items-center justify-center shrink-0">
              <i className="fa-solid fa-code text-sm"></i>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#172033]">Zero Modded/Cracked Files</h3>
              <p className="text-[11px] text-[#657184] mt-0.5">
                Zero tolerance for keygens, cracked software, or repackaged binaries with broken signatures.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#e5eaf0] text-purple-600 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-scale-balanced text-sm"></i>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#172033]">No Fabricated Metrics</h3>
              <p className="text-[11px] text-[#657184] mt-0.5">
                We never fabricate download counts or fake 5-star reviews to manipulate user trust.
              </p>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {onExploreOpenSource && (
            <button
              onClick={onExploreOpenSource}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#2fa5bd] hover:bg-[#23869b] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <i className="fa-brands fa-github text-xs"></i>
              <span>Browse Open-Source Android Apps</span>
            </button>
          )}
          {onViewGuidelines && (
            <button
              onClick={onViewGuidelines}
              className="px-3.5 py-2 text-xs font-medium text-[#172033] bg-white hover:bg-[#e5eaf0] border border-[#e5eaf0] rounded-lg transition-colors"
            >
              Read Full Editorial Guidelines
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
