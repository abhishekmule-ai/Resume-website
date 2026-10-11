export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon: string;
}

export interface QuickStat {
  label: string;
  value: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  icon?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  description?: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string; // e.g. "Full-time", "Contract"
  description: string;
  achievements: string[];
  technologies: string[];
  current?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    shortBio: string;
    fullBio: string[];
    location: string;
    email: string;
    phone?: string;
    availableForHire: boolean;
    availabilityStatus: string;
    profileImage: string;
    resumeUrl: string;
  };
  socialLinks: SocialLink[];
  stats: QuickStat[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  navItems: NavItem[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
  };
}
