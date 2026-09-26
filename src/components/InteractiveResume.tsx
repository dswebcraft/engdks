import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Target,
  Clock,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Globe,
  Instagram,
  Youtube,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Layers,
  GraduationCap,
  Award,
  Sparkles,
  Download,
  Copy,
  Check,
  MessageSquareCode,
  Camera,
  Trash2
} from 'lucide-react';
import { resumeData, SkillCategory } from '../data/resumeData';
import { copyAtsTextToClipboard } from '../utils/exportUtils';

interface InteractiveResumeProps {
  onOpenContactModal: () => void;
  onOpenGitHubModal: () => void;
  onSwitchToDocumentView: () => void;
  photoUrl: string | null;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetPhoto: () => void;
}

export const InteractiveResume: React.FC<InteractiveResumeProps> = ({
  onOpenContactModal,
  onOpenGitHubModal,
  onSwitchToDocumentView,
  photoUrl,
  onPhotoUpload,
  onResetPhoto,
}) => {
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');
  const [skillSearchQuery, setSkillSearchQuery] = useState<string>('');
  const [copiedAts, setCopiedAts] = useState<boolean>(false);
  const [selectedExpTab, setSelectedExpTab] = useState<string>('all');

  const handleCopyAts = async () => {
    const ok = await copyAtsTextToClipboard(resumeData);
    if (ok) {
      setCopiedAts(true);
      setTimeout(() => setCopiedAts(false), 2500);
    }
  };

  // Filter skills
  const filteredSkills = resumeData.skillsCategories
    .filter(cat => activeSkillCategory === 'all' || cat.category === activeSkillCategory)
    .map(cat => {
      const matchingSkills = cat.skills.filter(s =>
        s.name.toLowerCase().includes(skillSearchQuery.toLowerCase())
      );
      return { ...cat, skills: matchingSkills };
    })
    .filter(cat => cat.skills.length > 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071E3D] via-[#0D2B52] to-[#1F4275] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-blue-900/40">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          
          {/* Avatar / Portrait */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-400 to-sky-300 p-1 shadow-2xl">
                <div className="w-full h-full rounded-[14px] bg-[#092240] flex flex-col items-center justify-center text-white overflow-hidden relative">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={resumeData.personalInfo.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center hover:bg-blue-900/60 transition-colors group/upload">
                      <Camera className="w-8 h-8 text-blue-300 mb-2 group-hover/upload:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-white">Upload Original Photo</span>
                      <span className="text-[10px] text-blue-200 mt-0.5">Click to choose image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onPhotoUpload}
                      />
                    </label>
                  )}
                  <div className="absolute bottom-2 px-2 py-0.5 rounded text-[9px] bg-slate-900/80 backdrop-blur-xs text-blue-200 border border-white/20 font-semibold pointer-events-none">
                    Verified Profile
                  </div>
                </div>
              </div>
              {/* Online Pulse Status */}
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-[#071E3D] text-white rounded-full p-1.5 shadow-md flex items-center gap-1.5 px-2.5">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Active</span>
              </div>
            </div>

            {/* Photo Action Buttons */}
            <div className="flex items-center gap-2 mt-3">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold backdrop-blur-xs transition-colors border border-white/25 shadow-xs">
                <Camera className="w-3.5 h-3.5 text-blue-200" />
                <span>{photoUrl ? 'Change Photo' : 'Upload Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPhotoUpload}
                />
              </label>
              {photoUrl && (
                <button
                  onClick={onResetPhoto}
                  className="p-1 px-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-lg text-xs font-medium border border-red-400/30 transition-colors"
                  title="Remove photo"
                >
                  <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                  Remove
                </button>
              )}
            </div>

            {/* Quick Contact Icons below avatar */}
            <div className="flex items-center gap-2 mt-5">
              <a
                href={`tel:${resumeData.personalInfo.phone}`}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
                title={`Call ${resumeData.personalInfo.displayPhone}`}
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${resumeData.personalInfo.phone.replace('+', '')}?text=Hi%20Deepak,%20I%20reviewed%20your%20CV%20and%20would%20like%20to%20connect.`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white transition-all hover:scale-105"
                title="WhatsApp Message"
              >
                <MessageSquareCode className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${resumeData.personalInfo.email}`}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
                title="Email Deepak"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-blue-600/70 hover:bg-blue-600 text-white transition-all hover:scale-105"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bio & Headlines */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Immediate Joining • Work From Home / Remote / Hybrid</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {resumeData.personalInfo.name}
            </h1>

            {/* Role Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {resumeData.personalInfo.roles.map((role, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-blue-100 border border-white/10 transition-colors"
                >
                  {role}
                </span>
              ))}
            </div>

            <p className="text-sm sm:text-base text-blue-100/90 max-w-3xl leading-relaxed">
              {resumeData.personalInfo.summaryLead}
            </p>

            {/* Contact details row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-blue-200/90 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <a
                  href={resumeData.personalInfo.website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-blue-300"
                >
                  deepikamakeupstudio.in
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5 text-red-400" />
                <a
                  href={resumeData.personalInfo.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-blue-300"
                >
                  Gyanpur Express
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              <button
                onClick={onOpenContactModal}
                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Connect with Deepak</span>
              </button>

              <button
                onClick={onSwitchToDocumentView}
                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-blue-300" />
                <span>View / Download CV</span>
              </button>

              <button
                onClick={handleCopyAts}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-white/5 hover:bg-white/10 text-blue-200 border border-white/10 transition-colors flex items-center gap-2"
              >
                {copiedAts ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAts ? 'Copied ATS Text' : 'Copy ATS Text'}</span>
              </button>

              <button
                onClick={onOpenGitHubModal}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-colors flex items-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>GitHub Live Guide</span>
              </button>
            </div>

          </div>

        </div>

        {/* 4 HIGHLIGHT METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          {resumeData.quickMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-blue-200 font-semibold">{metric.label}</span>
                {metric.icon === 'Briefcase' && <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />}
                {metric.icon === 'Shield' && <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />}
                {metric.icon === 'Users' && <Users className="w-4 h-4 text-blue-400 shrink-0" />}
                {metric.icon === 'Clock' && <Clock className="w-4 h-4 text-blue-400 shrink-0" />}
                {metric.icon === 'Target' && <Target className="w-4 h-4 text-blue-400 shrink-0" />}
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white tracking-tight">{metric.value}</div>
                <div className="text-[11px] text-blue-200/80 mt-1 leading-snug">{metric.detail}</div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* DETAILED PROFESSIONAL SUMMARY */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Professional Summary</h2>
            <p className="text-xs text-slate-500">Core engineering background, systems expertise & freelance evolution</p>
          </div>
        </div>

        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p className="font-medium text-slate-900">
            {resumeData.personalInfo.summaryLead}
          </p>
          {resumeData.personalInfo.summaryDetails.map((paragraph, idx) => (
            <p key={idx} className="text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Core Strengths Chips */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Core Behavioral &amp; Leadership Strengths
          </h3>
          <div className="flex flex-wrap gap-2">
            {resumeData.coreStrengths.map((str, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{str}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Work Experience</h2>
              <p className="text-xs text-slate-500">Verified track record across enterprise banking & independent engineering</p>
            </div>
          </div>

          {/* Quick experience tab filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setSelectedExpTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedExpTab === 'all'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Roles ({resumeData.experiences.length})
            </button>
            <button
              onClick={() => setSelectedExpTab('support')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedExpTab === 'support'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              IT Support &amp; Banking
            </button>
            <button
              onClick={() => setSelectedExpTab('dev')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedExpTab === 'dev'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Development &amp; Training
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {resumeData.experiences
            .filter(exp => {
              if (selectedExpTab === 'all') return true;
              if (selectedExpTab === 'support') return exp.id === 'exp-megasoft' || exp.id === 'exp-2' || exp.id === 'exp-4';
              if (selectedExpTab === 'dev') return exp.id === 'exp-1' || exp.id === 'exp-3';
              return true;
            })
            .map(exp => (
              <div
                key={exp.id}
                className="relative pl-6 sm:pl-8 pb-6 border-l-2 border-blue-200 last:border-transparent last:pb-0 group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-600 group-hover:scale-125 transition-transform" />

                <div className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">
                            Current Role
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-blue-900 mt-0.5">
                        {exp.company}
                        {exp.location && <span className="text-slate-500 font-normal"> • {exp.location}</span>}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Verification Note for UPICO */}
                  {exp.notes && (
                    <div className="mb-3.5 p-3 rounded-lg bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Employment Verification: </span>
                        <span>{exp.notes}</span>
                      </div>
                    </div>
                  )}

                  {/* Highlights Bullet Points */}
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {exp.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-600 font-bold mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  {exp.technologies && (
                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-500 mr-1">Skills & Tools:</span>
                      {exp.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* SKILLS MATRIX WITH SEARCH & FILTERS */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Technical Skills &amp; Competencies</h2>
              <p className="text-xs text-slate-500">Comprehensive breakdown of technical capabilities</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g. Windows, API)..."
              value={skillSearchQuery}
              onChange={e => setSkillSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveSkillCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSkillCategory === 'all'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {resumeData.skillsCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSkillCategory(cat.category)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSkillCategory === cat.category
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.category} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredSkills.map((cat, catIdx) => (
            <div
              key={catIdx}
              className="rounded-xl border border-slate-200 p-5 bg-gradient-to-b from-white to-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-blue-950 uppercase tracking-wide">
                    {cat.category}
                  </h3>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {cat.skills.length} skills
                  </span>
                </div>

                <div className="space-y-2">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span className="text-xs font-medium text-slate-800">{skill.name}</span>
                      </div>
                      {skill.level && (
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            skill.level === 'Expert'
                              ? 'bg-blue-50 text-blue-800 border border-blue-100'
                              : skill.level === 'Advanced'
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-slate-50 text-slate-500'
                          }`}
                        >
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ONLINE PROJECTS & DIGITAL PRESENCE */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Projects &amp; Digital Presence</h2>
            <p className="text-xs text-slate-500">Live web applications, digital channels, and client deployments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resumeData.projects.map((proj, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 p-6 bg-slate-50/60 hover:bg-slate-50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {proj.type}
                  </span>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                      title="Open Live Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-1 group-hover:text-blue-900 transition-colors">
                  {proj.title}
                </h3>
                <div className="text-xs font-semibold text-slate-500 mb-3">
                  Role: {proj.role}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {proj.description}
                </p>

                <div className="space-y-1.5 mb-4">
                  {proj.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200">
                  {proj.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-slate-200 text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-blue-900 border border-slate-200 text-xs font-bold transition-all"
                  >
                    <span>Visit {proj.displayUrl || 'Live Link'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION & CERTIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Education Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Education</h2>
                <p className="text-xs text-slate-500">Academic background and engineering qualifications</p>
              </div>
            </div>

            <div className="space-y-4">
              {resumeData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      {edu.qualification}
                    </h3>
                    <div className="text-xs text-slate-600 mt-0.5">
                      {edu.institution} ({edu.boardOrUniversity})
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 text-right shrink-0">
                    <span className="text-xs font-bold text-blue-900 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                      {edu.score}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Class of {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Professional Certifications</h2>
                <p className="text-xs text-slate-500">Cloud, networking, IT support and AI productivity credentials</p>
              </div>
            </div>

            <div className="space-y-3">
              {resumeData.certifications.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                        {c.name}
                      </h3>
                      {c.issuer && (
                        <div className="text-[11px] text-slate-500">
                          {c.issuer}
                        </div>
                      )}
                    </div>
                  </div>

                  {c.tag && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 shrink-0">
                      {c.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ADDITIONAL PERSONAL INFORMATION & DECLARATION */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Additional Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Additional Information</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Languages:</span>
                <span className="font-bold text-slate-900">
                  {resumeData.additionalInfo.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Notice Period:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {resumeData.additionalInfo.noticePeriod}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Willing to Relocate:</span>
                <span className="font-bold text-slate-900">{resumeData.additionalInfo.willingToRelocate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Availability:</span>
                <span className="font-bold text-slate-900">{resumeData.additionalInfo.availability}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Passport Status:</span>
                <span className="font-bold text-slate-900">{resumeData.additionalInfo.passport}</span>
              </div>
            </div>
          </div>

          {/* Right: Formal Signed Declaration */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Declaration</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                &quot;{resumeData.declaration.text}&quot;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-end justify-between">
              <div>
                <div className="text-[11px] text-slate-500">Location</div>
                <div className="text-xs font-bold text-slate-800">{resumeData.personalInfo.location}</div>
              </div>
              <div className="text-right">
                <div className="font-serif italic font-bold text-base text-[#092240]">
                  Deepak
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {resumeData.declaration.signee}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
