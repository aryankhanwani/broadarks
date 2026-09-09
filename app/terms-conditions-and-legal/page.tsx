import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/ui/LegalPage";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms governing the use of broadarks.com, operated by ${ORG.legalName}`,
  alternates: { canonical: "/terms-conditions-and-legal" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "About this site",
    body: (
      <p>
        broadarks.com is owned and operated by {ORG.legalName}, a private limited company registered
        in India with its registered office at {ORG.addressOneLine}. By using this site you accept
        these terms.
      </p>
    ),
  },
  {
    heading: "What this site is for",
    body: (
      <p>
        This is the parent company site. It describes who BroadArks is, how the group is structured
        and how to reach the right division. It is not a sales channel: commercial programme
        information belongs to the division sites, and nothing here constitutes an offer to
        contract.
      </p>
    ),
  },
  {
    heading: "Group structure and contracting entity",
    body: (
      <p>
        Y&amp;Now, Kari Green and Vihaanga AI are operating divisions of {ORG.legalName} All
        commercial contracts across those divisions are executed by {ORG.legalName} BroadArks
        Foundation is a separately registered charitable entity, contracts in its own name, and is
        not covered by these terms.
      </p>
    ),
  },
  {
    heading: "Accuracy of information",
    body: (
      <p>
        We take reasonable care to keep this site accurate and current. Content is provided for
        information only and may change without notice. Where a figure or credential is stated as
        pending publication, it should be requested from us directly rather than assumed.
      </p>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        The BroadArks name, logo, division names and the content of this site are the property of{" "}
        {ORG.legalName} unless stated otherwise. You may not reproduce them commercially without
        written permission.
      </p>
    ),
  },
  {
    heading: "External links",
    body: (
      <p>
        This site links to division websites and to third-party organisations. We are not
        responsible for the content or the privacy practices of any site we link to.
      </p>
    ),
  },
  {
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. The courts at Bhopal, Madhya Pradesh have
        exclusive jurisdiction over any dispute arising from them.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & conditions"
      lead="The terms governing use of broadarks.com, and which legal entity stands behind what."
      updated="September 2026"
      sections={SECTIONS}
    />
  );
}
