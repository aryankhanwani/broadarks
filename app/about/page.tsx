import Image from "next/image";
import type { Metadata } from "next";
import { Building, FileCheck2, MapPin, ShieldCheck } from "lucide-react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { type FaqItem } from "@/components/ui/Faq";
import FaqSection from "@/components/sections/FaqSection";
import CtaBand from "@/components/ui/CtaBand";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { EXPERIENCE, ORG, PEOPLE, PMV, type Person } from "@/lib/site";

export const metadata: Metadata = {
  title: "About BroadArks Technology Pvt. Ltd. | Bhopal, India — ISO 9001:2015",
  description:
    "BroadArks Technology Pvt. Ltd. is an ISO 9001:2015 certified workforce skilling and social impact organisation, founded in 2020 in Bhopal, Madhya Pradesh. Parent company of Y&Now, BroadArks Foundation, Kari Green and Vihaanga AI.",
  alternates: { canonical: "/about" },
};

const FAQS: FaqItem[] = [
  {
    q: "When was BroadArks founded?",
    a: `${ORG.legalName} was incorporated in 2020 by Pankaj Dutta and Dr. Kaveri Dutta.`,
  },
  {
    q: "Where is BroadArks headquartered?",
    a: ORG.addressOneLine,
  },
  {
    q: "Is BroadArks a public or private company?",
    a: "A private limited company registered in India. The Corporate Identity Number is in the governance record on this page.",
  },
  {
    q: "How many divisions does BroadArks have?",
    a: "Four: Y&Now (workforce and employability), BroadArks Foundation (social impact), Kari Green (sustainability and circularity) and Vihaanga AI (intelligence and technology).",
  },
  {
    q: "Is BroadArks the same as BroadArks Foundation?",
    a: `No. ${ORG.legalName} is the parent company. BroadArks Foundation is a separately registered nonprofit society, established in 2014. They share a name but are different legal entities, with different registrations and contact details.`,
  },
];

/* The legal record. Values that Legal/Compliance have not yet released
   render as an explicit "on request" line rather than a fabricated
   number or a visible [INSERT] placeholder shipped to production. */
const RECORD: { label: string; value: string | null; note?: string }[] = [
  { label: "Registered legal name", value: ORG.legalName },
  { label: "Entity type", value: "Private limited company, registered in India" },
  {
    label: "Corporate Identity Number (CIN)",
    value: ORG.cin,
    note: "Available on request pending publication.",
  },
  { label: "Year of incorporation", value: ORG.founded },
  { label: "Quality certification", value: ORG.iso },
  {
    label: "Certificate number & validity",
    value: ORG.isoCertificate,
    note: "Available on request pending publication.",
  },
  { label: "Registered office", value: ORG.addressOneLine },
  { label: "Commercial contact", value: ORG.email },
  { label: "Phone", value: ORG.phone },
];

const PILLARS = [
  {
    icon: Building,
    title: "One legal entity",
    body: `Every contract across the group, including all Y&Now agreements, is signed by ${ORG.legalName} Divisions are teams, not separate contracting parties.`,
  },
  {
    icon: ShieldCheck,
    title: "Certified quality management",
    body: `${ORG.iso} applies across the company, and is renewed by external audit.`,
  },
  {
    icon: FileCheck2,
    title: "Auditable programme evidence",
    body: "Every programme leaves evidence an auditor can check. That is what makes independent monitoring and CSR reporting possible.",
  },
  {
    icon: MapPin,
    title: "Single registered address",
    body: "All statutory post goes to our registered office in Bhopal, Madhya Pradesh.",
  },
];

const LEADERSHIP_GROUPS = [
  { key: "Founders" as const, title: "Founders" },
  {
    key: "Senior Team" as const,
    title: "Senior team",
    blurb: "Finance, governance and technology across the group.",
  },
  {
    key: "Advisory Board" as const,
    title: "Advisory board",
    blurb: "Independent advice on development practice, measurement and industry partnerships.",
  },
];

function PersonCard({ person, featured }: { person: Person; featured?: boolean }) {
  return (
    <article
      className={
        featured
          ? "h-full rounded-card border border-line bg-white p-6 shadow-card sm:p-8"
          : "h-full rounded-card border border-line bg-white p-6 sm:p-7"
      }
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-500 font-heading text-sm font-semibold text-white sm:h-14 sm:w-14 sm:text-base"
        >
          {person.initials}
        </span>
        <div className="min-w-0">
          <h3 className="t-h4 text-ink">{person.name}</h3>
          <p className="mt-0.5 text-sm font-medium text-primary-600">{person.role}</p>
        </div>
      </div>

      <div className={featured ? "mt-5 space-y-3" : "mt-4 space-y-2.5"}>
        {person.bio.map((para) => (
          <p key={para.slice(0, 40)} className={featured ? "t-body text-[15px]" : "t-body text-[14px]"}>
            {para}
          </p>
        ))}
      </div>

      {person.credential && (
        <p className="mt-5 border-t border-line pt-4 text-xs font-medium uppercase tracking-[0.08em] text-gray-500">
          {person.credential}
        </p>
      )}
    </article>
  );
}

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@graph": PEOPLE.map((p) => ({
      "@type": "Person",
      name: p.name,
      jobTitle: p.role,
      description: p.bio[0],
      worksFor: { "@type": "Organization", name: ORG.legalName, url: "https://broadarks.com" },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <PageHero
        eyebrow="About BroadArks"
        title="Built as a group,"
        highlight="not a single company."
        lead="Founded in 2020 by Pankaj Dutta and Dr. Kaveri Dutta, to close the gap between what India's workforce can do and what its employers and communities need."
      />

      {/* Purpose · Mission · Vision -------------------------------------- */}
      <section className="section-y bg-white">
        <Container>
          <SectionHeading
            eyebrow="What we are for"
            title="Purpose, mission"
            highlight="and vision."
            subtitle={`We run four divisions, each with its own focus. The parent company holds the legal, financial and governance side for all four. We are ${ORG.iso} certified and based in Bhopal, Madhya Pradesh.`}
          />

          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
            {[
              { label: "Our purpose", body: PMV.purpose, rule: "border-primary-500" },
              { label: "Our mission", body: PMV.mission, rule: "border-secondary-500" },
              { label: "Our vision", body: PMV.vision, rule: "border-primary-300" },
            ].map((item) => (
              <StaggerItem
                key={item.label}
                className={`rounded-card border-l-2 ${item.rule} bg-surface p-6 sm:p-7`}
              >
                <h2 className="eyebrow text-secondary-700">{item.label}</h2>
                <p className="mt-3.5 text-[15px] leading-relaxed text-ink">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Founding story -------------------------------------------------- */}
      <section className="section-y bg-surface">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal y={26} className="order-2 lg:order-1 lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden rounded-card shadow-lift">
                <Image
                  src="/images/story/program-planning.png"
                  alt="BroadArks programme planning session"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="order-1 lg:order-2 lg:col-span-6">
              <SectionHeading
                eyebrow="Founding story"
                title="Why a group, and not"
                highlight="a training company."
              />
              <Reveal as="p" delay={0.14} className="t-body mt-5 max-w-md text-[15px] sm:text-base">
                India&rsquo;s opportunity gap is rarely closed by training alone — it takes
                curricula, practice, assessment, industry exposure, placement and tracking. No one
                training company carries all of that, so our founders built a group: four teams,
                one strategy, one governance framework.
              </Reveal>
              <Reveal delay={0.26} className="mt-8 flex flex-wrap gap-3">
                <Button href="/divisions" variant="secondary">
                  See the four divisions
                </Button>
                <Button href="#leadership" variant="secondary">
                  Meet the team
                </Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Experience & readiness ------------------------------------------ */}
      <section className="section-y bg-white">
        <Container>
          <SectionHeading
            eyebrow="Selected experience"
            title="Evidence-led delivery,"
            highlight="not promises."
            subtitle="A sample of the work behind the group's partnership readiness — implementation, programme design and community delivery."
          />
          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
            {EXPERIENCE.map((item, i) => (
              <StaggerItem key={item.title} className="bg-white p-6 sm:p-8">
                <span className="font-heading text-[13px] font-semibold tabular-nums text-secondary-700">
                  0{i + 1}
                </span>
                <h3 className="t-h4 mt-3 text-ink">{item.title}</h3>
                <p className="t-body mt-2.5 text-[15px]">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Leadership ------------------------------------------------------ */}
      <section id="leadership" className="section-y scroll-mt-24 bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="The people accountable"
            highlight="for all of it."
            subtitle="People who have built and run large organisations across industry, finance, media and the development sector."
          />

          {LEADERSHIP_GROUPS.map((group) => {
            const people = PEOPLE.filter((p) => p.group === group.key);
            if (people.length === 0) return null;
            const isFounders = group.key === "Founders";

            return (
              <div key={group.key} className="mt-12 first-of-type:mt-10">
                <Reveal className="flex items-center gap-4">
                  <h3 className="eyebrow shrink-0 text-gray-500">{group.title}</h3>
                  <span className="h-px flex-1 bg-line" aria-hidden />
                </Reveal>
                {group.blurb && (
                  <Reveal as="p" delay={0.08} className="t-body mt-3 max-w-xl text-[14px]">
                    {group.blurb}
                  </Reveal>
                )}
                <Stagger className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
                  {people.map((p) => (
                    <StaggerItem key={p.name} className="flex">
                      <div className="w-full">
                        <PersonCard person={p} featured={isFounders} />
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            );
          })}

        </Container>
      </section>

      {/* Governance ------------------------------------------------------ */}
      <section id="governance" className="section-y scroll-mt-24 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Governance & compliance"
            title="The entity behind"
            highlight="every contract."
            subtitle="The few facts procurement, compliance and donor teams need before anything can move. Where a number is not published yet, we say so."
          />

          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="bg-white p-6 sm:p-8">
                <Icon size={20} className="text-secondary-500" aria-hidden />
                <h3 className="t-h4 mt-4 text-ink">{title}</h3>
                <p className="t-body mt-2.5 text-[15px]">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.12} className="mt-6 overflow-hidden rounded-card border border-line">
            <dl className="divide-y divide-line">
              {RECORD.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-6 sm:px-7 sm:py-5"
                >
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-500">
                    {row.label}
                  </dt>
                  <dd className="text-[15px] leading-relaxed sm:col-span-2">
                    {row.value ? (
                      <span className="text-ink">{row.value}</span>
                    ) : (
                      <span className="text-ink-muted">{row.note}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.16} className="mt-6 rounded-card border-l-2 border-secondary-500 bg-secondary-50/60 p-6 sm:p-8">
            <h3 className="t-h4 text-ink">A note on BroadArks Foundation</h3>
            <p className="t-body mt-3 max-w-3xl text-[15px]">
              A separately registered nonprofit society, established in 2014. Its registrations,
              accounts and contact details are its own — nothing in this record applies to it.
            </p>
            <a
              href="https://broadarksfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-primary-600 underline underline-offset-4 hover:text-primary-700"
            >
              broadarksfoundation.org
            </a>
          </Reveal>
        </Container>
      </section>

      {/* FAQ -------------------------------------------------------------- */}
      <FaqSection title="About the" highlight="company." items={FAQS} className="bg-surface" />

      <CtaBand
        eyebrow="Compliance enquiries"
        title="Need a document"
        highlight="for your vendor file?"
        body={`Email ${ORG.email} with the subject line "Compliance — [document]". We reply within two working days.`}
        primary={{ label: "Contact BroadArks", href: "/contact" }}
        secondary={{ label: "Explore our divisions", href: "/divisions" }}
      />
    </>
  );
}
