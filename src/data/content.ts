export interface NavItem {
  number: string;
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon: "Linkedin" | "Github" | "Instagram" | "Mail";
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface BringItem {
  icon: string;
  title: string;
  detail: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  pitch: string;
  featureChips?: string[];
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
  featured?: boolean;
  isCustomVisual?: boolean;
}

export interface SkillItem {
  name: string;
  level: "Intermediate" | "Advanced" | "Expert";
  score: number; // 3, 4, or 5
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  tagline: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string; // ISO format for auto month calculation
  current: boolean;
  type: string;
  bullets: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  startDate?: string;
  endDate?: string;
  currentProgressLabel?: string;
  highlights: string[];
  isGraduationFlag?: boolean;
}

export interface CertificationItem {
  id: string;
  number: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string; // Only populated if a specific credential verification URL exists
}

export const portfolioContent = {
  personal: {
    name: "Abhishek Mule",
    firstName: "ABHISHEK",
    lastName: "MULE",
    brandMark: "<AM />",
    role: "CSE (AI & ML) Student · Web Developer · Video Editor · AWS Cloud Club Volunteer",
    availabilityChip: "Open to internships, projects & tech collaborations",
    greetingMono: "// hello, world — I'm",
    typewriterLines: [
      "Full-stack builder. Zero template energy.",
      "Teaching machines to learn: CSE (AI & ML), year two.",
      "Cutting video with a story in every frame.",
      "Cloud nerd in the making @ AWS Cloud Club APSIT.",
      "Currently shipping. Occasionally sleeping.",
    ],
    heroParagraph:
      "Second-year CSE (AI & ML) student at A. P. Shah Institute of Technology. I build clean web apps, cut sharp videos, and volunteer with AWS Cloud Club APSIT. Short résumé, long list of things I'm already building.",
    location: "Mumbai, Maharashtra, India",
    email: "phosion10@gmail.com",
    profileImage: "/profile.jpg",
    resumeUrl: "/Abhishek_Mule_Resume.pdf",
    portraitLabel: "2ND YEAR · CSE (AI & ML)",
    portraitFig: "FIG. 01 — ABHISHEK MULE",
    portraitLocation: "MUMBAI, IN",
  },

  navItems: [
    { number: "01", label: "About", href: "#about" },
    { number: "02", label: "Projects", href: "#projects" },
    { number: "03", label: "Skills", href: "#skills" },
    { number: "04", label: "Experience", href: "#experience" },
    { number: "05", label: "Education", href: "#education" },
    { number: "06", label: "Certifications", href: "#certifications" },
    { number: "07", label: "Contact", href: "#contact" },
  ] as NavItem[],

  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/abhishek-mule-ba84332b5/?isSelfProfile=true",
      username: "Abhishek Mule",
      icon: "Linkedin",
    },
    {
      platform: "GitHub",
      url: "https://github.com/abhishekmule-ai",
      username: "abhishekmule-ai",
      icon: "Github",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/abhi._.haina/",
      username: "abhi._.haina",
      icon: "Instagram",
    },
    {
      platform: "Email",
      url: "mailto:phosion10@gmail.com",
      username: "phosion10@gmail.com",
      icon: "Mail",
    },
  ] as SocialLink[],

  stats: [
    {
      value: "AI & ML",
      label: "Specialization",
      description: "my specialization, CSE at APSIT",
    },
    {
      value: "Year 2",
      label: "Academic Year",
      description: "of 4, and just getting loud",
    },
    {
      value: "20+",
      label: "Tech Stack",
      description: "tools in my stack",
    },
    {
      value: "AWS",
      label: "Community",
      description: "Cloud Club APSIT volunteer",
    },
  ] as StatItem[],

  about: {
    sectionTag: "01 / ABOUT",
    headingLead: "Part engineer. Part editor. Fully obsessed with making things work ",
    headingHighlight: "and look good.",
    overview: {
      location: "Mumbai, Maharashtra, India",
      status: "Open to internships, projects & technology collaborations",
      email: "phosion10@gmail.com",
    },
    paragraphs: [
      {
        text: "I'm a second-year Computer Science Engineering student specializing in AI & Machine Learning at A. P. Shah Institute of Technology (University of Mumbai). Translation: I spend my time learning how machines learn, and making the web feel effortless.",
        highlights: ["second-year Computer Science Engineering student", "AI & Machine Learning", "how machines learn", "making the web feel effortless"],
      },
      {
        text: "On the build side: HTML, CSS, JavaScript, React, Node and Tailwind, plus Python, Java, C, SQL, and a soft spot for Batch scripts that kill boring tasks.",
        highlights: ["HTML, CSS, JavaScript, React, Node and Tailwind", "Python, Java, C, SQL", "Batch scripts that kill boring tasks"],
      },
      {
        text: "On the creative side: Premiere Pro, Canva, Figma and WordPress, because software that works but looks like homework is a missed opportunity. At AWS Cloud Club APSIT I help with events and learn cloud alongside people who love it as much as I do.",
        highlights: ["Premiere Pro, Canva, Figma and WordPress", "AWS Cloud Club APSIT", "learn cloud alongside people who love it"],
      },
    ],
    whatIBring: [
      {
        icon: "BrainCircuit",
        title: "AI & ML Specialization",
        detail: "Foundational machine learning, data structures, algorithms & model concepts.",
      },
      {
        icon: "Layout",
        title: "Web Dev",
        detail: "Fast, responsive web apps with React.js, Tailwind CSS, JavaScript & Node.",
      },
      {
        icon: "Terminal",
        title: "Programming",
        detail: "Algorithmic thinking in Python, Java, C, SQL & automation scripts.",
      },
      {
        icon: "Film",
        title: "Media & UI",
        detail: "High-retention video edits in Premiere Pro, UI drafting in Figma & Canva.",
      },
      {
        icon: "Globe",
        title: "Deployment & CMS",
        detail: "Rapid publishing via Netlify, Vercel edge networks, and WordPress.",
      },
      {
        icon: "Cloud",
        title: "AWS Volunteer",
        detail: "Contributing to hands-on workshops and campus cloud community initiatives.",
      },
    ] as BringItem[],
  },

  projects: {
    sectionTag: "02 / PROJECTS",
    title: "Proof of work.",
    tagline: "Less talk, more shipped.",
    items: [
      {
        id: "proj-1",
        number: "01",
        title: "QR Code Studio",
        subtitle: "Live Web App • Python logic × modern web",
        pitch:
          "Paste a link, get a QR in a blink. Pick a palette (Gold Obsidian, Cyber Neon, Emerald, Classic B&W), tune error correction up to 30% recovery, then download crisp HD PNG or share straight to WhatsApp, Instagram, Facebook or Twitter. All wrapped in a live cyber wallpaper.",
        featureChips: ["4 palettes", "30% recovery", "HD PNG", "1-click share"],
        tags: ["Python", "JavaScript", "HTML5", "CSS3", "QR Algorithms", "Netlify"],
        demoUrl: "https://qrgenerator10.netlify.app/",
        // repoUrl is intentionally undefined since no public repo URL is provided
        image: "/qr-generator.jpg",
        featured: true,
      },
      {
        id: "proj-2",
        number: "02",
        title: "Motion & Media Reel",
        subtitle: "Creative visual storytelling",
        pitch:
          "Edits with rhythm, branding with a point of view, and CMS sites that don't look like CMS sites. Built in Premiere Pro, Canva and WordPress, with a dash of prompt-wrangling.",
        tags: ["Premiere Pro", "Canva", "WordPress", "Prompting", "Figma"],
        demoUrl: "https://drive.google.com/drive/project/1sDko_8WD6bcJ57QCzugjQVvvrm7yfyfU?usp=sharing",
        isCustomVisual: true, // rendered via CSS video editor timeline illustration
        featured: false,
      },
      {
        id: "proj-3",
        number: "03",
        title: "Next build loading…",
        subtitle: "In the workshop",
        pitch: "Got an idea? Pitch me →",
        tags: ["Next.js", "AI Integration", "TypeScript", "Work in Progress"],
        demoUrl: "#contact",
      },
    ] as ProjectItem[],
  },

  skills: {
    sectionTag: "03 / SKILLS",
    title: "The toolkit.",
    tagline: "Sharpened daily, honestly rated.",
    marqueeRow1: [
      "Python", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "HTML5", "CSS3", "JavaScript", "Next.js", "Git"
    ],
    marqueeRow2: [
      "Adobe Premiere Pro", "Figma", "Canva", "AWS", "SQL", "Java", "C Programming", "Batch Scripting", "WordPress", "Netlify"
    ],
    categories: [
      {
        category: "Web Development",
        tagline: "Pixels to servers.",
        description: "Front-end and back-end web architecture, reactive UI frameworks, CMS, and modern cloud deployment platforms.",
        skills: [
          { name: "HTML", level: "Expert", score: 5, featured: true },
          { name: "CSS", level: "Expert", score: 5, featured: true },
          { name: "JavaScript", level: "Advanced", score: 4, featured: true },
          { name: "React.js", level: "Advanced", score: 4, featured: true },
          { name: "Node.js", level: "Intermediate", score: 3, featured: true },
          { name: "Tailwind CSS", level: "Advanced", score: 4, featured: true },
          { name: "WordPress", level: "Intermediate", score: 3, featured: true },
          { name: "Netlify", level: "Intermediate", score: 3, featured: true },
          { name: "Vercel", level: "Intermediate", score: 3, featured: true },
        ],
      },
      {
        category: "Languages & Automation",
        tagline: "Logic, loops and laziness-killing scripts.",
        description: "Core algorithmic languages, structured database management, and command automation scripts.",
        skills: [
          { name: "Python", level: "Advanced", score: 4, featured: true },
          { name: "Batch File", level: "Intermediate", score: 3, featured: true },
          { name: "Java", level: "Intermediate", score: 3, featured: true },
          { name: "C Programming", level: "Intermediate", score: 3, featured: true },
          { name: "SQL", level: "Intermediate", score: 3, featured: true },
        ],
      },
      {
        category: "Creative Studio",
        tagline: "Where code meets color.",
        description: "High-cadence multimedia production, interface design, brand identity systems, and generative AI prompt craft.",
        skills: [
          { name: "Premiere Pro", level: "Advanced", score: 4, featured: true },
          { name: "Canva", level: "Expert", score: 5, featured: true },
          { name: "Prompting", level: "Advanced", score: 4, featured: true },
          { name: "Figma", level: "Intermediate", score: 3, featured: true },
        ],
      },
      {
        category: "Core Skills",
        tagline: "The soft skills that make hard things ship.",
        description: "Collaborative and strategic competencies that turn complex engineering problems into clean solutions.",
        skills: [
          { name: "Problem Solving", level: "Expert", score: 5, featured: true },
          { name: "Strategic Planning", level: "Advanced", score: 4, featured: true },
          { name: "Teamwork", level: "Expert", score: 5, featured: true },
          { name: "Communication", level: "Advanced", score: 4, featured: true },
        ],
      },
    ] as SkillCategory[],
  },

  experience: {
    sectionTag: "04 / EXPERIENCE",
    title: "Where I show up.",
    tagline: "Learning in public, volunteering loudly.",
    items: [
      {
        id: "exp-1",
        role: "Volunteer",
        company: "AWS Cloud Club APSIT",
        location: "Thane, Maharashtra",
        period: "March 2026 – Present",
        startDate: "2026-03-01",
        current: true,
        type: "Student Activities / Community Volunteer",
        bullets: [
          "Contribute to cloud initiatives and student tech activities across campus.",
          "Help organize technical events and collaborative learning sessions.",
          "Build teamwork and hands-on exposure to cloud and event coordination.",
        ],
        technologies: ["Cloud Computing", "AWS", "Event Coordination", "Technical Workshops", "Teamwork"],
      },
    ] as ExperienceItem[],
    ghostNode: {
      headline: "Next chapter: open to internships.",
      actionText: "Let's talk →",
      actionHref: "#contact",
    },
  },

  education: {
    sectionTag: "05 / EDUCATION",
    title: "The foundation.",
    tagline: "Four years, one degree, a lot of curiosity.",
    items: [
      {
        id: "edu-1",
        degree: "B.E. Computer Science Engineering (AI & ML)",
        institution: "A. P. Shah Institute of Technology, Thane, affiliated to the University of Mumbai",
        location: "Thane, Maharashtra",
        period: "Sept 2025 – Sept 2029",
        startDate: "2025-09-01",
        endDate: "2029-09-30",
        currentProgressLabel: "Year 2 of 4",
        highlights: [
          "Second-year student specializing in Artificial Intelligence and Machine Learning",
          "Rigorous coursework in Data Structures, Algorithms, AI Concepts, and Software Engineering",
          "Affiliated University Degree Program in Computer Science Engineering",
          "Foundational focus on engineering mathematics, computation, and software engineering",
          "Active student volunteer participating in campus technology clubs and workshops",
        ],
      },
      {
        id: "edu-2",
        degree: "Higher Secondary Education (MSBSHSE)",
        institution: "Maharashtra State Board of Secondary and Higher Secondary Education",
        location: "Maharashtra, India",
        period: "June 2023 – June 2025",
        highlights: [
          "Completed Higher Secondary Certificate coursework with strong grounding in Science & Mathematics",
        ],
      },
    ] as EducationItem[],
    graduationYear: 2029,
  },

  certifications: {
    sectionTag: "06 / CERTIFICATIONS",
    title: "Receipts.",
    tagline: "Credentials and contributions.",
    items: [
      {
        id: "cert-1",
        number: "REC-01",
        title: "AWS Cloud Club APSIT Volunteer & Contributor",
        issuer: "AWS Cloud Club APSIT",
        issueDate: "2026",
        credentialId: "APSIT-CLOUD-VOL",
        // No specific verification URL for internal campus club accreditation
      },
      {
        id: "cert-2",
        number: "REC-02",
        title: "Video Editing & Digital Content Production",
        issuer: "Adobe Premiere Pro & Canva",
        issueDate: "2025",
        credentialId: "MEDIA-CREATIVE-2025",
      },
      {
        id: "cert-3",
        number: "REC-03",
        title: "Web Development Foundations (React & Node.js)",
        issuer: "Frontend & Backend Development",
        issueDate: "2025",
        credentialId: "WEB-DEV-FOUND",
      },
    ] as CertificationItem[],
  },

  contact: {
    sectionTag: "07 / CONTACT",
    heading: "Got an idea? Let's make it loud.",
    subheading: "Internship, collab, or a project too ambitious for a normal Tuesday: my inbox is open.",
    email: "phosion10@gmail.com",
    copiedToast: "Email copied. Go write something great.",
    location: "Mumbai, Maharashtra, India",
    mailtoFallbackText: "Or open direct mail client →",
    formLabels: {
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message",
      submitButton: "Send Message →",
      sendingButton: "Transmitting...",
      successTitle: "Transmission Received.",
      successMessage: "Thank you for reaching out! I'll review your note and get back to you shortly.",
    },
  },

  footer: {
    wordmark: "ABHISHEK MULE",
    copyright: "© 2026 Abhishek Mule. Built with curiosity.",
    timeZone: "Asia/Kolkata",
    city: "Mumbai",
  },

  seo: {
    title: "Abhishek Mule | CSE (AI & ML) Student · Web Developer · Video Editor",
    description:
      "Official portfolio of Abhishek Mule — 2nd-year CSE (AI & ML) student at A. P. Shah Institute of Technology, web developer, video editor, and AWS Cloud Club APSIT volunteer in Mumbai.",
    siteUrl: "https://abhishekresume02.netlify.app",
    ogImage: "/og-image.png",
    keywords: [
      "Abhishek Mule",
      "Computer Science Engineering",
      "AI & ML",
      "A. P. Shah Institute of Technology",
      "APSIT",
      "University of Mumbai",
      "Web Developer",
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "Python",
      "Video Editor",
      "Adobe Premiere Pro",
      "AWS Cloud Club APSIT",
      "Portfolio",
      "Mumbai",
    ],
  },
};

// Also export alias for compatibility
export const portfolioData = portfolioContent;
export default portfolioContent;

