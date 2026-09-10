import { Globe, Search } from "lucide-react";
import { motion, useScroll } from "motion/react";
import { DecryptedText } from "@/components/reactbits/DecryptedText";
import { Button } from "@/components/ui/Button";
import { Kbd } from "@/components/ui/Kbd";
import { LanguageMenu } from "@/components/LanguageMenu";
import { Text } from "@/components/Typography";
import { useLanguage } from "@/lib/i18n";
import { scrollToSection } from "@/lib/scroll";

interface TopBarProps {
  onOpenCommand: () => void;
}

export function TopBar({ onOpenCommand }: TopBarProps) {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();

  const navigation = [
    { id: "projects", label: t.sections.projects },
    { id: "achievements", label: t.sections.achievements },
    { id: "activity", label: t.sections.activity },
    { id: "contact", label: t.sections.contact },
  ];

  return (
    <header className="sticky top-0 z-dropdown border-b border-line bg-bg">
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="mx-auto flex h-12 w-full max-w-5xl items-center justify-between px-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <img src="/profile.png" alt="" className="size-6 shrink-0 rounded-full" />
          <Text as="span" variant="label" className="truncate">
            <DecryptedText text={t.brand} trigger="hover" />
          </Text>
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Button key={item.id} variant="ghost" size="sm" onClick={() => scrollToSection(item.id)}>
              {item.label}
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onOpenCommand} aria-label={t.controls.openQuickMenu}>
            <Search />
            <Kbd className="hidden sm:inline-flex">⌘K</Kbd>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <a href={t.contacts[2].href} target="_blank" rel="noreferrer" aria-label={t.controls.openBlog}>
              <Globe />
            </a>
          </Button>
          <LanguageMenu />
        </div>
      </div>
    </header>
  );
}
