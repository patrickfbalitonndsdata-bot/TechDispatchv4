import React from "react";
import {
  Mail,
  Calendar,
  Users,
  History,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Code2,
  Layers,
  Clock,
  FileSpreadsheet,
  Zap,
  Check,
  Send,
  FileText,
  Sliders,
  ChevronRight,
  MapPin,
  Camera,
  FolderGit2,
} from "lucide-react";
import { SampleDataset, SAMPLE_DATASETS } from "../utils/sampleData";
import dispatchHeroBgImg from "../assets/images/dispatch_hero_bg_1790173722242.jpg";
import workflowBannerImg from "../assets/images/operations_workflow_banner_1790098420684.jpg";
import dispatchSealImg from "../assets/images/dispatch_seal_1790100099915.jpg";

interface DashboardLandingProps {
  onGoToGenerator: () => void;
  onGoToHistory: () => void;
  onLoadSample: (sample: SampleDataset) => void;
  totalOrdersCount: number;
  techniciansCount: number;
  savedEmailsCount: number;
  currentFileName?: string;
}

export const DashboardLanding: React.FC<DashboardLandingProps> = ({
  onGoToGenerator,
  onGoToHistory,
  onLoadSample,
  totalOrdersCount,
  techniciansCount,
  savedEmailsCount,
  currentFileName,
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. IMMERSIVE HERO BACKGROUND INTEGRATION (Full-bleed with downward gradient fade into body) */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-6 mb-8 overflow-hidden">
        {/* Background Image with Deep Natural Gradient Overlay fading into page canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={dispatchHeroBgImg}
            alt="Field operations and scheduling workspace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          />
          {/* Radial & directional gradient overlays that dissolve into #FBF7F0 upon scrolling */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-[#3F4A33]/88 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-55% to-[#FBF7F0]" />
        </div>

        {/* Hero Content - Directly integrated on the background without container card */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-32 text-white space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#CFE0B8]/40 text-[#EDF3E3] text-xs font-semibold backdrop-blur-sm shadow-xs">
              <img
                src={dispatchSealImg}
                alt="Sch TechDispatch Official Seal"
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover border border-[#CFE0B8]"
              />
              <span>South Central Weekly Schedule Operations &bull; Outlook Edition</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
            WELCOME TO <span className="text-[#CFE0B8] italic">SCH TECHDISPATCH</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#EDF3E3]/90 font-normal leading-relaxed max-w-2xl drop-shadow-xs">
            The smartest and most reliable dispatch schedule generator for field operations. Convert raw work order CSVs into flawless, production-ready Outlook emails with automated routing, descending revision tracking, and camera audits.
          </p>

          {/* Action Button Row - Transparent Label Illusion with Hover Animations */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onGoToGenerator}
              className="group inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-transparent border-2 border-[#8AA66B] hover:border-[#CFE0B8] text-[#EDF3E3] hover:text-white hover:bg-[#8AA66B]/25 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8AA66B]/25 cursor-pointer active:translate-y-0"
            >
              <Mail className="w-4 h-4 text-[#CFE0B8] transition-transform duration-300 group-hover:scale-110" />
              <span className="tracking-wide">LAUNCH EMAIL GENERATOR</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => {
                const sample = SAMPLE_DATASETS[0];
                if (sample) {
                  onLoadSample(sample);
                  onGoToGenerator();
                }
              }}
              className="group inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-transparent border border-white/35 hover:border-white text-[#EDF3E3] hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:translate-y-0"
            >
              <Zap className="w-4 h-4 text-[#CFE0B8] transition-transform duration-300 group-hover:rotate-12" />
              <span>LOAD SAMPLE DATASET</span>
            </button>

            <button
              type="button"
              onClick={onGoToHistory}
              className="group inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-transparent text-[#CFE0B8] hover:text-white hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <History className="w-4 h-4 text-[#CFE0B8] transition-transform duration-300 group-hover:-rotate-12" />
              <span>Saved History ({savedEmailsCount})</span>
            </button>
          </div>

          {/* Live System Metric Indicators */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-[#EDF3E3]/80">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8AA66B] ring-4 ring-[#8AA66B]/30 animate-pulse" />
              <span>Status: <strong className="text-white">Active System</strong></span>
            </div>
            {currentFileName ? (
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#CFE0B8]" />
                <span>Loaded CSV: <strong className="text-white">{currentFileName}</strong></span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-[#EDF3E3]/60">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>No CSV uploaded yet (Sample data ready)</span>
              </div>
            )}
            {techniciansCount > 0 && (
              <div className="flex items-center space-x-2">
                <Users className="w-3.5 h-3.5 text-[#CFE0B8]" />
                <span><strong className="text-white">{techniciansCount}</strong> Techs &bull; <strong className="text-white">{totalOrdersCount}</strong> Jobs</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. CORE SYSTEM HIGHLIGHTS / PILLARS (Modern circular badges like INTENSE reference) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EDF3E3] border border-[#CFE0B8] text-[#3F4A33] text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8AA66B]" />
            <span>Built For Field Excellence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3F4A33] tracking-tight">
            Take Full Control of Your Field Schedule
          </h2>
          <p className="text-sm text-[#3F4A33]/80 font-normal">
            Everything dispatch managers need to format work orders, communicate real-time revisions, and support field technicians without manual copy-paste errors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Automated CSV Engine */}
          <div className="bg-[#FBF7F0] border border-[#CFE0B8] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#8AA66B] text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#3F4A33] mb-2">Smart Ingestion Engine</h3>
            <p className="text-xs text-[#3F4A33]/80 leading-relaxed mb-4">
              Instantly detects technician schedules, calculates Sunday-to-Saturday and Sunday-to-Sunday work weeks, and groups orders by weekday with priority tagging.
            </p>
            <ul className="space-y-1.5 text-xs text-[#3F4A33]/90">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#8AA66B]" />
                <span>Flexible CSV column mapper</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#8AA66B]" />
                <span>Multi-tech auto-detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#8AA66B]" />
                <span>Sunday-to-Sunday weekend support</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Descending Revision Tracker */}
          <div className="bg-[#EDF3E3] border border-[#CFE0B8] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#3F4A33] text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6 text-[#CFE0B8]" />
            </div>
            <h3 className="text-base font-bold text-[#3F4A33] mb-2">Descending Revision Tracking</h3>
            <p className="text-xs text-[#3F4A33]/80 leading-relaxed mb-4">
              Version updates are neatly stacked in descending order (e.g. v3 active at the top, followed by v2, then v1) with red highlights on added and removed changes.
            </p>
            <ul className="space-y-1.5 text-xs text-[#3F4A33]/90">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#8AA66B]" />
                <span>Manual prior notes input toggle</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#8AA66B]" />
                <span>Auto-fill prior versions v(N-1) to v1</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#8AA66B]" />
                <span>Keyword highlight for added &amp; removed</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Outlook Compatibility */}
          <div className="bg-[#FBF7F0] border border-[#CFE0B8] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#8AA66B] text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#3F4A33] mb-2">100% Outlook Native HTML</h3>
            <p className="text-xs text-[#3F4A33]/80 leading-relaxed mb-4">
              Engineered with Microsoft Word MSO rendering specifications, zero styling breaks across Outlook desktop, Office 365, and mobile apps.
            </p>
            <ul className="space-y-1.5 text-xs text-[#3F4A33]/90">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#8AA66B]" />
                <span>Download native .EML file</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#8AA66B]" />
                <span>Safe manual drag &amp; drop attachments</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#8AA66B]" />
                <span>Yellow banner with high-contrast text</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. SECOND PHOTO BANNER / WORKFLOW SHOWCASE */}
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#CFE0B8]">
        <div className="absolute inset-0">
          <img
            src={workflowBannerImg}
            alt="Field engineering and traffic survey operations"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3F4A33]/95 via-[#3F4A33]/88 to-[#3F4A33]/75" />
        </div>

        <div className="relative z-10 px-6 sm:px-12 py-12 sm:py-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#CFE0B8] uppercase tracking-wider">
              Comprehensive Operations Suite
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Designed For High-Paced South Central Dispatch
            </h2>
            <p className="text-sm text-[#EDF3E3]/90 leading-relaxed">
              From COD school zones to LADOTD highway studies, speed surveys, and weekend teardowns—Sch TechDispatch organizes complex logistics into clear, actionable communications.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3">
                <MapPin className="w-5 h-5 text-[#CFE0B8] mb-1" />
                <h4 className="text-xs font-bold text-white">Route Links</h4>
                <p className="text-[11px] text-[#EDF3E3]/80">Custom Google Maps &amp; Airtable links per technician.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3">
                <Camera className="w-5 h-5 text-[#CFE0B8] mb-1" />
                <h4 className="text-xs font-bold text-white">Photo Portals</h4>
                <p className="text-[11px] text-[#EDF3E3]/80">Integrated South Central field photo upload links.</p>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={onGoToGenerator}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs bg-[#8AA66B] hover:bg-[#7a965c] text-white shadow-md transition cursor-pointer"
              >
                <span>OPEN EMAIL GENERATOR</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Showcase Card with Email Mockup */}
          <div className="bg-[#FBF7F0] text-[#3F4A33] border border-[#CFE0B8] rounded-xl p-5 shadow-2xl space-y-3 font-sans">
            <div className="flex items-center justify-between border-b border-[#CFE0B8] pb-2 text-xs">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8AA66B]" />
                Live Email Template Preview
              </span>
              <span className="text-[10px] bg-[#EDF3E3] text-[#3F4A33] px-2 py-0.5 rounded font-semibold border border-[#CFE0B8]">
                Descending Order
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-medium text-[#3F4A33]/90">Hello Dustin,</p>
              <div className="bg-yellow-300 text-black px-2.5 py-1 rounded font-bold text-xs shadow-2xs">
                UPDATE v3: Schedule is updated. I <span className="text-red-700 font-black">removed</span> nothing
              </div>
              <p className="text-[11px] text-zinc-800">
                UPDATE v2: Schedule is updated. I <span className="text-red-600 font-bold">added</span> kineme
              </p>
              <p className="text-[11px] text-zinc-800">
                UPDATE v1: Schedule is updated. I <span className="text-red-600 font-bold">added</span> nothing
              </p>
              <p className="text-[11px] text-zinc-600 italic pt-1">
                Hope your week is off to a great start. Please see the attached documents and table below...
              </p>
            </div>

            <div className="pt-2 border-t border-[#CFE0B8] flex items-center justify-between text-[11px] text-[#3F4A33]/70">
              <span>Ready for copy to Outlook</span>
              <span className="font-bold text-[#8AA66B]">Zero formatting errors</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW THE APP WORKS (Step-by-step visual workflow) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8AA66B]">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3F4A33]">
            How The Application Works
          </h2>
          <p className="text-xs sm:text-sm text-[#3F4A33]/80">
            A frictionless workflow designed for quick daily and weekly dispatches.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="bg-white border border-[#CFE0B8] rounded-xl p-5 space-y-3 relative shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#EDF3E3] text-[#3F4A33] font-black text-sm flex items-center justify-center border border-[#CFE0B8]">
              01
            </div>
            <h4 className="text-sm font-bold text-[#3F4A33]">Ingest Work Orders</h4>
            <p className="text-xs text-[#3F4A33]/75 leading-relaxed">
              Drag &amp; drop your dispatch CSV or load a pre-configured sample dataset. The mapper automatically correlates columns.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-[#CFE0B8] rounded-xl p-5 space-y-3 relative shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#EDF3E3] text-[#3F4A33] font-black text-sm flex items-center justify-center border border-[#CFE0B8]">
              02
            </div>
            <h4 className="text-sm font-bold text-[#3F4A33]">Select Tech &amp; Week</h4>
            <p className="text-xs text-[#3F4A33]/75 leading-relaxed">
              Choose the target technician from the dropdown. The system automatically partitions daily tasks with durations and notes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-[#CFE0B8] rounded-xl p-5 space-y-3 relative shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#EDF3E3] text-[#3F4A33] font-black text-sm flex items-center justify-center border border-[#CFE0B8]">
              03
            </div>
            <h4 className="text-sm font-bold text-[#3F4A33]">Manage Versions &amp; Notes</h4>
            <p className="text-xs text-[#3F4A33]/75 leading-relaxed">
              Toggle Email Updates for revisions. Input or auto-fill prior version notes in descending order (v3, v2, v1) with live preview.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-[#CFE0B8] rounded-xl p-5 space-y-3 relative shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#8AA66B] text-white font-black text-sm flex items-center justify-center">
              04
            </div>
            <h4 className="text-sm font-bold text-[#3F4A33]">Copy or Download .EML</h4>
            <p className="text-xs text-[#3F4A33]/75 leading-relaxed">
              Click Copy Email Body to paste directly into Outlook with formatting intact, or download the native .EML file for offline sending.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ABOUT DEVELOPERS & SYSTEM ARCHITECTURE */}
      <section className="bg-[#EDF3E3] border border-[#CFE0B8] rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#CFE0B8]">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-[#CFE0B8] text-[#3F4A33] text-xs font-bold">
              <Code2 className="w-3.5 h-3.5 text-[#8AA66B]" />
              <span>Engineering &bull; South Central Operations</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#3F4A33]">
              About the Developers &amp; Mission
            </h3>
            <p className="text-xs sm:text-sm text-[#3F4A33]/85 leading-relaxed">
              Developed by the South Central Field Operations Technology Team. Built specifically to eliminate human errors during dispatch email creation, safeguard technician routing schedules, and maintain transparent version control across all camera and install projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onGoToGenerator}
              className="group inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-transparent border border-[#8AA66B] hover:border-[#3F4A33] text-[#3F4A33] hover:bg-[#8AA66B]/15 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Go to Generator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8AA66B] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Developer Badges & Tech Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-white rounded-xl p-4 border border-[#CFE0B8]/60 space-y-1.5">
            <div className="text-[11px] font-bold text-[#8AA66B] uppercase tracking-wider">Zero Corruption</div>
            <h5 className="text-xs font-bold text-[#3F4A33]">Manual Safe Attachments</h5>
            <p className="text-[11px] text-[#3F4A33]/70">
              Clean file pipeline ensuring job PDFs, maps, and camera rosters are never corrupted during export.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#CFE0B8]/60 space-y-1.5">
            <div className="text-[11px] font-bold text-[#8AA66B] uppercase tracking-wider">Local Privacy</div>
            <h5 className="text-xs font-bold text-[#3F4A33]">Client-Side Processing</h5>
            <p className="text-[11px] text-[#3F4A33]/70">
              All technician CSV data and saved email history stay securely within the dispatcher's local browser environment.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#CFE0B8]/60 space-y-1.5">
            <div className="text-[11px] font-bold text-[#8AA66B] uppercase tracking-wider">Outlook Engine</div>
            <h5 className="text-xs font-bold text-[#3F4A33]">MSO Table Standards</h5>
            <p className="text-[11px] text-[#3F4A33]/70">
              Hand-crafted table widths, Calibri typography, and Microsoft Word rendering conditional rules.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#CFE0B8]/60 space-y-1.5">
            <div className="text-[11px] font-bold text-[#8AA66B] uppercase tracking-wider">Revision Audit</div>
            <h5 className="text-xs font-bold text-[#3F4A33]">Audit Trail History</h5>
            <p className="text-[11px] text-[#3F4A33]/70">
              Instant recall of any previous email sent for any technician in any work week with one-click restore.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="bg-[#3F4A33] text-white rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-xl border border-[#CFE0B8]">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ready to generate this week's technician schedules?
        </h3>
        <p className="text-xs sm:text-sm text-[#EDF3E3]/85 max-w-xl mx-auto">
          Start now by uploading a CSV dispatch file or clicking below to access the email generator workbench.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onGoToGenerator}
            className="group inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-xl font-bold text-sm bg-transparent border-2 border-[#CFE0B8] hover:border-white text-white hover:bg-white/10 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#CFE0B8] transition-transform duration-300 group-hover:scale-110" />
            <span className="tracking-wide">LAUNCH EMAIL GENERATOR</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};
