import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** `narrow` for prose, `wide` for edge-to-edge panels. */
  size?: "default" | "narrow" | "wide";
}

/**
 * Container — the width-limiting wrapper used on every section.
 * Gutters step up with the viewport so content never touches the
 * edge on a phone but still breathes on a desktop.
 */
export default function Container({ children, className, size = "default" }: ContainerProps) {
  const maxWidth =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[1600px]" : "max-w-7xl";

  return (
    <div className={cn(maxWidth, "mx-auto w-full px-5 sm:px-6 lg:px-8", className)}>{children}</div>
  );
}
