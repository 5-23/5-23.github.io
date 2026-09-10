import { useCallback } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n";

export function useCopyEmail() {
  const { t } = useLanguage();
  const email = t.contacts[0].value;

  return useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success(t.copiedEmail);
    } catch {
      toast(email);
    }
  }, [email, t.copiedEmail]);
}
