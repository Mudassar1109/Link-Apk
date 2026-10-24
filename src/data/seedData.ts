import { Listing, Category, Banner, BlogPost, WebsiteSettings, MediaItem } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-action',
    name: 'Action Games',
    slug: 'action',
    description: 'Fast-paced combat, platformers, and adrenaline-charged gameplay for Android.',
    icon: 'fa-solid fa-crosshairs',
    type: 'game',
    created_at: '2026-01-10T10:00:00Z',
    count: 3
  },
  {
    id: 'cat-rpg',
    name: 'Role Playing',
    slug: 'role-playing',
    description: 'Immersive worlds, character progression, and epic quests.',
    icon: 'fa-solid fa-dragon',
    type: 'game',
    created_at: '2026-01-10T10:00:00Z',
    count: 2
  },
  {
    id: 'cat-arcade',
    name: 'Arcade & Sandbox',
    slug: 'arcade',
    description: 'Creative sandbox builders, runner mechanics, and arcade classics.',
    icon: 'fa-solid fa-gamepad',
    type: 'game',
    created_at: '2026-01-10T10:00:00Z',
    count: 3
  },
  {
    id: 'cat-emulation',
    name: 'Emulation & Retro',
    slug: 'emulation',
    description: 'Open-source console emulators and retro preservation tools.',
    icon: 'fa-solid fa-ghost',
    type: 'game',
    created_at: '2026-01-10T10:00:00Z',
    count: 1
  },
  {
    id: 'cat-productivity',
    name: 'Productivity & Notes',
    slug: 'productivity',
    description: 'Markdown vaults, organization, task management, and document workflows.',
    icon: 'fa-solid fa-file-lines',
    type: 'app',
    created_at: '2026-01-10T10:00:00Z',
    count: 3
  },
  {
    id: 'cat-security',
    name: 'Security & Privacy',
    slug: 'security',
    description: 'Encrypted email, password vaults, ad-free browsing, and 2FA keys.',
    icon: 'fa-solid fa-shield-halved',
    type: 'app',
    created_at: '2026-01-10T10:00:00Z',
    count: 3
  },
  {
    id: 'cat-media',
    name: 'Media & Video',
    slug: 'media-video',
    description: 'Audio and video players, format converters, and streaming controllers.',
    icon: 'fa-solid fa-play',
    type: 'app',
    created_at: '2026-01-10T10:00:00Z',
    count: 2
  },
  {
    id: 'cat-devtools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'Terminal emulators, package managers, and programming environments.',
    icon: 'fa-solid fa-terminal',
    type: 'app',
    created_at: '2026-01-10T10:00:00Z',
    count: 2
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  // --- BEST UPDATED GAMES ---
  {
    id: 'listing-dead-cells',
    title: 'Dead Cells',
    slug: 'dead-cells',
    listing_type: 'game',
    short_description: 'Fast-paced roguevania action platformer with fluid responsive combat and gamepad support.',
    description: 'Dead Cells is a rogue-lite, metroidvania inspired action platformer. You explore a sprawling, ever-changing castle where death is not the end. The Android edition features a redesigned touch interface, full external Bluetooth controller support, and all official expansions.',
    developer: 'Playdigious',
    category_id: 'cat-action',
    category_name: 'Action Games',
    category_slug: 'action',
    icon_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v3.3.15',
    android_requirement: 'Android 7.0 and up',
    app_size: '1.2 GB',
    official_website: 'https://playdigious.com/dead-cells',
    official_store_url: 'https://play.google.com/store/apps/details?id=com.playdigious.deadcells.mobile',
    authorised_download_url: 'https://playdigious.com/dead-cells',
    status: 'published',
    published_at: '2026-10-15T08:00:00Z',
    created_at: '2026-09-01T12:00:00Z',
    updated_at: '2026-10-15T08:00:00Z',
    is_updated: true,
    is_featured: true,
    tags: ['Action', 'Rogue-lite', 'Metroidvania', 'Controller Compatible']
  },
  {
    id: 'listing-retroarch',
    title: 'RetroArch',
    slug: 'retroarch',
    listing_type: 'game',
    short_description: 'Modular open-source frontend for video game emulators, game engines, and media players.',
    description: 'RetroArch is the reference frontend for the Libretro API. It enables you to run classic games on a wide range of computers and consoles through its slick graphical interface. Features next-frame response time with run-ahead latency mitigation, netplay multiplayer, and dynamic shader support.',
    developer: 'Libretro Open Source Community',
    category_id: 'cat-emulation',
    category_name: 'Emulation & Retro',
    category_slug: 'emulation',
    icon_url: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v1.19.1',
    android_requirement: 'Android 5.0 and up',
    app_size: '190 MB',
    official_website: 'https://www.retroarch.com',
    official_store_url: 'https://play.google.com/store/apps/details?id=com.retroarch.aarch64',
    authorised_download_url: 'https://buildbot.libretro.com/stable/1.19.1/android/',
    status: 'published',
    published_at: '2026-10-12T14:00:00Z',
    created_at: '2026-08-10T12:00:00Z',
    updated_at: '2026-10-12T14:00:00Z',
    is_updated: true,
    is_popular: true,
    tags: ['Open Source', 'Emulation', 'Retro', 'Multiplayer']
  },
  {
    id: 'listing-minecraft',
    title: 'Minecraft',
    slug: 'minecraft',
    listing_type: 'game',
    short_description: 'Build, explore, craft, and survive in infinite procedurally generated voxel landscapes.',
    description: 'Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode, crafting weapons and armor to fend off dangerous mobs. Includes cross-platform multiplayer with Bedrock editions.',
    developer: 'Mojang Studios',
    category_id: 'cat-arcade',
    category_name: 'Arcade & Sandbox',
    category_slug: 'arcade',
    icon_url: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1627856014754-2907e2355d54?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1627856014754-2907e2355d54?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v1.21.20',
    android_requirement: 'Android 8.0 and up',
    app_size: '680 MB',
    official_website: 'https://www.minecraft.net',
    official_store_url: 'https://play.google.com/store/apps/details?id=com.mojang.minecraftpe',
    authorised_download_url: 'https://www.minecraft.net/en-us/store/minecraft-android',
    status: 'published',
    published_at: '2026-10-18T10:00:00Z',
    created_at: '2026-07-01T12:00:00Z',
    updated_at: '2026-10-18T10:00:00Z',
    is_updated: true,
    is_popular: true,
    tags: ['Sandbox', 'Multiplayer', 'Survival', 'Crafting']
  },

  // --- BEST UPDATED APPS ---
  {
    id: 'listing-vlc',
    title: 'VLC for Android',
    slug: 'vlc-android',
    listing_type: 'app',
    short_description: 'Open-source multimedia player that plays most multimedia files as well as discs and devices.',
    description: 'VLC for Android is a full audio and video player, with a complete database, an equalizer and filters, playing all weird audio formats. VLC is intended for everyone, is totally free, has no ads, no in-app-purchases, no spying and is developed by passionate volunteers.',
    developer: 'Videolabs & VideoLAN',
    category_id: 'cat-media',
    category_name: 'Media & Video',
    category_slug: 'media-video',
    icon_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v3.5.4',
    android_requirement: 'Android 5.0 and up',
    app_size: '34 MB',
    official_website: 'https://www.videolan.org/vlc/download-android.html',
    official_store_url: 'https://play.google.com/store/apps/details?id=org.videolan.vlc',
    authorised_download_url: 'https://get.videolan.org/vlc-android/',
    status: 'published',
    published_at: '2026-10-14T09:30:00Z',
    created_at: '2026-06-01T12:00:00Z',
    updated_at: '2026-10-14T09:30:00Z',
    is_updated: true,
    is_popular: true,
    tags: ['Open Source', 'Media Player', 'No Ads', 'Hardware Decoding']
  },
  {
    id: 'listing-obsidian',
    title: 'Obsidian Mobile',
    slug: 'obsidian-mobile',
    listing_type: 'app',
    short_description: 'Powerful, extensible knowledge base that works on top of your local folder of plain text Markdown files.',
    description: 'Obsidian is a private, flexible writing app that adapts to the way you think. Your data lives in a local folder on your Android device and never gets locked in a proprietary format. Supports offline editing, interactive graph visualization, and thousands of community plugins.',
    developer: 'Dynalist Inc.',
    category_id: 'cat-productivity',
    category_name: 'Productivity & Notes',
    category_slug: 'productivity',
    icon_url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v1.7.4',
    android_requirement: 'Android 7.0 and up',
    app_size: '44 MB',
    official_website: 'https://obsidian.md',
    official_store_url: 'https://play.google.com/store/apps/details?id=md.obsidian',
    authorised_download_url: 'https://obsidian.md/download',
    status: 'published',
    published_at: '2026-10-16T11:00:00Z',
    created_at: '2026-05-15T12:00:00Z',
    updated_at: '2026-10-16T11:00:00Z',
    is_updated: true,
    is_featured: true,
    tags: ['Markdown', 'Productivity', 'Offline-First', 'Knowledge Management']
  },
  {
    id: 'listing-bitwarden',
    title: 'Bitwarden Password Manager',
    slug: 'bitwarden',
    listing_type: 'app',
    short_description: 'Open-source password manager with end-to-end zero-knowledge encryption for Android.',
    description: 'Bitwarden is the easiest and safest way to store all of your logins and passwords while conveniently keeping them synced between all of your devices. Features biometric unlock, strong password generation, encrypted file attachments, and passkey support.',
    developer: 'Bitwarden Inc.',
    category_id: 'cat-security',
    category_name: 'Security & Privacy',
    category_slug: 'security',
    icon_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v2026.9.1',
    android_requirement: 'Android 8.0 and up',
    app_size: '59 MB',
    official_website: 'https://bitwarden.com',
    official_store_url: 'https://play.google.com/store/apps/details?id=com.x8bit.bitwarden',
    authorised_download_url: 'https://github.com/bitwarden/mobile/releases',
    status: 'published',
    published_at: '2026-10-17T16:00:00Z',
    created_at: '2026-04-10T12:00:00Z',
    updated_at: '2026-10-17T16:00:00Z',
    is_updated: true,
    is_featured: true,
    tags: ['Security', 'Open Source', 'Passwords', 'Zero-Knowledge']
  },

  // --- POPULAR GAMES ---
  {
    id: 'listing-altos-adventure',
    title: "Alto's Adventure",
    slug: 'altos-adventure',
    listing_type: 'game',
    short_description: 'Endless snowboarding odyssey across hills, alpine forests, and long-abandoned ruins.',
    description: "Join Alto and his friends as they embark on an endless snowboarding odyssey. Journey across the beautiful alpine hills of their native wilderness, through neighboring villages, ancient woodlands, and long-abandoned ruins. Fluid physics-based gameplay with dynamic lighting and weather effects.",
    developer: 'Snowman / Noodlecake',
    category_id: 'cat-action',
    category_name: 'Action Games',
    category_slug: 'action',
    icon_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v1.8.15',
    android_requirement: 'Android 6.0 and up',
    app_size: '78 MB',
    official_website: 'https://altosadventure.com',
    official_store_url: 'https://play.google.com/store/apps/details?id=com.noodlecake.altosadventure',
    authorised_download_url: 'https://altosadventure.com',
    status: 'published',
    published_at: '2026-09-20T10:00:00Z',
    created_at: '2026-03-01T12:00:00Z',
    updated_at: '2026-09-20T10:00:00Z',
    is_popular: true,
    tags: ['Endless Runner', 'Physics', 'Atmospheric', 'Offline Play']
  },
  {
    id: 'listing-subway-surfers',
    title: 'Subway Surfers',
    slug: 'subway-surfers',
    listing_type: 'game',
    short_description: 'Dash as fast as you can through metro tracks, dodging oncoming trains with hoverboards.',
    description: 'Help Jake, Tricky & Fresh escape from the grumpy Inspector and his dog. Grind trains with your cool crew, use colorful and vivid HD graphics, hoverboard surfing, paint-powered jetpacks, and lightning-fast swipe acrobatics.',
    developer: 'SYBO Games',
    category_id: 'cat-arcade',
    category_name: 'Arcade & Sandbox',
    category_slug: 'arcade',
    icon_url: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v3.32.0',
    android_requirement: 'Android 6.0 and up',
    app_size: '165 MB',
    official_website: 'https://sybogames.com/subway-surfers',
    official_store_url: 'https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf',
    authorised_download_url: 'https://sybogames.com',
    status: 'published',
    published_at: '2026-10-10T12:00:00Z',
    created_at: '2026-02-15T12:00:00Z',
    updated_at: '2026-10-10T12:00:00Z',
    is_popular: true,
    tags: ['Runner', 'Arcade', 'Casual']
  },
  {
    id: 'listing-genshin-impact',
    title: 'Genshin Impact',
    slug: 'genshin-impact',
    listing_type: 'game',
    short_description: 'Open-world action RPG set in the vast fantasy world of Teyvat with elemental combat.',
    description: 'Step into Teyvat, a vast world teeming with life and flowing with elemental energy. You and your sibling arrived here from another world. Separated by an unknown god, stripped of your powers, and cast into a deep slumber, you now awake to a world very different from when you first arrived.',
    developer: 'COGNOSPHERE PTE. LTD.',
    category_id: 'cat-rpg',
    category_name: 'Role Playing',
    category_slug: 'role-playing',
    icon_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v5.1.0',
    android_requirement: 'Android 8.1 and up',
    app_size: '3.9 GB',
    official_website: 'https://genshin.hoyoverse.com',
    official_store_url: 'https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact',
    authorised_download_url: 'https://genshin.hoyoverse.com/en/home',
    status: 'published',
    published_at: '2026-10-08T08:00:00Z',
    created_at: '2026-01-20T12:00:00Z',
    updated_at: '2026-10-08T08:00:00Z',
    is_popular: true,
    tags: ['RPG', 'Open World', 'Anime', 'Multiplayer']
  },

  // --- POPULAR APPS ---
  {
    id: 'listing-proton-mail',
    title: 'Proton Mail: Encrypted Email',
    slug: 'proton-mail',
    listing_type: 'app',
    short_description: 'End-to-end encrypted email and calendar built on Swiss privacy laws.',
    description: 'Proton Mail is open source, independently audited, and protected by Swiss privacy law. Zero-access encryption protects your inbox from cyberattacks, big tech surveillance, and spam trackers. Does not require your phone number or personal tracking to register.',
    developer: 'Proton AG',
    category_id: 'cat-security',
    category_name: 'Security & Privacy',
    category_slug: 'security',
    icon_url: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v3.1.2',
    android_requirement: 'Android 6.0 and up',
    app_size: '46 MB',
    official_website: 'https://proton.me/mail',
    official_store_url: 'https://play.google.com/store/apps/details?id=ch.protonmail.android',
    authorised_download_url: 'https://github.com/ProtonMail/proton-mail-android/releases',
    status: 'published',
    published_at: '2026-10-11T13:00:00Z',
    created_at: '2026-03-12T12:00:00Z',
    updated_at: '2026-10-11T13:00:00Z',
    is_popular: true,
    tags: ['Privacy', 'Encrypted', 'Email', 'Open Source']
  },
  {
    id: 'listing-termux',
    title: 'Termux Terminal & Linux Env',
    slug: 'termux',
    listing_type: 'app',
    short_description: 'Android terminal emulator and Linux environment working directly with no rooting required.',
    description: 'Termux combines powerful terminal emulation with an extensive Linux package collection. Enjoy the Bash and Zsh shells, edit files with nano and vim, access servers over SSH, and develop with C, Python, Perl, Node.js and Ruby right on your mobile hardware.',
    developer: 'Fredrik Fornwall & Contributors',
    category_id: 'cat-devtools',
    category_name: 'Developer Tools',
    category_slug: 'developer-tools',
    icon_url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v0.118.1',
    android_requirement: 'Android 7.0 and up',
    app_size: '98 MB',
    official_website: 'https://termux.dev',
    official_store_url: 'https://f-droid.org/en/packages/com.termux/',
    authorised_download_url: 'https://github.com/termux/termux-app/releases',
    status: 'published',
    published_at: '2026-10-05T15:00:00Z',
    created_at: '2026-02-01T12:00:00Z',
    updated_at: '2026-10-05T15:00:00Z',
    is_popular: true,
    tags: ['Terminal', 'Linux', 'Developer', 'Open Source']
  },
  {
    id: 'listing-brave-browser',
    title: 'Brave Private Web Browser',
    slug: 'brave-browser',
    listing_type: 'app',
    short_description: 'Fast, secure, and private browser with built-in ad blocker and HTTPS Everywhere.',
    description: 'Brave is a lightning-fast, private, and secure web browser for Android with ad blocker, pop-up blocker, script blocker, and tracking protection. Browse the internet smoothly without annoying interstitial trackers draining your mobile battery or bandwidth.',
    developer: 'Brave Software',
    category_id: 'cat-security',
    category_name: 'Security & Privacy',
    category_slug: 'security',
    icon_url: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v1.70.120',
    android_requirement: 'Android 7.0 and up',
    app_size: '102 MB',
    official_website: 'https://brave.com',
    official_store_url: 'https://play.google.com/store/apps/details?id=com.brave.browser',
    authorised_download_url: 'https://github.com/brave/brave-browser/releases',
    status: 'published',
    published_at: '2026-10-18T18:00:00Z',
    created_at: '2026-03-25T12:00:00Z',
    updated_at: '2026-10-18T18:00:00Z',
    is_popular: true,
    tags: ['Browser', 'Ad Blocker', 'Privacy']
  },

  // --- RECENTLY ADDED ---
  {
    id: 'listing-ankidroid',
    title: 'AnkiDroid Flashcards',
    slug: 'ankidroid',
    listing_type: 'app',
    short_description: 'Spaced repetition flashcards application for learning languages, medicine, and exams.',
    description: 'Remember anything with AnkiDroid! Helps you learn flashcards very efficiently by showing them just before you would forget. Fully compatible with the desktop spaced repetition flashcard software Anki. Free, open source, and ad-free forever.',
    developer: 'AnkiDroid Open Source Team',
    category_id: 'cat-productivity',
    category_name: 'Productivity & Notes',
    category_slug: 'productivity',
    icon_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v2.18.2',
    android_requirement: 'Android 5.0 and up',
    app_size: '29 MB',
    official_website: 'https://ankidroid.org',
    official_store_url: 'https://play.google.com/store/apps/details?id=com.ichi2.anki',
    authorised_download_url: 'https://github.com/ankidroid/Anki-Android/releases',
    status: 'published',
    published_at: '2026-10-21T10:15:00Z',
    created_at: '2026-10-21T10:15:00Z',
    updated_at: '2026-10-21T10:15:00Z',
    tags: ['Education', 'Flashcards', 'Spaced Repetition', 'Open Source']
  },
  {
    id: 'listing-badland',
    title: 'BADLAND',
    slug: 'badland',
    listing_type: 'game',
    short_description: 'Atmospheric side-scrolling action adventure platformer set in a gorgeous forest.',
    description: 'Fly and survive through the award-winning action adventure game BADLAND. Set in a gorgeous forest full of various inhabitants, trees and flowers. Although the forest appears to be right out of a beautiful fairy tale, there is something terribly wrong. Control one of the forest dwellers to find out what is going on.',
    developer: 'Frogmind',
    category_id: 'cat-action',
    category_name: 'Action Games',
    category_slug: 'action',
    icon_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80'
    ],
    version: 'v3.2.0.80',
    android_requirement: 'Android 5.0 and up',
    app_size: '86 MB',
    official_website: 'https://frogmind.com/badland/',
    official_store_url: 'https://play.google.com/store/apps/details?id=com.frogmind.badland',
    authorised_download_url: 'https://frogmind.com',
    status: 'published',
    published_at: '2026-10-22T08:00:00Z',
    created_at: '2026-10-22T08:00:00Z',
    updated_at: '2026-10-22T08:00:00Z',
    tags: ['Atmospheric', 'Physics', 'Action']
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-vlc',
    title: 'VLC Media Player for Android',
    subtitle: 'Free & open-source multimedia engine with no ads or tracking',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80',
    destination_url: '/apps/vlc-android',
    sort_order: 1,
    is_active: true,
    start_at: null,
    end_at: null,
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'banner-dead-cells',
    title: 'Dead Cells: Android Edition',
    subtitle: 'Roguevania combat with 60FPS precision and full controller support',
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop&q=80',
    destination_url: '/games/dead-cells',
    sort_order: 2,
    is_active: true,
    start_at: null,
    end_at: null,
    created_at: '2026-09-02T00:00:00Z'
  },
  {
    id: 'banner-obsidian',
    title: 'Obsidian Mobile Vault',
    subtitle: 'Sovereign markdown notes with offline privacy and canvas view',
    image_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&fit=crop&q=80',
    destination_url: '/apps/obsidian-mobile',
    sort_order: 3,
    is_active: true,
    start_at: null,
    end_at: null,
    created_at: '2026-09-03T00:00:00Z'
  },
  {
    id: 'banner-retroarch',
    title: 'RetroArch Multi-System Emulator',
    subtitle: 'Modular emulation frontend with next-frame latency reduction',
    image_url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&auto=format&fit=crop&q=80',
    destination_url: '/games/retroarch',
    sort_order: 4,
    is_active: true,
    start_at: null,
    end_at: null,
    created_at: '2026-09-04T00:00:00Z'
  },
  {
    id: 'banner-bitwarden',
    title: 'Bitwarden Zero-Knowledge Vault',
    subtitle: 'Trusted end-to-end credential and passkey management',
    image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=900&auto=format&fit=crop&q=80',
    destination_url: '/apps/bitwarden',
    sort_order: 5,
    is_active: true,
    start_at: null,
    end_at: null,
    created_at: '2026-09-05T00:00:00Z'
  },
  {
    id: 'banner-alto',
    title: "Alto's Adventure",
    subtitle: 'Endless downhill snowboarding odyssey across alpine wilderness',
    image_url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=900&auto=format&fit=crop&q=80',
    destination_url: '/games/altos-adventure',
    sort_order: 6,
    is_active: true,
    start_at: null,
    end_at: null,
    created_at: '2026-09-06T00:00:00Z'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Verify APK Signatures and SHA-256 Hashes on Android',
    slug: 'how-to-verify-apk-signatures-and-sha256-hashes',
    excerpt: 'A practical, security-focused walkthrough on verifying cryptographic signatures and SHA-256 checksums before sideloading Android packages.',
    content: `When installing Android applications from sources outside the primary Play Store, cryptographic verification is your most dependable shield. Android uses APK Signature Scheme v2/v3/v4 to guarantee that an APK file was built by the genuine developer and has not been altered or injected with adware.

### Why Verification Matters
Many third-party sites re-sign APKs with generic test keys. When an application is re-signed, its signature hash changes, breaking seamless automatic updates and opening doors to malicious tampering. By verifying the original SHA-256 fingerprint, you ensure that the binary matches the upstream developer release.

### Step 1: Checking the SHA-256 Checksum
Most reputable open-source projects (such as Bitwarden, VLC, or Termux) publish SHA-256 checksums alongside their release tags on GitHub or F-Droid. On your computer or mobile terminal:
\`\`\`bash
sha256sum your-downloaded-app.apk
\`\`\`
Compare the resulting 64-character hexadecimal hash with the checksum declared on the developer's official release page.

### Step 2: Inspecting APK Signatures with apksigner
Android SDK includes \`apksigner\`, which checks the digital signature directly:
\`\`\`bash
apksigner verify --verbose --print-certs your-downloaded-app.apk
\`\`\`
Look for:
- **Signer #1 certificate DN**: CN should match the developer organization.
- **SHA-256 digest of the certificate**: Compare this against the established public developer key.

### Summary
Never trust files with mismatched signatures or unexplained permission escalations. At DroidNest, all listed applications link directly to official developer repositories and authorized app stores, preserving signature integrity.`,
    featured_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&auto=format&fit=crop&q=80',
    author: 'DroidNest Security Team',
    status: 'published',
    published_at: '2026-10-19T10:00:00Z',
    read_time: '5 min read',
    category: 'Security & Privacy',
    tags: ['Security', 'APK Verification', 'Android Security', 'Open Source'],
    seo_title: 'How to Verify APK Signatures & Checksums on Android',
    seo_description: 'Learn how to verify APK signatures, check SHA-256 hashes, and inspect certificates to ensure authentic Android packages.',
    created_at: '2026-10-19T10:00:00Z',
    updated_at: '2026-10-19T10:00:00Z'
  },
  {
    id: 'blog-2',
    title: 'The Best Open-Source Android Apps You Should Install in 2026',
    slug: 'best-open-source-android-apps-2026',
    excerpt: 'Explore essential FOSS Android applications that prioritize privacy, efficiency, zero telemetry, and long-term user ownership.',
    content: `The open-source Android ecosystem continues to produce some of the most reliable software available on mobile devices. Free and Open Source Software (FOSS) guarantees transparency, respects battery life, and eliminates invasive advertising frameworks.

### 1. VLC for Android
Videolabs has built what remains the undisputed king of local and network playback. VLC supports everything from HEVC/H.265 video to FLAC audio, 360-degree video, and multi-track subtitles. Best of all, it has zero analytics and requires only storage permissions.

### 2. Obsidian Mobile
Obsidian treats your notes as local plain-text Markdown files. Unlike proprietary cloud silos that lock notes behind monthly subscriptions, Obsidian lets you store your entire knowledge graph offline. You can sync via Git, Syncthing, or your preferred encrypted backup.

### 3. Bitwarden
With passkeys now becoming an industry standard, Bitwarden provides zero-knowledge AES-256 bit encryption across all your mobile accounts. It seamlessly integrates into Android's Autofill framework.

### 4. RetroArch
For gaming preservation, RetroArch's Libretro core architecture delivers unmatched flexibility for running retro console games with reduced input lag and responsive touch overlays.

### Conclusion
Embracing open-source software on Android does not require sacrificing convenience. With modern interfaces and active developer teams, these tools provide complete autonomy.`,
    featured_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80',
    author: 'Elena Vance, Senior Tech Editor',
    status: 'published',
    published_at: '2026-10-14T14:30:00Z',
    read_time: '6 min read',
    category: 'Productivity & Tools',
    tags: ['FOSS', 'Open Source', 'Privacy', 'Android Tools'],
    seo_title: 'The Best Open-Source Android Apps in 2026 — DroidNest',
    seo_description: 'Discover the top verified open-source Android apps for privacy, productivity, and media playback without ads or tracking.',
    created_at: '2026-10-14T14:30:00Z',
    updated_at: '2026-10-14T14:30:00Z'
  },
  {
    id: 'blog-3',
    title: 'Optimizing RetroArch Cores and Shaders for Mobile Performance',
    slug: 'optimizing-retroarch-cores-and-shaders-mobile',
    excerpt: 'Tune latency, configure touch overlays, and apply lightweight CRT shaders without draining mobile battery or causing thermal throttling.',
    content: `RetroArch is the premier emulation frontend on Android, but default configurations can sometimes strain mobile thermal limits or suffer from touch input lag.

### Latency Reduction: The Power of Run-Ahead
One of RetroArch's standout features is **Run-Ahead**. By executing frames ahead of time and rolling back on input, RetroArch can reduce latency below that of original hardware:
1. Navigate to **Settings > Latency**.
2. Turn on **Run-Ahead to Reduce Latency**.
3. Set **Number of Frames to Run Ahead** to 1 or 2 (start with 1 for CPU-intensive cores).

### Choosing Battery-Friendly Shaders
High-end desktop shaders (like CRT-Royale) will cause mobile GPUs to heat up quickly. Instead, look into the **glsl/shaders_glsl/crt/** directory for:
- \`crt-easymode\`: Excellent balance of scanlines and low GPU load.
- \`zfast-crt\`: Specifically optimized for mobile ARM architectures.

### Controller Mapping
Bluetooth latency can be minimized by pairing controllers that support low-latency HID profiles or using direct USB-C OTG connection.`,
    featured_image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&auto=format&fit=crop&q=80',
    author: 'Marcus Rivera, Gaming Specialist',
    status: 'published',
    published_at: '2026-10-09T09:00:00Z',
    read_time: '4 min read',
    category: 'Gaming & Guides',
    tags: ['RetroArch', 'Emulation', 'Gaming', 'Android Optimization'],
    seo_title: 'RetroArch Mobile Optimization Guide — DroidNest',
    seo_description: 'Learn how to optimize RetroArch latency, configure run-ahead, and choose battery-efficient shaders on Android.',
    created_at: '2026-10-09T09:00:00Z',
    updated_at: '2026-10-09T09:00:00Z'
  }
];

export const INITIAL_WEBSITE_SETTINGS: WebsiteSettings = {
  id: 'site-settings',
  site_name: 'DroidNest',
  tagline: 'Discover the Best Android Apps & Games',
  description: 'DroidNest is an authoritative discovery portal for Android applications, mobile tools, productivity software, and exciting games. Every listing links directly to official developer sources with zero cracks or modded files.',
  contact_email: 'editorial@droidnest.app',
  social_twitter: 'https://twitter.com/droidnest_app',
  social_github: 'https://github.com/droidnest',
  social_telegram: 'https://t.me/droidnest_official',
  gtm_id: '',
  ga4_id: '',
  editorial_title: 'Why DroidNest Is Built Different',
  editorial_content: `In an internet flooded with deceptive "modded APK" repositories, intrusive adware installers, and artificial download counts, DroidNest was founded on a simple principle: absolute transparency and developer respect.

Every listing on DroidNest provides verified, factual metadata derived directly from developers and official distributions. We never fabricate star ratings, download counters, or malware scan badges. When an application is open source, we provide direct links to its official GitHub or F-Droid repository. When an application is commercial, we link directly to recognized storefronts like Google Play.

DroidNest is built for users who care about software sovereignty, device security, and high-quality mobile experiences.`,
  updated_at: '2026-10-23T15:00:00Z'
};

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-1',
    name: 'dead-cells-cover.jpg',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    size_kb: 142,
    mime_type: 'image/jpeg',
    alt_text: 'Dead Cells Cover Art',
    created_at: '2026-10-01T12:00:00Z'
  },
  {
    id: 'med-2',
    name: 'vlc-player-cover.jpg',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    size_kb: 118,
    mime_type: 'image/jpeg',
    alt_text: 'VLC Android Media Cover',
    created_at: '2026-10-02T12:00:00Z'
  },
  {
    id: 'med-3',
    name: 'obsidian-vault-cover.jpg',
    url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
    size_kb: 135,
    mime_type: 'image/jpeg',
    alt_text: 'Obsidian Mobile Markdown Notes Cover',
    created_at: '2026-10-03T12:00:00Z'
  }
];
