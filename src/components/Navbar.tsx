import React from "react";
import {
  Mail,
  Settings,
  History,
  Sparkles,
  ChevronDown,
  LayoutDashboard,
  FileSpreadsheet,
} from "lucide-react";
import { SAMPLE_DATASETS, SampleDataset } from "../utils/sampleData";
import dispatchSealImg from "../assets/images/dispatch_seal_1790100099915.jpg";

interface NavbarProps {
  onLoadSample: (sample: SampleDataset) => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  activeDatasetName?: string;
  totalOrdersCount: number;
  techniciansCount: number;
  activeTab: "dashboard" | "generator" | "history";
  onSelectTab: (tab: "dashboard" | "generator" | "history") => void;
  savedEmailsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLoadSample,
  onOpenSettings,
  onOpenHistory,
  activeDatasetName,
  totalOrdersCount,
  techniciansCount,
  activeTab,
  onSelectTab,
  savedEmailsCount,
}) => {
  const [sampleMenuOpen, setSampleMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#3F4A33]/75 backdrop-blur-md border-b border-[#CFE0B8]/20 text-[#EDF3E3] transition-all duration-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo and Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group select-none transition-transform duration-300 hover:scale-[1.02]"
            onClick={() => onSelectTab("dashboard")}
            title="Go to Dashboard / Landing Page"
          >
            <div className="relative">
              <img
                src={dispatchSealImg}
                alt="Sch TechDispatch Official Logo"
                referrerPolicy="no-referrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-[#CFE0B8]/50 shadow-md ring-2 ring-[#8AA66B]/30 group-hover:ring-[#CFE0B8] transition-all duration-300"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#8AA66B] border-2 border-[#3F4A33] shadow-2xs group-hover:bg-[#CFE0B8] transition-colors" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-sm sm:text-base tracking-tight text-white group-hover:text-[#CFE0B8] transition-colors">
                  Sch TechDispatch
                </span>
                <span className="text-[10px] font-bold bg-[#8AA66B]/30 text-[#EDF3E3] px-2 py-0.5 rounded-full border border-[#CFE0B8]/40">
                  South Central
                </span>
              </div>
              <p className="text-[11px] text-[#EDF3E3]/70 font-medium">
                Field Operations &bull; Outlook Email Generator
              </p>
            </div>
          </div>

          {/* Navigation Links (Center Tabs) - Transparent Labels with Animated Underglow */}
          <nav className="hidden md:flex items-center space-x-3 bg-transparent">
            {/* Dashboard / Home */}
            <button
              type="button"
              onClick={() => onSelectTab("dashboard")}
              className={`group relative flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer bg-transparent hover:-translate-y-0.5 ${
                activeTab === "dashboard"
                  ? "text-white"
                  : "text-[#EDF3E3]/70 hover:text-white"
              }`}
            >
              <LayoutDashboard className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${activeTab === "dashboard" ? "text-[#CFE0B8]" : "text-[#EDF3E3]/60 group-hover:text-[#CFE0B8]"}`} />
              <span>Dashboard</span>
              {/* Animated Underline Indicator */}
              <span
                className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full transition-all duration-300 ${
                  activeTab === "dashboard"
                    ? "bg-[#CFE0B8] scale-x-100 opacity-100 shadow-[0_0_8px_rgba(207,224,184,0.8)]"
                    : "bg-[#8AA66B] scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                }`}
              />
            </button>

            {/* Email Generator */}
            <button
              type="button"
              onClick={() => onSelectTab("generator")}
              className={`group relative flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer bg-transparent hover:-translate-y-0.5 ${
                activeTab === "generator"
                  ? "text-[#CFE0B8]"
                  : "text-[#EDF3E3]/70 hover:text-white"
              }`}
            >
              <Mail className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${activeTab === "generator" ? "text-[#CFE0B8]" : "text-[#EDF3E3]/60 group-hover:text-[#CFE0B8]"}`} />
              <span>Generator</span>
              {techniciansCount > 0 && (
                <span className="bg-[#8AA66B]/40 text-[#EDF3E3] text-[10px] font-black px-1.5 py-0.2 rounded-full border border-[#CFE0B8]/30">
                  {techniciansCount}
                </span>
              )}
              {/* Animated Underline Indicator */}
              <span
                className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full transition-all duration-300 ${
                  activeTab === "generator"
                    ? "bg-[#CFE0B8] scale-x-100 opacity-100 shadow-[0_0_8px_rgba(207,224,184,0.8)]"
                    : "bg-[#8AA66B] scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                }`}
              />
            </button>

            {/* Saved History */}
            <button
              type="button"
              onClick={() => onSelectTab("history")}
              className={`group relative flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer bg-transparent hover:-translate-y-0.5 ${
                activeTab === "history"
                  ? "text-[#CFE0B8]"
                  : "text-[#EDF3E3]/70 hover:text-white"
              }`}
            >
              <History className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${activeTab === "history" ? "text-[#CFE0B8]" : "text-[#EDF3E3]/60 group-hover:text-[#CFE0B8]"}`} />
              <span>Saved History</span>
              {savedEmailsCount > 0 && (
                <span className="bg-[#8AA66B]/40 text-[#EDF3E3] text-[10px] font-black px-1.5 py-0.2 rounded-full border border-[#CFE0B8]/30">
                  {savedEmailsCount}
                </span>
              )}
              {/* Animated Underline Indicator */}
              <span
                className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full transition-all duration-300 ${
                  activeTab === "history"
                    ? "bg-[#CFE0B8] scale-x-100 opacity-100 shadow-[0_0_8px_rgba(207,224,184,0.8)]"
                    : "bg-[#8AA66B] scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                }`}
              />
            </button>
          </nav>

          {/* Right Action Tools - Transparent Label Buttons with Hover Animation */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Sample Datasets Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSampleMenuOpen(!sampleMenuOpen)}
                className="group flex items-center space-x-1.5 text-xs font-bold bg-transparent hover:bg-white/10 text-[#EDF3E3] hover:text-white px-3.5 py-2 rounded-xl border border-[#CFE0B8]/40 hover:border-[#CFE0B8] transition-all duration-300 shadow-xs cursor-pointer hover:-translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#CFE0B8] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="hidden sm:inline">Load Sample CSV</span>
                <ChevronDown className={`w-3 h-3 text-[#EDF3E3]/70 transition-transform duration-300 ${sampleMenuOpen ? "rotate-180 text-white" : "group-hover:translate-y-0.5"}`} />
              </button>

              {sampleMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSampleMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-[#3F4A33] border border-[#CFE0B8]/40 rounded-2xl shadow-2xl z-20 py-2 divide-y divide-[#CFE0B8]/20 animate-in fade-in slide-in-from-top-1 duration-150 backdrop-blur-md">
                    <div className="px-4 py-2 text-[10px] font-bold text-[#CFE0B8] uppercase tracking-wider flex items-center justify-between">
                      <span>Select Industry Template</span>
                      <span className="text-[#8AA66B]">Quick Load</span>
                    </div>
                    {SAMPLE_DATASETS.map((sample) => (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => {
                          onLoadSample(sample);
                          onSelectTab("generator");
                          setSampleMenuOpen(false);
                        }}
                        className="group w-full text-left px-4 py-2.5 bg-transparent hover:bg-white/10 transition-all duration-200 flex flex-col space-y-0.5 cursor-pointer hover:translate-x-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white group-hover:text-[#CFE0B8] transition-colors">{sample.name}</span>
                          <span className="text-[10px] text-[#EDF3E3] bg-[#8AA66B]/30 border border-[#CFE0B8]/30 px-2 py-0.5 rounded-full font-semibold">
                            {sample.category}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#EDF3E3]/70 line-clamp-1">{sample.description}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Branding & Template Settings */}
            <button
              type="button"
              onClick={onOpenSettings}
              title="Branding & Outlook Template Settings"
              className="group flex items-center space-x-1.5 text-xs font-bold bg-transparent hover:bg-white/10 text-[#EDF3E3] hover:text-white px-3.5 py-2 rounded-xl border border-[#CFE0B8]/40 hover:border-[#CFE0B8] transition-all duration-300 shadow-xs cursor-pointer hover:-translate-y-0.5"
            >
              <Settings className="w-3.5 h-3.5 text-[#CFE0B8] transition-transform duration-500 group-hover:rotate-90" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-[#CFE0B8]/20 text-xs">
          <button
            type="button"
            onClick={() => onSelectTab("dashboard")}
            className={`group relative flex items-center space-x-1 py-1.5 px-3 rounded-lg font-bold bg-transparent transition-all duration-200 ${
              activeTab === "dashboard" ? "text-[#CFE0B8]" : "text-[#EDF3E3]/70 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
            <span className={`absolute bottom-0 left-1 right-1 h-0.5 rounded-full bg-[#CFE0B8] transition-transform duration-200 ${activeTab === "dashboard" ? "scale-x-100" : "scale-x-0"}`} />
          </button>
          <button
            type="button"
            onClick={() => onSelectTab("generator")}
            className={`group relative flex items-center space-x-1 py-1.5 px-3 rounded-lg font-bold bg-transparent transition-all duration-200 ${
              activeTab === "generator" ? "text-[#CFE0B8]" : "text-[#EDF3E3]/70 hover:text-white"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Generator</span>
            <span className={`absolute bottom-0 left-1 right-1 h-0.5 rounded-full bg-[#CFE0B8] transition-transform duration-200 ${activeTab === "generator" ? "scale-x-100" : "scale-x-0"}`} />
          </button>
          <button
            type="button"
            onClick={() => onSelectTab("history")}
            className={`group relative flex items-center space-x-1 py-1.5 px-3 rounded-lg font-bold bg-transparent transition-all duration-200 ${
              activeTab === "history" ? "text-[#CFE0B8]" : "text-[#EDF3E3]/70 hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History ({savedEmailsCount})</span>
            <span className={`absolute bottom-0 left-1 right-1 h-0.5 rounded-full bg-[#CFE0B8] transition-transform duration-200 ${activeTab === "history" ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

