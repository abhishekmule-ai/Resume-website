import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={cn(
            "flex w-full rounded-xl border border-surface-border bg-surface-elevated/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-blue-500 focus:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            error && "border-red-500/80 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
