export type AspectRatioType = "16:9" | "9:16" | "1:1" | "4:3";

export type TrackType = "video" | "audio" | "text" | "effect" | "sticker";

export interface TextSettings {
  text: string;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  gradientEnabled: boolean;
  gradientColors: [string, string];
  shadowEnabled: boolean;
  outlineEnabled: boolean;
  outlineColor: string;
  outlineWidth: number;
  animationIn: "none" | "fade" | "slide" | "zoom" | "typewriter";
  animationOut: "none" | "fade" | "slide" | "zoom";
}

export interface AudioSettings {
  volume: number; // 0 - 100
  noiseReduction: boolean;
  fadeInSec: number;
  fadeOutSec: number;
}

export interface ChromaKeySettings {
  enabled: boolean;
  targetColor: string; // hex
  spillSuppression: number; // 0 - 100
  edgeRefinement: number; // 0 - 100
}

export interface Keyframe {
  timeSec: number;
  positionX: number; // offset %
  positionY: number; // offset %
  scale: number; // % (e.g. 100)
  rotation: number; // degrees
  opacity: number; // 0 - 100
}

export interface Clip {
  id: string;
  trackId: string;
  name: string;
  type: TrackType;
  startSec: number; // where it starts on the absolute timeline
  durationSec: number; // length of the clip
  sourceDurationSec: number; // full duration of raw asset
  speed: number; // 0.1x to 10.0x
  thumbnailUrl?: string;
  videoUrl?: string; // or mock video color/animation pattern
  // Features
  filterId?: string; // vintage, cinematic, etc.
  effectId?: string; // glitch, shake, rgb, vhs, sparkles
  transitionId?: string; // transition to next clip (fade, zoom, slide, spin, etc.)
  stickers?: string[]; // list of stickers
  textSettings?: TextSettings;
  audioSettings?: AudioSettings;
  chromaKeySettings?: ChromaKeySettings;
  keyframes?: Keyframe[];
}

export interface Track {
  id: string;
  name: string;
  type: TrackType;
  clips: Clip[];
}

export interface Project {
  id: string;
  name: string;
  aspectRatio: AspectRatioType;
  lastModified: number;
  durationSec: number;
  tracks: Track[];
}

export interface Template {
  id: string;
  name: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration: string;
  useCount: string;
  category: string;
  isPremium?: boolean;
}

export interface AudioAsset {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url: string;
  category: string;
  isPremium?: boolean;
}

export interface FilterPreset {
  id: string;
  name: string;
  category: string;
  cssClass: string;
  thumbnail: string;
}

export interface EffectPreset {
  id: string;
  name: string;
  category: string;
  cssClass: string;
  iconName: string;
  isPremium?: boolean;
}

export interface TransitionPreset {
  id: string;
  name: string;
  iconName: string;
  isPremium?: boolean;
}

export interface StickerPreset {
  id: string;
  name: string;
  emoji: string;
  isAnimated?: boolean;
  category: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  username: string;
  isPremium: boolean;
  credits: number;
  isGuest: boolean;
}
