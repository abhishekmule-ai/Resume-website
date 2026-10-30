"use client";

import React, { useState } from "react";
import { portfolioContent } from "@/data/content";
import { Container } from "@/components/ui/container";
import { 
  MapPin, 
  Briefcase, 
  Mail, 
  Copy, 
  Check, 
  BrainCircuit, 
  Layout, 
  Terminal, 
  Film, 
  Globe, 
  Cloud 
} from "lucide-react";

export function About() {
  const { about } = portfolioContent;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(about.overview.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "BrainCircuit":
        return <BrainCircuit className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
      case "Layout":
        return <Layout className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
      case "Film":
        return <Film className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
      case "Cloud":
        return <Cloud className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
      default:
        return <BrainCircuit className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
    }
  };

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 bg-[#F6F7F9] text-[#0A0D14] dark:bg-[#0F1217] dark:text-[#F6F7F9] transition-colors"
    >
      <Container>
        {/* Section Mono Label */}
        <div className="font-mono text-xs uppercase tracking-widest text-cobalt dark:text-[#5CE1FF] mb-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-volt-lime rounded-full" />
          <span>{about.sectionTag}</span>
        </div>

        {/* Section Heading with Volt-Lime Highlighter Sweep */}
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-12 max-w-4xl">
          <span>{about.headingLead}</span>
          <span className="highlighter-sweep font-black text-[#0A0D14] dark:text-[#0A0D14]">
            {about.headingHighlight}
          </span>
        </h2>

        {/* 2-Column Grid: Left ID Badge / Right Bio Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left (5 cols): Boarding-Pass / ID-Badge Card */}
          <div className="lg:col-span-5">
            <div className="blueprint-card relative bg-white dark:bg-[#070C1A] border-2 border-cobalt/40 dark:border-[#5CE1FF]/30 rounded-2xl p-6 sm:p-7 shadow-lg shadow-black/5 dark:shadow-black/30">
              {/* Header with Boarding Pass Aesthetic */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-dashed border-cobalt/30 dark:border-[#5CE1FF]/20 font-mono text-xs">
                <span className="text-cobalt dark:text-[#5CE1FF] font-bold">
                  PASSENGER // IDENTIFICATION
                </span>
                <span className="text-[#8B949E] tracking-widest">NO. 2026-CSE</span>
              </div>

              {/* Overview Details */}
              <div className="space-y-4 font-mono text-xs">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cobalt/10 dark:bg-[#5CE1FF]/10 text-cobalt dark:text-[#5CE1FF]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-[#8B949E] font-semibold">Location</div>
                    <div className="text-sm font-sans font-bold text-[#0A0D14] dark:text-white mt-0.5">
                      {about.overview.location}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-volt-lime/20 text-[#0A0D14] dark:text-volt-lime">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-[#8B949E] font-semibold">Status</div>
                    <div className="text-sm font-sans font-bold text-[#0A0D14] dark:text-white mt-0.5">
                      {about.overview.status}
                    </div>
                  </div>
                </div>

                {/* Email (Copy-on-click) */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cobalt/10 dark:bg-[#5CE1FF]/10 text-cobalt dark:text-[#5CE1FF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase text-[#8B949E] font-semibold">Direct Email</div>
                    <button
                      onClick={handleCopyEmail}
                      className="group flex items-center justify-between w-full mt-1 px-3 py-2 rounded-lg bg-[#F0F2F5] dark:bg-[#0F1217] border border-cobalt/20 dark:border-[#5CE1FF]/20 hover:border-volt-lime transition-all text-left"
                      aria-label="Copy email address"
                    >
                      <span className="font-mono text-xs text-[#0A0D14] dark:text-white group-hover:text-cobalt dark:group-hover:text-volt-lime truncate mr-2">
                        {about.overview.email}
                      </span>
                      {copied ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-volt-lime">
                          <Check className="w-3.5 h-3.5" />
                          Copied!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] text-[#8B949E] group-hover:text-cobalt dark:group-hover:text-[#5CE1FF]">
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Barcode Strip Graphic */}
              <div className="mt-6 pt-4 border-t border-dashed border-cobalt/30 dark:border-[#5CE1FF]/20 flex items-center justify-between">
                <div
                  className="h-7 w-48 opacity-70 bg-[repeating-linear-gradient(90deg,#0A0D14_0,#0A0D14_2px,transparent_2px,transparent_4px,#0A0D14_4px,#0A0D14_7px,transparent_7px,transparent_9px)] dark:bg-[repeating-linear-gradient(90deg,#F6F7F9_0,#F6F7F9_2px,transparent_2px,transparent_4px,#F6F7F9_4px,#F6F7F9_7px,transparent_7px,transparent_9px)]"
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] text-[#8B949E]">AI·ML·2026</span>
              </div>
            </div>
          </div>

          {/* Right (7 cols): Three Short Paragraphs with Highlights */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg leading-relaxed text-[#5A6272] dark:text-[#8B949E]">
            {about.paragraphs.map((para, pIdx) => (
              <p
                key={pIdx}
                className="bg-white/60 dark:bg-[#070C1A]/40 p-5 rounded-xl border border-black/5 dark:border-[#5CE1FF]/10 shadow-sm"
              >
                {para.text}
              </p>
            ))}
          </div>
        </div>

        {/* "What I Bring" Section - 6 Icon Tiles */}
        <div className="pt-6 border-t border-black/10 dark:border-[#5CE1FF]/15">
          <div className="font-mono text-xs uppercase tracking-widest text-cobalt dark:text-[#5CE1FF] mb-6">
            {"// WHAT I BRING TO THE TABLE"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {about.whatIBring.map((item, idx) => (
              <div
                key={idx}
                className="card-hover-blueprint p-5 rounded-xl bg-white dark:bg-[#070C1A] border border-black/10 dark:border-[#5CE1FF]/20 shadow-sm flex items-start gap-4"
              >
                <div className="p-2.5 rounded-lg bg-cobalt/10 dark:bg-[#5CE1FF]/10 flex-shrink-0">
                  {renderIcon(item.icon)}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm sm:text-base text-[#0A0D14] dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5A6272] dark:text-[#8B949E] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
