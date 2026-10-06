import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";
import {
  TEMPLATES,
  AUDIO_ASSETS,
  FILTERS,
  EFFECTS,
  TRANSITIONS,
  STICKERS,
  AI_TOOLS,
  TEXT_PRESETS
} from "../data";
import {
  Video,
  Type,
  Music,
  Sliders,
  Sparkles,
  Scissors,
  Smile,
  Cpu,
  Plus,
  Play,
  Volume2,
  Trash,
  Check,
  Search,
  Wand2,
  Languages,
  Mic,
  ArrowRight
} from "lucide-react";
import { TrackType } from "../types";

export const LibraryPanel: React.FC = () => {
  const {
    activeProject,
    addClip,
    selectedClip,
    updateClipFilter,
    updateClipEffect,
    updateClipTransition,
    consumeCredits,
    addAdminLog,
    setGeneratingAI,
    isGeneratingAI,
    user
  } = useProject();

  const [activeTab, setActiveTab] = useState<
    "templates" | "text" | "audio" | "filters" | "effects" | "transitions" | "stickers" | "ai"
  >("templates");

  // AI Script Generator States
  const [topic, setTopic] = useState("A mysterious cyber detective in a neon cyberpunk city");
  const [style, setStyle] = useState("cinematic");
  const [duration, setDuration] = useState("30s");
  const [generatedScript, setGeneratedScript] = useState<any>(null);
  const [scriptError, setScriptError] = useState("");

  // AI Subtitle States
  const [transcriptInput, setTranscriptInput] = useState(
    "Welcome to ClipPro AI. Today we are exploring the secret neon-lit alleys of Tokyo. Keep watching for the best spots!"
  );
  const [subtitlesResult, setSubtitlesResult] = useState<any>(null);

  // Search Filter state
  const [searchQuery, setSearchQuery] = useState("");

  // Simulate audio capture state
  const [isRecording, setIsRecording] = useState(false);

  // Trigger Gemini AI Script Generation (Server-Side)
  const generateAIScript = async () => {
    setScriptError("");
    setGeneratedScript(null);
    setGeneratingAI(true);
    addAdminLog(`Sending script prompt to Gemini API: Topic: "${topic}"`);

    // Consume AI credit for simulation
    consumeCredits(1);

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          style,
          duration,
          aspect: activeProject?.aspectRatio || "16:9"
        })
      });

      if (!response.ok) {
        throw new Error("Server failed to generate. Running smart local generator fallback...");
      }

      const data = await response.json();
      setGeneratedScript(data);
      addAdminLog(`Successfully generated script with ${data.scenes?.length} scenes.`);
    } catch (err: any) {
      console.warn("Fallback script generator active.", err);
      // High quality fallback simulation matching structure in case API Key is not set yet
      setTimeout(() => {
        const fallback = {
          title: `Neon Chronicles: ${topic.slice(0, 20)}...`,
          hook: `Have you ever wondered what lies in the darkest corners of this neon city?`,
          scenes: [
            {
              id: 1,
              timestamp: "0:00 - 0:05",
              visualDescription: "Panning cinematic camera showing towering neon skyscrapers and deep shadow-cast alleys. Rain puddles reflection.",
              voiceover: "They say this city never sleeps. But in the shadows of the neon, the real story begins.",
              musicBeat: "Slow-tempo retro synthwave with deep heavy bass"
            },
            {
              id: 2,
              timestamp: "0:05 - 0:12",
              visualDescription: "Medium tracking shot of a detective walking slowly under a flashing purple billboard. Smoke rises from grates.",
              voiceover: "Every alleyway holds a secret. Every flickering light has a voice if you listen closely enough.",
              musicBeat: "Fast-tempo beat with transition swishes"
            },
            {
              id: 3,
              timestamp: "0:12 - 0:18",
              visualDescription: "Close-up on the detective looking up. Reflection of blue and red police sirens flashing across the eyes.",
              voiceover: "Tonight, the mystery unravels. Stay with me to find out the truth.",
              musicBeat: "Suspenseful drop fading into silence"
            }
          ],
          tags: ["cyberpunk", "cinematic", "storytelling", "clippro_ai"]
        };
        setGeneratedScript(fallback);
        addAdminLog("Local offline fallback script loaded.");
      }, 1500);
    } finally {
      setGeneratingAI(false);
    }
  };

  // Convert AI generated script instantly into fully synchronized timeline tracks
  const importScriptToTimeline = () => {
    if (!generatedScript || !activeProject) return;

    addAdminLog(`Deconstructing script into timeline elements...`);
    // Clear old clips and re-initialize tracks with scenes
    const scenes = generatedScript.scenes || [];

    // Let's create individual clips matching scenes:
    scenes.forEach((scene: any, idx: number) => {
      // Add visual scene
      addClip("video", {
        name: `Scene ${scene.id}: ${scene.musicBeat.slice(0, 15)}`,
        durationSec: 6,
        filterId: "f_cyberpunk",
        thumbnailUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=200&auto=format&fit=crop&q=60"
      });

      // Add speech voiceover
      addClip("text", {
        name: `VO Subtitle ${scene.id}`,
        durationSec: 5,
        textSettings: {
          text: scene.voiceover,
          fontFamily: "Space Grotesk",
          fontSize: 26,
          textColor: "#f43f5e",
          gradientEnabled: true,
          gradientColors: ["#ef4444", "#ec4899"],
          outlineEnabled: true,
          outlineColor: "#000000",
          animationIn: "typewriter"
        }
      });
    });

    addAdminLog(`Assembled ${scenes.length} video, audio, and subtitle assets into timeline.`);
  };

  // Trigger Gemini AI Auto-Subtitles/Captions (Server-Side)
  const generateSubtitles = async () => {
    setSubtitlesResult(null);
    setGeneratingAI(true);
    addAdminLog("Generating synchronized auto-subtitles...");

    consumeCredits(1);

    try {
      const response = await fetch("/api/generate-captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: transcriptInput })
      });

      if (!response.ok) {
        throw new Error("Server failed subtitle transcribing. Fallback active.");
      }

      const data = await response.json();
      setSubtitlesResult(data.captions);

      // Add captions directly to the project timeline
      data.captions.forEach((cap: any, idx: number) => {
        addClip("text", {
          name: `Auto Caption ${idx + 1}`,
          durationSec: cap.end - cap.start,
          textSettings: {
            text: cap.text,
            fontFamily: "Inter",
            fontSize: 22,
            textColor: "#eab308", // gold yellow
            outlineEnabled: true,
            outlineColor: "#000000",
            animationIn: "fade"
          }
        });
      });
      addAdminLog(`Imported ${data.captions.length} auto-generated speech subtitles to text tracks.`);
    } catch (err) {
      // Local fallback auto caption divider
      setTimeout(() => {
        const mockCaps = [
          { start: 0, end: 3, text: "Welcome to ClipPro AI." },
          { start: 3, end: 6, text: "Today we are exploring the secret neon alleys..." },
          { start: 6, end: 9, text: "Keep watching for the best spots!" }
        ];
        setSubtitlesResult(mockCaps);
        mockCaps.forEach((cap, idx) => {
          addClip("text", {
            name: `Auto Subtitle ${idx + 1}`,
            durationSec: 3,
            textSettings: {
              text: cap.text,
              fontFamily: "Inter",
              fontSize: 20,
              textColor: "#ffffff",
              backgroundColor: "rgba(0,0,0,0.6)",
              outlineEnabled: false,
              animationIn: "fade"
            }
          });
        });
        addAdminLog("Local subtitle transcriber processed.");
      }, 1000);
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleMicRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      addAdminLog("Voice Recording Completed. Synthesizing audio clip...");
      addClip("audio", {
        name: "Mic Recording.wav",
        durationSec: 4.5,
        audioSettings: { volume: 100, noiseReduction: true, fadeInSec: 0.2, fadeOutSec: 0.2 }
      });
    } else {
      setIsRecording(true);
      addAdminLog("Capturing microphone stream... Recording audio live...");
    }
  };

  return (
    <aside className="w-full md:w-80 md:border-r border-white/5 bg-transparent md:bg-black/20 md:backdrop-blur-xl flex flex-col select-none text-slate-200 h-full">
      {/* Category Tab Side-rail */}
      <div className="flex border-b border-white/5 bg-white/5 p-1 overflow-x-auto scrollbar-none gap-0.5">
        {[
          { id: "templates", label: "Templates", icon: Video },
          { id: "text", label: "Text/Caps", icon: Type },
          { id: "audio", label: "Audio", icon: Music },
          { id: "filters", label: "Filters", icon: Sliders },
          { id: "effects", label: "Effects", icon: Cpu },
          { id: "transitions", label: "Transitions", icon: Scissors },
          { id: "stickers", label: "Stickers", icon: Smile },
          { id: "ai", label: "AI Co-Writer", icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[54px] py-2 rounded-md flex flex-col items-center justify-center text-[10px] font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white/10 text-purple-400 border border-white/10 backdrop-blur-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Workspace search bar */}
      {activeTab !== "ai" && (
        <div className="p-3 border-b border-white/5 flex items-center bg-transparent">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-600 backdrop-blur-md"
            />
          </div>
        </div>
      )}

      {/* Active Tab Panel Body */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        {/* TEMPLATES */}
        {activeTab === "templates" && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-2">Select a template to seed your timeline:</p>
            {TEMPLATES.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-lg overflow-hidden border border-white/5 bg-white/5 flex flex-col cursor-pointer hover:border-white/20 hover:bg-white/10 backdrop-blur-md transition-all"
              >
                <div className="h-28 overflow-hidden relative">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isPremium && (
                    <span className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-500 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      PRO
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-black/60 text-[10px] font-mono px-1 rounded">
                    {item.duration}
                  </span>
                </div>
                <div className="p-2 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white max-w-[150px] truncate">{item.name}</h4>
                    <p className="text-[10px] text-slate-500">{item.useCount} downloads</p>
                  </div>
                  <button
                    onClick={() =>
                      addClip("video", {
                        name: item.name,
                        durationSec: 8,
                        thumbnailUrl: item.thumbnailUrl
                      })
                    }
                    className="p-1.5 rounded bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TEXT & CAPTIONS */}
        {activeTab === "text" && (
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wider">AI Subtitle Generator</h4>
              <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 space-y-2 backdrop-blur-md">
                <textarea
                  value={transcriptInput}
                  onChange={(e) => setTranscriptInput(e.target.value)}
                  placeholder="Paste script text or record audio, then generate captions..."
                  className="w-full bg-black/20 border border-white/10 rounded p-1.5 text-xs text-slate-300 focus:outline-none focus:border-purple-500 h-16 resize-none backdrop-blur-md"
                />
                <button
                  onClick={generateSubtitles}
                  disabled={isGeneratingAI}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 disabled:opacity-50 text-white text-xs py-1.5 rounded font-medium flex items-center justify-center gap-1.5 transition-opacity cursor-pointer"
                >
                  {isGeneratingAI ? (
                    <span className="animate-spin text-white">●</span>
                  ) : (
                    <Languages className="w-3.5 h-3.5" />
                  )}
                  Auto-Generate Timed Captions
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold text-slate-400">Preset Layouts ({TEXT_PRESETS.length})</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
                {TEXT_PRESETS.filter((tp) => tp.name.toLowerCase().includes(searchQuery.toLowerCase()) || tp.description.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      addClip("text", {
                        name: item.name,
                        textSettings: item.settings
                      })
                    }
                    className="group relative p-2.5 border border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-white/10 rounded-lg flex flex-col justify-between text-left transition-all cursor-pointer backdrop-blur-md min-h-[72px]"
                  >
                    <span className="text-[10px] font-bold text-white group-hover:text-purple-400 transition-colors truncate w-full">{item.name}</span>
                    <span className="text-[9px] text-slate-500 line-clamp-2 leading-tight mt-1">{item.description}</span>
                    <div className="absolute right-1.5 bottom-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-600/80 rounded-full p-0.5">
                      <Plus className="w-2.5 h-2.5 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AUDIO & VOICE RECORD */}
        {activeTab === "audio" && (
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wider">Voice Recording</h4>
              <button
                onClick={handleMicRecord}
                className={`w-full py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer backdrop-blur-md ${
                  isRecording
                    ? "bg-red-600 hover:bg-red-500 animate-pulse text-white border border-red-500"
                    : "bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
                }`}
              >
                <Mic className="w-4 h-4 text-red-500" />
                {isRecording ? "Recording Live... Click to Stop" : "Simulate Live Audio Voiceover"}
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2">Audio Tracks</h4>
              <div className="space-y-2">
                {AUDIO_ASSETS.filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase())).map((aud) => (
                  <div
                    key={aud.id}
                    className="p-2 border border-white/5 bg-white/5 rounded-lg flex items-center justify-between backdrop-blur-md"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-white flex items-center gap-1">
                        {aud.title}
                        {aud.isPremium && <span className="text-[9px] text-purple-400 bg-purple-950 px-1 rounded">PRO</span>}
                      </h5>
                      <p className="text-[10px] text-slate-500">{aud.artist} • {aud.duration}</p>
                    </div>
                    <button
                      onClick={() =>
                        addClip("audio", {
                          name: aud.title,
                          durationSec: 15,
                          audioSettings: { volume: 80, noiseReduction: false }
                        })
                      }
                      className="p-1.5 rounded bg-purple-600 hover:bg-purple-500 text-white cursor-pointer transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FILTERS */}
        {activeTab === "filters" && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-1">Click a clip in timeline, then click filter to apply:</p>
            {selectedClip ? (
              <div className="grid grid-cols-2 gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => updateClipFilter(selectedClip.id, f.id)}
                    className={`relative rounded-lg overflow-hidden border p-1 text-left flex flex-col bg-white/5 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md ${
                      selectedClip.filterId === f.id
                        ? "border-purple-500 bg-purple-950/20"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="h-14 rounded overflow-hidden mb-1 w-full">
                      <img src={f.thumbnail} className="w-full h-full object-cover" alt="" />
                    </div>
                    <span className="text-[10px] font-bold text-white truncate w-full">{f.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed border-white/10 bg-white/5 rounded-lg text-xs text-slate-500 backdrop-blur-sm">
                Please select a clip on the timeline first.
              </div>
            )}
          </div>
        )}

        {/* VIDEO EFFECTS */}
        {activeTab === "effects" && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-1">Overlay interactive visual effects:</p>
            {selectedClip ? (
              <div className="grid grid-cols-2 gap-2">
                {EFFECTS.map((eff) => (
                  <button
                    key={eff.id}
                    onClick={() => updateClipEffect(selectedClip.id, eff.id)}
                    className={`p-2 border text-xs rounded-lg transition-all flex flex-col gap-1.5 cursor-pointer bg-white/5 hover:bg-white/10 backdrop-blur-md ${
                      selectedClip.effectId === eff.id
                        ? "border-purple-500 bg-purple-950/20"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-bold text-white">{eff.name}</span>
                      {eff.isPremium && <span className="text-[8px] bg-purple-950 text-purple-400 px-1 rounded">PRO</span>}
                    </div>
                    <span className="text-[10px] text-slate-500">{eff.category}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed border-white/10 bg-white/5 rounded-lg text-xs text-slate-500 backdrop-blur-sm">
                Please select a clip on the timeline first.
              </div>
            )}
          </div>
        )}

        {/* TRANSITIONS */}
        {activeTab === "transitions" && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-1">Pick visual blending between frames:</p>
            {selectedClip ? (
              <div className="grid grid-cols-2 gap-2">
                {TRANSITIONS.map((tr) => (
                  <button
                    key={tr.id}
                    onClick={() => updateClipTransition(selectedClip.id, tr.id)}
                    className={`p-2 bg-white/5 border rounded-lg text-xs text-left transition-all flex flex-col cursor-pointer backdrop-blur-md ${
                      selectedClip.transitionId === tr.id
                        ? "border-purple-500 bg-purple-950/20"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="font-bold text-white text-[10px]">{tr.name}</span>
                    {tr.isPremium && (
                      <span className="text-[8px] text-purple-400 mt-1 self-start">PRO</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed border-white/10 bg-white/5 rounded-lg text-xs text-slate-500 backdrop-blur-sm">
                Please select a clip on the timeline first.
              </div>
            )}
          </div>
        )}

        {/* STICKERS */}
        {activeTab === "stickers" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {STICKERS.map((stick) => (
                <button
                  key={stick.id}
                  onClick={() =>
                    addClip("sticker", {
                      name: stick.name,
                      durationSec: 4.0,
                      stickers: [stick.emoji]
                    })
                  }
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-center transition-all hover:border-purple-500/50 cursor-pointer backdrop-blur-md"
                >
                  <span className="text-2xl block mb-1">{stick.emoji}</span>
                  <span className="text-[9px] text-slate-500 block truncate">{stick.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI CREATIVE WRITER */}
        {activeTab === "ai" && (
          <div className="space-y-4">
            <div className="p-3 bg-purple-950/20 border border-purple-900/30 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-purple-300">Gemini AI Scriptwriter</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Generate high-converting scripts based on hooks, scenes, and visual directions, then convert them instantly into synced visual assets.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase font-semibold">Video Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. A retro travel vlog in Rome"
                  className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 backdrop-blur-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase font-semibold">Creative Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 backdrop-blur-md"
                  >
                    <option value="cinematic">Cinematic 4K</option>
                    <option value="vlog">Vlog Style</option>
                    <option value="tutorial">Quick Hack</option>
                    <option value="commercial">Sleek Ad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase font-semibold">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 backdrop-blur-md"
                  >
                    <option value="15s">15 seconds</option>
                    <option value="30s">30 seconds</option>
                    <option value="60s">60 seconds</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generateAIScript}
                disabled={isGeneratingAI}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 disabled:opacity-50 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20 cursor-pointer"
              >
                {isGeneratingAI ? (
                  <span className="animate-spin text-white">●</span>
                ) : (
                  <Wand2 className="w-3.5 h-3.5" />
                )}
                Generate Script Outline
              </button>
            </div>

            {/* Script Display Output */}
            {generatedScript && (
              <div className="bg-black/40 border border-white/10 rounded-lg p-3 space-y-3 mt-4 animate-fade-in text-left backdrop-blur-xl">
                <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                  <span className="text-xs font-bold text-white">{generatedScript.title}</span>
                  <span className="text-[9px] bg-purple-950 text-purple-400 px-1 rounded uppercase">Ready</span>
                </div>

                <div>
                  <p className="text-[10px] text-purple-300 font-semibold mb-0.5">Hook:</p>
                  <p className="text-[10px] text-slate-300 italic">"{generatedScript.hook}"</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] text-blue-300 font-semibold">Scene Directives:</p>
                  {generatedScript.scenes?.map((sc: any) => (
                    <div key={sc.id} className="p-2 bg-black/20 rounded border border-white/5 space-y-1">
                      <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                        <span>SCENE {sc.id}</span>
                        <span>{sc.timestamp}</span>
                      </div>
                      <p className="text-[9px] text-slate-300">
                        <strong className="text-slate-400">Visual:</strong> {sc.visualDescription}
                      </p>
                      <p className="text-[9px] text-slate-200">
                        <strong className="text-slate-400">Speech:</strong> "{sc.voiceover}"
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={importScriptToTimeline}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs py-1.5 rounded font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  Apply All Scenes to Editor
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
