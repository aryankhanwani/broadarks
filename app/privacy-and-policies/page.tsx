import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/ui/LegalPage";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How BroadArks Technology Pvt. Ltd. collects, uses and protects personal information submitted through broadarks.com.`,
  alternates: { canonical: "/privacy-and-policies" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Who this policy covers",
    body: (
      <p>
        This policy applies to {ORG.legalName} and to information collected through broadarks.com.
        BroadArks Foundation is a separately registered charitable entity and publishes its own
        privacy policy on its own website; this policy does not apply to it.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p>
          We collect only what you give us. When you submit an enquiry we collect your name,
          organisation, designation (optional), email address, phone number (optional), the enquiry
          type you select and the message you write.
        </p>
        <p>
          We also collect standard, aggregated web analytics — pages viewed, approximate region,
          device type and referring source — which do not identify you individually.
        </p>
      </>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <p>
        Enquiry information is used only to respond to your enquiry and to route it to the correct
        division. We do not sell it, rent it or share it with third parties for their own marketing.
        Where an enquiry clearly belongs to a division, we forward it internally so the right team
        can reply.
      </p>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>
        Enquiry correspondence is retained for as long as needed to handle the enquiry and to meet
        our statutory record-keeping obligations, then deleted. Expressions of interest sent to our
        careers address are held for twelve months unless you ask us to remove them sooner.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        You can ask us what personal information we hold about you, ask us to correct it, or ask us
        to delete it. Email{" "}
        <a className="text-primary-600 underline underline-offset-2" href={`mailto:${ORG.email}`}>
          {ORG.email}
        </a>{" "}
        with the subject line &ldquo;Data request&rdquo; and we will respond within a reasonable
        period.
      </p>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        broadarks.com uses only the cookies required for the site to function and for aggregate
        analytics. We do not use advertising cookies or cross-site tracking.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Questions about this policy should go to{" "}
        <a className="text-primary-600 underline underline-offset-2" href={`mailto:${ORG.email}`}>
          {ORG.email}
        </a>
        , or by post to {ORG.legalName}, {ORG.addressOneLine}.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      lead="What we collect when you contact us, what we do with it, and how to ask us to remove it."
      updated="September 2026"
      sections={SECTIONS}
    />
  );
}
