import Image from "next/image";
import type { Metadata } from "next";
import { Cpu, GitMerge, ScrollText, Target } from "lucide-react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import IntegrationModel from "@/components/sections/IntegrationModel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { LIVE_DIVISIONS, ORG, PARTNER_VALUE, PARTNERSHIP_MODEL, divisionHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "The BroadArks Approach — Integrated Delivery Under One Arm",
  description:
    "How BroadArks Technology converts complex enterprise and development priorities into practical, technology-enabled and measurable solutions — a connected pathway from need identification to scalable outcomes.",
  alternates: { canonical: "/approach" },
};

const CONSTANTS = [
  {
    icon: Target,
    title: "Outcome-first design",
    body: "We agree what we are measuring, and what counts as success, before we start. Not after, when the numbers can be picked to fit.",
  },
  {
    icon: ScrollText,
    title: "Certified delivery process",
    body: `${ORG.iso} quality management across the company, renewed by external audit.`,
  },
  {
    icon: Cpu,
    title: "Technology-enabled, not technology-led",
    body: "Digital tools run the testing, delivery and reporting — because they make the work better and easier to verify, not because they are new.",
  },
  {
    icon: GitMerge,
    title: "Shared infrastructure",
    body: "Divisions specialise, but share governance, finance and reporting. That is what makes a group cheaper to run than four separate companies.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title="Integrated delivery"
        highlight="under one arm."
        lead="A connected pathway from need identification to measurable, scalable outcomes. Each engagement adapts to the community, the institution, the employer and the funding partner."
      />

      {/* Why integration --------------------------------------------------- */}
      <section className="section-y bg-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Why integration matters"
                title="Training alone rarely"
                highlight="closes the gap."
                subtitle=""
              />
              <Reveal as="p" delay={0.14} className="t-body mt-5 max-w-md text-[15px] sm:text-base">
                Learners need relevant curricula, hands-on practice, assessment, industry exposure,
                placement or enterprise support, and continued tracking. BroadArks combines these
                elements within one end-to-end model — with shared systems, shared governance, and a
                separate specialist team for each part.
              </Reveal>
            </div>

            <Reveal delay={0.15} y={26} className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden rounded-card shadow-lift">
                <Image
                  src="/images/story/team-collaboration.png"
                  alt="BroadArks team working through a programme design session"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Integration model ------------------------------------------------- */}
      <div className="bg-surface">
        <IntegrationModel />
      </div>

      {/* Integrated value to partners --------------------------------------- */}
      <section className="section-y bg-white">
        <Container>
          <SectionHeading
            eyebrow="Integrated value to partners"
            title="What one front door"
            highlight="buys you."
          />
          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
            {PARTNER_VALUE.map((v, i) => (
              <StaggerItem key={v.title} className="bg-white p-6 sm:p-8">
                <span className="font-heading text-[13px] font-semibold tabular-nums text-secondary-700">
                  0{i + 1}
                </span>
                <h3 className="t-h4 mt-3 text-ink">{v.title}</h3>
                <p className="t-body mt-2.5 text-[15px]">{v.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Partnership model -------------------------------------------------- */}
      <section className="section-y bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Working with BroadArks"
            title="What an engagement"
            highlight="may include."
            subtitle="Agreed at the outset with corporate CSR teams, government agencies, institutions and industry partners alike."
          />

          <Stagger
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-line sm:grid-cols-4"
            stagger={0.04}
          >
            {PARTNERSHIP_MODEL.map((p) => (
              <StaggerItem
                key={p.title}
                className="flex min-h-[6.5rem] flex-col justify-center bg-white p-5 text-center"
              >
                <span className="font-heading text-[14px] font-semibold leading-snug tracking-tight text-ink">
                  {p.title}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Constants ---------------------------------------------------------- */}
      <section className="section-y bg-white">
        <Container>
          <SectionHeading
            eyebrow="What stays constant"
            title="Different audiences."
            highlight="Same standard."
          />
          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
            {CONSTANTS.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="bg-white p-6 sm:p-8">
                <Icon size={20} className="text-secondary-500" aria-hidden />
                <h3 className="t-h4 mt-4 text-ink">{title}</h3>
                <p className="t-body mt-2.5 text-[15px]">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* The problem, restated ---------------------------------------------- */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal y={10} duration={0.5}>
            <Eyebrow>Still the right problem</Eyebrow>
          </Reveal>
          <h2 className="t-h2 mt-4 max-w-2xl text-balance text-ink">
            The challenge has not changed. The tools have.
          </h2>
          <Reveal as="p" delay={0.14} className="t-body mt-5 max-w-xl text-[15px] sm:text-base">
            Millions still enter the job market each year without the skills employers want. What
            has changed is the toolkit — AI-assisted learning, simulation, live performance
            tracking. We use it where it makes a programme measurably better.
          </Reveal>
          <Reveal delay={0.26} className="mt-8 flex flex-wrap gap-3">
            {LIVE_DIVISIONS.map((d, i) => (
              <Button key={d.slug} href={divisionHref(d)} variant={i === 0 ? "primary" : "secondary"}>
                {d.name}
              </Button>
            ))}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
