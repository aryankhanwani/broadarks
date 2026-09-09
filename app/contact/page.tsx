import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Eyebrow from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import ContactForm from "@/components/sections/ContactForm";
import { LIVE_DIVISIONS, ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact BroadArks Technology — Enquiries, Partnerships & Careers",
  description:
    "Contact BroadArks Technology Pvt. Ltd. for enterprise partnerships, division enquiries, investor relations, careers or media. info@broadarks.com · +91 75535 53372 · Bhopal, Madhya Pradesh.",
  alternates: { canonical: "/contact" },
};

const DETAILS = [
  { icon: Mail, label: "Email", value: ORG.email, href: `mailto:${ORG.email}` },
  { icon: Phone, label: "Phone", value: ORG.phone, href: ORG.phoneHref },
  { icon: MapPin, label: "Registered office", value: ORG.addressOneLine },
  { icon: Clock, label: "Response time", value: "Within 2 working days" },
];

const SUBJECT_LINES = [
  { subject: "Enterprise Partnership Enquiry", covers: "Y&Now company training or the platform" },
  { subject: "CSR Programme Enquiry", covers: "BroadArks Foundation or Y&Now CSR programmes" },
  { subject: "Kari Green Enquiry", covers: "Green skills, circular economy and climate-linked programmes" },
  { subject: "Vihaanga AI Enquiry", covers: "AI-enabled profiling, analytics, dashboards and programme tools" },
  { subject: "Investment / Investor Relations", covers: "Group-level financial or partnership questions" },
  { subject: "Media / Press", covers: "Press releases, interviews, media" },
  { subject: "Careers Enquiry — [Area]", covers: "Applications and expressions of interest" },
];

export default function ContactPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: ORG.legalName,
    url: "https://broadarks.com",
    email: ORG.email,
    telephone: ORG.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${ORG.address.line1}, ${ORG.address.line2}`,
      addressLocality: ORG.address.city,
      postalCode: ORG.address.postalCode,
      addressRegion: ORG.address.state,
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        highlight="We will route it."
        lead="Use the form or reach us directly. Name the division or area and we route it to the right team. We reply within two working days."
      />

      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal y={10} duration={0.5}>
                <Eyebrow>Send an enquiry</Eyebrow>
              </Reveal>
              <h2 className="t-h3 mt-4 text-ink">Start here</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-5">
              <Reveal y={10} duration={0.5}>
                <Eyebrow>Direct contact</Eyebrow>
              </Reveal>

              <Stagger className="mt-6 overflow-hidden rounded-card border border-line">
                {DETAILS.map(({ icon: Icon, label, value, href }, i) => (
                  <StaggerItem
                    key={label}
                    className={i > 0 ? "border-t border-line p-5 sm:p-6" : "p-5 sm:p-6"}
                  >
                    <div className="flex gap-4">
                      <Icon size={18} className="mt-0.5 shrink-0 text-secondary-500" aria-hidden />
                      <div className="min-w-0">
                        <p className="eyebrow text-gray-500">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-1.5 block text-[15px] font-medium text-ink transition-colors hover:text-primary-600"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{value}</p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              {/* Division routes */}
              <Reveal delay={0.15} className="mt-10">
                <Eyebrow>Division routes</Eyebrow>
                <ul className="mt-5 space-y-4">
                  {LIVE_DIVISIONS.map((d) => (
                    <li key={d.slug} className="rounded-card border border-line p-5">
                      <p className="t-h4 text-ink">{d.name}</p>
                      <p className="t-body mt-1 text-[14px]">{d.tagline}</p>
                      <a
                        href={d.url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-semibold text-primary-600 underline underline-offset-4 hover:text-primary-700"
                      >
                        {d.domain}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="t-body mt-5 text-[14px]">
                  BroadArks Foundation is a separate entity with its own contact details. Send
                  Foundation enquiries through its site, not to {ORG.email}.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Subject line routing --------------------------------------------- */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal y={10} duration={0.5}>
            <Eyebrow>Routing</Eyebrow>
          </Reveal>
          <h2 className="t-h2 mt-4 max-w-2xl text-balance text-ink">
            Emailing us directly? Use one of these subject lines
          </h2>
          <p className="t-body mt-4 max-w-xl text-[15px]">
            Everything arrives at {ORG.email} and is sorted on the subject line.
          </p>

          <Stagger className="mt-9 grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
            {SUBJECT_LINES.map((s) => (
              <StaggerItem
                key={s.subject}
                className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <p className="font-heading text-[14.5px] font-semibold text-ink sm:w-[15rem] sm:shrink-0">
                  {s.subject}
                </p>
                <p className="text-[14px] leading-relaxed text-ink-muted">{s.covers}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
