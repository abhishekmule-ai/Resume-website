import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <Container>
        <SectionHeading
          badge="Involvement"
          title="Experience & Activities"
          description="Contributions to student technology initiatives, cloud activities at AWS Cloud Club APSIT, and collaborative event coordination."
        />

        <div className="relative border-l-2 border-surface-border ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-8 space-y-12">
          {experience.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline marker node */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  item.current
                    ? "bg-blue-500 border-background ring-4 ring-blue-500/20"
                    : "bg-surface-elevated border-surface-border group-hover:border-blue-500/50"
                } transition-colors`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    item.current ? "bg-white" : "bg-muted-foreground"
                  }`}
                />
              </div>

              {/* Experience Card */}
              <Card className="bg-surface-elevated/40 border-surface-border hover:border-blue-500/30 transition-all">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        {item.role}
                        {item.current && (
                          <Badge variant="primary" size="sm">
                            Current
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="text-sm font-semibold text-blue-400 mt-1">
                        {item.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {item.type}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet achievements */}
                  <ul className="space-y-2 list-disc list-outside pl-4 text-sm text-muted-foreground">
                    {item.achievements.map((ach, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {ach}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-surface-elevated border border-surface-border text-foreground/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
