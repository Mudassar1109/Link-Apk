import { Listing, Category, Banner, BlogPost, WebsiteSettings, MediaItem, AdminUser } from '../types';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_LISTINGS, 
  INITIAL_BANNERS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_WEBSITE_SETTINGS, 
  INITIAL_MEDIA 
} from '../data/seedData';
import { getSupabaseClient, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  LISTINGS: 'droidnest_listings',
  CATEGORIES: 'droidnest_categories',
  BANNERS: 'droidnest_banners',
  BLOG_POSTS: 'droidnest_blog_posts',
  SETTINGS: 'droidnest_settings',
  MEDIA: 'droidnest_media',
  AUTH: 'droidnest_admin_auth'
};

// Initialize local database if not exists
function getStored<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error reading ${key}:`, e);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key}:`, e);
  }
}

export const dbService = {
  // Check if connected to real Supabase
  isLiveSupabase(): boolean {
    return isSupabaseConfigured();
  },

  // --- LISTINGS ---
  async getListings(options?: {
    type?: 'app' | 'game';
    status?: 'published' | 'draft' | 'archived' | 'all';
    category_slug?: string;
    search?: string;
    limit?: number;
  }): Promise<Listing[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        let query = supabase.from('listings').select('*').order('created_at', { ascending: false });
        if (options?.type) query = query.eq('listing_type', options.type);
        if (options?.status && options.status !== 'all') {
          query = query.eq('status', options.status);
        } else if (!options?.status) {
          query = query.eq('status', 'published');
        }
        if (options?.limit) query = query.limit(options.limit);
        const { data, error } = await query;
        if (!error && data) return data as Listing[];
      } catch (err) {
        console.warn('Supabase query failed, falling back to local store:', err);
      }
    }

    // Local fallback with seed data
    let items = getStored<Listing[]>(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS);
    
    // Filter by type
    if (options?.type) {
      items = items.filter(l => l.listing_type === options.type);
    }
    
    // Filter by status
    if (options?.status && options.status !== 'all') {
      items = items.filter(l => l.status === options.status);
    } else if (!options?.status) {
      // Default to published only for public viewing
      items = items.filter(l => l.status === 'published');
    }

    // Filter by category slug
    if (options?.category_slug) {
      items = items.filter(l => l.category_slug === options.category_slug);
    }

    // Search query
    if (options?.search && options.search.trim()) {
      const q = options.search.toLowerCase().trim();
      items = items.filter(l => 
        l.title.toLowerCase().includes(q) ||
        l.developer.toLowerCase().includes(q) ||
        l.short_description.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        (l.category_name && l.category_name.toLowerCase().includes(q)) ||
        (l.tags && l.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (options?.limit) {
      items = items.slice(0, options.limit);
    }

    return items;
  },

  async getListingBySlug(slug: string): Promise<Listing | null> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('listings').select('*').eq('slug', slug).single();
        if (!error && data) return data as Listing;
      } catch (err) {
        console.warn('Supabase fetch failed:', err);
      }
    }

    const items = getStored<Listing[]>(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS);
    const item = items.find(l => l.slug === slug);
    return item || null;
  },

  async getListingById(id: string): Promise<Listing | null> {
    const items = getStored<Listing[]>(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS);
    const item = items.find(l => l.id === id);
    return item || null;
  },

  async saveListing(listing: Partial<Listing>): Promise<Listing> {
    const items = getStored<Listing[]>(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS);
    const now = new Date().toISOString();
    
    if (listing.id) {
      // Update
      const index = items.findIndex(l => l.id === listing.id);
      if (index === -1) throw new Error('Listing not found');
      
      const updated: Listing = {
        ...items[index],
        ...listing,
        updated_at: now
      } as Listing;
      
      items[index] = updated;
      setStored(STORAGE_KEYS.LISTINGS, items);

      const supabase = getSupabaseClient();
      if (supabase) {
        try {
          await supabase.from('listings').update(updated).eq('id', listing.id);
        } catch (e) {
          console.error('Supabase update failed:', e);
        }
      }
      return updated;
    } else {
      // Create
      const newListing: Listing = {
        id: 'listing-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        title: listing.title || 'Untitled',
        slug: listing.slug || (listing.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        listing_type: listing.listing_type || 'app',
        description: listing.description || '',
        short_description: listing.short_description || '',
        developer: listing.developer || 'Unknown Developer',
        category_id: listing.category_id || 'cat-tools',
        category_name: listing.category_name,
        category_slug: listing.category_slug,
        icon_url: listing.icon_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=160&auto=format&fit=crop&q=80',
        cover_image_url: listing.cover_image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
        screenshots: listing.screenshots || [],
        version: listing.version || 'v1.0.0',
        android_requirement: listing.android_requirement || 'Android 7.0 and up',
        app_size: listing.app_size || '25 MB',
        official_website: listing.official_website || '',
        official_store_url: listing.official_store_url || '',
        authorised_download_url: listing.authorised_download_url || '',
        status: listing.status || 'published',
        published_at: listing.published_at || now,
        created_at: now,
        updated_at: now,
        is_featured: Boolean(listing.is_featured),
        is_popular: Boolean(listing.is_popular),
        is_updated: Boolean(listing.is_updated),
        tags: listing.tags || []
      };

      items.unshift(newListing);
      setStored(STORAGE_KEYS.LISTINGS, items);

      const supabase = getSupabaseClient();
      if (supabase) {
        try {
          await supabase.from('listings').insert([newListing]);
        } catch (e) {
          console.error('Supabase insert failed:', e);
        }
      }
      return newListing;
    }
  },

  async deleteListing(id: string): Promise<boolean> {
    const items = getStored<Listing[]>(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS);
    const filtered = items.filter(l => l.id !== id);
    setStored(STORAGE_KEYS.LISTINGS, filtered);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('listings').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase delete failed:', e);
      }
    }
    return true;
  },

  // --- CATEGORIES ---
  async getCategories(): Promise<Category[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('categories').select('*').order('name');
        if (!error && data) return data as Category[];
      } catch (err) {
        console.warn('Supabase categories error:', err);
      }
    }
    
    // Local
    const categories = getStored<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    const listings = getStored<Listing[]>(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS);
    
    // Compute dynamic counts
    return categories.map(cat => ({
      ...cat,
      count: listings.filter(l => l.category_id === cat.id && l.status === 'published').length
    }));
  },

  async saveCategory(category: Partial<Category>): Promise<Category> {
    const items = getStored<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    const now = new Date().toISOString();

    if (category.id) {
      const idx = items.findIndex(c => c.id === category.id);
      if (idx === -1) throw new Error('Category not found');
      items[idx] = { ...items[idx], ...category };
      setStored(STORAGE_KEYS.CATEGORIES, items);
      return items[idx];
    } else {
      const newCat: Category = {
        id: 'cat-' + Date.now().toString(36),
        name: category.name || 'New Category',
        slug: category.slug || (category.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: category.description || '',
        icon: category.icon || 'fa-solid fa-shapes',
        type: category.type || 'all',
        created_at: now
      };
      items.push(newCat);
      setStored(STORAGE_KEYS.CATEGORIES, items);
      return newCat;
    }
  },

  async deleteCategory(id: string): Promise<boolean> {
    const items = getStored<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    setStored(STORAGE_KEYS.CATEGORIES, items.filter(c => c.id !== id));
    return true;
  },

  // --- BANNERS (Continuous Carousel) ---
  async getBanners(onlyActive: boolean = true): Promise<Banner[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        let q = supabase.from('banners').select('*').order('sort_order', { ascending: true });
        if (onlyActive) q = q.eq('is_active', true);
        const { data, error } = await q;
        if (!error && data) return data as Banner[];
      } catch (e) {
        console.warn('Supabase banners error:', e);
      }
    }

    const items = getStored<Banner[]>(STORAGE_KEYS.BANNERS, INITIAL_BANNERS);
    const now = new Date().getTime();

    if (onlyActive) {
      return items
        .filter(b => {
          if (!b.is_active) return false;
          if (b.start_at && new Date(b.start_at).getTime() > now) return false;
          if (b.end_at && new Date(b.end_at).getTime() < now) return false;
          return true;
        })
        .sort((a, b) => a.sort_order - b.sort_order);
    }
    return items.sort((a, b) => a.sort_order - b.sort_order);
  },

  async saveBanner(banner: Partial<Banner>): Promise<Banner> {
    const items = getStored<Banner[]>(STORAGE_KEYS.BANNERS, INITIAL_BANNERS);
    const now = new Date().toISOString();

    if (banner.id) {
      const idx = items.findIndex(b => b.id === banner.id);
      if (idx === -1) throw new Error('Banner not found');
      items[idx] = { ...items[idx], ...banner };
      setStored(STORAGE_KEYS.BANNERS, items);
      return items[idx];
    } else {
      const newBanner: Banner = {
        id: 'banner-' + Date.now().toString(36),
        title: banner.title || 'Featured Spotlight',
        subtitle: banner.subtitle || '',
        image_url: banner.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop&q=80',
        destination_url: banner.destination_url || '/apps',
        sort_order: banner.sort_order || items.length + 1,
        is_active: banner.is_active !== undefined ? banner.is_active : true,
        start_at: banner.start_at || null,
        end_at: banner.end_at || null,
        created_at: now
      };
      items.push(newBanner);
      setStored(STORAGE_KEYS.BANNERS, items);
      return newBanner;
    }
  },

  async deleteBanner(id: string): Promise<boolean> {
    const items = getStored<Banner[]>(STORAGE_KEYS.BANNERS, INITIAL_BANNERS);
    setStored(STORAGE_KEYS.BANNERS, items.filter(b => b.id !== id));
    return true;
  },

  // --- BLOG POSTS ---
  async getBlogPosts(onlyPublished: boolean = true): Promise<BlogPost[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        let q = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
        if (onlyPublished) q = q.eq('status', 'published');
        const { data, error } = await q;
        if (!error && data) return data as BlogPost[];
      } catch (e) {
        console.warn('Supabase blog error:', e);
      }
    }

    const items = getStored<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, INITIAL_BLOG_POSTS);
    if (onlyPublished) {
      return items.filter(p => p.status === 'published');
    }
    return items;
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const items = getStored<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, INITIAL_BLOG_POSTS);
    return items.find(p => p.slug === slug) || null;
  },

  async saveBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
    const items = getStored<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, INITIAL_BLOG_POSTS);
    const now = new Date().toISOString();

    if (post.id) {
      const idx = items.findIndex(p => p.id === post.id);
      if (idx === -1) throw new Error('Post not found');
      items[idx] = { ...items[idx], ...post, updated_at: now };
      setStored(STORAGE_KEYS.BLOG_POSTS, items);
      return items[idx];
    } else {
      const newPost: BlogPost = {
        id: 'blog-' + Date.now().toString(36),
        title: post.title || 'Untitled Article',
        slug: post.slug || (post.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: post.excerpt || '',
        content: post.content || '',
        featured_image: post.featured_image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80',
        author: post.author || 'DroidNest Editorial',
        status: post.status || 'published',
        published_at: post.published_at || now,
        read_time: post.read_time || '4 min read',
        category: post.category || 'Guides',
        tags: post.tags || ['Android', 'Guide'],
        seo_title: post.seo_title,
        seo_description: post.seo_description,
        created_at: now,
        updated_at: now
      };
      items.unshift(newPost);
      setStored(STORAGE_KEYS.BLOG_POSTS, items);
      return newPost;
    }
  },

  async deleteBlogPost(id: string): Promise<boolean> {
    const items = getStored<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, INITIAL_BLOG_POSTS);
    setStored(STORAGE_KEYS.BLOG_POSTS, items.filter(p => p.id !== id));
    return true;
  },

  // --- MEDIA ---
  async getMedia(): Promise<MediaItem[]> {
    return getStored<MediaItem[]>(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
  },

  async addMedia(item: Omit<MediaItem, 'id' | 'created_at'>): Promise<MediaItem> {
    const items = getStored<MediaItem[]>(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
    const newMedia: MediaItem = {
      ...item,
      id: 'med-' + Date.now().toString(36),
      created_at: new Date().toISOString()
    };
    items.unshift(newMedia);
    setStored(STORAGE_KEYS.MEDIA, items);
    return newMedia;
  },

  async deleteMedia(id: string): Promise<boolean> {
    const items = getStored<MediaItem[]>(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
    setStored(STORAGE_KEYS.MEDIA, items.filter(m => m.id !== id));
    return true;
  },

  // --- SETTINGS ---
  async getSettings(): Promise<WebsiteSettings> {
    return getStored<WebsiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_WEBSITE_SETTINGS);
  },

  async updateSettings(settings: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    const current = getStored<WebsiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_WEBSITE_SETTINGS);
    const updated = {
      ...current,
      ...settings,
      updated_at: new Date().toISOString()
    };
    setStored(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // --- STATS (Database-derived only, no fabricated metrics!) ---
  async getStats() {
    const listings = getStored<Listing[]>(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS);
    const categories = getStored<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    const banners = getStored<Banner[]>(STORAGE_KEYS.BANNERS, INITIAL_BANNERS);
    const blogPosts = getStored<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, INITIAL_BLOG_POSTS);

    const publishedApps = listings.filter(l => l.listing_type === 'app' && l.status === 'published').length;
    const publishedGames = listings.filter(l => l.listing_type === 'game' && l.status === 'published').length;
    const draftListings = listings.filter(l => l.status === 'draft').length;
    const activeBanners = banners.filter(b => b.is_active).length;
    const publishedArticles = blogPosts.filter(p => p.status === 'published').length;

    return {
      totalListings: listings.length,
      publishedApps,
      publishedGames,
      draftListings,
      totalCategories: categories.length,
      activeBanners,
      publishedArticles
    };
  },

  // --- AUTH ---
  getCurrentAdmin(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  loginAdmin(email: string, password: string): { success: boolean; user?: AdminUser; error?: string } {
    // Authenticate: admin credentials
    // Note: When Supabase Auth is active, user can also authenticate with Supabase
    const cleanEmail = email.trim().toLowerCase();
    if (
      (cleanEmail === 'admin@droidnest.app' && password === 'droidnest2026!') ||
      (cleanEmail === 'admin' && password === 'admin')
    ) {
      const user: AdminUser = {
        id: 'usr-admin-1',
        email: cleanEmail === 'admin' ? 'admin@droidnest.app' : cleanEmail,
        display_name: 'Lead System Administrator',
        role: 'admin'
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
      }
      return { success: true, user };
    }
    return { success: false, error: 'Invalid administrator credentials. Please check your email and password.' };
  },

  logoutAdmin(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  },

  // Export database as JSON
  exportDataJSON(): string {
    return JSON.stringify({
      version: '1.0',
      exported_at: new Date().toISOString(),
      listings: getStored(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS),
      categories: getStored(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES),
      banners: getStored(STORAGE_KEYS.BANNERS, INITIAL_BANNERS),
      blog_posts: getStored(STORAGE_KEYS.BLOG_POSTS, INITIAL_BLOG_POSTS),
      settings: getStored(STORAGE_KEYS.SETTINGS, INITIAL_WEBSITE_SETTINGS),
      media: getStored(STORAGE_KEYS.MEDIA, INITIAL_MEDIA)
    }, null, 2);
  },

  // Restore or reset database to pristine seeds
  resetToDefaults(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.LISTINGS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.BANNERS);
    localStorage.removeItem(STORAGE_KEYS.BLOG_POSTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.MEDIA);
  }
};
