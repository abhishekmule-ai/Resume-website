"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileDown, Send } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { personal, navItems } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-surface-border shadow-lg shadow-black/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-bold text-lg tracking-tight"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-black text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              {personal.name.slice(0, 1)}
            </div>
            <span className="text-foreground group-hover:text-blue-400 transition-colors">
              {personal.name}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <MagneticButton strength={0.25}>
              <a
                href={personal.resumeUrl}
                download
                className="inline-flex"
              >
                <Button variant="outline" size="sm">
                  <FileDown className="h-4 w-4" />
                  Resume
                </Button>
              </a>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <a href={`mailto:${personal.email}`} className="inline-flex">
                <Button variant="primary" size="sm">
                  <Send className="h-4 w-4" />
                  Get in Touch
                </Button>
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle size="sm" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-surface-border bg-surface-elevated/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl space-y-2">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-surface-border flex flex-col gap-2">
              <a
                href={personal.resumeUrl}
                download
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <FileDown className="h-4 w-4" />
                  Download Resume
                </Button>
              </a>
              <a
                href={`mailto:${personal.email}`}
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Button variant="primary" size="sm" className="w-full">
                  <Send className="h-4 w-4" />
                  Get in Touch
                </Button>
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
