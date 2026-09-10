import { BriefcaseBusiness, Globe, Layers, MapPin, MessageSquare, Sparkles, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedContent } from "@/components/reactbits/AnimatedContent";
import { BlurText } from "@/components/reactbits/BlurText";
import { Magnet } from "@/components/reactbits/Magnet";
import { RotatingText } from "@/components/reactbits/RotatingText";
import { SplitText } from "@/components/reactbits/SplitText";
import { TechIcon } from "@/components/TechIcon";
import { Row, Stack } from "@/components/layout/Layout";
import { Body, Caption, Text } from "@/components/Typography";
import { useLanguage } from "@/lib/i18n";
import { scrollToSection } from "@/lib/scroll";
import type { FieldIcon } from "@/content";

const factIcons: Record<FieldIcon, LucideIcon> = {
  status: BriefcaseBusiness,
  priority: Sparkles,
  assignee: MapPin,
  stack: Layers,
};

export function Hero() {
  const { t, lang } = useLanguage();

  return (
    <Stack gap={8}>
      <Stack gap={3}>
        <Row gap={2}>
          <span className="inline-flex h-6 items-center gap-2 rounded-full bg-surface px-3 text-caption text-muted">
            <BriefcaseBusiness className="size-3 text-faint" />
            {t.heroStatus}
          </span>
        </Row>
        <Text as="h1" variant="hero">
          <span className="block">
            <SplitText key={`${lang}-s1`} text={t.heroStatement[0]} />
          </span>
          <span className="block text-primary-soft">
            <SplitText key={`${lang}-s2`} text={t.heroStatement[1]} delay={0.25} />
          </span>
        </Text>
        <Row wrap gap={3}>
          <Text as="p" variant="headline">
            <SplitText key={`${lang}-name`} text={t.heroTitle} delay={0.5} />
          </Text>
          <RotatingText words={t.heroRoles} />
        </Row>
        <Body tone="muted" className="max-w-2xl">
          <BlurText key={`${lang}-desc`} text={t.heroDescription} delay={0.2} stagger={0.02} />
        </Body>
        <AnimatedContent asChild stagger scale={0.9} distance={12} delay={0.6}>
          <Row wrap gap={2}>
            {t.heroLabels.map((label) => (
              <Badge key={label} icon={<TechIcon name={label} />}>
                {label}
              </Badge>
            ))}
          </Row>
        </AnimatedContent>
        <Row gap={2}>
          <Magnet>
            <Button
              variant="primary"
              onClick={() => scrollToSection("contact")}
              aria-label={t.controls.scrollToContact}
            >
              <MessageSquare />
              {t.actions.contact}
            </Button>
          </Magnet>
          <Magnet>
            <Button asChild>
              <a href={t.contacts[2].href} target="_blank" rel="noreferrer">
                <Globe />
                {t.actions.visitBlog}
              </a>
            </Button>
          </Magnet>
        </Row>
      </Stack>
      <AnimatedContent stagger className="grid gap-4 rounded-lg bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
        {t.heroFacts.map((fact) => {
          const Icon = factIcons[fact.icon];
          return (
            <Row key={fact.label} gap={3}>
              <Icon className="size-4 shrink-0 text-faint" />
              <div className="flex min-w-0 flex-col">
                <Caption tone="faint">{fact.label}</Caption>
                <Text as="span" variant="label" className="truncate">
                  {fact.value}
                </Text>
              </div>
            </Row>
          );
        })}
      </AnimatedContent>
    </Stack>
  );
}
