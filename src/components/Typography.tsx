import type { ElementType, HTMLAttributes, Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      watermark: "text-hero md:text-watermark",
      hero: "text-display md:text-hero",
      display: "text-display",
      headline: "text-headline",
      subtitle: "text-subtitle",
      body: "text-body",
      label: "text-label",
      caption: "text-caption",
    },
    tone: {
      default: "text-text",
      muted: "text-muted",
      faint: "text-faint",
      primary: "text-primary-soft",
    },
  },
  defaultVariants: {
    variant: "body",
    tone: "default",
  },
});

export interface TextProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}

export function Text({ as: Tag = "p", variant, tone, className, ...props }: TextProps) {
  return <Tag className={cn(textVariants({ variant, tone }), className)} {...props} />;
}

type PresetProps = Omit<TextProps, "variant">;

export function Display(props: PresetProps) {
  return <Text as="h1" variant="display" {...props} />;
}

export function Headline(props: PresetProps) {
  return <Text as="h2" variant="headline" {...props} />;
}

export function Subtitle(props: PresetProps) {
  return <Text as="h3" variant="subtitle" {...props} />;
}

export function Body(props: PresetProps) {
  return <Text variant="body" {...props} />;
}

export function Label(props: PresetProps) {
  return <Text as="span" variant="label" {...props} />;
}

export function Caption(props: PresetProps) {
  return <Text as="span" variant="caption" {...props} />;
}
