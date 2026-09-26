import React, { useState } from 'react';
import { X, Github, Copy, Check, ExternalLink, Terminal, Globe, CheckCircle2, BookOpen, Key, Mail, ShieldAlert, UserCheck, RefreshCw } from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [customEmail, setCustomEmail] = useState('enggdks@gmail.com');
  const [customUsername, setCustomUsername] = useState('enggdks');
  const [repoName, setRepoName] = useState('deepak-cv');
  const [authMethod, setAuthMethod] = useState<'token' | 'browser'>('token');

  if (!isOpen) return null;

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  const cleanUsername = customUsername.trim() || 'your-username';
  const cleanRepo = repoName.trim() || 'deepak-cv';
  const cleanEmail = customEmail.trim() || 'your-email@gmail.com';

  const gitConfigCommands = `# 1. Is specific folder ke liye nayi Gmail ID configure karein:
git config user.name "Deepak Kumar Sharma"
git config user.email "${cleanEmail}"

# 2. Verify karne ke liye:
git config user.email`;

  const gitPushCommands = `# 1. Git repository initialize karein aur files commit karein:
git init
git add .
git commit -m "feat: Deepak Kumar Sharma professional live ATS CV"
git branch -M main

# 2. Remote link set karein:
git remote add origin https://github.com/${cleanUsername}/${cleanRepo}.git

# 3. Agar pehle se koi purana origin link hai toh update karein:
# git remote set-url origin https://github.com/${cleanUsername}/${cleanRepo}.git

# 4. GitHub par push karein:
git push -u origin main`;

  const tokenPushCommands = `# Agar computer me purana account save hai, toh direct Personal Access Token se push karein:
git remote set-url origin https://<YOUR_GITHUB_TOKEN>@github.com/${cleanUsername}/${cleanRepo}.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                GitHub Pages Live Deployment Guide
              </h2>
              <p className="text-xs text-slate-500">
                Dusri ya nayi Gmail ID se live karne ka complete step-by-step process
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
        <div className="p-5 sm:p-6 space-y-5 text-slate-700 text-xs sm:text-sm">
          
          {/* Custom Account Inputs */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-950 text-xs flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-700" />
                <span>Apna Target GitHub Account Enter Karein:</span>
              </span>
              <span className="text-[11px] text-blue-700 font-medium">Auto-Updates Commands</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Target Gmail ID:
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="dusri-id@gmail.com"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  GitHub Username:
                </label>
                <input
                  type="text"
                  value={customUsername}
                  onChange={(e) => setCustomUsername(e.target.value)}
                  placeholder="e.g. enggdks"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Repo Name:
                </label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="deepak-cv"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white text-slate-900"
                />
              </div>
            </div>

            <p className="text-[11px] text-blue-800/90 leading-tight">
              Aapki live link banegi: <strong className="font-mono text-blue-950">https://{cleanUsername}.github.io/{cleanRepo}/</strong>
            </p>
          </div>

          {/* Step 1: Create GitHub Repo */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                Dusri Gmail ID se GitHub par New Repository Banayein
              </h3>
            </div>
            <div className="pl-8 space-y-1.5 text-xs text-slate-600">
              <p>
                1. Browser me <a href="https://github.com/login" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-0.5">github.com <ExternalLink className="w-3 h-3" /></a> par apni nayi/dusri Gmail ID (<strong className="text-slate-900">{cleanEmail}</strong>) se login karein.
              </p>
              <p>
                2. <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-0.5">github.com/new <ExternalLink className="w-3 h-3" /></a> par jayein:
              </p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                <li>Repository name: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">{cleanRepo}</code></li>
                <li>Visibility: <strong>Public</strong> select karein (Free GitHub Pages ke liye zaroori hai).</li>
                <li><em>Initialize with README/gitignore ko UNCHECK rehne dein</em> (empty repo banayein).</li>
                <li><strong>Create repository</strong> button click karein.</li>
              </ul>
            </div>
          </div>

          {/* Step 2: Set Git Config for this folder */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  Apne computer me Git email ko {cleanEmail} set karein
                </h3>
              </div>
              <button
                onClick={() => copyCode(gitConfigCommands, 'git-cfg')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                {copiedSnippet === 'git-cfg' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'git-cfg' ? 'Copied' : 'Copy Git Config'}</span>
              </button>
            </div>
            <div className="pl-8">
              <p className="text-xs text-slate-600 mb-1.5">
                Project folder me terminal ya Command Prompt khol kar ye command run karein (bina <code>--global</code> ke, taaki sirf is project par naya account set ho):
              </p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
                {gitConfigCommands}
              </pre>
            </div>
          </div>

          {/* Step 3: Git Push to GitHub */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  Project files ko GitHub par push karein
                </h3>
              </div>
              <button
                onClick={() => copyCode(gitPushCommands, 'git-push')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                {copiedSnippet === 'git-push' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'git-push' ? 'Copied' : 'Copy Push Commands'}</span>
              </button>
            </div>
            <div className="pl-8 space-y-2">
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
                {gitPushCommands}
              </pre>

              {/* Account Switching Troubleshooting Box */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-xs space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Key className="w-4 h-4 text-amber-700" />
                  <span>Important: Agar push karte waqt purana account error de (&quot;Permission denied&quot;):</span>
                </div>
                <p className="text-amber-800 leading-snug">
                  Computer me purani ID ka token/password save hota hai. Ise bypass karne ke liye GitHub <strong>Personal Access Token (PAT)</strong> use karein:
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-amber-900">
                  <li>Nayi ID se GitHub par jayein: <strong>Settings -&gt; Developer Settings -&gt; Personal Access Tokens -&gt; Tokens (classic)</strong>.</li>
                  <li><strong>Generate new token</strong> click karein, <code>repo</code> aur <code>workflow</code> par tick lagayein aur token copy karein.</li>
                  <li>Terminal me ye command run karein (Token paste karke):</li>
                </ol>
                <div className="flex items-center justify-between bg-slate-900 text-slate-100 p-2 rounded-lg font-mono text-[11px] overflow-x-auto mt-1">
                  <span>{tokenPushCommands}</span>
                  <button
                    onClick={() => copyCode(tokenPushCommands, 'tok-push')}
                    className="ml-2 text-blue-300 hover:text-white shrink-0"
                    title="Copy Token Command"
                  >
                    {copiedSnippet === 'tok-push' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: GitHub Pages Activation */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                GitHub Pages 1-Click Activate karein
              </h3>
            </div>
            <div className="pl-8 space-y-1.5 text-xs text-slate-600">
              <p>
                Aapke is codebase me <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-blue-900 font-semibold">.github/workflows/deploy.yml</code> aur relative base path <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-blue-900 font-semibold">base: &apos;./&apos;</code> pehle se configure kiya ja chuka hai!
              </p>
              <p>
                Bas GitHub repository me jayein:
              </p>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-800 font-mono text-xs">
                Repository -&gt; Settings -&gt; Pages -&gt; Build and deployment -&gt; Source: <strong>GitHub Actions</strong>
              </div>
              <p className="text-slate-600">
                Push karte hi 60 seconds ke andar aapka portfolio live ho jayega:
                <br />
                <strong className="text-blue-700 font-mono text-sm">https://{cleanUsername}.github.io/{cleanRepo}/</strong>
              </p>
            </div>
          </div>

          {/* Benefits summary */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="font-bold text-xs text-slate-900 mb-1.5 uppercase tracking-wide">
              Live Hone Par Kya Milega:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Free Lifetime Hosting on GitHub Pages</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>One-Click PDF, Word DOC &amp; Image Export</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>1-Page A4 Full Data Fit Print Simulation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Recruiter Instant WhatsApp, Call &amp; Email Links</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Deepak Kumar Sharma • Live ATS Resume
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            Got it, Close
          </button>
        </div>

      </div>
    </div>
  );
};

