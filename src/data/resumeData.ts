export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  duration: string;
  type: string;
  isCurrent?: boolean;
  notes?: string;
  highlights: string[];
  technologies?: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: { name: string; level?: 'Expert' | 'Advanced' | 'Intermediate'; hot?: boolean }[];
}

export interface EducationItem {
  qualification: string;
  institution: string;
  boardOrUniversity: string;
  year: string;
  score: string;
  scoreType: 'Percentage' | 'CGPA';
}

export interface ProjectItem {
  title: string;
  type: string;
  role: string;
  url?: string;
  displayUrl?: string;
  description: string;
  features: string[];
  techStack: string[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    headline: string;
    roles: string[];
    summaryLead: string;
    summaryDetails: string[];
    phone: string;
    displayPhone: string;
    email: string;
    location: string;
    linkedin: string;
    linkedinDisplay: string;
    website: string;
    instagram: string;
    youtube: string;
    avatarUrl?: string;
  };
  quickMetrics: {
    label: string;
    value: string;
    detail: string;
    icon: string;
  }[];
  skillsCategories: SkillCategory[];
  coreStrengths: string[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: {
    name: string;
    issuer?: string;
    tag?: string;
  }[];
  additionalInfo: {
    languages: { name: string; proficiency: string }[];
    nationality: string;
    noticePeriod: string;
    willingToRelocate: string;
    availability: string;
    passport: string;
  };
  declaration: {
    text: string;
    signee: string;
  };
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "DEEPAK KUMAR SHARMA",
    headline: "BANKING OPERATION & IT EXECUTIVE | DESKTOP SUPPORT ENGINEER | WEB DEVELOPER | ANDROID APP DEVELOPER (AI TOOLS)",
    roles: [
      "Banking Operation & IT Executive",
      "Desktop Support Engineer",
      "Web Developer",
      "Android App Developer (AI Tools)",
      "Technical Support Specialist"
    ],
    summaryLead: "Dedicated and result-oriented professional currently working as Banking Operation & IT Executive at Megasoft Information Systems Pvt. Ltd., with solid experience in Desktop Support, Technical Support, Banking Operations, User Access Management, Software Installation, and Team Coordination.",
    summaryDetails: [
      "Experienced in handling banking and corporate technical operations, user terminal maintenance, network troubleshooting, and banking SLA compliance.",
      "Concurrently active as a Web & Android App Developer (leveraging AI tools) and ERP solution architect, delivering responsive web portals and automated workflow solutions."
    ],
    phone: "+917007043072",
    displayPhone: "+91-7007043072",
    email: "enggdks@gmail.com",
    location: "Lucknow, Uttar Pradesh, India",
    linkedin: "https://linkedin.com/in/enggdks",
    linkedinDisplay: "linkedin.com/in/enggdks",
    website: "https://deepikamakeupstudio.in",
    instagram: "https://instagram.com/deepikamakeupstudiobbk",
    youtube: "https://youtube.com/@GyanpurExpress",
  },
  quickMetrics: [
    {
      label: "Current Role",
      value: "Banking & IT Executive",
      detail: "Megasoft Information Systems",
      icon: "Briefcase"
    },
    {
      label: "Enterprise Experience",
      value: "3+ Years",
      detail: "Banking Ops & Desktop Support",
      icon: "Shield"
    },
    {
      label: "Users Supported",
      value: "100+",
      detail: "Across 8 States in India",
      icon: "Users"
    },
    {
      label: "Availability",
      value: "Active / Flexible",
      detail: "Lucknow / Remote / Hybrid",
      icon: "Clock"
    }
  ],
  skillsCategories: [
    {
      category: "IT Support & Systems",
      iconName: "Monitor",
      skills: [
        { name: "Desktop & Technical Support", level: "Expert", hot: true },
        { name: "Windows OS (XP, 7, 10, 11)", level: "Expert", hot: true },
        { name: "Hardware & Software Troubleshooting", level: "Expert", hot: true },
        { name: "Network Support (LAN, Wi-Fi, IP)", level: "Advanced", hot: true },
        { name: "Remote Support (AnyDesk, TeamViewer)", level: "Expert" },
        { name: "Microsoft Office (Word, Excel, Outlook, PPT)", level: "Advanced" },
        { name: "Google Workspace (Sheets, Docs, Drive)", level: "Advanced" },
        { name: "Email & Ticket Support", level: "Advanced" },
        { name: "User Management & Access Control", level: "Advanced" },
        { name: "SLA Compliance & Reporting", level: "Advanced" }
      ]
    },
    {
      category: "Web Development",
      iconName: "Globe",
      skills: [
        { name: "HTML5 & Semantic Markup", level: "Expert", hot: true },
        { name: "CSS3 & Modern Layouts", level: "Advanced", hot: true },
        { name: "JavaScript (ES6+)", level: "Advanced", hot: true },
        { name: "Bootstrap 4/5 Responsive Design", level: "Expert" },
        { name: "Google Sites & Custom CMS", level: "Expert" },
        { name: "GitHub Pages & Hosting", level: "Advanced" },
        { name: "Basic SEO (On-Page & Technical)", level: "Intermediate" },
        { name: "Website Performance & Optimization", level: "Intermediate" },
        { name: "Figma (Basic) & UI/UX Principles", level: "Intermediate" },
        { name: "Google Search Console & Analytics", level: "Intermediate" }
      ]
    },
    {
      category: "Development & Tools",
      iconName: "Cpu",
      skills: [
        { name: "Android App Development (AI Tools)", level: "Advanced", hot: true },
        { name: "AI Tools (ChatGPT, Copilot, Gemini)", level: "Expert", hot: true },
        { name: "Google Apps Script Automation", level: "Advanced", hot: true },
        { name: "REST APIs Integration", level: "Intermediate" },
        { name: "MySQL (Basic) & ERP Concepts", level: "Intermediate" },
        { name: "Git & GitHub Version Control", level: "Intermediate" },
        { name: "VS Code & Developer Tooling", level: "Advanced" },
        { name: "Android Studio (AI Assisted)", level: "Intermediate" }
      ]
    }
  ],
  coreStrengths: [
    "Quick Learner & Adaptable to New Tech",
    "Analytical Problem Solving Ability",
    "Good Communication & End-User Training",
    "Team Handling & Multi-Branch Coordination",
    "Strict Time Management & SLA Adherence",
    "Customer-Focused Approach & Empathy",
    "High Responsibility & Integrity"
  ],
  experiences: [
    {
      id: "exp-megasoft",
      role: "Banking Operation & IT Executive",
      company: "Megasoft Information Systems Pvt. Ltd.",
      location: "Lucknow, Uttar Pradesh, India",
      duration: "Aug 2026 – Present",
      type: "Full-Time",
      isCurrent: true,
      highlights: [
        "Managing core banking operational processes, digital transaction workflow continuity, and enterprise IT support.",
        "Providing technical troubleshooting for banking applications, teller/officer workstations, OS configurations, and peripherals.",
        "Overseeing secure user access management, user ID authorizations, credential provisioning, and compliance checks.",
        "Ensuring strict compliance with banking Service Level Agreements (SLA), data integrity, and operational guidelines.",
        "Diagnosing and troubleshooting network connectivity issues (LAN/WAN, IP routing, secure gateways) to eliminate operational branch downtime.",
        "Liaising seamlessly between operational banking teams and technical leadership for high-priority incident resolutions."
      ],
      technologies: ["Banking Operations Software", "Desktop Support", "Windows 10/11", "User Access Management", "LAN/WAN Networking", "Incident Management", "SLA Adherence"]
    },
    {
      id: "exp-1",
      role: "Freelance – Web Developer, Android App Developer (AI Tools) & ERP Developer",
      company: "Independent Freelance Consultant",
      location: "Remote / Lucknow, India",
      duration: "2023 – Present",
      type: "Freelance / Concurrent",
      isCurrent: true,
      highlights: [
        "Designing and developing responsive, mobile-first websites using HTML, CSS, JavaScript, Bootstrap, and Google Sites.",
        "Developing functional Android Apps leveraging modern AI developer tools (ChatGPT, Gemini, Copilot, etc.) and native frameworks.",
        "Architecting lightweight ERP systems and tailored business management software for small and medium clients.",
        "Integrating Google Sheets as a real-time reactive database using custom Google Apps Script and automated triggers.",
        "Deploying and managing production client projects on GitHub Pages and custom commercial domains.",
        "Providing end-to-end IT support, remote debugging, troubleshooting, and maintenance assistance to business clients.",
        "Overseeing complete client lifecycle from initial requirement gathering through design, coding, testing, and live release."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GitHub Pages", "Google Sheets API", "Apps Script", "AI Tools", "Android Studio", "REST APIs"]
    },
    {
      id: "exp-2",
      role: "Senior Desktop Support Engineer",
      company: "UFS Digital Ltd. (UPICO Project)",
      location: "Lucknow / Multi-State Deployment",
      duration: "Dec 2020 – Apr 2023",
      type: "Full-Time",
      notes: "Experience verified by official joining letter, monthly salary slips, and bank account records.",
      highlights: [
        "Delivered critical technical and desktop support for State Bank of India (SBI), Punjab National Bank (PNB), and Bank of Baroda branches spanning 8 states.",
        "Installed, remotely configured, security-patched, and maintained core banking application software across hundreds of teller & officer terminals.",
        "Diagnosed and resolved hardware issues, operating system anomalies, network connectivity faults, and thermal/laser printer errors.",
        "Managed secure user ID provisioning, access control authorizations, credential resets, and cross-branch coordination.",
        "Conducted remote user training sessions via Zoom to educate banking staff on operating guidelines and troubleshooting basics.",
        "Strictly upheld client Service Level Agreements (SLA), maintaining rapid response times and promptly escalating critical severity incidents.",
        "Directly supported 100+ end-users daily, significantly reducing operational downtime and boosting branch productivity."
      ],
      technologies: ["Windows OS (7/10/11)", "Active Directory", "Banking Core Software", "Remote Tools (AnyDesk, TeamViewer)", "LAN/WAN Networking", "Hardware Diagnostics", "Zoom Training"]
    },
    {
      id: "exp-3",
      role: "IT Trainer",
      company: "Skill India Program (AI Classes)",
      location: "Barabanki / Lucknow, India",
      duration: "May 2023 – 2024",
      type: "Part-Time / Training",
      highlights: [
        "Delivered interactive computer literacy, digital skills, and foundational IT training curriculum to students.",
        "Taught advanced MS Office (Excel formulas, data entry, Word formatting, PowerPoint), computer hardware basics, and practical IT workflows.",
        "Guided aspiring tech learners through hands-on technical labs, practical assignments, and introduced AI-assisted productivity tools."
      ],
      technologies: ["MS Office Suite", "Computer Hardware Basics", "Windows OS", "Practical Networking", "AI Productivity Tools"]
    },
    {
      id: "exp-4",
      role: "Senior Executive",
      company: "MD India Health Insurance TPA Pvt. Ltd.",
      location: "Lucknow, India",
      duration: "Jun 2019 – Aug 2019",
      type: "Full-Time",
      highlights: [
        "Managed comprehensive claim documentation verification, policy records, and medical client support processes.",
        "Handled high volumes of customer and hospital queries professionally through telephonic support and email communications.",
        "Coordinated closely with medical underwriters and internal processing teams for seamless claim settlements.",
        "Maintained stringent audit logs, digital filing records, and guaranteed timely query turnaround times."
      ],
      technologies: ["CRM / TPA Database", "Documentation Processing", "Client Communication", "SLA Adherence", "Email Support"]
    }
  ],
  projects: [
    {
      title: "Deepika Makeup Studio Official Portal",
      type: "Live Business Website",
      role: "Lead Web Developer & Designer",
      url: "https://deepikamakeupstudio.in",
      displayUrl: "deepikamakeupstudio.in",
      description: "Designed and developed the official brand website for a luxury beauty & bridal studio using Google Sites and custom domain routing.",
      features: [
        "Clean, mobile-responsive layout showcasing bridal packages, services, and portfolios.",
        "Integrated appointment booking inquiries, WhatsApp direct consultation triggers, and Google Maps location.",
        "Optimized for fast mobile loading speed and search engine visibility."
      ],
      techStack: ["Google Sites", "Custom Domain DNS", "Mobile Responsive Design", "SEO Basics", "WhatsApp API Integration"]
    },
    {
      title: "Deepikamakeupstudiobbk Brand Growth",
      type: "Digital Marketing & Social Presence",
      role: "Social Media Manager & Digital Strategist",
      url: "https://instagram.com/deepikamakeupstudiobbk",
      displayUrl: "@deepikamakeupstudiobbk",
      description: "Management and digital growth of business Instagram page with multimedia content creation and organic client acquisition.",
      features: [
        "Created promotional graphics, client makeover reels, stories, and carousel educational posts.",
        "Fostered direct client engagement via DMs, booking confirmations, and community interaction."
      ],
      techStack: ["Social Media Optimization", "Content Creation", "Canva / Digital Design", "Audience Engagement"]
    },
    {
      title: "Gyanpur Express Educational Platform",
      type: "Educational Content & Video Channel",
      role: "Founder & Content Creator",
      url: "https://youtube.com/@GyanpurExpress",
      displayUrl: "Gyanpur Express (YouTube)",
      description: "Educational initiative dedicated to creating high-yield video lessons and guidance for competitive exam preparation and student career growth.",
      features: [
        "Produced structured video tutorials covering general awareness, exam strategies, and technical concepts.",
        "Created instructional slide decks, student worksheets, and community discussion notes."
      ],
      techStack: ["Video Production", "Curriculum Design", "Digital Pedagogy", "Presentation Design"]
    }
  ],
  education: [
    {
      qualification: "B.Tech (Electronics & Communication Engineering)",
      institution: "Uttar Pradesh Technical University",
      boardOrUniversity: "UPTU",
      year: "2012",
      score: "61.02%",
      scoreType: "Percentage"
    },
    {
      qualification: "12th Standard (Intermediate)",
      institution: "Pioneer Montessori Inter College, Barabanki",
      boardOrUniversity: "UP Board",
      year: "2007",
      score: "73.60%",
      scoreType: "Percentage"
    },
    {
      qualification: "10th Standard (High School)",
      institution: "Pioneer Montessori Inter College, Barabanki",
      boardOrUniversity: "UP Board",
      year: "2005",
      score: "63.84%",
      scoreType: "Percentage"
    }
  ],
  certifications: [
    {
      name: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      tag: "Cloud Infrastructure"
    },
    {
      name: "CCNA (Cisco Certified Network Associate) - Fundamentals",
      issuer: "Cisco Networking",
      tag: "Networking & IP"
    },
    {
      name: "MS Excel & Google Sheets Certification",
      issuer: "Professional Certification",
      tag: "Data & Automation"
    },
    {
      name: "Google IT Support Professional Certificate",
      issuer: "Coursera / Google",
      tag: "Enterprise IT"
    },
    {
      name: "ChatGPT & AI Tools for Professional Productivity",
      issuer: "AI Productivity Programs",
      tag: "AI & Modern Tools"
    }
  ],
  additionalInfo: {
    languages: [
      { name: "Hindi", proficiency: "Fluent / Native" },
      { name: "English", proficiency: "Professional Working / Basic" }
    ],
    nationality: "Indian",
    noticePeriod: "Immediate / 15 Days",
    willingToRelocate: "Yes (Open to Relocation)",
    availability: "Full Time (Work From Home / Remote / Hybrid)",
    passport: "Applied (Expected Soon)"
  },
  declaration: {
    text: "I hereby declare that the above information is true to the best of my knowledge and belief.",
    signee: "Deepak Kumar Sharma"
  }
};

export interface ResumeSectionVisibility {
  photo: boolean;
  contactInfo: boolean;
  socialLinks: boolean;
  technicalSkills: boolean;
  coreStrengths: boolean;
  metricBadges: boolean;
  summary: boolean;
  workExperience: boolean;
  experienceNotes: boolean;
  projects: boolean;
  education: boolean;
  certifications: boolean;
  additionalInfo: boolean;
  declaration: boolean;
}

export const defaultSectionVisibility: ResumeSectionVisibility = {
  photo: true,
  contactInfo: true,
  socialLinks: true,
  technicalSkills: true,
  coreStrengths: true,
  metricBadges: true,
  summary: true,
  workExperience: true,
  experienceNotes: true,
  projects: true,
  education: true,
  certifications: true,
  additionalInfo: true,
  declaration: true,
};

export interface PresetProfile {
  id: string;
  label: string;
  badge: string;
  description: string;
  sections: ResumeSectionVisibility;
}

export const resumePresetProfiles: PresetProfile[] = [
  {
    id: 'singlePageAll',
    label: 'Single-Page A4 (All Details Included)',
    badge: '1 Page - 100% Fit',
    description: 'Guaranteed 1-Page A4 layout. Retains 100% of data: photo, contact, 3 projects, all skills, both experiences, education, and declaration with zero data skipped.',
    sections: { ...defaultSectionVisibility },
  },
  {
    id: 'full',
    label: 'Standard Corporate (Full CV)',
    badge: '2 Pages',
    description: 'Comprehensive two-page corporate layout including all verified credentials, projects, and social channels with relaxed spacing.',
    sections: { ...defaultSectionVisibility },
  },
  {
    id: 'strictOnePage',
    label: 'Strict 1-Page ATS Format',
    badge: '1 Page - 100% Fit',
    description: 'ATS-optimized single-page layout without photo. Retains complete enterprise work experience, projects, skills, education, and declaration to fully fill the page.',
    sections: {
      photo: false,
      contactInfo: true,
      socialLinks: true,
      technicalSkills: true,
      coreStrengths: true,
      metricBadges: true,
      summary: true,
      workExperience: true,
      experienceNotes: true,
      projects: true,
      education: true,
      certifications: true,
      additionalInfo: true,
      declaration: true,
    },
  },
  {
    id: 'technical',
    label: 'Technical & Web Focus',
    badge: '1-2 Pages',
    description: 'Highlights technical proficiencies, live web portals, and software development projects.',
    sections: {
      photo: true,
      contactInfo: true,
      socialLinks: true,
      technicalSkills: true,
      coreStrengths: true,
      metricBadges: true,
      summary: true,
      workExperience: true,
      experienceNotes: true,
      projects: true,
      education: true,
      certifications: true,
      additionalInfo: false,
      declaration: false,
    },
  },
  {
    id: 'bankingOperations',
    label: 'Banking & IT Operations',
    badge: '1-2 Pages',
    description: 'Focuses on desktop support, SLA operations across branches, verified credentials, and institutional qualification.',
    sections: {
      photo: true,
      contactInfo: true,
      socialLinks: false,
      technicalSkills: true,
      coreStrengths: true,
      metricBadges: true,
      summary: true,
      workExperience: true,
      experienceNotes: true,
      projects: false,
      education: true,
      certifications: true,
      additionalInfo: true,
      declaration: true,
    },
  },
];
