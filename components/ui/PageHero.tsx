import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { AnimatedHeading, Reveal } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * PageHero — the masthead for every interior page.
 *
 * Light, not dark. A tinted wash separates it from the white body
 * below without reversing the text, which keeps contrast high and
 * stops each page opening on a heavy navy slab. Depth comes from
 * one soft accent bloom and a hairline at the bottom edge.
 *
 * Deliberately not full-screen — only the homepage earns 100vh.
 * Interior pages are read, so the H1 sits near the top and real
 * content starts inside the first viewport.
 */
export default function PageHero({
  eyebrow,
  title,
  highlight,
  lead,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "bg-wash relative isolate overflow-hidden border-b border-line pb-14 pt-28 sm:pb-20 sm:pt-36",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-48 h-[560px] w-[560px] rounded-full bg-secondary-200/35 blur-3xl"
      />
      <Container className="relative">
        <Reveal y={10} duration={0.5}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <AnimatedHeading
          as="h1"
          text={title}
          highlight={highlight}
          className="t-h1 mt-5 max-w-3xl text-balance text-ink"
        />
        {lead && (
          <Reveal
            as="p"
            delay={0.14}
            y={14}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-muted sm:text-lg"
          >
            {lead}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
