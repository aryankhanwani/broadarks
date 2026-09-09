import type { Metadata } from "next";

import { type FaqItem } from "@/components/ui/Faq";
import FaqSection from "@/components/sections/FaqSection";
import CtaBand from "@/components/ui/CtaBand";
import Hero from "@/components/sections/Hero";
import ProofBand from "@/components/sections/ProofBand";
import WhyWeExist from "@/components/sections/WhyWeExist";
import DivisionsShowcase from "@/components/sections/DivisionsShowcase";
import Principles from "@/components/sections/Principles";
import LeadershipGrid from "@/components/sections/LeadershipGrid";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "BroadArks — Workforce Skilling, EdTech & Social Impact | India",
  description:
    "BroadArks Technology builds workforce capability, community impact, and sustainable livelihoods across India — through Y&Now, BroadArks Foundation, and specialist divisions. ISO 9001:2015 certified. Bhopal, MP.",
  alternates: { canonical: "/" },
};

/* ================================================================
   HOMEPAGE FAQ
   Also emitted as FAQPage JSON-LD below. Answers stay at two to
   three sentences because answer engines quote them verbatim and
   truncate anything longer mid-claim.
   ================================================================ */
const FAQS: FaqItem[] = [
  {
    q: "What is BroadArks Technology?",
    a: `${ORG.legalName} is an ISO 9001:2015 certified company based in Bhopal, Madhya Pradesh. It runs four divisions: Y&Now, BroadArks Foundation, Kari Green and Vihaanga AI.`,
  },
  {
    q: "What is the difference between BroadArks and Y&Now?",
    a: "BroadArks is the parent company. Y&Now is its skills training division, at yandnow.com. All contracts are signed by BroadArks Technology Pvt. Ltd.",
  },
  {
    q: "What is BroadArks Foundation?",
    a: "A separately registered nonprofit society, established in 2014, running education, healthcare and livelihood programmes. It operates at broadarksfoundation.org and is a different legal entity from BroadArks Technology Pvt. Ltd.",
  },
  {
    q: "Is BroadArks ISO certified?",
    a: "Yes — ISO 9001:2015. The certificate number and validity are in the governance record on our About page.",
  },
  {
    q: "Who founded BroadArks?",
    a: "Pankaj Dutta and Dr. Kaveri Dutta, in 2020, in Bhopal.",
  },
  {
    q: "How do I contact BroadArks?",
    a: (
      <>
        Email{" "}
        <a className="text-primary-600 underline underline-offset-2" href={`mailto:${ORG.email}`}>
          {ORG.email}
        </a>{" "}
        or call{" "}
        <a className="text-primary-600 underline underline-offset-2" href={ORG.phoneHref}>
          {ORG.phone}
        </a>
        . We reply within two working days.
      </>
    ),
  },
];

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          typeof f.a === "string"
            ? f.a
            : `Email ${ORG.email} or call ${ORG.phone}. We reply within two working days.`,
      },
    })),
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG.legalName,
    alternateName: ORG.shortName,
    url: "https://broadarks.com",
    email: ORG.email,
    telephone: ORG.phone,
    foundingDate: ORG.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${ORG.address.line1}, ${ORG.address.line2}`,
      addressLocality: ORG.address.city,
      postalCode: ORG.address.postalCode,
      addressRegion: ORG.address.state,
      addressCountry: "IN",
    },
    hasCredential: ORG.iso,
    subOrganization: [
      { "@type": "Organization", name: "Y&Now", url: "https://yandnow.com" },
      {
        "@type": "Organization",
        name: "BroadArks Foundation",
        url: "https://broadarksfoundation.org",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero />
      <ProofBand />
      <WhyWeExist />
      <DivisionsShowcase />
      <Principles />
      <LeadershipGrid />

      <FaqSection
        items={FAQS} className="bg-white"
      />

      <CtaBand
        title="Not sure who you need"
        highlight="to talk to?"
        body="Tell us what you are trying to do and we will point you at the right division. We reply within two working days."
        primary={{ label: "Contact BroadArks", href: "/contact" }}
        secondary={{ label: "Explore our divisions", href: "/divisions" }}
      />
    </>
  );
}
