import { ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AnimatedContent } from "@/components/reactbits/AnimatedContent";
import { Section } from "@/components/Section";
import { Row } from "@/components/layout/Layout";
import { Body } from "@/components/Typography";
import { useLanguage } from "@/lib/i18n";

export function SubIssues() {
  const { t } = useLanguage();
  const done = t.subIssues.filter((issue) => issue.state === "done").length;

  return (
    <Section
      title={t.sections.focus}
      count={`${done}/${t.subIssues.length}`}
      icon={<ListChecks className="size-4 text-success" />}
      index="01"
    >
      <AnimatedContent stagger scale={0.96} className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {t.subIssues.map((issue) => (
          <div key={issue.title} className="flex h-full flex-col gap-3 rounded-lg bg-surface p-4">
            <Row className="justify-between">
              <Badge>{issue.label}</Badge>
              <span className="sr-only">{issue.state === "done" ? t.states.done : t.states.open}</span>
            </Row>
            <Body>{issue.title}</Body>
          </div>
        ))}
      </AnimatedContent>
    </Section>
  );
}
