"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { CountUp, Reveal } from "@/components/ui/motion";

/* ================================================================
   WHY WE EXIST

   Replaces the old site's "Our Reason to Be", which still opened on
   a COVID framing and a 2023 forecast that has since become
   history.

   The plate drifts as the section passes the viewport. It is
   scroll-linked rather than triggered, so the movement is tied to
   the reader's own scrolling — which is the only kind of parallax
   that does not feel like it is happening *to* you. Amplitude is
   small on purpose: about 40px of travel across a whole screen
   height.
   ================================================================ */

export default function WhyWeExist() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section className="section-y bg-white">
      <Container>
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Why we exist"
              title="Millions join India's workforce each year."
              highlight="Too few are ready."
            />
            <Reveal as="p" delay={0.14} className="t-body mt-5 max-w-md text-[15px] sm:text-base">
              Closing that gap is the whole point of BroadArks — and why we work through four
              focused divisions rather than one company trying to do everything.
            </Reveal>

            {/* One number, stated once. It carries the argument that a
                third paragraph would have tried to make. */}
            <Reveal delay={0.2} className="mt-9 flex items-baseline gap-4 border-t border-line pt-7">
              <span className="font-heading text-[clamp(2.4rem,2rem+1.6vw,3.25rem)] font-semibold leading-none tracking-tight text-primary-500">
                <CountUp to={7} />
                –<CountUp to={8} />m
              </span>
              <span className="max-w-[22ch] text-[13.5px] leading-snug text-ink-muted">
                people join India&rsquo;s workforce every year
              </span>
            </Reveal>

            <Reveal delay={0.26} className="mt-8">
              <Button href="/approach" variant="secondary">
                How the model works
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              style={{ y: reduce ? 0 : backY }}
              className="relative aspect-[4/3] overflow-hidden rounded-card shadow-lift"
            >
              <Image
                src="/images/story/livelihoods.jpg"
                alt="Women entrepreneurs at a market linkage programme"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
