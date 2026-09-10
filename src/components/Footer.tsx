import { AnimatedContent } from "@/components/reactbits/AnimatedContent";
import { Caption } from "@/components/Typography";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line">
      <AnimatedContent className="mx-auto flex h-12 w-full max-w-5xl items-center px-4 sm:px-8">
        <Caption tone="faint">{t.footer}</Caption>
      </AnimatedContent>
    </footer>
  );
}
