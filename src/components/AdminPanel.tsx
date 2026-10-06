import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";
import {
  Users,
  DollarSign,
  TrendingUp,
  Database,
  Search,
  Upload,
  RefreshCw,
  Clock,
  Shield,
  Trash
} from "lucide-react";

export const AdminPanel: React.FC = () => {
  const {
    user,
    addCredits,
    togglePremium,
    adminLogs,
    addAdminLog
  } = useProject();

  const [activeTab, setActiveTab] = useState<"users" | "templates" | "logs">("users");

  // Simulated active user list
  const [enrolledUsers, setEnrolledUsers] = useState([
    { id: "u1", email: "editor.alpha@gmail.com", credits: 45, plan: "Pro Unlimited", date: "2026-06-15" },
    { id: "u2", email: "vlogger_rome@yahoo.com", credits: 12, plan: "Free Tier", date: "2026-07-02" },
    { id: "u3", email: "tech_reviewer_x@outlook.com", credits: 120, plan: "Pro Unlimited", date: "2026-05-30" },
    { id: "u4", email: "23kq1a05d1@pace.ac.in", credits: user.credits, plan: user.isPremium ? "Pro Unlimited" : "Free Tier", date: "Today" }
  ]);

  const [searchVal, setSearchVal] = useState("");

  const handleGrantCredits = (userId: string, amount: number) => {
    setEnrolledUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          addAdminLog(`Granted ${amount} credits to user ${u.email}`);
          return { ...u, credits: u.credits + amount };
        }
        return u;
      })
    );
    // If we're updating ourself
    if (userId === "u4") {
      addCredits(amount);
    }
  };

  const handleTogglePlan = (userId: string) => {
    setEnrolledUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextPlan = u.plan === "Pro Unlimited" ? "Free Tier" : "Pro Unlimited";
          addAdminLog(`Toggled plan for ${u.email} to ${nextPlan}`);
          return { ...u, plan: nextPlan };
        }
        return u;
      })
    );
    // If we are updating ourself
    if (userId === "u4") {
      togglePremium();
    }
  };

  return (
    <div className="flex-1 bg-transparent p-6 overflow-y-auto select-none text-slate-200 animate-fade-in scrollbar-thin">
      {/* Analytics Bento Grid Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Card 1 */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between shadow-lg backdrop-blur-md">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Monthly Revenue (MRR)
            </span>
            <p className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300 mt-1">
              $57,852.00
            </p>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-1 font-mono">
              <TrendingUp className="w-3 h-3" /> +14.2% m/m
            </span>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-400/20 text-purple-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between shadow-lg backdrop-blur-md">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Active Pro Subscribers
            </span>
            <p className="text-2xl font-bold font-mono text-white mt-1">4,821</p>
            <span className="text-[10px] text-blue-400 flex items-center gap-0.5 mt-1 font-mono">
              38.7% conversion
            </span>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-400/20 text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between shadow-lg backdrop-blur-md">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              GPU Render Load
            </span>
            <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">21.4%</p>
            <span className="text-[10px] text-slate-500 flex items-center gap-0.5 mt-1 font-mono">
              6 transcoders live
            </span>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-slate-400">
            <Database className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between shadow-lg backdrop-blur-md">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Gemini API Tokens Used
            </span>
            <p className="text-2xl font-bold font-mono text-white mt-1">2.4M</p>
            <span className="text-[10px] text-purple-400 flex items-center gap-0.5 mt-1 font-mono">
              $0.00 Cost (Sandbox)
            </span>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-400/10 text-purple-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Admin Panel Sub Tabs */}
      <div className="flex border-b border-white/10 mb-5 gap-4">
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-2.5 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "users" ? "text-purple-400 border-b-2 border-purple-500" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          User Account Tiers
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`pb-2.5 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "templates" ? "text-purple-400 border-b-2 border-purple-500" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          Preset Template Uploads
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`pb-2.5 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "logs" ? "text-purple-400 border-b-2 border-purple-500" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          Server Operation Logs
        </button>
      </div>

      {/* TAB CONTENT: USERS LIST */}
      {activeTab === "users" && (
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search user accounts..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-600 backdrop-blur-md"
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-black/40 border-b border-white/10 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="px-4 py-3">Registered User Email</th>
                  <th className="px-4 py-3">Subscription plan</th>
                  <th className="px-4 py-3">AI Credit Balance</th>
                  <th className="px-4 py-3">Joined Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {enrolledUsers
                  .filter((u) => u.email.toLowerCase().includes(searchVal.toLowerCase()))
                  .map((u) => (
                    <tr key={u.id} className="hover:bg-white/10 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-200">{u.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.plan === "Pro Unlimited" ? "bg-purple-950/60 text-purple-400 border border-purple-500/20" : "bg-black/40 text-slate-400 border border-white/5"
                          }`}
                        >
                          {u.id === "u4" ? (user.isPremium ? "Pro Unlimited" : "Free Tier") : u.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{u.id === "u4" ? user.credits : u.credits}</td>
                      <td className="px-4 py-3 text-slate-500">{u.date}</td>
                      <td className="px-4 py-3 text-right flex gap-1.5 justify-end">
                        <button
                          onClick={() => handleGrantCredits(u.id, 25)}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-sans font-bold px-2.5 py-1 rounded text-purple-400 transition-all cursor-pointer"
                        >
                          +25 Credits
                        </button>
                        <button
                          onClick={() => handleTogglePlan(u.id)}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-sans font-bold px-2.5 py-1 rounded text-slate-300 transition-all cursor-pointer"
                        >
                          Toggle Plan
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: TEMPLATES UPLOADER */}
      {activeTab === "templates" && (
        <div className="space-y-4 max-w-xl text-left animate-fade-in">
          <div className="border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer">
            <Upload className="w-10 h-10 text-purple-500 mb-3" />
            <p className="text-xs font-bold text-white mb-1">Drag and drop creative templates (.json, .zip)</p>
            <p className="text-[10px] text-slate-500 max-w-[320px]">
              Specify audio BPM triggers, visual keyframe alignments, and responsive subtitle layouts for CapCut-inspired single-click edits.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
            <h4 className="text-xs font-bold text-white mb-3">Live Active Template Presets</h4>
            <div className="space-y-2">
              {[
                { name: "Cinematic Glow transition preset", downloads: "23,109", status: "Active" },
                { name: "TikTok Widescreen auto-zoom filter", downloads: "45,821", status: "Active" },
                { name: "Ambient Lofi Beat synchronizer", downloads: "11,042", status: "Pending approval" }
              ].map((tmpl, idx) => (
                <div key={idx} className="p-2.5 bg-black/30 border border-white/10 rounded-lg flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-sans font-bold">{tmpl.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{tmpl.downloads} usages</span>
                    <span className="text-purple-400 text-[10px] bg-purple-950 px-1.5 py-0.5 rounded uppercase font-bold">{tmpl.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: LOG FEED */}
      {activeTab === "logs" && (
        <div className="space-y-3 text-left">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-white">Live Operations Log</h4>
            <span className="text-[10px] text-slate-500 animate-pulse flex items-center gap-1">
              <Clock className="w-3 h-3" /> listening live...
            </span>
          </div>

          <div className="bg-black/30 border border-white/10 rounded-xl p-4 h-96 overflow-y-auto font-mono text-[11px] text-purple-300 space-y-1.5 scrollbar-thin backdrop-blur-md">
            {adminLogs.map((log, index) => (
              <div key={index} className="border-b border-white/5 pb-1 flex gap-2">
                <span className="text-slate-600 flex-none">{index + 1}.</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
