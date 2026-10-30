"use client";

import React from "react";
import Image from "next/image";
import { portfolioContent } from "@/data/content";
import { Container } from "@/components/ui/container";
import { ExternalLink, Play, ArrowRight, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";

export function Projects() {
  const { projects } = portfolioContent;

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 bg-[#0F1217] text-white dark:bg-[#070C1A] dark:text-white transition-colors"
    >
      <Container>
        {/* Section Mono Label */}
        <div className="font-mono text-xs uppercase tracking-widest text-[#5CE1FF] mb-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-volt-lime rounded-full" />
          <span>{projects.sectionTag}</span>
        </div>

        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
            <span>{projects.title} </span>
            <span className="text-[#8B949E] font-normal">{projects.tagline}</span>
          </h2>
        </div>

        {/* Alternating Project Rows */}
        <div className="space-y-20 lg:space-y-28">
          {/* Project 01: QR Code Studio (Featured) */}
          {projects.items[0] && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left (7 cols): Browser Window Frame */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#070C1A] border-2 border-cobalt/50 shadow-cobalt overflow-hidden">
                  {/* Browser Window Header with Traffic Lights */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0F1217] border-b border-[#5CE1FF]/20 font-mono text-xs text-[#8B949E]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                    </div>
                    <div className="px-3 py-0.5 rounded bg-[#070C1A] border border-[#5CE1FF]/20 text-[11px] text-[#5CE1FF] truncate max-w-[200px] sm:max-w-xs">
                      https://qrgenerator10.netlify.app
                    </div>
                    <span className="text-[10px] text-volt-lime">ONLINE</span>
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full bg-[#070C1A] overflow-hidden">
                    {projects.items[0].image && (
                      <Image
                        src={projects.items[0].image}
                        alt={projects.items[0].title}
                        fill
                        priority
                        className="object-cover object-top hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 650px"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Right (5 cols): Pitch, Feature Chips, Tags, Buttons */}
              <div className="lg:col-span-5 flex flex-col items-start">
                <div className="flex items-center gap-2 font-mono text-xs text-volt-lime mb-2">
                  <span>{projects.items[0].number} {"//"} FEATURED BUILD</span>
                </div>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
                  {projects.items[0].title}
                </h3>
                <div className="font-mono text-xs text-[#5CE1FF] mb-4">
                  {projects.items[0].subtitle}
                </div>
                <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed mb-6">
                  {projects.items[0].pitch}
                </p>

                {/* Feature Chips */}
                {projects.items[0].featureChips && (
                  <div className="grid grid-cols-2 gap-2 w-full mb-6">
                    {projects.items[0].featureChips.map((chip, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#070C1A] border border-[#5CE1FF]/20 text-xs font-mono text-[#F6F7F9]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-volt-lime" />
                        <span>{chip}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {projects.items[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-[#070C1A] border border-[#5CE1FF]/15 text-xs font-mono text-[#8B949E]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  {projects.items[0].demoUrl && (
                    <a
                      href={projects.items[0].demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cobalt hover:bg-cobalt-hover text-white font-mono text-xs font-bold shadow-cobalt hover:shadow-cobalt-lg transition-all"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {projects.items[0].repoUrl && (
                    <a
                      href={projects.items[0].repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#070C1A] hover:bg-white/5 border border-[#5CE1FF]/30 text-white font-mono text-xs font-semibold hover:border-volt-lime transition-all"
                    >
                      <GithubIcon className="w-4 h-4 text-[#5CE1FF]" />
                      <span>View Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Project 02: Motion & Media Reel (Reversed: Text Left, Visual Right) */}
          {projects.items[1] && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Pitch, Tags, Buttons (5 cols) */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-start">
                <div className="flex items-center gap-2 font-mono text-xs text-volt-lime mb-2">
                  <span>{projects.items[1].number} {"//"} MEDIA PRODUCTION</span>
                </div>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
                  {projects.items[1].title}
                </h3>
                <div className="font-mono text-xs text-[#5CE1FF] mb-4">
                  {projects.items[1].subtitle}
                </div>
                <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed mb-6">
                  {projects.items[1].pitch}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {projects.items[1].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-[#070C1A] border border-[#5CE1FF]/15 text-xs font-mono text-[#8B949E]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Watch Reel Button */}
                {projects.items[1].demoUrl && (
                  <a
                    href={projects.items[1].demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cobalt hover:bg-cobalt-hover text-white font-mono text-xs font-bold shadow-cobalt hover:shadow-cobalt-lg transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch the Reel ↗</span>
                  </a>
                )}
              </div>

              {/* CSS-Built Video-Editor Timeline Illustration (7 cols) */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="rounded-2xl bg-[#070C1A] border-2 border-cobalt/50 shadow-cobalt overflow-hidden">
                  {/* Editor Window Header with Traffic Lights & Timecode */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0F1217] border-b border-[#5CE1FF]/20 font-mono text-xs text-[#8B949E]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-volt-lime font-bold">00:01:24:18</span>
                      <span className="text-[10px] text-[#5CE1FF] px-1.5 py-0.5 rounded bg-black/40 border border-[#5CE1FF]/20">
                        24.00 FPS
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#5CE1FF]">
                      <Layers className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">TIMELINE</span>
                    </div>
                  </div>

                  {/* Mock Video Preview & Timeline Canvas */}
                  <div className="p-4 sm:p-5 bg-[#070C1A] space-y-3 font-mono text-[10px]">
                    {/* Time Ruler Bar */}
                    <div className="relative h-6 border-b border-[#5CE1FF]/30 flex items-center justify-between text-[#8B949E] px-1 select-none">
                      <span>00:00:00</span>
                      <span>00:00:30</span>
                      <span className="text-volt-lime font-bold">00:01:00</span>
                      <span>00:01:30</span>
                      <span>00:02:00</span>
                      {/* Playhead Marker */}
                      <div className="absolute left-[58%] -top-1 bottom-0 z-20 flex flex-col items-center">
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-red-500" />
                        <div className="w-[1.5px] h-36 bg-red-500 shadow-[0_0_8px_red]" />
                      </div>
                    </div>

                    {/* Track V2: B-Roll & Overlay Clips */}
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-[#5CE1FF] font-bold flex-shrink-0">V2</span>
                      <div className="flex-1 h-8 rounded bg-[#0F1217] border border-white/10 flex items-center p-1 gap-1.5 relative overflow-hidden">
                        <div className="w-1/4 h-full rounded bg-purple-600/80 border border-purple-400/50 flex items-center px-2 text-white truncate">
                          Intro_Hook.mp4
                        </div>
                        <div className="w-1/3 h-full rounded bg-[#1F5BFF]/80 border border-blue-400/50 flex items-center px-2 text-white truncate">
                          B-Roll_Montage_02.mov
                        </div>
                        <div className="w-1/4 h-full rounded bg-cyan-600/80 border border-cyan-400/50 flex items-center px-2 text-white truncate">
                          Outro_Graphics.mov
                        </div>
                      </div>
                    </div>

                    {/* Track V1: Main A-Roll Footage */}
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-[#5CE1FF] font-bold flex-shrink-0">V1</span>
                      <div className="flex-1 h-10 rounded bg-[#0F1217] border border-white/10 flex items-center p-1 gap-1 relative overflow-hidden">
                        <div className="w-2/5 h-full rounded bg-blue-700/80 border border-blue-400/60 flex items-center justify-between px-2 text-white">
                          <span>A_Roll_Camera01.braw</span>
                          <span className="text-[8px] text-volt-lime font-bold">4K 60P</span>
                        </div>
                        <div className="w-1/2 h-full rounded bg-blue-700/80 border border-blue-400/60 flex items-center justify-between px-2 text-white">
                          <span>A_Roll_Camera02_Cut.braw</span>
                          <span className="text-[8px] text-volt-lime font-bold">4K 60P</span>
                        </div>
                      </div>
                    </div>

                    {/* Track A1: Voiceover Waveforms */}
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-emerald-400 font-bold flex-shrink-0">A1</span>
                      <div className="flex-1 h-7 rounded bg-[#0F1217] border border-emerald-500/30 flex items-center px-2 relative overflow-hidden">
                        <div className="w-full flex items-center justify-between opacity-80 h-3">
                          {[3, 6, 8, 4, 9, 12, 10, 5, 8, 11, 7, 3, 10, 12, 6, 9, 4, 8, 12, 7, 5, 10, 3].map((h, i) => (
                            <div key={i} className="w-1 bg-emerald-400 rounded-full" style={{ height: `${h}px` }} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Track A2: Soundtrack & SFX Waveforms */}
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-volt-lime font-bold flex-shrink-0">A2</span>
                      <div className="flex-1 h-7 rounded bg-[#0F1217] border border-volt-lime/30 flex items-center px-2 relative overflow-hidden">
                        <div className="w-full flex items-center justify-between opacity-80 h-3">
                          {[5, 8, 4, 10, 12, 6, 7, 11, 9, 4, 8, 12, 6, 5, 11, 9, 7, 4, 8, 10, 6, 4, 2].map((h, i) => (
                            <div key={i} className="w-1 bg-volt-lime rounded-full" style={{ height: `${h}px` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project 03: Dashed-Outline Blueprint Ghost Card */}
          {projects.items[2] && (
            <div className="border-2 border-dashed border-[#5CE1FF]/30 hover:border-volt-lime rounded-2xl p-8 sm:p-10 bg-[#070C1A]/60 transition-all flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-start">
                <div className="font-mono text-xs text-volt-lime mb-1">
                  {projects.items[2].number} {"//"} EXPERIMENTAL LAB
                </div>
                <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
                  {projects.items[2].title}
                </h4>
                {/* Animated Progress Bar */}
                <div className="w-64 h-2.5 rounded-full bg-[#0F1217] border border-[#5CE1FF]/20 overflow-hidden mb-3">
                  <div className="h-full w-2/3 bg-gradient-to-r from-cobalt to-volt-lime rounded-full animate-pulse" />
                </div>
                <p className="text-xs font-mono text-[#8B949E]">
                  In active development: new full-stack AI workflows &amp; cloud experiments.
                </p>
              </div>

              <a
                href={projects.items[2].demoUrl || "#contact"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F1217] hover:bg-white/5 border border-volt-lime font-mono text-xs font-bold text-volt-lime hover:shadow-volt-glow transition-all"
              >
                <span>{projects.items[2].pitch}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
