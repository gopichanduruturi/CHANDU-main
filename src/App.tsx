/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ProjectProvider, useProject } from "./context/ProjectContext";
import { Navbar } from "./components/Navbar";
import { LibraryPanel } from "./components/LibraryPanel";
import { CanvasPlayer } from "./components/CanvasPlayer";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { Timeline } from "./components/Timeline";
import { AdminPanel } from "./components/AdminPanel";
import { AuthModal, ExportModal } from "./components/Modals";
import { FolderPlus, Film, Sliders } from "lucide-react";

function EditorWorkspace() {
  const { selectedClip } = useProject();
  const [showAuth, setShowAuth] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Responsive mobile state
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [forceMobile, setForceMobile] = useState(false);
  const [mobileTab, setMobileTab] = useState<"library" | "timeline" | "properties">("timeline");

  useEffect(() => {
    const checkSize = () => {
      setIsMobileMode(window.innerWidth < 1024);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Automatically switch tab to properties when a clip is selected on mobile
  useEffect(() => {
    if (selectedClip) {
      setMobileTab("properties");
    }
  }, [selectedClip]);

  const activeMobile = isMobileMode || forceMobile;
  const useSimulatedFrame = forceMobile && !isMobileMode;

  const renderMobileContent = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* 1. Mobile Navbar */}
      <Navbar
        onOpenAuth={() => setShowAuth(true)}
        onOpenExport={() => setShowExport(true)}
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
        isMobileView={forceMobile}
        onToggleMobileView={() => setForceMobile(!forceMobile)}
      />

      {/* 2. Main Mobile Editor Stack */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showAdmin ? (
          <div className="flex-1 overflow-y-auto">
            <AdminPanel />
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Part: Video Preview Canvas */}
            <div className="flex-none">
              <CanvasPlayer />
            </div>

            {/* Bottom Part: Responsive Tabbed Panels with Glassmorphism */}
            <div className="flex-1 flex flex-col bg-slate-950/40 overflow-hidden relative border-t border-white/5">
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {mobileTab === "library" && <LibraryPanel />}
                {mobileTab === "timeline" && <Timeline mobile />}
                {mobileTab === "properties" && <PropertiesPanel />}
              </div>

              {/* Bottom Tab Bar Switcher */}
              <div className="flex-none flex border-t border-white/10 bg-slate-950/80 backdrop-blur-xl px-2 py-1.5 justify-around items-center text-slate-400">
                <button
                  onClick={() => setMobileTab("library")}
                  className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                    mobileTab === "library"
                      ? "text-purple-400 bg-purple-500/10"
                      : "hover:text-white"
                  }`}
                >
                  <FolderPlus className="w-4 h-4" />
                  <span className="text-[10px] font-semibold">Library</span>
                </button>

                <button
                  onClick={() => setMobileTab("timeline")}
                  className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                    mobileTab === "timeline"
                      ? "text-purple-400 bg-purple-500/10"
                      : "hover:text-white"
                  }`}
                >
                  <Film className="w-4 h-4" />
                  <span className="text-[10px] font-semibold">Timeline</span>
                </button>

                <button
                  onClick={() => setMobileTab("properties")}
                  className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                    mobileTab === "properties"
                      ? "text-purple-400 bg-purple-500/10"
                      : "hover:text-white"
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-semibold">Properties</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderDesktopContent = () => (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* 1. Global Workspace Header */}
      <Navbar
        onOpenAuth={() => setShowAuth(true)}
        onOpenExport={() => setShowExport(true)}
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
        isMobileView={forceMobile}
        onToggleMobileView={() => setForceMobile(!forceMobile)}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showAdmin ? (
          /* Render full SaaS Analytics & User Database Backoffice */
          <AdminPanel />
        ) : (
          /* Render Active Editor Suite */
          <div className="flex-1 flex overflow-hidden">
            {/* Left Drawer: Asset preset libraries, Sound libraries, AI scripts */}
            <LibraryPanel />

            {/* Center: Live canvas output previewer */}
            <CanvasPlayer />

            {/* Right: Property Inspector of selected timing block */}
            <PropertiesPanel />
          </div>
        )}

        {/* 3. Bottom Multi-Track Professional Editor Timeline */}
        {!showAdmin && <Timeline />}
      </div>
    </div>
  );

  if (useSimulatedFrame) {
    return (
      <div className="h-screen flex flex-col app-radial-gradient overflow-hidden font-sans text-slate-100">
        <div className="flex-1 flex items-center justify-center p-4 bg-slate-950/80 relative">
          {/* Subtle Ambient Glow Effects behind Mockup */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Quick Exit Floating Button */}
          <button
            onClick={() => setForceMobile(false)}
            className="absolute top-4 left-4 bg-white/5 border border-white/10 hover:bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md cursor-pointer transition-all flex items-center gap-2 shadow-lg"
          >
            <span>🖥️</span>
            <span>Exit Simulation</span>
          </button>

          {/* Smartphone Chassis Container with realistic viewport */}
          <div className="w-[390px] h-[780px] bg-slate-900 border-[6px] border-slate-800 rounded-[48px] shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden relative">
            {/* Audio receiver speaker slit decoration */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-zinc-800 rounded-full" />
            </div>

            {/* Render Mobile Interface inside */}
            {renderMobileContent()}
          </div>
        </div>

        {/* Conditionally Render Modals */}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        {showExport && <ExportModal onClose={() => setShowExport(false)} />}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col app-radial-gradient overflow-hidden font-sans text-slate-100">
      {activeMobile ? renderMobileContent() : renderDesktopContent()}

      {/* Conditionally Render Modals */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <EditorWorkspace />
    </ProjectProvider>
  );
}
