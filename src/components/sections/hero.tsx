"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { portfolioContent } from "@/data/content";
import { Container } from "@/components/ui/container";
import { ArrowDown, FileDown, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, MailIcon } from "@/components/ui/social-icons";

export function Hero() {
  const { personal, socialLinks, stats } = portfolioContent;

  // Typewriter state
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Stats container ref
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(personal.typewriterLines[0]);
      return;
    }

    const currentFullLine = personal.typewriterLines[currentLineIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentFullLine.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentFullLine.slice(0, displayedText.length + 1));
        }, 50);
      } else {
        // Line fully typed: 1.6s pause
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 1600);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentFullLine.slice(0, displayedText.length - 1));
        }, 28);
      } else {
        setIsDeleting(false);
        setCurrentLineIndex((prev) => (prev + 1) % personal.typewriterLines.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, currentLineIndex, reducedMotion, personal.typewriterLines]);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4" />;
      case "github":
        return <GithubIcon className="h-4 w-4" />;
      case "instagram":
        return <InstagramIcon className="h-4 w-4" />;
      case "email":
        return <MailIcon className="h-4 w-4" />;
      default:
        return <MailIcon className="h-4 w-4" />;
    }
  };

  return (
    <section
      id="hero"
      className="relative bg-[#070C1A] text-white pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden border-b border-[#5CE1FF]/15"
    >
      {/* 48px Blueprint Grid with Radial Mask */}
      <div
        className="blueprint-grid absolute inset-0 opacity-20 pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse at 50% 30%, black 35%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 35%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Hero Ambient Glow to #0B172E */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0B172E] opacity-60 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Blueprint Sheet Corner Crosshairs */}
      <div className="absolute top-4 left-4 text-[#5CE1FF] font-mono text-sm select-none opacity-60">+</div>
      <div className="absolute top-4 right-4 text-[#5CE1FF] font-mono text-sm select-none opacity-60">+</div>
      <div className="absolute bottom-4 left-4 text-[#5CE1FF] font-mono text-sm select-none opacity-60">+</div>
      <div className="absolute bottom-4 right-4 text-[#5CE1FF] font-mono text-sm select-none opacity-60">+</div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols): Availability, Greeting, Giant Name, Typewriter, Paragraph, CTAs, Socials */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Chip with Volt-Lime Pulsing Dot */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0F1217] border border-[#5CE1FF]/25 font-mono text-xs text-[#F6F7F9] mb-6 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt-lime opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-volt-lime shadow-volt-glow" />
              </span>
              <span>{personal.availabilityChip}</span>
            </div>

            {/* Mono Greeting */}
            <div className="font-mono text-xs sm:text-sm text-[#5CE1FF] tracking-wider mb-2">
              {personal.greetingMono}
            </div>

            {/* Giant Name: ABHISHEK solid white, MULE outlined stroke that fills cobalt on hover */}
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl xl:text-8xl tracking-tightest leading-[0.95] mb-5 select-none">
              <span className="text-white block sm:inline mr-2 sm:mr-4">{personal.firstName}</span>
              <span className="stroke-text inline-block cursor-default">{personal.lastName}</span>
            </h1>

            {/* Typewriter Terminal Box */}
            <div className="w-full max-w-xl min-h-[48px] px-3.5 py-2.5 rounded-lg bg-[#0F1217] border border-[#5CE1FF]/20 font-mono text-xs sm:text-sm text-[#D4FF3A] flex items-center gap-2 mb-6 shadow-inner">
              <span className="text-[#5CE1FF] font-bold">&gt;</span>
              <span className="font-medium text-[#F6F7F9]">
                {displayedText}
                <span className="inline-block w-2 h-4 bg-volt-lime ml-0.5 animate-blink-cursor align-middle" />
              </span>
            </div>

            {/* Paragraph */}
            <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed max-w-xl mb-8">
              {personal.heroParagraph}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* Primary: See What I've Built */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cobalt hover:bg-cobalt-hover text-white font-mono text-xs sm:text-sm font-bold shadow-cobalt hover:shadow-cobalt-lg hover:translate-y-[-2px] transition-all"
              >
                <span>See What I&apos;ve Built</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              {/* Ghost: Grab My Résumé */}
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F1217] hover:bg-white/5 border border-[#5CE1FF]/30 hover:border-volt-lime text-white font-mono text-xs sm:text-sm font-semibold hover:text-volt-lime transition-all"
              >
                <FileDown className="w-4 h-4 text-[#5CE1FF]" />
                <span>Grab My Résumé</span>
              </a>

              {/* Text link: Say hi */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-medium text-[#5CE1FF] hover:text-volt-lime underline-offset-4 hover:underline transition-colors pl-2"
              >
                <span>Say hi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social Dock with Tooltip Labels */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#5CE1FF]/70">
                {"// CONNECT:"}
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 rounded-lg bg-[#0F1217] border border-[#5CE1FF]/20 text-[#8B949E] hover:text-white hover:border-cobalt hover:shadow-cobalt hover:translate-y-[-2px] transition-all"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#0A0D14] border border-[#5CE1FF]/30 font-mono text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                      {social.platform}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Blueprint Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
              {/* Floating Blueprint Callout: MUMBAI, IN */}
              <div className="absolute -top-3 -right-2 z-20 px-3 py-1 rounded bg-[#0F1217] border border-[#5CE1FF]/40 font-mono text-[11px] text-[#5CE1FF] shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-volt-lime animate-pulse" />
                <span>{personal.portraitLocation}</span>
              </div>

              {/* Card Container: tilted -2°, straightens on hover, offset cobalt border */}
              <div className="relative transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 ease-out bg-[#0F1217] border-2 border-cobalt rounded-2xl p-3 shadow-blueprint hover:shadow-cobalt-lg">
                {/* Crosshairs on card */}
                <div className="absolute top-2 left-2 text-[#5CE1FF] font-mono text-xs select-none">+</div>
                <div className="absolute top-2 right-2 text-[#5CE1FF] font-mono text-xs select-none">+</div>
                <div className="absolute bottom-2 left-2 text-[#5CE1FF] font-mono text-xs select-none">+</div>
                <div className="absolute bottom-2 right-2 text-[#5CE1FF] font-mono text-xs select-none">+</div>

                {/* Portrait Image Frame */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#070C1A] border border-[#5CE1FF]/20">
                  <Image
                    src={personal.profileImage}
                    alt={personal.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 400px"
                    className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Subtle Blueprint Mesh Scanlines */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070C1A]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Dimension Line along bottom edge */}
                <div className="mt-3 pt-2.5 border-t border-[#5CE1FF]/25 flex items-center justify-between font-mono text-[10px] text-[#5CE1FF]">
                  <span className="flex items-center gap-1">
                    <span className="text-volt-lime">|←</span>
                    <span>{personal.portraitLabel}</span>
                    <span className="text-volt-lime">→|</span>
                  </span>
                  <span className="text-[#8B949E] text-[9px]">{personal.portraitFig}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Strip under the Hero: Full-Width 4 Cells Separated by Hairlines */}
        <div
          ref={statsRef}
          className="mt-16 sm:mt-24 border-y border-[#5CE1FF]/20 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#5CE1FF]/20 bg-[#0F1217]/50"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 flex flex-col justify-between group hover:bg-[#1F5BFF]/5 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-1">
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white group-hover:text-volt-lime transition-colors">
                  {stat.value}
                </div>
                <span className="font-mono text-[10px] text-[#5CE1FF]/60">
                  {`0${idx + 1} //`}
                </span>
              </div>
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#5CE1FF] mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-[#8B949E] leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
