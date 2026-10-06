import React from "react";
import { useProject } from "../context/ProjectContext";
import {
  Sliders,
  Type,
  Volume2,
  Trash2,
  Cpu,
  Scissors,
  Wand2,
  Compass,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { FILTERS, EFFECTS, TRANSITIONS } from "../data";

export const PropertiesPanel: React.FC = () => {
  const {
    selectedClip,
    updateClipSpeed,
    deleteClip,
    updateClipTextSettings,
    updateClipAudioSettings,
    updateClipChromaKeySettings,
    updateClipFilter,
    updateClipEffect,
    updateClipTransition,
    addAdminLog
  } = useProject();

  if (!selectedClip) {
    return (
      <aside className="w-full md:w-80 md:border-l border-white/5 bg-transparent md:bg-black/30 md:backdrop-blur-xl p-4 flex flex-col justify-center items-center text-center select-none text-slate-500 h-full">
        <Sliders className="w-8 h-8 text-slate-800 mb-2 animate-pulse" />
        <p className="text-xs">No clip selected on timeline.</p>
        <p className="text-[10px] text-slate-600 mt-1">Click any block below to customize properties.</p>
      </aside>
    );
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateClipTextSettings(selectedClip.id, { text: e.target.value });
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateClipTextSettings(selectedClip.id, { fontFamily: e.target.value });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateClipTextSettings(selectedClip.id, { fontSize: parseInt(e.target.value) });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateClipTextSettings(selectedClip.id, { textColor: e.target.value });
  };

  const handleGradientToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateClipTextSettings(selectedClip.id, { gradientEnabled: e.target.checked });
  };

  const handleAudioVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateClipAudioSettings(selectedClip.id, { volume: parseInt(e.target.value) });
  };

  const handleNoiseReductionToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateClipAudioSettings(selectedClip.id, { noiseReduction: e.target.checked });
  };

  const handleChromaToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateClipChromaKeySettings(selectedClip.id, { enabled: e.target.checked });
  };

  const handleChromaColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateClipChromaKeySettings(selectedClip.id, { targetColor: e.target.value });
  };

  const handleChromaEdgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateClipChromaKeySettings(selectedClip.id, { edgeRefinement: parseInt(e.target.value) });
  };

  return (
    <aside className="w-full md:w-80 md:border-l border-white/5 bg-transparent md:bg-black/30 md:backdrop-blur-xl flex flex-col select-none text-slate-200 h-full">
      {/* Title Header */}
      <div className="p-3.5 border-b border-white/10 bg-white/5 backdrop-blur-md flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Inspector Panel
          </span>
        </div>
        <button
          onClick={() => deleteClip(selectedClip.id)}
          className="p-1 hover:bg-white/10 rounded text-rose-400 transition-colors cursor-pointer"
          title="Delete clip"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Settings Container Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin text-left">
        {/* Clip Identity Tag */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 backdrop-blur-md">
          <span className="text-[9px] uppercase font-mono tracking-widest text-purple-400 font-bold block mb-1">
            {selectedClip.type} asset track
          </span>
          <h4 className="text-xs font-bold text-white truncate">{selectedClip.name}</h4>
        </div>

        {/* SPEED CONTROL (All clips support pacing) */}
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase font-semibold text-slate-400">Pacing Speed</label>
            <span className="text-xs font-bold font-mono text-purple-400">{selectedClip.speed}x</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={10.0}
            step={0.1}
            value={selectedClip.speed}
            onChange={(e) => updateClipSpeed(selectedClip.id, parseFloat(e.target.value))}
            className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[8px] text-slate-500 font-mono">
            <span>0.1x (Slo-mo)</span>
            <span>1.0x (Normal)</span>
            <span>10x (Time-lapse)</span>
          </div>
        </div>

        {/* TEXT CLIP WORKSPACE */}
        {selectedClip.type === "text" && selectedClip.textSettings && (
          <div className="space-y-4">
            {/* Input message */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold text-slate-400">Overlay Text Content</label>
              <textarea
                value={selectedClip.textSettings.text}
                onChange={handleTextChange}
                rows={3}
                placeholder="Type your title overlay message..."
                className="w-full bg-black/20 border border-white/10 rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-purple-600 resize-none font-sans backdrop-blur-md"
              />
            </div>

            {/* Typography pairings */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] text-slate-400 uppercase font-semibold mb-1">Font Pairings</label>
                <select
                  value={selectedClip.textSettings.fontFamily}
                  onChange={handleFontChange}
                  className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[11px] text-slate-200 focus:outline-none backdrop-blur-md"
                >
                  <option value="Inter">Classic Inter</option>
                  <option value="Space Grotesk">Tech Grotesk</option>
                  <option value="Playfair Display">Editorial Serif</option>
                  <option value="JetBrains Mono">Tech Mono</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] text-slate-400 uppercase font-semibold mb-1">Font Color</label>
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded p-0.5 backdrop-blur-md">
                  <input
                    type="color"
                    value={selectedClip.textSettings.textColor}
                    onChange={handleColorChange}
                    className="w-5 h-5 bg-transparent border-0 cursor-pointer rounded overflow-hidden"
                  />
                  <span className="text-[10px] font-mono uppercase text-slate-400">{selectedClip.textSettings.textColor}</span>
                </div>
              </div>
            </div>

            {/* Slider size */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Font Size</span>
                <span className="font-mono">{selectedClip.textSettings.fontSize}px</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={selectedClip.textSettings.fontSize}
                onChange={handleFontSizeChange}
                className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Gradient Enabled toggles */}
            <div className="space-y-2 border-t border-white/10 pt-3">
              <label className="flex items-center justify-between text-[10px] text-slate-400 font-semibold cursor-pointer">
                <span>Gradient Text Color Fill</span>
                <input
                  type="checkbox"
                  checked={selectedClip.textSettings.gradientEnabled}
                  onChange={handleGradientToggle}
                  className="accent-purple-500 rounded"
                />
              </label>
              {selectedClip.textSettings.gradientEnabled && (
                <div className="grid grid-cols-2 gap-2 animate-fade-in bg-black/30 p-2 rounded border border-white/10 backdrop-blur-md">
                  <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 block">Color Start</span>
                    <input
                      type="color"
                      value={selectedClip.textSettings.gradientColors[0]}
                      onChange={(e) =>
                        updateClipTextSettings(selectedClip.id, {
                          gradientColors: [e.target.value, selectedClip.textSettings!.gradientColors[1]]
                        })
                      }
                      className="w-full h-5 rounded cursor-pointer bg-transparent"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 block">Color End</span>
                    <input
                      type="color"
                      value={selectedClip.textSettings.gradientColors[1]}
                      onChange={(e) =>
                        updateClipTextSettings(selectedClip.id, {
                          gradientColors: [selectedClip.textSettings!.gradientColors[0], e.target.value]
                        })
                      }
                      className="w-full h-5 rounded cursor-pointer bg-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Animation selects */}
            <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <div>
                <label className="block text-[9px] text-slate-400 uppercase font-semibold mb-1">In Animation</label>
                <select
                  value={selectedClip.textSettings.animationIn}
                  onChange={(e) =>
                    updateClipTextSettings(selectedClip.id, {
                      animationIn: e.target.value as any
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[11px] text-slate-200 focus:outline-none backdrop-blur-md"
                >
                  <option value="none">None (Cut)</option>
                  <option value="fade">Cross Fade</option>
                  <option value="typewriter">Typewriter</option>
                  <option value="zoom">Zoom Bounce</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] text-slate-400 uppercase font-semibold mb-1">Out Animation</label>
                <select
                  value={selectedClip.textSettings.animationOut}
                  onChange={(e) =>
                    updateClipTextSettings(selectedClip.id, {
                      animationOut: e.target.value as any
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[11px] text-slate-200 focus:outline-none backdrop-blur-md"
                >
                  <option value="none">None (Cut)</option>
                  <option value="fade">Dissolve</option>
                  <option value="zoom">Wipe Out</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* AUDIO CLIP WORKSPACE */}
        {selectedClip.type === "audio" && selectedClip.audioSettings && (
          <div className="space-y-4">
            {/* Volume Scrubber */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                <span>Gain Volume</span>
                <span className="font-mono">{selectedClip.audioSettings.volume}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={150}
                value={selectedClip.audioSettings.volume}
                onChange={handleAudioVolumeChange}
                className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                <span>Mute</span>
                <span>100% (Original)</span>
                <span>150% (Boost)</span>
              </div>
            </div>

            {/* Noise Reduction toggle */}
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between backdrop-blur-md">
              <div>
                <span className="text-xs font-bold text-white block">AI Noise Reduction</span>
                <span className="text-[10px] text-slate-500 block">Filter ambient room buzzes</span>
              </div>
              <input
                type="checkbox"
                checked={selectedClip.audioSettings.noiseReduction}
                onChange={handleNoiseReductionToggle}
                className="accent-purple-500 w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* CHROMA KEY & KEYFRAME RENDER OVERLAY (Videos layer) */}
        {selectedClip.type === "video" && (
          <div className="space-y-5">
            {/* Visual Filters applied */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <label className="text-[10px] uppercase font-semibold text-slate-400 block">Applied Overlay Filter</label>
              <select
                value={selectedClip.filterId || ""}
                onChange={(e) => updateClipFilter(selectedClip.id, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 backdrop-blur-md"
              >
                <option value="">None (Raw colors)</option>
                {FILTERS.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            {/* Visual Effects applied */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <label className="text-[10px] uppercase font-semibold text-slate-400 block">Interactive Core Effect</label>
              <select
                value={selectedClip.effectId || ""}
                onChange={(e) => updateClipEffect(selectedClip.id, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 backdrop-blur-md"
              >
                <option value="">None (No shader overlay)</option>
                {EFFECTS.map((e) => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>

            {/* Transitions applied */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <label className="text-[10px] uppercase font-semibold text-slate-400 block">Lead-In Transition</label>
              <select
                value={selectedClip.transitionId || ""}
                onChange={(e) => updateClipTransition(selectedClip.id, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 backdrop-blur-md"
              >
                <option value="">None (Direct Cut)</option>
                {TRANSITIONS.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Chroma Keying green screen controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Chroma Key Removal</span>
                  <span className="text-[10px] text-slate-500 block">Eliminate solid color backdrops</span>
                </div>
                <input
                  type="checkbox"
                  checked={selectedClip.chromaKeySettings?.enabled || false}
                  onChange={handleChromaToggle}
                  className="accent-purple-500 w-4 h-4 cursor-pointer"
                />
              </div>

              {selectedClip.chromaKeySettings?.enabled && (
                <div className="bg-black/30 border border-white/10 rounded-lg p-3 space-y-3 animate-fade-in backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-semibold">Chroma Backdrop Color</span>
                    <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded border border-white/10">
                      <input
                        type="color"
                        value={selectedClip.chromaKeySettings.targetColor}
                        onChange={handleChromaColorChange}
                        className="w-4 h-4 border-0 cursor-pointer rounded"
                      />
                      <span className="text-[9px] uppercase font-mono text-slate-500">
                        {selectedClip.chromaKeySettings.targetColor}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Edge refinement</span>
                      <span className="font-mono">{selectedClip.chromaKeySettings.edgeRefinement}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={selectedClip.chromaKeySettings.edgeRefinement}
                      onChange={handleChromaEdgeChange}
                      className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
