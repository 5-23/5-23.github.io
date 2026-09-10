import { Fragment } from "react";
import { ScrollVelocity } from "@/components/reactbits/ScrollVelocity";
import { TechIcon } from "@/components/TechIcon";
import { Text } from "@/components/Typography";
import { useLanguage } from "@/lib/i18n";

export function SkillsMarquee() {
  const { t } = useLanguage();

  return (
    <ScrollVelocity className="py-2">
      <div className="flex items-center gap-8 pr-8">
        {t.skillHighlights.map((skill) => (
          <Fragment key={skill}>
            <span className="flex items-center gap-2">
              <TechIcon name={skill} className="size-5 text-faint" />
              <Text as="span" variant="headline" tone="muted" className="whitespace-nowrap">
                {skill}
              </Text>
            </span>
            <span className="size-1 rounded-full bg-faint" />
          </Fragment>
        ))}
      </div>
    </ScrollVelocity>
  );
}
