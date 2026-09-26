/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InteractiveResume } from './components/InteractiveResume';
import { AtsDocumentView, ResumeLayoutMode } from './components/AtsDocumentView';
import { GitHubDeployModal } from './components/GitHubDeployModal';
import { AtsScoreModal } from './components/AtsScoreModal';
import { ContactModal } from './components/ContactModal';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import {
  FileText,
  FileCode,
  Image as ImageIcon,
  Printer,
  Copy,
  Check,
  Github,
  Award,
  PhoneCall,
  Layout,
  Columns,
  Grid,
  Eye,
  ArrowUp
} from 'lucide-react';
import {
  resumeData,
  ResumeSectionVisibility,
  defaultSectionVisibility
} from './data/resumeData';
import {
  downloadAsPdf,
  downloadAsImage,
  downloadAsWordDoc,
  triggerDirectPrint,
  copyAtsTextToClipboard
} from './utils/exportUtils';

export default function App() {
  const [currentView, setCurrentView] = useState<'interactive' | 'ats-document'>('interactive');
  const [layoutMode, setLayoutMode] = useState<ResumeLayoutMode>('executive');
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isAtsScoreModalOpen, setIsAtsScoreModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState<ResumeSectionVisibility>(defaultSectionVisibility);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [copiedAts, setCopiedAts] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(() => {
    return localStorage.getItem('deepak_cv_photo_url');
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        localStorage.setItem('deepak_cv_photo_url', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setPhotoUrl(null);
    localStorage.removeItem('deepak_cv_photo_url');
  };

  const handleDownloadPdf = async () => {
    setIsExporting('pdf');
    try {
      await downloadAsPdf('resume-document-to-export', 'Deepak_Kumar_Sharma_Resume.pdf');
    } catch (err) {
      console.error(err);
      triggerDirectPrint();
    } finally {
      setIsExporting(null);
    }
  };

  const handleDownloadImage = async () => {
    setIsExporting('image');
    try {
      await downloadAsImage('resume-document-to-export', 'Deepak_Kumar_Sharma_Resume.png');
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(null);
    }
  };

  const handleDownloadDoc = () => {
    downloadAsWordDoc(resumeData, 'Deepak_Kumar_Sharma_Resume.doc');
  };

  const handleCopyAts = async () => {
    const ok = await copyAtsTextToClipboard(resumeData);
    if (ok) {
      setCopiedAts(true);
      setTimeout(() => setCopiedAts(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased print:bg-white print:min-h-0 print:p-0 print:m-0">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
        onOpenAtsScoreModal={() => setIsAtsScoreModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenPrintPreview={() => setIsPrintPreviewOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full pb-16 print:p-0 print:m-0 print:pb-0">
        {currentView === 'interactive' ? (
          <div>
            <div className="no-print">
              <InteractiveResume
                onOpenContactModal={() => setIsContactModalOpen(true)}
                onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
                onSwitchToDocumentView={() => setCurrentView('ats-document')}
                photoUrl={photoUrl}
                onPhotoUpload={handlePhotoUpload}
                onResetPhoto={handleResetPhoto}
              />
            </div>

            {/* Embedded ATS Document section at bottom for immediate inspection & reliable export */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-10 border-t border-slate-200 print:mt-0 print:pt-0 print:border-none print:p-0 print:m-0 print:max-w-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 no-print">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <h2 className="text-xl font-bold text-slate-900">
                      Official ATS Document Format
                    </h2>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                      {layoutMode !== 'standard' ? '1-Page A4 (100% Fit)' : 'Multi-Page'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select any of the 3 single-page layouts — all guarantee zero data skipped on 1 printed A4 page.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsPrintPreviewOpen(true)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#092240] hover:bg-[#134074] text-white flex items-center gap-1.5 transition-colors shadow-xs"
                    title="Open A4 Print Preview to customize sections"
                  >
                    <Printer className="w-3.5 h-3.5 text-blue-300" />
                    <span>A4 Print Preview</span>
                  </button>

                  <button
                    onClick={handleDownloadPdf}
                    disabled={isExporting !== null}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isExporting === 'pdf' ? 'Creating PDF...' : 'Download PDF'}</span>
                  </button>

                  <button
                    onClick={handleDownloadDoc}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Download Word (.doc)</span>
                  </button>

                  <button
                    onClick={handleDownloadImage}
                    disabled={isExporting !== null}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{isExporting === 'image' ? 'Capturing...' : 'Download Image'}</span>
                  </button>

                  <button
                    onClick={triggerDirectPrint}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-200/60 p-2 sm:p-6 rounded-2xl border border-slate-300 flex justify-center print:bg-transparent print:p-0 print:border-none print:rounded-none print:block">
                <AtsDocumentView
                  photoUrl={photoUrl}
                  onPhotoUpload={handlePhotoUpload}
                  onResetPhoto={handleResetPhoto}
                  sectionVisibility={sectionVisibility}
                  onOpenPrintPreview={() => setIsPrintPreviewOpen(true)}
                  layoutMode={layoutMode}
                  onLayoutModeChange={setLayoutMode}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 print:p-0 print:m-0 print:max-w-none">
            {/* Document Mode Header Bar */}
            <div className="max-w-[900px] mx-auto mb-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 no-print">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    Official ATS Document View
                  </h2>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                    layoutMode !== 'standard'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-blue-50 text-blue-700 border-blue-300'
                  }`}>
                    {layoutMode !== 'standard' ? '1-Page A4 (100% Fit - Zero Data Skipped)' : 'Multi-Page Expanded'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose between 3 distinct 1-page layouts or expanded multi-page. All single-page layouts retain 100% data.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Layout Style Switcher Buttons */}
                <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-300">
                  <button
                    onClick={() => setLayoutMode('executive')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                      layoutMode === 'executive'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                    title="Executive 2-Column top header layout (1-Page A4)"
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span>Executive (1P)</span>
                  </button>

                  <button
                    onClick={() => setLayoutMode('sidebar')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                      layoutMode === 'sidebar'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                    title="Dual-tone navy sidebar layout (1-Page A4)"
                  >
                    <Layout className="w-3.5 h-3.5" />
                    <span>Sidebar (1P)</span>
                  </button>

                  <button
                    onClick={() => setLayoutMode('minimal')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                      layoutMode === 'minimal'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                    title="Clean minimal white ATS grid (1-Page A4)"
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Minimal (1P)</span>
                  </button>

                  <button
                    onClick={() => setLayoutMode('standard')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                      layoutMode === 'standard'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                    title="Multi-page expanded layout (2 Pages)"
                  >
                    <span>Multi-Page (2P)</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsPrintPreviewOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#092240] hover:bg-[#134074] text-white flex items-center gap-1.5 transition-all shadow-xs"
                  title="Open A4 Print Preview to customize sections"
                >
                  <Printer className="w-3.5 h-3.5 text-blue-300" />
                  <span>A4 Print Preview</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  disabled={isExporting !== null}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isExporting === 'pdf' ? 'Generating PDF...' : 'Download PDF'}</span>
                </button>

                <button
                  onClick={handleDownloadDoc}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Download Word (.doc)</span>
                </button>

                <button
                  onClick={handleDownloadImage}
                  disabled={isExporting !== null}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{isExporting === 'image' ? 'Exporting...' : 'Download Image'}</span>
                </button>

                <button
                  onClick={triggerDirectPrint}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print A4</span>
                </button>
              </div>
            </div>

            <AtsDocumentView
              photoUrl={photoUrl}
              onPhotoUpload={handlePhotoUpload}
              onResetPhoto={handleResetPhoto}
              sectionVisibility={sectionVisibility}
              onOpenPrintPreview={() => setIsPrintPreviewOpen(true)}
              layoutMode={layoutMode}
              onLayoutModeChange={setLayoutMode}
            />
          </div>
        )}
      </main>

      {/* Floating Action Bar (Mobile & Quick Access) */}
      <aside aria-label="Quick Actions" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 no-print max-w-[95vw] overflow-x-auto">
        <button
          onClick={() => setIsPrintPreviewOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
          title="A4 Print Preview & Customize Sections"
        >
          <Printer className="w-3.5 h-3.5 text-indigo-200" />
          <span>A4 Preview</span>
        </button>

        <button
          onClick={handleDownloadPdf}
          disabled={isExporting !== null}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shrink-0 transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{isExporting === 'pdf' ? 'PDF...' : 'PDF'}</span>
        </button>

        <button
          onClick={handleDownloadDoc}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 transition-colors"
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>DOC</span>
        </button>

        <button
          onClick={handleDownloadImage}
          disabled={isExporting !== null}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 transition-colors"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Image</span>
        </button>

        <div className="h-4 w-px bg-slate-700 shrink-0" />

        <button
          onClick={() => setIsContactModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold shrink-0 transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
          <span>Contact</span>
        </button>

        <button
          onClick={scrollToTop}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 shrink-0 transition-colors"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </aside>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-700">
            <span>Deepak Kumar Sharma</span>
            <span>•</span>
            <a href={`tel:${resumeData.personalInfo.phone}`} className="hover:text-blue-600">
              {resumeData.personalInfo.displayPhone}
            </a>
            <span>•</span>
            <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-blue-600">
              {resumeData.personalInfo.email}
            </a>
            <span>•</span>
            <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600">
              LinkedIn
            </a>
            <span>•</span>
            <a href={resumeData.personalInfo.website} target="_blank" rel="noreferrer" className="hover:text-blue-600">
              deepikamakeupstudio.in
            </a>
          </div>

          <p className="text-slate-400 text-[11px]">
            Designed &amp; Developed with ATS-friendly semantic standards. Ready for GitHub Pages deployment with 1-click PDF, Word DOC, and Image exports.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Pages Deployment Guide</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrintPreviewModal
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        photoUrl={photoUrl}
        onPhotoUpload={handlePhotoUpload}
        onResetPhoto={handleResetPhoto}
        initialVisibility={sectionVisibility}
        onApplyVisibility={(updated) => setSectionVisibility(updated)}
        initialLayoutMode={layoutMode}
        onLayoutModeChange={(mode) => setLayoutMode(mode)}
      />

      <GitHubDeployModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      <AtsScoreModal
        isOpen={isAtsScoreModalOpen}
        onClose={() => setIsAtsScoreModalOpen(false)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

    </div>
  );
}
