import type { Metadata } from "next";
import { Compass, Gauge, Users } from "lucide-react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { type FaqItem } from "@/components/ui/Faq";
import FaqSection from "@/components/sections/FaqSection";
import CtaBand from "@/components/ui/CtaBand";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers at BroadArks Technology — Jobs in EdTech, Skilling & Social Impact",
  description:
    "Explore careers at BroadArks Technology Pvt. Ltd. We build workforce capability and social impact organisations across India. See current openings in EdTech, programme delivery, operations and finance.",
  alternates: { canonical: "/careers" },
};

/* Open roles.
   IMPORTANT for whoever maintains this: each role must get its own
   dated page at /careers/[slug] carrying title, location, type, date
   posted, closing date (or "open until filled, reviewed [date]"),
   full description and how to apply — that is what makes a role
   eligible for Google Jobs. Never list roles here as one undated
   block. Until HR supplies roles, this array stays empty and the
   page renders the honest empty state below. */
const ROLES: {
  title: string;
  slug: string;
  location: string;
  type: string;
  posted: string;
}[] = [];

const WORKING_HERE = [
  {
    icon: Compass,
    title: "Small team, broad scope",
    body: "You will work across functions, not inside one. If you want a narrow job, this is the wrong place.",
  },
  {
    icon: Gauge,
    title: "Outcome accountability",
    body: "Every role has a number attached. We do not hire for effort; we hire for results.",
  },
  {
    icon: Users,
    title: "Multi-division exposure",
    body: "Depending on the role, you may work across Y&Now, the Foundation or other parts of the group.",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "How do I apply for a role at BroadArks?",
    a: `Open the role's page and follow the instructions there. Otherwise email ${ORG.email} with the subject line "Careers Enquiry — [role or area]".`,
  },
  {
    q: "Can I apply to a specific BroadArks division?",
    a: "Yes. Roles say which division they sit in. Roles that span the group are listed here.",
  },
  {
    q: "Where is BroadArks based?",
    a: `Our headquarters are at ${ORG.address.line1}, ${ORG.address.line2}, ${ORG.address.city} – ${ORG.address.postalCode}, ${ORG.address.state}.`,
  },
  {
    q: "Does BroadArks offer internships or fellowships?",
    a: `They are posted here when we are running them. To register interest, email ${ORG.email} with the subject line "Careers Enquiry — Internship".`,
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build something"
        highlight="you can measure."
        lead="We are building four organisations across skills, jobs and social impact. We hire people who want their work to show up in whether someone actually gets a job."
      />

      {/* What working here looks like -------------------------------------- */}
      <section className="section-y bg-white">
        <Container>
          <SectionHeading
            eyebrow="What working here looks like"
            title="Three things to know"
            highlight="before you apply."
          />
          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-3">
            {WORKING_HERE.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="bg-white p-6 sm:p-8">
                <Icon size={20} className="text-secondary-500" aria-hidden />
                <h3 className="t-h4 mt-4 text-ink">{title}</h3>
                <p className="t-body mt-2.5 text-[15px]">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Open roles --------------------------------------------------------- */}
      <section className="section-y bg-surface">
        <Container>
          <SectionHeading eyebrow="Open roles" title="Current openings" />

          {ROLES.length === 0 ? (
            <Reveal delay={0.12} className="mt-10 rounded-card border border-dashed border-line bg-white p-8 sm:p-12">
              <h3 className="t-h3 text-ink">No open roles right now</h3>
              <p className="t-body mt-4 max-w-xl text-[15px] sm:text-base">
                We post roles here as they open. In the meantime, tell us what you do and where you
                would want to do it.
              </p>
              <a
                href={`mailto:${ORG.email}?subject=${encodeURIComponent(
                  "Careers Enquiry — [Your Area of Interest]",
                )}`}
                className="mt-7 inline-flex items-center rounded-pill bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-600"
              >
                Register your interest
              </a>
              <p className="mt-5 text-[13px] text-gray-500">
                Subject line: Careers Enquiry — [your area of interest]
              </p>
            </Reveal>
          ) : (
            <Stagger className="mt-10 space-y-px overflow-hidden rounded-card bg-line">
              {ROLES.map((role) => (
                <StaggerItem key={role.slug} className="bg-white">
                  <a
                    href={`/careers/${role.slug}`}
                    className="flex flex-col gap-3 px-6 py-6 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:justify-between sm:px-8"
                  >
                    <div>
                      <h3 className="t-h4 text-ink">{role.title}</h3>
                      <p className="t-body mt-1 text-[14px]">
                        {role.location} · {role.type} · Posted {role.posted}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary-600">View role</span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>

      {/* FAQ ---------------------------------------------------------------- */}
      <FaqSection
        title="Applying to"
        highlight="BroadArks."
        items={FAQS} className="bg-white"
      />

      <CtaBand
        eyebrow="Get in touch"
        title="Think you would be"
        highlight="useful here?"
        body="Tell us what you do and which part of the group interests you. We keep them on file and come back when a role opens."
        primary={{ label: "Contact BroadArks", href: "/contact" }}
        secondary={{ label: "Meet the team", href: "/about#leadership" }}
      />
    </>
  );
}
