"use client";

import { CountUp, Reveal } from "@/components/ui/motion";
import Container from "@/components/ui/Container";
import { ORG } from "@/lib/site";

/* ================================================================
   PROOF BAND

   Four facts and a moving roster of the organisations Y&Now works
   with. The marquee is doing real work: nine client names is a
   paragraph of proof that nobody reads, and a strip that drifts
   past reads as scale without asking for a single second of
   attention.

   ENTITY BOUNDARY: these are Y&Now's clients, and the strip says
   so. BroadArks Technology does not claim them as its own.
   ================================================================ */

const STATS = [
  { value: <>ISO 9001</>, sub: ":2015", label: "Certified quality management" },
  { value: <CountUp to={3800} suffix="+" />, label: "Organisations work with Y&Now" },
  { value: <>{ORG.founded}</>, label: "Founded, in Bhopal" },
  { value: <>04</>, label: "Divisions, one parent" },
];

const CLIENTS = [
  "Tata Group",
  "JSW",
  "Castrol India",
  "BPCL",
  "Jaquar",
  "Indian Army",
  "Indian Oil",
  "Boeing",
  "NSDC",
];

export default function ProofBand() {
  return (
    <section aria-label="BroadArks at a glance" className="border-y border-line bg-surface">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 py-11 lg:grid-cols-4 lg:py-14">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.07}
              y={16}
              className={i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""}
            >
              <p className="font-heading text-[clamp(1.6rem,1.2rem+1.4vw,2.25rem)] font-semibold leading-none tracking-tight text-ink tnum">
                {s.value}
                {s.sub && <span className="text-gray-500">{s.sub}</span>}
              </p>
              <p className="mt-2.5 text-[13px] leading-snug text-ink-muted sm:text-sm">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Client marquee */}
      <div className="border-t border-line py-5">
        <Container>
          <p className="eyebrow mb-4 text-gray-500">Organisations working with Y&amp;Now</p>
        </Container>

        <div
          className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          aria-hidden
        >
          {/* Two identical tracks, each translating a full width, so the
              seam between them never shows. Paused on hover, and frozen
              entirely under prefers-reduced-motion. */}
          {[0, 1].map((track) => (
            <div
              key={track}
              className="animate-marquee flex shrink-0 items-center gap-14 pr-14 group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
            >
              {CLIENTS.map((c) => (
                <span
                  key={c}
                  className="whitespace-nowrap font-heading text-[19px] font-semibold tracking-tight text-gray-300 transition-colors duration-500 hover:text-primary-500 sm:text-[22px]"
                >
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* The same names, once, for anyone not reading the animation. */}
        <p className="sr-only">
          Organisations working with Y&amp;Now include {CLIENTS.join(", ")}, and more than 3,800
          others.
        </p>
      </div>
    </section>
  );
}
