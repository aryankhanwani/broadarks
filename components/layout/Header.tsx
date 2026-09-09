"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { DIVISIONS, NAV, ORG, divisionHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import Logo from "@/components/layout/Logo";
import { EASE } from "@/components/ui/motion";

/* ================================================================
   HEADER

   One element, one shape: a floating capsule — a contained,
   blurred, hairlined bar that sits *inside* the viewport rather
   than welded to its top edge. That inset is the whole trick — it
   reads as a control surface over the page instead of a browser
   chrome imitation.

   It no longer flips to a transparent white-on-dark state at the
   top of the homepage, because the homepage hero is no longer a
   dark film. Past ~60px the capsule just firms up: more opaque,
   with a shadow, so it separates from whatever scrolls under it.

   The nav itself has two pieces of state worth building properly:
   a hover pill that slides between items (one shared layoutId, so
   Framer tweens the box rather than cross-fading two of them), and
   a divisions mega-panel, because "Our Divisions" is the routing
   mechanism for the entire group and hiding all four behind a click
   wastes the most valuable link on the site.
   ================================================================ */

const MEGA_KEY = "/divisions";

export default function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [condensed, setCondensed] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const closeTimer = useRef<number | null>(null);

  /* Scroll progress rail. Spring-smoothed so it glides instead of
     stuttering on every wheel tick. */
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 60));

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  /* Mega-panel open/close. The close is delayed ~120ms so the pointer
     can cross the gap between the trigger and the panel without the
     panel vanishing underneath it. */
  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 120);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMega(false);
      setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress — a 2px hairline, not a loading bar. */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-secondary-500"
      />

      {/* The capsule, from the very first pixel on every page — it
          firms up on scroll rather than materialising on scroll. */}
      <div className="relative z-50 mx-auto mt-3 max-w-6xl px-4 transition-all duration-500 ease-[--ease-brand] sm:mt-4 sm:px-6">
        <div
          className={cn(
            "flex h-14 items-center justify-between gap-4 rounded-pill border px-3 pl-5 backdrop-blur-xl transition-all duration-500 ease-[--ease-brand] sm:h-16 sm:pl-6",
            condensed
              ? "border-line/80 bg-white/85 shadow-card"
              : "border-line/50 bg-white/60 shadow-none",
          )}
        >
          <Logo />

          {/* ---- Desktop nav ------------------------------------- */}
          <nav
            aria-label="Primary"
            className="hidden items-center lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isMega = item.href === MEGA_KEY;

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    setHovered(item.href);
                    if (isMega) openMega();
                    else closeMega();
                  }}
                  onMouseLeave={isMega ? closeMega : undefined}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={isMega ? mega : undefined}
                    className={cn(
                      "relative z-10 block rounded-pill px-4 py-2 text-[13.5px] font-medium transition-colors duration-200",
                      active ? "text-primary-600" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>

                  {/* Hover pill — one shared element, so it slides. */}
                  {hovered === item.href && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-pill bg-surface"
                      transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* ---- Desktop CTA ------------------------------------- */}
          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-pill bg-primary-500 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-300 ease-[--ease-brand] hover:bg-primary-600 lg:inline-flex"
          >
            Talk to us
            <ArrowUpRight
              size={15}
              strokeWidth={2.5}
              aria-hidden
              className="transition-transform duration-300 ease-[--ease-brand] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {/* ---- Mobile trigger ---------------------------------- */}
          <button
            type="button"
            onClick={() => setDrawer((v) => !v)}
            aria-expanded={drawer}
            aria-controls="mobile-nav"
            aria-label={drawer ? "Close menu" : "Open menu"}
            className="-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface lg:hidden"
          >
            {drawer ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ---- Divisions mega-panel ------------------------------ */}
        <AnimatePresence>
          {mega && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: reduce ? 0 : 0.26, ease: EASE }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              className="absolute inset-x-0 top-full hidden px-6 lg:block"
            >
              <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-card border border-line bg-white/95 p-2 shadow-lift backdrop-blur-xl">
                <div className="grid grid-cols-4 gap-2">
                  {DIVISIONS.map((d) => (
                    <Link
                      key={d.slug}
                      href={divisionHref(d)}
                      onClick={() => setMega(false)}
                      className="group relative overflow-hidden rounded-[10px] p-3 transition-colors duration-300 hover:bg-surface"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface">
                        <Image
                          src={d.image}
                          alt=""
                          fill
                          sizes="280px"
                          className="object-cover transition-transform duration-700 ease-[--ease-brand] group-hover:scale-105"
                        />
                        {d.status === "emerging" && (
                          <span className="absolute inset-0 grid place-items-center bg-white/70 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-600 backdrop-blur-sm">
                            In development
                          </span>
                        )}
                      </div>
                      <p className="mt-3 flex items-center gap-1 text-[14px] font-semibold text-ink">
                        {d.name}
                        <ArrowUpRight
                          size={13}
                          strokeWidth={2.5}
                          aria-hidden
                          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </p>
                      <p className="mt-1 text-[12.5px] leading-snug text-ink-muted">{d.tagline}</p>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/divisions"
                  onClick={() => setMega(false)}
                  className="mt-1 flex items-center justify-between rounded-[10px] px-4 py-3 text-[13px] transition-colors hover:bg-surface"
                >
                  <span className="text-ink-muted">
                    One parent company. Four divisions, each with its own team.
                  </span>
                  <span className="font-semibold text-primary-600">Compare all four →</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---- Mobile drawer -------------------------------------- */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            id="mobile-nav"
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="fixed inset-0 top-0 z-40 bg-white lg:hidden"
          >
            <div className="flex h-full flex-col px-5 pb-8 pt-24 sm:px-8">
              <nav aria-label="Mobile" className="flex flex-col">
                {NAV.map((item, i) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: reduce ? 0 : 0.06 + i * 0.05, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setDrawer(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-baseline justify-between border-b border-line py-5 font-heading text-[26px] font-semibold tracking-tight transition-colors",
                          active ? "text-primary-600" : "text-ink",
                        )}
                      >
                        {item.label}
                        <span className="text-[11px] font-medium tabular-nums text-gray-500">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : 0.36, ease: EASE }}
                className="mt-auto pt-10"
              >
                <Link
                  href="/contact"
                  onClick={() => setDrawer(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-pill bg-primary-500 px-6 py-4 text-[15px] font-semibold text-white"
                >
                  Talk to us
                  <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden />
                </Link>
                <div className="mt-6 space-y-1.5 text-center text-[13px] text-ink-muted">
                  <a href={`mailto:${ORG.email}`} className="block hover:text-primary-600">
                    {ORG.email}
                  </a>
                  <a href={ORG.phoneHref} className="block hover:text-primary-600">
                    {ORG.phone}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
