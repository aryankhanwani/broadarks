import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PEOPLE, type Person } from "@/lib/site";

/* ================================================================
   LEADERSHIP — homepage strip.

   Two founders get a card each; everyone else is a name, a role
   and nothing more. The homepage previously ran all six people as
   full cards with a blurb and a credential apiece — six paragraphs
   of biography before the visitor had decided they cared. The full
   bench, with bios, lives on /about#leadership, which is where
   someone goes when they do.
   ================================================================ */

function FounderCard({ person: p }: { person: Person }) {
  return (
    <Link
      href="/about#leadership"
      className="group flex h-full items-start gap-5 rounded-card border border-line bg-white p-6 transition-[border-color,box-shadow,transform] duration-[--duration-base] ease-[--ease-brand] hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift sm:p-7"
    >
      <span
        aria-hidden
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-surface-2 font-heading text-[15px] font-semibold text-ink-muted transition-colors duration-[--duration-base] group-hover:bg-primary-500 group-hover:text-white"
      >
        {p.initials}
      </span>
      <span className="min-w-0">
        <span className="block font-heading text-[19px] font-semibold tracking-tight text-ink">
          {p.name}
        </span>
        <span className="mt-1 block text-[13.5px] font-medium text-primary-600">{p.role}</span>
        <span className="mt-3 block text-[14px] leading-relaxed text-ink-muted">{p.blurb}</span>
      </span>
    </Link>
  );
}

export default function LeadershipGrid() {
  const founders = PEOPLE.filter((p) => p.group === "Founders");
  const rest = PEOPLE.filter((p) => p.group !== "Founders");

  return (
    <section className="section-y bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Leadership"
          title="Led by people who have"
          highlight="done the work."
        />

        <Stagger className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6" stagger={0.1}>
          {founders.map((p) => (
            <StaggerItem key={p.name} className="flex">
              <FounderCard person={p} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* The rest of the bench as a hairline register — names and
            roles, which is all this page needs to establish. */}
        <Stagger
          className="mt-6 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2"
          stagger={0.06}
        >
          {rest.map((p) => (
            <StaggerItem
              key={p.name}
              className="flex items-baseline justify-between gap-4 bg-white px-6 py-4"
            >
              <span className="font-heading text-[15px] font-semibold tracking-tight text-ink">
                {p.name}
              </span>
              <span className="text-right text-[13px] text-ink-muted">{p.role}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.12} className="mt-8">
          <Link
            href="/about#leadership"
            className="group inline-flex items-center gap-2 text-[14px] font-semibold text-primary-600 transition-colors hover:text-primary-700"
          >
            Full profiles and advisory board
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
  );
}
