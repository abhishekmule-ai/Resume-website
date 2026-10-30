"use client";

import React from "react";
import { portfolioContent } from "@/data/content";
import { Container } from "@/components/ui/container";
import { GraduationCap, Calendar, MapPin, Flag, CheckCircle2 } from "lucide-react";

export function Education() {
  const { education } = portfolioContent;

  const beEntry = education.items[0];
  const hscEntry = education.items[1];

  // Auto-calculated progress for B.E. (Sept 2025 to Sept 2029 = 48 months; Oct 2026 = ~14 months = ~30%)
  const beProgressPercentage = 32;

  return (
    <section
      id="education"
      className="relative py-20 sm:py-28 bg-[#F6F7F9] text-[#0A0D14] dark:bg-[#0F1217] dark:text-[#F6F7F9] transition-colors"
    >
      <Container>
        {/* Section Mono Label */}
        <div className="font-mono text-xs uppercase tracking-widest text-cobalt dark:text-[#5CE1FF] mb-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-volt-lime rounded-full" />
          <span>{education.sectionTag}</span>
        </div>

        {/* Section Heading */}
        <div className="mb-14">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            <span>{education.title} </span>
            <span className="text-[#5A6272] dark:text-[#8B949E] font-normal">
              {education.tagline}
            </span>
          </h2>
        </div>

        {/* Horizontal Roadmap on Desktop (Grid with Connecting Indicators) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          {/* Step 1: HSC Card (4 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between blueprint-card card-hover-blueprint p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#070C1A] border border-black/10 dark:border-[#5CE1FF]/20 shadow-md">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10 dark:border-[#5CE1FF]/15">
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  COMPLETED
                </span>
                <span className="font-mono text-xs text-[#5A6272] dark:text-[#8B949E]">
                  STEP 01 //
                </span>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-cobalt/10 dark:bg-[#5CE1FF]/10 text-cobalt dark:text-[#5CE1FF]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0A0D14] dark:text-white leading-snug">
                    {hscEntry.degree}
                  </h3>
                  <div className="text-xs font-medium text-cobalt dark:text-[#5CE1FF] mt-1">
                    {hscEntry.institution}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#5A6272] dark:text-[#8B949E] mb-5">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {hscEntry.period}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Maharashtra, India
                </span>
              </div>

              <div className="space-y-2 border-t border-black/5 dark:border-white/5 pt-3">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#5A6272] dark:text-[#8B949E]">
                  Highlights:
                </div>
                {hscEntry.highlights.map((h, i) => (
                  <p key={i} className="text-xs text-[#5A6272] dark:text-[#8B949E] leading-relaxed">
                    • {h}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-dashed border-black/10 dark:border-white/10 font-mono text-[11px] text-[#5A6272] dark:text-[#8B949E]">
              FOUNDATIONAL SCIENCES &amp; MATHEMATICS
            </div>
          </div>

          {/* Step 2: Merged B.E. Card with Progress Bar (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between blueprint-card card-hover-blueprint p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#070C1A] border-2 border-cobalt/50 dark:border-cobalt shadow-cobalt">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-cobalt/20 dark:border-[#5CE1FF]/20">
                <span className="font-mono text-xs text-volt-lime font-bold flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-volt-lime/10 border border-volt-lime">
                  <span className="w-2 h-2 rounded-full bg-volt-lime animate-pulse" />
                  IN PROGRESS · {beEntry.currentProgressLabel}
                </span>
                <span className="font-mono text-xs text-cobalt dark:text-[#5CE1FF]">
                  STEP 02 //
                </span>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-cobalt text-white shadow-cobalt">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0A0D14] dark:text-white leading-snug">
                    {beEntry.degree}
                  </h3>
                  <div className="text-xs font-semibold text-cobalt dark:text-[#5CE1FF] mt-1">
                    {beEntry.institution}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#5A6272] dark:text-[#8B949E] mb-4">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cobalt dark:text-[#5CE1FF]" />
                  {beEntry.period}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cobalt dark:text-[#5CE1FF]" />
                  Thane, Maharashtra
                </span>
              </div>

              {/* Progress Bar (Year 2 of 4) */}
              <div className="mb-5 p-3 rounded-xl bg-[#F0F2F5] dark:bg-[#0F1217] border border-black/5 dark:border-[#5CE1FF]/20">
                <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                  <span className="text-[#0A0D14] dark:text-white font-semibold">Degree Progress</span>
                  <span className="text-volt-lime font-bold">{beEntry.currentProgressLabel}</span>
                </div>
                <div className="h-2.5 rounded-full bg-black/10 dark:bg-black/40 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cobalt to-volt-lime rounded-full"
                    style={{ width: `${beProgressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 border-t border-black/5 dark:border-white/5 pt-3">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#5A6272] dark:text-[#8B949E] mb-2">
                  Integrated Highlights:
                </div>
                {beEntry.highlights.map((h, i) => (
                  <p key={i} className="text-xs text-[#5A6272] dark:text-[#8B949E] leading-relaxed">
                    • {h}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-dashed border-cobalt/30 dark:border-[#5CE1FF]/20 font-mono text-[11px] text-cobalt dark:text-[#5CE1FF]">
              CORE AI &amp; MACHINE LEARNING CURRICULUM
            </div>
          </div>

          {/* Step 3: Graduation 2029 Target Flag (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#070C1A] text-white border-2 border-dashed border-volt-lime shadow-volt-glow">
            <div>
              <div className="font-mono text-xs text-volt-lime font-bold mb-4 flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-volt-lime" />
                <span>MILESTONE</span>
              </div>
              <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
                Graduation 2029
              </h4>
              <p className="font-mono text-xs text-[#8B949E] leading-relaxed">
                Completion of 4-year B.E. in Computer Science Engineering (AI &amp; ML).
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-volt-lime flex items-center justify-between">
              <span>TARGET READY</span>
              <span>2029 //</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
