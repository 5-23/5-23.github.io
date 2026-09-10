import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stackVariants = cva("flex flex-col", {
  variants: {
    gap: {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
    },
  },
  defaultVariants: {
    gap: 4,
  },
});

export interface StackProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
  ref?: Ref<HTMLDivElement>;
}

export function Stack({ gap, className, ...props }: StackProps) {
  return <div className={cn(stackVariants({ gap }), className)} {...props} />;
}

const rowVariants = cva("flex items-center", {
  variants: {
    gap: {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
    },
    wrap: {
      true: "flex-wrap",
    },
  },
  defaultVariants: {
    gap: 2,
  },
});

export interface RowProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof rowVariants> {
  ref?: Ref<HTMLDivElement>;
}

export function Row({ gap, wrap, className, ...props }: RowProps) {
  return <div className={cn(rowVariants({ gap, wrap }), className)} {...props} />;
}

export interface BandProps extends HTMLAttributes<HTMLDivElement> {
  surface?: boolean;
  backdrop?: ReactNode;
}

export function Band({ surface, backdrop, className, children, ...props }: BandProps) {
  return (
    <div
      className={cn(
        "py-16 lg:py-24",
        surface && "bg-surface",
        backdrop && "relative isolate overflow-hidden",
        className
      )}
      {...props}
    >
      {backdrop}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-8">{children}</div>
    </div>
  );
}
