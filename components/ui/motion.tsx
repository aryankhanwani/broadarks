"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ================================================================
   MOTION PRIMITIVES

   House rules, applied by every primitive here:
     · Motion is punctuation, not choreography. Things fade and
       rise a few pixels — nothing slides across the screen, spins,
       or parallaxes.
     · Every entrance fires ONCE (`viewport.once`). Re-animating on
       scroll-back makes a page feel unstable on a phone, where the
       user scrolls up and down constantly.
     · One easing curve site-wide.
     · prefers-reduced-motion collapses every primitive to an
       instant, static render — not a slower animation.
   ================================================================ */

/** House easing — a soft quart-out. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Start a touch before the element is fully on screen. */
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

/* ----------------------------------------------------------------
   Reveal — fade + rise a single block into view.
   ---------------------------------------------------------------- */
interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  /** Travel distance in px. Default 20 — keep it small. */
  y?: number;
  duration?: number;
  as?: "div" | "section" | "li" | "span" | "p";
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  duration = 0.65,
  className,
  as = "div",
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------------
   Stagger / StaggerItem — cascade a group of children.
   Wrap the list in <Stagger>, each child in <StaggerItem>.
   ---------------------------------------------------------------- */
const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const itemVariantsStatic: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

interface StaggerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  /** Seconds between children. Default 0.08 — fast enough not to feel slow. */
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}

export function Stagger({
  children,
  stagger = 0.08,
  delay = 0,
  className,
  as = "div",
  ...rest
}: StaggerProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={containerVariants(reduce ? 0 : stagger, reduce ? 0 : delay)}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  as?: "div" | "li" | "a" | "span";
}

export function StaggerItem({ children, className, as = "div", ...rest }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag variants={reduce ? itemVariantsStatic : itemVariants} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------------
   AnimatedHeading — reveals a heading word by word.

   Words, not letters: letter-by-letter reveals shred the word shape
   the eye uses to read, and screen readers announce the whole
   string anyway. Each word gets a clipping mask and rises into it,
   which reads as the line "settling" rather than assembling.
   ---------------------------------------------------------------- */
interface AnimatedHeadingProps {
  text: string;
  /** Trailing phrase rendered in the accent colour. */
  highlight?: string;
  as?: ElementType;
  className?: string;
  highlightClassName?: string;
  delay?: number;
  id?: string;
}

export function AnimatedHeading({
  text,
  highlight,
  as: Tag = "h2",
  className,
  highlightClassName,
  delay = 0,
  id,
}: AnimatedHeadingProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const highlightWords = highlight ? highlight.split(" ") : [];

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {text}
        {highlight && (
          <>
            {" "}
            <span className={cn("text-secondary-500", highlightClassName)}>{highlight}</span>
          </>
        )}
      </Tag>
    );
  }

  let i = 0;
  const renderWord = (word: string, accent: boolean) => {
    const at = i++;
    return (
      <span key={`${word}-${at}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        <motion.span
          className={cn("inline-block", accent && cn("text-secondary-500", highlightClassName))}
          initial={{ y: "105%" }}
          whileInView={{ y: "0%" }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: delay + at * 0.045, ease: EASE }}
        >
          {word}
        </motion.span>
        {" "}
      </span>
    );
  };

  return (
    <Tag id={id} className={className}>
      {words.map((w) => renderWord(w, false))}
      {highlightWords.map((w) => renderWord(w, true))}
    </Tag>
  );
}

/* ----------------------------------------------------------------
   CountUp — animates a number once, when it scrolls into view.
   Used only in the proof band; numbers that tick are a claim of
   scale, so we spend the effect sparingly.
   ---------------------------------------------------------------- */
interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({ to, duration = 1.4, suffix = "", prefix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Under reduced motion the final value is rendered directly below —
    // no animation, and no state write from inside the effect.
    if (!inView || reduce) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      // easeOutExpo — fast out of the gate, long settle on the final digits.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduce]);

  const shown = reduce ? to : value;

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {prefix}
      {shown.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
