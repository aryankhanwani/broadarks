"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { EASE } from "@/components/ui/motion";
import { DIVISIONS, ORG } from "@/lib/site";

/* ================================================================
   HERO — type-led, with the photography beside it rather than
   underneath it.

   The previous hero was a full-bleed autoplaying film with the
   headline reversed out of a scrim: 6MB of video before a visitor
   could read a word, and a dark slab that made every section after
   it feel like an afterthought. This version puts the proposition
   first — one H1, one line of copy, two routes onward — and hands
   the imagery to a contained carousel that can move without
   moving the type.

   The H1 does not rotate with the slides: the page needs one
   headline carrying commercial search intent, and a heading that
   swaps every five seconds gives a crawler three competing topics
   and a screen-reader user a moving target. The media carries the
   motion; each slide names itself in its own caption.
   ================================================================ */

interface Slide {
  image: string;
  caption: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    image: "/images/story/plant-floor.jpg",
    caption: "Training that reaches the shop floor",
    alt: "A trainer guiding an apprentice at a machine control panel on a factory floor in India",
  },
  {
    image: "/images/story/employability.jpg",
    caption: "Jobs at the end of it, not just certificates",
    alt: "Learners in a practical employability training session",
  },
  {
    image: "/images/story/classroom.jpg",
    caption: "Skills that start at school",
    alt: "School students working through an applied robotics session",
  },
];

const SLIDE_MS = 5200;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="BroadArks Technology" className="relative isolate overflow-hidden bg-white">
      {/* Two soft blooms instead of a photographic background. They
          give the white page depth without putting anything behind
          the type that has to be scrimmed back out again. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[620px] w-[620px] rounded-full bg-primary-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 -z-10 h-[520px] w-[520px] rounded-full bg-secondary-100/60 blur-3xl"
      />

      <Container className="pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---- Copy ------------------------------------------- */}
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-3.5 py-1.5 shadow-card"
            >
              <ShieldCheck size={14} className="text-secondary-500" aria-hidden />
              <span className="eyebrow text-ink-muted">{ORG.iso} · Bhopal, India</span>
            </motion.p>

            <h1 className="t-display mt-6 text-ink">
              {/* Line-by-line mask reveal, and a hard two-line rule.
                  Each line stays under ~18 characters so it survives
                  at the clamp's mobile minimum without re-wrapping. */}
              {["Workforce skills.", "Community impact."].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={i === 1 ? "block text-primary-500" : "block"}
                    initial={{ y: reduce ? 0 : "108%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: reduce ? 0 : 0.8, delay: 0.08 + i * 0.08, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-muted sm:text-lg"
            >
              One company, four specialist divisions — skilling, social impact, sustainability and
              applied AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/divisions">Explore our divisions</Button>
              <Button href="/about" variant="secondary">
                About BroadArks
              </Button>
            </motion.div>

            {/* The four names, once, as a hairline strip. Cheaper than
                a paragraph explaining that there are four of them. */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-[13px] font-medium text-gray-500"
            >
              {DIVISIONS.map((d) => (
                <li key={d.slug}>{d.name}</li>
              ))}
            </motion.ul>
          </div>

          {/* ---- Carousel --------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="lg:col-span-6"
          >
            <MediaCarousel reduce={Boolean(reduce)} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function MediaCarousel({ reduce }: { reduce: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (i: number) => setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length),
    [],
  );

  /* Auto-advance stops under reduced motion and while the pointer is
     over the card. WCAG 2.2.2 wants a stop for anything that moves on
     its own past five seconds; hover-to-hold plus the arrows are it,
     and the interval is short enough that nothing is missed. */
  const running = !reduce && !paused;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => go(active + 1), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [active, go, running]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-surface shadow-lift sm:aspect-[16/10] lg:aspect-square">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[active].image}
              alt={SLIDES[active].alt}
              fill
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Just enough scrim under the caption to hold white text. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary-950/75 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              aria-live="polite"
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
              className="max-w-[15rem] font-heading text-[15px] font-semibold leading-snug text-white sm:text-[17px]"
            >
              {SLIDES[active].caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress rail under the card — one segment per slide, the
          active one filling over the dwell time. */}
      <div className="mt-4 flex items-center gap-2" role="group" aria-label="Choose an image">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.caption}
            type="button"
            aria-current={i === active}
            aria-label={`Show image ${i + 1} of ${SLIDES.length}: ${slide.caption}`}
            onClick={() => go(i)}
            /* A 24px-tall hit area around a 3px rail — the visible
               line stays hairline-thin, the tap target does not. */
            className="group flex h-6 flex-1 items-center"
          >
            <span className="h-[3px] w-full overflow-hidden rounded-full bg-line transition-colors group-hover:bg-gray-300">
              {i === active && (
                <motion.span
                  key={`fill-${active}-${paused}`}
                  className="block h-full rounded-full bg-primary-500"
                  initial={{ width: running ? "0%" : "100%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: running ? SLIDE_MS / 1000 : 0, ease: "linear" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
