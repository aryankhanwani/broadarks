"use client";

import { CountUp, Reveal } from "@/components/ui/motion";
import Container from "@/components/ui/Container";
import { ORG } from "@/lib/site";

/* ================================================================
   PROOF BAND

   Four facts, stated plainly. The client marquee that used to run
   beneath these was cut from the homepage — four numbers already
   carry the "we are established" argument without a second, louder
   proof point competing for attention.
   ================================================================ */

const STATS = [
  { value: <>ISO 9001</>, sub: ":2015", label: "Certified quality management" },
  { value: <CountUp to={3800} suffix="+" />, label: "Organisations work with Y&Now" },
  { value: <>{ORG.founded}</>, label: "Founded, in Bhopal" },
  { value: <>04</>, label: "Divisions, one parent" },
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
    </section>
  );
}
