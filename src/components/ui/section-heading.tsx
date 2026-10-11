import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  gradientWord?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  gradientWord,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  // If gradientWord is provided, highlight that word in the title
  const renderTitle = () => {
    if (!gradientWord) return title;
    const parts = title.split(gradientWord);
    return (
      <>
        {parts[0]}
        <span className="text-gradient">{gradientWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={cn(
        "mb-12 sm:mb-16",
        isCenter ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl",
        className
      )}
    >
      {badge && (
        <div className={cn("mb-4 flex", isCenter ? "justify-center" : "justify-start")}>
          <Badge variant="primary" size="md">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
        {renderTitle()}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
