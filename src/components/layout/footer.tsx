"use client";

import React, { useState, useEffect } from "react";
import { portfolioContent } from "@/data/content";
import { Container } from "@/components/ui/container";
import { ArrowUp, Clock } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/social-icons";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Footer() {
  const { navItems, socialLinks, footer } = portfolioContent;
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTimeString(`${formatter.format(new Date())} IST`);
      } catch {
        setTimeString("18:30 IST");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <GithubIcon className="h-4 w-4" />;
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4" />;
      case "instagram":
        return <InstagramIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <footer className="relative bg-[#0F1217] text-white border-t border-[#5CE1FF]/15 pt-16 pb-12 overflow-hidden">
      {/* Blueprint Grid Watermark in Background */}
      <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />

      {/* Crosshair accents at corners */}
      <div className="absolute top-4 left-6 text-[#5CE1FF] font-mono text-xs select-none">+</div>
      <div className="absolute top-4 right-6 text-[#5CE1FF] font-mono text-xs select-none">+</div>
      <div className="absolute bottom-4 left-6 text-[#5CE1FF] font-mono text-xs select-none">+</div>
      <div className="absolute bottom-4 right-6 text-[#5CE1FF] font-mono text-xs select-none">+</div>

      <Container className="relative z-10">
        {/* Oversized Outlined Wordmark */}
        <div className="border-b border-[#5CE1FF]/15 pb-12 mb-10 text-center lg:text-left">
          <div className="font-mono text-xs text-[#5CE1FF] uppercase tracking-widest mb-3">
            {"// SPECIFICATION SIGN-OFF"}
          </div>
          <h2
            className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tightest stroke-text-muted hover:stroke-text transition-all duration-300 select-none"
            aria-label={footer.wordmark}
          >
            {footer.wordmark}
          </h2>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-8 border-b border-white/10 text-sm">
          {/* Quick Navigation Links */}
          <div className="md:col-span-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-xs uppercase tracking-wider text-[#8B949E] hover:text-volt-lime transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Live Mumbai Clock */}
          <div className="md:col-span-3 flex items-center md:justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070C1A] border border-[#5CE1FF]/25 font-mono text-xs text-[#5CE1FF]">
              <Clock className="w-3.5 h-3.5 text-volt-lime animate-pulse" />
              <span>
                {footer.city} · {timeString || "18:30 IST"}
              </span>
            </div>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-3">
            {socialLinks
              .filter((s) => s.platform !== "Email")
              .map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#070C1A] border border-[#5CE1FF]/20 text-[#8B949E] hover:text-white hover:border-[#1F5BFF] hover:shadow-cobalt transition-all"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}

            <ThemeToggle size="sm" />

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#070C1A] border border-[#5CE1FF]/20 text-volt-lime hover:border-volt-lime hover:shadow-volt-glow transition-all"
              aria-label="Back to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright & Sign-off bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8B949E]">
          <div>{footer.copyright}</div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-volt-lime animate-pulse" />
            <span>APSIT CSE (AI &amp; ML) · MUMBAI, INDIA</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
