import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  Project,
  Track,
  Clip,
  UserProfile,
  AspectRatioType,
  TrackType,
  TextSettings,
  AudioSettings,
  ChromaKeySettings,
  Keyframe
} from "../types";

interface ProjectContextProps {
  // Auth & Profile
  user: UserProfile;
  loginGuest: () => void;
  loginUser: (email: string) => void;
  logout: () => void;
  togglePremium: () => void;
  addCredits: (amount: number) => void;
  consumeCredits: (amount: number) => boolean;

  // Project Lists
  projects: Project[];
  activeProject: Project | null;
  setActiveProject: (p: Project) => void;
  createNewProject: (name: string, ratio: AspectRatioType) => Project;
  deleteProject: (id: string) => void;
  renameProject: (id: string, newName: string) => void;

  // Editor Actions
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTime: number; // in seconds
  setCurrentTime: (time: number) => void;
  zoomLevel: number; // pixels per second
  setZoomLevel: (z: number) => void;
  selectedClip: Clip | null;
  setSelectedClip: (c: Clip | null) => void;

  // Clip Manipulations
  addClip: (trackType: TrackType, preset?: any) => void;
  deleteClip: (clipId: string) => void;
  updateClipDuration: (clipId: string, newDuration: number) => void;
  updateClipPosition: (clipId: string, newStart: number) => void;
  updateClipSpeed: (clipId: string, speed: number) => void;
  duplicateClip: (clipId: string) => void;
  splitClipAtCurrentTime: (clipId: string) => void;
  updateClipTextSettings: (clipId: string, settings: Partial<TextSettings>) => void;
  updateClipAudioSettings: (clipId: string, settings: Partial<AudioSettings>) => void;
  updateClipChromaKeySettings: (clipId: string, settings: Partial<ChromaKeySettings>) => void;
  updateClipFilter: (clipId: string, filterId: string) => void;
  updateClipEffect: (clipId: string, effectId: string) => void;
  updateClipTransition: (clipId: string, transitionId: string) => void;
  addClipKeyframe: (clipId: string, kf: Keyframe) => void;
  removeClipKeyframe: (clipId: string, timeSec: number) => void;

  // AI & Export Operations
  isGeneratingAI: boolean;
  setGeneratingAI: (b: boolean) => void;
  autoCaptions: Array<{ start: number; end: number; text: string }> | null;
  setAutoCaptions: (c: Array<{ start: number; end: number; text: string }> | null) => void;

  // Admin / General Dashboard
  adminLogs: string[];
  addAdminLog: (msg: string) => void;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  id: "u_guest",
  username: "Guest Editor",
  isPremium: false,
  credits: 5,
  isGuest: true
};

// Seed initial tracks for demonstration
const createInitialTracks = (ratio: AspectRatioType): Track[] => {
  const videoTrackId = "track_v1";
  const audioTrackId = "track_a1";
  const textTrackId = "track_t1";
  const effectTrackId = "track_e1";
  const stickerTrackId = "track_s1";

  const videoClips: Clip[] = [
    {
      id: "clip_v1",
      trackId: videoTrackId,
      name: "Cyber Neon Tokyo Street",
      type: "video",
      startSec: 0,
      durationSec: 6,
      sourceDurationSec: 10,
      speed: 1.0,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-neon-light-signs-of-tokyo-at-night-42468-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&auto=format&fit=crop&q=60",
      filterId: "f_cyberpunk",
      chromaKeySettings: { enabled: false, targetColor: "#00ff00", spillSuppression: 50, edgeRefinement: 50 }
    },
    {
      id: "clip_v2",
      trackId: videoTrackId,
      name: "Iceland Sunset Drone",
      type: "video",
      startSec: 6,
      durationSec: 6,
      sourceDurationSec: 15,
      speed: 1.0,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-sunset-over-cliffs-41793-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&auto=format&fit=crop&q=60",
      filterId: "f_cinematic",
      transitionId: "tr_fade"
    },
    {
      id: "clip_v3",
      trackId: videoTrackId,
      name: "Retro Roller-Skater",
      type: "video",
      startSec: 12,
      durationSec: 6,
      sourceDurationSec: 8,
      speed: 1.0,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-roller-skating-on-a-sunny-day-42353-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1542204172-e7052809a903?w=300&auto=format&fit=crop&q=60",
      filterId: "f_vintage"
    }
  ];

  const audioClips: Clip[] = [
    {
      id: "clip_aud1",
      trackId: audioTrackId,
      name: "Synthwave Horizon Theme",
      type: "audio",
      startSec: 0,
      durationSec: 18,
      sourceDurationSec: 165,
      speed: 1.0,
      audioSettings: { volume: 75, noiseReduction: true, fadeInSec: 1.5, fadeOutSec: 2.0 }
    }
  ];

  const textClips: Clip[] = [
    {
      id: "clip_txt1",
      trackId: textTrackId,
      name: "Title Text",
      type: "text",
      startSec: 1,
      durationSec: 4.5,
      sourceDurationSec: 10,
      speed: 1.0,
      textSettings: {
        text: "TOKYO CRUISE",
        fontFamily: "Space Grotesk",
        fontSize: 38,
        textColor: "#a855f7",
        backgroundColor: "transparent",
        gradientEnabled: true,
        gradientColors: ["#a855f7", "#3b82f6"],
        shadowEnabled: true,
        outlineEnabled: true,
        outlineColor: "#ffffff",
        outlineWidth: 2,
        animationIn: "typewriter",
        animationOut: "fade"
      }
    },
    {
      id: "clip_txt2",
      trackId: textTrackId,
      name: "Caption Subtitle",
      type: "text",
      startSec: 7,
      durationSec: 4,
      sourceDurationSec: 10,
      speed: 1.0,
      textSettings: {
        text: "Chasing the Golden Hour...",
        fontFamily: "Inter",
        fontSize: 24,
        textColor: "#ffffff",
        backgroundColor: "rgba(0,0,0,0.5)",
        gradientEnabled: false,
        gradientColors: ["#fff", "#ccc"],
        shadowEnabled: true,
        outlineEnabled: false,
        outlineColor: "#000000",
        outlineWidth: 1,
        animationIn: "fade",
        animationOut: "zoom"
      }
    }
  ];

  const effectClips: Clip[] = [
    {
      id: "clip_eff1",
      trackId: effectTrackId,
      name: "Glitch wave overlay",
      type: "effect",
      startSec: 0,
      durationSec: 3.5,
      sourceDurationSec: 10,
      speed: 1.0,
      effectId: "eff_glitch"
    }
  ];

  const stickerClips: Clip[] = [
    {
      id: "clip_st1",
      trackId: stickerTrackId,
      name: "Animated Sparkles",
      type: "sticker",
      startSec: 3,
      durationSec: 5,
      sourceDurationSec: 10,
      speed: 1.0,
      stickers: ["✨"]
    }
  ];

  return [
    { id: videoTrackId, name: "Video Layer", type: "video", clips: videoClips },
    { id: audioTrackId, name: "Audio Track", type: "audio", clips: audioClips },
    { id: textTrackId, name: "Text Overlays", type: "text", clips: textClips },
    { id: effectTrackId, name: "Video Effects", type: "effect", clips: effectClips },
    { id: stickerTrackId, name: "Stickers & Badges", type: "sticker", clips: stickerClips }
  ];
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("clippro_user");
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  // Load projects list
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("clippro_projects");
    if (saved) {
      return JSON.parse(saved);
    }
    const initialProject: Project = {
      id: "proj_demo",
      name: "Tokyo Neon Cruise Vlog",
      aspectRatio: "16:9",
      lastModified: Date.now(),
      durationSec: 18,
      tracks: createInitialTracks("16:9")
    };
    return [initialProject];
  });

  const [activeProject, setActiveProjectState] = useState<Project | null>(null);

  // Editor timeline properties
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(30); // pixels per second
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);

  // AI States
  const [isGeneratingAI, setGeneratingAI] = useState<boolean>(false);
  const [autoCaptions, setAutoCaptions] = useState<Array<{ start: number; end: number; text: string }> | null>(null);

  // Admin Logs
  const [adminLogs, setAdminLogs] = useState<string[]>([
    "ClipPro AI server metrics loaded.",
    "Database security rules initialized.",
    "FFmpeg background transcoders operational."
  ]);

  const addAdminLog = (msg: string) => {
    setAdminLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 49)]);
  };

  // Sync user changes to localStorage
  useEffect(() => {
    localStorage.setItem("clippro_user", JSON.stringify(user));
  }, [user]);

  // Sync projects list to localStorage
  useEffect(() => {
    localStorage.setItem("clippro_projects", JSON.stringify(projects));
  }, [projects]);

  // Set default active project if none selected
  useEffect(() => {
    if (projects.length > 0 && !activeProject) {
      setActiveProjectState(projects[0]);
    }
  }, [projects, activeProject]);

  // Playhead logic running timer
  const playTimerRef = useRef<any>(null);
  useEffect(() => {
    if (isPlaying && activeProject) {
      playTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1;
          const maxDur = activeProject.durationSec || 20;
          if (next >= maxDur) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 100);
    } else {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    }
    return () => clearInterval(playTimerRef.current);
  }, [isPlaying, activeProject]);

  const loginGuest = () => {
    setUser({
      id: "u_guest_" + Math.random().toString(36).substr(2, 5),
      username: "Guest Editor",
      isPremium: false,
      credits: 5,
      isGuest: true
    });
    addAdminLog("Guest editor logged in.");
  };

  const loginUser = (email: string) => {
    const name = email.split("@")[0];
    setUser({
      id: "u_verified_" + Math.random().toString(36).substr(2, 5),
      email,
      username: name.charAt(0).toUpperCase() + name.slice(1),
      isPremium: true,
      credits: 50,
      isGuest: false
    });
    addAdminLog(`Registered user ${email} authorized via Firebase Auth simulation.`);
  };

  const logout = () => {
    setUser(DEFAULT_USER);
    setSelectedClip(null);
    setIsPlaying(false);
    setCurrentTime(0);
    addAdminLog("Active user signed out.");
  };

  const togglePremium = () => {
    setUser((prev) => ({
      ...prev,
      isPremium: !prev.isPremium,
      credits: prev.isPremium ? prev.credits : prev.credits + 200
    }));
    addAdminLog(`Premium subscription status modified to: ${!user.isPremium}`);
  };

  const addCredits = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      credits: prev.credits + amount
    }));
    addAdminLog(`Admin added ${amount} AI credits to user profile.`);
  };

  const consumeCredits = (amount: number): boolean => {
    if (user.isPremium) return true; // premium gets infinite credits
    if (user.credits >= amount) {
      setUser((prev) => ({ ...prev, credits: prev.credits - amount }));
      return true;
    }
    return false;
  };

  const setActiveProject = (p: Project) => {
    setActiveProjectState(p);
    setCurrentTime(0);
    setSelectedClip(null);
    setIsPlaying(false);
  };

  const createNewProject = (name: string, ratio: AspectRatioType): Project => {
    const id = "proj_" + Date.now();
    const newProj: Project = {
      id,
      name: name || `Project #${projects.length + 1}`,
      aspectRatio: ratio,
      lastModified: Date.now(),
      durationSec: 15,
      tracks: createInitialTracks(ratio)
    };
    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectState(newProj);
    addAdminLog(`Created new project workspace "${newProj.name}" with canvas aspect ${ratio}`);
    return newProj;
  };

  const deleteProject = (id: string) => {
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
    addAdminLog(`Deleted project workspace ID ${id}.`);
    if (activeProject?.id === id) {
      setActiveProjectState(filtered[0] || null);
    }
  };

  const renameProject = (id: string, newName: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, name: newName, lastModified: Date.now() };
        }
        return p;
      })
    );
    if (activeProject?.id === id) {
      setActiveProjectState((prev) => prev ? { ...prev, name: newName } : null);
    }
    addAdminLog(`Renamed project ID ${id} to "${newName}".`);
  };

  // Helper to update tracks in active project
  const updateActiveProjectTracks = (updatedTracks: Track[]) => {
    if (!activeProject) return;

    // Recalculate total duration based on clips boundaries
    let maxTime = 10;
    updatedTracks.forEach((t) => {
      t.clips.forEach((c) => {
        const clipEnd = c.startSec + c.durationSec;
        if (clipEnd > maxTime) {
          maxTime = clipEnd;
        }
      });
    });

    const updatedProj: Project = {
      ...activeProject,
      tracks: updatedTracks,
      durationSec: parseFloat(maxTime.toFixed(1)),
      lastModified: Date.now()
    };

    setActiveProjectState(updatedProj);
    setProjects((prev) => prev.map((p) => (p.id === activeProject.id ? updatedProj : p)));
  };

  // Clip Operations
  const addClip = (trackType: TrackType, preset?: any) => {
    if (!activeProject) return;

    const track = activeProject.tracks.find((t) => t.type === trackType);
    if (!track) return;

    const clipId = `clip_${trackType}_${Date.now()}`;
    const newClip: Clip = {
      id: clipId,
      trackId: track.id,
      name: preset?.name || `New ${trackType.charAt(0).toUpperCase() + trackType.slice(1)} Clip`,
      type: trackType,
      startSec: currentTime,
      durationSec: preset?.durationSec || 5,
      sourceDurationSec: preset?.sourceDurationSec || 10,
      speed: 1.0,
      videoUrl: preset?.videoUrl,
      thumbnailUrl: preset?.thumbnailUrl || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&auto=format&fit=crop&q=60",
      filterId: preset?.filterId || "",
      effectId: preset?.effectId || "",
      transitionId: preset?.transitionId || "",
      stickers: preset?.stickers || []
    };

    if (trackType === "text") {
      newClip.textSettings = {
        text: preset?.textSettings?.text || "Double Click to Edit Text",
        fontFamily: preset?.textSettings?.fontFamily || "Inter",
        fontSize: preset?.textSettings?.fontSize || 24,
        textColor: preset?.textSettings?.textColor || "#ffffff",
        backgroundColor: preset?.textSettings?.backgroundColor || "transparent",
        gradientEnabled: preset?.textSettings?.gradientEnabled || false,
        gradientColors: preset?.textSettings?.gradientColors || ["#a855f7", "#3b82f6"],
        shadowEnabled: preset?.textSettings?.shadowEnabled || false,
        outlineEnabled: preset?.textSettings?.outlineEnabled || false,
        outlineColor: preset?.textSettings?.outlineColor || "#000000",
        outlineWidth: preset?.textSettings?.outlineWidth || 1,
        animationIn: preset?.textSettings?.animationIn || "fade",
        animationOut: preset?.textSettings?.animationOut || "fade"
      };
    }

    if (trackType === "audio") {
      newClip.audioSettings = {
        volume: preset?.audioSettings?.volume || 80,
        noiseReduction: preset?.audioSettings?.noiseReduction || false,
        fadeInSec: preset?.audioSettings?.fadeInSec || 0.5,
        fadeOutSec: preset?.audioSettings?.fadeOutSec || 0.5
      };
    }

    const updatedTracks = activeProject.tracks.map((t) => {
      if (t.id === track.id) {
        return { ...t, clips: [...t.clips, newClip] };
      }
      return t;
    });

    updateActiveProjectTracks(updatedTracks);
    setSelectedClip(newClip);
    addAdminLog(`Added new ${trackType} clip: "${newClip.name}" to timeline at ${currentTime.toFixed(1)}s`);
  };

  const deleteClip = (clipId: string) => {
    if (!activeProject) return;

    let targetName = "";
    const updatedTracks = activeProject.tracks.map((t) => {
      const target = t.clips.find((c) => c.id === clipId);
      if (target) targetName = target.name;
      return {
        ...t,
        clips: t.clips.filter((c) => c.id !== clipId)
      };
    });

    updateActiveProjectTracks(updatedTracks);
    if (selectedClip?.id === clipId) {
      setSelectedClip(null);
    }
    if (targetName) {
      addAdminLog(`Deleted clip "${targetName}" from timeline.`);
    }
  };

  const updateClipDuration = (clipId: string, newDuration: number) => {
    if (!activeProject || newDuration <= 0.1) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId) {
          const updated = { ...c, durationSec: parseFloat(newDuration.toFixed(1)) };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
  };

  const updateClipPosition = (clipId: string, newStart: number) => {
    if (!activeProject || newStart < 0) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId) {
          const updated = { ...c, startSec: parseFloat(newStart.toFixed(1)) };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
  };

  const updateClipSpeed = (clipId: string, speed: number) => {
    if (!activeProject || speed < 0.1 || speed > 10) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId) {
          // Adjust duration relative to speed difference
          const ratio = c.speed / speed;
          const updated = {
            ...c,
            speed,
            durationSec: parseFloat((c.durationSec * ratio).toFixed(1))
          };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
    addAdminLog(`Altered clip ID ${clipId} playback speed to ${speed}x.`);
  };

  const duplicateClip = (clipId: string) => {
    if (!activeProject) return;

    let duplicated: Clip | null = null;
    const updatedTracks = activeProject.tracks.map((t) => {
      const target = t.clips.find((c) => c.id === clipId);
      if (target) {
        duplicated = {
          ...target,
          id: `${target.id}_copy_${Date.now()}`,
          startSec: target.startSec + target.durationSec // place immediately after
        };
        return { ...t, clips: [...t.clips, duplicated] };
      }
      return t;
    });

    if (duplicated) {
      updateActiveProjectTracks(updatedTracks);
      setSelectedClip(duplicated);
      addAdminLog(`Duplicated clip "${(duplicated as Clip).name}" onto track.`);
    }
  };

  const splitClipAtCurrentTime = (clipId: string) => {
    if (!activeProject) return;

    let firstHalf: Clip | null = null;
    let secondHalf: Clip | null = null;

    const updatedTracks = activeProject.tracks.map((t) => {
      const target = t.clips.find((c) => c.id === clipId);
      if (target && currentTime > target.startSec && currentTime < (target.startSec + target.durationSec)) {
        const firstHalfDuration = currentTime - target.startSec;
        const secondHalfDuration = target.durationSec - firstHalfDuration;

        firstHalf = {
          ...target,
          durationSec: parseFloat(firstHalfDuration.toFixed(1))
        };

        secondHalf = {
          ...target,
          id: `${target.id}_split_${Date.now()}`,
          startSec: parseFloat(currentTime.toFixed(1)),
          durationSec: parseFloat(secondHalfDuration.toFixed(1))
        };

        const filteredClips = t.clips.filter((c) => c.id !== clipId);
        return {
          ...t,
          clips: [...filteredClips, firstHalf, secondHalf]
        };
      }
      return t;
    });

    if (firstHalf && secondHalf) {
      updateActiveProjectTracks(updatedTracks);
      setSelectedClip(secondHalf);
      addAdminLog(`Split clip "${(firstHalf as Clip).name}" at timeline bookmark ${currentTime.toFixed(1)}s.`);
    }
  };

  const updateClipTextSettings = (clipId: string, settings: Partial<TextSettings>) => {
    if (!activeProject) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId && c.textSettings) {
          const updated = {
            ...c,
            textSettings: { ...c.textSettings, ...settings }
          };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
  };

  const updateClipAudioSettings = (clipId: string, settings: Partial<AudioSettings>) => {
    if (!activeProject) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId && c.audioSettings) {
          const updated = {
            ...c,
            audioSettings: { ...c.audioSettings, ...settings }
          };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
  };

  const updateClipChromaKeySettings = (clipId: string, settings: Partial<ChromaKeySettings>) => {
    if (!activeProject) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId) {
          const currentChroma = c.chromaKeySettings || {
            enabled: false,
            targetColor: "#00ff00",
            spillSuppression: 50,
            edgeRefinement: 50
          };
          const updated = {
            ...c,
            chromaKeySettings: { ...currentChroma, ...settings }
          };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
  };

  const updateClipFilter = (clipId: string, filterId: string) => {
    if (!activeProject) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId) {
          const updated = { ...c, filterId };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
    addAdminLog(`Filter overlay changed for clip ID ${clipId} to: ${filterId || "None"}.`);
  };

  const updateClipEffect = (clipId: string, effectId: string) => {
    if (!activeProject) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId) {
          const updated = { ...c, effectId };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
    addAdminLog(`Render effect changed for clip ID ${clipId} to: ${effectId || "None"}.`);
  };

  const updateClipTransition = (clipId: string, transitionId: string) => {
    if (!activeProject) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId) {
          const updated = { ...c, transitionId };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
    addAdminLog(`Transition changed for clip ID ${clipId} to: ${transitionId || "None"}.`);
  };

  const addClipKeyframe = (clipId: string, kf: Keyframe) => {
    if (!activeProject) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId) {
          const currentKfs = c.keyframes || [];
          const filtered = currentKfs.filter((k) => k.timeSec !== kf.timeSec);
          const sorted = [...filtered, kf].sort((a, b) => a.timeSec - b.timeSec);
          const updated = { ...c, keyframes: sorted };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
    addAdminLog(`Added keyframe node to clip ID ${clipId} at clip timeline position ${kf.timeSec}s.`);
  };

  const removeClipKeyframe = (clipId: string, timeSec: number) => {
    if (!activeProject) return;

    const updatedTracks = activeProject.tracks.map((t) => ({
      ...t,
      clips: t.clips.map((c) => {
        if (c.id === clipId && c.keyframes) {
          const updated = {
            ...c,
            keyframes: c.keyframes.filter((k) => k.timeSec !== timeSec)
          };
          if (selectedClip?.id === clipId) setSelectedClip(updated);
          return updated;
        }
        return c;
      })
    }));

    updateActiveProjectTracks(updatedTracks);
    addAdminLog(`Removed keyframe node from clip ID ${clipId} at position ${timeSec}s.`);
  };

  return (
    <ProjectContext.Provider
      value={{
        user,
        loginGuest,
        loginUser,
        logout,
        togglePremium,
        addCredits,
        consumeCredits,
        projects,
        activeProject,
        setActiveProject,
        createNewProject,
        deleteProject,
        renameProject,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        zoomLevel,
        setZoomLevel,
        selectedClip,
        setSelectedClip,
        addClip,
        deleteClip,
        updateClipDuration,
        updateClipPosition,
        updateClipSpeed,
        duplicateClip,
        splitClipAtCurrentTime,
        updateClipTextSettings,
        updateClipAudioSettings,
        updateClipChromaKeySettings,
        updateClipFilter,
        updateClipEffect,
        updateClipTransition,
        addClipKeyframe,
        removeClipKeyframe,
        isGeneratingAI,
        setGeneratingAI,
        autoCaptions,
        setAutoCaptions,
        adminLogs,
        addAdminLog
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
