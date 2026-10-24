-- ====================================================================
-- DROIDNEST POSTGRESQL & SUPABASE MIGRATION 001
-- Full Database Schema, Row-Level Security (RLS) & Storage Policies
-- ====================================================================

-- 1. Profiles Table (Administrator & Editor Roles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'fa-solid fa-shapes',
  type TEXT NOT NULL DEFAULT 'all' CHECK (type IN ('all', 'app', 'game')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Listings Table (Android Apps and Games)
CREATE TABLE IF NOT EXISTS public.listings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('app', 'game')),
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  developer TEXT NOT NULL,
<<<<<<< HEAD
  original_developer TEXT,
=======
>>>>>>> 48f6dc551e4ec2955949c6fa81e8943cba7f04d6
  category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  category_name TEXT,
  category_slug TEXT,
  icon_url TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  screenshots JSONB NOT NULL DEFAULT '[]'::jsonb,
  version TEXT NOT NULL DEFAULT 'v1.0.0',
  android_requirement TEXT NOT NULL DEFAULT 'Android 7.0 and up',
  app_size TEXT NOT NULL DEFAULT '50 MB',
  official_website TEXT DEFAULT '',
  official_store_url TEXT DEFAULT '',
  authorised_download_url TEXT DEFAULT '',
<<<<<<< HEAD
  download_mode TEXT DEFAULT 'external' CHECK (download_mode IN ('external', 'direct')),
  hosted_file_url TEXT DEFAULT '',
  hosted_file_path TEXT DEFAULT '',
  file_name TEXT DEFAULT '',
  file_size_bytes BIGINT DEFAULT 0,
  file_sha256 TEXT DEFAULT '',
  source_url TEXT DEFAULT '',
  license_status TEXT DEFAULT '',
  permission_status TEXT DEFAULT '',
  distribution_authorized BOOLEAN NOT NULL DEFAULT false,
  imported_from TEXT DEFAULT 'manual' CHECK (imported_from IN ('url', 'api', 'manual', 'upload')),
  import_metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'archived', 'review')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT DEFAULT '',
=======
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
>>>>>>> 48f6dc551e4ec2955949c6fa81e8943cba7f04d6
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_updated BOOLEAN NOT NULL DEFAULT false,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 4. Banners Table (Continuous Featured Right-to-Left Carousel)
CREATE TABLE IF NOT EXISTS public.banners (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  image_url TEXT NOT NULL,
  destination_url TEXT NOT NULL DEFAULT '/apps',
  sort_order INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Blog Posts Table (Editorial Articles & Guides)
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'DroidNest Editorial',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  read_time TEXT NOT NULL DEFAULT '5 min read',
  category TEXT NOT NULL DEFAULT 'Guides',
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Website Settings Table
CREATE TABLE IF NOT EXISTS public.website_settings (
  id TEXT PRIMARY KEY DEFAULT 'site-settings',
  setting_key TEXT,
  setting_value TEXT,
  site_name TEXT NOT NULL DEFAULT 'DroidNest',
  tagline TEXT NOT NULL DEFAULT 'Discover the Best Android Apps & Games',
  description TEXT NOT NULL DEFAULT 'Authoritative Android app discovery portal.',
  contact_email TEXT NOT NULL DEFAULT 'editorial@droidnest.app',
  social_twitter TEXT DEFAULT '',
  social_github TEXT DEFAULT '',
  social_telegram TEXT DEFAULT '',
  gtm_id TEXT DEFAULT '',
  ga4_id TEXT DEFAULT '',
  editorial_title TEXT NOT NULL DEFAULT 'Why DroidNest Is Built Different',
  editorial_content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for lightning search and filtering
CREATE INDEX IF NOT EXISTS idx_listings_slug ON public.listings(slug);
CREATE INDEX IF NOT EXISTS idx_listings_type_status ON public.listings(listing_type, status);
CREATE INDEX IF NOT EXISTS idx_listings_category ON public.listings(category_id);
CREATE INDEX IF NOT EXISTS idx_banners_active_order ON public.banners(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles Policies
CREATE POLICY "Public read for user display names"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Admins can update profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- 2. Categories Policies: Public can read all, admins can mutate
CREATE POLICY "Public can view categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (public.is_admin());

-- 3. Listings Policies: Public can read published only; Admins can do everything
CREATE POLICY "Public can view published listings"
  ON public.listings FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can view and manage all listings"
  ON public.listings FOR ALL
  USING (public.is_admin());

-- 4. Banners Policies: Public can view active banners within dates; Admins full access
CREATE POLICY "Public can view active banners"
  ON public.banners FOR SELECT
  USING (
    is_active = true 
    AND (start_at IS NULL OR start_at <= now())
    AND (end_at IS NULL OR end_at >= now())
  );

CREATE POLICY "Admins can manage banners"
  ON public.banners FOR ALL
  USING (public.is_admin());

-- 5. Blog Posts Policies: Public reads published; Admins full access
CREATE POLICY "Public can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage blog posts"
  ON public.blog_posts FOR ALL
  USING (public.is_admin());

-- 6. Settings Policies: Public reads settings; Admins can update
CREATE POLICY "Public can view website settings"
  ON public.website_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update website settings"
  ON public.website_settings FOR ALL
  USING (public.is_admin());

-- ====================================================================
<<<<<<< HEAD
-- STORAGE BUCKETS (Media Library & APKs)
=======
-- STORAGE BUCKETS (Media Library)
>>>>>>> 48f6dc551e4ec2955949c6fa81e8943cba7f04d6
-- ====================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('droidnest-media', 'droidnest-media', true)
ON CONFLICT (id) DO NOTHING;

<<<<<<< HEAD
INSERT INTO storage.buckets (id, name, public)
VALUES ('droidnest-apks', 'droidnest-apks', false)
ON CONFLICT (id) DO NOTHING;

=======
>>>>>>> 48f6dc551e4ec2955949c6fa81e8943cba7f04d6
CREATE POLICY "Public can view droidnest-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'droidnest-media');

CREATE POLICY "Admins can upload to droidnest-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'droidnest-media' AND public.is_admin());

CREATE POLICY "Admins can delete from droidnest-media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'droidnest-media' AND public.is_admin());
<<<<<<< HEAD

-- APK Storage - only admins can upload, downloads require authorization
CREATE POLICY "Admins can upload to droidnest-apks"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'droidnest-apks' AND public.is_admin());

CREATE POLICY "Admins can view droidnest-apks"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'droidnest-apks' AND public.is_admin());

CREATE POLICY "Admins can delete from droidnest-apks"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'droidnest-apks' AND public.is_admin());
=======
>>>>>>> 48f6dc551e4ec2955949c6fa81e8943cba7f04d6
