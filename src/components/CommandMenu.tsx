import { useEffect } from "react";
import { Check, FolderOpen, Globe, History, Mail, MessageSquare, Trophy } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { useCopyEmail } from "@/hooks/useCopyEmail";
import { useLanguage } from "@/lib/i18n";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const { t, lang, setLang } = useLanguage();
  const copyEmail = useCopyEmail();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const run = (action: () => void) => {
    onOpenChange(false);
    action();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title={t.controls.openQuickMenu}>
      <Command>
        <CommandInput placeholder={t.commandMenu.placeholder} />
        <CommandList>
          <CommandEmpty>{t.commandMenu.empty}</CommandEmpty>
          <CommandGroup heading={t.commandMenu.navigate}>
            <CommandItem onSelect={() => run(() => scrollToSection("projects"))}>
              <FolderOpen />
              {t.sections.projects}
            </CommandItem>
            <CommandItem onSelect={() => run(() => scrollToSection("achievements"))}>
              <Trophy />
              {t.sections.achievements}
            </CommandItem>
            <CommandItem onSelect={() => run(() => scrollToSection("activity"))}>
              <History />
              {t.sections.activity}
            </CommandItem>
            <CommandItem onSelect={() => run(() => scrollToSection("contact"))}>
              <MessageSquare />
              {t.sections.contact}
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading={t.commandMenu.actions}>
            <CommandItem onSelect={() => run(copyEmail)}>
              <Mail />
              {t.controls.copyEmail}
            </CommandItem>
            <CommandItem onSelect={() => run(() => window.open(t.contacts[2].href, "_blank", "noopener"))}>
              <Globe />
              {t.controls.openBlog}
            </CommandItem>
            <CommandItem
              onSelect={() => run(() => window.open("https://github.com/P-Asta", "_blank", "noopener"))}
            >
              <GithubIcon />
              GitHub
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading={t.commandMenu.language}>
            <CommandItem onSelect={() => run(() => setLang("ko"))}>
              <Check className={cn(lang === "ko" ? "opacity-100" : "opacity-0")} />
              한국어
            </CommandItem>
            <CommandItem onSelect={() => run(() => setLang("en"))}>
              <Check className={cn(lang === "en" ? "opacity-100" : "opacity-0")} />
              English
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
