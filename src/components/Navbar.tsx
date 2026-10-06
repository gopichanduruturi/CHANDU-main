import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";
import {
  Sparkles,
  User,
  LogOut,
  FolderOpen,
  Plus,
  Tv,
  Settings,
  HelpCircle,
  Database
} from "lucide-react";
import { AspectRatioType } from "../types";

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenExport: () => void;
  showAdmin: boolean;
  setShowAdmin: (show: boolean) => void;
  isMobileView: boolean;
  onToggleMobileView: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenExport,
  showAdmin,
  setShowAdmin,
  isMobileView,
  onToggleMobileView
}) => {
  const {
    user,
    logout,
    projects,
    activeProject,
    setActiveProject,
    createNewProject,
    togglePremium
  } = useProject();

  const [showProjList, setShowProjList] = useState(false);
  const [showNewProjModal, setShowNewProjModal] = useState(false);
  const [newProjName, setNewProjName] = useState("");
  const [newProjRatio, setNewProjRatio] = useState<AspectRatioType>("16:9");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    createNewProject(newProjName, newProjRatio);
    setShowNewProjModal(false);
    setNewProjName("");
  };

  return (
    <header className="h-14 border-b border-white/10 bg-white/5 backdrop-blur-md px-4 flex items-center justify-between text-white select-none z-40 relative">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="relative group cursor-pointer" onClick={() => setShowAdmin(false)}>
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-75 blur-sm transition duration-300 group-hover:opacity-100"></div>
          <div className="relative flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="font-sans font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
              ClipPro AI
            </span>
          </div>
        </div>

        {/* Project Selector */}
        <div className="relative ml-4">
          <button
            onClick={() => setShowProjList(!showProjList)}
            className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-medium text-slate-300 transition-colors backdrop-blur-md"
          >
            <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
            <span className="max-w-[140px] truncate">
              {activeProject ? activeProject.name : "Loading project..."}
            </span>
          </button>

          {showProjList && (
            <div className="absolute left-0 mt-2 w-64 bg-black/60 border border-white/10 rounded-lg shadow-xl py-2 z-50 animate-fade-in text-slate-200 backdrop-blur-xl">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 border-b border-white/10 flex justify-between items-center">
                <span>Select Workspace</span>
                <button
                  onClick={() => {
                    setShowProjList(false);
                    setShowNewProjModal(true);
                  }}
                  className="p-1 hover:bg-white/10 rounded text-purple-400 flex items-center gap-1 text-[10px]"
                >
                  <Plus className="w-3 h-3" /> New
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto mt-1 scrollbar-thin">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveProject(p);
                      setShowProjList(false);
                      setShowAdmin(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex justify-between items-center hover:bg-white/10 transition-colors ${
                      activeProject?.id === p.id
                        ? "bg-purple-950/40 text-purple-300 font-medium"
                        : "text-slate-300"
                    }`}
                  >
                    <span className="truncate max-w-[160px]">{p.name}</span>
                    <span className="text-[10px] text-slate-500">{p.aspectRatio}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Tabs (Workspace View / System Admin view toggle) */}
      <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 backdrop-blur-md">
        <button
          onClick={() => setShowAdmin(false)}
          className={`px-4 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
            !showAdmin
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
              : "text-white/60 hover:text-white"
          }`}
        >
          Editor Timeline
        </button>
        <button
          onClick={() => setShowAdmin(true)}
          className={`px-4 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            showAdmin
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
              : "text-white/60 hover:text-white"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          Admin Analytics
        </button>
      </div>

      {/* Right Side Controls & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile View Toggle */}
        <button
          onClick={onToggleMobileView}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border flex items-center gap-1.5 backdrop-blur-md ${
            isMobileView
              ? "bg-purple-600/20 text-purple-300 border-purple-500/50"
              : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
          }`}
          title={isMobileView ? "Switch to standard desktop layout" : "Simulate mobile smartphone layout"}
        >
          <span>📱</span>
          <span className="hidden lg:inline">{isMobileView ? "Desktop view" : "Mobile view"}</span>
        </button>

        {/* Credits Status */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          <span className="text-slate-300">
            {user.isPremium ? "Premium" : `${user.credits} Credits`}
          </span>
        </div>

        {/* Subscription Upgrader */}
        <button
          onClick={togglePremium}
          className={`hidden xs:block px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            user.isPremium
              ? "bg-white/5 text-emerald-400 border border-emerald-500/30 backdrop-blur-md"
              : "bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-[1.02] text-white shadow-lg shadow-purple-500/20"
          }`}
        >
          {user.isPremium ? "Pro Activated" : "Upgrade to Pro"}
        </button>

        {/* Export CTA Button */}
        <button
          onClick={onOpenExport}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 sm:px-4 py-1.5 rounded-lg font-medium shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform flex items-center gap-1.5 cursor-pointer"
        >
          <Tv className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* User Account Button */}
        <div className="relative group">
          <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-purple-400 transition-colors backdrop-blur-md">
            <User className="w-4 h-4 text-slate-300" />
          </button>

          {/* User drop down menu */}
          <div className="absolute right-0 mt-2 w-48 bg-black/60 border border-white/10 rounded-lg shadow-xl py-1.5 z-50 hidden group-hover:block animate-fade-in backdrop-blur-xl">
            <div className="px-3.5 py-2 border-b border-white/10">
              <p className="text-xs font-semibold text-slate-200">{user.username}</p>
              <p className="text-[10px] text-slate-500 truncate">
                {user.email || "Offline Guest Mode"}
              </p>
            </div>
            {user.isGuest ? (
              <button
                onClick={onOpenAuth}
                className="w-full text-left px-4 py-2 text-xs hover:bg-white/10 text-purple-400 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5" /> Sign In / Register
              </button>
            ) : (
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-xs hover:bg-white/10 text-rose-400 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
          <div className="bg-slate-900/90 border border-white/10 rounded-xl p-5 max-w-md w-full text-left shadow-2xl relative backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-3">Create ClipPro Project</h3>
            <form onSubmit={handleCreateProject}>
              <div className="mb-4">
                <label className="block text-xs text-slate-400 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="My New Edit..."
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500 backdrop-blur-md"
                />
              </div>

              <div className="mb-5">
                <label className="block text-xs text-slate-400 mb-2">Aspect Ratio Canvas</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { ratio: "16:9", label: "Widescreen (16:9)", desc: "YouTube, PC" },
                    { ratio: "9:16", label: "Portrait (9:16)", desc: "TikTok, Shorts" },
                    { ratio: "1:1", label: "Square (1:1)", desc: "Instagram" },
                    { ratio: "4:3", label: "Standard (4:3)", desc: "Retro Video" }
                  ].map((opt) => (
                    <button
                      key={opt.ratio}
                      type="button"
                      onClick={() => setNewProjRatio(opt.ratio as AspectRatioType)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        newProjRatio === opt.ratio
                          ? "border-purple-500 bg-purple-950/30"
                          : "border-white/10 bg-black/40 hover:bg-white/5 backdrop-blur-md"
                      }`}
                    >
                      <p className="text-xs font-bold text-white">{opt.label}</p>
                      <p className="text-[10px] text-slate-500">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewProjModal(false)}
                  className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-medium transition-colors cursor-pointer border border-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-xs text-white font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                >
                  Launch Editor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
