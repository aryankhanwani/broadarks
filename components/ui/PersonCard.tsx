"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { EASE } from "@/components/ui/motion";
import { type Person } from "@/lib/site";

/* ================================================================
   PERSON CARD

   A modest portrait (never full-bleed — this is a directory, not a
   gallery), a 2–3 line blurb, and a "Read more" trigger. The full
   bio, credential and LinkedIn link live in a popup rather than on
   the page, so six people don't cost twelve paragraphs of scroll.
   ================================================================ */

function Portrait({ person, size }: { person: Person; size: "sm" | "lg" }) {
  // No fs access from a client component — a missing photo file is
  // instead caught as a load error and swapped for the initials plate.
  const [broken, setBroken] = useState(false);
  const showImage = Boolean(person.image) && !broken;
  const dims = size === "lg" ? "h-16 w-16 text-base" : "h-12 w-12 text-sm";

  if (showImage) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-full bg-surface-2 ${
          size === "lg" ? "h-16 w-16" : "h-12 w-12"
        }`}
      >
        <Image
          src={person.image as string}
          alt={person.name}
          fill
          sizes="64px"
          className="object-cover"
          onError={() => setBroken(true)}
        />
      </div>
    );
  }

  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full bg-primary-500 font-heading font-semibold text-white ${dims}`}
    >
      {person.initials}
    </span>
  );
}

export default function PersonCard({ person, featured }: { person: Person; featured?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <article
        className={
          featured
            ? "h-full rounded-card border border-line bg-white p-6 shadow-card sm:p-7"
            : "h-full rounded-card border border-line bg-white p-5 sm:p-6"
        }
      >
        <div className="flex items-start gap-4">
          <Portrait person={person} size={featured ? "lg" : "sm"} />
          <div className="min-w-0 pt-0.5">
            <h3 className={featured ? "t-h4 text-ink" : "font-heading text-[15px] font-semibold tracking-tight text-ink"}>
              {person.name}
            </h3>
            <p className="mt-0.5 text-[13px] font-medium text-primary-600">{person.role}</p>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-[14px] leading-relaxed text-ink-muted">{person.blurb}</p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          Read more
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            aria-hidden
            className="transition-transform duration-300 ease-[--ease-brand] group-hover:translate-x-1"
          />
        </button>
      </article>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={person.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.32, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-card bg-white p-6 shadow-lift sm:rounded-card sm:p-8"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <X size={18} />
              </button>

              <div className="flex items-start gap-4 pr-10">
                <Portrait person={person} size="lg" />
                <div className="min-w-0 pt-0.5">
                  <h3 className="t-h4 text-ink">{person.name}</h3>
                  <p className="mt-0.5 text-[13.5px] font-medium text-primary-600">{person.role}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {person.bio.map((para) => (
                  <p key={para.slice(0, 40)} className="t-body text-[15px]">
                    {para}
                  </p>
                ))}
              </div>

              {(person.credential || person.linkedin) && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  {person.credential && (
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-gray-500">
                      {person.credential}
                    </p>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary-600 hover:text-primary-700"
                    >
                      LinkedIn
                      <ExternalLink size={13} strokeWidth={2.25} aria-hidden />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
