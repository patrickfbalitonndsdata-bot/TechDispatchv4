import React from "react";
import { Users, Clock, AlertCircle, Calendar, MapPin, Phone, Wrench, ShieldAlert, CheckCircle2, ChevronRight, Sparkles, ExternalLink } from "lucide-react";
import { TechnicianRoster, WorkOrder, TemplateBranding } from "../types";
import { getPriorityColors, formatMinutes } from "../utils/outlookTemplateGenerator";
import { getTechnicianAirtableLink } from "../utils/technicianRosterDirectory";

interface ScheduleDashboardProps {
  rosters: TechnicianRoster[];
  selectedTechName: string;
  onSelectTech: (name: string) => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  availableDates: string[];
  branding: TemplateBranding;
  onTriggerAiBriefing: (techName: string) => void;
  isAiGenerating: boolean;
}

export const ScheduleDashboard: React.FC<ScheduleDashboardProps> = ({
  rosters,
  selectedTechName,
  onSelectTech,
  selectedDate,
  onSelectDate,
  availableDates = [],
  branding,
  onTriggerAiBriefing,
  isAiGenerating,
}) => {
  const currentRoster = rosters.find((r) => r.technicianName === selectedTechName) || rosters[0];

  // Aggregate Metrics across all technicians for selected date
  const totalJobs = rosters.reduce((acc, r) => acc + r.orders.length, 0);
  const totalUrgent = rosters.reduce((acc, r) => acc + r.urgentCount, 0);
  const totalMinutes = rosters.reduce((acc, r) => acc + r.totalEstimatedMinutes, 0);

  if (rosters.length === 0) {
    return (
      <div className="bg-white border border-[#CFE0B8] rounded-2xl p-12 text-center text-zinc-500 shadow-2xs">
        <Users className="w-10 h-10 text-[#8AA66B]/50 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-[#3F4A33]">No Technician Schedules Available</h3>
        <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1">
          Upload a CSV file or load a sample dataset above to view and generate Outlook schedule emails.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#CFE0B8] rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3F4A33]/70 uppercase tracking-wider">Technicians</span>
            <div className="w-7 h-7 rounded-xl bg-[#EDF3E3] text-[#3F4A33] flex items-center justify-center border border-[#CFE0B8]">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#3F4A33] mt-2">{rosters.length}</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Active field rosters</div>
        </div>

        <div className="bg-white border border-[#CFE0B8] rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3F4A33]/70 uppercase tracking-wider">Total Stops</span>
            <div className="w-7 h-7 rounded-xl bg-[#EDF3E3] text-[#3F4A33] flex items-center justify-center border border-[#CFE0B8]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#3F4A33] mt-2">{totalJobs}</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Scheduled appointments</div>
        </div>

        <div className="bg-white border border-[#CFE0B8] rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3F4A33]/70 uppercase tracking-wider">Urgent Jobs</span>
            <div className={`w-7 h-7 rounded-xl ${totalUrgent > 0 ? "bg-red-50 text-red-600 border border-red-200" : "bg-[#EDF3E3] text-[#3F4A33] border border-[#CFE0B8]"} flex items-center justify-center`}>
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className={`text-2xl font-black mt-2 ${totalUrgent > 0 ? "text-red-600" : "text-[#3F4A33]"}`}>
            {totalUrgent}
          </div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Priority &amp; emergency</div>
        </div>

        <div className="bg-white border border-[#CFE0B8] rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3F4A33]/70 uppercase tracking-wider">Total Work Time</span>
            <div className="w-7 h-7 rounded-xl bg-[#EDF3E3] text-[#8AA66B] flex items-center justify-center border border-[#CFE0B8]">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#3F4A33] mt-2">{formatMinutes(totalMinutes)}</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Estimated on-site hours</div>
        </div>
      </div>

      {/* Date and Technician Selector Bar */}
      <div className="bg-white border border-[#CFE0B8] rounded-2xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#CFE0B8]/40 pb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-[#8AA66B]" />
            <span className="text-xs font-bold text-[#3F4A33] uppercase tracking-wider">Date:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs sm:max-w-md py-1">
              {availableDates.map((date) => (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className={`text-xs font-bold px-3 py-1 rounded-xl transition cursor-pointer ${
                    selectedDate === date
                      ? "bg-[#3F4A33] text-white shadow-xs"
                      : "bg-[#EDF3E3] text-[#3F4A33] hover:bg-[#CFE0B8]"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-zinc-500">
            Viewing: <span className="font-bold text-[#3F4A33]">{currentRoster?.technicianName}</span> ({currentRoster?.orders.length} stops)
          </div>
        </div>

        {/* Technician Tabs Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {rosters.map((roster) => {
            const isSelected = roster.technicianName === selectedTechName;
            return (
              <button
                key={roster.technicianName}
                onClick={() => onSelectTech(roster.technicianName)}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#EDF3E3] border-[#8AA66B] text-[#3F4A33] shadow-xs ring-1 ring-[#8AA66B]/50"
                    : "bg-white border-[#CFE0B8] text-[#3F4A33] hover:border-[#8AA66B] hover:bg-[#FBF7F0]"
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                  isSelected ? "bg-[#8AA66B] text-white" : "bg-[#EDF3E3] text-[#3F4A33]"
                }`}>
                  {roster.technicianName.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-bold text-xs leading-tight">{roster.technicianName}</div>
                  <div className="text-[10px] text-zinc-500 leading-tight">
                    {roster.orders.length} stops &bull; {formatMinutes(roster.totalEstimatedMinutes)}
                  </div>
                </div>
                {roster.urgentCount > 0 && (
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full border border-red-200">
                    {roster.urgentCount} Urgent
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Technician Schedule Details Card */}
      {currentRoster && (
        <div className="bg-white border border-[#CFE0B8] rounded-2xl overflow-hidden shadow-2xs">
          {/* Header Info */}
          <div className="p-4 bg-[#FBF7F0] border-b border-[#CFE0B8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm text-[#3F4A33]">{currentRoster.technicianName}'s Route Roster</h3>
                <span className="text-xs text-[#3F4A33]/70 font-mono">({currentRoster.technicianEmail})</span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                {currentRoster.orders.length} stops scheduled on {currentRoster.date} &bull; Total estimated time: {formatMinutes(currentRoster.totalEstimatedMinutes)}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {/* Airtable View Button */}
              <a
                href={getTechnicianAirtableLink(currentRoster.technicianName, branding.airtableBaseUrl, branding.customTechAirtableLinks)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold bg-white hover:bg-[#EDF3E3] text-[#3F4A33] border border-[#CFE0B8] px-3 py-1.5 rounded-xl shadow-xs transition"
                title={`Open Airtable view for ${currentRoster.technicianName}`}
              >
                <span>Airtable View</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8AA66B]" />
              </a>

              {/* AI Briefing Button */}
              <button
                onClick={() => onTriggerAiBriefing(currentRoster.technicianName)}
                disabled={isAiGenerating}
                className="inline-flex items-center space-x-1.5 text-xs font-bold bg-[#3F4A33] hover:bg-[#2b3323] text-white px-3 py-1.5 rounded-xl shadow-xs transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#CFE0B8]" />
                <span>{isAiGenerating ? "Generating AI Brief..." : currentRoster.aiBriefing ? "Regenerate AI Brief" : "Generate AI Route Brief"}</span>
              </button>
            </div>
          </div>

          {/* AI Briefing Card (if generated) */}
          {currentRoster.aiBriefing && (
            <div className="p-4 bg-[#EDF3E3]/60 border-b border-[#CFE0B8]">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-xl bg-[#8AA66B] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3F4A33] uppercase tracking-wide">
                      AI Morning Route Briefing
                    </span>
                  </div>
                  <p className="text-xs text-[#3F4A33] leading-relaxed">{currentRoster.aiBriefing.briefing}</p>

                  {currentRoster.aiBriefing.safetyAlert && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 font-medium">
                      ⚠️ Safety Focus: {currentRoster.aiBriefing.safetyAlert}
                    </div>
                  )}

                  {currentRoster.aiBriefing.keyHighlights && currentRoster.aiBriefing.keyHighlights.length > 0 && (
                    <div className="text-xs text-zinc-600">
                      <div className="font-bold text-[#3F4A33] text-[11px] mb-1">Key Highlights:</div>
                      <ul className="list-disc list-inside space-y-0.5 text-zinc-600">
                        {currentRoster.aiBriefing.keyHighlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Work Orders List Table */}
          <div className="divide-y divide-[#CFE0B8]/40 overflow-x-auto">
            {currentRoster.orders.map((order, idx) => {
              const pColors = getPriorityColors(order.priority);
              const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.serviceAddress)}`;

              return (
                <div key={order.id} className="p-4 hover:bg-[#FBF7F0]/60 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Column: Index & Time */}
                  <div className="flex items-start space-x-3 md:w-1/4 shrink-0">
                    <div className="w-6 h-6 rounded-lg bg-[#3F4A33] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#3F4A33]">{order.timeSlot}</div>
                      <div className="text-[11px] font-mono text-zinc-500">{order.orderNumber}</div>
                      <div className="mt-1">
                        <span
                          className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: pColors.bg, color: pColors.text, border: `1px solid ${pColors.border}` }}
                        >
                          {order.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Task & Notes */}
                  <div className="md:w-2/5 space-y-1">
                    <div className="text-xs font-bold text-[#3F4A33]">{order.jobType}</div>
                    <p className="text-xs text-zinc-600 line-clamp-2">{order.description}</p>
                    
                    {order.requiredParts && (
                      <div className="text-[11px] text-[#3F4A33] bg-[#EDF3E3] px-2 py-0.5 rounded-md border border-[#CFE0B8] inline-block font-semibold">
                        🔧 {order.requiredParts}
                      </div>
                    )}
                    {order.specialInstructions && (
                      <div className="text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 inline-block font-semibold ml-1">
                        📝 {order.specialInstructions}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Customer & Location */}
                  <div className="md:w-1/3 text-xs space-y-1">
                    <div className="font-bold text-[#3F4A33]">{order.customerName}</div>
                    <div className="text-zinc-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8AA66B] shrink-0" />
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#3F4A33] underline hover:text-[#8AA66B] line-clamp-1 font-medium"
                        title={order.serviceAddress}
                      >
                        {order.serviceAddress}
                      </a>
                    </div>
                    <div className="text-zinc-400 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <a href={`tel:${order.customerPhone}`} className="hover:text-[#3F4A33] font-mono text-zinc-600">
                        {order.customerPhone}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
