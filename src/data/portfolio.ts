import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Abhishek Mule",
    role: "CSE (AI & ML) Student | Web Developer | Video Editor | AWS Cloud Club Volunteer",
    tagline:
      "Second-year Computer Science Engineering student specializing in AI & Machine Learning, building practical web solutions, creating engaging video content, and contributing to cloud initiatives.",
    shortBio:
      "Second-year Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning, with skills in front-end and back-end web development and video editing. Interested in building practical digital solutions, creating engaging video content, and contributing to collaborative technology projects.",
    fullBio: [
      "I am a second-year Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at A. P. Shah Institute of Technology, affiliated with the University of Mumbai.",
      "My technical foundation bridges front-end and back-end web development with HTML, CSS, JavaScript, React.js, Node.js, and Tailwind CSS, alongside core programming and automation scripting in Python and Batch File.",
      "Beyond code, I have practical experience in digital media production with Adobe Premiere Pro, Canva, WordPress, and Wix. As an active volunteer at AWS Cloud Club APSIT, I contribute to cloud-related initiatives, support technical events, and foster collaborative learning across the student community.",
    ],
    location: "Mumbai, Maharashtra, India",
    email: "phosion10@gmail.com",
    availableForHire: true,
    availabilityStatus: "Open to internships, projects & technology collaborations",
    profileImage: "/profile.jpg",
    resumeUrl: "/Abhishek_Mule_Resume.pdf",
  },

  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      username: "LinkedIn Profile",
      icon: "Linkedin",
    },
    {
      platform: "Email",
      url: "mailto:phosion10@gmail.com",
      username: "phosion10@gmail.com",
      icon: "Mail",
    },
    {
      platform: "GitHub",
      url: "https://github.com",
      username: "GitHub",
      icon: "Github",
    },
  ],

  stats: [
    {
      label: "Current Specialization",
      value: "AI & ML",
      description: "CSE at A. P. Shah Institute of Technology",
    },
    {
      label: "Academic Standing",
      value: "2nd Year",
      description: "Bachelor of Engineering (B.E.)",
    },
    {
      label: "Technical Skills",
      value: "14+",
      description: "Web dev, Python, video editing & cloud",
    },
    {
      label: "Community Activity",
      value: "AWS Volunteer",
      description: "AWS Cloud Club APSIT",
    },
  ],

  skills: [
    {
      category: "Web Development",
      description: "Front-end and back-end technologies for developing responsive, accessible, and functional web applications.",
      skills: [
        { name: "React.js", level: "Advanced", featured: true },
        { name: "Node.js", level: "Intermediate", featured: true },
        { name: "JavaScript", level: "Advanced", featured: true },
        { name: "Tailwind CSS", level: "Advanced", featured: true },
        { name: "HTML", level: "Expert", featured: true },
        { name: "CSS", level: "Expert", featured: true },
      ],
    },
    {
      category: "Other Languages & Computing",
      description: "Programming languages and automation scripts for algorithmic logic and computing.",
      skills: [
        { name: "Python", level: "Advanced", featured: true },
        { name: "Batch File", level: "Intermediate", featured: true },
        { name: "AI & Machine Learning", level: "Intermediate", featured: true },
      ],
    },
    {
      category: "Video Editing & Media Tools",
      description: "Creative multimedia content creation, visual storytelling, and CMS web platforms.",
      skills: [
        { name: "Adobe Premiere Pro", level: "Advanced", featured: true },
        { name: "Canva", level: "Expert", featured: true },
        { name: "Wordpress", level: "Intermediate", featured: true },
        { name: "Wix", level: "Intermediate" },
        { name: "Prompting", level: "Advanced", featured: true },
      ],
    },
    {
      category: "Core Skills",
      description: "Analytical methodology, strategic planning, and collaborative execution across initiatives.",
      skills: [
        { name: "Problem Solving", level: "Expert", featured: true },
        { name: "Strategic Planning", level: "Advanced", featured: true },
        { name: "Teamwork", level: "Expert", featured: true },
        { name: "Communication", level: "Advanced", featured: true },
      ],
    },
  ],

  experience: [
    {
      id: "exp-1",
      role: "Volunteer",
      company: "AWS Cloud Club APSIT",
      location: "Thane, Maharashtra",
      period: "March 2026 – Present",
      type: "Student Activities / Volunteer",
      current: true,
      description:
        "Contributing to student technology activities, cloud-related initiatives, and collaborative learning events across the engineering campus.",
      achievements: [
        "Contribute to cloud-related initiatives and student technology activities.",
        "Support the organization of technical events and collaborative learning opportunities.",
        "Build teamwork and gain practical exposure to cloud technologies and event coordination.",
      ],
      technologies: ["Cloud Computing", "AWS", "Event Coordination", "Technical Workshops", "Teamwork"],
    },
  ],

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Engineering (B.E.), Computer Science Engineering — AI & ML",
      institution: "A. P. Shah Institute of Technology, Thane",
      location: "Thane, Maharashtra",
      period: "September 2025 – September 2029",
      highlights: [
        "Second-year student specializing in Artificial Intelligence and Machine Learning",
        "Rigorous coursework in Data Structures, Algorithms, AI Concepts, and Software Engineering",
        "Active student volunteer participating in campus technology clubs and workshops",
      ],
    },
    {
      id: "edu-2",
      degree: "Bachelor of Engineering (B.E.), Computer Science",
      institution: "University of Mumbai",
      location: "Mumbai, Maharashtra",
      period: "September 2025 – September 2029",
      highlights: [
        "Affiliated University Degree Program in Computer Science Engineering",
        "Foundational focus on engineering mathematics, computation, and software engineering",
      ],
    },
    {
      id: "edu-3",
      degree: "Higher Secondary Education (MSBSHSE)",
      institution: "Maharashtra State Board of Secondary and Higher Secondary Education",
      location: "Maharashtra, India",
      period: "June 2023 – June 2025",
      highlights: [
        "Completed Higher Secondary Certificate coursework with strong grounding in Science & Mathematics",
      ],
    },
  ],

  projects: [
    {
      id: "proj-1",
      title: "Digital Media & Video Editing Production Reel",
      description:
        "Collection of high-engagement video edits, visual branding assets, and CMS web designs crafted using Adobe Premiere Pro, Canva, and WordPress.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
      tags: ["Adobe Premiere Pro", "Canva", "Wordpress", "Prompting"],
      demoUrl: "#",
      githubUrl: "https://github.com",
      featured: true,
      metrics: "Creative visual storytelling & multimedia",
    },
  ],

  certifications: [
    {
      id: "cert-1",
      title: "AWS Cloud Club APSIT Volunteer & Contributor",
      issuer: "AWS Cloud Club APSIT",
      issueDate: "2026",
      credentialUrl: "https://aws.amazon.com",
      credentialId: "APSIT-CLOUD-VOL",
    },
    {
      id: "cert-2",
      title: "Video Editing & Digital Content Production",
      issuer: "Adobe Premiere Pro & Canva",
      issueDate: "2025",
      credentialId: "MEDIA-CREATIVE-2025",
    },
    {
      id: "cert-3",
      title: "Web Development Foundations (React & Node.js)",
      issuer: "Frontend & Backend Development",
      issueDate: "2025",
      credentialId: "WEB-DEV-FOUND",
    },
  ],

  navItems: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
  ],

  seo: {
    title: "Resume",
    description:
      "Official portfolio of Abhishek Mule — Second-year Computer Science Engineering student specializing in AI & ML, web development (React.js, Node.js), video editing, and AWS Cloud Club volunteer in Mumbai.",
    keywords: [
      "Abhishek Mule",
      "Computer Science Engineering",
      "AI & ML",
      "Web Developer",
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "Python",
      "Video Editor",
      "Adobe Premiere Pro",
      "AWS Cloud Club APSIT",
      "Mumbai",
    ],
    siteUrl: "https://abhishekmule.dev",
  },
};
