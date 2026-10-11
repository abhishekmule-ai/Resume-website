import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "outline" | "success";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-surface-elevated/80 text-muted-foreground border-surface-border",
    primary: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    secondary: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    outline: "bg-transparent text-foreground/80 border-surface-border",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs sm:text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border backdrop-blur-sm transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
