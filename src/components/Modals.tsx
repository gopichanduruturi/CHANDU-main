import React, { useState, useEffect } from "react";
import { useProject } from "../context/ProjectContext";
import {
  X,
  Sparkles,
  UserCheck,
  Cpu,
  Tv,
  Check,
  Download,
  ShieldCheck,
  ArrowRight,
  ShieldAlert
} from "lucide-react";

interface ModalProps {
  onClose: () => void;
}

// 1. AUTHENTICATION MODAL
export const AuthModal: React.FC<ModalProps> = ({ onClose }) => {
  const { loginGuest, loginUser, user } = useProject();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginUser(email);
      setLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  const handleOAuthLogin = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      loginUser(`oauth.${provider.toLowerCase()}@clippro.ai`);
      setLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md">
      <div className="bg-black/40 border border-white/10 rounded-2xl p-6 max-w-sm w-full relative shadow-2xl animate-scale-up text-left text-slate-200 backdrop-blur-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-3 animate-fade-in">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-400/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-sm font-bold text-white">ClipPro Authorization Granted</h3>
            <p className="text-[11px] text-slate-400">Welcome back, {user.username}. Workspace unlocked!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-base font-bold text-white">Unlock ClipPro AI</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Access unlimited multi-track layers, 4K exports, and Gemini AI.
              </p>
            </div>

            {/* Direct Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[9px] text-slate-400 uppercase font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. editor@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-purple-600 backdrop-blur-md"
                />
              </div>
              <div>
                <label className="block text-[9px] text-slate-400 uppercase font-semibold mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-purple-600 backdrop-blur-md"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 disabled:opacity-50 text-xs font-bold text-white rounded cursor-pointer transition-opacity"
              >
                {loading ? "Authenticating..." : "Sign In with Password"}
              </button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-3 text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Or Connect via</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* OAuth buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleOAuthLogin("Google")}
                disabled={loading}
                className="py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 rounded text-[10px] font-bold text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer transition-all backdrop-blur-md"
              >
                Google Auth
              </button>
              <button
                onClick={() => handleOAuthLogin("Apple")}
                disabled={loading}
                className="py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 rounded text-[10px] font-bold text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer transition-all backdrop-blur-md"
              >
                Apple SDK
              </button>
            </div>

            <button
              onClick={() => {
                loginGuest();
                onClose();
              }}
              className="w-full text-center text-[10px] text-slate-500 hover:text-slate-300 transition-colors pt-2 block cursor-pointer"
            >
              Continue in Guest Sandbox Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


// 2. EXPORT & TRANSCODE VIDEO MODAL
export const ExportModal: React.FC<ModalProps> = ({ onClose }) => {
  const { user, addAdminLog } = useProject();

  const [res, setRes] = useState("1080p");
  const [fps, setFps] = useState("60");
  const [format, setFormat] = useState("mp4");
  const [hevc, setHevc] = useState(true);

  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [exportComplete, setExportComplete] = useState(false);

  const steps = [
    "Assembling multi-track visual timeline assets...",
    "Blending layered vector filters and shaders...",
    "Transcoding video stream with accelerated GPU pipeline...",
    "Multiplexing audio levels and sound effects...",
    "Stitching timed typography auto-subtitles...",
    "Verifying container encapsulation (HEVC)...",
    "Finalizing ClipPro AI output package!"
  ];

  const handleExport = () => {
    setIsExporting(true);
    setProgress(0);
    setExportComplete(false);
    addAdminLog(`Initiated render: Target: ${res} @ ${fps}FPS, container: ${format.toUpperCase()}`);

    let currentStep = 0;
    setStatusText(steps[currentStep]);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;

        // update status text based on milestones
        const stepIndex = Math.floor((next / 100) * steps.length);
        if (stepIndex !== currentStep && stepIndex < steps.length) {
          currentStep = stepIndex;
          setStatusText(steps[currentStep]);
        }

        if (next >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setExportComplete(true);
          addAdminLog(`Render successfully compiled and download compiled.`);
          return 100;
        }
        return next;
      });
    }, 150);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md">
      <div className="bg-black/40 border border-white/10 rounded-2xl p-6 max-w-md w-full relative shadow-2xl animate-scale-up text-left text-slate-200 backdrop-blur-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-1.5">
          <Cpu className="w-5 h-5 text-purple-400" />
          Export Render Pipeline
        </h3>
        <p className="text-[11px] text-slate-400 mb-4">
          Convert your creative tracks into optimized video container formats.
        </p>

        {isExporting ? (
          <div className="py-6 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-purple-400 animate-pulse">{statusText}</span>
              <span className="font-mono text-slate-400 font-bold">{progress}%</span>
            </div>
            {/* Progress line */}
            <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden border border-white/10 backdrop-blur-md">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 text-center italic">
              Leveraging GPU hardware accelerated rendering
            </p>
          </div>
        ) : exportComplete ? (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-400/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Rendering Transcode Complete!</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Your clip has been output at {res} • {fps}FPS • {format.toUpperCase()}
              </p>
            </div>
            <button
              onClick={() => {
                alert("Simulating file package download! The compiled MP4 is ready in your browser storage.");
                onClose();
              }}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-90 text-white text-xs py-2 rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              <Download className="w-4 h-4" />
              Download Rendered {format.toUpperCase()} File
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Configuration selection */}
            <div className="grid grid-cols-3 gap-2">
              {/* Res */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-semibold text-slate-400">Resolution</label>
                <select
                  value={res}
                  onChange={(e) => setRes(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-200 backdrop-blur-md"
                >
                  <option value="720p">HD 720p</option>
                  <option value="1080p">FHD 1080p</option>
                  {user.isPremium ? (
                    <>
                      <option value="2K">2K Quad-HD</option>
                      <option value="4K">4K Ultra-HD</option>
                    </>
                  ) : (
                    <>
                      <option value="2K" disabled>2K (Pro required)</option>
                      <option value="4K" disabled>4K (Pro required)</option>
                    </>
                  )}
                </select>
              </div>

              {/* FPS */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-semibold text-slate-400">Frame Rate</label>
                <select
                  value={fps}
                  onChange={(e) => setFps(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-200 backdrop-blur-md"
                >
                  <option value="30">30 FPS</option>
                  <option value="60">60 FPS Smooth</option>
                  {user.isPremium ? (
                    <option value="120">120 FPS High-Hz</option>
                  ) : (
                    <option value="120" disabled>120 FPS (Pro)</option>
                  )}
                </select>
              </div>

              {/* FORMAT */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-semibold text-slate-400">Container</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-200 backdrop-blur-md"
                >
                  <option value="mp4">MP4 H.264</option>
                  <option value="mov">MOV ProRES</option>
                  <option value="gif">Animated GIF</option>
                </select>
              </div>
            </div>

            {/* HEVC and GPU acceleration options */}
            <div className="p-3 bg-black/20 border border-white/5 rounded-lg space-y-2 backdrop-blur-md">
              <label className="flex items-center justify-between text-xs text-slate-300 font-medium cursor-pointer">
                <span>HEVC Hardware Acceleration</span>
                <input
                  type="checkbox"
                  checked={hevc}
                  onChange={(e) => setHevc(e.target.checked)}
                  className="accent-purple-500 rounded"
                />
              </label>
              <p className="text-[9px] text-slate-500 leading-normal">
                Significantly reduces compiled file size while maintaining pristine visual color values. Compatible with Nvidia NVENC and Apple Silicon cores.
              </p>
            </div>

            {!user.isPremium && (res === "2K" || res === "4K") && (
              <div className="p-3 bg-purple-500/10 border border-purple-400/20 rounded-lg flex items-start gap-2 text-[10px] text-purple-300 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>You selected a 4K/2K resolution. This requires a **Premium Subscription**. Upgrade to Pro using the header CTA.</span>
              </div>
            )}

            <button
              onClick={handleExport}
              disabled={!user.isPremium && (res === "2K" || res === "4K")}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              Initiate Cloud Transcode Pipeline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
