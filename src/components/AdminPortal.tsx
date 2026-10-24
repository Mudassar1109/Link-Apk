import React, { useState, useEffect } from 'react';
import { 
  Listing, 
  Category, 
  Banner, 
  BlogPost, 
  WebsiteSettings, 
  MediaItem, 
  AdminUser 
} from '../types';
import { dbService } from '../services/db';

interface AdminPortalProps {
  adminUser: AdminUser | null;
  onLogin: (user: AdminUser) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  adminUser,
  onLogin,
  onLogout,
  onClose
}) => {
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active admin section
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'apps' | 'games' | 'categories' | 'banners' | 'blog' | 'media' | 'analytics' | 'settings'
  >('dashboard');

  // Loaded database state
  const [stats, setStats] = useState({
    totalListings: 0,
    publishedApps: 0,
    publishedGames: 0,
    draftListings: 0,
    totalCategories: 0,
    activeBanners: 0,
    publishedArticles: 0
  });

  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  
  // UI filter & editing states
  const [listingSearch, setListingSearch] = useState('');
  const [editingListing, setEditingListing] = useState<Partial<Listing> | null>(null);
  const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<Partial<BlogPost> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Supabase quick credentials configuration state
  const [supabaseUrl, setSupabaseUrl] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('droidnest_supabase_url') || '' : ''
  );
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('droidnest_supabase_anon_key') || '' : ''
  );

  // Custom Admin Login Credentials configuration state
  const [customAdminEmail, setCustomAdminEmail] = useState(() => {
    if (typeof window === 'undefined') return '';
    try {
      const stored = localStorage.getItem('droidnest_custom_credentials');
      return stored ? JSON.parse(stored).email || '' : '';
    } catch {
      return '';
    }
  });

  const [customAdminPassword, setCustomAdminPassword] = useState(() => {
    if (typeof window === 'undefined') return '';
    try {
      const stored = localStorage.getItem('droidnest_custom_credentials');
      return stored ? JSON.parse(stored).password || '' : '';
    } catch {
      return '';
    }
  });

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const refreshData = async () => {
    const s = await dbService.getStats();
    setStats(s);
    const l = await dbService.getListings({ status: 'all' });
    setListings(l);
    const c = await dbService.getCategories();
    setCategories(c);
    const b = await dbService.getBanners(false);
    setBanners(b);
    const p = await dbService.getBlogPosts(false);
    setBlogPosts(p);
    const m = await dbService.getMedia();
    setMediaItems(m);
    const set = await dbService.getSettings();
    setSettings(set);
  };

  useEffect(() => {
    if (adminUser) {
      refreshData();
    }
  }, [adminUser]);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    setTimeout(() => {
      const res = dbService.loginAdmin(email, password);
      if (res.success && res.user) {
        onLogin(res.user);
      } else {
        setLoginError(res.error || 'Authentication failed. Please verify credentials.');
      }
      setLoginLoading(false);
    }, 400);
  };

  // --- LISTING ACTIONS ---
  const handleSaveListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingListing) return;
    try {
      await dbService.saveListing(editingListing);
      showNotification(`Listing "${editingListing.title}" successfully saved.`);
      setEditingListing(null);
      await refreshData();
    } catch (err) {
      showNotification('Failed to save listing: ' + (err as Error).message, 'error');
    }
  };

  const handleDeleteListing = async (id: string, title: string) => {
    await dbService.deleteListing(id);
    showNotification(`Deleted "${title}".`);
    await refreshData();
  };

  // --- BANNER ACTIONS ---
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;
    try {
      await dbService.saveBanner(editingBanner);
      showNotification(`Banner saved.`);
      setEditingBanner(null);
      await refreshData();
    } catch (err) {
      showNotification('Failed to save banner', 'error');
    }
  };

  const handleDeleteBanner = async (id: string) => {
    await dbService.deleteBanner(id);
    showNotification('Banner deleted.');
    await refreshData();
  };

  // --- BLOG ACTIONS ---
  const handleSaveBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlogPost) return;
    try {
      await dbService.saveBlogPost(editingBlogPost);
      showNotification(`Article saved.`);
      setEditingBlogPost(null);
      await refreshData();
    } catch (err) {
      showNotification('Failed to save article', 'error');
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    await dbService.deleteBlogPost(id);
    showNotification('Article deleted.');
    await refreshData();
  };

  // --- SETTINGS ACTIONS ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await dbService.updateSettings(settings);
      
      // Save Supabase credentials to localStorage if changed
      if (typeof window !== 'undefined') {
        if (supabaseUrl) localStorage.setItem('droidnest_supabase_url', supabaseUrl);
        else localStorage.removeItem('droidnest_supabase_url');

        if (supabaseAnonKey) localStorage.setItem('droidnest_supabase_anon_key', supabaseAnonKey);
        else localStorage.removeItem('droidnest_supabase_anon_key');

        if (customAdminEmail && customAdminPassword) {
          localStorage.setItem('droidnest_custom_credentials', JSON.stringify({
            email: customAdminEmail.trim(),
            password: customAdminPassword,
            display_name: 'Custom Administrator'
          }));
        }
      }

      showNotification('Website settings, security credentials & integrations saved successfully.');
    } catch (err) {
      showNotification('Failed to update settings', 'error');
    }
  };

  // If NOT logged in, show secure standalone admin login portal
  if (!adminUser) {
    return (
      <div className="fixed inset-0 z-50 bg-[#f5f7f9] flex flex-col justify-between overflow-y-auto">
        {/* Top Minimal Security Bar */}
        <header className="h-14 bg-white border-b border-[#e5eaf0] px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/image_f95317bc.png"
              alt="LinkDit Apk"
              className="h-7 sm:h-8 w-auto max-w-[160px] object-contain"
            />
            <span className="hidden sm:inline-block text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded border border-amber-200">
              Isolated Endpoint (/admin)
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#657184] hover:text-[#172033] flex items-center gap-1.5 transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-[11px]"></i>
            <span>Back to Public Website</span>
          </button>
        </header>

        {/* Center Login Box */}
        <div className="flex-1 flex items-center justify-center p-4 my-8">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-[#e5eaf0] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center pb-6 border-b border-[#e5eaf0] mb-6">
              <img
                src="/assets/aistudio/image_f95317bc.png"
                alt="LinkDit Apk"
                className="h-10 w-auto max-w-[210px] object-contain mx-auto mb-3"
              />
              <h1 className="text-xl font-extrabold text-[#172033] tracking-tight">Internal Management Gateway</h1>
              <p className="text-xs text-[#657184] mt-1">This administrative portal is separated from the public catalog.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-[#dc3545] rounded-lg text-xs flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">
                  Administrator Username or Email
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="system.director@droidnest.internal"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#e5eaf0] rounded-lg focus:border-[#2fa5bd] focus:ring-2 focus:ring-[#2fa5bd]/15 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">
                  Access Key / Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••••••"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#e5eaf0] rounded-lg focus:border-[#2fa5bd] focus:ring-2 focus:ring-[#2fa5bd]/15 outline-none font-mono"
                />
              </div>

              {/* Distinct Login Credentials Information & One-Click Autofill */}
              <div className="p-3.5 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0] text-[11px] text-[#657184] space-y-2.5">
                <div className="flex items-center justify-between text-[#172033] font-bold text-xs">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-key text-[#2fa5bd]"></i>
                    Authorized Login Credentials:
                  </span>
                  <span className="text-[10px] text-[#16865c] font-normal">Active &amp; Configured</span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-[#e5eaf0] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#172033]">1. System Director (Root Admin):</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('system.director@droidnest.internal');
                        setPassword('NestSecurity#2026!Master');
                      }}
                      className="text-[10px] font-bold text-[#2fa5bd] hover:underline"
                    >
                      Autofill
                    </button>
                  </div>
                  <p className="font-mono text-[10px] text-slate-600">User: <strong className="text-[#172033]">system.director@droidnest.internal</strong></p>
                  <p className="font-mono text-[10px] text-slate-600">Pass: <strong className="text-[#172033]">NestSecurity#2026!Master</strong></p>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-[#e5eaf0] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#172033]">2. Operations Lead (Editor):</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('ops.manager@droidnest.internal');
                        setPassword('DroidOps2026#Secure');
                      }}
                      className="text-[10px] font-bold text-[#2fa5bd] hover:underline"
                    >
                      Autofill
                    </button>
                  </div>
                  <p className="font-mono text-[10px] text-slate-600">User: <strong className="text-[#172033]">ops.manager@droidnest.internal</strong></p>
                  <p className="font-mono text-[10px] text-slate-600">Pass: <strong className="text-[#172033]">DroidOps2026#Secure</strong></p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#657184] hover:text-[#172033]"
                >
                  Exit to Website
                </button>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="px-6 py-2.5 bg-[#2fa5bd] hover:bg-[#23869b] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  {loginLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
                  <span>Authenticate Session</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Status Footer */}
        <footer className="h-10 bg-white border-t border-[#e5eaf0] px-6 flex items-center justify-between text-[11px] text-[#657184]">
          <span>LinkDit Apk Enterprise Node • Protocol v2.4</span>
          <span>Access logging enabled</span>
        </footer>
      </div>
    );
  }

  // LOGGED-IN ADMIN DASHBOARD
  const filteredListings = listings.filter(l => {
    if (activeTab === 'apps' && l.listing_type !== 'app') return false;
    if (activeTab === 'games' && l.listing_type !== 'game') return false;
    if (listingSearch) {
      const q = listingSearch.toLowerCase();
      return l.title.toLowerCase().includes(q) || l.developer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden">
      
      {/* Admin Top Navigation Bar */}
      <header className="h-14 bg-white border-b border-[#e5eaf0] px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/image_f95317bc.png"
            alt="LinkDit Apk"
            className="h-7 sm:h-8 w-auto max-w-[150px] object-contain"
          />
          <div className="flex items-center">
            <span className="text-xs font-semibold text-[#657184] border-l border-[#e5eaf0] pl-2.5 py-0.5">Admin Console</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] bg-[#16865c]/10 text-[#16865c] font-semibold px-2 py-0.5 rounded border border-[#16865c]/20">
              Role: {adminUser.role.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {notification && (
            <div className={`text-xs px-3 py-1 rounded-md border flex items-center gap-1.5 animate-in fade-in ${
              notification.type === 'success' 
                ? 'bg-emerald-50 text-[#16865c] border-emerald-200' 
                : 'bg-red-50 text-[#dc3545] border-red-200'
            }`}>
              <i className={`fa-solid ${notification.type === 'success' ? 'fa-check' : 'fa-circle-exclamation'}`}></i>
              <span>{notification.message}</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-[#172033] bg-[#f5f7f9] hover:bg-[#e5eaf0] rounded-md border border-[#e5eaf0] flex items-center gap-1.5 transition-colors"
          >
            <i className="fa-solid fa-eye text-[#2fa5bd]"></i>
            <span>View Website</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 text-xs font-semibold text-[#dc3545] hover:bg-[#dc3545]/10 rounded-md transition-colors flex items-center gap-1.5"
            title="Log Out of Admin"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Admin Two-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Admin Left Sidebar */}
        <aside className="w-56 sm:w-64 bg-[#f5f7f9] border-r border-[#e5eaf0] flex flex-col justify-between shrink-0 overflow-y-auto p-3">
          <nav className="space-y-1">
            <button
              onClick={() => { setActiveTab('dashboard'); setEditingListing(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-[#2fa5bd] text-white shadow-xs'
                  : 'text-[#657184] hover:text-[#172033] hover:bg-white'
              }`}
            >
              <i className="fa-solid fa-chart-pie w-4 text-center"></i>
              Dashboard
            </button>

            <button
              onClick={() => { setActiveTab('apps'); setEditingListing(null); }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'apps'
                  ? 'bg-[#2fa5bd] text-white shadow-xs'
                  : 'text-[#657184] hover:text-[#172033] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-mobile-screen w-4 text-center"></i>
                <span>Applications</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'apps' ? 'bg-white/20 text-white' : 'bg-[#e5eaf0] text-[#657184]'}`}>
                {stats.publishedApps}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('games'); setEditingListing(null); }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'games'
                  ? 'bg-[#2fa5bd] text-white shadow-xs'
                  : 'text-[#657184] hover:text-[#172033] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-gamepad w-4 text-center"></i>
                <span>Games</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'games' ? 'bg-white/20 text-white' : 'bg-[#e5eaf0] text-[#657184]'}`}>
                {stats.publishedGames}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('categories'); }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'categories'
                  ? 'bg-[#2fa5bd] text-white shadow-xs'
                  : 'text-[#657184] hover:text-[#172033] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-shapes w-4 text-center"></i>
                <span>Categories</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'categories' ? 'bg-white/20 text-white' : 'bg-[#e5eaf0] text-[#657184]'}`}>
                {categories.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('banners'); setEditingBanner(null); }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'banners'
                  ? 'bg-[#2fa5bd] text-white shadow-xs'
                  : 'text-[#657184] hover:text-[#172033] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-images w-4 text-center"></i>
                <span>Featured Carousel</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'banners' ? 'bg-white/20 text-white' : 'bg-[#e5eaf0] text-[#657184]'}`}>
                {banners.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('blog'); setEditingBlogPost(null); }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'blog'
                  ? 'bg-[#2fa5bd] text-white shadow-xs'
                  : 'text-[#657184] hover:text-[#172033] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-newspaper w-4 text-center"></i>
                <span>Blog Posts</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'blog' ? 'bg-white/20 text-white' : 'bg-[#e5eaf0] text-[#657184]'}`}>
                {blogPosts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'media'
                  ? 'bg-[#2fa5bd] text-white shadow-xs'
                  : 'text-[#657184] hover:text-[#172033] hover:bg-white'
              }`}
            >
              <i className="fa-solid fa-photo-film w-4 text-center"></i>
              Media Library
            </button>

            <div className="pt-2 my-2 border-t border-[#e5eaf0]"></div>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-[#2fa5bd] text-white shadow-xs'
                  : 'text-[#657184] hover:text-[#172033] hover:bg-white'
              }`}
            >
              <i className="fa-solid fa-chart-line w-4 text-center"></i>
              GA4 &amp; Analytics
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#2fa5bd] text-white shadow-xs'
                  : 'text-[#657184] hover:text-[#172033] hover:bg-white'
              }`}
            >
              <i className="fa-solid fa-sliders w-4 text-center"></i>
              Portal Settings
            </button>
          </nav>

          {/* Database Mode Status */}
          <div className="p-3 bg-white rounded-xl border border-[#e5eaf0] text-[11px] text-[#657184] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#172033]">
              <i className="fa-solid fa-database text-[#2fa5bd]"></i>
              <span>Storage Engine</span>
            </div>
            <p>
              Status: <span className="text-[#16865c] font-semibold">Active &amp; Persistent</span>
            </p>
            <p className="text-[10px] text-[#657184]">
              Local state synced. Connect Supabase credentials in Settings for live cloud sync.
            </p>
          </div>
        </aside>

        {/* Admin Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-white">
          
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#172033] tracking-tight">System Overview</h2>
                <p className="text-xs text-[#657184]">Verified factual counts calculated directly from the database schema.</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0]">
                  <span className="text-xs font-semibold text-[#657184]">Total Listings</span>
                  <p className="text-2xl font-black text-[#172033] mt-1">{stats.totalListings}</p>
                  <span className="text-[10px] text-[#657184]">Apps + Games</span>
                </div>

                <div className="p-4 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0]">
                  <span className="text-xs font-semibold text-[#657184]">Published Apps</span>
                  <p className="text-2xl font-black text-[#2fa5bd] mt-1">{stats.publishedApps}</p>
                  <span className="text-[10px] text-[#16865c]">Live on portal</span>
                </div>

                <div className="p-4 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0]">
                  <span className="text-xs font-semibold text-[#657184]">Published Games</span>
                  <p className="text-2xl font-black text-purple-600 mt-1">{stats.publishedGames}</p>
                  <span className="text-[10px] text-[#16865c]">Live on portal</span>
                </div>

                <div className="p-4 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0]">
                  <span className="text-xs font-semibold text-[#657184]">Active Banners</span>
                  <p className="text-2xl font-black text-amber-600 mt-1">{stats.activeBanners}</p>
                  <span className="text-[10px] text-[#657184]">In Right-to-Left Carousel</span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-5 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0] space-y-3">
                <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider">Quick Management Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setEditingListing({
                        listing_type: 'app',
                        status: 'published',
                        version: 'v1.0.0',
                        android_requirement: 'Android 7.0 and up',
                        app_size: '25 MB'
                      });
                      setActiveTab('apps');
                    }}
                    className="px-3.5 py-2 bg-[#2fa5bd] hover:bg-[#23869b] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-plus"></i>
                    <span>Add New App</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingListing({
                        listing_type: 'game',
                        status: 'published',
                        version: 'v1.0.0',
                        android_requirement: 'Android 8.0 and up',
                        app_size: '150 MB'
                      });
                      setActiveTab('games');
                    }}
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-plus"></i>
                    <span>Add New Game</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingBanner({
                        is_active: true,
                        sort_order: banners.length + 1
                      });
                      setActiveTab('banners');
                    }}
                    className="px-3.5 py-2 bg-white hover:bg-[#e5eaf0] text-[#172033] text-xs font-medium rounded-lg border border-[#e5eaf0] flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-image text-[#2fa5bd]"></i>
                    <span>Create Featured Banner</span>
                  </button>

                  <button
                    onClick={() => {
                      const json = dbService.exportDataJSON();
                      const blob = new Blob([json], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `droidnest-backup-${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                      showNotification('Database backup exported.');
                    }}
                    className="px-3.5 py-2 bg-white hover:bg-[#e5eaf0] text-[#172033] text-xs font-medium rounded-lg border border-[#e5eaf0] flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-download text-[#16865c]"></i>
                    <span>Export Database JSON</span>
                  </button>
                </div>
              </div>

              {/* Recent Listings Table */}
              <div className="border border-[#e5eaf0] rounded-xl overflow-hidden">
                <div className="p-3 bg-[#f5f7f9] border-b border-[#e5eaf0] flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider">Recently Modified Entries</h3>
                  <span className="text-[11px] text-[#657184]">{listings.length} total entries</span>
                </div>
                <div className="divide-y divide-[#e5eaf0]">
                  {listings.length === 0 ? (
                    <div className="p-8 text-center text-[#657184]">
                      <p className="text-xs font-semibold text-[#172033]">No listings added yet</p>
                      <p className="text-[11px] mt-0.5">Use the buttons above to manually add your first app or game.</p>
                    </div>
                  ) : (
                    listings.slice(0, 5).map(l => (
                    <div key={l.id} className="p-3 flex items-center justify-between hover:bg-[#f5f7f9] transition-colors">
                      <div className="flex items-center gap-3">
                        <img src={l.icon_url} alt="" className="w-8 h-8 rounded-md object-cover border border-[#e5eaf0]" />
                        <div>
                          <h4 className="text-xs font-bold text-[#172033]">{l.title}</h4>
                          <span className="text-[10px] text-[#657184]">{l.developer} • {l.listing_type.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-[#16865c] font-semibold border border-emerald-200">
                          {l.status}
                        </span>
                        <button
                          onClick={() => {
                            setEditingListing(l);
                            setActiveTab(l.listing_type === 'app' ? 'apps' : 'games');
                          }}
                          className="px-2 py-1 text-xs text-[#2fa5bd] hover:bg-[#2fa5bd]/10 rounded"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: APPS OR GAMES MANAGEMENT */}
          {(activeTab === 'apps' || activeTab === 'games') && (
            <div>
              {editingListing ? (
                /* Edit / Create Form */
                <form onSubmit={handleSaveListing} className="max-w-3xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#e5eaf0]">
                    <div>
                      <h2 className="text-lg font-bold text-[#172033]">
                        {editingListing.id ? `Edit ${editingListing.title}` : `Create New ${activeTab === 'apps' ? 'App' : 'Game'}`}
                      </h2>
                      <p className="text-xs text-[#657184]">Only official, legitimate developer links are permitted.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingListing(null)}
                      className="px-3 py-1.5 text-xs text-[#657184] hover:text-[#172033]"
                    >
                      Back to list
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={editingListing.title || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Developer *</label>
                      <input
                        type="text"
                        required
                        value={editingListing.developer || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, developer: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Slug *</label>
                      <input
                        type="text"
                        required
                        value={editingListing.slug || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, slug: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Category</label>
                      <select
                        value={editingListing.category_id || ''}
                        onChange={(e) => {
                          const cat = categories.find(c => c.id === e.target.value);
                          setEditingListing({
                            ...editingListing,
                            category_id: e.target.value,
                            category_name: cat?.name,
                            category_slug: cat?.slug
                          });
                        }}
                        className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd] bg-white"
                      >
                        <option value="">Select Category...</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Version</label>
                      <input
                        type="text"
                        value={editingListing.version || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, version: e.target.value })}
                        placeholder="v1.0.0"
                        className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Package Size</label>
                      <input
                        type="text"
                        value={editingListing.app_size || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, app_size: e.target.value })}
                        placeholder="45 MB"
                        className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Android Requirement</label>
                      <input
                        type="text"
                        value={editingListing.android_requirement || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, android_requirement: e.target.value })}
                        placeholder="Android 7.0 and up"
                        className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Status</label>
                      <select
                        value={editingListing.status || 'published'}
                        onChange={(e) => setEditingListing({ ...editingListing, status: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd] bg-white"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Short Description</label>
                    <input
                      type="text"
                      value={editingListing.short_description || ''}
                      onChange={(e) => setEditingListing({ ...editingListing, short_description: e.target.value })}
                      placeholder="Brief one-line summary..."
                      className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Full Description</label>
                    <textarea
                      rows={4}
                      value={editingListing.description || ''}
                      onChange={(e) => setEditingListing({ ...editingListing, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Icon URL</label>
                      <input
                        type="url"
                        value={editingListing.icon_url || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, icon_url: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Cover Image URL (16:10)</label>
                      <input
                        type="url"
                        value={editingListing.cover_image_url || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, cover_image_url: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg outline-none focus:border-[#2fa5bd]"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0] space-y-3">
                    <h3 className="text-xs font-bold text-[#172033] uppercase">Official Destination Links</h3>
                    
                    <div>
                      <label className="block text-[11px] font-semibold text-[#172033] mb-1">Official Developer Website</label>
                      <input
                        type="url"
                        value={editingListing.official_website || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, official_website: e.target.value })}
                        placeholder="https://developer.org"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#172033] mb-1">Google Play Store URL</label>
                      <input
                        type="url"
                        value={editingListing.official_store_url || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, official_store_url: e.target.value })}
                        placeholder="https://play.google.com/store/apps/details?id=..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#172033] mb-1">Official Repository / Download URL (GitHub/F-Droid)</label>
                      <input
                        type="url"
                        value={editingListing.authorised_download_url || ''}
                        onChange={(e) => setEditingListing({ ...editingListing, authorised_download_url: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e5eaf0]">
                    <button
                      type="button"
                      onClick={() => setEditingListing(null)}
                      className="px-4 py-2 text-xs font-medium text-[#657184] hover:text-[#172033]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#2fa5bd] hover:bg-[#23869b] text-white text-xs font-bold rounded-lg shadow-xs"
                    >
                      Save Listing
                    </button>
                  </div>
                </form>
              ) : (
                /* Listing Table View */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-[#172033] capitalize">
                        {activeTab} Management
                      </h2>
                      <p className="text-xs text-[#657184]">Create, update, and manage official entries.</p>
                    </div>

                    <button
                      onClick={() => setEditingListing({
                        listing_type: activeTab === 'apps' ? 'app' : 'game',
                        status: 'published',
                        version: 'v1.0.0',
                        android_requirement: 'Android 7.0 and up',
                        app_size: '30 MB'
                      })}
                      className="px-3.5 py-2 bg-[#2fa5bd] hover:bg-[#23869b] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-plus"></i>
                      <span>Add New {activeTab === 'apps' ? 'App' : 'Game'}</span>
                    </button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={listingSearch}
                      onChange={(e) => setListingSearch(e.target.value)}
                      placeholder="Filter by title or developer..."
                      className="w-full max-w-sm px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                    />
                  </div>

                  {/* Table */}
                  <div className="border border-[#e5eaf0] rounded-xl overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f5f7f9] border-b border-[#e5eaf0] text-[#657184] uppercase text-[10px]">
                        <tr>
                          <th className="p-3">Entry</th>
                          <th className="p-3">Developer</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Version</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e5eaf0]">
                        {filteredListings.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-10 text-center text-[#657184]">
                              <div className="w-10 h-10 rounded-xl bg-[#f5f7f9] text-[#2fa5bd] flex items-center justify-center mx-auto mb-2 text-lg">
                                <i className="fa-solid fa-inbox"></i>
                              </div>
                              <p className="font-bold text-[#172033] text-xs">No {activeTab === 'apps' ? 'applications' : 'games'} cataloged</p>
                              <p className="text-[11px] text-[#657184] mt-0.5">Click &quot;Add New {activeTab === 'apps' ? 'App' : 'Game'}&quot; above to create your first entry.</p>
                            </td>
                          </tr>
                        ) : (
                          filteredListings.map(l => (
                          <tr key={l.id} className="hover:bg-[#f5f7f9]/50 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-2.5">
                                <img src={l.icon_url} alt="" className="w-8 h-8 rounded-md object-cover border border-[#e5eaf0]" />
                                <span className="font-bold text-[#172033]">{l.title}</span>
                              </div>
                            </td>
                            <td className="p-3 text-[#657184]">{l.developer}</td>
                            <td className="p-3">
                              <span className="bg-[#f5f7f9] px-2 py-0.5 rounded text-[11px] font-medium text-[#2fa5bd]">
                                {l.category_name || 'General'}
                              </span>
                            </td>
                            <td className="p-3 text-[#172033] font-medium">{l.version}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                l.status === 'published' 
                                  ? 'bg-emerald-50 text-[#16865c] border border-emerald-200' 
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {l.status}
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-1.5">
                              <button
                                onClick={() => setEditingListing(l)}
                                className="px-2 py-1 text-xs text-[#2fa5bd] hover:bg-[#2fa5bd]/10 rounded"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteListing(l.id, l.title)}
                                className="px-2 py-1 text-xs text-[#dc3545] hover:bg-[#dc3545]/10 rounded"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: FEATURED CAROUSEL BANNERS */}
          {activeTab === 'banners' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#172033]">Featured Right-to-Left Carousel</h2>
                  <p className="text-xs text-[#657184]">Manage active spotlight cards that continuously scroll across the homepage.</p>
                </div>
                <button
                  onClick={() => setEditingBanner({
                    title: 'New Featured Spotlight',
                    subtitle: 'Verified Android application',
                    is_active: true,
                    sort_order: banners.length + 1,
                    destination_url: '/apps'
                  })}
                  className="px-3.5 py-2 bg-[#2fa5bd] hover:bg-[#23869b] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>Add Banner</span>
                </button>
              </div>

              {editingBanner ? (
                <form onSubmit={handleSaveBanner} className="p-4 border border-[#e5eaf0] rounded-xl bg-[#f5f7f9] space-y-4 max-w-xl">
                  <h3 className="text-xs font-bold text-[#172033] uppercase">Edit Featured Banner</h3>
                  
                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Banner Title *</label>
                    <input
                      type="text"
                      required
                      value={editingBanner.title || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={editingBanner.subtitle || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Image URL (Landscape)</label>
                    <input
                      type="url"
                      required
                      value={editingBanner.image_url || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, image_url: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Destination URL</label>
                      <input
                        type="text"
                        value={editingBanner.destination_url || ''}
                        onChange={(e) => setEditingBanner({ ...editingBanner, destination_url: e.target.value })}
                        placeholder="/apps/vlc-android"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1">Sort Order</label>
                      <input
                        type="number"
                        value={editingBanner.sort_order || 1}
                        onChange={(e) => setEditingBanner({ ...editingBanner, sort_order: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="bannerActive"
                      checked={editingBanner.is_active || false}
                      onChange={(e) => setEditingBanner({ ...editingBanner, is_active: e.target.checked })}
                    />
                    <label htmlFor="bannerActive" className="text-xs text-[#172033]">
                      Active and visible in homepage continuous carousel
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingBanner(null)}
                      className="px-3 py-1.5 text-xs text-[#657184]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#2fa5bd] hover:bg-[#23869b] text-white text-xs font-semibold rounded-lg"
                    >
                      Save Banner
                    </button>
                  </div>
                </form>
              ) : banners.length === 0 ? (
                <div className="p-12 text-center bg-[#f5f7f9] border border-[#e5eaf0] rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-white text-amber-600 flex items-center justify-center mx-auto mb-2 text-lg border border-[#e5eaf0] shadow-xs">
                    <i className="fa-solid fa-images"></i>
                  </div>
                  <p className="font-bold text-[#172033] text-xs">No Featured Banners Added</p>
                  <p className="text-[11px] text-[#657184] mt-0.5">Click &quot;Add Banner&quot; above to create continuous carousel spotlights.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {banners.map(b => (
                    <div key={b.id} className="p-3 border border-[#e5eaf0] rounded-xl flex gap-3 bg-white">
                      <img src={b.image_url} alt="" className="w-24 h-16 rounded-lg object-cover border border-[#e5eaf0]" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[#172033] truncate">{b.title}</h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            b.is_active ? 'bg-emerald-50 text-[#16865c]' : 'bg-slate-100 text-[#657184]'
                          }`}>
                            {b.is_active ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#657184] truncate">{b.subtitle}</p>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-[#657184]">
                          <span>Order: #{b.sort_order}</span>
                          <div className="space-x-2">
                            <button
                              onClick={() => setEditingBanner(b)}
                              className="text-[#2fa5bd] hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBanner(b.id)}
                              className="text-[#dc3545] hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: BLOG POSTS */}
          {activeTab === 'blog' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#172033]">Blog &amp; Editorial Posts</h2>
                  <p className="text-xs text-[#657184]">Original technical tutorials, app reviews, and security recommendations.</p>
                </div>
                <button
                  onClick={() => setEditingBlogPost({
                    title: 'New Android Security Article',
                    status: 'published',
                    author: 'DroidNest Technical Team',
                    read_time: '5 min read',
                    category: 'Security & Privacy',
                    tags: ['Android', 'Security']
                  })}
                  className="px-3.5 py-2 bg-[#2fa5bd] hover:bg-[#23869b] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>New Post</span>
                </button>
              </div>

              {editingBlogPost ? (
                <form onSubmit={handleSaveBlogPost} className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={editingBlogPost.title || ''}
                      onChange={(e) => setEditingBlogPost({ ...editingBlogPost, title: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={editingBlogPost.slug || ''}
                      onChange={(e) => setEditingBlogPost({ ...editingBlogPost, slug: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Excerpt</label>
                    <input
                      type="text"
                      value={editingBlogPost.excerpt || ''}
                      onChange={(e) => setEditingBlogPost({ ...editingBlogPost, excerpt: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Content (Markdown / Text)</label>
                    <textarea
                      rows={8}
                      value={editingBlogPost.content || ''}
                      onChange={(e) => setEditingBlogPost({ ...editingBlogPost, content: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#e5eaf0] rounded-lg"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingBlogPost(null)}
                      className="px-3 py-1.5 text-xs text-[#657184]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#2fa5bd] text-white text-xs font-bold rounded-lg"
                    >
                      Save Article
                    </button>
                  </div>
                </form>
              ) : blogPosts.length === 0 ? (
                <div className="p-12 text-center bg-[#f5f7f9] border border-[#e5eaf0] rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#2fa5bd] flex items-center justify-center mx-auto mb-2 text-lg border border-[#e5eaf0] shadow-xs">
                    <i className="fa-solid fa-newspaper"></i>
                  </div>
                  <p className="font-bold text-[#172033] text-xs">No Blog Articles Authored</p>
                  <p className="text-[11px] text-[#657184] mt-0.5">Click &quot;New Post&quot; above to write your first editorial guide.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {blogPosts.map(p => (
                    <div key={p.id} className="p-4 border border-[#e5eaf0] rounded-xl flex items-center justify-between hover:bg-[#f5f7f9] transition-colors">
                      <div className="flex items-center gap-3">
                        <img src={p.featured_image} alt="" className="w-16 h-12 rounded-lg object-cover border border-[#e5eaf0]" />
                        <div>
                          <h4 className="text-xs font-bold text-[#172033]">{p.title}</h4>
                          <span className="text-[10px] text-[#657184]">{p.author} • {p.read_time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingBlogPost(p)}
                          className="px-2 py-1 text-xs text-[#2fa5bd] hover:bg-[#2fa5bd]/10 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBlogPost(p.id)}
                          className="px-2 py-1 text-xs text-[#dc3545] hover:bg-[#dc3545]/10 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-[#172033]">Media Library</h2>
                <p className="text-xs text-[#657184]">Supabase Storage bucket &apos;droidnest-media&apos; assets.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mediaItems.map(m => (
                  <div key={m.id} className="border border-[#e5eaf0] rounded-xl overflow-hidden group">
                    <div className="aspect-video bg-[#f5f7f9]">
                      <img src={m.url} alt={m.alt_text} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2 text-[11px] bg-white">
                      <p className="font-semibold text-[#172033] truncate">{m.name}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-[10px] text-[#657184]">{m.size_kb} KB</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(m.url);
                            showNotification('Asset URL copied!');
                          }}
                          className="text-[#2fa5bd] hover:underline"
                        >
                          Copy URL
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ANALYTICS & GA4 / GTM SETUP */}
          {activeTab === 'analytics' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#172033]">Analytics &amp; Infrastructure Configuration</h2>
                <p className="text-xs text-[#657184]">Configure Google Analytics 4, Tag Manager, and Cloudflare CDN monitoring.</p>
              </div>

              <div className="p-4 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0] space-y-3">
                <div className="flex items-center gap-2">
                  <i className="fa-brands fa-google text-amber-500"></i>
                  <h3 className="text-xs font-bold text-[#172033]">Google Analytics 4 &amp; Google Tag Manager</h3>
                </div>
                <p className="text-xs text-[#657184] leading-relaxed">
                  Analytics tracking remains strictly disabled until you configure genuine IDs. LinkDit Apk never uses placeholder IDs as real or transmits sensitive personal information.
                </p>
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#172033] mb-1">GTM Container ID (e.g., GTM-XXXXXXX)</label>
                    <input
                      type="text"
                      value={settings?.gtm_id || ''}
                      onChange={(e) => settings && setSettings({ ...settings, gtm_id: e.target.value })}
                      placeholder="GTM-XXXXXXX"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#172033] mb-1">GA4 Measurement ID (e.g., G-XXXXXXXXXX)</label>
                    <input
                      type="text"
                      value={settings?.ga4_id || ''}
                      onChange={(e) => settings && setSettings({ ...settings, ga4_id: e.target.value })}
                      placeholder="G-XXXXXXXXXX"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0] space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <i className="fa-brands fa-cloudflare text-orange-500"></i>
                  <h3 className="text-xs font-bold text-[#172033]">Cloudflare CDN &amp; Real User Monitoring (RUM)</h3>
                </div>
                <p className="text-[#657184] leading-relaxed">
                  When deployed on Vercel or custom origin behind Cloudflare:
                </p>
                <ul className="list-disc pl-5 text-[#657184] space-y-1">
                  <li>Enable <strong>Automatic Platform Optimization (APO)</strong> or standard edge caching.</li>
                  <li>Set Browser Cache TTL to 4 hours with stale-while-revalidate.</li>
                  <li>Enable Cloudflare Web Analytics / Browser Insights directly from the Cloudflare Dashboard (zero JavaScript injection required on origin).</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS & SUPABASE BRIDGE */}
          {activeTab === 'settings' && settings && (
            <form onSubmit={handleSaveSettings} className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#172033]">Portal &amp; Database Settings</h2>
                <p className="text-xs text-[#657184]">Manage brand identity, editorial text, and Supabase backend credentials.</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#e5eaf0] space-y-3">
                <h3 className="text-xs font-bold text-[#172033] uppercase">Identity &amp; Contact</h3>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172033] mb-1">Portal Name</label>
                  <input
                    type="text"
                    value={settings.site_name}
                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-[#e5eaf0] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172033] mb-1">Tagline</label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-[#e5eaf0] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172033] mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-[#e5eaf0] rounded-lg"
                  />
                </div>
              </div>

              {/* Supabase Connection */}
              <div className="p-4 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0] space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#16865c] text-white flex items-center justify-center text-[10px]">
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <h3 className="text-xs font-bold text-[#172033]">Supabase PostgreSQL Connection</h3>
                </div>
                <p className="text-[11px] text-[#657184]">
                  You can connect your live Supabase project by providing your project URL and public anon key. The database schema migration is located in <code>supabase/migrations/001_initial_schema.sql</code>.
                </p>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172033] mb-1">NEXT_PUBLIC_SUPABASE_URL</label>
                  <input
                    type="url"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172033] mb-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</label>
                  <input
                    type="password"
                    value={supabaseAnonKey}
                    onChange={(e) => setSupabaseAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                  />
                </div>
              </div>

              {/* Custom Administrator Login Access */}
              <div className="p-4 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0] space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#2fa5bd] text-white flex items-center justify-center text-[10px]">
                    <i className="fa-solid fa-user-lock"></i>
                  </div>
                  <h3 className="text-xs font-bold text-[#172033]">Custom Administrator Access Credentials</h3>
                </div>
                <p className="text-[11px] text-[#657184]">
                  Define custom access credentials for your private <code>/admin</code> gateway. You can also always sign in with the system root account (<code>system.director@droidnest.internal</code>).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#172033] mb-1">Custom Admin Email / Username</label>
                    <input
                      type="text"
                      value={customAdminEmail}
                      onChange={(e) => setCustomAdminEmail(e.target.value)}
                      placeholder="custom.admin@yourdomain.com"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#172033] mb-1">Custom Password / Access Key</label>
                    <input
                      type="text"
                      value={customAdminPassword}
                      onChange={(e) => setCustomAdminPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#e5eaf0] rounded-lg font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Editorial Intro Text */}
              <div className="p-4 bg-white rounded-xl border border-[#e5eaf0] space-y-3">
                <h3 className="text-xs font-bold text-[#172033] uppercase">Homepage Editorial Section</h3>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172033] mb-1">Headline</label>
                  <input
                    type="text"
                    value={settings.editorial_title}
                    onChange={(e) => setSettings({ ...settings, editorial_title: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-[#e5eaf0] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172033] mb-1">Editorial Content</label>
                  <textarea
                    rows={4}
                    value={settings.editorial_content}
                    onChange={(e) => setSettings({ ...settings, editorial_content: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-[#e5eaf0] rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2fa5bd] hover:bg-[#23869b] text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Save Settings
                </button>
              </div>
            </form>
          )}

        </main>
      </div>

    </div>
  );
};
