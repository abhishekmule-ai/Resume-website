import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Layout, Code2, Film, Sparkles } from "lucide-react";

export function Skills() {
  const { skills } = portfolioData;

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("web") || cat.includes("frontend")) {
      return <Layout className="h-5 w-5 text-blue-400" />;
    }
    if (cat.includes("language") || cat.includes("comput") || cat.includes("backend")) {
      return <Code2 className="h-5 w-5 text-purple-400" />;
    }
    if (cat.includes("video") || cat.includes("media") || cat.includes("editing")) {
      return <Film className="h-5 w-5 text-cyan-400" />;
    }
    return <Sparkles className="h-5 w-5 text-emerald-400" />;
  };

  return (
    <section id="skills" className="py-20 sm:py-28 relative bg-surface-elevated/20">
      <Container>
        <SectionHeading
          badge="Expertise"
          title="Technical Skills & Competencies"
          description="Front-end & back-end web development, Python, Java, C & SQL programming, video editing, and core analytical competencies."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skills.map((categoryGroup, index) => (
            <Card
              key={index}
              className="bg-surface-elevated/50 border-surface-border hover:border-blue-500/30 transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-surface-elevated border border-surface-border">
                    {getCategoryIcon(categoryGroup.category)}
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl font-bold">
                      {categoryGroup.category}
                    </CardTitle>
                    {categoryGroup.description && (
                      <CardDescription>{categoryGroup.description}</CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 pt-2">
                  {categoryGroup.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="group inline-flex items-center gap-2 rounded-xl bg-surface-elevated px-3 py-1.5 border border-surface-border text-xs sm:text-sm font-medium text-foreground hover:border-blue-500/40 hover:bg-blue-500/5 transition-all"
                    >
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] uppercase font-semibold text-muted-foreground group-hover:text-blue-400 transition-colors">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
