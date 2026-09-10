import { Copy, Globe, Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedContent } from "@/components/reactbits/AnimatedContent";
import { SplitText } from "@/components/reactbits/SplitText";
import { Section } from "@/components/Section";
import { Row, Stack } from "@/components/layout/Layout";
import { Body, Text } from "@/components/Typography";
import { useCopyEmail } from "@/hooks/useCopyEmail";
import { useLanguage } from "@/lib/i18n";

export function CommentBox() {
  const { t, lang } = useLanguage();
  const copyEmail = useCopyEmail();
  const [email, phone, blog] = t.contacts;

  return (
    <Section
      id="contact"
      title={t.sections.contact}
      icon={<MessageSquare className="size-4 text-violet" />}
      index="05"
      onSurface
    >
      <Stack gap={6}>
        <Text as="p" variant="display">
          <SplitText key={`${lang}-contact`} text={t.contactHeadline} inView />
        </Text>
        <AnimatedContent delay={0.2}>
          <Stack gap={3}>
            <Body tone="muted" className="max-w-2xl">
              {t.contactText}
            </Body>
            <Row wrap gap={2}>
              <Button size="sm" onClick={copyEmail} aria-label={t.controls.copyEmail}>
                <Mail />
                {email.value}
                <Copy className="text-faint" />
              </Button>
              <Button asChild size="sm">
                <a href={phone.href}>
                  <Phone />
                  {phone.value}
                </a>
              </Button>
              <Button asChild size="sm">
                <a href={blog.href} target="_blank" rel="noreferrer">
                  <Globe />
                  {blog.value}
                </a>
              </Button>
            </Row>
          </Stack>
        </AnimatedContent>
      </Stack>
    </Section>
  );
}
