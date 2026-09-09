import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { DIVISIONS, NAV, ORG, divisionHref } from "@/lib/site";
import Container from "@/components/ui/Container";

/* ================================================================
   FOOTER

   Three bands, in descending weight:

     1 · A contact block that behaves like a card, not a link list —
         the three things a visitor actually wants at the bottom of
         a parent-company site are an address, an inbox and a phone
         number, so they get real estate rather than 11px grey text.
     2 · The link columns, with divisions marked live vs in
         development so the footer never over-promises.
     3 · The legal strip, over an oversized wordmark that closes the
         page the way a letterhead closes a letter.

   Every link names its destination. The audit found the old site
   used "Know More" everywhere, which told nobody anything.
   ================================================================ */

const COMPANY_LINKS = [
  { label: "About BroadArks", href: "/about" },
  { label: "Leadership team", href: "/about#leadership" },
  { label: "Governance", href: "/about#governance" },
  { label: "Our approach", href: "/approach" },
  { label: "Careers", href: "/careers" },
];

const LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy-and-policies" },
  { label: "Terms & conditions", href: "/terms-conditions-and-legal" },
  { label: "Site map", href: "/sitemap" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center text-[14px] text-ink-muted transition-colors duration-200 hover:text-ink"
    >
      <span className="relative">
        {children}
        {/* Underline grows from the left on hover — cheaper to read
            than a colour change alone, and it survives at 14px. */}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary-500 transition-[width] duration-300 ease-[--ease-brand] group-hover:w-full"
        />
      </span>
    </Link>
  );
}

export default function Footer() {
  // Rendered server-side, so it is never stale. The old site shipped a
  // hard-coded "© 2020" on every page for six years.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="pt-14 sm:pt-20">
        {/* ---- Band 1: contact ---------------------------------- */}
        <div className="grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-3">
          <a
            href={`mailto:${ORG.email}`}
            className="group bg-white p-6 transition-colors duration-300 hover:bg-primary-50 sm:p-7"
          >
            <span className="flex items-center gap-2.5">
              <Mail size={16} className="text-secondary-500" aria-hidden />
              <span className="eyebrow text-gray-500">Email</span>
            </span>
            <span className="mt-3 flex items-center gap-1.5 font-heading text-[17px] font-semibold tracking-tight text-ink">
              {ORG.email}
              <ArrowUpRight
                size={15}
                strokeWidth={2.5}
                aria-hidden
                className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </span>
            <span className="mt-1 block text-[13px] text-ink-muted">
              We reply within two working days
            </span>
          </a>

          <a
            href={ORG.phoneHref}
            className="group bg-white p-6 transition-colors duration-300 hover:bg-primary-50 sm:p-7"
          >
            <span className="flex items-center gap-2.5">
              <Phone size={16} className="text-secondary-500" aria-hidden />
              <span className="eyebrow text-gray-500">Phone</span>
            </span>
            <span className="mt-3 flex items-center gap-1.5 font-heading text-[17px] font-semibold tracking-tight text-ink">
              {ORG.phone}
              <ArrowUpRight
                size={15}
                strokeWidth={2.5}
                aria-hidden
                className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </span>
            <span className="mt-1 block text-[13px] text-ink-muted">Mon–Fri, business hours IST</span>
          </a>

          <div className="bg-white p-6 sm:p-7">
            <span className="flex items-center gap-2.5">
              <MapPin size={16} className="text-secondary-500" aria-hidden />
              <span className="eyebrow text-gray-500">Registered office</span>
            </span>
            <address className="mt-3 text-[14px] not-italic leading-relaxed text-ink">
              {ORG.address.line1}
              <br />
              {ORG.address.line2}
              <br />
              {ORG.address.city} – {ORG.address.postalCode}, {ORG.address.state}
            </address>
          </div>
        </div>

        {/* ---- Band 2: links ------------------------------------ */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow text-gray-500">Divisions</h2>
            <ul className="mt-5 space-y-3.5">
              {DIVISIONS.map((d) => (
                <li key={d.slug} className="flex items-center gap-2.5">
                  <FooterLink href={divisionHref(d)}>{d.name}</FooterLink>
                  {d.status === "emerging" && (
                    <span className="rounded-pill border border-line px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                      Soon
                    </span>
                  )}
                </li>
              ))}
              <li>
                <FooterLink href="/divisions">Compare all four</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gray-500">Company</h2>
            <ul className="mt-5 space-y-3.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gray-500">Navigate</h2>
            <ul className="mt-5 space-y-3.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gray-500">Division websites</h2>
            <ul className="mt-5 space-y-3.5">
              {DIVISIONS.filter((d) => d.url).map((d) => (
                <li key={d.slug}>
                  <a
                    href={d.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[14px] text-ink-muted transition-colors hover:text-ink"
                  >
                    {d.domain}
                    <ArrowUpRight
                      size={13}
                      strokeWidth={2.5}
                      aria-hidden
                      className="opacity-40 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[24ch] text-[12.5px] leading-relaxed text-gray-500">
              BroadArks Foundation is a separate registered charity with its own registrations.
            </p>
          </div>
        </div>
      </Container>

      {/* ---- Band 3: wordmark + legal -------------------------- */}
      <div className="mt-16 border-t border-line">
        <Container className="py-8">
          <div className="flex flex-col gap-6 text-[12.5px] text-gray-500 lg:flex-row lg:items-center lg:justify-between">
            <p>
              © {year} {ORG.legalName} · {ORG.iso} certified · Bhopal, India
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* Oversized lockup. Clipped at the baseline so it reads as a
            watermark closing the page rather than a fifth logo.

            A CSS background, not <Image>: it is purely decorative, and
            as a real image node Next counts it as an LCP candidate on
            short pages — which is exactly backwards for something at
            the very bottom that nobody is waiting to see. */}
        <div
          aria-hidden
          className="h-[13vw] max-h-40 min-h-16 bg-[url('/logo-type.png')] bg-[length:auto_190%] bg-[position:center_top] bg-no-repeat opacity-[0.07]"
        />
      </div>
    </footer>
  );
}
