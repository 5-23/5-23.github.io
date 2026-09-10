import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  icon?: ReactNode;
}

export function Badge({ icon, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex h-6 items-center gap-2 rounded-full bg-raised px-3 text-label text-muted", className)}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
