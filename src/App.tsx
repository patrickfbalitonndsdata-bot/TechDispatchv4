import React, { useState, useMemo, useEffect } from "react";
import {
  Mail,
  Users,
  History,
  Sparkles,
  Calendar,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import {
  WorkOrder,
  ColumnMapping,
  ParseResult,
  TechnicianRoster,
  TemplateBranding,
  TemplateStyle,
  DispatchLogRecord,
  EmailSignaturePresetId,
} from "./types";
import { parseCsvData } from "./utils/csvParser";
import { DEFAULT_BRANDING, cleanTechnicianName } from "./utils/outlookTemplateGenerator";
import { SAMPLE_DATASETS, SampleDataset } from "./utils/sampleData";
import { getStoredGeneratedEmails, GeneratedEmailRecord, LOCAL_STORAGE_KEY_EMAILS, NDS_SAVED_EMAILS_EVENT } from "./utils/generatedEmailStorage";

import { Navbar } from "./components/Navbar";
import { DashboardLanding } from "./components/DashboardLanding";
import { CsvUploadZone } from "./components/CsvUploadZone";
import { OutlookEmailPreview } from "./components/OutlookEmailPreview";
import { ColumnMappingModal } from "./components/ColumnMappingModal";
import { SettingsBrandingModal } from "./components/SettingsBrandingModal";
import { DispatchHistoryModal } from "./components/DispatchHistoryModal";
import { SavedEmailsHistoryTab } from "./components/SavedEmailsHistoryTab";
import { AlgTmcApprovalPanel } from "./components/AlgTmcApprovalPanel";
import { Footer } from "./components/Footer";
import generatorMinimalBanner from "./assets/images/generator_minimal_banner_1790174300845.jpg";

export default function App() {
  // 1. Data & Parsing State
  const [currentCsvText, setCurrentCsvText] = useState<string>("");
  const [currentFileName, setCurrentFileName] = useState<string>("");
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [customMapping, setCustomMapping] = useState<ColumnMapping | null>(null);

  // 2. Selection & View Tab State (default to landing dashboard)
  const [activeTab, setActiveTab] = useState<"dashboard" | "generator" | "history" | "algtmc">("dashboard");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTechName, setSelectedTechName] = useState<string>("");
  const [savedEmailsCount, setSavedEmailsCount] = useState<number>(0);

  // 3. Settings & Styling State
  const [branding, setBranding] = useState<TemplateBranding>(DEFAULT_BRANDING);
  const [currentStyle, setCurrentStyle] = useState<TemplateStyle>("exact_nds_template");

  // 4. Modals State
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // 5. Audit & Dispatch Logs
  const [dispatchLogs, setDispatchLogs] = useState<DispatchLogRecord[]>([]);

  // Update saved emails count on mount and storage change
  const refreshSavedCount = () => {
    try {
      const records = getStoredGeneratedEmails();
      setSavedEmailsCount(records.length);
    } catch {
      setSavedEmailsCount(0);
    }
  };

  useEffect(() => {
    refreshSavedCount();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY_EMAILS) {
        refreshSavedCount();
      }
    };
    const handleCustomUpdate = () => {
      refreshSavedCount();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener(NDS_SAVED_EMAILS_EVENT, handleCustomUpdate);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(NDS_SAVED_EMAILS_EVENT, handleCustomUpdate);
    };
  }, []);

  const loadSampleDataset = (sample: SampleDataset) => {
    setCurrentCsvText(sample.csvContent);
    setCurrentFileName(sample.name);
    const parsed = parseCsvData(sample.csvContent, customMapping || undefined);
    setParseResult(parsed);

    if (parsed.incomingWorkWeek) {
      setSelectedDate(parsed.incomingWorkWeek.sundayDateStr);
    } else if (parsed.detectedDates.length > 0) {
      setSelectedDate(parsed.detectedDates[0]);
    }
    if (parsed.technicians.length > 0) {
      setSelectedTechName(parsed.technicians[0]);
    }
    setActiveTab("generator");
  };

  const handleFileUpload = (text: string, fileName: string) => {
    setCurrentCsvText(text);
    setCurrentFileName(fileName);
    const parsed = parseCsvData(text, customMapping || undefined);
    setParseResult(parsed);

    if (parsed.incomingWorkWeek) {
      setSelectedDate(parsed.incomingWorkWeek.sundayDateStr);
    } else if (parsed.detectedDates.length > 0) {
      setSelectedDate(parsed.detectedDates[0]);
    }
    if (parsed.technicians.length > 0) {
      setSelectedTechName(parsed.technicians[0]);
    }
    setActiveTab("generator");
  };

  const handleSaveMapping = (newMapping: ColumnMapping) => {
    setCustomMapping(newMapping);
    if (currentCsvText) {
      const parsed = parseCsvData(currentCsvText, newMapping);
      setParseResult(parsed);
      if (parsed.incomingWorkWeek) {
        setSelectedDate(parsed.incomingWorkWeek.sundayDateStr);
      } else if (parsed.detectedDates.length > 0 && !parsed.detectedDates.includes(selectedDate)) {
        setSelectedDate(parsed.detectedDates[0]);
      }
      if (parsed.technicians.length > 0 && !parsed.technicians.includes(selectedTechName)) {
        setSelectedTechName(parsed.technicians[0]);
      }
    }
  };

  // Build rosters grouped by technician across all orders for the current file
  const rosters: TechnicianRoster[] = useMemo(() => {
    if (!parseResult || parseResult.orders.length === 0) return [];

    const techMap = new Map<string, WorkOrder[]>();

    parseResult.orders.forEach((ord) => {
      const tech = ord.technicianName || "Unassigned Tech";
      if (!techMap.has(tech)) {
        techMap.set(tech, []);
      }
      techMap.get(tech)!.push(ord);
    });

    const result: TechnicianRoster[] = [];

    techMap.forEach((orders, techName) => {
      const email = orders[0]?.technicianEmail || `${techName.toLowerCase().replace(/[^a-z0-9]/g, ".")}@ndsdata.com`;
      const urgentCount = orders.filter((o) => o.priority === "Urgent").length;
      const highCount = orders.filter((o) => o.priority === "High").length;
      const normalCount = orders.filter((o) => o.priority === "Normal" || o.priority === "Low").length;
      const totalMinutes = orders.reduce((acc, o) => acc + (o.estimatedDurationMin || 60), 0);

      result.push({
        technicianName: techName,
        technicianEmail: email,
        date: selectedDate || new Date().toISOString().split("T")[0],
        orders,
        totalEstimatedMinutes: totalMinutes,
        urgentCount,
        highCount,
        normalCount,
      });
    });

    return result;
  }, [parseResult, selectedDate]);

  const activeRoster = useMemo(() => {
    return rosters.find((r) => r.technicianName === selectedTechName) || rosters[0] || null;
  }, [rosters, selectedTechName]);

  const handleRecordDispatch = (method: any, status: any) => {
    if (!activeRoster) return;
    const newLog: DispatchLogRecord = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      technicianName: activeRoster.technicianName,
      technicianEmail: activeRoster.technicianEmail,
      date: activeRoster.date,
      jobCount: activeRoster.orders.length,
      status: status || "Delivered",
      method: method || "Outlook EML",
      previewSubject: `${activeRoster.technicianName} | Install Schedule`,
      notes: `Manual dispatch via ${method}`,
    };
    setDispatchLogs((prev) => [newLog, ...prev]);
  };

  const toggleAnytime = (val: boolean) => {
    setBranding((prev) => ({ ...prev, useAnytimeTeardowns: val }));
  };

  const toggleLadotd = (val: boolean) => {
    setBranding((prev) => ({ ...prev, ladotdExclusive: val }));
  };

  const toggleCodExclusive = (val: boolean) => {
    setBranding((prev) => ({ ...prev, codExclusive: val }));
  };

  const toggleEmailUpdates = (val: boolean) => {
    setBranding((prev) => ({
      ...prev,
      emailUpdatesEnabled: val,
      // If Email Updates is toggled off, also turn off manual prior versions
      manualPriorVersionsEnabled: val ? prev.manualPriorVersionsEnabled : false,
    }));
  };

  const updateEmailUpdateDetails = (version: number | string, notes: string) => {
    setBranding((prev) => ({ ...prev, updateVersion: version, updateNotes: notes }));
  };

  const toggleManualPriorVersions = (val: boolean) => {
    setBranding((prev) => ({ ...prev, manualPriorVersionsEnabled: val }));
  };

  const updateManualPriorVersions = (
    notes: Array<{ version: number | string; notes: string; text?: string }>
  ) => {
    setBranding((prev) => ({ ...prev, previousUpdateNotes: notes }));
  };

  const toggleAdditionalNotes = (val: boolean) => {
    setBranding((prev) => ({ ...prev, additionalNotesEnabled: val }));
  };

  const updateAdditionalNotes = (notes: Array<{ id: string; day: string; text: string }>) => {
    setBranding((prev) => ({ ...prev, additionalNotes: notes }));
  };

  const toggleSundaySunday = (val: boolean) => {
    setBranding((prev) => ({ ...prev, sundaySundayEnabled: val }));
  };

  const toggleOverlappingSchedules = (val: boolean) => {
    setBranding((prev) => ({ ...prev, overlappingSchedulesEnabled: val }));
  };

  const toggleConductStudy = (val: boolean) => {
    setBranding((prev) => ({ ...prev, conductStudyEnabled: val }));
  };

  const updatePedsConductLines = (lines: any[]) => {
    setBranding((prev) => ({ ...prev, pedsConductLines: lines }));
  };

  const updateDayItemOrderOverrides = (overrides: Record<string, string[]>) => {
    setBranding((prev) => ({ ...prev, dayItemOrderOverrides: overrides }));
  };

  const toggleEmailSignature = (val: boolean) => {
    setBranding((prev) => ({ ...prev, emailSignatureEnabled: val }));
  };

  const selectEmailSignaturePreset = (preset: EmailSignaturePresetId) => {
    setBranding((prev) => ({
      ...prev,
      emailSignaturePreset: preset,
      emailSignatureEnabled: true,
    }));
  };

  const updateBranding = (partial: Partial<TemplateBranding>) => {
    setBranding((prev) => ({ ...prev, ...partial }));
  };

  const handleClearAll = () => {
    setCurrentCsvText("");
    setCurrentFileName("");
    setParseResult(null);
    setSelectedDate("");
    setSelectedTechName("");
    setBranding(DEFAULT_BRANDING);
  };

  const handleSelectTechFromHistory = (techName: string) => {
    // Find matching technician in loaded rosters if possible
    const match = rosters.find(
      (r) => cleanTechnicianName(r.technicianName).toLowerCase() === cleanTechnicianName(techName).toLowerCase()
    );
    if (match) {
      setSelectedTechName(match.technicianName);
    }
    setActiveTab("generator");
  };

  const handleLoadSavedEmailIntoGenerator = (record: GeneratedEmailRecord) => {
    // If the technician exists in the current roster, select them
    const match = rosters.find(
      (r) => cleanTechnicianName(r.technicianName).toLowerCase() === cleanTechnicianName(record.cleanTechName).toLowerCase()
    );
    if (match) {
      setSelectedTechName(match.technicianName);
    }

    // Apply saved branding configurations and notes
    if (record.brandingConfig) {
      setBranding((prev) => ({
        ...prev,
        ...record.brandingConfig,
        additionalNotes: record.additionalNotes || prev.additionalNotes,
        updateNotes: record.notes || record.brandingConfig?.updateNotes || "",
      }));
    } else if (record.additionalNotes) {
      setBranding((prev) => ({
        ...prev,
        additionalNotes: record.additionalNotes || [],
        additionalNotesEnabled: (record.additionalNotes && record.additionalNotes.length > 0) || false,
        updateNotes: record.notes || "",
      }));
    }

    setActiveTab("generator");
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#3F4A33] flex flex-col font-sans selection:bg-[#CFE0B8] selection:text-[#3F4A33]">
      {/* Top Main Navigation */}
      <Navbar
        onLoadSample={loadSampleDataset}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        activeDatasetName={currentFileName}
        totalOrdersCount={parseResult?.orders.length || 0}
        techniciansCount={rosters.length}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        savedEmailsCount={savedEmailsCount}
      />

      {/* Main App Canvas */}
      {activeTab === "dashboard" ? (
        <main className="flex-1 w-full">
          <DashboardLanding
            onGoToGenerator={() => setActiveTab("generator")}
            onGoToHistory={() => setActiveTab("history")}
            onLoadSample={loadSampleDataset}
            totalOrdersCount={parseResult?.orders.length || 0}
            techniciansCount={rosters.length}
            savedEmailsCount={savedEmailsCount}
            currentFileName={currentFileName}
          />
        </main>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* View Mode Navigation Tabs: Generator vs Saved History vs ALG/TMC Approval */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#CFE0B8] pb-1 gap-3">
              <div className="flex items-center space-x-2 -mb-px flex-wrap gap-y-2">
                {/* Tab 1: Email Generator */}
                <button
                  type="button"
                  onClick={() => setActiveTab("generator")}
                  className={`flex items-center space-x-2 py-2.5 px-4 text-xs font-bold border-b-2 transition cursor-pointer ${
                    activeTab === "generator"
                      ? "border-[#8AA66B] text-[#3F4A33] bg-white rounded-t-xl shadow-2xs"
                      : "border-transparent text-[#3F4A33]/70 hover:text-[#3F4A33] hover:border-[#CFE0B8]"
                  }`}
                >
                  <Mail className="w-4 h-4 text-[#8AA66B]" />
                  <span>Email Generator &amp; Preview</span>
                  {rosters.length > 0 && (
                    <span className="bg-[#EDF3E3] text-[#3F4A33] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#CFE0B8]">
                      {rosters.length} Techs
                    </span>
                  )}
                </button>

                {/* Tab 2: Saved History Directory */}
                <button
                  type="button"
                  onClick={() => {
                    refreshSavedCount();
                    setActiveTab("history");
                  }}
                  className={`flex items-center space-x-2 py-2.5 px-4 text-xs font-bold border-b-2 transition cursor-pointer ${
                    activeTab === "history"
                      ? "border-[#3F4A33] text-[#3F4A33] bg-white rounded-t-xl shadow-2xs"
                      : "border-transparent text-[#3F4A33]/70 hover:text-[#3F4A33] hover:border-[#CFE0B8]"
                  }`}
                >
                  <History className="w-4 h-4 text-[#3F4A33]" />
                  <span>Saved Emails History</span>
                  {savedEmailsCount > 0 && (
                    <span className="bg-[#8AA66B] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                      {savedEmailsCount}
                    </span>
                  )}
                </button>

                {/* Tab 3: ALG/TMC Approval */}
                <button
                  type="button"
                  onClick={() => setActiveTab("algtmc")}
                  className={`flex items-center space-x-2 py-2.5 px-4 text-xs font-bold border-b-2 transition cursor-pointer ${
                    activeTab === "algtmc"
                      ? "border-[#8AA66B] text-[#3F4A33] bg-white rounded-t-xl shadow-2xs"
                      : "border-transparent text-[#3F4A33]/70 hover:text-[#3F4A33] hover:border-[#CFE0B8]"
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#8AA66B]" />
                  <span>ALG/TMC Approval</span>
                  <span className="bg-[#8AA66B]/20 text-[#3F4A33] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#8AA66B]/40">
                    PDF Scanner
                  </span>
                </button>
              </div>

              {/* Quick Selectors (Technician & Work Week when multiple scanned) - Generator only */}
              {activeTab === "generator" && (
                <div className="hidden sm:flex items-center space-x-3 text-xs pb-1">
                  {parseResult?.detectedWorkWeeks && parseResult.detectedWorkWeeks.length > 1 && (
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[#3F4A33]/80 font-bold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#8AA66B]" />
                        <span>Work Week:</span>
                      </span>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-[#EDF3E3] border border-[#CFE0B8] text-[#3F4A33] font-bold rounded-xl px-3 py-1.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#8AA66B] shadow-2xs cursor-pointer"
                      >
                        {parseResult.detectedWorkWeeks.map((ww) => (
                          <option key={ww.sundayDateStr} value={ww.sundayDateStr}>
                            {ww.isIncoming ? "👉 [Incoming] " : "[Past/Current] "}
                            {ww.workWeekLabel}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {rosters.length > 0 && (
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[#3F4A33]/80 font-bold flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#8AA66B]" />
                        <span>Technician:</span>
                      </span>
                      <select
                        value={selectedTechName}
                        onChange={(e) => setSelectedTechName(e.target.value)}
                        className="bg-white border border-[#CFE0B8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#3F4A33] focus:outline-hidden focus:ring-2 focus:ring-[#8AA66B] shadow-2xs cursor-pointer"
                      >
                        {rosters.map((r) => (
                          <option key={r.technicianName} value={r.technicianName}>
                            {r.technicianName} ({r.orders.length} stops)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tab Content Display */}
            {activeTab === "generator" && (
              <>
                {/* CSV Ingestion Dropzone - exclusively visible on Generator tab */}
                <CsvUploadZone
                  onFileUpload={handleFileUpload}
                  onLoadSample={loadSampleDataset}
                  parseResult={parseResult}
                  currentFileName={currentFileName}
                  onOpenMappingModal={() => setIsMappingModalOpen(true)}
                  onClearFile={handleClearAll}
                />

                {/* Mobile Selectors */}
                {((parseResult?.detectedWorkWeeks && parseResult.detectedWorkWeeks.length > 1) || rosters.length > 0) && (
                  <div className="flex sm:hidden flex-col gap-2 bg-[#EDF3E3] border border-[#CFE0B8] rounded-xl p-3 text-xs">
                    {parseResult?.detectedWorkWeeks && parseResult.detectedWorkWeeks.length > 1 && (
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#3F4A33] flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#8AA66B]" />
                          <span>Work Week:</span>
                        </span>
                        <select
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="bg-white border border-[#CFE0B8] rounded-xl px-2.5 py-1 text-xs font-bold text-[#3F4A33]"
                        >
                          {parseResult.detectedWorkWeeks.map((ww) => (
                            <option key={ww.sundayDateStr} value={ww.sundayDateStr}>
                              {ww.isIncoming ? "👉 Incoming: " : ""}
                              {ww.workWeekLabel}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {rosters.length > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#3F4A33]">Active Technician:</span>
                        <select
                          value={selectedTechName}
                          onChange={(e) => setSelectedTechName(e.target.value)}
                          className="bg-white border border-[#CFE0B8] rounded-xl px-2.5 py-1 text-xs font-bold text-[#3F4A33]"
                        >
                          {rosters.map((r) => (
                            <option key={r.technicianName} value={r.technicianName}>
                              {r.technicianName} ({r.orders.length} stops)
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {/* Outlook Email Preview & Generator */}
                {activeRoster ? (
                  <OutlookEmailPreview
                    roster={activeRoster}
                    branding={branding}
                    currentStyle={currentStyle}
                    onRecordDispatch={handleRecordDispatch}
                    onToggleAnytime={toggleAnytime}
                    onToggleLadotd={toggleLadotd}
                    onToggleCodExclusive={toggleCodExclusive}
                    onToggleEmailUpdates={toggleEmailUpdates}
                    onUpdateEmailUpdateDetails={updateEmailUpdateDetails}
                    onToggleManualPriorVersions={toggleManualPriorVersions}
                    onUpdateManualPriorVersions={updateManualPriorVersions}
                    onToggleAdditionalNotes={toggleAdditionalNotes}
                    onUpdateAdditionalNotes={updateAdditionalNotes}
                    onToggleSundaySunday={toggleSundaySunday}
                    onToggleOverlappingSchedules={toggleOverlappingSchedules}
                    onToggleConductStudy={toggleConductStudy}
                    onUpdatePedsConductLines={updatePedsConductLines}
                    onUpdateDayItemOrderOverrides={updateDayItemOrderOverrides}
                    onToggleEmailSignature={toggleEmailSignature}
                    onSelectEmailSignaturePreset={selectEmailSignaturePreset}
                    onUpdateBranding={updateBranding}
                    onClearPreview={handleClearAll}
                  />
                ) : (
                  <div className="bg-white border-2 border-[#CFE0B8] rounded-2xl shadow-xs overflow-hidden">
                    {/* Minimalist Graphic Header Banner for empty state */}
                    <div className="relative w-full h-24 sm:h-28 overflow-hidden bg-[#3F4A33] text-white">
                      <div className="absolute inset-0 z-0 pointer-events-none">
                        <img
                          src={generatorMinimalBanner}
                          alt="Outlook Generator Banner"
                          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#3F4A33] via-[#3F4A33]/85 to-[#3F4A33]/45" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3F4A33] via-transparent to-transparent" />
                      </div>
                      <div className="relative z-10 px-6 h-full flex flex-col justify-center">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#CFE0B8]">
                          Outlook Email Generator Workstation
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                          Technician Weekly Dispatch Engine
                        </h2>
                      </div>
                    </div>

                    <div className="p-8 sm:p-12 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-[#EDF3E3] border border-[#CFE0B8] flex items-center justify-center mx-auto mb-3 shadow-xs">
                        <Mail className="w-6 h-6 text-[#3F4A33]" />
                      </div>
                      <h3 className="text-base font-extrabold text-[#3F4A33] mb-1">
                        No technician schedule currently loaded
                      </h3>
                      <p className="text-xs text-[#3F4A33]/70 max-w-md mx-auto mb-5 leading-relaxed">
                        Upload your dispatch CSV in the upload section above, or load one of the built-in sample rosters below to preview the formatted Outlook email schedule.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const sample = SAMPLE_DATASETS[0];
                          if (sample) loadSampleDataset(sample);
                        }}
                        className="group inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs bg-transparent border-2 border-[#8AA66B] hover:border-[#3F4A33] text-[#3F4A33] hover:bg-[#8AA66B]/15 shadow-xs transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#8AA66B] group-hover:scale-110 transition-transform" />
                        <span>Load Sample Technician Schedule</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Saved History Tab View - direct and distraction-free */}
            {activeTab === "history" && (
              <SavedEmailsHistoryTab
                activeTechName={activeRoster?.technicianName}
                onSelectTechInGenerator={handleSelectTechFromHistory}
                onLoadSavedEmailIntoGenerator={handleLoadSavedEmailIntoGenerator}
              />
            )}

            {/* ALG/TMC Approval Tab View - direct and distraction-free */}
            {activeTab === "algtmc" && (
              <div className="space-y-4">
                <AlgTmcApprovalPanel />
              </div>
            )}
        </main>
      )}

      {/* Global Application Footer */}
      <Footer
        onGoToDashboard={() => setActiveTab("dashboard")}
        onGoToGenerator={() => setActiveTab("generator")}
        onGoToHistory={() => {
          refreshSavedCount();
          setActiveTab("history");
        }}
        onGoToAlgTmc={() => setActiveTab("algtmc")}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenAuditLogs={() => setIsHistoryModalOpen(true)}
        savedEmailsCount={savedEmailsCount}
        totalOrdersCount={parseResult?.orders.length || 0}
        techniciansCount={rosters.length}
      />

      {/* Column Mapping Modal */}
      {parseResult && (
        <ColumnMappingModal
          isOpen={isMappingModalOpen}
          onClose={() => setIsMappingModalOpen(false)}
          headers={parseResult.headers}
          currentMapping={parseResult.mapping}
          sampleRows={parseResult.rawRows}
          onSaveMapping={handleSaveMapping}
        />
      )}

      {/* Settings & Branding Modal */}
      <SettingsBrandingModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        branding={branding}
        onSaveBranding={(newB) => setBranding(newB)}
      />

      {/* Dispatch History Audit Modal */}
      <DispatchHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        logs={dispatchLogs}
        onClearLogs={() => setDispatchLogs([])}
      />
    </div>
  );
}
