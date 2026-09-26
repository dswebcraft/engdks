import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Globe,
  Instagram,
  Youtube,
  Briefcase,
  Users,
  Clock,
  Target,
  GraduationCap,
  Award,
  CheckCircle2,
  Info,
  Code2,
  ExternalLink,
  Camera,
  RotateCcw,
  CheckSquare,
  ShieldCheck,
  Printer,
  FileText,
  Sparkles,
  Layout,
  Columns,
  Grid
} from 'lucide-react';
import {
  resumeData,
  ResumeSectionVisibility,
  defaultSectionVisibility
} from '../data/resumeData';

export type ResumeLayoutMode = 'executive' | 'sidebar' | 'minimal' | 'standard' | 'single-page';

export interface AtsDocumentViewProps {
  photoUrl?: string | null;
  onPhotoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetPhoto?: () => void;
  sectionVisibility?: ResumeSectionVisibility;
  containerId?: string;
  isPrintPreview?: boolean;
  onOpenPrintPreview?: () => void;
  layoutMode?: ResumeLayoutMode;
  onLayoutModeChange?: (mode: ResumeLayoutMode) => void;
}

export const AtsDocumentView: React.FC<AtsDocumentViewProps> = ({
  photoUrl,
  onPhotoUpload,
  onResetPhoto,
  sectionVisibility,
  containerId = 'resume-document-to-export',
  isPrintPreview = false,
  onOpenPrintPreview,
  layoutMode = 'executive',
  onLayoutModeChange,
}) => {
  // Normalize layout mode
  const normalizedInitial = layoutMode === 'single-page' ? 'executive' : layoutMode;
  const [internalMode, setInternalMode] = useState<ResumeLayoutMode>(normalizedInitial);
  const [localPhotoVisible, setLocalPhotoVisible] = useState<boolean>(true);
  const activeMode: ResumeLayoutMode =
    layoutMode === 'single-page' ? 'executive' : layoutMode || internalMode;

  const handleModeToggle = (mode: ResumeLayoutMode) => {
    setInternalMode(mode);
    if (onLayoutModeChange) {
      onLayoutModeChange(mode);
    }
  };

  const visibility = { ...defaultSectionVisibility, ...sectionVisibility };
  const effectivePhotoVisible = visibility.photo && localPhotoVisible;
  const isSinglePage = activeMode !== 'standard';

  // Shared Avatar Element
  const renderAvatar = (sizeClass = 'w-20 h-24 sm:w-22 sm:h-26') => (
    <div className={`relative mx-auto rounded-md overflow-hidden border-2 border-white/80 bg-slate-800 shadow-md ${sizeClass}`}>
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={resumeData.personalInfo.name}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-b from-[#134074] to-[#0b2545] flex flex-col items-center justify-center p-1 text-center">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white font-bold text-xs mb-0.5">
            DKS
          </div>
          <span className="text-[10px] font-bold text-blue-100 leading-tight">Deepak Sharma</span>
          <span className="text-[8.5px] text-blue-300 leading-tight">Banking &amp; IT</span>
          {!isPrintPreview && (
            <label className="mt-1 text-[8.5px] bg-white/20 hover:bg-white/30 px-1.5 py-0.5 rounded cursor-pointer no-print transition-colors font-medium text-white">
              Upload
              <input type="file" accept="image/*" className="hidden" onChange={onPhotoUpload} />
            </label>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={`w-full flex flex-col items-center ${isPrintPreview ? 'p-0' : 'py-3 px-2 sm:px-4'}`}>
      
      {/* Top Notice & Mode Selector Toolbar (Hidden in Print Preview & System Print) */}
      {!isPrintPreview && (
        <div className="w-full max-w-[880px] mb-3 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900 text-white px-4 py-2.5 rounded-xl no-print shadow-md">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 font-bold text-blue-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Layout Styles (All Single-Page Guaranteed):</span>
            </span>
            
            {/* Mode Switcher */}
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => handleModeToggle('executive')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activeMode === 'executive'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Modern Elite Full-Page Grid (1-Page A4)"
              >
                <Columns className="w-3 h-3" />
                <span>Executive (1P)</span>
              </button>

              <button
                onClick={() => handleModeToggle('sidebar')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activeMode === 'sidebar'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Dual-tone navy sidebar layout (1-Page A4)"
              >
                <Layout className="w-3 h-3" />
                <span>Sidebar (1P)</span>
              </button>

              <button
                onClick={() => handleModeToggle('minimal')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activeMode === 'minimal'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Clean minimal white ATS grid (1-Page A4)"
              >
                <Grid className="w-3 h-3" />
                <span>Minimal (1P)</span>
              </button>

              <button
                onClick={() => handleModeToggle('standard')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activeMode === 'standard'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Multi-page expanded layout (2 Pages)"
              >
                <span>Standard (2P)</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Photo Toggle */}
            <button
              onClick={() => setLocalPhotoVisible(!localPhotoVisible)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                effectivePhotoVisible
                  ? 'bg-blue-600/30 text-blue-200 border-blue-400/50 hover:bg-blue-600/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Toggle Candidate Photo in Resume (Instant 1-Click)"
            >
              <Camera className="w-3 h-3 text-blue-300" />
              <span>Photo: {effectivePhotoVisible ? 'ON' : 'OFF'}</span>
            </button>

            {onOpenPrintPreview && (
              <button
                onClick={onOpenPrintPreview}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3 h-3 text-blue-300" />
                <span>Print Preview</span>
              </button>
            )}

            {photoUrl && onResetPhoto && (
              <button
                onClick={onResetPhoto}
                className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Reset to default initials"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Target Container for PDF / Image / Print Export */}
      <article
        id={containerId}
        className={`w-full max-w-[820px] bg-white text-slate-800 text-left overflow-hidden transition-all duration-300 ${
          isSinglePage ? 'single-page-a4-fit' : ''
        } ${
          isPrintPreview
            ? 'border-none shadow-none'
            : 'border border-slate-200 shadow-xl rounded-sm print:border-none print:shadow-none'
        }`}
        style={{
          minHeight: isSinglePage ? '1160px' : '1100px',
        }}
      >
        {/* ========================================================================= */}
        {/* LAYOUT 1: TRENDING MODERN TECH EXECUTIVE (2025/2026 Full A4 Architecture) */}
        {/* ========================================================================= */}
        {activeMode === 'executive' && (
          <div
            className="w-full flex flex-col justify-between flex-1 text-slate-800 p-6 sm:p-7 select-text"
            style={{ minHeight: isSinglePage ? '1160px' : 'auto' }}
          >
            {/* TOP SECTIONS CONTAINER */}
            <div className="space-y-3.5">
              {/* 1. HEADER: Clean, Modern Executive Architecture */}
              <header className="border-b-2 border-slate-900 pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2.5">
                      <h1 className="text-2xl sm:text-[27px] font-black uppercase tracking-tight text-slate-900 leading-none">
                        {resumeData.personalInfo.name}
                      </h1>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full shrink-0">
                        Immediate Joiner • WFH / Hybrid / On-Site
                      </span>
                    </div>
                    
                    <p className="text-[11px] sm:text-[11.5px] font-bold text-blue-800 uppercase tracking-wide mt-1.5 leading-snug">
                      Banking Operation &amp; Enterprise IT Executive &nbsp;|&nbsp; Web &amp; Android App Developer (AI Tools)
                    </p>
                    
                    {/* Clean Inline Contact Ribbon */}
                    {visibility.contactInfo && (
                      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 mt-2 text-[9.5px] text-slate-700 font-medium">
                        <a href={`tel:${resumeData.personalInfo.phone}`} className="flex items-center gap-1 hover:text-blue-700 font-bold text-slate-900 transition-colors">
                          <Phone className="w-3 h-3 text-blue-700 shrink-0" />
                          <span>{resumeData.personalInfo.displayPhone}</span>
                        </a>
                        <span className="text-slate-300">·</span>
                        <a href={`mailto:${resumeData.personalInfo.email}`} className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                          <Mail className="w-3 h-3 text-blue-700 shrink-0" />
                          <span>{resumeData.personalInfo.email}</span>
                        </a>
                        <span className="text-slate-300">·</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-700 shrink-0" />
                          <span>{resumeData.personalInfo.location}</span>
                        </div>
                        <span className="text-slate-300">·</span>
                        <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                          <Linkedin className="w-3 h-3 text-blue-700 shrink-0" />
                          <span>{resumeData.personalInfo.linkedinDisplay}</span>
                        </a>
                        {visibility.socialLinks && (
                          <>
                            <span className="text-slate-300">·</span>
                            <a href={resumeData.personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                              <Globe className="w-3 h-3 text-blue-700 shrink-0" />
                              <span>deepikamakeupstudio.in</span>
                            </a>
                            <span className="text-slate-300">·</span>
                            <a href={resumeData.personalInfo.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                              <Instagram className="w-3 h-3 text-blue-700 shrink-0" />
                              <span>@deepikamakeupstudiobbk</span>
                            </a>
                            <span className="text-slate-300">·</span>
                            <a href={resumeData.personalInfo.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                              <Youtube className="w-3 h-3 text-blue-700 shrink-0" />
                              <span>Gyanpur Express</span>
                            </a>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Optional Executive Photo Card */}
                  {effectivePhotoVisible && (
                    <div className="shrink-0 pl-2">
                      {renderAvatar('w-20 h-24 sm:w-22 sm:h-26')}
                    </div>
                  )}
                </div>

                {/* Status Ribbon: Clean Badges with Enterprise Metrics */}
                {visibility.metricBadges && (
                  <div className="flex flex-wrap items-center gap-2 mt-2.5 pt-2 border-t border-slate-100 text-[9px]">
                    <div className="inline-flex items-center gap-1.5 text-slate-800 font-semibold bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200">
                      <Briefcase className="w-3 h-3 text-blue-700 shrink-0" />
                      <span>Current: Megasoft Information Systems Pvt. Ltd. (Banking &amp; IT Ops)</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-slate-800 font-semibold bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200">
                      <Users className="w-3 h-3 text-blue-700 shrink-0" />
                      <span>100+ Daily Bank Users Supported Across 8 States</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-slate-800 font-semibold bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200">
                      <Target className="w-3 h-3 text-blue-700 shrink-0" />
                      <span>100% SLA Adherence &amp; Core Banking Workflow Continuity</span>
                    </div>
                  </div>
                )}
              </header>

              {/* 2. PROFESSIONAL SUMMARY */}
              {visibility.summary && (
                <section>
                  <div className="flex items-center gap-1.5 font-black text-slate-900 uppercase tracking-wider text-[11px] pb-1 mb-1.5 border-b border-slate-200">
                    <Info className="w-3.5 h-3.5 text-blue-700" />
                    <span>Executive Professional Summary</span>
                  </div>
                  <div className="border-l-2 border-blue-600 pl-3 py-0.5">
                    <p className="text-slate-700 text-[9.5px] sm:text-[10px] leading-relaxed text-justify">
                      Dedicated and result-driven <strong>Banking Operation &amp; Enterprise IT Executive at Megasoft Information Systems Pvt. Ltd.</strong> (Aug 2026 – Present), bringing 3+ years of hands-on expertise in core banking applications, workstation and peripheral diagnostics, user access provisioning, and banking SLA compliance across multi-state branch networks (SBI, PNB, Bank of Baroda). Concurrently active as an agile Web &amp; Android App Developer (leveraging modern AI developer tools) delivering responsive commercial web portals, lightweight ERP systems, and automated workflow solutions.
                    </p>
                  </div>
                </section>
              )}

              {/* 3. TECHNICAL COMPETENCIES: Balanced 3-Column Categorized Flow */}
              {visibility.technicalSkills && (
                <section>
                  <div className="flex items-center gap-1.5 font-black text-slate-900 uppercase tracking-wider text-[11px] pb-1 mb-2 border-b border-slate-200">
                    <Award className="w-3.5 h-3.5 text-blue-700" />
                    <span>Technical Skills &amp; Domain Expertise</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[9px]">
                    {/* Category 1 */}
                    <div>
                      <div className="font-bold text-slate-900 uppercase text-[9.5px] mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        <span>IT Support &amp; Banking Systems</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {resumeData.skillsCategories[0].skills.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Category 2 */}
                    <div>
                      <div className="font-bold text-slate-900 uppercase text-[9.5px] mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        <span>Web Development &amp; CMS</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {resumeData.skillsCategories[1].skills.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Category 3 */}
                    <div>
                      <div className="font-bold text-slate-900 uppercase text-[9.5px] mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        <span>AI Tools &amp; Automation</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {resumeData.skillsCategories[2].skills.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 4. WORK EXPERIENCE: Full Width Spanning for High Readability */}
              {visibility.workExperience && (
                <section>
                  <div className="flex items-center gap-1.5 font-black text-slate-900 uppercase tracking-wider text-[11px] pb-1 mb-2.5 border-b border-slate-200">
                    <Briefcase className="w-3.5 h-3.5 text-blue-700" />
                    <span>Professional Work Experience</span>
                  </div>

                  <div className="space-y-3">
                    {/* Role 1: Megasoft Information Systems */}
                    <div className="border-l-2 border-blue-600 pl-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-900 text-[11.5px]">Banking Operation &amp; IT Executive</h3>
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-900 text-[8.5px] font-black rounded">CURRENT</span>
                          <span className="text-slate-600 font-medium text-[9.5px]">• Megasoft Information Systems Pvt. Ltd. (Lucknow)</span>
                        </div>
                        <span className="font-bold text-blue-900 text-[9.5px] shrink-0 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200/80">
                          Aug 2026 – Present
                        </span>
                      </div>

                      <ul className="mt-1.5 space-y-1 text-slate-700 text-[9px] sm:text-[9.5px] leading-normal">
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold shrink-0">▸</span>
                          <span><strong>Core Banking Operations:</strong> Oversee daily banking transaction workflows, application availability, and teller terminal operational continuity.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold shrink-0">▸</span>
                          <span><strong>Hardware &amp; System Maintenance:</strong> Provide rapid troubleshooting for workstations, OS configurations, banking peripherals, and thermal printers.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold shrink-0">▸</span>
                          <span><strong>User Access &amp; Compliance:</strong> Manage secure user ID provisioning, role authorizations, credential governance, and banking audit readiness.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold shrink-0">▸</span>
                          <span><strong>Network &amp; SLA Adherence:</strong> Resolve LAN/WAN connectivity and IP routing anomalies to maintain strict 100% SLA standards with zero downtime.</span>
                        </li>
                      </ul>
                      <div className="mt-1 text-[8.5px] text-slate-500 font-semibold">
                        Tech: Banking Software · Windows 10/11 · Desktop Support · User Access · LAN/WAN · SLA Adherence
                      </div>
                    </div>

                    {/* Role 2: UFS Digital / UPICO */}
                    <div className="border-l-2 border-slate-400 pl-3 pt-1 border-t border-slate-100">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-900 text-[11.5px]">Senior Desktop Support Engineer</h3>
                          <span className="text-slate-600 font-medium text-[9.5px]">• UFS Digital Ltd. (UPICO Client Project – Multi-State Deployment)</span>
                        </div>
                        <span className="font-bold text-slate-700 text-[9.5px] shrink-0 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                          Dec 2020 – Apr 2023
                        </span>
                      </div>

                      <ul className="mt-1.5 space-y-1 text-slate-700 text-[9px] sm:text-[9.5px] leading-normal">
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-500 font-bold shrink-0">▸</span>
                          <span><strong>Multi-State Banking Support:</strong> Delivered mission-critical IT support for State Bank of India (SBI), PNB, and Bank of Baroda branches across 8 states.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-500 font-bold shrink-0">▸</span>
                          <span><strong>Terminal &amp; Software Upgrades:</strong> Remotely configured, patched, and maintained banking software on 100+ user terminals daily, cutting branch downtime.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-500 font-bold shrink-0">▸</span>
                          <span><strong>Diagnostics &amp; Remote Training:</strong> Solved hardware, OS, network, and printer issues; conducted remote training sessions via Zoom for banking personnel.</span>
                        </li>
                      </ul>
                      <div className="mt-1 text-[8.5px] text-slate-500 font-semibold">
                        Tech: Windows 7/10/11 · Active Directory · Core Banking Applications · AnyDesk/TeamViewer · LAN/WAN
                      </div>
                    </div>

                    {/* Role 3: Freelance Web & Android Apps */}
                    <div className="border-l-2 border-indigo-400 pl-3 pt-1 border-t border-slate-100">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-900 text-[11px]">Web Developer &amp; Android App Developer (AI Tools)</h3>
                          <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-800 text-[8px] font-bold rounded">FREELANCE / CONCURRENT</span>
                          <span className="text-slate-600 font-medium text-[9px]">• Independent Consultant</span>
                        </div>
                        <span className="font-bold text-slate-700 text-[9px] shrink-0 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                          2023 – Present
                        </span>
                      </div>
                      <p className="mt-1 text-slate-700 text-[9px] sm:text-[9.5px] leading-normal">
                        Designing and developing responsive client portals, Android applications leveraging AI developer tooling (Gemini, ChatGPT), lightweight ERP systems, and automated Google Apps Script workflows.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* 5. FEATURED PROJECTS & DIGITAL PLATFORMS: 3 Balanced Clean Columns */}
              {visibility.projects && (
                <section>
                  <div className="flex items-center gap-1.5 font-black text-slate-900 uppercase tracking-wider text-[11px] pb-1 mb-2 border-b border-slate-200">
                    <Code2 className="w-3.5 h-3.5 text-blue-700" />
                    <span>Featured Projects &amp; Digital Platforms</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {/* Project 1 */}
                    <div className="p-2.5 rounded-lg bg-slate-50 border-t-2 border-t-blue-600 border-x border-b border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-slate-900 text-[10px]">Deepika Makeup Studio</span>
                          <a href="https://deepikamakeupstudio.in" target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="text-[8.5px] text-blue-700 font-semibold">Lead Web Developer &amp; Designer</div>
                        <p className="text-slate-600 text-[8.5px] mt-1 leading-snug">
                          Live commercial business portal with responsive portfolio showcase, WhatsApp booking integration, and SEO optimization.
                        </p>
                      </div>
                      <div className="text-[8px] text-slate-500 font-semibold mt-1.5 pt-1 border-t border-slate-200/60">
                        Tech: Google Sites · Custom DNS · WhatsApp API
                      </div>
                    </div>

                    {/* Project 2 */}
                    <div className="p-2.5 rounded-lg bg-slate-50 border-t-2 border-t-purple-600 border-x border-b border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-slate-900 text-[10px]">@deepikamakeupstudiobbk</span>
                          <a href="https://instagram.com/deepikamakeupstudiobbk" target="_blank" rel="noreferrer" className="text-purple-700 hover:text-purple-900">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="text-[8.5px] text-purple-700 font-semibold">Social Media &amp; Brand Growth</div>
                        <p className="text-slate-600 text-[8.5px] mt-1 leading-snug">
                          Digital brand strategy, visual promotional media reels, client direct messaging workflow, and organic appointments.
                        </p>
                      </div>
                      <div className="text-[8px] text-slate-500 font-semibold mt-1.5 pt-1 border-t border-slate-200/60">
                        Tech: Visual Media · Brand Identity · Meta Tools
                      </div>
                    </div>

                    {/* Project 3 */}
                    <div className="p-2.5 rounded-lg bg-slate-50 border-t-2 border-t-red-600 border-x border-b border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-slate-900 text-[10px]">Gyanpur Express (YouTube)</span>
                          <a href="https://youtube.com/@GyanpurExpress" target="_blank" rel="noreferrer" className="text-red-700 hover:text-red-900">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="text-[8.5px] text-red-700 font-semibold">Founder &amp; Content Creator</div>
                        <p className="text-slate-600 text-[8.5px] mt-1 leading-snug">
                          Educational video lectures, competitive examination preparation tutorials, tech guides, and student learning material.
                        </p>
                      </div>
                      <div className="text-[8px] text-slate-500 font-semibold mt-1.5 pt-1 border-t border-slate-200/60">
                        Tech: Video Production · Pedagogy · Digital Outreach
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 6. EDUCATION & CERTIFICATIONS: Balanced 2-Column Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Education Credentials */}
                {visibility.education && (
                  <section>
                    <div className="flex items-center gap-1.5 font-black text-slate-900 uppercase tracking-wider text-[11px] pb-1 mb-1.5 border-b border-slate-200">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                      <span>Education Credentials</span>
                    </div>
                    <table className="w-full text-left border-collapse text-[9px]">
                      <thead>
                        <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-800">
                          <th className="py-1 px-2 font-bold">Qualification</th>
                          <th className="py-1 px-2 font-bold">Board / Univ</th>
                          <th className="py-1 px-2 font-bold text-center">Year</th>
                          <th className="py-1 px-2 font-bold text-right">%</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="py-1 px-2 font-semibold text-slate-900">B.Tech (Electronics &amp; Comm. Engg.)</td>
                          <td className="py-1 px-2 text-slate-600">UPTU</td>
                          <td className="py-1 px-2 text-center text-slate-600">2012</td>
                          <td className="py-1 px-2 text-right font-bold text-blue-900">61.02%</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-2 font-semibold text-slate-900">12th Standard (UP Board)</td>
                          <td className="py-1 px-2 text-slate-600">Pioneer Inter College</td>
                          <td className="py-1 px-2 text-center text-slate-600">2007</td>
                          <td className="py-1 px-2 text-right font-bold text-blue-900">73.60%</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-2 font-semibold text-slate-900">10th Standard (UP Board)</td>
                          <td className="py-1 px-2 text-slate-600">Pioneer Inter College</td>
                          <td className="py-1 px-2 text-center text-slate-600">2005</td>
                          <td className="py-1 px-2 text-right font-bold text-blue-900">63.84%</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                )}

                {/* Certifications & Core Strengths */}
                <section>
                  <div className="flex items-center gap-1.5 font-black text-slate-900 uppercase tracking-wider text-[11px] pb-1 mb-1.5 border-b border-slate-200">
                    <Award className="w-3.5 h-3.5 text-blue-700" />
                    <span>Certifications &amp; Core Strengths</span>
                  </div>
                  <ul className="space-y-1 text-[9px] text-slate-700">
                    {resumeData.certifications.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                        <span className="font-semibold text-slate-900">{c.name}</span>
                        {c.tag && <span className="text-slate-500 font-normal">({c.tag})</span>}
                      </li>
                    ))}
                    <li className="flex items-start gap-1.5 pt-0.5 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1"></span>
                      <span><strong>Key Strengths:</strong> Rapid Incident Diagnostics, Multi-Branch Coordination, Strict SLA Adherence, Team Leadership.</span>
                    </li>
                  </ul>
                </section>
              </div>
            </div>

            {/* 7. FOOTER ROW: Languages, Availability & Declaration (Pinned Cleanly at Page Bottom) */}
            <div className="mt-4 pt-3 border-t-2 border-slate-300 flex flex-wrap items-center justify-between gap-3 text-[9.5px] shrink-0">
              <div className="flex items-center gap-2.5 text-slate-700 flex-wrap">
                <div><strong>Languages:</strong> Hindi (Fluent), English (Working)</div>
                <span className="text-slate-300">|</span>
                <div><strong>Availability:</strong> Immediate / 15 Days (Full-Time / Remote / Hybrid)</div>
                <span className="text-slate-300">|</span>
                <div><strong>Relocation:</strong> Yes</div>
              </div>

              {visibility.declaration && (
                <div className="flex items-center gap-2.5 text-right">
                  <span className="italic text-slate-500 text-[8.5px]">
                    &quot;Information verified &amp; authentic.&quot;
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif italic font-bold text-sm text-slate-900">Deepak</span>
                    <span className="font-bold text-[8.5px] text-slate-700">(Deepak Kumar Sharma)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}


        {/* ========================================================================= */}
        {/* LAYOUT 2: DUAL-TONE SPLIT SIDEBAR (Classic Navy Left Column)               */}
        {/* ========================================================================= */}
        {activeMode === 'sidebar' && (
          <div
            className="flex flex-col md:flex-row w-full h-full items-stretch flex-1"
            style={{ minHeight: isSinglePage ? '1160px' : 'auto' }}
          >
            {/* Left Navy Sidebar */}
            <aside className="w-full bg-[#092240] text-white shrink-0 flex flex-col justify-between md:w-[250px] p-3 sm:p-3.5 min-h-full">
              <div>
                {/* Photo */}
                {effectivePhotoVisible && (
                  <div className="mb-2">
                    {renderAvatar('w-22 h-26 sm:w-24 sm:h-28')}
                  </div>
                )}

                {/* Contact Information */}
                {visibility.contactInfo && (
                  <div className="pb-2 mb-2 border-b border-white/20 text-xs">
                    <div className="bg-[#134074] rounded text-white font-bold uppercase tracking-wider flex items-center gap-1.5 py-1 px-2 text-[9.5px] mb-1.5">
                      <Phone className="w-3 h-3 text-blue-300" />
                      <span>Contact Info</span>
                    </div>
                    <div className="space-y-1 text-[9px]">
                      <a href={`tel:${resumeData.personalInfo.phone}`} className="flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors">
                        <Phone className="w-2.5 h-2.5 text-blue-300" />
                        <span className="font-semibold">{resumeData.personalInfo.displayPhone}</span>
                      </a>
                      <a href={`mailto:${resumeData.personalInfo.email}`} className="flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors truncate">
                        <Mail className="w-2.5 h-2.5 text-blue-300" />
                        <span className="font-semibold truncate">{resumeData.personalInfo.email}</span>
                      </a>
                      <div className="flex items-center gap-1.5 text-blue-100">
                        <MapPin className="w-2.5 h-2.5 text-blue-300" />
                        <span>{resumeData.personalInfo.location}</span>
                      </div>
                      <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors">
                        <Linkedin className="w-2.5 h-2.5 text-blue-300" />
                        <span className="font-semibold truncate">{resumeData.personalInfo.linkedinDisplay}</span>
                      </a>
                      {visibility.socialLinks && (
                        <>
                          <a href={resumeData.personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors">
                            <Globe className="w-2.5 h-2.5 text-blue-300" />
                            <span className="font-semibold truncate">deepikamakeupstudio.in</span>
                          </a>
                          <a href={resumeData.personalInfo.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors">
                            <Instagram className="w-2.5 h-2.5 text-blue-300" />
                            <span className="truncate">@deepikamakeupstudiobbk</span>
                          </a>
                          <a href={resumeData.personalInfo.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors">
                            <Youtube className="w-2.5 h-2.5 text-blue-300" />
                            <span className="truncate">Gyanpur Express (YT)</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Technical Skills */}
                {visibility.technicalSkills && (
                  <div className="mb-2">
                    <div className="bg-[#134074] rounded text-white font-bold uppercase tracking-wider flex items-center gap-1.5 py-1 px-2 text-[9.5px] mb-1.5">
                      <Award className="w-3 h-3 text-blue-300" />
                      <span>Technical Skills</span>
                    </div>
                    <div className="space-y-1.5 text-[8.5px]">
                      <div>
                        <div className="font-bold text-blue-300 uppercase text-[8.5px] mb-0.5">IT Support &amp; Systems</div>
                        <div className="flex flex-wrap gap-1">
                          {resumeData.skillsCategories[0].skills.map((skill, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-blue-900/60 border border-blue-700/60 text-blue-100 text-[8px]">
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-300 uppercase text-[8.5px] mb-0.5">Web Development</div>
                        <div className="flex flex-wrap gap-1">
                          {resumeData.skillsCategories[1].skills.map((skill, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-blue-900/60 border border-blue-700/60 text-blue-100 text-[8px]">
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-300 uppercase text-[8.5px] mb-0.5">Tools &amp; AI Productivity</div>
                        <div className="flex flex-wrap gap-1">
                          {resumeData.skillsCategories[2].skills.map((skill, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-blue-900/60 border border-blue-700/60 text-blue-100 text-[8px]">
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Core Strengths */}
                {visibility.coreStrengths && (
                  <div className="pt-1.5 mb-2 border-t border-white/20">
                    <div className="bg-[#134074] rounded text-white font-bold uppercase tracking-wider flex items-center gap-1.5 py-1 px-2 text-[9.5px] mb-1">
                      <CheckSquare className="w-3 h-3 text-blue-300" />
                      <span>Core Strengths</span>
                    </div>
                    <ul className="space-y-0.5 text-[8.5px] text-slate-200">
                      {resumeData.coreStrengths.slice(0, 6).map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1 leading-tight">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Certifications */}
                {visibility.certifications && (
                  <div className="pt-1.5 mb-2 border-t border-white/20">
                    <div className="bg-[#134074] rounded text-white font-bold uppercase tracking-wider flex items-center gap-1.5 py-1 px-2 text-[9.5px] mb-1">
                      <Award className="w-3 h-3 text-blue-300" />
                      <span>Certifications</span>
                    </div>
                    <ul className="space-y-0.5 text-[8px] text-slate-200 leading-tight">
                      {resumeData.certifications.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0 mt-1"></span>
                          <span>{c.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Additional Info */}
                {visibility.additionalInfo && (
                  <div className="pt-1.5 border-t border-white/20 text-[8px] text-slate-200 leading-tight space-y-0.5">
                    <div className="bg-[#134074] rounded text-white font-bold uppercase tracking-wider flex items-center gap-1.5 py-1 px-2 text-[9.5px] mb-1">
                      <Info className="w-3 h-3 text-blue-300" />
                      <span>Additional Info</span>
                    </div>
                    <div><strong className="text-white">Languages:</strong> Hindi (Fluent), English (Basic)</div>
                    <div><strong className="text-white">Notice:</strong> Immediate / 15 Days</div>
                    <div><strong className="text-white">Relocation:</strong> Yes | <strong className="text-white">Passport:</strong> Applied</div>
                    <div><strong className="text-white">Availability:</strong> Full Time / Hybrid / Remote</div>
                  </div>
                )}
              </div>
            </aside>

            {/* Right Main Content */}
            <main className="flex-1 bg-white flex flex-col justify-between text-left p-3.5 sm:p-4 min-h-full">
              <div>
                {/* Header */}
                <header className="border-b-2 border-[#092240] pb-2 mb-2">
                  <h1 className="font-black text-[#092240] uppercase tracking-wide leading-none text-xl sm:text-2xl">
                    {resumeData.personalInfo.name}
                  </h1>
                  <p className="font-bold text-[#134074] uppercase tracking-wide mt-1 leading-tight text-[10px] sm:text-[10.5px]">
                    {resumeData.personalInfo.headline}
                  </p>

                  {/* Metric Badges */}
                  {visibility.metricBadges && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 border-t border-slate-200 mt-2 pt-2">
                      <div className="flex items-center gap-1 rounded bg-slate-50 border border-slate-200 p-1">
                        <div className="w-5 h-5 rounded bg-[#092240] text-white flex items-center justify-center shrink-0">
                          <Briefcase className="w-2.5 h-2.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[9px] text-slate-900 leading-tight truncate">Current Role</div>
                          <div className="text-[8px] text-slate-500 leading-tight truncate">Megasoft Info</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded bg-slate-50 border border-slate-200 p-1">
                        <div className="w-5 h-5 rounded bg-[#092240] text-white flex items-center justify-center shrink-0">
                          <Users className="w-2.5 h-2.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[9px] text-slate-900 leading-tight truncate">100+ Users</div>
                          <div className="text-[8px] text-slate-500 leading-tight truncate">Across 8 States</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded bg-slate-50 border border-slate-200 p-1">
                        <div className="w-5 h-5 rounded bg-[#092240] text-white flex items-center justify-center shrink-0">
                          <Target className="w-2.5 h-2.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[9px] text-slate-900 leading-tight truncate">SLA Focused</div>
                          <div className="text-[8px] text-slate-500 leading-tight truncate">Banking Ops</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded bg-slate-50 border border-slate-200 p-1">
                        <div className="w-5 h-5 rounded bg-[#092240] text-white flex items-center justify-center shrink-0">
                          <Clock className="w-2.5 h-2.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[9px] text-slate-900 leading-tight truncate">Availability</div>
                          <div className="text-[8px] text-slate-500 leading-tight truncate">Immediate</div>
                        </div>
                      </div>
                    </div>
                  )}
                </header>

                {/* Professional Summary */}
                {visibility.summary && (
                  <section className="mb-2">
                    <div className="flex items-center gap-1.5 font-bold text-[#092240] uppercase tracking-wider border-b-2 border-[#092240] text-[10px] pb-0.5 mb-1">
                      <Info className="w-3 h-3 text-[#134074]" />
                      <span>Professional Summary</span>
                    </div>
                    <p className="text-slate-700 text-left leading-relaxed text-[9px]">
                      Dedicated and result-oriented professional currently working as <strong>Banking Operation &amp; IT Executive at Megasoft Information Systems Pvt. Ltd.</strong>, with 3+ years enterprise experience in desktop support, banking application maintenance, network troubleshooting, and banking SLA compliance across branches in 8 states. Concurrently active as Web &amp; Android App Developer (AI tools).
                    </p>
                  </section>
                )}

                {/* Work Experience */}
                {visibility.workExperience && (
                  <section className="mb-2">
                    <div className="flex items-center gap-1.5 font-bold text-[#092240] uppercase tracking-wider border-b-2 border-[#092240] text-[10px] pb-0.5 mb-1">
                      <Briefcase className="w-3 h-3 text-[#134074]" />
                      <span>Work Experience</span>
                    </div>

                    <div className="space-y-1.5">
                      {/* Role 1: Megasoft */}
                      <div className="border-l-2 border-blue-600 pl-2">
                        <div className="flex items-baseline justify-between gap-1">
                          <div className="flex items-center gap-1 flex-wrap">
                            <h3 className="font-bold text-slate-900 text-[10.5px] leading-tight">
                              Banking Operation &amp; IT Executive
                            </h3>
                            <span className="px-1 py-0.2 bg-blue-100 text-blue-900 text-[8px] font-extrabold rounded">
                              CURRENT
                            </span>
                          </div>
                          <span className="font-bold text-[#092240] text-[9px] shrink-0">Aug 2026 – Present</span>
                        </div>
                        <div className="font-semibold text-[#134074] text-[9px]">
                          Megasoft Information Systems Pvt. Ltd. <span className="text-slate-500 font-normal">• Lucknow</span>
                        </div>
                        {visibility.experienceNotes && (
                          <div className="my-0.5 px-1.5 py-0.5 bg-emerald-50 border border-emerald-200 text-[8px] text-emerald-900 font-medium rounded flex items-center gap-1">
                            <ShieldCheck className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                            <span>Active banking operations, user terminal maintenance &amp; SLA compliance.</span>
                          </div>
                        )}
                        <ul className="mt-0.5 space-y-0.5 text-slate-700 text-[8.5px] leading-tight">
                          <li className="flex items-start gap-1">
                            <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Managing core banking application operations, digital transaction workflows, and terminal availability.</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Providing hardware troubleshooting, OS configurations, software installation, and rapid user issue resolution.</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Handling secure user access management, user ID provisioning, credentials authorization, and SLA compliance.</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Troubleshooting network connectivity (LAN/WAN, IP routing, gateways) to eliminate branch downtime.</span>
                          </li>
                        </ul>
                      </div>

                      {/* Role 2: UFS Digital / UPICO */}
                      <div className="border-l-2 border-slate-400 pl-2 pt-1 border-t border-slate-100">
                        <div className="flex items-baseline justify-between gap-1">
                          <h3 className="font-bold text-slate-900 text-[10.5px] leading-tight">
                            Senior Desktop Support Engineer
                          </h3>
                          <span className="font-bold text-[#092240] text-[9px] shrink-0">Dec 2020 – Apr 2023</span>
                        </div>
                        <div className="font-semibold text-[#134074] text-[9px]">
                          UFS Digital Ltd. (UPICO Client Project) <span className="text-slate-500 font-normal">• 8 States Deployment</span>
                        </div>
                        {visibility.experienceNotes && (
                          <div className="my-0.5 px-1.5 py-0.5 bg-emerald-50 border border-emerald-200 text-[8px] text-emerald-900 font-medium rounded flex items-center gap-1">
                            <ShieldCheck className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                            <span>Verified by official joining letter, salary slips, and bank account records.</span>
                          </div>
                        )}
                        <ul className="mt-0.5 space-y-0.5 text-slate-700 text-[8.5px] leading-tight">
                          <li className="flex items-start gap-1">
                            <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Delivered mission-critical desktop &amp; technical support for SBI, PNB, and Bank of Baroda branches across 8 states.</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Installed, patched, and maintained core banking application software across hundreds of teller terminals.</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Resolved hardware, OS, network, and thermal/laser printer faults for 100+ daily end-users.</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Conducted remote user training via Zoom, upheld strict client SLAs, and prevented branch downtime.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                )}

                {/* Projects & Digital Presence (All 3 Projects) */}
                {visibility.projects && (
                  <section className="mb-2">
                    <div className="flex items-center gap-1.5 font-bold text-[#092240] uppercase tracking-wider border-b-2 border-[#092240] text-[10px] pb-0.5 mb-1">
                      <Code2 className="w-3 h-3 text-[#134074]" />
                      <span>Projects &amp; Digital Presence</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                      <div className="p-1.5 rounded bg-slate-50 border border-slate-200 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-slate-900 text-[9.5px]">Deepika Makeup Studio</span>
                            <a href="https://deepikamakeupstudio.in" target="_blank" rel="noreferrer" className="text-blue-700">
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                          <p className="text-slate-600 text-[8px] mt-0.5 leading-snug">
                            Live commercial portal, bookings, service catalogue &amp; custom domain.
                          </p>
                        </div>
                        <div className="text-[7.5px] text-slate-500 font-semibold truncate mt-1">
                          Tech: HTML5, CSS3, JS, DNS
                        </div>
                      </div>

                      <div className="p-1.5 rounded bg-slate-50 border border-slate-200 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-slate-900 text-[9.5px]">@deepikamakeupstudiobbk</span>
                            <a href="https://instagram.com/deepikamakeupstudiobbk" target="_blank" rel="noreferrer" className="text-blue-700">
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                          <p className="text-slate-600 text-[8px] mt-0.5 leading-snug">
                            Commercial Instagram brand growth, reels, client DMs &amp; bookings.
                          </p>
                        </div>
                        <div className="text-[7.5px] text-slate-500 font-semibold truncate mt-1">
                          Tech: Social Media, Canva
                        </div>
                      </div>

                      <div className="p-1.5 rounded bg-slate-50 border border-slate-200 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-slate-900 text-[9.5px]">Gyanpur Express (YT)</span>
                            <a href="https://youtube.com/@GyanpurExpress" target="_blank" rel="noreferrer" className="text-blue-700">
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                          <p className="text-slate-600 text-[8px] mt-0.5 leading-snug">
                            Educational video lectures, exam preparation &amp; tech tutorials.
                          </p>
                        </div>
                        <div className="text-[7.5px] text-slate-500 font-semibold truncate mt-1">
                          Tech: Video Production, Content
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Education Table */}
                {visibility.education && (
                  <section className="mb-2">
                    <div className="flex items-center gap-1.5 font-bold text-[#092240] uppercase tracking-wider border-b-2 border-[#092240] text-[10px] pb-0.5 mb-1">
                      <GraduationCap className="w-3 h-3 text-[#134074]" />
                      <span>Education</span>
                    </div>
                    <table className="w-full text-left border-collapse text-[8.5px]">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                          <th className="py-0.5 px-1 font-bold">Qualification</th>
                          <th className="py-0.5 px-1 font-bold">Board / University</th>
                          <th className="py-0.5 px-1 font-bold text-center">Year</th>
                          <th className="py-0.5 px-1 font-bold text-right">%</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="py-0.5 px-1 font-semibold text-slate-900">B.Tech (Electronics &amp; Comm. Engg.)</td>
                          <td className="py-0.5 px-1 text-slate-700">UPTU</td>
                          <td className="py-0.5 px-1 text-center text-slate-700">2012</td>
                          <td className="py-0.5 px-1 text-right font-bold text-slate-900">61.02%</td>
                        </tr>
                        <tr>
                          <td className="py-0.5 px-1 font-semibold text-slate-900">12th Standard (UP Board)</td>
                          <td className="py-0.5 px-1 text-slate-700">Pioneer Montessori Inter College</td>
                          <td className="py-0.5 px-1 text-center text-slate-700">2007</td>
                          <td className="py-0.5 px-1 text-right font-bold text-slate-900">73.60%</td>
                        </tr>
                        <tr>
                          <td className="py-0.5 px-1 font-semibold text-slate-900">10th Standard (UP Board)</td>
                          <td className="py-0.5 px-1 text-slate-700">Pioneer Montessori Inter College</td>
                          <td className="py-0.5 px-1 text-center text-slate-700">2005</td>
                          <td className="py-0.5 px-1 text-right font-bold text-slate-900">63.84%</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                )}

                {/* Declaration & Signature */}
                {visibility.declaration && (
                  <div className="pt-1 flex items-center justify-between text-[8px] text-slate-600">
                    <p className="italic">
                      &quot;I hereby declare that the above information is true to the best of my knowledge and belief.&quot;
                    </p>
                    <div className="text-right shrink-0 ml-2">
                      <span className="font-serif italic font-bold text-xs text-[#092240]">Deepak</span>
                      <span className="block font-bold text-[8px] text-slate-800">Deepak Kumar Sharma</span>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAYOUT 3: CLEAN MINIMALIST (Crisp White Full A4 ATS Architecture)          */}
        {/* ========================================================================= */}
        {activeMode === 'minimal' && (
          <div
            className="w-full flex flex-col justify-between flex-1 text-slate-800 p-6 sm:p-7 select-text"
            style={{ minHeight: isSinglePage ? '1160px' : 'auto' }}
          >
            <div className="space-y-3.5">
              {/* Header */}
              <header className="border-b-2 border-slate-900 pb-3">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
                  <div className="text-center sm:text-left flex-1 min-w-0">
                    <h1 className="text-2xl sm:text-[27px] font-black text-slate-900 tracking-tight uppercase leading-none">
                      {resumeData.personalInfo.name}
                    </h1>
                    <p className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 uppercase tracking-wide mt-1.5 leading-snug">
                      {resumeData.personalInfo.headline}
                    </p>
                    {/* Contact details row */}
                    {visibility.contactInfo && (
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5 mt-2 text-[9.5px] text-slate-700 font-medium">
                        <span className="font-bold text-slate-900">{resumeData.personalInfo.displayPhone}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-bold text-slate-900">{resumeData.personalInfo.email}</span>
                        <span className="text-slate-400">•</span>
                        <span>{resumeData.personalInfo.location}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-blue-800 font-semibold">{resumeData.personalInfo.linkedinDisplay}</span>
                        {visibility.socialLinks && (
                          <>
                            <span className="text-slate-400">•</span>
                            <span className="text-blue-800 font-semibold">deepikamakeupstudio.in</span>
                            <span className="text-slate-400">•</span>
                            <span>@deepikamakeupstudiobbk</span>
                            <span className="text-slate-400">•</span>
                            <span>Gyanpur Express (YT)</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {effectivePhotoVisible && (
                    <div className="shrink-0 pl-2">
                      {renderAvatar('w-20 h-24 sm:w-22 sm:h-26')}
                    </div>
                  )}
                </div>

                {/* Metric Badges */}
                {visibility.metricBadges && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5 pt-2 border-t border-slate-200">
                    <div className="p-1.5 rounded bg-slate-50 border border-slate-200 text-center">
                      <div className="font-bold text-[9.5px] text-slate-900">Current Role</div>
                      <div className="text-[8.5px] text-slate-600">Megasoft Info Systems</div>
                    </div>
                    <div className="p-1.5 rounded bg-slate-50 border border-slate-200 text-center">
                      <div className="font-bold text-[9.5px] text-slate-900">100+ Daily Users</div>
                      <div className="text-[8.5px] text-slate-600">Across 8 States</div>
                    </div>
                    <div className="p-1.5 rounded bg-slate-50 border border-slate-200 text-center">
                      <div className="font-bold text-[9.5px] text-slate-900">SLA Adherence</div>
                      <div className="text-[8.5px] text-slate-600">100% Core Banking</div>
                    </div>
                    <div className="p-1.5 rounded bg-slate-50 border border-slate-200 text-center">
                      <div className="font-bold text-[9.5px] text-slate-900">Availability</div>
                      <div className="text-[8.5px] text-slate-600">Immediate / Flexible</div>
                    </div>
                  </div>
                )}
              </header>

              {/* Professional Summary */}
              {visibility.summary && (
                <section>
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                    Professional Summary
                  </h2>
                  <p className="text-[9.5px] sm:text-[10px] text-slate-700 leading-relaxed text-justify">
                    Dedicated and result-oriented professional currently working as <strong>Banking Operation &amp; Enterprise IT Executive at Megasoft Information Systems Pvt. Ltd.</strong> (Aug 2026 – Present), with 3+ years enterprise experience in desktop support, banking application maintenance, workstation diagnostics, network troubleshooting, and banking SLA compliance across branches in 8 states. Concurrently active as Web &amp; Android App Developer (AI tools), developing responsive client portals, ERP systems, and automated workflows.
                  </p>
                </section>
              )}

              {/* Technical Skills */}
              {visibility.technicalSkills && (
                <section>
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Technical Skills &amp; Domain Expertise
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[9px]">
                    <div>
                      <strong className="text-slate-900 block text-[9.5px] uppercase mb-1">IT Support &amp; Systems:</strong>
                      <span className="text-slate-700 leading-relaxed">
                        Desktop Support, Windows 7/10/11, Banking Applications, LAN/WAN Networking, Remote Support (AnyDesk/TeamViewer), Hardware Diagnostics, User Access Management, SLA Reporting.
                      </span>
                    </div>
                    <div>
                      <strong className="text-slate-900 block text-[9.5px] uppercase mb-1">Web &amp; Android Dev:</strong>
                      <span className="text-slate-700 leading-relaxed">
                        HTML5, CSS3, JavaScript (ES6+), React, Bootstrap, Tailored ERP Architecture, Android App Development (AI Tools), Git/GitHub Pages, REST APIs.
                      </span>
                    </div>
                    <div>
                      <strong className="text-slate-900 block text-[9.5px] uppercase mb-1">Tools &amp; Automation:</strong>
                      <span className="text-slate-700 leading-relaxed">
                        Google Sheets API, Google Apps Script, Gemini AI, ChatGPT, MS Office, Canva, Hardware Diagnostics, Remote IT Administration.
                      </span>
                    </div>
                  </div>
                </section>
              )}

              {/* Work Experience */}
              {visibility.workExperience && (
                <section>
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Professional Work Experience
                  </h2>
                  <div className="space-y-3">
                    {/* Role 1: Megasoft */}
                    <div>
                      <div className="flex justify-between items-baseline text-[11px]">
                        <span className="font-bold text-slate-900">
                          Banking Operation &amp; IT Executive <span className="text-blue-800 text-[9px] font-extrabold uppercase">(Current)</span>
                        </span>
                        <span className="font-bold text-slate-800 text-[9.5px]">Aug 2026 – Present</span>
                      </div>
                      <div className="text-[9.5px] text-slate-600 font-semibold">
                        Megasoft Information Systems Pvt. Ltd. • Lucknow, Uttar Pradesh
                      </div>
                      <ul className="list-disc list-inside text-[9px] sm:text-[9.5px] text-slate-700 space-y-1 mt-1 leading-normal">
                        <li><strong>Core Banking Continuity:</strong> Managing daily core banking applications, transaction processing terminal uptime, and branch workflow continuity.</li>
                        <li><strong>Workstation &amp; Hardware Support:</strong> Providing rapid hardware diagnostics, OS configurations, software installations, and thermal printer maintenance.</li>
                        <li><strong>User Access Management:</strong> Handling secure role authorizations, user ID provisioning, credential governance, and banking SLA compliance.</li>
                        <li><strong>Network Diagnostics:</strong> Diagnosing LAN/WAN, IP routing, and secure gateway issues to eliminate branch technical downtime.</li>
                      </ul>
                    </div>

                    {/* Role 2: UFS Digital */}
                    <div className="pt-2 border-t border-slate-200">
                      <div className="flex justify-between items-baseline text-[11px]">
                        <span className="font-bold text-slate-900">Senior Desktop Support Engineer</span>
                        <span className="font-bold text-slate-800 text-[9.5px]">Dec 2020 – Apr 2023</span>
                      </div>
                      <div className="text-[9.5px] text-slate-600 font-semibold">
                        UFS Digital Ltd. (UPICO Client Project) • Multi-State Deployment (8 States)
                      </div>
                      <ul className="list-disc list-inside text-[9px] sm:text-[9.5px] text-slate-700 space-y-1 mt-1 leading-normal">
                        <li><strong>Multi-Branch Banking IT:</strong> Delivered mission-critical desktop support for SBI, PNB, and Bank of Baroda branches spanning 8 states.</li>
                        <li><strong>Terminal Deployment:</strong> Remotely configured, patched, and maintained core banking software suites across 100+ daily end-user terminals.</li>
                        <li><strong>Incident Diagnostics:</strong> Solved workstation hardware, network, OS, and peripheral failures while strictly adhering to client SLAs.</li>
                        <li><strong>User Training:</strong> Conducted remote user guidance sessions via Zoom/AnyDesk for banking branch personnel.</li>
                      </ul>
                    </div>

                    {/* Role 3: Freelance */}
                    <div className="pt-2 border-t border-slate-200">
                      <div className="flex justify-between items-baseline text-[11px]">
                        <span className="font-bold text-slate-900">Web Developer &amp; Android App Developer (AI Tools)</span>
                        <span className="font-bold text-slate-800 text-[9.5px]">2023 – Present</span>
                      </div>
                      <div className="text-[9.5px] text-slate-600 font-semibold">
                        Independent Freelance Consultant • Remote / Lucknow
                      </div>
                      <ul className="list-disc list-inside text-[9px] sm:text-[9.5px] text-slate-700 space-y-1 mt-1 leading-normal">
                        <li>Designing mobile-first commercial web portals (HTML5, CSS3, JavaScript, Google Sites CMS) and tailored business ERP software.</li>
                        <li>Developing functional Android applications leveraging modern AI developer tooling (Gemini, ChatGPT) and automated Google Apps Script workflows.</li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* Projects */}
              {visibility.projects && (
                <section>
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Key Projects &amp; Digital Platforms
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[9px]">
                    <div className="p-2.5 rounded border border-slate-200 bg-slate-50">
                      <div className="font-bold text-slate-900 text-[9.5px]">Deepika Makeup Studio</div>
                      <div className="text-slate-600 mt-0.5 leading-snug">Live bridal portal, service catalogue, WhatsApp bookings &amp; on-page SEO.</div>
                      <div className="text-blue-800 font-semibold mt-1">deepikamakeupstudio.in</div>
                    </div>
                    <div className="p-2.5 rounded border border-slate-200 bg-slate-50">
                      <div className="font-bold text-slate-900 text-[9.5px]">@deepikamakeupstudiobbk</div>
                      <div className="text-slate-600 mt-0.5 leading-snug">Instagram brand strategy, promotional visual reels, and client direct messaging.</div>
                      <div className="text-blue-800 font-semibold mt-1">Instagram Media Channel</div>
                    </div>
                    <div className="p-2.5 rounded border border-slate-200 bg-slate-50">
                      <div className="font-bold text-slate-900 text-[9.5px]">Gyanpur Express (YT)</div>
                      <div className="text-slate-600 mt-0.5 leading-snug">Educational video lectures, competitive examination preparation &amp; tech tutorials.</div>
                      <div className="text-blue-800 font-semibold mt-1">YouTube Channel</div>
                    </div>
                  </div>
                </section>
              )}

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {visibility.education && (
                  <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                      Education Credentials
                    </h2>
                    <table className="w-full text-left border-collapse text-[9px]">
                      <thead>
                        <tr className="border-b border-slate-300 text-slate-800 bg-slate-100/80">
                          <th className="py-1 px-2 font-bold">Qualification</th>
                          <th className="py-1 px-2 font-bold">Board / Univ</th>
                          <th className="py-1 px-2 text-center font-bold">Year</th>
                          <th className="py-1 px-2 text-right font-bold">%</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="py-1 px-2 font-semibold">B.Tech (ECE)</td>
                          <td className="py-1 px-2">UPTU</td>
                          <td className="py-1 px-2 text-center">2012</td>
                          <td className="py-1 px-2 text-right font-bold text-blue-900">61.02%</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-2 font-semibold">12th Standard</td>
                          <td className="py-1 px-2">Pioneer Inter College</td>
                          <td className="py-1 px-2 text-center">2007</td>
                          <td className="py-1 px-2 text-right font-bold text-blue-900">73.60%</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-2 font-semibold">10th Standard</td>
                          <td className="py-1 px-2">Pioneer Inter College</td>
                          <td className="py-1 px-2 text-center">2005</td>
                          <td className="py-1 px-2 text-right font-bold text-blue-900">63.84%</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                )}

                {/* Certifications & Additional Info */}
                <section>
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                    Certifications &amp; Core Strengths
                  </h2>
                  <div className="space-y-1.5 text-[9px] text-slate-700">
                    <div>
                      <strong className="text-slate-900 block font-bold mb-0.5">Certifications:</strong>
                      <ul className="space-y-0.5">
                        {resumeData.certifications.map((c, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            <span>{c.name} {c.tag && `(${c.tag})`}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold mb-0.5">Core Strengths:</strong>
                      <p className="leading-snug">Rapid Incident Troubleshooting, Multi-Branch Coordination, Strict SLA Compliance, User Empathy.</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer Row: Languages, Availability & Declaration */}
            <div className="mt-4 pt-3 border-t-2 border-slate-300 flex flex-wrap items-center justify-between gap-3 text-[9.5px] shrink-0">
              <div className="flex items-center gap-2.5 text-slate-700 flex-wrap">
                <div><strong>Languages:</strong> Hindi (Fluent), English (Working)</div>
                <span className="text-slate-400">|</span>
                <div><strong>Availability:</strong> Immediate / 15 Days (Full-Time / Remote / Hybrid)</div>
                <span className="text-slate-400">|</span>
                <div><strong>Relocation:</strong> Yes</div>
              </div>

              {visibility.declaration && (
                <div className="flex items-center gap-2.5 text-right">
                  <span className="italic text-slate-500 text-[8.5px]">
                    &quot;Information verified &amp; authentic.&quot;
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif italic font-bold text-sm text-slate-900">Deepak</span>
                    <span className="font-bold text-[8.5px] text-slate-700">(Deepak Kumar Sharma)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAYOUT 4: STANDARD MULTI-PAGE (Spacious 2-Page CV)                         */}
        {/* ========================================================================= */}
        {activeMode === 'standard' && (
          <div className="flex flex-col md:flex-row w-full items-stretch">
            <aside className="w-full bg-[#092240] text-white shrink-0 flex flex-col justify-between md:w-[275px] p-5 sm:p-6">
              <div>
                {effectivePhotoVisible && (
                  <div className="mb-4">
                    {renderAvatar('w-40 h-48 sm:w-44 sm:h-52')}
                  </div>
                )}

                {visibility.contactInfo && (
                  <div className="pb-5 mb-4 border-b border-white/20 text-xs">
                    <div className="bg-[#134074] rounded text-white font-bold uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-3 text-xs mb-3">
                      <Phone className="w-3.5 h-3.5 text-blue-300" />
                      <span>Contact Info</span>
                    </div>
                    <div className="space-y-2.5 text-[11px]">
                      <a href={`tel:${resumeData.personalInfo.phone}`} className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                        <Phone className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                        <span className="font-semibold">{resumeData.personalInfo.displayPhone}</span>
                      </a>
                      <a href={`mailto:${resumeData.personalInfo.email}`} className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors truncate">
                        <Mail className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                        <span className="font-semibold truncate">{resumeData.personalInfo.email}</span>
                      </a>
                      <div className="flex items-center gap-2 text-blue-100">
                        <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                        <span>{resumeData.personalInfo.location}</span>
                      </div>
                      <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                        <Linkedin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                        <span className="font-semibold truncate">{resumeData.personalInfo.linkedinDisplay}</span>
                      </a>
                      {visibility.socialLinks && (
                        <>
                          <a href={resumeData.personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                            <Globe className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                            <span className="font-semibold truncate">deepikamakeupstudio.in</span>
                          </a>
                          <a href={resumeData.personalInfo.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                            <Instagram className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                            <span className="truncate">@deepikamakeupstudiobbk</span>
                          </a>
                          <a href={resumeData.personalInfo.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                            <Youtube className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                            <span className="truncate">Gyanpur Express (YouTube)</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {visibility.technicalSkills && (
                  <div className="mb-5">
                    <div className="bg-[#134074] rounded text-white font-bold uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-3 text-xs mb-3">
                      <Award className="w-3.5 h-3.5 text-blue-300" />
                      <span>Technical Skills</span>
                    </div>
                    <div className="space-y-4">
                      {resumeData.skillsCategories.map((cat, cIdx) => (
                        <div key={cIdx}>
                          <div className="text-[11px] font-bold text-blue-300 uppercase tracking-wide mb-1.5">
                            {cat.category}
                          </div>
                          <ul className="space-y-1 text-[11px] text-slate-200">
                            {cat.skills.map((skill, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2 leading-tight">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1"></span>
                                <span>{skill.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {visibility.coreStrengths && (
                  <div className="pt-3 border-t border-white/20">
                    <div className="bg-[#134074] rounded text-white font-bold uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-3 text-xs mb-2.5">
                      <CheckSquare className="w-3.5 h-3.5 text-blue-300" />
                      <span>Core Strengths</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-200">
                      {resumeData.coreStrengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-tight">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>

            <main className="flex-1 bg-white flex flex-col justify-between text-left p-5 sm:p-7">
              <div>
                <header className="border-b-2 border-[#092240] pb-3 mb-4">
                  <h1 className="font-black text-[#092240] uppercase tracking-wide leading-none text-2xl sm:text-3xl">
                    {resumeData.personalInfo.name}
                  </h1>
                  <p className="font-bold text-[#134074] uppercase tracking-wide mt-1 leading-tight text-xs sm:text-[12.5px]">
                    {resumeData.personalInfo.headline}
                  </p>
                  {visibility.metricBadges && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-slate-200 mt-3 pt-3">
                      <div className="flex items-center gap-1.5 rounded bg-slate-50 border border-slate-200 p-2">
                        <div className="w-7 h-7 rounded bg-[#092240] text-white flex items-center justify-center shrink-0">
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[10px] text-slate-900 leading-tight truncate">Current Role</div>
                          <div className="text-[8.5px] text-slate-500 leading-tight truncate">Megasoft Info Systems</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded bg-slate-50 border border-slate-200 p-2">
                        <div className="w-7 h-7 rounded bg-[#092240] text-white flex items-center justify-center shrink-0">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[10px] text-slate-900 leading-tight truncate">100+ Users</div>
                          <div className="text-[8.5px] text-slate-500 leading-tight truncate">Across 8 States</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded bg-slate-50 border border-slate-200 p-2">
                        <div className="w-7 h-7 rounded bg-[#092240] text-white flex items-center justify-center shrink-0">
                          <Target className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[10px] text-slate-900 leading-tight truncate">SLA Focused</div>
                          <div className="text-[8.5px] text-slate-500 leading-tight truncate">Banking Operations</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded bg-slate-50 border border-slate-200 p-2">
                        <div className="w-7 h-7 rounded bg-[#092240] text-white flex items-center justify-center shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[10px] text-slate-900 leading-tight truncate">Availability</div>
                          <div className="text-[8.5px] text-slate-500 leading-tight truncate">Immediate / Flexible</div>
                        </div>
                      </div>
                    </div>
                  )}
                </header>

                {visibility.summary && (
                  <section className="mb-4">
                    <div className="flex items-center gap-1.5 font-bold text-[#092240] uppercase tracking-wider border-b-2 border-[#092240] text-xs pb-1 mb-2">
                      <Info className="w-3 h-3 text-[#134074]" />
                      <span>Professional Summary</span>
                    </div>
                    <p className="text-slate-700 text-left leading-relaxed text-[11px] sm:text-[11.5px]">
                      Dedicated and result-oriented professional currently working as <strong>Banking Operation &amp; IT Executive at Megasoft Information Systems Pvt. Ltd.</strong>, with 3+ years enterprise experience in desktop support, banking application maintenance, network troubleshooting, and banking SLA compliance across branches in 8 states. Concurrently active as Web &amp; Android App Developer (AI tools).
                    </p>
                  </section>
                )}

                {visibility.workExperience && (
                  <section className="mb-4">
                    <div className="flex items-center gap-1.5 font-bold text-[#092240] uppercase tracking-wider border-b-2 border-[#092240] text-xs pb-1 mb-3">
                      <Briefcase className="w-3 h-3 text-[#134074]" />
                      <span>Work Experience</span>
                    </div>
                    <div className="space-y-3.5">
                      <div className="border-l-2 border-blue-600 pl-2">
                        <div className="flex justify-between items-baseline">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-slate-900 text-xs sm:text-[12.5px]">Banking Operation &amp; IT Executive</h3>
                            <span className="px-1.5 py-0.2 bg-blue-100 text-blue-900 text-[8.5px] font-extrabold rounded">CURRENT</span>
                          </div>
                          <span className="font-bold text-[#092240] text-[10.5px]">Aug 2026 – Present</span>
                        </div>
                        <div className="font-semibold text-[#134074] text-[11px]">
                          Megasoft Information Systems Pvt. Ltd. • <span className="text-slate-500 font-normal">Lucknow</span>
                        </div>
                        {visibility.experienceNotes && (
                          <div className="my-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-[9px] text-emerald-900 font-medium rounded flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Verified Credentials: Active banking operations, user terminal maintenance &amp; SLA compliance.</span>
                          </div>
                        )}
                        <ul className="mt-1 space-y-0.5 text-slate-700 text-[10.5px] sm:text-[11px]">
                          <li className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Managing core banking application operations, digital transaction workflows, and terminal availability.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Providing hardware troubleshooting, OS configurations, software installation, and rapid user issue resolution.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Handling secure user access management, user ID provisioning, credentials authorization, and SLA compliance.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Troubleshooting network connectivity (LAN/WAN, IP routing, gateways) to eliminate branch downtime.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-l-2 border-slate-400 pl-2 pt-1 border-t border-slate-100">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-slate-900 text-xs sm:text-[12.5px]">Senior Desktop Support Engineer</h3>
                          <span className="font-bold text-[#092240] text-[10.5px]">Dec 2020 – Apr 2023</span>
                        </div>
                        <div className="font-semibold text-[#134074] text-[11px]">
                          UFS Digital Ltd. (UPICO Client Project) • <span className="text-slate-500 font-normal">8 States Deployment</span>
                        </div>
                        {visibility.experienceNotes && (
                          <div className="my-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-[9px] text-emerald-900 font-medium rounded flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Verified by official joining letter, salary slips, and bank account records.</span>
                          </div>
                        )}
                        <ul className="mt-1 space-y-0.5 text-slate-700 text-[10.5px] sm:text-[11px]">
                          <li className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Delivered mission-critical desktop &amp; technical support for SBI, PNB, and Bank of Baroda branches across 8 states.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Installed, patched, and maintained core banking application software across hundreds of teller terminals.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Resolved hardware, OS, network, and thermal/laser printer faults for 100+ daily end-users.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>Conducted remote user training via Zoom, upheld strict client SLAs, and prevented branch downtime.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                )}

                {visibility.projects && (
                  <section className="mb-4">
                    <div className="flex items-center gap-1.5 font-bold text-[#092240] uppercase tracking-wider border-b-2 border-[#092240] text-xs pb-1 mb-2.5">
                      <Code2 className="w-3 h-3 text-[#134074]" />
                      <span>Projects &amp; Digital Presence</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-[11px]">Deepika Makeup Studio</span>
                          <a href="https://deepikamakeupstudio.in" target="_blank" rel="noreferrer" className="text-blue-700">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-slate-600 text-[9.5px] mt-1 leading-snug">
                          Live commercial business portal with service catalogue, booking inquiries, and Google domain.
                        </p>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-[11px]">@deepikamakeupstudiobbk</span>
                          <a href="https://instagram.com/deepikamakeupstudiobbk" target="_blank" rel="noreferrer" className="text-blue-700">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-slate-600 text-[9.5px] mt-1 leading-snug">
                          Commercial Instagram brand growth, visual media reels, client DMs, and organic appointments.
                        </p>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-[11px]">Gyanpur Express (YT)</span>
                          <a href="https://youtube.com/@GyanpurExpress" target="_blank" rel="noreferrer" className="text-blue-700">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-slate-600 text-[9.5px] mt-1 leading-snug">
                          Educational video lectures, exam preparation tutorials, tech guides, and student material.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {visibility.education && (
                  <section className="mb-4">
                    <div className="flex items-center gap-1.5 font-bold text-[#092240] uppercase tracking-wider border-b-2 border-[#092240] text-xs pb-1 mb-2">
                      <GraduationCap className="w-3 h-3 text-[#134074]" />
                      <span>Education</span>
                    </div>
                    <table className="w-full text-left border-collapse text-[10px]">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                          <th className="py-1 px-2 font-bold">Qualification</th>
                          <th className="py-1 px-2 font-bold">Board / University</th>
                          <th className="py-1 px-2 font-bold text-center">Year</th>
                          <th className="py-1 px-2 font-bold text-right">%</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="py-1 px-2 font-semibold text-slate-900">B.Tech (Electronics &amp; Comm. Engg.)</td>
                          <td className="py-1 px-2 text-slate-700">UPTU</td>
                          <td className="py-1 px-2 text-center text-slate-700">2012</td>
                          <td className="py-1 px-2 text-right font-bold text-slate-900">61.02%</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-2 font-semibold text-slate-900">12th Standard (UP Board)</td>
                          <td className="py-1 px-2 text-slate-700">Pioneer Montessori Inter College</td>
                          <td className="py-1 px-2 text-center text-slate-700">2007</td>
                          <td className="py-1 px-2 text-right font-bold text-slate-900">73.60%</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-2 font-semibold text-slate-900">10th Standard (UP Board)</td>
                          <td className="py-1 px-2 text-slate-700">Pioneer Montessori Inter College</td>
                          <td className="py-1 px-2 text-center text-slate-700">2005</td>
                          <td className="py-1 px-2 text-right font-bold text-slate-900">63.84%</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                )}

                {/* Bottom row for Standard */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t-2 border-slate-200 text-[10px]">
                  {visibility.certifications && (
                    <div className="p-2 rounded bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1 font-bold text-[#092240] uppercase tracking-wider mb-1.5">
                        <Award className="w-3.5 h-3.5 text-[#134074]" />
                        <span>Certifications</span>
                      </div>
                      <ul className="space-y-1 text-slate-700">
                        {resumeData.certifications.map((c, idx) => (
                          <li key={idx} className="flex items-start gap-1 leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                            <span>{c.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {visibility.additionalInfo && (
                    <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700 space-y-0.5">
                      <div className="flex items-center gap-1 font-bold text-[#092240] uppercase tracking-wider mb-1.5">
                        <Info className="w-3.5 h-3.5 text-[#134074]" />
                        <span>Additional Info</span>
                      </div>
                      <div><span className="font-semibold text-slate-900">Languages:</span> Hindi (Fluent), English (Basic)</div>
                      <div><span className="font-semibold text-slate-900">Notice Period:</span> Immediate / 15 Days</div>
                      <div><span className="font-semibold text-slate-900">Relocation:</span> Yes | Nationality: Indian</div>
                      <div><span className="font-semibold text-slate-900">Availability:</span> Full Time / Hybrid / Remote</div>
                      <div><span className="font-semibold text-slate-900">Passport:</span> Applied (Expected Soon)</div>
                    </div>
                  )}

                  {visibility.declaration && (
                    <div className="p-2 rounded bg-slate-50 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 font-bold text-[#092240] uppercase tracking-wider mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#134074]" />
                          <span>Declaration</span>
                        </div>
                        <p className="text-slate-600 leading-snug italic text-[9.5px]">
                          &quot;I hereby declare that the above information is true to the best of my knowledge and belief.&quot;
                        </p>
                      </div>
                      <div className="mt-2.5 pt-1 text-right">
                        <div className="font-serif italic font-bold text-sm text-[#092240]">Deepak</div>
                        <div className="font-bold text-[10px] text-slate-800">Deepak Kumar Sharma</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        )}
      </article>
    </div>
  );
};
