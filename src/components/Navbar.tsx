import React, { useState } from 'react';
import {
  Download,
  FileText,
  FileCode,
  Image as ImageIcon,
  Printer,
  Copy,
  Check,
  Github,
  Award,
  PhoneCall,
  Eye,
  Layout,
  Share2,
  ChevronDown
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import {
  downloadAsPdf,
  downloadAsImage,
  downloadAsWordDoc,
  copyAtsTextToClipboard,
  triggerDirectPrint
} from '../utils/exportUtils';

interface NavbarProps {
  currentView: 'interactive' | 'ats-document';
  setCurrentView: (view: 'interactive' | 'ats-document') => void;
  onOpenGitHubModal: () => void;
  onOpenAtsScoreModal: () => void;
  onOpenContactModal: () => void;
  onOpenPrintPreview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenGitHubModal,
  onOpenAtsScoreModal,
  onOpenContactModal,
  onOpenPrintPreview,
}) => {
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);

  const handleCopyAts = async () => {
    const success = await copyAtsTextToClipboard(resumeData);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePdfDownload = async () => {
    setIsExportingPdf(true);
    setDownloadMenuOpen(false);
    try {
      await downloadAsPdf('resume-document-to-export', 'Deepak_Kumar_Sharma_Resume.pdf');
    } catch (err) {
      console.error('PDF export failed', err);
      // Fallback to print dialog
      triggerDirectPrint();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleImageDownload = async () => {
    setIsExportingImage(true);
    setDownloadMenuOpen(false);
    try {
      await downloadAsImage('resume-document-to-export', 'Deepak_Kumar_Sharma_Resume.png');
    } catch (err) {
      console.error('Image export failed', err);
    } finally {
      setIsExportingImage(false);
    }
  };

  const handleWordDownload = () => {
    setDownloadMenuOpen(false);
    downloadAsWordDoc(resumeData, 'Deepak_Kumar_Sharma_Resume.doc');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand & Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              DK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base sm:text-lg leading-tight tracking-tight">
                  Deepak Kumar Sharma
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Immediate Joiner (WFH/Remote)
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Desktop Support Engineer • Web & Android App Developer
              </p>
            </div>
          </div>

          {/* Center: View Switcher */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setCurrentView('interactive')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                currentView === 'interactive'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Interactive Portfolio</span>
            </button>
            <button
              onClick={() => setCurrentView('ats-document')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                currentView === 'ats-document'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Official ATS Document</span>
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* ATS Score Button */}
            <button
              onClick={onOpenAtsScoreModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100 transition-colors"
              title="ATS Compatibility Checker"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>ATS Score: 98%</span>
            </button>

            {/* Print Preview Button */}
            <button
              onClick={onOpenPrintPreview}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 transition-colors shadow-xs"
              title="A4 Print Preview & Section Customizer"
            >
              <Printer className="w-4 h-4 text-blue-600" />
              <span>Print Preview</span>
            </button>

            {/* GitHub Deploy Guide Button */}
            <button
              onClick={onOpenGitHubModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs"
              title="GitHub Pages Live Deployment Guide"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub Live</span>
            </button>

            {/* Download Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                disabled={isExportingPdf || isExportingImage}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isExportingPdf ? 'Exporting PDF...' : isExportingImage ? 'Exporting Image...' : 'Download CV'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {downloadMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDownloadMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      Export Formats (User Brief)
                    </div>

                    {/* Dedicated A4 Print Preview */}
                    <button
                      onClick={() => {
                        setDownloadMenuOpen(false);
                        onOpenPrintPreview();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-sm bg-blue-50/70 hover:bg-blue-100/80 text-blue-950 transition-colors border-b border-blue-100"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
                        <Printer className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          <span>A4 Print Preview</span>
                          <span className="text-[9.5px] bg-blue-200 text-blue-900 px-1.5 py-0.2 rounded font-bold">Customizer</span>
                        </div>
                        <div className="text-xs text-blue-700/80">Toggle sections &amp; preview 1-page fit</div>
                      </div>
                    </button>

                    {/* PDF Download */}
                    <button
                      onClick={handlePdfDownload}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      <div className="p-1.5 rounded-lg bg-red-100 text-red-600">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold flex items-center gap-1.5">
                          <span>Download as PDF</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">1-Page Fit</span>
                        </div>
                        <div className="text-xs text-slate-400">Guaranteed 1-Page A4 / All data included</div>
                      </div>
                    </button>

                    {/* Word DOC Download */}
                    <button
                      onClick={handleWordDownload}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                        <FileCode className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold">Download Word (.doc)</div>
                        <div className="text-xs text-slate-400">MS Word &amp; Google Docs clean format</div>
                      </div>
                    </button>

                    {/* Image Download */}
                    <button
                      onClick={handleImageDownload}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold">Download as Image (.png)</div>
                        <div className="text-xs text-slate-400">Crystal clear 2x PNG</div>
                      </div>
                    </button>

                    {/* Direct Print */}
                    <button
                      onClick={() => {
                        setDownloadMenuOpen(false);
                        triggerDirectPrint();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600">
                        <Printer className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold flex items-center gap-1.5">
                          <span>Direct Print / PDF</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">1-Page</span>
                        </div>
                        <div className="text-xs text-slate-400">System print dialog (A4 single sheet)</div>
                      </div>
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    {/* Copy ATS Plain Text */}
                    <button
                      onClick={handleCopyAts}
                      className="w-full flex items-center gap-3 px-3.5 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-500" />
                      )}
                      <span>{copied ? 'Copied ATS Text!' : 'Copy ATS Plain Text'}</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Quick Contact Button */}
            <button
              onClick={onOpenContactModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
              title="Contact Deepak Kumar Sharma"
            >
              <PhoneCall className="w-4 h-4" />
              <span className="hidden md:inline">Contact</span>
            </button>

          </div>
        </div>

        {/* Mobile View Switcher Tab */}
        <div className="flex lg:hidden items-center justify-center pb-3 pt-1 border-t border-slate-100">
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl w-full max-w-sm justify-between">
            <button
              onClick={() => setCurrentView('interactive')}
              className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-lg transition-all ${
                currentView === 'interactive'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              Interactive Portfolio
            </button>
            <button
              onClick={() => setCurrentView('ats-document')}
              className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-lg transition-all ${
                currentView === 'ats-document'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              Official ATS Document
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
};
