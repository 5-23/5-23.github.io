import { ArrowUpRight, Trophy } from "lucide-react";
import { AnimatedContent } from "@/components/reactbits/AnimatedContent";
import { Section } from "@/components/Section";
import { Caption, Text } from "@/components/Typography";
import { useLanguage } from "@/lib/i18n";

export function Achievements() {
  const { t } = useLanguage();

  return (
    <Section
      id="achievements"
      title={t.sections.achievements}
      count={String(t.achievements.length)}
      icon={<Trophy className="size-4 text-orange" />}
      index="03"
      onSurface
    >
      <AnimatedContent stagger direction="right" distance={12} className="grid gap-1 md:grid-cols-2 md:gap-x-8">
        {t.achievements.map((item) => {
          const content = (
            <>
              <Caption tone="faint" className="w-24 shrink-0 pt-1 tabular-nums">
                {item.date}
              </Caption>
              <Text
                as="span"
                variant="label"
                tone="muted"
                className="min-w-0 flex-1 transition-colors ease-smooth group-hover:text-text"
              >
                {item.title}
              </Text>
            </>
          );
          return item.href ? (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group -mx-2 flex items-start gap-3 rounded-md px-2 py-2 transition-colors ease-smooth hover:bg-raised"
            >
              {content}
              <ArrowUpRight className="mt-1 size-3 shrink-0 text-faint opacity-0 transition-opacity ease-smooth group-hover:opacity-100 group-focus-visible:opacity-100" />
            </a>
          ) : (
            <div key={item.title} className="group -mx-2 flex items-start gap-3 px-2 py-2">
              {content}
            </div>
          );
        })}
      </AnimatedContent>
    </Section>
  );
}
