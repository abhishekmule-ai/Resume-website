"use client";

import React, { useMemo } from "react";
import { portfolioContent } from "@/data/content";
import { Container } from "@/components/ui/container";
import { Calendar, MapPin, ArrowRight, Cloud, CheckCircle2 } from "lucide-react";

export function Experience() {
  const { experience } = portfolioContent;

  const monthsIn = useMemo(() => {
    try {
      const item = experience.items[0];
      if (!item || !item.startDate) return 8;
      const start = new Date(item.startDate);
      const now = new Date();
      const diffMonths =
        (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
      return Math.max(1, diffMonths);
    } catch {
      return 8;
    }
  }, [experience.items]);

  return (
    <section
      id="experience"
      className="relative py-20 sm:py-28 bg-[#0F1217] text-white dark:bg-[#070C1A] dark:text-white transition-colors"
    >
      <Container>
        {/* Section Mono Label */}
        <div className="font-mono text-xs uppercase tracking-widest text-[#5CE1FF] mb-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-volt-lime rounded-full" />
          <span>{experience.sectionTag}</span>
        </div>

        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
            <span>{experience.title} </span>
            <span className="text-[#8B949E] font-normal">{experience.tagline}</span>
          </h2>
        </div>

        {/* Vertical Timeline with Glowing Cobalt Line */}
        <div className="relative pl-6 sm:pl-10 ml-2 sm:ml-6 border-l-2 border-cobalt/60 shadow-[0_0_15px_rgba(31,91,255,0.3)] space-y-12">
          {experience.items.map((item) => (
            <div key={item.id} className="relative group">
              {/* Pulsing Cobalt Node on Timeline */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt-lime opacity-75" />
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-cobalt border-2 border-white shadow-cobalt" />
                </span>
              </div>

              {/* Experience Card */}
              <div className="blueprint-card p-6 sm:p-8 rounded-2xl bg-[#070C1A] border-2 border-cobalt/40 hover:border-cobalt transition-all shadow-md">
                {/* Header: Role, Badges, Period & Location */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#5CE1FF]/15">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display font-extrabold text-2xl text-white">
                        {item.role}
                      </h3>
                      {/* Pulsing "Current" Badge + Calculated Months Counter */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-volt-lime/10 border border-volt-lime text-volt-lime font-mono text-xs font-bold shadow-volt-glow">
                        <span className="w-2 h-2 rounded-full bg-volt-lime animate-pulse" />
                        <span>Current · {monthsIn} months in</span>
                      </span>
                    </div>
                    <div className="font-mono text-sm font-semibold text-[#5CE1FF] mt-1 flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-cobalt" />
                      <span>{item.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#8B949E]">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#5CE1FF]" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#5CE1FF]" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-3 mb-6">
                  {item.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3 text-sm text-[#F6F7F9] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-volt-lime flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies / Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#0F1217] border border-[#5CE1FF]/20 font-mono text-xs text-[#8B949E]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Dashed Ghost Node: Next Chapter Open to Internships */}
          <div className="relative group">
            <div className="absolute -left-[30px] sm:-left-[46px] top-4 w-4 h-4 rounded-full bg-[#0F1217] border-2 border-dashed border-volt-lime" />
            <div className="p-6 sm:p-7 rounded-2xl border-2 border-dashed border-[#5CE1FF]/30 hover:border-volt-lime bg-[#070C1A]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-volt-lime uppercase tracking-wider block mb-1">
                  {"// FORWARD TRAJECTORY"}
                </span>
                <h4 className="font-display font-bold text-xl text-white">
                  {experience.ghostNode.headline}
                </h4>
              </div>

              <a
                href={experience.ghostNode.actionHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cobalt hover:bg-cobalt-hover text-white font-mono text-xs font-bold shadow-cobalt hover:shadow-cobalt-lg transition-all"
              >
                <span>{experience.ghostNode.actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
