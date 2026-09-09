import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { AnimatedHeading, Reveal } from "@/components/ui/motion";
import Eyebrow from "@/components/ui/Eyebrow";
import { ORG } from "@/lib/site";

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/**
 * CtaBand — the closing block on every page.
 *
 * A tinted panel rather than a dark one: this sits directly above
 * the footer, and stacking two dark blocks at the bottom of every
 * page made the whole site feel bottom-heavy. One clear next step,
 * and every CTA names where it goes.
 */
export default function CtaBand({
  eyebrow = "Next step",
  title,
  highlight,
  body,
  primary = { label: "Contact BroadArks", href: "/contact" },
  secondary,
}: CtaBandProps) {
  return (
    <section className="bg-wash-sky relative isolate overflow-hidden border-y border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-secondary-200/40 blur-3xl"
      />
      <Container className="section-y relative">
        <div className="max-w-2xl">
          <Reveal y={10} duration={0.5}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text={title}
            highlight={highlight}
            className="t-h2 mt-4 text-balance text-ink"
          />
          <Reveal as="p" delay={0.12} y={14} className="t-body mt-4 max-w-xl text-[15px] sm:text-base">
            {body}
          </Reveal>
          <Reveal delay={0.2} y={14} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={primary.href}>{primary.label}</Button>
            {secondary && (
              <Button href={secondary.href} variant="secondary">
                {secondary.label}
              </Button>
            )}
          </Reveal>
          <Reveal delay={0.28} className="mt-8 text-sm text-ink-muted">
            <a href={`mailto:${ORG.email}`} className="transition-colors hover:text-primary-600">
              {ORG.email}
            </a>
            <span className="mx-3 text-gray-300">·</span>
            <a href={ORG.phoneHref} className="transition-colors hover:text-primary-600">
              {ORG.phone}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
