import React, { useState, useEffect, useRef } from 'react';
import {
  Printer,
  Download,
  X,
  Check,
  RotateCcw,
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  ShieldCheck,
  Info,
  CheckCircle2,
  Sparkles,
  Layers,
  Eye,
  AlertCircle
} from 'lucide-react';
import {
  ResumeSectionVisibility,
  defaultSectionVisibility,
  resumePresetProfiles,
  PresetProfile
} from '../data/resumeData';
import { AtsDocumentView, ResumeLayoutMode } from './AtsDocumentView';
import { downloadAsPdf } from '../utils/exportUtils';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl?: string | null;
  onPhotoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetPhoto?: () => void;
  initialVisibility?: ResumeSectionVisibility;
  onApplyVisibility?: (visibility: ResumeSectionVisibility) => void;
  initialLayoutMode?: ResumeLayoutMode;
  onLayoutModeChange?: (mode: ResumeLayoutMode) => void;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  photoUrl,
  onPhotoUpload,
  onResetPhoto,
  initialVisibility,
  onApplyVisibility,
  initialLayoutMode = 'executive',
  onLayoutModeChange,
}) => {
  const [layoutMode, setLayoutMode] = useState<ResumeLayoutMode>(initialLayoutMode);
  const [visibility, setVisibility] = useState<ResumeSectionVisibility>(() => {
    return initialVisibility ? { ...initialVisibility } : { ...defaultSectionVisibility };
  });

  const [activePresetId, setActivePresetId] = useState<string>('singlePageAll');
  const [zoom, setZoom] = useState<number>(0.85);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const previewScrollRef = useRef<HTMLDivElement>(null);

  const handleLayoutModeSelect = (mode: ResumeLayoutMode) => {
    setLayoutMode(mode);
    if (onLayoutModeChange) onLayoutModeChange(mode);
  };

  // Synchronize when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialVisibility) {
        setVisibility({ ...initialVisibility });
      }
      if (initialLayoutMode) {
        setLayoutMode(initialLayoutMode);
      }
      // Check screen width for initial zoom
      if (window.innerWidth < 768) {
        setZoom(0.55);
        setSidebarOpen(false);
      } else if (window.innerWidth < 1200) {
        setZoom(0.72);
      } else {
        setZoom(0.85);
      }
    }
  }, [isOpen, initialVisibility, initialLayoutMode]);

  // Handle keyboard ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (key: keyof ResumeSectionVisibility) => {
    setVisibility((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      setActivePresetId('custom');
      return next;
    });
  };

  const handleSelectPreset = (preset: PresetProfile) => {
    setVisibility({ ...preset.sections });
    setActivePresetId(preset.id);
  };

  const handleResetToDefault = () => {
    setVisibility({ ...defaultSectionVisibility });
    setActivePresetId('full');
  };

  const handleToggleAll = (enable: boolean) => {
    const next: ResumeSectionVisibility = {
      photo: enable,
      contactInfo: true, // Keep contact info always readable
      socialLinks: enable,
      technicalSkills: enable,
      coreStrengths: enable,
      metricBadges: enable,
      summary: enable,
      workExperience: enable,
      experienceNotes: enable,
      projects: enable,
      education: enable,
      certifications: enable,
      additionalInfo: enable,
      declaration: enable,
    };
    setVisibility(next);
    setActivePresetId('custom');
  };

  // Estimate page count based on enabled weight and layout mode
  const getPageEstimate = () => {
    if (layoutMode !== 'standard') {
      return {
        count: 1,
        label: '1-Page A4 (100% Data Fit)',
        color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      };
    }
    return { count: 2, label: '2-Page Corporate CV', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
  };

  const pageEstimate = getPageEstimate();
  const activeCount = Object.values(visibility).filter(Boolean).length;

  const handlePrint = () => {
    if (onApplyVisibility) {
      onApplyVisibility(visibility);
    }
    // Brief delay to allow document to sync before system print dialog
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      await downloadAsPdf(
        'resume-print-preview-target',
        `Deepak_Kumar_Sharma_Resume_${pageEstimate.count}Page.pdf`
      );
    } catch (err) {
      console.error('PDF export error:', err);
      // Fallback to direct print
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col no-print animate-in fade-in duration-200">
      
      {/* TOP CONTROLS & HEADER TOOLBAR */}
      <header className="h-16 sm:h-18 bg-slate-900 border-b border-slate-800 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-md">
        
        {/* Left: Modal Title & Drawer Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
              sidebarOpen
                ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle Sections Panel"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden md:inline">Sections &amp; Presets</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-sm sm:text-base leading-tight">
                A4 Print &amp; PDF Preview
              </h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wide ${pageEstimate.color}`}>
                {pageEstimate.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              ISO 216 Standard A4 format (210 × 297 mm) • {activeCount} sections enabled
            </p>
          </div>
        </div>

        {/* Center: Zoom Controls */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setZoom((z) => Math.max(0.45, Number((z - 0.1).toFixed(2))))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <div className="px-2 text-xs font-mono font-semibold text-slate-300 min-w-[50px] text-center">
            {Math.round(zoom * 100)}%
          </div>

          <button
            onClick={() => setZoom((z) => Math.min(1.2, Number((z + 0.1).toFixed(2))))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1"></div>

          <button
            onClick={() => setZoom(0.75)}
            className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors ${
              zoom === 0.75 ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            75%
          </button>
          <button
            onClick={() => setZoom(0.85)}
            className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors ${
              zoom === 0.85 ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            85%
          </button>
          <button
            onClick={() => setZoom(1.0)}
            className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors ${
              zoom === 1.0 ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            100%
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs disabled:opacity-50"
            title="Download PDF of this exact customized version"
          >
            <Download className="w-4 h-4 text-red-400" />
            <span>{isExportingPdf ? 'Exporting...' : 'Save PDF'}</span>
          </button>

          {/* Primary Print Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-blue-500/20 active:scale-95"
            title="Open system print dialog"
          >
            <Printer className="w-4 h-4 text-blue-200" />
            <span>Print Resume</span>
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors ml-1"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* MAIN BODY: SPLIT VIEW (LEFT TOGGLE PANEL + RIGHT A4 PREVIEW CANVAS) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT DRAWER / SIDEBAR: SECTION TOGGLES */}
        {sidebarOpen && (
          <aside className="w-full sm:w-80 md:w-96 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between shrink-0 z-20 shadow-xl overflow-y-auto">
            <div className="p-4 sm:p-5 space-y-5">
              
              {/* PAGE LAYOUT MODE SELECTOR */}
              <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700">
                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-blue-300">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>Layout Style</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    {layoutMode !== 'standard' ? '1 Page Fit' : 'Multi-Page'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => handleLayoutModeSelect('executive')}
                    className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all text-center ${
                      layoutMode === 'executive'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Executive (1P)
                  </button>
                  <button
                    onClick={() => handleLayoutModeSelect('sidebar')}
                    className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all text-center ${
                      layoutMode === 'sidebar'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Dual Sidebar (1P)
                  </button>
                  <button
                    onClick={() => handleLayoutModeSelect('minimal')}
                    className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all text-center ${
                      layoutMode === 'minimal'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Clean Minimal (1P)
                  </button>
                  <button
                    onClick={() => handleLayoutModeSelect('standard')}
                    className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all text-center ${
                      layoutMode === 'standard'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Multi-Page (2P)
                  </button>
                </div>
                <p className="text-[10.5px] text-emerald-300 mt-2 font-medium leading-snug">
                  {layoutMode !== 'standard'
                    ? '✓ Trending Modern Tech Architecture: Full-width clean layout, zero cramming, zero blank space, 100% data fit on 1 A4 page with no cut-offs.'
                    : 'Standard corporate document with spacious multi-page padding.'}
                </p>
              </div>

              {/* PRESETS SECTION */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Layout Presets</span>
                  </span>
                  <button
                    onClick={handleResetToDefault}
                    className="text-[11px] font-medium text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {resumePresetProfiles.map((preset) => {
                    const isActive = activePresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`text-left p-2.5 rounded-xl border transition-all ${
                          isActive
                            ? 'bg-blue-600/15 border-blue-500/80 text-white shadow-xs'
                            : 'bg-slate-800/70 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            {isActive && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                            <span>{preset.label}</span>
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                            preset.badge.includes('1') ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-blue-950 text-blue-300 border border-blue-800'
                          }`}>
                            {preset.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {preset.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QUICK TOGGLE BUTTONS */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px]">
                <span className="text-slate-400 font-medium">Sections:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleAll(true)}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                  >
                    Enable All
                  </button>
                  <button
                    onClick={() => handleToggleAll(false)}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                  >
                    Compact ATS
                  </button>
                </div>
              </div>

              {/* SECTION TOGGLES LIST */}
              <div className="space-y-4">
                
                {/* Group 1: Header & Visuals */}
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Header &amp; Branding
                  </div>
                  <div className="space-y-1.5">
                    {/* Photo Toggle */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Candidate Photo</span>
                        <span className="text-[10px] text-slate-400">Sidebar passport photograph</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.photo}
                        onChange={() => toggleSection('photo')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500 focus:ring-1"
                      />
                    </label>

                    {/* Metric Badges */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Executive Metric Badges</span>
                        <span className="text-[10px] text-slate-400">Current Role, Users, SLA, Availability</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.metricBadges}
                        onChange={() => toggleSection('metricBadges')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>

                    {/* Social Links */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Social Channels (Web/Insta/YT)</span>
                        <span className="text-[10px] text-slate-400">Media channels in sidebar</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.socialLinks}
                        onChange={() => toggleSection('socialLinks')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

                {/* Group 2: Core Narrative & Experience */}
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Experience &amp; Overview
                  </div>
                  <div className="space-y-1.5">
                    {/* Summary */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Professional Summary</span>
                        <span className="text-[10px] text-slate-400">Multi-paragraph executive profile</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.summary}
                        onChange={() => toggleSection('summary')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>

                    {/* Work Experience */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Work Experience Timeline</span>
                        <span className="text-[10px] text-slate-400">Megasoft, UPICO / UFS Digital roles</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.workExperience}
                        onChange={() => toggleSection('workExperience')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>

                    {/* Experience Notes */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Verified Credentials Badges</span>
                        <span className="text-[10px] text-slate-400">Official UPICO verification notice</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.experienceNotes}
                        onChange={() => toggleSection('experienceNotes')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>

                    {/* Projects */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Live Portals &amp; Projects</span>
                        <span className="text-[10px] text-slate-400">Deepika Studio portal, Gyanpur channel</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.projects}
                        onChange={() => toggleSection('projects')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

                {/* Group 3: Technical Competencies & Education */}
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Skills, Education &amp; Verification
                  </div>
                  <div className="space-y-1.5">
                    {/* Technical Skills */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Technical Skills (Sidebar)</span>
                        <span className="text-[10px] text-slate-400">Desktop, Web, Tools breakdown</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.technicalSkills}
                        onChange={() => toggleSection('technicalSkills')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>

                    {/* Core Strengths */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Core Strengths</span>
                        <span className="text-[10px] text-slate-400">Key professional qualities</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.coreStrengths}
                        onChange={() => toggleSection('coreStrengths')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>

                    {/* Education */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Education Table</span>
                        <span className="text-[10px] text-slate-400">B.Tech (UPTU), 12th, 10th</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.education}
                        onChange={() => toggleSection('education')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>

                    {/* Certifications */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Certifications</span>
                        <span className="text-[10px] text-slate-400">Google IT Support, AI Tools</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.certifications}
                        onChange={() => toggleSection('certifications')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>

                    {/* Additional Info */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Additional Info</span>
                        <span className="text-[10px] text-slate-400">Languages, Notice Period, Relocation</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.additionalInfo}
                        onChange={() => toggleSection('additionalInfo')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>

                    {/* Declaration */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">Declaration &amp; Signature</span>
                        <span className="text-[10px] text-slate-400">Official declaration signature block</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibility.declaration}
                        onChange={() => toggleSection('declaration')}
                        className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

              </div>

              {/* PRINTING TIPS */}
              <div className="p-3 bg-blue-950/40 border border-blue-800/50 rounded-xl text-[11px] text-blue-200/90 space-y-1.5">
                <div className="font-bold text-blue-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-400" />
                  <span>A4 Print Recommendations</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-blue-200/80">
                  <li><strong>Paper Size:</strong> Select <strong>A4</strong> in the system dialog.</li>
                  <li><strong>Margins:</strong> Select <strong>None</strong> or <strong>Minimum</strong> for best border-to-border alignment.</li>
                  <li><strong>Headers &amp; Footers:</strong> Uncheck to remove date/URL stamps.</li>
                  <li><strong>Background Graphics:</strong> Check &quot;Enable background graphics&quot; to print navy sidebar tones.</li>
                </ul>
              </div>

            </div>

            {/* Bottom Sticky Action Bar in Drawer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2">
              <button
                onClick={() => {
                  if (onApplyVisibility) onApplyVisibility(visibility);
                  onClose();
                }}
                className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center transition-colors shadow-xs"
              >
                Apply to Document View
              </button>
            </div>
          </aside>
        )}

        {/* RIGHT PREVIEW STAGE (A4 CANVAS SHEET) */}
        <main
          ref={previewScrollRef}
          className="flex-1 overflow-auto bg-slate-950/90 p-4 sm:p-8 flex flex-col items-center justify-start relative"
        >
          {/* Top Paper Header Bar */}
          <div className="w-full max-w-[850px] mb-4 flex items-center justify-between text-xs text-slate-400 px-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="font-semibold text-slate-300">A4 Live Simulation</span>
              <span>• 210 × 297 mm</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Fit: {pageEstimate.label}</span>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => setZoom(zoom === 1 ? 0.75 : 1)}
                className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-semibold"
              >
                <Maximize2 className="w-3 h-3" />
                <span>{zoom === 1 ? 'Fit View' : 'Actual Size (100%)'}</span>
              </button>
            </div>
          </div>

          {/* Scaled A4 Container */}
          <div
            className="transition-transform duration-200 origin-top flex flex-col items-center"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
          >
            {/* The Resume Rendered for A4 Print */}
            <div
              className={`bg-white shadow-2xl rounded-xs overflow-hidden relative ${
                layoutMode !== 'standard' ? 'single-page-a4-fit' : ''
              }`}
              style={{
                width: '820px',
                minHeight: layoutMode !== 'standard' ? '1160px' : '2320px',
              }}
            >
              {/* Target Element for PDF Export */}
              <AtsDocumentView
                containerId="resume-print-preview-target"
                photoUrl={photoUrl}
                onPhotoUpload={onPhotoUpload}
                onResetPhoto={onResetPhoto}
                sectionVisibility={visibility}
                isPrintPreview={true}
                layoutMode={layoutMode}
                onLayoutModeChange={handleLayoutModeSelect}
              />
            </div>
          </div>

          {/* Bottom spacing for smooth scrolling */}
          <div className="h-20 w-full shrink-0"></div>
        </main>
      </div>

    </div>
  );
};
