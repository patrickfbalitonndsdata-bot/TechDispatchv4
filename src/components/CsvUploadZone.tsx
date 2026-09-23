import React, { useRef, useState, useEffect } from "react";
import { UploadCloud, FileSpreadsheet, Sparkles, Check, AlertTriangle, ArrowRight, RefreshCw, Layers, Trash2, X, FileText, CheckCircle2 } from "lucide-react";
import { ColumnMapping, ParseResult } from "../types";
import { SAMPLE_DATASETS, SampleDataset } from "../utils/sampleData";
import csvUploadIllustration from "../assets/images/csv_upload_illustration_1790174280758.jpg";

interface CsvUploadZoneProps {
  onFileUpload: (fileContent: string, fileName: string) => void;
  onLoadSample: (sample: SampleDataset) => void;
  parseResult: ParseResult | null;
  currentFileName: string;
  onOpenMappingModal: () => void;
  onClearFile?: () => void;
}

export const CsvUploadZone: React.FC<CsvUploadZoneProps> = ({
  onFileUpload,
  onLoadSample,
  parseResult,
  currentFileName,
  onOpenMappingModal,
  onClearFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Reset native file input if the current file name was cleared
  useEffect(() => {
    if (!currentFileName && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [currentFileName]);

  const handleFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        onFileUpload(text, file.name);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onClearFile) {
      onClearFile();
    }
  };

  return (
    <div className="bg-[#FBF7F0] border-2 border-[#CFE0B8] rounded-2xl p-5 shadow-xs transition-all relative overflow-hidden">
      {/* Hidden native file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFile(e.target.files[0]);
          }
        }}
        accept=".csv,text/csv,text/plain"
        className="hidden"
      />

      {/* Main Dropzone Container */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-dashed ${
          isDragging
            ? "border-[#8AA66B] bg-[#EDF3E3] shadow-md ring-4 ring-[#8AA66B]/20"
            : currentFileName
            ? "border-[#8AA66B]/60 bg-[#EDF3E3]/40 hover:border-[#8AA66B] hover:bg-[#EDF3E3]/70"
            : "border-[#8AA66B]/70 bg-white hover:border-[#3F4A33] hover:shadow-xs"
        }`}
      >
        {!currentFileName ? (
          /* Empty State: Unmistakable graphical upload station */
          <div className="p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: 3D Illustration & Headline */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              {/* Graphical Upload Illustration Thumbnail */}
              <div className="relative group shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#CFE0B8] shadow-md bg-[#EDF3E3] p-1 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
                  <img
                    src={csvUploadIllustration}
                    alt="Upload Technician Dispatch CSV"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {/* Floating Upload Icon Badge */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#3F4A33] border-2 border-white text-white flex items-center justify-center shadow-md">
                  <UploadCloud className="w-4 h-4 text-[#CFE0B8]" />
                </div>
              </div>

              {/* Text & Guidance */}
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8AA66B]/20 border border-[#8AA66B]/40 text-[#3F4A33] text-[10px] font-extrabold uppercase tracking-wider">
                  <UploadCloud className="w-3 h-3 text-[#8AA66B]" />
                  <span>STEP 1 • CSV DISPATCH INGESTION</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#3F4A33] tracking-tight">
                  Upload Technician Dispatch CSV Schedule
                </h3>
                <p className="text-xs text-[#3F4A33]/75 max-w-lg leading-relaxed">
                  Drag &amp; drop your <span className="font-bold text-[#3F4A33]">.csv</span> file here, or click to browse. Automatically extracts technicians, project numbers, scheduled times, and work orders.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-[#3F4A33]/70 font-semibold">
                  <span className="bg-[#EDF3E3] border border-[#CFE0B8] px-2 py-0.5 rounded-md">.CSV Format</span>
                  <span className="bg-[#EDF3E3] border border-[#CFE0B8] px-2 py-0.5 rounded-md">Airtable Export</span>
                  <span className="bg-[#EDF3E3] border border-[#CFE0B8] px-2 py-0.5 rounded-md">Excel Schedule</span>
                </div>
              </div>
            </div>

            {/* Right: Browse Button & Quick Samples */}
            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                className="group w-full md:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs bg-transparent border-2 border-[#8AA66B] hover:border-[#3F4A33] text-[#3F4A33] hover:bg-[#8AA66B]/15 shadow-xs transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-[#8AA66B] group-hover:text-[#3F4A33] transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span className="tracking-wide">Select CSV File</span>
              </button>

              <div className="text-[11px] text-[#3F4A33]/70 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8AA66B]" />
                <span>Or load sample:</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const sample = SAMPLE_DATASETS[0];
                    if (sample) onLoadSample(sample);
                  }}
                  className="font-bold text-[#3F4A33] underline hover:text-[#8AA66B] cursor-pointer"
                >
                  3 Techs
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const sample = SAMPLE_DATASETS.find((s) => s.id === "dallas-cod") || SAMPLE_DATASETS[1];
                    if (sample) onLoadSample(sample);
                  }}
                  className="font-bold text-[#3F4A33] underline hover:text-[#8AA66B] cursor-pointer"
                >
                  COD
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Active File State: Clear confirmation with graphical thumbnail */
          <div className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Left: Graphical thumbnail + File statistics */}
            <div className="flex items-center space-x-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-[#8AA66B] shadow-xs bg-white p-0.5">
                  <img
                    src={csvUploadIllustration}
                    alt="Active CSV Schedule"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#8AA66B] border-2 border-white text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3 h-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm sm:text-base font-extrabold text-[#3F4A33] tracking-tight">
                    {currentFileName}
                  </span>
                  <span className="text-[10px] font-extrabold bg-[#8AA66B]/25 text-[#3F4A33] border border-[#8AA66B]/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-[#3F4A33]" /> Active Schedule
                  </span>
                </div>
                <p className="text-xs text-[#3F4A33]/75 mt-0.5">
                  {parseResult && parseResult.orders.length > 0 ? (
                    <span className="font-semibold">
                      <strong className="text-[#3F4A33]">{parseResult.orders.length}</strong> work orders parsed across{" "}
                      <strong className="text-[#3F4A33]">{parseResult.technicians.length}</strong> technician roster
                      {parseResult.technicians.length === 1 ? "" : "s"}
                    </span>
                  ) : (
                    "Schedule file loaded and validated"
                  )}
                </p>
                <p className="text-[11px] text-[#3F4A33]/60 mt-0.5">
                  Click to replace or drop another CSV anytime.
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              {parseResult && parseResult.orders.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenMappingModal();
                  }}
                  className="group flex items-center space-x-1.5 text-xs font-bold bg-transparent hover:bg-white text-[#3F4A33] px-3.5 py-2 rounded-xl border border-[#CFE0B8] hover:border-[#8AA66B] transition-all duration-300 shadow-2xs cursor-pointer transform hover:-translate-y-0.5"
                  title="Inspect or tweak CSV column field mappings"
                >
                  <Layers className="w-3.5 h-3.5 text-[#8AA66B] group-hover:scale-110 transition-transform duration-300" />
                  <span>Column Mapping ({Object.values(parseResult.mapping).filter(Boolean).length}/12)</span>
                </button>
              )}

              {onClearFile && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="group text-xs font-bold bg-transparent hover:bg-red-50 text-[#3F4A33] hover:text-red-700 border border-transparent hover:border-red-300 px-3 py-2 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
                  title="Remove uploaded CSV and clear data"
                >
                  <Trash2 className="w-3.5 h-3.5 text-[#3F4A33]/70 group-hover:text-red-600 transition-colors" />
                  <span>Clear</span>
                </button>
              )}

              <button
                type="button"
                className="group text-xs font-bold bg-transparent border-2 border-[#8AA66B] hover:border-[#3F4A33] text-[#3F4A33] hover:bg-[#8AA66B]/15 px-4 py-2 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <UploadCloud className="w-3.5 h-3.5 text-[#8AA66B] group-hover:text-[#3F4A33] transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>Replace CSV</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Warnings & Suggestions Banner */}
      {parseResult && parseResult.orders.length > 0 && parseResult.warnings.length > 0 && (
        <div className="mt-3 bg-[#EDF3E3] border border-[#CFE0B8] rounded-xl p-2.5 flex items-start space-x-2 text-xs text-[#3F4A33]">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-[#3F4A33]">Auto-Detection Note:</span>{" "}
            {parseResult.warnings[0]}
            {parseResult.warnings.length > 1 && (
              <span className="ml-1 text-[#3F4A33]/70 font-medium">
                (+{parseResult.warnings.length - 1} other auto-resolved fields)
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
