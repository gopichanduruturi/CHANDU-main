import React, { useRef, useEffect, useState } from "react";
import { useProject } from "../context/ProjectContext";
import {
  Play,
  Pause,
  SkipBack,
  Maximize2,
  Volume2,
  Tv,
  Sparkles,
  Layers,
  Clock,
  RotateCcw
} from "lucide-react";
import { FILTERS, EFFECTS } from "../data";

export const CanvasPlayer: React.FC = () => {
  const {
    activeProject,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    selectedClip
  } = useProject();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  // Parse time for standard format e.g., 00:02.4
  const formatTime = (timeSec: number) => {
    const mins = Math.floor(timeSec / 60);
    const secs = Math.floor(timeSec % 60);
    const ms = Math.floor((timeSec % 1) * 10);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms}`;
  };

  const projectDuration = activeProject?.durationSec || 18.0;

  // Determine active clips at the CURRENT PLAYHEAD TIME
  const activeClips = activeProject?.tracks.flatMap((track) =>
    track.clips.filter(
      (clip) =>
        currentTime >= clip.startSec &&
        currentTime <= clip.startSec + clip.durationSec
    )
  ) || [];

  // Filter and Effect configurations for the currently active primary visual clip
  const activeVideoClip = activeClips.find((c) => c.type === "video");
  const activeFilterPreset = FILTERS.find((f) => f.id === activeVideoClip?.filterId);
  const activeEffectPreset = EFFECTS.find((e) => e.id === activeVideoClip?.effectId);

  // Active overlays
  const activeTextClips = activeClips.filter((c) => c.type === "text");
  const activeStickerClips = activeClips.filter((c) => c.type === "sticker");
  const activeGlobalEffect = activeClips.find((c) => c.type === "effect");

  // Format Aspect Ratio Classes
  const getAspectClass = () => {
    switch (activeProject?.aspectRatio) {
      case "9:16":
        return "aspect-[9/16] h-[340px] md:h-[420px]";
      case "1:1":
        return "aspect-square w-[300px] md:w-[380px]";
      case "4:3":
        return "aspect-[4/3] w-[340px] md:w-[440px]";
      case "16:9":
      default:
        return "aspect-[16/9] w-full max-w-[560px]";
    }
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  // Keyboard shortcut for play/pause (spacebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, setIsPlaying]);

  return (
    <section className="flex-1 bg-transparent border-b border-white/5 p-2 md:p-4 flex flex-col items-center justify-center relative min-h-[220px] md:min-h-[360px] select-none">
      {/* Aspect Bounded Canvas Player Screen */}
      <div
        ref={playerRef}
        className={`relative ${getAspectClass()} bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between items-center group transition-all duration-300`}
      >
        {/* Dynamic Background visual loop representing video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
          {/* Base Video Canvas: simulated using abstract CSS animations to represent motion */}
          <div
            className={`absolute inset-0 w-full h-full bg-gradient-to-tr from-indigo-950 via-slate-950 to-purple-950 transition-all duration-500 flex flex-col items-center justify-center ${
              activeFilterPreset?.cssClass || ""
            } ${activeEffectPreset?.cssClass || ""} ${
              activeGlobalEffect ? EFFECTS.find((e) => e.id === activeGlobalEffect.effectId)?.cssClass : ""
            }`}
          >
            {/* Animated particles to represent motion/playback activity */}
            {isPlaying && (
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-800/20 via-slate-950 to-transparent animate-pulse" />
            )}

            {/* Dynamic visual representation based on current playing video clip */}
            {activeVideoClip ? (
              <div className="text-center relative z-10 p-4 animate-fade-in">
                <span className="text-[10px] font-mono uppercase bg-black/50 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/20">
                  {activeVideoClip.name}
                </span>

                {/* Simulated Chroma-Key Mask Grid */}
                {activeVideoClip.chromaKeySettings?.enabled && (
                  <div className="mt-3 py-1 px-3 border border-emerald-500/30 bg-emerald-950/40 rounded text-emerald-400 text-[10px] font-mono animate-pulse">
                    CHROMA-KEY REMOVED (Edge: {activeVideoClip.chromaKeySettings.edgeRefinement}%)
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-600 text-xs flex flex-col items-center gap-2">
                <Tv className="w-8 h-8 text-slate-700 animate-pulse" />
                <span>Blank Screen (No Clip Selected)</span>
              </div>
            )}

            {/* Abstract visual scene decoration simulating live footage */}
            <div className="absolute inset-x-0 bottom-4 text-center z-0 opacity-20 text-[9px] font-mono text-slate-500">
              CLIPPRO RENDERING PIPELINE • H264_AAC • {activeProject?.aspectRatio}
            </div>
          </div>

          {/* Active TIMED STICKER LAYERS */}
          {activeStickerClips.map((stick) => (
            <div
              key={stick.id}
              className="absolute z-20 pointer-events-none animate-bounce flex items-center justify-center"
              style={{
                top: "40%",
                left: "45%",
                transform: "scale(1.8)"
              }}
            >
              <span className="text-5xl select-none filter drop-shadow-lg">
                {stick.stickers?.[0] || "✨"}
              </span>
            </div>
          ))}

          {/* Active TIMED TEXT OVERLAY LAYERS */}
          {activeTextClips.map((txt) => {
            const settings = txt.textSettings;
            if (!settings) return null;

            // Generate font styles
            const textStyles: React.CSSProperties = {
              fontFamily: settings.fontFamily === "Space Grotesk" ? "sans-serif" : "inherit",
              fontSize: `${settings.fontSize}px`,
              color: settings.gradientEnabled ? undefined : settings.textColor,
              backgroundColor: settings.backgroundColor,
              textShadow: settings.shadowEnabled ? "2px 2px 4px rgba(0,0,0,0.8)" : "none",
              WebkitTextStroke: settings.outlineEnabled
                ? `${settings.outlineWidth}px ${settings.outlineColor}`
                : "none"
            };

            return (
              <div
                key={txt.id}
                className={`absolute z-30 pointer-events-none px-4 text-center text-wrap transition-all max-w-[85%] bottom-[15%]`}
              >
                {settings.gradientEnabled ? (
                  <span
                    className="font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r"
                    style={{
                      ...textStyles,
                      backgroundImage: `linear-gradient(to right, ${settings.gradientColors[0]}, ${settings.gradientColors[1]})`
                    } as any}
                  >
                    {settings.text}
                  </span>
                ) : (
                  <span className="font-bold tracking-tight" style={textStyles}>
                    {settings.text}
                  </span>
                )}
              </div>
            );
          })}

          {/* Simulated retro static overlay for vintage/VHS/glitch effects */}
          {(activeVideoClip?.filterId === "f_vintage" || activeVideoClip?.effectId === "eff_vhs") && (
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-45 opacity-30" />
          )}
        </div>

        {/* Hover overlay timeline bar & playheads */}
        <div className="absolute bottom-0 inset-x-0 bg-black/80 border-t border-white/10 px-4 py-2 flex items-center justify-between z-40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTime(0)}
              className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Return to start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300">
              {formatTime(currentTime)} / {formatTime(projectDuration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-slate-500" />
            <div className="w-16 h-1 bg-white/10 rounded-full">
              <div className="w-3/4 h-full bg-purple-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Timeline Transport bar controls */}
      <div className="w-full max-w-xl mt-2 md:mt-4 flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 md:px-5 py-1.5 md:py-2.5 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTime(Math.max(0, currentTime - 1))}
            className="p-1.5 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Step back 1s"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 text-white shadow-lg shadow-purple-500/20 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
          </button>
        </div>

        {/* Playhead progress bar scrubber */}
        <div className="flex-1 mx-4 flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500">0.0s</span>
          <input
            type="range"
            min={0}
            max={projectDuration}
            step={0.1}
            value={currentTime}
            onChange={(e) => {
              setCurrentTime(parseFloat(e.target.value));
              setIsPlaying(false);
            }}
            className="w-full accent-purple-500 bg-white/10 border border-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-[10px] font-mono text-slate-500">
            {projectDuration.toFixed(1)}s
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleFullscreen}
            className="p-1.5 hover:bg-white/10 rounded-md text-slate-400 hover:text-white cursor-pointer transition-colors"
            title="Toggle Preview Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
