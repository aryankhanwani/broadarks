import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Eyebrow from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { DIVISIONS, divisionHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Site Map",
  description:
    "Every page on broadarks.com — the full information architecture of the BroadArks Technology parent website.",
  alternates: { canonical: "/sitemap" },
};

/* The human-readable map. The XML sitemap for crawlers is generated
   separately at /sitemap.xml by app/sitemap.ts.
   This page replaces the previous one, which shipped a raw
   [wp_sitemap_page] shortcode to visitors on every page of the site. */

interface Node {
  label: string;
  href: string;
  note: string;
  children?: Node[];
}

const TREE: Node[] = [
  {
    label: "Home",
    href: "/",
    note: "Parent brand story, proof band, division route cards, leadership preview and FAQ.",
  },
  {
    label: "About BroadArks",
    href: "/about",
    note: "Purpose, mission and vision, founding story, selected experience, the full leadership team and the governance record — one page.",
    children: [
      {
        label: "Leadership",
        href: "/about#leadership",
        note: "Founders, senior team and advisory board, with Person schema for each.",
      },
      {
        label: "Governance",
        href: "/about#governance",
        note: "CIN, ISO certificate, registered office and the entity-boundary note.",
      },
    ],
  },
  {
    label: "Our Divisions",
    href: "/divisions",
    note: "The routing page for the whole group — each division has its own anchored record here.",
    children: DIVISIONS.map((d) => ({
      label: d.name,
      href: divisionHref(d),
      note:
        d.status === "live"
          ? `What it does, who it serves, and the link out to ${d.domain}.`
          : "What we can confirm today. Its own site is announced when it launches.",
    })),
  },
  {
    label: "Our Approach",
    href: "/approach",
    note: "Why the group is structured as a group, how the model works, what stays constant.",
  },
  {
    label: "Careers",
    href: "/careers",
    note: "What working here looks like, open roles, and how to register interest.",
  },
  {
    label: "Contact",
    href: "/contact",
    note: "Routed enquiry form, direct contact details and subject-line routing.",
  },
  {
    label: "Privacy policy",
    href: "/privacy-and-policies",
    note: "What we collect, how we use it, how to have it removed.",
  },
  {
    label: "Terms & conditions",
    href: "/terms-conditions-and-legal",
    note: "Site terms and which legal entity stands behind what.",
  },
];

const EXTERNAL = DIVISIONS.filter((d) => d.url);

export default function SiteMapPage() {
  return (
    <>
      <PageHero
        eyebrow="Site map"
        title="Every page on"
        highlight="broadarks.com."
        lead="The full information architecture of the parent site. Search engines should use the XML sitemap at /sitemap.xml."
      />

      <section className="section-y bg-white">
        <Container>
          <Eyebrow>Pages</Eyebrow>
          <Stagger className="mt-8 divide-y divide-line border-y border-line" stagger={0.05}>
            {TREE.map((node) => (
              <StaggerItem key={node.href} className="py-6">
                <Link
                  href={node.href}
                  className="group inline-flex items-baseline gap-2 transition-colors"
                >
                  <span className="t-h4 text-ink group-hover:text-primary-600">{node.label}</span>
                  <span className="font-mono text-[12px] text-gray-500">{node.href}</span>
                </Link>
                <p className="t-body mt-1.5 max-w-2xl text-[15px]">{node.note}</p>

                {node.children && (
                  <ul className="mt-5 space-y-4 border-l border-line pl-5 sm:pl-7">
                    {node.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="group inline-flex items-baseline gap-2 transition-colors"
                        >
                          <span className="text-[15px] font-semibold text-ink group-hover:text-primary-600">
                            {child.label}
                          </span>
                          <span className="font-mono text-[12px] text-gray-500">{child.href}</span>
                        </Link>
                        <p className="t-body mt-1 max-w-xl text-[14px]">{child.note}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="section-y bg-surface">
        <Container>
          <Eyebrow>Division websites</Eyebrow>
          <p className="t-body mt-4 max-w-2xl text-[15px]">
            These sit outside broadarks.com. Each division site links back here as its parent
            company.
          </p>
          <Reveal delay={0.12} className="mt-8 flex flex-wrap gap-3">
            {EXTERNAL.map((d) => (
              <a
                key={d.slug}
                href={d.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-primary-200 hover:text-primary-600"
              >
                {d.domain}
                <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden />
              </a>
            ))}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
