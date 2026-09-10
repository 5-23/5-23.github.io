import {
  SiFastapi,
  SiJavascript,
  SiMongodb,
  SiReact,
  SiRedis,
  SiRust,
  SiTailwindcss,
  type IconType,
} from "@icons-pack/react-simple-icons";
import { Server } from "lucide-react";
import { cn } from "@/lib/utils";

const techIcons: Record<string, IconType> = {
  react: SiReact,
  "tailwind css": SiTailwindcss,
  javascript: SiJavascript,
  fastapi: SiFastapi,
  rust: SiRust,
  redis: SiRedis,
  mongodb: SiMongodb,
};

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className }: TechIconProps) {
  const key = name.toLowerCase();
  if (key === "axum") {
    return <Server aria-hidden="true" className={cn("size-3 shrink-0", className)} />;
  }
  const Icon = techIcons[key];
  if (!Icon) return null;
  return <Icon aria-hidden="true" className={cn("size-3 shrink-0", className)} />;
}
