// src/components/ui/card.tsx
import * as React from "react";
import { cn } from "../../lib/utils";

// simple, named exports (no default export)
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type H3Props  = React.HTMLAttributes<HTMLHeadingElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn("px-6 pt-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: H3Props) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}
