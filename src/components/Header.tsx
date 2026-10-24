import React, { useState } from 'react';
import { AdminUser } from '../types';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenSearch: () => void;
  adminUser: AdminUser | null;
  onOpenAdmin: () => void;
  onLogoutAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  adminUser,
  onOpenAdmin,
  onLogoutAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fa-solid fa-house' },
    { id: 'games', label: 'Games', icon: 'fa-solid fa-gamepad' },
    { id: 'apps', label: 'Apps', icon: 'fa-solid fa-shapes' },
    { id: 'categories', label: 'Categories', icon: 'fa-solid fa-layer-group' },
    { id: 'blog', label: 'Blog', icon: 'fa-solid fa-newspaper' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e5eaf0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
          aria-label="DroidNest Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2fa5bd] flex items-center justify-center text-white shadow-sm shadow-[#2fa5bd]/20 group-hover:bg-[#23869b] transition-colors">
            <i className="fa-brands fa-android text-lg"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[#172033] leading-none">
              Droid<span className="text-[#2fa5bd]">Nest</span>
            </span>
            <span className="text-[10px] font-medium text-[#657184] tracking-wider uppercase">
              App Discovery
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#2fa5bd] bg-[#f5f7f9] font-semibold'
                    : 'text-[#657184] hover:text-[#172033] hover:bg-[#f5f7f9]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Language, Admin */}
        <div className="flex items-center gap-2">
          
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#657184] bg-[#f5f7f9] hover:bg-[#e5eaf0] rounded-md border border-[#e5eaf0] transition-colors"
            title="Search Apps & Games (or press /)"
            aria-label="Search apps and games"
          >
            <i className="fa-solid fa-magnifying-glass text-[#2fa5bd]"></i>
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] bg-white border border-[#e5eaf0] rounded text-[#657184]">
              /
            </kbd>
          </button>

          {/* Language Selector */}
          <div className="relative hidden sm:block">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="appearance-none bg-transparent text-xs font-medium text-[#657184] hover:text-[#172033] py-1.5 pl-2 pr-6 rounded cursor-pointer border-none focus:outline-none"
              aria-label="Select Language"
            >
              <option value="EN">EN</option>
              <option value="ES">ES</option>
              <option value="FR">FR</option>
              <option value="DE">DE</option>
            </select>
            <i className="fa-solid fa-chevron-down text-[9px] text-[#657184] absolute right-1.5 top-2.5 pointer-events-none"></i>
          </div>

          {/* Admin Login Link */}
          {adminUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAdmin}
                className="px-2.5 py-1 text-xs font-semibold text-[#2fa5bd] bg-[#2fa5bd]/10 border border-[#2fa5bd]/30 rounded-md hover:bg-[#2fa5bd]/20 transition-colors flex items-center gap-1.5"
                title="Admin Control Panel"
              >
                <i className="fa-solid fa-gauge-high"></i>
                <span className="hidden sm:inline">Admin</span>
              </button>
              <button
                onClick={onLogoutAdmin}
                className="p-1.5 text-xs text-[#dc3545] hover:bg-[#dc3545]/10 rounded-md transition-colors"
                title="Log Out"
                aria-label="Log Out Administrator"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1 text-xs font-medium text-[#657184] hover:text-[#172033] hover:bg-[#f5f7f9] rounded-md transition-colors flex items-center gap-1.5"
              title="Administrator Portal"
            >
              <i className="fa-solid fa-lock text-[11px]"></i>
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#657184] hover:text-[#172033] hover:bg-[#f5f7f9] rounded-md focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e5eaf0] bg-white px-4 pt-3 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#2fa5bd] bg-[#f5f7f9] font-semibold'
                    : 'text-[#657184] hover:text-[#172033] hover:bg-[#f5f7f9]'
                }`}
              >
                <i className={`${item.icon} w-5 text-center text-[#2fa5bd]`}></i>
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#e5eaf0] flex items-center justify-between text-xs text-[#657184] px-3">
            <span>Language: English</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-[#2fa5bd] font-medium"
            >
              {adminUser ? 'Open Admin' : 'Admin Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
