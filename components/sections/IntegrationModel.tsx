"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { EASE } from "@/components/ui/motion";
import { INTEGRATION_MODEL } from "@/lib/site";

/* ================================================================
   INTEGRATION MODEL — the five-step pathway.

   Title only, no body copy — the photograph is the explanation.
   Rather than a fixed panel, the image floats and follows the
   pointer while it travels across the rail, appearing beside
   whichever step is under it. A spring on the follow keeps it from
   feeling glued to the cursor.
   ================================================================ */

const OFFSET = { x: 28, y: -110 };

export default function IntegrationModel() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const x = useSpring(0, { stiffness: 300, damping: 32, mass: 0.6 });
  const y = useSpring(0, { stiffness: 300, damping: 32, mass: 0.6 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = railRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left + OFFSET.x);
    y.set(e.clientY - rect.top + OFFSET.y);
  };

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="The BroadArks integration model"
          title="Five steps, from need"
          highlight="to measurable outcome."
        />

        <div
          ref={railRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setActive(null)}
          className="relative mt-10"
        >
          {/* The floating thumbnail — pointer-events-none so it never
              intercepts the hover it is illustrating. */}
          {!reduce && (
            <motion.div
              aria-hidden
              style={{ x, y }}
              animate={{ opacity: active !== null ? 1 : 0, scale: active !== null ? 1 : 0.96 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="pointer-events-none absolute left-0 top-0 z-10 hidden w-48 overflow-hidden rounded-lg shadow-lift lg:block"
            >
              <div className="relative aspect-[4/3]">
                <AnimatePresence>
                  {active !== null && (
                    <motion.div
                      key={active}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={INTEGRATION_MODEL[active].image}
                        alt=""
                        fill
                        sizes="192px"
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          <div className="border-t border-line">
            {INTEGRATION_MODEL.map((m, i) => (
              <button
                key={m.step}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group flex w-full items-baseline gap-5 border-b border-line py-4 text-left transition-colors duration-300"
              >
                <span className="shrink-0 font-heading text-[13px] font-semibold tabular-nums text-gray-500 transition-colors duration-300 group-hover:text-primary-600">
                  {m.step}
                </span>
                <h3 className="font-heading text-[clamp(1.05rem,0.95rem+0.5vw,1.3rem)] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-primary-600">
                  {m.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
