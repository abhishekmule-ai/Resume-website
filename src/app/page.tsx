import React from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Projects } from "@/components/sections/projects";
import { Certifications } from "@/components/sections/certifications";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-20">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
    </div>
  );
}
