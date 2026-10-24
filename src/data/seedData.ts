import { Listing, Category, Banner, BlogPost, WebsiteSettings, MediaItem } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-action',
    name: 'Action Games',
    slug: 'action',
    description: 'Fast-paced combat, platformers, and arcade action for Android.',
    icon: 'fa-solid fa-crosshairs',
    type: 'game',
    created_at: '2026-01-01T00:00:00Z',
    count: 0
  },
  {
    id: 'cat-rpg',
    name: 'Role Playing',
    slug: 'role-playing',
    description: 'Adventure worlds, RPG mechanics, and story-driven campaigns.',
    icon: 'fa-solid fa-dragon',
    type: 'game',
    created_at: '2026-01-01T00:00:00Z',
    count: 0
  },
  {
    id: 'cat-arcade',
    name: 'Arcade & Casual',
    slug: 'arcade',
    description: 'Classic arcade, sandbox builders, and quick casual games.',
    icon: 'fa-solid fa-gamepad',
    type: 'game',
    created_at: '2026-01-01T00:00:00Z',
    count: 0
  },
  {
    id: 'cat-strategy',
    name: 'Strategy & Puzzle',
    slug: 'strategy-puzzle',
    description: 'Tactical planning, puzzle solving, and brain challenges.',
    icon: 'fa-solid fa-chess',
    type: 'game',
    created_at: '2026-01-01T00:00:00Z',
    count: 0
  },
  {
    id: 'cat-productivity',
    name: 'Productivity & Notes',
    slug: 'productivity',
    description: 'Note taking, task organization, and document management.',
    icon: 'fa-solid fa-file-lines',
    type: 'app',
    created_at: '2026-01-01T00:00:00Z',
    count: 0
  },
  {
    id: 'cat-security',
    name: 'Privacy & Security',
    slug: 'security',
    description: 'Encrypted communication, password managers, and device security.',
    icon: 'fa-solid fa-shield-halved',
    type: 'app',
    created_at: '2026-01-01T00:00:00Z',
    count: 0
  },
  {
    id: 'cat-media',
    name: 'Media & Video',
    slug: 'media-video',
    description: 'Video players, audio tools, and format converters.',
    icon: 'fa-solid fa-play',
    type: 'app',
    created_at: '2026-01-01T00:00:00Z',
    count: 0
  },
  {
    id: 'cat-tools',
    name: 'Tools & Utilities',
    slug: 'tools-utilities',
    description: 'System utilities, file managers, and everyday device tools.',
    icon: 'fa-solid fa-wrench',
    type: 'app',
    created_at: '2026-01-01T00:00:00Z',
    count: 0
  }
];

// Completely blank initial listings — user will add apps and games manually from /admin
export const INITIAL_LISTINGS: Listing[] = [];

// Completely blank initial banners
export const INITIAL_BANNERS: Banner[] = [];

// Completely blank initial blog posts
export const INITIAL_BLOG_POSTS: BlogPost[] = [];

// Completely blank initial media
export const INITIAL_MEDIA: MediaItem[] = [];

export const INITIAL_WEBSITE_SETTINGS: WebsiteSettings = {
  id: 'site-settings',
  site_name: 'LinkDit Apk',
  tagline: 'Discover the Best Android Apps & Games',
  description: 'LinkDit Apk is an authoritative discovery portal for Android applications, mobile tools, productivity software, and exciting games. Every listing links directly to official developer sources with zero cracks or modded files.',
  contact_email: 'editorial@linkditapk.com',
  social_twitter: 'https://twitter.com/linkditapk',
  social_github: 'https://github.com/linkditapk',
  social_telegram: 'https://t.me/linkditapk_official',
  gtm_id: '',
  ga4_id: '',
  editorial_title: 'Why LinkDit Apk Is Built Different',
  editorial_content: `In an internet flooded with deceptive "modded APK" repositories, intrusive adware installers, and artificial download counts, LinkDit Apk was founded on a simple principle: absolute transparency and developer respect.

Every listing on LinkDit Apk provides verified, factual metadata derived directly from developers and official distributions. We never host pirated binaries, altered signatures, or intrusive adware bundles.

LinkDit Apk is built for users who care about software sovereignty, device security, and high-quality mobile experiences.`,
  updated_at: '2026-10-23T19:00:00Z'
};
