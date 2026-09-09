"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

/* ================================================================
   PRINCIPLES

   Four rules, as an editorial register: number in the margin, rule
   on the left, plain-English gloss on the right, hairline between.

   Everything is on screen at once and nothing is hidden behind a
   click. That is the point — with four items of two lines each,
   any control that reveals one at a time costs the reader more
   than it saves them. The interaction is a hover state on a row,
   not a mechanism for getting at the content.
   ================================================================ */

const PRINCIPLES = [
  {
    n: "01",
    rule: "Outcomes first",
    gloss: "We agree what success is, and how it gets measured, before delivery starts.",
  },
  {
    n: "02",
    rule: "Certified delivery",
    gloss: "ISO 9001:2015 across the whole company, renewed by external audit.",
  },
  {
    n: "03",
    rule: "Technology where it earns it",
    gloss: "Digital tools run the testing and reporting because they make the work checkable.",
  },
  {
    n: "04",
    rule: "Shared foundations",
    gloss: "One set of books, one governance standard, four specialist teams.",
  },
];

export default function Principles() {
  return (
    <section className="section-y bg-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="How we work"
              title="Four divisions."
              highlight="One standard."
              subtitle="Different audiences and different programmes, held to the same four rules."
            />
          </div>
          <Reveal delay={0.2} className="lg:col-span-5 lg:justify-self-end">
            <Button href="/approach" variant="secondary">
              Read the full approach
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-12 border-t border-line" stagger={0.09}>
          {PRINCIPLES.map((p) => (
            <StaggerItem key={p.n}>
              {/* The row is a group so the numeral, rule and underline all
                  respond to one hover, wherever on the row it lands. */}
              <div className="group relative grid items-baseline gap-x-8 gap-y-2 border-b border-line py-7 transition-colors duration-500 sm:grid-cols-12 sm:py-9">
                <span className="col-span-1 font-heading text-[13px] font-semibold tabular-nums text-gray-500 transition-colors duration-500 group-hover:text-secondary-700">
                  {p.n}
                </span>

                <h3 className="font-heading text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] font-semibold leading-tight tracking-tight text-ink sm:col-span-5">
                  {p.rule}
                </h3>

                <p className="text-[15px] leading-relaxed text-ink-muted sm:col-span-6">
                  {p.gloss}
                </p>

                {/* Accent rule drawing across the bottom edge — the whole
                    hover affordance, and it costs one pseudo-element. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[-1px] h-px w-0 bg-primary-500 transition-[width] duration-700 ease-[--ease-brand] group-hover:w-full"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
