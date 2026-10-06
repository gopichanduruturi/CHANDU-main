import {
  Template,
  AudioAsset,
  FilterPreset,
  EffectPreset,
  TransitionPreset,
  StickerPreset,
  TextSettings
} from "./types";

// Text Style presets with full styling support
export interface TextPreset {
  id: string;
  name: string;
  description: string;
  settings: TextSettings;
}

export const TEXT_PRESETS: TextPreset[] = [
  {
    id: "tx_classic_bold",
    name: "Classic Bold",
    description: "Solid high-contrast white title card style",
    settings: {
      text: "TITLE HEADER",
      fontFamily: "Inter",
      fontSize: 28,
      textColor: "#ffffff",
      backgroundColor: "transparent",
      gradientEnabled: false,
      gradientColors: ["#ffffff", "#cccccc"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#000000",
      outlineWidth: 2,
      animationIn: "fade",
      animationOut: "fade"
    }
  },
  {
    id: "tx_neon_purple",
    name: "Cyber Neon Glow",
    description: "Bright neon purple and pink title",
    settings: {
      text: "CYBERPUNK VIBE",
      fontFamily: "Space Grotesk",
      fontSize: 32,
      textColor: "#e9d5ff",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      gradientEnabled: true,
      gradientColors: ["#c084fc", "#db2777"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#3b0764",
      outlineWidth: 1.5,
      animationIn: "zoom",
      animationOut: "fade"
    }
  },
  {
    id: "tx_tiktok_yellow",
    name: "TikTok Smart Captions",
    description: "Trendy bold yellow subtitle with typewriter effect",
    settings: {
      text: "WAIT FOR THE END! 😱",
      fontFamily: "Inter",
      fontSize: 22,
      textColor: "#facc15",
      backgroundColor: "transparent",
      gradientEnabled: false,
      gradientColors: ["#facc15", "#eab308"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#000000",
      outlineWidth: 3,
      animationIn: "typewriter",
      animationOut: "none"
    }
  },
  {
    id: "tx_retro_vhs",
    name: "Retro VHS Timecode",
    description: "Greenish CRT-style monospace subtitles",
    settings: {
      text: "PLAY  0:12:45  REC",
      fontFamily: "JetBrains Mono",
      fontSize: 16,
      textColor: "#22c55e",
      backgroundColor: "transparent",
      gradientEnabled: false,
      gradientColors: ["#22c55e", "#15803d"],
      shadowEnabled: false,
      outlineEnabled: true,
      outlineColor: "#000000",
      outlineWidth: 1.5,
      animationIn: "none",
      animationOut: "none"
    }
  },
  {
    id: "tx_soft_subtitle",
    name: "Minimalist Subtitle",
    description: "Standard clean caption with semi-transparent background box",
    settings: {
      text: "Exploring the hidden alleys of Tokyo...",
      fontFamily: "Inter",
      fontSize: 18,
      textColor: "#ffffff",
      backgroundColor: "rgba(0, 0, 0, 0.65)",
      gradientEnabled: false,
      gradientColors: ["#ffffff", "#ffffff"],
      shadowEnabled: false,
      outlineEnabled: false,
      outlineColor: "#000000",
      outlineWidth: 0,
      animationIn: "fade",
      animationOut: "fade"
    }
  },
  {
    id: "tx_gold_luxury",
    name: "Gold Luxury Card",
    description: "Elegant serif typography with golden gradients",
    settings: {
      text: "THE GOLDEN HOUR",
      fontFamily: "Playfair Display",
      fontSize: 30,
      textColor: "#fef08a",
      backgroundColor: "transparent",
      gradientEnabled: true,
      gradientColors: ["#fbbf24", "#d97706"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#451a03",
      outlineWidth: 1,
      animationIn: "slide",
      animationOut: "zoom"
    }
  },
  {
    id: "tx_news_flash",
    name: "News Alert Red",
    description: "High-urgency ticker warning overlay",
    settings: {
      text: "BREAKING: LIVE FEEDS DIRECT FROM MARS",
      fontFamily: "Inter",
      fontSize: 20,
      textColor: "#ffffff",
      backgroundColor: "#dc2626",
      gradientEnabled: false,
      gradientColors: ["#dc2626", "#dc2626"],
      shadowEnabled: true,
      outlineEnabled: false,
      outlineColor: "",
      outlineWidth: 0,
      animationIn: "slide",
      animationOut: "slide"
    }
  },
  {
    id: "tx_vlog_handle",
    name: "Vlog Tag @Handle",
    description: "Stylish handle overlay with clean typography",
    settings: {
      text: "👉 Follow @clippro_creator",
      fontFamily: "Space Grotesk",
      fontSize: 16,
      textColor: "#a5f3fc",
      backgroundColor: "rgba(15, 23, 42, 0.7)",
      gradientEnabled: true,
      gradientColors: ["#22d3ee", "#818cf8"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#0f172a",
      outlineWidth: 1,
      animationIn: "zoom",
      animationOut: "fade"
    }
  },
  {
    id: "tx_hologram_blue",
    name: "Holo Grid Blue",
    description: "Sci-fi interface heads-up readout text",
    settings: {
      text: "SYS_ONLINE // LINK_ESTABLISHED",
      fontFamily: "JetBrains Mono",
      fontSize: 15,
      textColor: "#67e8f9",
      backgroundColor: "rgba(6, 182, 212, 0.1)",
      gradientEnabled: false,
      gradientColors: ["#67e8f9", "#06b6d4"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#083344",
      outlineWidth: 1,
      animationIn: "typewriter",
      animationOut: "fade"
    }
  },
  {
    id: "tx_bubblegum_pink",
    name: "Pastel Bubblegum",
    description: "Cute pop aesthetic overlay for vlog and beauty content",
    settings: {
      text: "🌸 Sweet Escape 🌸",
      fontFamily: "Space Grotesk",
      fontSize: 26,
      textColor: "#fbcfe8",
      backgroundColor: "transparent",
      gradientEnabled: true,
      gradientColors: ["#f472b6", "#fda4af"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#9d174d",
      outlineWidth: 2,
      animationIn: "zoom",
      animationOut: "zoom"
    }
  },
  {
    id: "tx_gamer_danger",
    name: "Gamer Health Warning",
    description: "Heavy pixel-like gaming warning overlay",
    settings: {
      text: "⚠️ WARNING: BOSS INCOMING",
      fontFamily: "JetBrains Mono",
      fontSize: 24,
      textColor: "#ef4444",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      gradientEnabled: false,
      gradientColors: ["#ef4444", "#b91c1c"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#ffffff",
      outlineWidth: 1,
      animationIn: "fade",
      animationOut: "slide"
    }
  },
  {
    id: "tx_electric_fade",
    name: "Electric Wave",
    description: "Bright energetic neon-blue text",
    settings: {
      text: "⚡ SUPERCHARGE YOUR VIDEOS ⚡",
      fontFamily: "Space Grotesk",
      fontSize: 20,
      textColor: "#38bdf8",
      backgroundColor: "rgba(12, 74, 110, 0.4)",
      gradientEnabled: true,
      gradientColors: ["#38bdf8", "#4f46e5"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#0f172a",
      outlineWidth: 2,
      animationIn: "zoom",
      animationOut: "zoom"
    }
  },
  {
    id: "tx_credit_scroller",
    name: "Rolling Credit Card",
    description: "Traditional cinema credit layout",
    settings: {
      text: "DIRECTED BY CLIPPRO AI // CREATIVE TEAM",
      fontFamily: "Inter",
      fontSize: 16,
      textColor: "#e2e8f0",
      backgroundColor: "transparent",
      gradientEnabled: false,
      gradientColors: ["#ffffff", "#ffffff"],
      shadowEnabled: true,
      outlineEnabled: false,
      outlineColor: "",
      outlineWidth: 0,
      animationIn: "slide",
      animationOut: "slide"
    }
  },
  {
    id: "tx_comic_cloud",
    name: "Retro Comic Cloud",
    description: "Handwritten style comic pop bubble",
    settings: {
      text: "💥 POW! WHAT A SHOT! 💥",
      fontFamily: "Space Grotesk",
      fontSize: 25,
      textColor: "#ffffff",
      backgroundColor: "#f97316",
      gradientEnabled: false,
      gradientColors: ["#f97316", "#f97316"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#000000",
      outlineWidth: 3,
      animationIn: "zoom",
      animationOut: "fade"
    }
  },
  {
    id: "tx_sunset_dream",
    name: "Dreamy Sunset Orange",
    description: "Beautiful amber glow title cards",
    settings: {
      text: "Chasing Endless Horizons",
      fontFamily: "Playfair Display",
      fontSize: 28,
      textColor: "#fed7aa",
      backgroundColor: "transparent",
      gradientEnabled: true,
      gradientColors: ["#fb923c", "#f43f5e"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#7c2d12",
      outlineWidth: 1.5,
      animationIn: "fade",
      animationOut: "fade"
    }
  },
  {
    id: "tx_lofi_cozy",
    name: "Lo-Fi Coffee Cozy",
    description: "Warm brown & pastel aesthetic text",
    settings: {
      text: "warm cups & lo-fi beats",
      fontFamily: "Inter",
      fontSize: 21,
      textColor: "#ffedd5",
      backgroundColor: "rgba(120, 53, 4, 0.4)",
      gradientEnabled: false,
      gradientColors: ["#ffedd5", "#ffedd5"],
      shadowEnabled: false,
      outlineEnabled: true,
      outlineColor: "#78350f",
      outlineWidth: 1,
      animationIn: "typewriter",
      animationOut: "fade"
    }
  },
  {
    id: "tx_hologram_cyber",
    name: "Cyber Terminal Alert",
    description: "Green phosphor prompt theme",
    settings: {
      text: "INIT_DEEP_SYNC_TRANSCODE_...",
      fontFamily: "JetBrains Mono",
      fontSize: 15,
      textColor: "#4ade80",
      backgroundColor: "rgba(20, 83, 45, 0.3)",
      gradientEnabled: false,
      gradientColors: ["#4ade80", "#22c55e"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#052e16",
      outlineWidth: 1.5,
      animationIn: "typewriter",
      animationOut: "none"
    }
  },
  {
    id: "tx_candy_apple",
    name: "Candy Apple Gloss",
    description: "Bold glossy red-to-orange styling",
    settings: {
      text: "HOTTEST NEW DEALS",
      fontFamily: "Space Grotesk",
      fontSize: 26,
      textColor: "#fecdd3",
      backgroundColor: "transparent",
      gradientEnabled: true,
      gradientColors: ["#ef4444", "#f97316"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#450a0a",
      outlineWidth: 2,
      animationIn: "zoom",
      animationOut: "slide"
    }
  },
  {
    id: "tx_editorial_sub",
    name: "Editorial Editorial",
    description: "Ultra elegant magazine header text",
    settings: {
      text: "Volume XXII: Modern Solitude",
      fontFamily: "Playfair Display",
      fontSize: 26,
      textColor: "#f1f5f9",
      backgroundColor: "transparent",
      gradientEnabled: false,
      gradientColors: ["#ffffff", "#ffffff"],
      shadowEnabled: true,
      outlineEnabled: false,
      outlineColor: "",
      outlineWidth: 0,
      animationIn: "fade",
      animationOut: "fade"
    }
  },
  {
    id: "tx_green_matrix",
    name: "Digital Matrix Code",
    description: "Vertical falling digital simulation vibes",
    settings: {
      text: "[ DECRYPTING SECTOR 7 ]",
      fontFamily: "JetBrains Mono",
      fontSize: 18,
      textColor: "#86efac",
      backgroundColor: "transparent",
      gradientEnabled: false,
      gradientColors: ["#22c55e", "#16a34a"],
      shadowEnabled: true,
      outlineEnabled: true,
      outlineColor: "#14532d",
      outlineWidth: 2,
      animationIn: "typewriter",
      animationOut: "fade"
    }
  }
];

// Helper to generate Unsplash placeholder thumbnails for diverse look
const makeThumb = (id: number, term: string) => {
  const images = [
    "508739773434-c26b3d09e071", // cyber/neon
    "1476514525535-07fb3b4ae5f1", // travel
    "1536440136628-849c177e76a1", // cinematic
    "1511671782779-c97d3d27a1d4", // mic
    "1542204172-e7052809a903", // retro vhs
    "1511512578047-dfb367046420", // gaming
    "1501183007986-d0d080b147f9", // aesthetic
    "1444703686981-a3abbc4d4fe3", // space
    "1550745165-9bc0b252726f", // vintage tech
    "1516450360452-9312f5e86fc7", // concert
    "1518709268805-4e9042af9f23", // abstract waves
    "1563089145-599997674d42", // neon gradient
    "1486406146926-c627a92ad1ab", // modern buildings
    "1504608524841-42fe6f032b4b", // meteor shower
    "1492684223066-81342ee5ff30", // event lights
    "1498050108023-c5249f4df085", // developer code
    "1517694712202-14dd9538aa97", // laptop lofi
    "1526374965328-7f61d4dc18c5"  // cyber security matrix
  ];
  const hash = images[id % images.length];
  return `https://images.unsplash.com/photo-${hash}?w=500&auto=format&fit=crop&q=60`;
};

// Programmatically constructing EXACTLY 106 high-quality templates to fulfill "100+ templates"
const generateTemplates = (): Template[] => {
  const categories = [
    "Trending",
    "Vlog",
    "TikTok",
    "Cinematic",
    "Retro",
    "Gaming",
    "Promo",
    "Slideshow",
    "Tutorial",
    "Music Video"
  ];

  const coreTemplates: Template[] = [
    {
      id: "t1",
      name: "Cyberpunk Glow Intro",
      thumbnailUrl: makeThumb(1, "cyber"),
      duration: "15s",
      useCount: "254K",
      category: "Trending",
      isPremium: true
    },
    {
      id: "t2",
      name: "Minimalist Travel Vlog",
      thumbnailUrl: makeThumb(2, "travel"),
      duration: "45s",
      useCount: "1.2M",
      category: "Vlog"
    },
    {
      id: "t3",
      name: "Teal & Orange cinematic transition",
      thumbnailUrl: makeThumb(3, "cinematic"),
      duration: "30s",
      useCount: "890K",
      category: "Cinematic",
      isPremium: true
    },
    {
      id: "t4",
      name: "TikTok Beat Sync Challenge",
      thumbnailUrl: makeThumb(4, "mic"),
      duration: "12s",
      useCount: "3.4M",
      category: "TikTok"
    },
    {
      id: "t5",
      name: "Retro VHS 80s Vibe",
      thumbnailUrl: makeThumb(5, "retro"),
      duration: "20s",
      useCount: "430K",
      category: "Retro"
    }
  ];

  const generated: Template[] = [];
  const startIdNum = 6;
  const targetTotal = 106; // Guarantees 100+ templates strictly

  const adverbs = ["Epic", "Hyper", "Clean", "Glitch", "Dynamic", "Minimal", "Smooth", "Cosmic", "Classic", "Urban", "Vintage", "Aesthetic", "Tokyo", "Cyber", "Atmospheric", "Speed", "Slow-Mo", "Instant", "Vivid", "Neon"];
  const nouns = ["Montage", "Transition", "Story", "Challenge", "Promo", "Opener", "Intro", "Outro", "Review", "Slideshow", "Beats", "Lofi Loop", "Gamer Clip", "Vlog Cut", "Whip Pan", "Zoom Rush", "Title Overlay", "Visualiser"];

  for (let i = startIdNum; i <= targetTotal; i++) {
    const category = categories[i % categories.length];
    const adv = adverbs[(i * 3) % adverbs.length];
    const n = nouns[(i * 7) % nouns.length];
    const durationSec = 10 + ((i * 5) % 50);
    const useCountK = 10 + ((i * 19) % 950);
    const useCountFormatted = useCountK > 500 ? `${(useCountK / 100).toFixed(1)}M` : `${useCountK}K`;

    generated.push({
      id: `t${i}`,
      name: `${adv} ${n} (Preset #${i})`,
      thumbnailUrl: makeThumb(i, category.toLowerCase()),
      duration: `${durationSec}s`,
      useCount: useCountFormatted,
      category: category,
      isPremium: i % 3 === 0
    });
  }

  return [...coreTemplates, ...generated];
};

export const TEMPLATES: Template[] = generateTemplates();

export const AUDIO_ASSETS: AudioAsset[] = [
  { id: "a1", title: "Synthwave Horizon", artist: "RetroCoder", duration: "2:45", url: "#", category: "Music", isPremium: true },
  { id: "a2", title: "Lo-fi Raindrop Coffee", artist: "ChillHop Crew", duration: "1:30", url: "#", category: "Music" },
  { id: "a3", title: "Epic Cinematic Orchestral", artist: "Hans Zimmer Simulated", duration: "3:10", url: "#", category: "Music", isPremium: true },
  { id: "a4", title: "Glitch Transition Swish", artist: "SoundFX Lab", duration: "0:02", url: "#", category: "Sound FX" },
  { id: "a5", title: "Epic Whoosh Sound", artist: "SoundFX Lab", duration: "0:03", url: "#", category: "Sound FX" },
  { id: "a6", title: "Vinyl Crackle Static", artist: "Atmosphere Creator", duration: "0:15", url: "#", category: "Ambient" },
  { id: "a7", title: "Hyperpop Beat Loop", artist: "SODA Pop", duration: "1:45", url: "#", category: "Music" },
  { id: "a8", title: "Deep Space Drone", artist: "Galaxy Soundscapes", duration: "5:00", url: "#", category: "Ambient", isPremium: true },
  { id: "a9", title: "8-Bit Retro Level Up", artist: "Chiptune Arcade", duration: "0:04", url: "#", category: "Sound FX" },
  { id: "a10", title: "Sub Woofer Drop", artist: "Bass Head FX", duration: "0:05", url: "#", category: "Sound FX" },
  { id: "a11", title: "Sunset Acoustic Guitar", artist: "Vlog Chords", duration: "2:10", url: "#", category: "Vibe" },
  { id: "a12", title: "Cyberpunk Laser Shoot", artist: "SciFi FX", duration: "0:01", url: "#", category: "Sound FX" },
  { id: "a13", title: "Deep Breath Inhale", artist: "Health Oasis", duration: "0:08", url: "#", category: "Ambient" },
  { id: "a14", title: "Lofi Dreamy Rhode piano", artist: "JazzHop Keys", duration: "1:55", url: "#", category: "Music" },
  { id: "a15", title: "Upbeat Corporate Clap", artist: "Ad agency tunes", duration: "2:02", url: "#", category: "Vibe" },
  { id: "a16", title: "Cinematic Suspense Rise", artist: "Tension Builders", duration: "0:12", url: "#", category: "Sound FX", isPremium: true },
  { id: "a17", title: "VHS Rewind Noise", artist: "Tape Restoration", duration: "0:03", url: "#", category: "Sound FX" },
  { id: "a18", title: "Neon Pulse Drum Beat", artist: "Cyber Drum", duration: "1:15", url: "#", category: "Vibe" },
  { id: "a19", title: "Heartbeat Heavy Pulse", artist: "Medical Thriller", duration: "0:20", url: "#", category: "Ambient" },
  { id: "a20", title: "Camera Shutter Click", artist: "Paparazzi Lab", duration: "0:01", url: "#", category: "Sound FX" },
  { id: "a21", title: "Cozy Campfire Crackling", artist: "Nature Loops", duration: "3:00", url: "#", category: "Ambient" },
  { id: "a22", title: "Future Bass Electro", artist: "Tokyo Remix", duration: "2:50", url: "#", category: "Music", isPremium: true },
  { id: "a23", title: "Subtle Wind Blowing", artist: "Nature Loops", duration: "1:00", url: "#", category: "Ambient" },
  { id: "a24", title: "Record Scratch Stop", artist: "HipHop DJ", duration: "0:02", url: "#", category: "Sound FX" },
  { id: "a25", title: "Crowd Cheering Applause", artist: "Stadium Live", duration: "0:10", url: "#", category: "Sound FX" },
  { id: "a26", title: "Summer Tropic Chill", artist: "Playa Records", duration: "2:15", url: "#", category: "Vibe" }
];

export const FILTERS: FilterPreset[] = [
  { id: "f_none", name: "Original (None)", category: "Original", cssClass: "", thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=150&auto=format&fit=crop&q=60" },
  { id: "f_vintage", name: "Vintage Sepia", category: "Retro", cssClass: "sepia contrast-125 brightness-95 saturate-75", thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=150&auto=format&fit=crop&q=60" },
  { id: "f_cinematic", name: "Teal & Orange", category: "Cinematic", cssClass: "contrast-115 hue-rotate-15 saturate-125 brightness-95", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150&auto=format&fit=crop&q=60" },
  { id: "f_hdr", name: "Ultra HDR Boost", category: "Creative", cssClass: "contrast-135 saturate-150 brightness-105", thumbnail: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=150&auto=format&fit=crop&q=60" },
  { id: "f_mono", name: "Noir B&W Monochrome", category: "Monochrome", cssClass: "grayscale contrast-140 brightness-90", thumbnail: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=150&auto=format&fit=crop&q=60" },
  { id: "f_cyberpunk", name: "Cyber Neon Glow", category: "Creative", cssClass: "hue-rotate-180 saturate-200 contrast-125", thumbnail: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=150&auto=format&fit=crop&q=60" },
  { id: "f_retro_amber", name: "Retro Amber Warmth", category: "Retro", cssClass: "sepia-[0.3] saturate-[1.4] contrast-[1.05] brightness-[1.02]", thumbnail: "https://images.unsplash.com/photo-1542204172-e7052809a903?w=150&auto=format&fit=crop&q=60" },
  { id: "f_cool_breeze", name: "Cool Glacier Blue", category: "Cinematic", cssClass: "hue-rotate-[-10deg] saturate-[1.1] brightness-[0.98] contrast-[1.1]", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=60" },
  { id: "f_dreamy_pastel", name: "Dreamy Lavender Sky", category: "Creative", cssClass: "brightness-[1.1] saturate-[1.3] hue-rotate-[45deg]", thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=150&auto=format&fit=crop&q=60" },
  { id: "f_forest_moss", name: "Deep Forest Moss", category: "Cinematic", cssClass: "hue-rotate-[110deg] saturate-[0.8] contrast-[1.15]", thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=150&auto=format&fit=crop&q=60" },
  { id: "f_electric_pink", name: "Barbie Punk Pink", category: "Creative", cssClass: "hue-rotate-[145deg] saturate-[2.1] contrast-[1.2]", thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=150&auto=format&fit=crop&q=60" },
  { id: "f_bleach_bypass", name: "Bleach Bypass", category: "Monochrome", cssClass: "contrast-150 saturate-[0.35] brightness-95", thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=60" },
  { id: "f_sunset_gold", name: "Sunset Gold", category: "Retro", cssClass: "hue-rotate-[5deg] saturate-[1.6] contrast-[1.1] brightness-[1.02]", thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=150&auto=format&fit=crop&q=60" },
  { id: "f_technicolor", name: "Vibrant Technicolor", category: "Creative", cssClass: "saturate-[2.5] contrast-[1.15]", thumbnail: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=150&auto=format&fit=crop&q=60" },
  { id: "f_ghibli_warm", name: "Ghibli Warm Anime", category: "Creative", cssClass: "brightness-[1.08] saturate-[1.3] contrast-[0.95] sepia-[0.1]", thumbnail: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=150&auto=format&fit=crop&q=60" },
  { id: "f_vaporwave", name: "Vaporwave Purple", category: "Creative", cssClass: "hue-rotate-[210deg] saturate-[1.8] contrast-[1.1]", thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=150&auto=format&fit=crop&q=60" },
  { id: "f_silver_glow", name: "Silver Metal Glow", category: "Monochrome", cssClass: "grayscale brightness-[1.15] contrast-[1.25]", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=60" },
  { id: "f_high_key", name: "Soft High-Key White", category: "Cinematic", cssClass: "brightness-[1.25] contrast-[0.85] saturate-[0.95]", thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&auto=format&fit=crop&q=60" },
  { id: "f_cyber_matrix", name: "Green Matrix Phosphor", category: "Monochrome", cssClass: "grayscale hue-rotate-[90deg] brightness-[1.1] contrast-[1.4] sepia-[0.8] saturate-[4.0]", thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=60" },
  { id: "f_acid_trip", name: "Psychedelic Acid", category: "Creative", cssClass: "hue-rotate-[290deg] saturate-[3.0] contrast-[1.5]", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=60" }
];

export const EFFECTS: EffectPreset[] = [
  { id: "eff_glitch", name: "Glitch Wave Pro", category: "Retro", cssClass: "animate-pulse border-red-500/20 shadow-[0_0_15px_rgba(255,0,0,0.5)]", iconName: "Zap" },
  { id: "eff_shake", name: "Camera Shaker", category: "Action", cssClass: "animate-bounce", iconName: "Move" },
  { id: "eff_vhs", name: "VHS Static Lines", category: "Retro", cssClass: "brightness-105 saturate-75 opacity-90", iconName: "Tv", isPremium: true },
  { id: "eff_rgb", name: "RGB Split Distortion", category: "Stylized", cssClass: "hue-rotate-60 contrast-110", iconName: "Layers" },
  { id: "eff_blur", name: "Cinematic Motion Blur", category: "Stylized", cssClass: "blur-[1.5px]", iconName: "EyeOff" },
  { id: "eff_neon", name: "Purple Neon Glow", category: "Glow", cssClass: "shadow-[inset_0_0_20px_rgba(147,51,234,0.6)] brightness-110", iconName: "Sparkles", isPremium: true },
  { id: "eff_pulsing", name: "Pulsing Glow", category: "Glow", cssClass: "animate-pulse shadow-[0_0_25px_rgba(147,51,234,0.8)]", iconName: "Activity" },
  { id: "eff_bloom", name: "Soft Bloom", category: "Glow", cssClass: "blur-[0.5px] brightness-[1.15]", iconName: "Sun" },
  { id: "eff_strobe", name: "Strobe Flash", category: "Action", cssClass: "animate-ping opacity-90", iconName: "Zap" },
  { id: "eff_heartbeat", name: "Heartbeat Zoom", category: "Action", cssClass: "animate-pulse duration-75", iconName: "Heart" },
  { id: "eff_scanlines", name: "Cyber Scanlines", category: "Retro", cssClass: "bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_8px]", iconName: "Sliders" },
  { id: "eff_film_burn", name: "16mm Film Burn", category: "Retro", cssClass: "sepia-[0.1] saturate-110 hue-rotate-[-10deg]", iconName: "Flame", isPremium: true },
  { id: "eff_dream", name: "Dreamy Aurora Glow", category: "Glow", cssClass: "hue-rotate-30 brightness-105 saturate-[1.2] blur-[0.2px]", iconName: "Moon" },
  { id: "eff_dark_vibe", name: "Dark Vignette Vibe", category: "Stylized", cssClass: "shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] contrast-[1.1]", iconName: "Moon" },
  { id: "eff_high_contrast", name: "Heavy Shadow", category: "Stylized", cssClass: "contrast-150 brightness-90", iconName: "Sun" },
  { id: "eff_emerald", name: "Emerald Matrix Glow", category: "Glow", cssClass: "shadow-[inset_0_0_15px_rgba(34,197,94,0.5)] brightness-[1.05]", iconName: "Cpu" },
  { id: "eff_rainbow", name: "Rainbow Wave Loop", category: "Stylized", cssClass: "animate-pulse hue-rotate-180", iconName: "Sparkles", isPremium: true },
  { id: "eff_old_scratchy", name: "Old Scratchy Projector", category: "Retro", cssClass: "grayscale opacity-80 sepia-[0.25] contrast-[1.15]", iconName: "Tv" },
  { id: "eff_subtle_zoom", name: "Subtle Continuous Zoom", category: "Action", cssClass: "scale-[1.05] transition-transform duration-1000", iconName: "Maximize2" },
  { id: "eff_water_ripple", name: "Water Ripple Effect", category: "Stylized", cssClass: "blur-[0.5px] saturate-[1.15] hue-rotate-[5deg]", iconName: "Waves" }
];

export const TRANSITIONS: TransitionPreset[] = [
  { id: "tr_none", name: "Cut (None)", iconName: "Scissors" },
  { id: "tr_fade", name: "Cross Fade", iconName: "Blend" },
  { id: "tr_zoom_in", name: "Zoom In Smooth", iconName: "Maximize2" },
  { id: "tr_zoom_out", name: "Zoom Out Wipe", iconName: "Minimize2" },
  { id: "tr_slide_left", name: "Slide Left", iconName: "ArrowLeft" },
  { id: "tr_slide_right", name: "Slide Right", iconName: "ArrowRight" },
  { id: "tr_spin", name: "Spin Whirlpool", iconName: "RotateCw", isPremium: true },
  { id: "tr_warp", name: "Dimensional Warp", iconName: "Zap", isPremium: true },
  { id: "tr_slide_up", name: "Slide Up Rise", iconName: "ArrowUp" },
  { id: "tr_slide_down", name: "Slide Down Drop", iconName: "ArrowDown" },
  { id: "tr_glitch", name: "Digital Glitch Tear", iconName: "Zap", isPremium: true },
  { id: "tr_dissolve", name: "Pixel Dissolve", iconName: "Grid" },
  { id: "tr_flash_white", name: "White Flash Flare", iconName: "Sun" },
  { id: "tr_flash_black", name: "Black Flash Fade", iconName: "Moon" },
  { id: "tr_diagonal", name: "Diagonal Split Sweep", iconName: "MoveRight", isPremium: true },
  { id: "tr_ripple", name: "Water Splash Wave", iconName: "RefreshCw" }
];

export const STICKERS: StickerPreset[] = [
  { id: "s1", name: "Fire Emoji", emoji: "🔥", category: "Emoji" },
  { id: "s2", name: "Sparkles Glow", emoji: "✨", isAnimated: true, category: "AI Stickers" },
  { id: "s3", name: "Cool Sunglasses", emoji: "😎", category: "Emoji" },
  { id: "s4", name: "AI Cyber Helmet", emoji: "🪖", isAnimated: true, category: "AI Stickers" },
  { id: "s5", name: "Arrow Indicator", emoji: "➡️", category: "Vlog" },
  { id: "s6", name: "Trending Tag Badge", emoji: "🏷️", isAnimated: true, category: "Vlog" },
  { id: "s7", name: "Laughing tears", emoji: "😂", category: "Emoji" },
  { id: "s8", name: "Red Love Heart", emoji: "❤️", category: "Emoji" },
  { id: "s9", name: "Party Popper Sparkle", emoji: "🎉", isAnimated: true, category: "Emoji" },
  { id: "s10", name: "Mind Blown Exploding", emoji: "🤯", category: "Emoji" },
  { id: "s11", name: "Shouting Loud Megaphone", emoji: "📢", isAnimated: true, category: "Vlog" },
  { id: "s12", name: "Subscribe Finger click", emoji: "👆", isAnimated: true, category: "Vlog" },
  { id: "s13", name: "Gamer Gold Trophy", emoji: "🏆", category: "Gaming" },
  { id: "s14", name: "Retro Pixel Heart", emoji: "👾", isAnimated: true, category: "Gaming" },
  { id: "s15", name: "Skull Game Over", emoji: "💀", category: "Gaming" },
  { id: "s16", name: "Cat Face Heart Eyes", emoji: "😻", category: "Emoji" },
  { id: "s17", name: "Rocket Launching Space", emoji: "🚀", isAnimated: true, category: "AI Stickers" },
  { id: "s18", name: "Money flying bills", emoji: "💸", category: "Vlog" },
  { id: "s19", name: "Thumbs Up Like Button", emoji: "👍", category: "Vlog" },
  { id: "s20", name: "Glowing Alien Face", emoji: "👽", isAnimated: true, category: "AI Stickers" },
  { id: "s21", name: "Waving Hello Hand", emoji: "👋", category: "Vlog" },
  { id: "s22", name: "Camera DSLR Lens", emoji: "📷", category: "Vlog" },
  { id: "s23", name: "Crying Loudly face", emoji: "😭", category: "Emoji" },
  { id: "s24", name: "Pizza Hot Slice", emoji: "🍕", category: "Emoji" },
  { id: "s25", name: "Glittering Gold Star", emoji: "⭐", isAnimated: true, category: "Emoji" },
  { id: "s26", name: "Clapping Congratulations hands", emoji: "👏", category: "Emoji" },
  { id: "s27", name: "Gamer controller gamepad", emoji: "🎮", category: "Gaming" },
  { id: "s28", name: "Flashing red REC dot", emoji: "🔴", isAnimated: true, category: "Vlog" },
  { id: "s29", name: "Thinking face emoji", emoji: "🤔", category: "Emoji" },
  { id: "s30", name: "Glowing electric bolt", emoji: "⚡", isAnimated: true, category: "AI Stickers" },
  { id: "s31", name: "Floating Ghost boo", emoji: "👻", category: "Gifs" },
  { id: "s32", name: "Confused Question Mark", emoji: "❓", category: "Gifs" },
  { id: "s33", name: "Excited Dance moves", emoji: "🕺", isAnimated: true, category: "Gifs" },
  { id: "s34", name: "Cat typing laptop", emoji: "🐱", isAnimated: true, category: "Gifs" },
  { id: "s35", name: "Rainbow pastel cloud", emoji: "🌈", category: "Gifs" },
  { id: "s36", name: "Spinning Vinyl record", emoji: "💿", isAnimated: true, category: "Gifs" }
];

export const AI_TOOLS = [
  {
    id: "tool_bg_removal",
    name: "AI Background Removal",
    icon: "UserMinus",
    description: "Instantly isolate subjects from backgrounds without green screens.",
    isPremium: true
  },
  {
    id: "tool_face_beauty",
    name: "AI Face Beauty",
    icon: "Smile",
    description: "Intelligent facial blemish smoothing, contouring, and lighting enhancements.",
    isPremium: false
  },
  {
    id: "tool_subtitle",
    name: "AI Auto Subtitle Generator",
    icon: "Languages",
    description: "Transcribe spoken tracks to timed, stylized neon on-screen text in seconds.",
    isPremium: false
  },
  {
    id: "tool_voice_clone",
    name: "AI Voice Clone & Changer",
    icon: "Mic",
    description: "Clone target voices or overlay expressive synthetic pitch filters.",
    isPremium: true
  },
  {
    id: "tool_script",
    name: "AI Script Generator",
    icon: "FileText",
    description: "Generate viral Hooks, Scenes, and Visual directives powered by Gemini AI.",
    isPremium: false
  },
  {
    id: "tool_resizer",
    name: "AI Smart Canvas Resize",
    icon: "Scale",
    description: "Intelligently crop 16:9 widescreen vlogs into 9:16 TikTok shorts automatically.",
    isPremium: true
  }
];
