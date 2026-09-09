import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/motion";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

/**
 * LegalPage — shared shell for the policy pages.
 * Narrow measure, generous leading, no decoration: these pages are
 * read under duress and the only job is legibility.
 */
export default function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />

      <section className="section-y bg-white">
        <Container className="max-w-3xl">
          <p className="text-[13px] uppercase tracking-[0.08em] text-gray-500">
            Last updated {updated}
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delay={Math.min(i * 0.04, 0.2)}>
                <h2 className="t-h3 text-ink">{s.heading}</h2>
                <div className="t-body mt-4 space-y-3 text-[15px] sm:text-base">{s.body}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
