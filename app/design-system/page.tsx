import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Faq from "@/components/ui/Faq";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { DIVISIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "The BroadArks design system — colour, typography, spacing, elevation, motion and the component library used across broadarks.com.",
  robots: { index: false, follow: false },
};

/* ================================================================
   /design-system — the living reference for this site.
   Not linked from the public navigation and set to noindex; it
   exists so anyone extending the site can see every token and
   component rendered from the same source the pages use.
   ================================================================ */

const PRIMARY = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
const SECONDARY = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
const BRAND_GRAY = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

function Swatch({ token, hex, dark }: { token: string; hex?: string; dark?: boolean }) {
  return (
    <div>
      <div
        className={`h-16 rounded-lg border ${dark ? "border-white/10" : "border-line"} ${token}`}
      />
      <p className="mt-2 font-mono text-[11px] text-ink">{token.replace("bg-", "")}</p>
      {hex && <p className="font-mono text-[11px] uppercase text-gray-500">{hex}</p>}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-line py-6 sm:grid-cols-12 sm:gap-6">
      <p className="font-mono text-[12px] text-gray-500 sm:col-span-3">{label}</p>
      <div className="sm:col-span-9">{children}</div>
    </div>
  );
}

function Block({
  eyebrow,
  title,
  note,
  children,
}: {
  eyebrow: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section-y-sm border-b border-line">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="t-h2 mt-4 text-ink">{title}</h2>
        {note && <p className="t-body mt-3 max-w-2xl text-[15px]">{note}</p>}
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <PageHero
        eyebrow="Reference"
        title="The BroadArks"
        highlight="design system."
        lead="Every token and component on broadarks.com, rendered from the same source the live pages use. Change a value in app/globals.css and it changes here too."
      />

      {/* TYPOGRAPHY ---------------------------------------------------- */}
      <Block
        eyebrow="01 · Typography"
        title="Bricolage Grotesque + Inter"
        note="Headings are set in Bricolage Grotesque — a variable display grotesque with a distinctive personality at large sizes that holds attention without tipping into a novelty face. Body copy is Inter, which reads better than anything else at 15–16px on a phone. This replaces the Brand Book's Montserrat for running text; Montserrat remains the logo typeface and the lockup is unchanged."
      >
        <div className="divide-y divide-line border-b border-line">
          <Row label=".t-display">
            <p className="t-display text-ink">Workforce capability</p>
            <p className="mt-2 font-mono text-[11px] text-gray-500">
              clamp(2.4rem → 4.5rem) · 600 · -0.03em
            </p>
          </Row>
          <Row label=".t-h1">
            <p className="t-h1 text-ink">Four organisations. One mission.</p>
            <p className="mt-2 font-mono text-[11px] text-gray-500">
              clamp(2rem → 3.25rem) · 600 · -0.025em
            </p>
          </Row>
          <Row label=".t-h2">
            <p className="t-h2 text-ink">Why BroadArks exists</p>
            <p className="mt-2 font-mono text-[11px] text-gray-500">
              clamp(1.625rem → 2.5rem) · 600 · -0.02em
            </p>
          </Row>
          <Row label=".t-h3">
            <p className="t-h3 text-ink">The BroadArks approach</p>
          </Row>
          <Row label=".t-h4">
            <p className="t-h4 text-ink">Outcome-first design</p>
          </Row>
          <Row label=".t-lead">
            <p className="t-lead max-w-2xl">
              BroadArks Technology Pvt. Ltd. is an ISO 9001:2015 certified organisation
              headquartered in Bhopal, Madhya Pradesh.
            </p>
          </Row>
          <Row label=".t-body">
            <p className="t-body max-w-2xl">
              India adds millions of people to its workforce every year. A significant proportion
              enter without the technical or professional skills that employers need.
            </p>
          </Row>
          <Row label=".eyebrow">
            <p className="eyebrow text-secondary-700">Our divisions</p>
          </Row>
        </div>
        <p className="t-body mt-6 max-w-2xl text-[14px]">
          Every heading step is fluid — each clamps between a mobile and a desktop size, so a
          display headline shrinks instead of wrapping onto five lines at 375px.
        </p>
      </Block>

      {/* COLOUR -------------------------------------------------------- */}
      <Block
        eyebrow="02 · Colour"
        title="Brand palette, unchanged"
        note="The three Brand Book colours are exact at the 500 step. Primary carries authority — headings, buttons, active states. Secondary is an accent only: eyebrows, rules, hover states, highlights. Never set body copy in Secondary; it fails contrast at 16px. The site is light throughout: the only dark surface is the linkage panel on /divisions."
      >
        <div className="space-y-8">
          <div>
            <p className="eyebrow mb-3 text-gray-500">Primary — #2E3191</p>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
              {PRIMARY.map((s) => (
                <Swatch
                  key={s}
                  token={`bg-primary-${s}`}
                  hex={s === "500" ? "#2E3191" : undefined}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-3 text-gray-500">Secondary — #27AAE1</p>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
              {SECONDARY.map((s) => (
                <Swatch
                  key={s}
                  token={`bg-secondary-${s}`}
                  hex={s === "500" ? "#27AAE1" : undefined}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-3 text-gray-500">Brand gray — #606161</p>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-10">
              {BRAND_GRAY.map((s) => (
                <Swatch key={s} token={`bg-gray-${s}`} hex={s === "500" ? "#606161" : undefined} />
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-3 text-gray-500">Semantic neutrals</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <Swatch token="bg-ink" hex="#14151C" />
              <Swatch token="bg-ink-muted" hex="#4B4D5A" />
              <Swatch token="bg-surface" hex="#F5F7FA" />
              <Swatch token="bg-surface-2" hex="#EEF1F7" />
              <Swatch token="bg-line" hex="#E4E7EE" />
            </div>
          </div>
          <div>
            <p className="eyebrow mb-3 text-gray-500">Gradients</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {["bg-wash", "bg-wash-sky", "bg-gradient-brand"].map((g) => (
                <div key={g}>
                  <div className={`h-20 rounded-lg border border-line ${g}`} />
                  <p className="mt-2 font-mono text-[11px] text-ink">{g}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Block>

      {/* COMPONENTS ---------------------------------------------------- */}
      <Block
        eyebrow="03 · Components"
        title="Buttons"
        note="One CTA component, three variants. The arrow slides out of zero width on hover so the resting label stays tight. Never label a button 'Know More' — every CTA names its destination. The onDark pair below is for the one dark panel on /divisions."
      >
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button href="#">Primary</Button>
            <Button href="#" variant="secondary">
              Secondary
            </Button>
            <Button href="#" variant="ghost">
              Ghost
            </Button>
            <Button href="https://yandnow.com" external>
              External
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 rounded-card bg-gradient-brand p-8">
            <Button href="#" onDark>
              Primary on dark
            </Button>
            <Button href="#" variant="secondary" onDark>
              Secondary on dark
            </Button>
          </div>
        </div>
      </Block>

      <Block
        eyebrow="03 · Components"
        title="Division navigation"
        note="The four divisions are shown by the DivisionsShowcase section — expanding panels on desktop, an accordion below lg. These anchor pills jump to each division's record on /divisions."
      >
        <div className="flex flex-wrap gap-2.5">
          {DIVISIONS.map((d, i) => (
            <a
              key={d.slug}
              href={`/divisions#${d.slug}`}
              className={
                i === 0
                  ? "rounded-pill border border-primary-500 bg-primary-500 px-4 py-2 text-sm font-medium text-white"
                  : "rounded-pill border border-line px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-primary-200 hover:text-ink"
              }
            >
              {d.name}
            </a>
          ))}
        </div>
      </Block>

      <Block
        eyebrow="03 · Components"
        title="Accordion"
        note="Used for every FAQ block. Answers are capped at 2–3 sentences because answer engines quote them verbatim and truncate anything longer."
      >
        <Faq
          items={[
            { q: "What is BroadArks Technology?", a: "An ISO 9001:2015 certified organisation headquartered in Bhopal, operating four specialist divisions." },
            { q: "Is BroadArks the same as BroadArks Foundation?", a: "No. The Foundation is a separately registered charitable entity with its own registrations and contact details." },
          ]}
        />
      </Block>

      {/* MOTION -------------------------------------------------------- */}
      <Block
        eyebrow="05 · Motion"
        title="Punctuation, not choreography"
        note="One easing curve site-wide: cubic-bezier(0.16, 1, 0.3, 1). Entrances fire once, never on scroll-back — re-animating makes a page feel unstable on a phone. Every primitive collapses to a static render under prefers-reduced-motion."
      >
        <div className="divide-y divide-line border-y border-line">
          <Row label="<Reveal>">
            <Reveal className="rounded-lg bg-surface px-5 py-4 text-[15px] text-ink">
              Fade + rise, 20px, 0.65s. The default for any single block.
            </Reveal>
          </Row>
          <Row label="<Stagger>">
            <Stagger className="grid gap-3 sm:grid-cols-3">
              {["First", "Second", "Third"].map((t) => (
                <StaggerItem key={t} className="rounded-lg bg-surface px-5 py-4 text-[15px] text-ink">
                  {t}
                </StaggerItem>
              ))}
            </Stagger>
          </Row>
          <Row label="<AnimatedHeading>">
            <p className="t-body text-[15px]">
              Reveals a heading word by word behind a clipping mask. Words, not letters — a
              letter-by-letter reveal shreds the word shape the eye reads by.
            </p>
          </Row>
          <Row label="<CountUp>">
            <p className="t-h2 text-ink">
              <CountUp to={3800} />+
            </p>
            <p className="t-body mt-1 text-[14px]">
              easeOutExpo over 1.4s, once, in view. Used only in the proof band.
            </p>
          </Row>
        </div>
      </Block>

      {/* SPACING & ELEVATION ------------------------------------------- */}
      <Block eyebrow="06 · Spacing, radius, elevation" title="Structure tokens">
        <div className="divide-y divide-line border-y border-line">
          <Row label=".section-y">
            <p className="t-body text-[15px]">
              clamp(3.5rem → 7rem) block padding. The standard vertical rhythm for a full-width
              section. <code className="font-mono text-[12px]">.section-y-sm</code> is the compact
              variant.
            </p>
          </Row>
          <Row label="radius">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <div className="h-16 w-24 rounded-card bg-primary-100" />
                <p className="mt-2 font-mono text-[11px] text-gray-500">rounded-card · 14px</p>
              </div>
              <div>
                <div className="h-16 w-24 rounded-pill bg-primary-100" />
                <p className="mt-2 font-mono text-[11px] text-gray-500">rounded-pill · 999px</p>
              </div>
            </div>
          </Row>
          <Row label="elevation">
            <div className="flex flex-wrap gap-6 p-2">
              {[
                ["shadow-card", "Resting card"],
                ["shadow-lift", "Hover / raised"],
                ["shadow-glow", "Accent halo"],
              ].map(([cls, label]) => (
                <div key={cls}>
                  <div className={`h-16 w-32 rounded-card bg-white ${cls}`} />
                  <p className="mt-3 font-mono text-[11px] text-ink">{cls}</p>
                  <p className="font-mono text-[11px] text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </Row>
          <Row label="container">
            <p className="t-body text-[15px]">
              <code className="font-mono text-[12px]">default</code> max-w-7xl ·{" "}
              <code className="font-mono text-[12px]">narrow</code> max-w-3xl for prose ·{" "}
              <code className="font-mono text-[12px]">wide</code> 1600px. Gutters step 20 → 24 →
              32px.
            </p>
          </Row>
        </div>
      </Block>

      {/* SECTIONS ------------------------------------------------------ */}
      <Block
        eyebrow="04 · Sections"
        title="What each block is for"
        note="Section components live in components/sections. Each is used on at least two pages or does something a generic card grid cannot."
      >
        <div className="divide-y divide-line border-y border-line">
          {[
            ["Hero", "Full-bleed video carousel, fixed two-line H1, pause control. Homepage only — the one dark surface on the site."],
            ["ProofBand", "Four figures stated plainly. No marquee."],
            ["WhyWeExist", "A single photo plate drifting against the reader's own scroll. ~40px of travel, no more."],
            ["DivisionsShowcase", "A four-up hairline grid, square corners, no gaps. The routing mechanism for the whole group."],
            ["Principles", "A hover-driven list on the left, one vertical photo on the right that swaps with the active row."],
            ["LeadershipGrid", "The two founders only, as photo cards. Full bench lives on /about."],
            ["FaqSection", "Sticky heading left, accordion right. Emits FAQPage JSON-LD from the page that uses it."],
            ["CtaBand", "The closing block on every page. One named next step."],
          ].map(([name, what]) => (
            <div key={name} className="grid gap-1.5 py-5 sm:grid-cols-12 sm:gap-6">
              <p className="font-mono text-[12px] text-ink sm:col-span-3">{name}</p>
              <p className="text-[14px] leading-relaxed text-ink-muted sm:col-span-9">{what}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* RULES --------------------------------------------------------- */}
      <section className="section-y bg-surface">
        <Container>
          <Eyebrow>07 · House rules</Eyebrow>
          <h2 className="t-h2 mt-4 text-ink">Non-negotiables</h2>
          <ul className="mt-8 max-w-3xl space-y-4">
            {[
              "One H1 per page, carrying commercial search intent. The homepage H1 is two lines and does not rotate with the hero carousel.",
              "Every CTA names its destination. 'Know More' and 'Click Here' are banned as anchor text.",
              "Foundation registrations (12A, 80G, CSR-1) and info@broadarksfoundation.org never appear on this site.",
              "Commercial programme copy belongs on yandnow.com. This site explains and routes.",
              "Where a credential is not yet released, say so explicitly. Never ship a visible [INSERT] placeholder.",
              "Every image carries descriptive alt text, or empty alt when it is purely decorative.",
              "Plain words over industry vocabulary. 'Skills training', not 'workforce capability solutions'.",
              "Two to three sentences per block, then a link. Long-form argument belongs on /approach, not on a card.",
              "Light surfaces only. No dark section behind body copy — depth comes from tint, hairlines and photography.",
              "Sections alternate white and surface. Never two tinted bands in a row.",
              "Interaction reveals structure, not content. If a block has four short items, show all four — a control that surfaces them one at a time costs the reader more than it saves.",
            ].map((rule) => (
              <li key={rule} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" aria-hidden />
                {rule}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
