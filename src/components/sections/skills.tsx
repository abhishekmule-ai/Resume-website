"use client";

import React, { useState, useEffect, useRef } from "react";
import { portfolioContent } from "@/data/content";
import { Container } from "@/components/ui/container";
import { Layout, Terminal, Film, Sparkles } from "lucide-react";

export function Skills() {
  const { skills } = portfolioContent;
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("web")) {
      return <Layout className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
    }
    if (cat.includes("language") || cat.includes("automation")) {
      return <Terminal className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
    }
    if (cat.includes("creative") || cat.includes("studio")) {
      return <Film className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
    }
    return <Sparkles className="w-5 h-5 text-cobalt dark:text-[#5CE1FF]" />;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#F6F7F9] text-[#0A0D14] dark:bg-[#0F1217] dark:text-[#F6F7F9] transition-colors overflow-hidden"
    >
      <Container>
        {/* Section Mono Label */}
        <div className="font-mono text-xs uppercase tracking-widest text-cobalt dark:text-[#5CE1FF] mb-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-volt-lime rounded-full" />
          <span>{skills.sectionTag}</span>
        </div>

        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            <span>{skills.title} </span>
            <span className="text-[#5A6272] dark:text-[#8B949E] font-normal">
              {skills.tagline}
            </span>
          </h2>
        </div>
      </Container>

      {/* Two Opposing Marquee Rows of Tech Icons */}
      <div className="mb-16 space-y-3 pointer-events-auto">
        {/* Row 1: Leftward Marquee */}
        <div className="relative w-full overflow-hidden whitespace-nowrap group">
          <div className="inline-flex gap-4 animate-marquee-left group-hover:[animation-play-state:paused]">
            {[...skills.marqueeRow1, ...skills.marqueeRow1, ...skills.marqueeRow1].map((tech, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#070C1A] border border-black/10 dark:border-[#5CE1FF]/20 text-xs sm:text-sm font-mono text-[#0A0D14] dark:text-white shadow-sm flex-shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-cobalt dark:bg-[#5CE1FF]" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Marquee */}
        <div className="relative w-full overflow-hidden whitespace-nowrap group">
          <div className="inline-flex gap-4 animate-marquee-right group-hover:[animation-play-state:paused]">
            {[...skills.marqueeRow2, ...skills.marqueeRow2, ...skills.marqueeRow2].map((tech, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#070C1A] border border-black/10 dark:border-[#5CE1FF]/20 text-xs sm:text-sm font-mono text-[#0A0D14] dark:text-white shadow-sm flex-shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-volt-lime" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Container>
        {/* Four Bento Cards with 5-Segment Meters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skills.categories.map((cat, cIdx) => (
            <div
              key={cIdx}
              className="blueprint-card card-hover-blueprint p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#070C1A] border border-black/10 dark:border-[#5CE1FF]/20 shadow-md shadow-black/5 dark:shadow-black/20 flex flex-col justify-between"
            >
              {/* Category Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-cobalt/10 dark:bg-[#5CE1FF]/10">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#0A0D14] dark:text-white">
                      {cat.category}
                    </h3>
                    <span className="font-mono text-xs text-cobalt dark:text-volt-lime">
                      &quot;{cat.tagline}&quot;
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#5A6272] dark:text-[#8B949E] mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Skills List with 5-Segment Meters */}
              <div className="space-y-3.5 pt-4 border-t border-black/5 dark:border-[#5CE1FF]/10">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-sans font-semibold text-[#0A0D14] dark:text-[#F6F7F9]">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#5A6272] dark:text-[#8B949E] uppercase">
                        {skill.level} ({skill.score}/5)
                      </span>
                    </div>

                    {/* 5-Segment Level Meter */}
                    <div className="flex gap-1.5" role="meter" aria-valuenow={skill.score} aria-valuemin={0} aria-valuemax={5}>
                      {[1, 2, 3, 4, 5].map((segIndex) => {
                        const isFilled = isInView && segIndex <= skill.score;
                        const isMax = segIndex === 5 && skill.score === 5;

                        return (
                          <div
                            key={segIndex}
                            className={`meter-segment ${
                              isFilled
                                ? isMax
                                  ? "active-volt"
                                  : "active-cobalt"
                                : "bg-black/10 dark:bg-white/10"
                            }`}
                            style={{
                              transitionDelay: `${sIdx * 40 + segIndex * 30}ms`,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
