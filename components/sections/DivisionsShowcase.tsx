import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { DIVISIONS, ONE_LINE, divisionHref, type Division } from "@/lib/site";

/* ================================================================
   DIVISIONS SHOWCASE

   Four cards, all open, all the same shape.

   This replaced a set of hover-expanding panels that showed one
   division at a time and collapsed into an accordion on phones.
   Three separate mechanics for four items is more machinery than
   the content needs: the divisions are the reason most people are
   on this site, so all four are visible at once, with a photograph
   doing the describing and one line of type doing the rest.
   ================================================================ */

export default function DivisionsShowcase({
  eyebrow = "Our divisions",
  title = "Four organisations.",
  highlight = "One mission.",
  subtitle,
}: {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <section id="divisions" className="section-y bg-surface">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          subtitle={subtitle ?? ONE_LINE}
        />

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-6" stagger={0.08}>
          {DIVISIONS.map((d) => (
            <StaggerItem key={d.slug} className="flex">
              <DivisionCard division={d} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function DivisionCard({ division: d }: { division: Division }) {
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-card border border-line bg-white transition-[border-color,box-shadow,transform] duration-[--duration-base] ease-[--ease-brand] hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <Image
          src={d.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
          className="object-cover transition-transform duration-[900ms] ease-[--ease-brand] group-hover:scale-[1.04]"
        />
        {/* Index and status ride on the image so the body below stays
            type-only — one card, two clean zones. */}
        <span className="absolute left-4 top-4 rounded-pill bg-white/90 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-primary-600 backdrop-blur-sm">
          {d.index}
        </span>
        {d.status === "emerging" && (
          <span className="absolute right-4 top-4 rounded-pill bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 backdrop-blur-sm">
            In development
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="eyebrow text-secondary-700">{d.mandate}</p>
        <h3 className="t-h3 mt-2.5 text-ink">{d.name}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{d.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
          {/* The whole card is a link to the division record; the
              external site gets its own explicit link so the two
              destinations are never confused. */}
          <Link
            href={divisionHref(d)}
            className="group/link inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary-600 after:absolute after:inset-0 after:content-['']"
          >
            What it does
            <span className="sr-only"> — {d.name}</span>
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              aria-hidden
              className="transition-transform duration-300 ease-[--ease-brand] group-hover/link:translate-x-1"
            />
          </Link>

          {d.url && (
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {d.domain}
              <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
