import { Badge } from "@/components/ui/Badge";
import { AnimatedContent } from "@/components/reactbits/AnimatedContent";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { TechIcon } from "@/components/TechIcon";
import { Row, Stack } from "@/components/layout/Layout";
import { Body, Text } from "@/components/Typography";
import { useLanguage } from "@/lib/i18n";

export function About() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Stack gap={3}>
        <Text as="h2" variant="label" tone="faint">
          {t.summary.label}
        </Text>
        <Body tone="muted">
          <ScrollReveal text={t.summary.text} />
        </Body>
      </Stack>
      <Stack gap={3}>
        <Text as="h2" variant="label" tone="faint">
          {t.sections.skills}
        </Text>
        <AnimatedContent asChild stagger scale={0.9} distance={12}>
          <Row wrap gap={2}>
            {t.skillHighlights.map((skill) => (
              <Badge key={skill} icon={<TechIcon name={skill} />} className="bg-raised">
                {skill}
              </Badge>
            ))}
          </Row>
        </AnimatedContent>
      </Stack>
    </div>
  );
}
