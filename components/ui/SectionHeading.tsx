"use client";

import { cn } from "@/lib/utils";
import { AnimatedHeading, Reveal } from "@/components/ui/motion";
import Eyebrow from "@/components/ui/Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Trailing accent-coloured phrase appended to the title. */
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  id?: string;
}

/**
 * SectionHeading — the eyebrow · title · subtitle lockup.
 * Standardised so every section on the site shares one vertical
 * cadence and one entrance animation.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "left",
  onDark = false,
  className,
  titleClassName,
  subtitleClassName,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("flex flex-col", centered && "items-center text-center", className)}>
      {eyebrow && (
        <Reveal y={10} duration={0.5} className="mb-4">
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <AnimatedHeading
        id={id}
        as="h2"
        text={title}
        highlight={highlight}
        className={cn(
          "t-h2 text-balance",
          onDark ? "text-white" : "text-ink",
          centered ? "max-w-3xl" : "max-w-2xl",
          titleClassName,
        )}
        highlightClassName={onDark ? "text-secondary-300" : undefined}
      />

      {subtitle && (
        <Reveal
          as="p"
          delay={0.12}
          y={14}
          className={cn(
            "mt-4 text-[15px] leading-relaxed sm:text-base",
            onDark ? "text-white/70" : "text-ink-muted",
            centered ? "max-w-2xl" : "max-w-xl",
            subtitleClassName,
          )}
        >
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
