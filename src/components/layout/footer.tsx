import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/social-icons";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Footer() {
  const { personal, navItems, socialLinks } = portfolioData;
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "github":
        return <GithubIcon className="h-4 w-4" />;
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4" />;
      case "twitter":
        return <TwitterIcon className="h-4 w-4" />;
      case "mail":
        return <Mail className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <footer className="border-t border-surface-border bg-background py-12 text-sm text-muted-foreground">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 rounded-md bg-zinc-950 border border-white/10 p-0.5 overflow-hidden flex items-center justify-center">
                <Image
                  src="/favicon.png"
                  alt="AM Logo"
                  width={20}
                  height={20}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-semibold text-foreground">{personal.name}</span>
            </div>
            <span className="hidden sm:inline text-surface-border">•</span>
            <span>© {currentYear} All rights reserved.</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <MagneticButton key={social.platform} strength={0.35}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-elevated/60 text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors inline-flex"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.icon)}
                </a>
              </MagneticButton>
            ))}
            <ThemeToggle size="sm" className="ml-1" />
            <MagneticButton strength={0.35} className="ml-1">
              <a
                href="#"
                className="p-2 rounded-lg bg-surface-elevated/60 text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors inline-flex"
                aria-label="Back to top"
              >
                <ArrowUp className="h-4 w-4" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </Container>
    </footer>
  );
}
