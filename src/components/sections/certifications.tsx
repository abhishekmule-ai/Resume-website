"use client";

import React from "react";
import { portfolioContent } from "@/data/content";
import { Container } from "@/components/ui/container";
import { ShieldCheck, Calendar, Hash, ExternalLink } from "lucide-react";

export function Certifications() {
  const { certifications } = portfolioContent;

  return (
    <section
      id="certifications"
      className="relative py-20 sm:py-28 bg-[#0F1217] text-white dark:bg-[#070C1A] dark:text-white transition-colors overflow-hidden"
    >
      <Container>
        {/* Section Mono Label */}
        <div className="font-mono text-xs uppercase tracking-widest text-[#5CE1FF] mb-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-volt-lime rounded-full" />
          <span>{certifications.sectionTag}</span>
        </div>

        {/* Section Heading */}
        <div className="mb-14">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
            <span>{certifications.title} </span>
            <span className="text-[#8B949E] font-normal">{certifications.tagline}</span>
          </h2>
        </div>

        {/* Credential Ticket Cards with Perforated Edge & Subtle Holographic Sheen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {certifications.items.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-[#070C1A] border-2 border-[#5CE1FF]/25 hover:border-cobalt transition-all duration-300 shadow-md hover:shadow-cobalt hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Holographic Hover Sheen */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#5CE1FF]/5 to-volt-lime/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                aria-hidden="true"
              />

              {/* Perforated Ticket Notches */}
              <div
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0F1217] dark:bg-[#070C1A] border-r-2 border-[#5CE1FF]/30 z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0F1217] dark:bg-[#070C1A] border-l-2 border-[#5CE1FF]/30 z-10"
                aria-hidden="true"
              />

              {/* Ticket Top: Header, Title, Issuer */}
              <div className="p-6 sm:p-7 relative z-10">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#5CE1FF]/15">
                  <span className="font-mono text-[11px] text-volt-lime font-bold">
                    {item.number} {"//"} TICKET
                  </span>
                  <div className="p-1.5 rounded-lg bg-cobalt/20 text-[#5CE1FF]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 leading-snug group-hover:text-volt-lime transition-colors">
                  {item.title}
                </h3>
                <div className="font-mono text-xs text-[#5CE1FF]">
                  {item.issuer}
                </div>
              </div>

              {/* Perforated Separator Line */}
              <div
                className="w-full border-b border-dashed border-[#5CE1FF]/30 my-1"
                aria-hidden="true"
              />

              {/* Ticket Bottom: Issue Date, ID & Optional Verify Button */}
              <div className="p-6 sm:p-7 pt-4 bg-[#0F1217]/60 relative z-10">
                <div className="flex items-center justify-between font-mono text-xs text-[#8B949E] mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#5CE1FF]" />
                    {item.issueDate}
                  </span>
                  {item.credentialId && (
                    <span className="flex items-center gap-1 font-mono text-[11px] text-volt-lime">
                      <Hash className="w-3 h-3" />
                      {item.credentialId}
                    </span>
                  )}
                </div>

                {/* Render Verify Button ONLY if specific verification URL is populated */}
                {item.verificationUrl ? (
                  <a
                    href={item.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-mono text-xs font-semibold transition-all shadow-sm"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="font-mono text-[10px] text-[#8B949E] uppercase tracking-wider">
                    {"// ACCREDITED RECORD"}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
