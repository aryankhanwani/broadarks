import Image from "next/image";
import type { Metadata } from "next";
import { Building, FileCheck2, MapPin, ShieldCheck } from "lucide-react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import PersonCard from "@/components/ui/PersonCard";
import { type FaqItem } from "@/components/ui/Faq";
import FaqSection from "@/components/sections/FaqSection";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { EXPERIENCE, ORG, PEOPLE, PMV } from "@/lib/site";

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
            subtitleClassName="text-[13.5px] sm:text-[14px]"
          />

          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
            {[
              { n: "01", label: "Purpose", body: PMV.purpose },
              { n: "02", label: "Mission", body: PMV.mission },
              { n: "03", label: "Vision", body: PMV.vision },
            ].map((item) => (
              <StaggerItem key={item.label} className="flex flex-col bg-white p-6 sm:p-7">
                <span className="font-heading text-[13px] font-semibold tabular-nums text-secondary-700">
                  {item.n}
                </span>
                <h2 className="t-h4 mt-3 text-ink">{item.label}</h2>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">{item.body}</p>
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
                <Button href="/divisions">See the four divisions</Button>
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
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal y={26} className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card shadow-lift">
                <Image
                  src="/images/story/livelihoods.jpg"
                  alt="A BroadArks-delivered programme in the field"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Selected experience"
                title="Evidence-led delivery,"
                highlight="not promises."
              />
              <Stagger className="mt-8 border-t border-line" stagger={0.06}>
                {EXPERIENCE.map((item, i) => (
                  <StaggerItem
                    key={item.title}
                    className="flex items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="shrink-0 font-heading text-[13px] font-semibold tabular-nums text-secondary-700">
                      0{i + 1}
                    </span>
                    <h3 className="font-heading text-[15px] font-semibold leading-snug tracking-tight text-ink">
                      {item.title}
                    </h3>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
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

          <Reveal delay={0.12} className="mt-10">
            <h3 className="eyebrow text-gray-500">The legal record</h3>
            <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
              {RECORD.map((row) => (
                <div key={row.label} className="bg-white px-5 py-4 sm:px-6 sm:py-5">
                  <dt className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-gray-500">
                    {row.label}
                  </dt>
                  <dd className="mt-1.5 text-[14.5px] leading-relaxed">
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
    </>
  );
}
