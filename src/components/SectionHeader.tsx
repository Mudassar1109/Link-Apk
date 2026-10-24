import React from 'react';

interface SectionHeaderProps {
  title: string;
  icon?: string;
  badge?: string;
  onSeeMore?: () => void;
  seeMoreLabel?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  badge,
  onSeeMore,
  seeMoreLabel = 'See More'
}) => {
  return (
    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e5eaf0]">
      <div className="flex items-center gap-2.5">
        {icon && (
          <div className="w-7 h-7 rounded-md bg-[#f5f7f9] text-[#2fa5bd] border border-[#e5eaf0] flex items-center justify-center text-xs">
            <i className={icon}></i>
          </div>
        )}
        <h2 className="text-base sm:text-lg font-bold text-[#172033] tracking-tight">
          {title}
        </h2>
        {badge && (
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-[#2fa5bd] bg-[#2fa5bd]/10 rounded border border-[#2fa5bd]/20 uppercase">
            {badge}
          </span>
        )}
      </div>

      {onSeeMore && (
        <button
          onClick={onSeeMore}
          className="text-xs font-semibold text-[#2fa5bd] hover:text-[#23869b] flex items-center gap-1 transition-colors group"
        >
          <span>{seeMoreLabel}</span>
          <i className="fa-solid fa-angle-right text-[10px] group-hover:translate-x-0.5 transition-transform"></i>
        </button>
      )}
    </div>
  );
};
