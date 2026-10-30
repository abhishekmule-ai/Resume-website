"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileText, Send } from "lucide-react";
import { portfolioContent } from "@/data/content";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const { personal, navItems } = portfolioContent;

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state for shrinking
      setScrolled(window.scrollY > 20);

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Scroll spy logic
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const secId = sections[i];
        const el = document.getElementById(secId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(secId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070C1A]/90 dark:bg-[#070C1A]/90 backdrop-blur-md border-b border-[#5CE1FF]/15 py-2.5 shadow-lg shadow-black/40"
          : "bg-[#070C1A]/70 dark:bg-[#070C1A]/70 backdrop-blur-sm py-4 border-b border-[#5CE1FF]/10"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Left: Mono Brandmark <AM /> with Blinking Cursor + Abhishek Mule */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm sm:text-base tracking-tight focus-visible:ring-2 focus-visible:ring-volt-lime rounded-md"
            aria-label="Abhishek Mule Portfolio Home"
          >
            <div className="flex items-center gap-1.5 font-mono text-sm px-2.5 py-1 rounded-md bg-[#0F1217] border border-[#5CE1FF]/30 text-[#5CE1FF] shadow-inner group-hover:border-[#1F5BFF] transition-colors">
              <span className="text-volt-lime font-bold">&lt;AM</span>
              <span className="text-[#5CE1FF] font-semibold">/&gt;</span>
              <span className="inline-block w-1.5 h-3.5 bg-volt-lime animate-blink-cursor" />
            </div>
            <span className="font-display font-bold text-white group-hover:text-[#5CE1FF] transition-colors hidden sm:inline-block">
              {personal.name}
            </span>
          </Link>

          {/* Desktop Navigation Links with Scroll-Spy Indicator */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const secId = item.href.replace("#", "");
              const isActive = activeSection === secId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider transition-all duration-200 rounded-md ${
                    isActive
                      ? "text-volt-lime"
                      : "text-[#8B949E] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-[10px] text-[#5CE1FF]/60 mr-1">{item.number}.</span>
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-volt-lime rounded-full shadow-volt-glow" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Items: Theme Toggle, Outlined Résumé Pill, Solid Cobalt Get in Touch */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />

            {/* Outlined Résumé Pill */}
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#5CE1FF]/30 hover:border-volt-lime font-mono text-xs font-semibold text-white hover:text-volt-lime hover:bg-[#5CE1FF]/5 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#5CE1FF]" />
              <span>Résumé</span>
            </a>

            {/* Solid Cobalt CTA Pill */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cobalt hover:bg-cobalt-hover text-white font-mono text-xs font-bold transition-all shadow-cobalt hover:shadow-cobalt-lg hover:translate-y-[-1px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle size="sm" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-[#0F1217] border border-[#5CE1FF]/25 text-white hover:border-volt-lime transition-colors"
              aria-label="Toggle Fullscreen Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5 text-volt-lime" /> : <Menu className="h-5 w-5 text-[#5CE1FF]" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Thin Scroll Progress Bar on Bottom Edge */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cobalt via-[#5CE1FF] to-volt-lime transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Mobile Full-Screen Overlay Menu with Large Numbered Links */}
      {isOpen && (
        <div className="fixed inset-0 top-[53px] z-50 bg-[#070C1A]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200">
          <div className="blueprint-grid absolute inset-0 opacity-15 pointer-events-none" />

          {/* Corner Crosshairs */}
          <div className="absolute top-4 left-4 text-[#5CE1FF] font-mono text-xs">+</div>
          <div className="absolute top-4 right-4 text-[#5CE1FF] font-mono text-xs">+</div>
          <div className="absolute bottom-4 left-4 text-[#5CE1FF] font-mono text-xs">+</div>
          <div className="absolute bottom-4 right-4 text-[#5CE1FF] font-mono text-xs">+</div>

          <div className="space-y-1 relative z-10 my-auto">
            <p className="font-mono text-xs text-[#5CE1FF] uppercase tracking-widest mb-4">
              {"// INDEX NAVIGATION"}
            </p>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between py-3 border-b border-white/10 hover:border-volt-lime transition-colors"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-volt-lime">{item.number}</span>
                  <span className="font-display text-2xl font-extrabold text-white group-hover:text-volt-lime transition-colors">
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#5CE1FF] opacity-0 group-hover:opacity-100 transition-opacity">
                  GO →
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Action Dock */}
          <div className="relative z-10 pt-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#5CE1FF]/40 bg-[#0F1217] font-mono text-xs font-semibold text-white hover:border-volt-lime"
              >
                <FileText className="w-4 h-4 text-[#5CE1FF]" />
                Résumé PDF
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cobalt font-mono text-xs font-bold text-white shadow-cobalt"
              >
                <Send className="w-4 h-4" />
                Contact
              </a>
            </div>
            <div className="text-center">
              <span className="font-mono text-[11px] text-[#8B949E]">
                MUMBAI · 2ND YEAR CSE (AI &amp; ML)
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
