import React from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 01 HERO: Always Dark */}
      <Hero />

      {/* Blueprint Ruler Divider */}
      <div className="ruler-divider" aria-hidden="true" />

      {/* 02 ABOUT: Paper in Light / Carbon in Dark */}
      <About />

      {/* Blueprint Ruler Divider */}
      <div className="ruler-divider" aria-hidden="true" />

      {/* 03 PROJECTS: Carbon in Light / Navy-950 in Dark */}
      <Projects />

      {/* Blueprint Ruler Divider */}
      <div className="ruler-divider" aria-hidden="true" />

      {/* 04 SKILLS: Paper in Light / Carbon in Dark */}
      <Skills />

      {/* Blueprint Ruler Divider */}
      <div className="ruler-divider" aria-hidden="true" />

      {/* 05 EXPERIENCE: Carbon in Light / Navy-950 in Dark */}
      <Experience />

      {/* Blueprint Ruler Divider */}
      <div className="ruler-divider" aria-hidden="true" />

      {/* 06 EDUCATION: Paper in Light / Carbon in Dark */}
      <Education />

      {/* Blueprint Ruler Divider */}
      <div className="ruler-divider" aria-hidden="true" />

      {/* 07 CERTIFICATIONS: Carbon in Light / Navy-950 in Dark */}
      <Certifications />

      {/* Blueprint Ruler Divider */}
      <div className="ruler-divider" aria-hidden="true" />

      {/* 08 CONTACT: Always Dark */}
      <Contact />
    </div>
  );
}
