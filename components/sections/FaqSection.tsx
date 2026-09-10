import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Faq, { type FaqItem } from "@/components/ui/Faq";
import Button from "@/components/ui/Button";
import { AnimatedHeading, Reveal } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { ORG } from "@/lib/site";

/**
 * FaqSection — heading left, accordion right.
 *
 * The accordion needs a narrow measure (long answers set across a
 * 1280px column are unreadable), but a narrow block alone in a wide
 * container left half the page empty. Splitting the heading off into
 * a sticky left rail uses that space and keeps the question you are
 * reading anchored to the section title.
 */
export default function FaqSection({
  eyebrow = "FAQs",
  title = "Common",
  highlight = "questions.",
  items,
  className,
}: {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  items: FaqItem[];
  className?: string;
}) {
  return (
    <section className={cn("section-y", className ?? "bg-surface")}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal y={10} duration={0.5}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>
              <AnimatedHeading
                as="h2"
                text={title}
                highlight={highlight}
                className="t-h2 mt-4 text-balance text-ink"
              />
              <Reveal as="p" delay={0.14} className="t-body mt-4 max-w-xs text-[15px]">
                Anything not answered here — just ask. We reply within two working days.
              </Reveal>
              <Reveal delay={0.2} className="mt-7">
                <Button href={`mailto:${ORG.email}`} variant="secondary">
                  Ask a question
                </Button>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Faq items={items} />
          </div>
        </div>
      </Container>
    </section>
  );
}
