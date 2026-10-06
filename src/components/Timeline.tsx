import React, { useRef } from "react";
import { useProject } from "../context/ProjectContext";
import {
  Scissors,
  Trash2,
  Copy,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Type,
  Music,
  Video,
  Smile,
  Cpu
} from "lucide-react";
import { TrackType, Clip } from "../types";

interface TimelineProps {
  mobile?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ mobile = false }) => {
  const {
    activeProject,
    currentTime,
    setCurrentTime,
    zoomLevel,
    setZoomLevel,
    selectedClip,
    setSelectedClip,
    deleteClip,
    duplicateClip,
    splitClipAtCurrentTime,
    updateClipDuration,
    updateClipPosition
  } = useProject();

  const rulerRef = useRef<HTMLDivElement>(null);

  const duration = activeProject?.durationSec || 18.0;

  // Zoom parameters
  const minZoom = 15;
  const maxZoom = 100;

  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in") {
      setZoomLevel(Math.min(maxZoom, zoomLevel + 10));
    } else {
      setZoomLevel(Math.max(minZoom, zoomLevel - 10));
    }
  };

  const handleRulerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rulerRef.current) return;
    const rect = rulerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left + rulerRef.current.scrollLeft;
    const newTime = clickX / zoomLevel;
    setCurrentTime(Math.max(0, Math.min(duration, parseFloat(newTime.toFixed(1)))));
  };

  const getTrackIcon = (type: TrackType) => {
    switch (type) {
      case "video":
        return <Video className="w-3.5 h-3.5 text-blue-400" />;
      case "audio":
        return <Music className="w-3.5 h-3.5 text-emerald-400" />;
      case "text":
        return <Type className="w-3.5 h-3.5 text-orange-400" />;
      case "effect":
        return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
      case "sticker":
        return <Smile className="w-3.5 h-3.5 text-pink-400" />;
    }
  };

  const getClipColorClass = (type: TrackType, isSelected: boolean) => {
    if (isSelected) {
      return "bg-gradient-to-r from-purple-600/80 to-blue-500/80 border-2 border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.4)] z-25 text-white backdrop-blur-md";
    }
    switch (type) {
      case "video":
        return "bg-blue-500/15 hover:bg-blue-500/25 border border-blue-400/20 text-blue-200 backdrop-blur-sm";
      case "audio":
        return "bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/20 text-emerald-300 backdrop-blur-sm";
      case "text":
        return "bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/20 text-amber-300 backdrop-blur-sm";
      case "effect":
        return "bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/20 text-purple-300 backdrop-blur-sm";
      case "sticker":
        return "bg-pink-500/10 hover:bg-pink-500/20 border border-pink-400/20 text-pink-300 backdrop-blur-sm";
    }
  };

  // Nudge selected clip left or right
  const nudgeClip = (direction: "left" | "right") => {
    if (!selectedClip) return;
    const step = 0.5;
    const currentStart = selectedClip.startSec;
    const newStart = direction === "left" ? Math.max(0, currentStart - step) : currentStart + step;
    updateClipPosition(selectedClip.id, newStart);
  };

  // Adjust duration of selected clip
  const resizeClip = (action: "expand" | "shrink") => {
    if (!selectedClip) return;
    const step = 0.5;
    const currentDur = selectedClip.durationSec;
    const newDur = action === "expand" ? currentDur + step : Math.max(0.5, currentDur - step);
    updateClipDuration(selectedClip.id, newDur);
  };

  return (
    <div className={`${mobile ? "h-full flex-1" : "h-64 border-t border-white/5"} bg-black/30 backdrop-blur-xl flex flex-col select-none text-slate-200`}>
      {/* Timeline Controls Toolbar */}
      <div className="h-10 border-b border-white/10 px-4 flex items-center justify-between bg-white/5 backdrop-blur-md text-xs">
        <div className="flex items-center gap-2">
          {/* Split */}
          <button
            onClick={() => selectedClip && splitClipAtCurrentTime(selectedClip.id)}
            disabled={!selectedClip}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-40 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
            title="Split selected clip at current playhead position"
          >
            <Scissors className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Split</span>
          </button>

          {/* Duplicate */}
          <button
            onClick={() => selectedClip && duplicateClip(selectedClip.id)}
            disabled={!selectedClip}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-40 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
            title="Duplicate selected clip"
          >
            <Copy className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Duplicate</span>
          </button>

          {/* Delete */}
          <button
            onClick={() => selectedClip && deleteClip(selectedClip.id)}
            disabled={!selectedClip}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-40 border border-white/10 hover:border-white/20 transition-colors text-rose-400 hover:text-rose-300 cursor-pointer"
            title="Delete selected clip"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>

        {/* Nudging Drawer (Fine manual adjustments) */}
        {selectedClip && (
          <div className="hidden md:flex items-center gap-3 bg-white/5 px-3 py-1 rounded-full border border-white/10 text-[10px] text-slate-400 font-mono backdrop-blur-md">
            <span>Clip Offset: {selectedClip.startSec}s - {(selectedClip.startSec + selectedClip.durationSec).toFixed(1)}s</span>
            <div className="flex items-center gap-1 border-l border-white/10 pl-3">
              <button onClick={() => nudgeClip("left")} className="p-0.5 hover:bg-white/10 rounded cursor-pointer">
                <ChevronLeft className="w-3 h-3 text-purple-400" />
              </button>
              <span>Nudge Pos</span>
              <button onClick={() => nudgeClip("right")} className="p-0.5 hover:bg-white/10 rounded cursor-pointer">
                <ChevronRight className="w-3 h-3 text-purple-400" />
              </button>
            </div>
            <div className="flex items-center gap-1 border-l border-white/10 pl-3">
              <button onClick={() => resizeClip("shrink")} className="p-0.5 hover:bg-white/10 rounded cursor-pointer">
                <ChevronLeft className="w-3 h-3 text-blue-400" />
              </button>
              <span>Trim Len</span>
              <button onClick={() => resizeClip("expand")} className="p-0.5 hover:bg-white/10 rounded cursor-pointer">
                <ChevronRight className="w-3 h-3 text-blue-400" />
              </button>
            </div>
          </div>
        )}

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleZoom("out")}
            disabled={zoomLevel <= minZoom}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[10px] text-slate-500 font-mono">{zoomLevel}% zoom</span>
          <button
            onClick={() => handleZoom("in")}
            disabled={zoomLevel >= maxZoom}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Multi-Track scrollable timeline zone */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative scrollbar-thin bg-transparent">
        {/* Playhead Vertical Needle (red bar overlay) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 pointer-events-none shadow-[0_0_8px_rgba(239,68,68,0.7)]"
          style={{
            left: `${currentTime * zoomLevel}px`,
            marginLeft: "120px" // Account for the track titles labels on left
          }}
        >
          {/* Handle node */}
          <div className="w-3 h-3 bg-red-500 rotate-45 -translate-x-[5px] -translate-y-[1px] absolute top-0 rounded-sm" />
        </div>

        {/* Time Ruler Ticks */}
        <div
          ref={rulerRef}
          onClick={handleRulerClick}
          className="h-7 border-b border-white/10 relative cursor-col-resize select-none overflow-x-auto scrollbar-none flex-none bg-black/40 backdrop-blur-md"
          style={{ paddingLeft: "120px" }}
        >
          {/* Dynamic tick marks */}
          {Array.from({ length: Math.ceil(duration) + 5 }).map((_, sec) => (
            <div
              key={sec}
              className="absolute bottom-0 h-4 border-l border-white/10 text-[9px] font-mono text-slate-500 pl-1"
              style={{ left: `${sec * zoomLevel + 120}px` }}
            >
              {sec}s
            </div>
          ))}
        </div>

        {/* Stack of Tracks */}
        <div className="flex-1 flex flex-col divide-y divide-white/5">
          {activeProject?.tracks.map((track) => (
            <div key={track.id} className="h-10 flex relative items-center group">
              {/* Left sidebar descriptor label */}
              <div className="w-[120px] h-full absolute left-0 bg-black/60 backdrop-blur-md border-r border-white/10 z-20 flex items-center gap-2 px-3 text-xs font-semibold text-slate-400 shadow-[2px_0_5px_rgba(0,0,0,0.2)]">
                {getTrackIcon(track.type)}
                <span className="truncate">{track.name}</span>
              </div>

              {/* Horizontal track grid workspace area */}
              <div
                className="h-full absolute left-[120px] right-0 overflow-x-auto scrollbar-none flex items-center"
                style={{ width: `${(duration + 2) * zoomLevel}px` }}
              >
                {/* Track block indicators */}
                {track.clips.map((clip) => {
                  const clipWidth = clip.durationSec * zoomLevel;
                  const clipLeft = clip.startSec * zoomLevel;
                  const isSelected = selectedClip?.id === clip.id;

                  return (
                    <div
                      key={clip.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClip(clip);
                      }}
                      className={`absolute h-7 rounded-md px-2 text-[10px] font-bold flex items-center justify-between cursor-pointer group truncate transition-all ${getClipColorClass(
                        clip.type,
                        isSelected
                      )}`}
                      style={{
                        left: `${clipLeft}px`,
                        width: `${clipWidth}px`
                      }}
                    >
                      {/* Left visual decorations like thumb */}
                      <div className="flex items-center gap-1.5 truncate">
                        {clip.thumbnailUrl && clip.type === "video" && (
                          <img
                            src={clip.thumbnailUrl}
                            className="w-4 h-4 rounded object-cover flex-none border border-white/10"
                            alt=""
                          />
                        )}
                        <span className="truncate font-sans tracking-tight">
                          {clip.type === "text" ? clip.textSettings?.text : clip.name}
                        </span>
                      </div>

                      {/* Display filters / effect icons badges */}
                      <div className="flex items-center gap-1 flex-none ml-1">
                        {clip.filterId && (
                          <span className="text-[7px] bg-blue-900/60 text-blue-200 px-1 rounded border border-blue-400/25">F</span>
                        )}
                        {clip.effectId && (
                          <span className="text-[7px] bg-purple-900/60 text-purple-200 px-1 rounded border border-purple-400/25">E</span>
                        )}
                        {clip.transitionId && (
                          <span className="text-[7px] bg-indigo-900/60 text-indigo-200 px-1 rounded border border-indigo-400/25">T</span>
                        )}
                        {clip.speed !== 1 && (
                          <span className="text-[7px] text-yellow-400 font-mono">{clip.speed}x</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
