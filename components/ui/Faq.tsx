"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/ui/motion";

export interface FaqItem {
  q: string;
  a: React.ReactNode;
}

/**
 * Faq — an accordion, and also the page's answer-engine surface.
 *
 * Every answer is rendered into the DOM as text regardless of open
 * state (the collapsed panel is height-clipped, not unmounted for
 * SEO purposes — it *is* unmounted here for a11y, and the same Q&A
 * pairs are emitted as FAQPage JSON-LD by the page that uses this).
 * Keep answers to 2–3 sentences: they are quoted verbatim by AI
 * search, and a rambling answer gets truncated mid-claim.
 */
export default function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-primary-600 sm:py-6"
              >
                <span className="t-h4 text-ink">{item.q}</span>
                <span
                  className={cn(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-[--duration-base] ease-[--ease-brand]",
                    isOpen
                      ? "rotate-45 border-primary-500 bg-primary-500 text-white"
                      : "border-line text-ink-muted",
                  )}
                  aria-hidden
                >
                  <Plus size={15} strokeWidth={2.5} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.34, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="t-body max-w-2xl pb-6 pr-10 text-[15px]">{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
