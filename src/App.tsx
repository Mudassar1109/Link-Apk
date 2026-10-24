import React, { useState, useEffect } from 'react';
import { 
  Listing, 
  Category, 
  Banner, 
  BlogPost, 
  WebsiteSettings, 
  AdminUser 
} from './types';
import { dbService } from './services/db';
import { Header } from './components/Header';
import { HomeHeroBanner } from './components/HomeHeroBanner';
import { HeroSearch } from './components/HeroSearch';
import { ContinuousCarousel } from './components/ContinuousCarousel';
import { SectionHeader } from './components/SectionHeader';
import { ListingCard } from './components/ListingCard';
import { CategoryGrid } from './components/CategoryGrid';
import { EditorialIntro } from './components/EditorialIntro';
import { Footer } from './components/Footer';
import { ListingDetailModal } from './components/ListingDetailModal';
import { BlogView } from './components/BlogView';
import { LegalModal } from './components/LegalModal';
import { AdminPortal } from './components/AdminPortal';

export default function App() {
  // Check if current URL points to the dedicated /admin route
  const checkIsAdminUrl = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return (
      path === '/admin' || 
      path.startsWith('/admin/') || 
      hash === '#/admin' || 
      hash === '#admin' || 
      search.includes('route=admin')
    );
  };

  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdminUrl);

  // Navigation & View state for public portal
  const [currentTab, setCurrentTab] = useState<'home' | 'games' | 'apps' | 'categories' | 'blog'>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedBlogPostSlug, setSelectedBlogPostSlug] = useState<string | null>(null);
  
  // Modals & Panels
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [legalPageId, setLegalPageId] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Database Data States
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // URL route listener for browser navigation (/admin vs /)
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdminUrl());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Load initial data
  const loadPortalData = async () => {
    try {
      const [l, c, b, p, s] = await Promise.all([
        dbService.getListings({ status: 'published' }),
        dbService.getCategories(),
        dbService.getBanners(true),
        dbService.getBlogPosts(true),
        dbService.getSettings()
      ]);
      setAllListings(l);
      setCategories(c);
      setBanners(b);
      setBlogPosts(p);
      setSettings(s);
    } catch (err) {
      console.error('Failed to load LinkDit Apk catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortalData();
    const currentAdmin = dbService.getCurrentAdmin();
    if (currentAdmin) {
      setAdminUser(currentAdmin);
    }
  }, []);

  // Keyboard shortcut: '/' opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigate helper
  const handleNavigate = (tab: string, param?: string) => {
    if (tab === 'categories' && param) {
      setSelectedCategorySlug(param);
    } else {
      setSelectedCategorySlug(null);
    }
    setSelectedBlogPostSlug(null);
    setCurrentTab(tab as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPublic = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/');
    }
    setIsAdminRoute(false);
    loadPortalData();
  };

  // Open search focus
  const handleOpenSearch = () => {
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      handleNavigate('home');
    }
  };

  // Handle banner selection
  const handleSelectBanner = (destinationUrl: string) => {
    if (destinationUrl.startsWith('/apps/') || destinationUrl.startsWith('/games/')) {
      const slug = destinationUrl.split('/')[2];
      const match = allListings.find(l => l.slug === slug);
      if (match) {
        setSelectedListing(match);
        return;
      }
    }
    if (destinationUrl.startsWith('/apps')) {
      handleNavigate('apps');
    } else if (destinationUrl.startsWith('/games')) {
      handleNavigate('games');
    }
  };

  // Derived sections for Homepage layout
  const bestUpdatedGames = allListings
    .filter(l => l.listing_type === 'game' && l.is_updated)
    .slice(0, 3);

  const bestUpdatedApps = allListings
    .filter(l => l.listing_type === 'app' && l.is_updated)
    .slice(0, 3);

  const popularGames = allListings
    .filter(l => l.listing_type === 'game' && l.is_popular)
    .slice(0, 3);

  const popularApps = allListings
    .filter(l => l.listing_type === 'app' && l.is_popular)
    .slice(0, 3);

  const recentlyAdded = allListings
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  // Dedicated standalone route for Admin Portal (/admin)
  if (isAdminRoute) {
    return (
      <AdminPortal
        adminUser={adminUser}
        onLogin={(user) => {
          setAdminUser(user);
          loadPortalData();
        }}
        onLogout={() => {
          dbService.logoutAdmin();
          setAdminUser(null);
        }}
        onClose={navigateToPublic}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#172033] flex flex-col font-sans selection:bg-[#2fa5bd]/20 selection:text-[#172033]">
      
      {/* 1. Slim Sticky Header (Clean public interface, zero admin links) */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSearch={handleOpenSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {loading ? (
          <div className="py-24 text-center">
            <i className="fa-solid fa-circle-notch fa-spin text-3xl text-[#2fa5bd] mb-3 block"></i>
            <span className="text-sm font-semibold text-[#172033]">Loading LinkDit Apk portal...</span>
          </div>
        ) : currentTab === 'home' ? (
          /* ============================================================== */
          /* HOMEPAGE LAYOUT (Section 6 strictly ordered)                    */
          /* ============================================================== */
          <div className="space-y-6">
            
            {/* 1. Animated LinkDit Apk Top Hero Banner */}
            <HomeHeroBanner
              onNavigate={handleNavigate}
              onOpenSearch={handleOpenSearch}
            />

            {/* 2. Hero & Centred Search */}
            <HeroSearch
              onSelectListing={(listing) => setSelectedListing(listing)}
              onFilterCategory={(tag) => {
                const matchedCategory = categories.find(c => 
                  c.name.toLowerCase().includes(tag.toLowerCase()) || 
                  c.slug.includes(tag.toLowerCase())
                );
                if (matchedCategory) {
                  setSelectedCategorySlug(matchedCategory.slug);
                  setCurrentTab('categories');
                }
              }}
            />

            {/* 3. Continuous Right-to-Left Featured Carousel */}
            <ContinuousCarousel
              banners={banners}
              onSelectBanner={handleSelectBanner}
            />

            {/* Main Listings Grids Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-4">
              
              {/* 4. Best Updated Games */}
              {bestUpdatedGames.length > 0 && (
                <section aria-labelledby="heading-best-updated-games">
                  <SectionHeader
                    title="Best Updated Games"
                    icon="fa-solid fa-gamepad"
                    badge="Fresh Release"
                    onSeeMore={() => handleNavigate('games')}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {bestUpdatedGames.map(game => (
                      <ListingCard
                        key={game.id}
                        listing={game}
                        onClick={(item) => setSelectedListing(item)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 5. Best Updated Apps */}
              {bestUpdatedApps.length > 0 && (
                <section aria-labelledby="heading-best-updated-apps">
                  <SectionHeader
                    title="Best Updated Apps"
                    icon="fa-solid fa-mobile-screen"
                    badge="Verified Build"
                    onSeeMore={() => handleNavigate('apps')}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {bestUpdatedApps.map(app => (
                      <ListingCard
                        key={app.id}
                        listing={app}
                        onClick={(item) => setSelectedListing(item)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 6. Popular Games */}
              {popularGames.length > 0 && (
                <section aria-labelledby="heading-popular-games">
                  <SectionHeader
                    title="Popular Games"
                    icon="fa-solid fa-fire"
                    badge="Trending"
                    onSeeMore={() => handleNavigate('games')}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {popularGames.map(game => (
                      <ListingCard
                        key={game.id}
                        listing={game}
                        onClick={(item) => setSelectedListing(item)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 7. Popular Apps */}
              {popularApps.length > 0 && (
                <section aria-labelledby="heading-popular-apps">
                  <SectionHeader
                    title="Popular Apps"
                    icon="fa-solid fa-star"
                    badge="Top Rated"
                    onSeeMore={() => handleNavigate('apps')}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {popularApps.map(app => (
                      <ListingCard
                        key={app.id}
                        listing={app}
                        onClick={(item) => setSelectedListing(item)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 8. Recently Added */}
              {recentlyAdded.length > 0 && (
                <section aria-labelledby="heading-recently-added">
                  <SectionHeader
                    title="Recently Added"
                    icon="fa-solid fa-clock-rotate-left"
                    onSeeMore={() => handleNavigate('apps')}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {recentlyAdded.map(item => (
                      <ListingCard
                        key={item.id}
                        listing={item}
                        onClick={(l) => setSelectedListing(l)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Blank Catalog Status (When no apps or games added yet) */}
              {allListings.length === 0 && (
                <div className="p-8 sm:p-12 text-center bg-[#f5f7f9] border border-[#e5eaf0] rounded-2xl max-w-2xl mx-auto my-6">
                  <div className="w-14 h-14 bg-white rounded-2xl border border-[#e5eaf0] text-[#2fa5bd] flex items-center justify-center mx-auto mb-4 text-2xl shadow-xs">
                    <i className="fa-solid fa-layer-group"></i>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#172033]">
                    Portal Catalog is Ready
                  </h3>
                  <p className="text-xs sm:text-sm text-[#657184] mt-1.5 max-w-md mx-auto leading-relaxed">
                    All dummy data has been removed. You can now manually catalog your verified Android apps, games, and banners from the isolated admin panel at <code className="bg-white px-1.5 py-0.5 rounded border border-[#e5eaf0] text-[#2fa5bd] font-mono text-xs">/admin</code>.
                  </p>
                </div>
              )}

              {/* 9. Categories Grid */}
              <section aria-labelledby="heading-categories">
                <SectionHeader
                  title="Explore by Category"
                  icon="fa-solid fa-layer-group"
                  onSeeMore={() => handleNavigate('categories')}
                />
                <CategoryGrid
                  categories={categories}
                  onSelectCategory={(cat) => {
                    setSelectedCategorySlug(cat.slug);
                    setCurrentTab('categories');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </section>

              {/* 10. Editorial Introduction */}
              <EditorialIntro
                title={settings?.editorial_title}
                content={settings?.editorial_content}
                onExploreOpenSource={() => {
                  setSelectedCategorySlug('security');
                  setCurrentTab('categories');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewGuidelines={() => setLegalPageId('editorial')}
              />

            </div>
          </div>
        ) : currentTab === 'games' ? (
          /* ============================================================== */
          /* GAMES DIRECTORY VIEW                                           */
          /* ============================================================== */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5eaf0]">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">
                  Android Games Directory
                </h1>
                <p className="text-xs sm:text-sm text-[#657184] mt-1">
                  Explore verified Android games with zero modded APKs and official developer storefront links.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#2fa5bd] bg-[#f5f7f9] px-3 py-1.5 rounded-lg border border-[#e5eaf0]">
                {allListings.filter(l => l.listing_type === 'game').length} Games Cataloged
              </span>
            </div>

            {allListings.filter(l => l.listing_type === 'game').length === 0 ? (
              <div className="p-12 text-center bg-[#f5f7f9] border border-[#e5eaf0] rounded-2xl max-w-xl mx-auto">
                <div className="w-12 h-12 bg-white rounded-xl border border-[#e5eaf0] text-purple-600 flex items-center justify-center mx-auto mb-3 text-xl shadow-xs">
                  <i className="fa-solid fa-gamepad"></i>
                </div>
                <h3 className="text-base font-bold text-[#172033]">No Games Cataloged Yet</h3>
                <p className="text-xs text-[#657184] mt-1 max-w-sm mx-auto">
                  Log into the isolated admin portal at <code className="bg-white px-1.5 py-0.5 rounded border border-[#e5eaf0] text-[#2fa5bd] font-mono text-xs">/admin</code> to manually add your first Android game.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {allListings.filter(l => l.listing_type === 'game').map(game => (
                  <ListingCard
                    key={game.id}
                    listing={game}
                    onClick={(l) => setSelectedListing(l)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : currentTab === 'apps' ? (
          /* ============================================================== */
          /* APPS DIRECTORY VIEW                                            */
          /* ============================================================== */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5eaf0]">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">
                  Android Applications Directory
                </h1>
                <p className="text-xs sm:text-sm text-[#657184] mt-1">
                  Verified tools, productivity suites, media players, and privacy software.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#2fa5bd] bg-[#f5f7f9] px-3 py-1.5 rounded-lg border border-[#e5eaf0]">
                {allListings.filter(l => l.listing_type === 'app').length} Apps Cataloged
              </span>
            </div>

            {allListings.filter(l => l.listing_type === 'app').length === 0 ? (
              <div className="p-12 text-center bg-[#f5f7f9] border border-[#e5eaf0] rounded-2xl max-w-xl mx-auto">
                <div className="w-12 h-12 bg-white rounded-xl border border-[#e5eaf0] text-[#2fa5bd] flex items-center justify-center mx-auto mb-3 text-xl shadow-xs">
                  <i className="fa-solid fa-shapes"></i>
                </div>
                <h3 className="text-base font-bold text-[#172033]">No Applications Cataloged Yet</h3>
                <p className="text-xs text-[#657184] mt-1 max-w-sm mx-auto">
                  Log into the isolated admin portal at <code className="bg-white px-1.5 py-0.5 rounded border border-[#e5eaf0] text-[#2fa5bd] font-mono text-xs">/admin</code> to manually add your first Android application.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {allListings.filter(l => l.listing_type === 'app').map(app => (
                  <ListingCard
                    key={app.id}
                    listing={app}
                    onClick={(l) => setSelectedListing(l)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : currentTab === 'categories' ? (
          /* ============================================================== */
          /* CATEGORIES INDEX / DRILL-DOWN VIEW                             */
          /* ============================================================== */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {selectedCategorySlug ? (
              <div>
                {/* Category Header */}
                {(() => {
                  const activeCat = categories.find(c => c.slug === selectedCategorySlug);
                  const matchedItems = allListings.filter(l => l.category_slug === selectedCategorySlug);

                  return (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-xs text-[#657184]">
                        <button onClick={() => setSelectedCategorySlug(null)} className="hover:text-[#2fa5bd]">
                          All Categories
                        </button>
                        <i className="fa-solid fa-chevron-right text-[9px]"></i>
                        <span className="font-semibold text-[#172033]">{activeCat?.name || selectedCategorySlug}</span>
                      </div>

                      <div className="p-6 bg-[#f5f7f9] rounded-2xl border border-[#e5eaf0] flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#2fa5bd] text-white flex items-center justify-center text-xl shrink-0">
                          <i className={activeCat?.icon || 'fa-solid fa-shapes'}></i>
                        </div>
                        <div>
                          <h1 className="text-xl sm:text-2xl font-bold text-[#172033]">
                            {activeCat?.name || selectedCategorySlug}
                          </h1>
                          <p className="text-xs sm:text-sm text-[#657184] mt-1">
                            {activeCat?.description || 'Browse all verified applications and games in this genre.'}
                          </p>
                          <span className="inline-block mt-2 text-xs font-semibold text-[#2fa5bd]">
                            {matchedItems.length} Verified Entries
                          </span>
                        </div>
                      </div>

                      {matchedItems.length === 0 ? (
                        <div className="p-12 text-center border border-[#e5eaf0] rounded-xl">
                          <i className="fa-solid fa-inbox text-3xl text-[#657184]/40 mb-2 block"></i>
                          <p className="text-sm font-semibold text-[#172033]">No items in this category yet</p>
                          <p className="text-xs text-[#657184] mt-1">Check back soon as we expand our verified catalog.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                          {matchedItems.map(item => (
                            <ListingCard
                              key={item.id}
                              listing={item}
                              onClick={(l) => setSelectedListing(l)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div>
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-bold text-[#2fa5bd] uppercase tracking-wider">Catalog Navigation</span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] mt-1">
                    Application &amp; Game Categories
                  </h1>
                  <p className="text-xs sm:text-sm text-[#657184] mt-1">
                    Select a genre or tool category to view all verified listings.
                  </p>
                </div>

                <CategoryGrid
                  categories={categories}
                  onSelectCategory={(cat) => setSelectedCategorySlug(cat.slug)}
                />
              </div>
            )}
          </div>
        ) : (
          /* ============================================================== */
          /* BLOG & EDITORIAL GUIDES VIEW                                   */
          /* ============================================================== */
          <BlogView
            posts={blogPosts}
            selectedPostSlug={selectedBlogPostSlug}
            onSelectPost={(slug) => setSelectedBlogPostSlug(slug)}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* 11. Clean White Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={(id) => setLegalPageId(id)}
        siteName={settings?.site_name}
        tagline={settings?.tagline}
      />

      {/* App & Game Detail Modal View */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onSelectListing={(l) => setSelectedListing(l)}
          allListings={allListings}
        />
      )}

      {/* Legal & Trust Policies Modal */}
      {legalPageId && (
        <LegalModal
          pageId={legalPageId}
          onClose={() => setLegalPageId(null)}
        />
      )}

    </div>
  );
}
