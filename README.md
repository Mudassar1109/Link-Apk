# DroidNest — Production Android Apps & Games Discovery Portal

**DroidNest** is a full-functional, high-performance Android applications and games discovery portal built with React, TypeScript, Tailwind CSS, Font Awesome 6, and Supabase PostgreSQL.

Designed with a compact white-theme aesthetic inspired by modern APK discovery platforms (such as APKTODO), DroidNest delivers authoritative app metadata, official developer repository links, a continuous right-to-left promotional marquee carousel, three-column responsive grids, full administrative content management, and robust technical SEO.

---

## 1. Features & Architecture Overview

- **Design System (White Theme Only)**:
  - Custom CSS variables: `--background: #ffffff`, `--surface: #ffffff`, `--surface-muted: #f5f7f9`, `--text-primary: #172033`, `--text-secondary: #657184`, `--accent: #2fa5bd`, `--accent-hover: #23869b`, `--border: #e5eaf0`, `--success: #16865c`, `--danger: #dc3545`.
  - Poppins typography, subtle borders, compact headers, and accessible focus outlines.
- **Continuous Right-to-Left Carousel**:
  - Horizontal movement from RIGHT to LEFT with seamless infinite looping.
  - Automatically pauses on mouse hover, touch interaction, and keyboard focus.
  - Prev/Next manual navigation controls and play/pause toggle.
  - Reduced-motion accessible support.
- **Strict Anti-Piracy & Verification Commitment**:
  - Zero tolerance for modded APKs, cracked binaries, or keygens.
  - All download controls link directly to verified official developer sources (Google Play, official GitHub release tags, or F-Droid).
  - No fabricated star ratings or fake download counts.
- **Search & Filter Engine**:
  - Debounced real-time search matching titles, developers, categories, descriptions, and tags.
  - Instant results dropdown with direct navigation.
- **Database Architecture**:
  - Dual-mode operation: Out-of-the-box persistent storage (survives refreshes in preview) with native bridge to live **Supabase PostgreSQL** via `@supabase/supabase-js`.
  - Complete SQL migration in `supabase/migrations/001_initial_schema.sql` with Row Level Security (RLS) and storage access policies.
- **Administrative Portal (`/admin`)**:
  - Role-protected admin authentication.
  - Factual dashboard metrics (published apps, published games, drafts, categories, banners).
  - Full CRUD for listings, banners, blog posts, categories, and site settings.
  - One-click JSON database export and backup.
- **Technical SEO**:
  - Semantic HTML, unique titles, meta descriptions, OpenGraph cards, Twitter cards.
  - JSON-LD Structured Data: `Organization`, `WebSite`, `SoftwareApplication`, and `Article`.
  - `public/robots.txt` and `public/sitemap.xml`.

---

## 2. Project File Structure

```text
/
├── .env.example                          # Environment variables template
├── index.html                            # Root HTML, Poppins font, Font Awesome 6, Schema.org
├── metadata.json                         # AI Studio applet metadata
├── package.json                          # Core dependencies and scripts
├── tsconfig.json                         # TypeScript configuration
├── vite.config.ts                        # Vite & Tailwind CSS plugins
├── public/
│   ├── robots.txt                        # Search engine crawler directives
│   └── sitemap.xml                       # Canonical XML sitemap
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql        # Supabase PostgreSQL schema, RLS, & storage policies
└── src/
    ├── main.tsx                          # React 19 application mount
    ├── App.tsx                           # Master page router & 11-step homepage layout
    ├── index.css                         # CSS design tokens & continuous marquee animation
    ├── types/
    │   └── index.ts                      # Listings, Categories, Banners, Blog, Settings types
    ├── data/
    │   └── seedData.ts                   # Factual pre-seeded Android apps, games, & articles
    ├── services/
    │   ├── db.ts                         # Unified database service (Supabase + local persistent)
    │   └── supabase.ts                   # Supabase client bridge & configuration loader
    └── components/
        ├── Header.tsx                    # Slim sticky header with brand mark & mobile drawer
        ├── HeroSearch.tsx                # Centered hero with debounced live search
        ├── ContinuousCarousel.tsx        # Right-to-left seamless marquee banner carousel
        ├── SectionHeader.tsx             # Section headings with badge and 'See More'
        ├── ListingCard.tsx               # 16:10 cover, square icon, and factual metadata
        ├── CategoryGrid.tsx              # Category cards with Font Awesome icons
        ├── EditorialIntro.tsx            # Safety manifesto & verification standards
        ├── Footer.tsx                    # Directory links, social channels, and trust pages
        ├── ListingDetailModal.tsx        # Full listing view with official links & specs
        ├── BlogView.tsx                  # Editorial articles, TOC, and reading time
        ├── LegalModal.tsx                # About, Privacy, Terms, Disclaimer, Contact
        └── AdminPortal.tsx               # Secure management console & CRUD operations
```

---

## 3. GitHub Instructions

1. Initialize a new Git repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for DroidNest portal"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Link your local repository and push:
   ```bash
   git remote add origin https://github.com/your-username/droidnest.git
   git branch -M main
   git push -u origin main
   ```

---

## 4. Vercel Deployment Instructions

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New Project** and import your `droidnest` GitHub repository.
3. Configure the Project Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set Environment Variables in Vercel:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-custom-domain.com`
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://your-project.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `your-anon-key`
   - `NEXT_PUBLIC_GTM_ID`: (optional)
   - `NEXT_PUBLIC_GA4_ID`: (optional)
5. Click **Deploy**. Vercel will build and assign an SSL certificate automatically.

---

## 5. Supabase Setup Instructions

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and run the entire contents of `supabase/migrations/001_initial_schema.sql`.
4. Copy your **Project URL** and **anon public key** from **Project Settings > API**.
5. Paste them into `.env` or input them directly into the **DroidNest Admin Panel > Settings** tab.
6. The application will immediately utilize your live PostgreSQL database!

### Default Admin Credentials:
- **Email**: `admin@droidnest.app`
- **Password**: `droidnest2026!`

---

## 6. GA4 and Google Tag Manager Setup

- **Google Tag Manager**: Set `NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"` in `.env` or in Admin Settings.
- **Google Analytics 4**: Set `NEXT_PUBLIC_GA4_ID="G-XXXXXXXXXX"`.
- *Privacy Standard*: In compliance with DroidNest's privacy charter, analytics scripts remain completely inert until valid credentials are provided. Form contents, passwords, and PII are never transmitted.

---

## 7. Cloudflare CDN & Browser Insights Setup

1. In Cloudflare DNS, set an `A` or `CNAME` record pointing to your Vercel deployment with Proxy (Orange Cloud) enabled.
2. In **SSL/TLS**, set encryption mode to **Full (Strict)**.
3. In **Speed > Optimization**, enable Brotli compression and Early Hints.
4. In **Web Analytics**, toggle on **Cloudflare Browser Insights** (automatically collected at edge with zero origin code modifications required).

---

## 8. Carousel Configuration & Customization

The **Continuous Right-to-Left Carousel** is managed dynamically via the Admin Panel under **Featured Carousel**:
- Add new spotlight banners by entering a landscape image URL, title, subtitle, and destination route.
- Reorder banners using the `sort_order` field.
- Toggle banners active/inactive in real time.
- Smooth CSS `@keyframes continuousScroll` handles looping at 60 FPS with hardware acceleration (`will-change: transform`).
- Hovering or focusing automatically pauses animation; releasing resumes seamlessly without jumping.

---

## 9. Testing & Quality Verification Checklist

- [x] **White Theme Only**: Verified all public views use white and muted surfaces (`#ffffff`, `#f5f7f9`).
- [x] **Right-to-Left Carousel**: Verified continuous right-to-left motion with pause on hover/focus and prev/next controls.
- [x] **11-Step Homepage Layout**: Strict compliance with Section 6 layout order.
- [x] **Factual Metadata**: Factual versions, sizes, and requirements with zero fake ratings or download numbers.
- [x] **Verified Links**: Links direct to official developer sites, Google Play, GitHub, or F-Droid.
- [x] **Admin Portal**: Secure login, genuine metric counters, full CRUD for apps, games, categories, and banners.
- [x] **Technical SEO**: Valid JSON-LD structured data, meta descriptions, sitemap.xml, and robots.txt.
