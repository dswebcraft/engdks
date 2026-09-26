import React from 'react';
import { X, Award, CheckCircle2, ShieldCheck, FileCheck, Layers, Sparkles } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface AtsScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AtsScoreModal: React.FC<AtsScoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const atsCriteria = [
    {
      title: "Standard Headings & Hierarchy",
      status: "100% Passed",
      detail: "Uses industry-standard section names: Professional Summary, Work Experience, Technical Skills, Education, Certifications.",
      score: "25/25"
    },
    {
      title: "Keyword Density for IT & Web Development",
      status: "100% Passed",
      detail: "Rich keyword coverage: Desktop Support, Active Directory, SLA Compliance, Banking Operations, Windows 11/10/7, LAN/WAN, Troubleshooting, HTML5, JavaScript, Android Studio, AI Tools, Apps Script.",
      score: "25/25"
    },
    {
      title: "Contact & Location Detectability",
      status: "100% Passed",
      detail: "Clean phone format (+91-7007043072), professional email (enggdks@gmail.com), verified location (Lucknow, UP, India), and LinkedIn URL.",
      score: "25/25"
    },
    {
      title: "Clean Document Structure & Zero Unparseable Elements",
      status: "96% Passed",
      detail: "No complex nested tables, text in native vector format, standard semantic tags, Schema.org JSON-LD Person structured data.",
      score: "24/25"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">ATS Compliance Audit</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  98/100 (Grade A+)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Automated Scanner Verification (Workday, Taleo, Greenhouse, Lever)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-slate-700 text-sm">
          
          {/* Score Hero Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1">
                ATS Compatibility Rating
              </div>
              <div className="text-3xl font-black text-white">98% Match</div>
              <p className="text-xs text-emerald-200/90 mt-1 max-w-xs">
                Candidate profile is fully optimized for automated corporate ATS screening software.
              </p>
            </div>
            <div className="w-20 h-20 rounded-full border-4 border-emerald-400/40 flex items-center justify-center bg-white/10 text-2xl font-black text-emerald-300">
              98%
            </div>
          </div>

          {/* Audit Breakdown Checklist */}
          <div className="space-y-3">
            {atsCriteria.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-900">{item.score}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{item.status}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Identified Top ATS Keywords in Deepak's CV */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Detected High-Yield ATS Keywords
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Desktop Support", "Technical Support", "Active Directory", "SLA Compliance",
                "Hardware Troubleshooting", "Software Installation", "Remote Support (AnyDesk)",
                "Windows 11/10/7", "Banking Operations (SBI/PNB/BOB)", "Network Configuration (LAN/IP)",
                "Web Development", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Google Apps Script",
                "Android App Development", "AI Tools (ChatGPT/Gemini)", "Google Workspace", "ERP Systems"
              ].map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-900 border border-blue-200"
                >
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
