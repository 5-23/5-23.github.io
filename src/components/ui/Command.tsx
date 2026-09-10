import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

export function CommandDialog({ open, onOpenChange, title, children }: CommandDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-modal bg-black/60" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-24 z-modal w-full max-w-lg -translate-x-1/2 px-4 outline-none"
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <div className="overflow-hidden rounded-lg bg-raised shadow-overlay">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function Command({ className, ...props }: ComponentPropsWithoutRef<typeof CommandPrimitive>) {
  return <CommandPrimitive className={cn("flex w-full flex-col", className)} {...props} />;
}

export function CommandInput({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Input>) {
  return (
    <div className="flex items-center gap-3 border-b border-line px-4">
      <Search className="size-4 shrink-0 text-faint" />
      <CommandPrimitive.Input
        className={cn("h-12 w-full bg-transparent text-body text-text outline-none placeholder:text-faint", className)}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List className={cn("max-h-80 overflow-y-auto p-2", className)} {...props} />;
}

export function CommandEmpty(props: ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty className="py-6 text-center text-label text-faint" {...props} />;
}

export function CommandGroup({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-caption [&_[cmdk-group-heading]]:text-faint",
        className
      )}
      {...props}
    />
  );
}

export function CommandItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "flex h-9 cursor-pointer select-none items-center gap-3 rounded-md px-2 text-label text-muted transition-colors ease-smooth data-[selected=true]:bg-line data-[selected=true]:text-text [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-faint",
        className
      )}
      {...props}
    />
  );
}
