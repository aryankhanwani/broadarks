import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { PEOPLE, type Person } from "@/lib/site";

/* ================================================================
   LEADERSHIP — homepage strip.

   The two founders only, each as a photo card. The rest of the
   bench — senior team and advisers — used to run underneath as a
   hairline register; it now lives solely on /about#leadership,
   which is where someone goes once they have decided the founders'
   record is enough to keep reading.
   ================================================================ */

function hasImage(image?: string) {
  if (!image) return false;
  return fs.existsSync(path.join(process.cwd(), "public", image));
}

function FounderCard({ person: p }: { person: Person }) {
  const showImage = hasImage(p.image);

  return (
    <Link
      href="/about#leadership"
      className="group flex h-full items-start gap-5 border border-line bg-white p-6 transition-colors duration-[--duration-base] ease-[--ease-brand] hover:border-primary-200 sm:p-7"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-surface-2 sm:h-20 sm:w-20">
        {showImage ? (
          <Image
            src={p.image as string}
            alt={p.name}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-[900ms] ease-[--ease-brand] group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-brand">
            <span className="font-heading text-[19px] font-semibold text-white/90 sm:text-[22px]">
              {p.initials}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 pt-0.5">
        <span className="block font-heading text-[18px] font-semibold tracking-tight text-ink sm:text-[19px]">
          {p.name}
        </span>
        <span className="mt-1 block text-[13.5px] font-medium text-primary-600">{p.role}</span>
        <span className="mt-3 block text-[14px] leading-relaxed text-ink-muted">{p.blurb}</span>
      </div>
    </Link>
  );
}

export default function LeadershipGrid() {
  const founders = PEOPLE.filter((p) => p.group === "Founders");

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

        <div className="mt-8">
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
        </div>
      </Container>
    </section>
  );
}
