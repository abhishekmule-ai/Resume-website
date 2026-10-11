import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Sparkles } from "lucide-react";

export function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <Container>
        <SectionHeading
          badge="Portfolio"
          title="Featured Projects & Work"
          description="A selection of web applications, AI & automation workflows, and digital media projects."
        />

        <div
          className={
            projects.length === 1
              ? "max-w-2xl mx-auto w-full"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          }
        >
          {projects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col overflow-hidden bg-surface-elevated/40 border-surface-border hover:border-blue-500/40 transition-all duration-300 group shadow-lg"
            >
              {/* Project Image banner */}
              <div
                className={`relative w-full overflow-hidden bg-surface-elevated border-b border-surface-border ${
                  projects.length === 1 ? "h-60 sm:h-72" : "h-48"
                }`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Sparkles className="h-8 w-8 text-blue-400" />
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="primary" size="sm">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                  {project.title}
                </CardTitle>
                {project.metrics && (
                  <div className="text-xs font-semibold text-emerald-400 mt-1">
                    {project.metrics}
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <CardDescription className="text-sm text-foreground/80 leading-relaxed">
                  {project.description}
                </CardDescription>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-medium rounded-md bg-surface-elevated border border-surface-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-2 border-t border-surface-border/60">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Click here
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
