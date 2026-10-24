export type ListingType = 'app' | 'game';
export type ListingStatus = 'published' | 'draft' | 'archived' | 'review';
export type DownloadMode = 'external' | 'direct';

export interface Listing {
  id: string;
  title: string;
  slug: string;
  listing_type: ListingType;
  description: string;
  short_description: string;
  developer: string;
  original_developer?: string;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  icon_url: string;
  cover_image_url: string;
  screenshots: string[];
  version: string;
  android_requirement: string;
  app_size: string;
  official_website: string;
  official_store_url: string;
  authorised_download_url: string;
  // New fields for enhanced functionality
  download_mode?: DownloadMode;
  hosted_file_url?: string;
  hosted_file_path?: string;
  file_name?: string;
  file_size_bytes?: number;
  file_sha256?: string;
  source_url?: string;
  license_status?: string;
  permission_status?: string;
  distribution_authorized?: boolean;
  imported_from?: 'url' | 'api' | 'manual' | 'upload';
  import_metadata?: any;
  status: ListingStatus;
  published_at: string;
  created_at: string;
  updated_at: string;
  reviewed_by?: string;
  reviewed_at?: string;
  review_notes?: string;
  is_featured?: boolean;
  is_popular?: boolean;
  is_updated?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Font Awesome icon class e.g. 'fa-gamepad'
  type?: 'all' | 'app' | 'game';
  created_at: string;
  count?: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  destination_url: string;
  sort_order: number;
  is_active: boolean;
  start_at?: string | null;
  end_at?: string | null;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  status: 'published' | 'draft';
  published_at: string;
  read_time: string;
  category: string;
  tags: string[];
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
}

export interface WebsiteSettings {
  id: string;
  site_name: string;
  tagline: string;
  description: string;
  contact_email: string;
  social_twitter: string;
  social_github: string;
  social_telegram: string;
  gtm_id: string;
  ga4_id: string;
  editorial_title: string;
  editorial_content: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  display_name: string;
  role: 'admin' | 'editor';
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size_kb: number;
  mime_type: string;
  alt_text: string;
  created_at: string;
}
