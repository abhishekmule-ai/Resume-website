import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck, Calendar, ExternalLink, Hash } from "lucide-react";

export function Certifications() {
  const { certifications } = portfolioData;

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-20 sm:py-28 relative bg-surface-elevated/20">
      <Container>
        <SectionHeading
          badge="Credentials"
          title="Certifications & Accreditations"
          description="Recognized credentials and volunteer accreditations in cloud computing, multimedia production, and web development."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Card
              key={cert.id}
              className="bg-surface-elevated/50 border-surface-border hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg font-bold">
                      {cert.title}
                    </CardTitle>
                    <div className="text-xs sm:text-sm font-semibold text-muted-foreground mt-0.5">
                      {cert.issuer}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground pt-2 border-t border-surface-border">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Issued: {cert.issueDate}
                  </span>
                  {cert.credentialId && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                      <Hash className="h-3 w-3" />
                      {cert.credentialId}
                    </span>
                  )}
                </div>

                {cert.credentialUrl && (
                  <div className="pt-1">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Verify Credential
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
