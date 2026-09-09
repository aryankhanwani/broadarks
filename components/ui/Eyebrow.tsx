import { cn } from "@/lib/utils";

/**
 * Eyebrow — the small tracked label above a section title.
 * The leading rule is decorative; it anchors the label to the
 * left edge of the text column so short labels don't float.
 */
export default function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn("h-px w-6 shrink-0", onDark ? "bg-secondary-300/70" : "bg-secondary-400")}
      />
      <span className={cn("eyebrow", onDark ? "text-secondary-200" : "text-secondary-700")}>
        {children}
      </span>
    </span>
  );
}
