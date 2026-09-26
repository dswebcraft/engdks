import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Linkedin, MessageSquareCode, Copy, Check, Clock, Globe } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Phone className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Contact Deepak Kumar Sharma
              </h2>
              <p className="text-xs text-slate-500">
                Direct phone, WhatsApp, email, or LinkedIn connection
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
        <div className="p-6 space-y-4 text-slate-700 text-sm">
          
          {/* Availability Alert */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-900">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <div>
              <span className="font-bold">Available for Immediate Joining (Notice: 15 Days / Immediate)</span>
              <p className="text-emerald-700 mt-0.5">Open to Remote / Work From Home &amp; Relocation</p>
            </div>
          </div>

          {/* Quick Direct Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${resumeData.personalInfo.phone}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all hover:scale-[1.02]"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91-7007043072</span>
            </a>

            <a
              href={`https://wa.me/${resumeData.personalInfo.phone.replace('+', '')}?text=Hello%20Deepak,%20I%20saw%20your%20CV%20and%20would%20like%20to%20discuss%20an%20opportunity.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all hover:scale-[1.02]"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Contact Details List */}
          <div className="space-y-3 pt-2">
            {/* Phone */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Mobile Phone</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{resumeData.personalInfo.displayPhone}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(resumeData.personalInfo.displayPhone, 'phone')}
                className="p-2 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-white transition-colors"
                title="Copy phone"
              >
                {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Email Address</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 break-all">{resumeData.personalInfo.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={`mailto:${resumeData.personalInfo.email}`}
                  className="px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-white rounded"
                >
                  Send
                </a>
                <button
                  onClick={() => handleCopy(resumeData.personalInfo.email, 'email')}
                  className="p-2 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-white transition-colors"
                  title="Copy email"
                >
                  {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Current Location</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{resumeData.personalInfo.location}</div>
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">LinkedIn Profile</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{resumeData.personalInfo.linkedinDisplay}</div>
                </div>
              </div>
              <a
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-white rounded transition-colors"
              >
                Visit
              </a>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
