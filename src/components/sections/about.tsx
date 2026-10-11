import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { MapPin, Briefcase, Mail, CheckCircle2 } from "lucide-react";

export function About() {
  const { personal } = portfolioData;

  const highlights = [
    "Specializing in AI & Machine Learning (CSE B.E.)",
    "Web Dev: HTML, CSS, JavaScript, React.js, Node.js, Tailwind CSS",
    "Programming: Python, Java, C programming, SQL, Batch File",
    "Media & UI: Adobe Premiere Pro, Canva, Figma, Prompting",
    "Deployment & CMS: Wordpress, Netlify, Vercel",
    "Active Volunteer at AWS Cloud Club APSIT",
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <Container>
        <SectionHeading
          badge="Background"
          title="About Me"
          gradientWord="About"
          description="A glimpse into my background, core engineering values, and what drives my work."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Bio text */}
          <div className="lg:col-span-7 space-y-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
            {personal.fullBio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className="pt-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                Core Strengths & Values
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5 text-sm text-foreground/90">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick info card */}
          <div className="lg:col-span-5">
            <Card className="p-6 bg-surface-elevated/70 border-surface-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Quick Overview</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase text-muted-foreground font-semibold">Location</div>
                    <div className="text-sm font-medium text-foreground">{personal.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase text-muted-foreground font-semibold">Status</div>
                    <div className="text-sm font-medium text-foreground">{personal.availabilityStatus}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase text-muted-foreground font-semibold">Email</div>
                    <div className="text-sm font-medium text-foreground">{personal.email}</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
