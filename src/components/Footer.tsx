import React from 'react';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenLegal: (pageId: string) => void;
  siteName?: string;
  tagline?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegal,
  siteName = 'LinkDit Apk',
  tagline = 'Discover the Best Android Apps & Games'
}) => {
  return (
    <footer className="w-full bg-white border-t border-[#e5eaf0] mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#e5eaf0]">
          
          {/* Col 1 & 2: Brand and Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <img
                src="/assets/aistudio/image_f95317bc.png"
                alt="LinkDit Apk"
                className="h-9 sm:h-10 w-auto max-w-[210px] object-contain"
              />
            </div>
            
            <p className="mt-3 text-xs text-[#657184] leading-relaxed max-w-sm">
              {tagline}. An authoritative catalog connecting mobile power users with genuine Android applications, games, and open-source tools with official developer links.
            </p>

            <div className="mt-4 flex items-center gap-3 text-[#657184]">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-md bg-[#f5f7f9] hover:bg-[#e5eaf0] hover:text-[#172033] flex items-center justify-center text-sm border border-[#e5eaf0] transition-colors"
                aria-label="LinkDit Apk on GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-md bg-[#f5f7f9] hover:bg-[#e5eaf0] hover:text-[#172033] flex items-center justify-center text-sm border border-[#e5eaf0] transition-colors"
                aria-label="LinkDit Apk on X"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-md bg-[#f5f7f9] hover:bg-[#e5eaf0] hover:text-[#172033] flex items-center justify-center text-sm border border-[#e5eaf0] transition-colors"
                aria-label="LinkDit Apk Telegram Channel"
              >
                <i className="fa-brands fa-telegram"></i>
              </a>
              <a
                href="https://reddit.com/r/androidapps"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-md bg-[#f5f7f9] hover:bg-[#e5eaf0] hover:text-[#172033] flex items-center justify-center text-sm border border-[#e5eaf0] transition-colors"
                aria-label="Android Apps Community"
              >
                <i className="fa-brands fa-reddit"></i>
              </a>
            </div>
          </div>

          {/* Col 3: Discovery Directory */}
          <div>
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-3">
              Explore Portal
            </h4>
            <ul className="space-y-2 text-xs text-[#657184]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Featured Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('games')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Android Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('apps')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Mobile Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Category Index
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Editorial &amp; Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Categories */}
          <div>
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-3">
              Popular Genres
            </h4>
            <ul className="space-y-2 text-xs text-[#657184]">
              <li>
                <button
                  onClick={() => onNavigate('categories', 'action')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Action Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories', 'emulation')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Emulators &amp; Retro
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories', 'productivity')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Productivity &amp; Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories', 'security')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Privacy &amp; Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories', 'developer-tools')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Developer Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Trust Policies */}
          <div>
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-3">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#657184]">
              <li>
                <button
                  onClick={() => onOpenLegal('about')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  About LinkDit Apk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('editorial')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Editorial Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('contact')}
                  className="hover:text-[#2fa5bd] transition-colors"
                >
                  Contact &amp; DMCA
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Technical Disclaimers */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#657184] gap-3">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} LinkDit Apk. All rights reserved.</span>
            <span>•</span>
            <span className="text-[#16865c] flex items-center gap-1">
              <i className="fa-solid fa-check text-[9px]"></i>
              Zero Piracy / Official Developer Links
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#657184]">
              Android is a trademark of Google LLC.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
