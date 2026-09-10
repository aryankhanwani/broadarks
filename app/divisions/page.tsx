import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CircleDashed } from "lucide-react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Eyebrow from "@/components/ui/Eyebrow";
import { type FaqItem } from "@/components/ui/Faq";
import FaqSection from "@/components/sections/FaqSection";
import CtaBand from "@/components/ui/CtaBand";
import DivisionsShowcase from "@/components/sections/DivisionsShowcase";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import {
  DIVISIONS,
  LINKAGE_CLOSE,
  LINKAGE_ROLES,
  ONE_LINE,
  ORG,
  type Division,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "BroadArks Divisions — Y&Now, Foundation, Kari Green & Vihaanga AI",
  description:
    "BroadArks Technology operates through four specialist divisions: Y&Now (workforce & employability), BroadArks Foundation (social impact), Kari Green (sustainability & circularity) and Vihaanga AI (intelligence & technology).",
  alternates: { canonical: "/divisions" },
};

const FAQS: FaqItem[] = [
  {
    q: "Are BroadArks Technology and BroadArks Foundation the same organisation?",
    a: `No. ${ORG.legalName} is the parent company. BroadArks Foundation is a separately registered nonprofit society, established in 2014, with its own registrations and its own contact details at broadarksfoundation.org.`,
  },
  {
    q: "What is the relationship between BroadArks and Y&Now?",
    a: `Y&Now is the workforce and employability division of ${ORG.legalName}, at yandnow.com. Its contracts are signed by ${ORG.legalName}`,
  },
  {
    q: "How many divisions does BroadArks have?",
    a: "Four — Y&Now, BroadArks Foundation, Kari Green and Vihaanga AI. The first two take enquiries at their own sites; the other two operate through the parent company while their sites are being set up.",
  },
  {
    q: "Which division should I contact?",
    a: `For company training or the platform, go to Y&Now. For CSR and community programmes, go to BroadArks Foundation. For sustainability or AI capabilities — or if you are not sure — email ${ORG.email} and we will route it.`,
  },
];

/* ----------------------------------------------------------------
   One full-width record per division, anchored at /divisions#slug.
   These sections replaced the old /divisions/[slug] pages — the
   same facts, one scroll instead of four clicks.
   ---------------------------------------------------------------- */
function DivisionSection({ division: d, flip }: { division: Division; flip: boolean }) {
  const isLive = d.status === "live";

  return (
    <section
      id={d.slug}
      className={`section-y scroll-mt-24 ${flip ? "bg-surface" : "bg-white"}`}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Copy column */}
          <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
            <Reveal y={10} duration={0.5} className="flex flex-wrap items-center gap-3">
              <span className="font-heading text-[13px] font-semibold tabular-nums text-gray-500">
                {d.index}
              </span>
              {!isLive && (
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                  <CircleDashed size={11} aria-hidden />
                  Site in development
                </span>
              )}
            </Reveal>

            <h2 className="t-h2 mt-4 text-ink">{d.name}</h2>
            <p className="mt-2 text-[15px] font-medium text-primary-600 sm:text-base">
              {d.tagline}
            </p>

            <div className="mt-6 space-y-4">
              {d.detail.map((para) => (
                <Reveal key={para.slice(0, 40)} as="p" className="t-body text-[15px] sm:text-base">
                  {para}
                </Reveal>
              ))}
            </div>

            {/* Scope of work */}
            <div className="mt-8">
              <Reveal y={10} duration={0.5}>
                <Eyebrow>What it covers</Eyebrow>
              </Reveal>
              <Stagger className="mt-4 flex flex-wrap gap-2" stagger={0.04}>
                {d.scope.map((s) => (
                  <StaggerItem
                    key={s}
                    className={`rounded-pill border px-3.5 py-1.5 text-sm ${
                      flip ? "border-line bg-white text-ink-muted" : "border-line text-ink-muted"
                    }`}
                  >
                    {s}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {d.audience.length > 0 && (
              <Reveal delay={0.1} className="mt-7 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[14.5px]">
                <span className="font-semibold text-ink">Built for</span>
                <span className="text-ink-muted">{d.audience.join(" · ")}</span>
              </Reveal>
            )}

            {d.proof && d.proof.length > 0 && (
              <Reveal delay={0.14} className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[14.5px]">
                <span className="font-semibold text-ink">Works with</span>
                <span className="text-ink-muted">
                  {d.proof.join(" · ")} and 3,800+ organisations
                </span>
              </Reveal>
            )}
          </div>

          {/* Fact card */}
          <Reveal delay={0.15} y={26} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
            <div className="overflow-hidden rounded-card border border-line bg-white shadow-card lg:sticky lg:top-28">
              <div className="relative aspect-[4/3]">
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 p-6 sm:p-7">
                <div>
                  <p className="eyebrow text-gray-500">Website</p>
                  {d.url ? (
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary-600 hover:text-primary-700"
                    >
                      {d.domain}
                      <ArrowUpRight size={15} strokeWidth={2.5} aria-hidden />
                    </a>
                  ) : (
                    <p className="mt-1.5 text-[15px] text-ink-muted">To be announced</p>
                  )}
                </div>
                <div className="border-t border-line pt-4">
                  <p className="eyebrow text-gray-500">Status</p>
                  <p className="mt-1.5 text-[15px] text-ink">
                    {isLive ? "Operating, with its own site" : "Operating through the parent company"}
                  </p>
                </div>
                <div className="border-t border-line pt-4">
                  <p className="eyebrow text-gray-500">Legal entity</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink">
                    {d.slug === "foundation"
                      ? "BroadArks Foundation — separately registered nonprofit society, est. 2014"
                      : ORG.legalName}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Entity boundary note, Foundation only. */}
        {d.slug === "foundation" && (
          <Reveal className="mt-10 border-l-2 border-secondary-500 py-1 pl-5 text-[14.5px] leading-relaxed text-ink-muted sm:pl-6">
            A separate legal entity, with its own registrations and contact details published on
            its own site.
          </Reveal>
        )}
      </Container>
    </section>
  );
}

export default function DivisionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our divisions"
        title="Four capabilities."
        highlight="One front door."
        lead={ONE_LINE}
      >
        {/* Anchor rail — jump straight to a division's record below. */}
        <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2.5">
          {DIVISIONS.map((d) => (
            <a
              key={d.slug}
              href={`#${d.slug}`}
              className="rounded-pill border border-line bg-white px-4 py-2 text-sm font-medium text-ink-muted transition-colors duration-[--duration-base] hover:border-primary-300 hover:text-ink"
            >
              {d.name}
            </a>
          ))}
        </Reveal>
      </PageHero>

      <DivisionsShowcase
        eyebrow="At a glance"
        title="Who does what, and"
        highlight="where to find them."
        subtitle=""
      />

      {/* The linkage ------------------------------------------------------ */}
      <section className="section-y bg-primary-950">
        <Container>
          <Reveal y={10} duration={0.5}>
            <Eyebrow onDark>The linkage</Eyebrow>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-5 max-w-2xl font-heading text-[clamp(1.25rem,1.05rem+1vw,1.875rem)] font-medium leading-snug tracking-tight text-white">
            {LINKAGE_CLOSE}
          </Reveal>

          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-card bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {LINKAGE_ROLES.map((r, i) => (
              <StaggerItem key={r.name} className="bg-primary-950 p-6">
                <span className="text-[11px] font-semibold tabular-nums text-white/40">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-heading text-[17px] font-semibold tracking-tight text-white">
                  {r.name}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/65">{r.role}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.18} className="mt-8">
            <Link
              href="/approach"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-white/85 transition-colors hover:text-white"
            >
              How an engagement runs
              <ArrowRight
                size={15}
                strokeWidth={2.5}
                aria-hidden
                className="transition-transform duration-300 ease-[--ease-brand] group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Division records -------------------------------------------------- */}
      {DIVISIONS.map((d, i) => (
        <DivisionSection key={d.slug} division={d} flip={i % 2 === 1} />
      ))}

      <FaqSection title="How the group" highlight="fits together." items={FAQS} className="bg-white" />

      <CtaBand
        title="Not sure which division"
        highlight="you need?"
        body="Tell us what you are trying to do. We will point you at the right team, or say plainly if it is not something we do."
        primary={{ label: "Contact BroadArks", href: "/contact" }}
        secondary={{ label: "Read our approach", href: "/approach" }}
      />
    </>
  );
}
