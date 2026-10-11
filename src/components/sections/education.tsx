import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

export function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 sm:py-28 relative bg-surface-elevated/20">
      <Container>
        <SectionHeading
          badge="Academics"
          title="Education & Credentials"
          description="Academic foundation and continuous learning that shaped my technical thinking."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {education.map((item) => (
            <Card
              key={item.id}
              className="bg-surface-elevated/50 border-surface-border hover:border-purple-500/30 transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl font-bold">
                      {item.degree}
                    </CardTitle>
                    <div className="text-sm font-semibold text-purple-400 mt-0.5">
                      {item.institution}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-3 pt-3 border-t border-surface-border">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </span>
                  {item.grade && (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                      <Award className="h-3.5 w-3.5" />
                      {item.grade}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2 pt-1">
                  <span className="text-xs uppercase font-semibold text-muted-foreground">
                    Key Highlights:
                  </span>
                  <ul className="space-y-1.5 list-disc list-outside pl-4 text-xs sm:text-sm text-muted-foreground">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
