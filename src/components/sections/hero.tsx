import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileDown, ArrowRight, Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/social-icons";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Hero() {
  const { personal, socialLinks, stats } = portfolioData;

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "github":
        return <GithubIcon className="h-5 w-5" />;
      case "linkedin":
        return <LinkedinIcon className="h-5 w-5" />;
      case "twitter":
        return <TwitterIcon className="h-5 w-5" />;
      case "mail":
        return <Mail className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <Container>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Main Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status Badge */}
            {personal.availableForHire && (
              <div className="inline-flex items-center gap-2 mb-6">
                <Badge variant="success" size="md" className="gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  {personal.availabilityStatus}
                </Badge>
              </div>
            )}

            {/* Dominant Full Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-4">
              Hi, I&apos;m <span className="text-gradient">{personal.name}</span>
            </h1>

            {/* Professional Title */}
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-400/90 mb-4">
              {personal.role}
            </h2>

            {/* Introduction / Tagline */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {personal.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <MagneticButton strength={0.25}>
                <a href="#projects" className="inline-block">
                  <Button variant="primary" size="lg">
                    View My Work
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <a href={personal.resumeUrl} download className="inline-block">
                  <Button variant="outline" size="lg">
                    <FileDown className="h-4 w-4" />
                    Download Resume
                  </Button>
                </a>
              </MagneticButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Connect:
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <MagneticButton key={social.platform} strength={0.35}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-surface-elevated/70 border border-surface-border text-muted-foreground hover:text-foreground hover:border-blue-500/40 transition-colors inline-flex"
                      aria-label={social.platform}
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Photo / Visual Element */}
          <div className="flex-shrink-0 relative group">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl p-1.5 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-all duration-500">
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-surface-elevated relative">
                {personal.profileImage ? (
                  <Image
                    src={personal.profileImage}
                    alt={personal.name}
                    fill
                    priority
                    unoptimized
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                    <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3 text-blue-400">
                      <Sparkles className="w-10 h-10 animate-pulse" />
                    </div>
                    <span className="font-semibold text-foreground text-sm">{personal.name}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{personal.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-surface-card border border-surface-border backdrop-blur-md hover:border-blue-500/30 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-foreground mb-0.5">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
