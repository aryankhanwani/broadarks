"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

/* ================================================================
   PRINCIPLES / "HOW WE WORK"

   A numbered list on the left, one vertical photograph on the
   right. Only the active row carries a solid fill — everything
   else sits flat against the page — and hovering a row swaps the
   photograph rather than revealing hidden copy, so the interaction
   stays a state change, not a mechanism for reaching content that
   is otherwise hidden.

   Square corners throughout, on purpose: this is the one section
   on the site built as a plate, not a set of cards.
   ================================================================ */

const PRINCIPLES = [
  {
    n: "01",
    rule: "Outcomes first",
    image: "/images/story/team-collaboration.png",
    alt: "A BroadArks team reviewing programme outcomes together",
  },
  {
    n: "02",
    rule: "Certified delivery",
    image: "/images/story/iso-9001.png",
    alt: "BroadArks' ISO 9001:2015 certification",
  },
  {
    n: "03",
    rule: "Technology where it earns it",
    image: "/images/story/plant-floor.jpg",
    alt: "Technology-enabled testing on a plant floor",
  },
  {
    n: "04",
    rule: "Shared foundations",
    image: "/images/story/classroom.jpg",
    alt: "A classroom session run under BroadArks' shared standard",
  },
];

export default function Principles() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section className="section-y bg-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="How we work" title="Four divisions." highlight="One standard." />
          </div>
          <Reveal delay={0.2} className="lg:col-span-5 lg:justify-self-end">
            <Button href="/approach" variant="secondary">
              Read the full approach
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Stagger className="border-t border-line lg:col-span-6" stagger={0.09}>
            {PRINCIPLES.map((p, i) => (
              <StaggerItem key={p.n}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative flex w-full items-baseline gap-x-6 gap-y-2 border-b border-line px-5 py-5 text-left transition-colors duration-500 sm:py-7 ${
                    active === i ? "bg-primary-500" : "bg-transparent hover:bg-surface"
                  }`}
                >
                  <span
                    className={`shrink-0 font-heading text-[13px] font-semibold tabular-nums transition-colors duration-500 ${
                      active === i ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {p.n}
                  </span>

                  <span
                    className={`block min-w-0 font-heading text-[clamp(1.15rem,1rem+0.7vw,1.5rem)] font-semibold leading-tight tracking-tight transition-colors duration-500 ${
                      active === i ? "text-white" : "text-ink"
                    }`}
                  >
                    {p.rule}
                  </span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: reduce ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: reduce ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={PRINCIPLES[active].image}
                    alt={PRINCIPLES[active].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
