import React from "react";
import {
  Mail,
  Calendar,
  History,
  Settings,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  MapPin,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import dispatchSealImg from "../assets/images/dispatch_seal_1790100099915.jpg";

interface FooterProps {
  onGoToDashboard: () => void;
  onGoToGenerator: () => void;
  onGoToHistory: () => void;
  onOpenSettings: () => void;
  onOpenAuditLogs: () => void;
  savedEmailsCount?: number;
  totalOrdersCount?: number;
  techniciansCount?: number;
}

export const Footer: React.FC<FooterProps> = ({
  onGoToDashboard,
  onGoToGenerator,
  onGoToHistory,
  onOpenSettings,
  onOpenAuditLogs,
  savedEmailsCount = 0,
  totalOrdersCount = 0,
  techniciansCount = 0,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-[#3F4A33] text-[#EDF3E3] border-t border-[#CFE0B8]/40 relative overflow-hidden font-sans">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8AA66B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#CFE0B8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#CFE0B8]/20">
          
          {/* Column 1 & 2: Brand, Seal, & Platform Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="relative">
                <img
                  src={dispatchSealImg}
                  alt="Sch TechDispatch Official Seal"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border border-[#CFE0B8]/40 shadow-md ring-2 ring-[#8AA66B]/30"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#8AA66B] border-2 border-[#3F4A33]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-lg font-black tracking-tight text-white">
                    Sch TechDispatch
                  </span>
                  <span className="text-[10px] bg-[#8AA66B]/30 text-[#EDF3E3] font-bold px-2 py-0.5 rounded-full border border-[#CFE0B8]/30">
                    South Central
                  </span>
                </div>
                <p className="text-xs text-[#EDF3E3]/70 font-medium">
                  Field Operations &bull; Weekly Outlook Schedule System
                </p>
              </div>
            </div>

            <p className="text-xs text-[#EDF3E3]/80 leading-relaxed max-w-sm">
              Mission-critical dispatch and schedule compilation platform engineered for South Central field technicians. Transforms complex work order datasets into standardized, high-deliverability Outlook HTML emails with descending revision control and camera verification audits.
            </p>

            {/* Operational Status Pill */}
            <div className="flex items-center space-x-3 pt-1">
              <div className="inline-flex items-center space-x-2 bg-[#8AA66B]/20 border border-[#CFE0B8]/30 px-3 py-1.5 rounded-xl text-xs">
                <span className="w-2 h-2 rounded-full bg-[#8AA66B] animate-pulse" />
                <span className="text-[#EDF3E3] font-semibold text-[11px]">System Status: Operational</span>
              </div>
              {techniciansCount > 0 && (
                <div className="text-[11px] text-[#CFE0B8]/80 font-mono">
                  {techniciansCount} Techs &bull; {totalOrdersCount} Stops Loaded
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#CFE0B8] uppercase tracking-wider flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#8AA66B]" />
              <span>Platform Modules</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onGoToDashboard}
                  className="group text-[#EDF3E3]/80 hover:text-white transition-all duration-200 flex items-center space-x-1.5 cursor-pointer text-left bg-transparent border-0 p-0 transform hover:translate-x-1"
                >
                  <span className="relative">
                    Operations Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CFE0B8] transition-all duration-300 group-hover:w-full" />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onGoToGenerator}
                  className="group text-[#EDF3E3]/80 hover:text-white transition-all duration-200 flex items-center space-x-1.5 cursor-pointer text-left bg-transparent border-0 p-0 transform hover:translate-x-1"
                >
                  <Mail className="w-3 h-3 text-[#8AA66B] group-hover:scale-110 transition-transform" />
                  <span className="relative">
                    Outlook Email Generator
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CFE0B8] transition-all duration-300 group-hover:w-full" />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onGoToHistory}
                  className="group text-[#EDF3E3]/80 hover:text-white transition-all duration-200 flex items-center space-x-1.5 cursor-pointer text-left bg-transparent border-0 p-0 transform hover:translate-x-1"
                >
                  <History className="w-3 h-3 text-[#CFE0B8] group-hover:rotate-45 transition-transform" />
                  <span className="relative">
                    Saved Emails History ({savedEmailsCount})
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CFE0B8] transition-all duration-300 group-hover:w-full" />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="group text-[#EDF3E3]/80 hover:text-white transition-all duration-200 flex items-center space-x-1.5 cursor-pointer text-left bg-transparent border-0 p-0 transform hover:translate-x-1"
                >
                  <Settings className="w-3 h-3 text-[#8AA66B] group-hover:rotate-90 transition-transform duration-300" />
                  <span className="relative">
                    Branding &amp; Template Settings
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CFE0B8] transition-all duration-300 group-hover:w-full" />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAuditLogs}
                  className="group text-[#EDF3E3]/80 hover:text-white transition-all duration-200 flex items-center space-x-1.5 cursor-pointer text-left bg-transparent border-0 p-0 transform hover:translate-x-1"
                >
                  <FileSpreadsheet className="w-3 h-3 text-[#CFE0B8] group-hover:scale-110 transition-transform" />
                  <span className="relative">
                    Dispatch Audit Trail
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CFE0B8] transition-all duration-300 group-hover:w-full" />
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#CFE0B8] uppercase tracking-wider flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8AA66B]" />
              <span>South Central Specs</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#EDF3E3]/80">
              <li className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AA66B] shrink-0 mt-0.5" />
                <span>City of Dallas PEDS &amp; Sight Distance Support</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AA66B] shrink-0 mt-0.5" />
                <span>LADOTD Special Project State Format</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AA66B] shrink-0 mt-0.5" />
                <span>Airtable Individual Technician Route Sync</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AA66B] shrink-0 mt-0.5" />
                <span>ALG / TMC Multi-Project Approvals</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AA66B] shrink-0 mt-0.5" />
                <span>Sunday-to-Sunday 8-Day Week Support</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Compliance & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#CFE0B8] uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8AA66B]" />
              <span>Compliance &amp; Data</span>
            </h4>
            <div className="space-y-2 text-xs text-[#EDF3E3]/80">
              <div className="bg-[#EDF3E3]/5 border border-[#CFE0B8]/20 rounded-xl p-2.5 space-y-1">
                <div className="font-bold text-white text-[11px] flex items-center space-x-1">
                  <Cpu className="w-3 h-3 text-[#8AA66B]" />
                  <span>100% In-Browser Privacy</span>
                </div>
                <p className="text-[10px] text-[#EDF3E3]/70 leading-normal">
                  No CSV or technician customer data is transmitted to external servers. All processing runs entirely on client runtime.
                </p>
              </div>

              <div className="bg-[#EDF3E3]/5 border border-[#CFE0B8]/20 rounded-xl p-2.5 space-y-1">
                <div className="font-bold text-white text-[11px] flex items-center space-x-1">
                  <Mail className="w-3 h-3 text-[#8AA66B]" />
                  <span>Outlook HTML Standard</span>
                </div>
                <p className="text-[10px] text-[#EDF3E3]/70 leading-normal">
                  Strict inline CSS styles ensure 100% layout fidelity across Outlook 2016, 2019, 2021, and Office 365 Web.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Subtle Watermark Developer Credit */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Copyright Notice */}
          <div className="text-[#EDF3E3]/70 text-center sm:text-left space-y-0.5">
            <p className="font-medium">
              &copy; {currentYear} <strong className="text-white">Sch TechDispatch</strong>. All rights reserved.
            </p>
            <p className="text-[11px] text-[#EDF3E3]/50">
              South Central Field Operations &bull; Dallas &bull; Houston &bull; Austin &bull; San Antonio &bull; Louisiana
            </p>
          </div>

          {/* Watermark-Style Developer Credit (unobtrusive, elegant, and low-opacity) */}
          <div className="flex items-center space-x-2">
            <div
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md border border-[#CFE0B8]/15 bg-[#CFE0B8]/5 opacity-35 hover:opacity-75 transition-all duration-300 select-none group cursor-default"
              title="Application Developer Credit"
            >
              <Code2 className="w-3 h-3 text-[#CFE0B8]/60 group-hover:text-[#CFE0B8]" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#CFE0B8]/80 group-hover:text-white">
                Dev: Patrick Franz O. B.
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
