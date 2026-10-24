import React from 'react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat)}
          className="p-3.5 bg-white rounded-xl border border-[#e5eaf0] hover:border-[#2fa5bd] hover:shadow-xs transition-all text-left flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-[#2fa5bd]"
        >
          <div className="w-10 h-10 rounded-lg bg-[#f5f7f9] text-[#2fa5bd] group-hover:bg-[#2fa5bd] group-hover:text-white transition-colors flex items-center justify-center text-base shrink-0 border border-[#e5eaf0]">
            <i className={cat.icon}></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-[#172033] group-hover:text-[#2fa5bd] transition-colors truncate">
                {cat.name}
              </h3>
              {typeof cat.count === 'number' && (
                <span className="text-[10px] font-semibold text-[#657184] bg-[#f5f7f9] px-1.5 py-0.2 rounded">
                  {cat.count}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#657184] line-clamp-1 mt-0.5">
              {cat.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
