import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Logo — the BroadArks lockup, composed horizontally.
 *
 * The supplied brand artwork is a single square, stacked lockup
 * (mark over "BroadArks" over "Innovation & Beyond" over "One
 * World"). At the 32–40px height a header allows, that stack
 * renders the two strap-lines as unreadable smudges. So the source
 * file is split into its two usable parts — `logo-mark.png` and
 * `logo-type.png` — and set side by side, which is how a square
 * lockup is meant to be adapted for a horizontal bar. The artwork
 * itself is untouched; only the arrangement changes.
 *
 * Over dark surfaces the whole lockup flattens to white
 * (`brightness-0 invert`) — the reversed treatment. Keeping the
 * mark in brand colour there would sink its navy half into the
 * dark background.
 */
export default function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="BroadArks Technology — home"
      className={cn("inline-flex shrink-0 items-center gap-2.5", className)}
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={375}
        height={320}
        priority
        className={cn(
          "h-8 w-auto transition-[filter] duration-[--duration-base] sm:h-9",
          onDark && "brightness-0 invert",
        )}
      />
      <Image
        src="/logo-type.png"
        alt="BroadArks — Innovation & Beyond"
        width={808}
        height={190}
        priority
        className={cn(
          "h-6 w-auto transition-[filter] duration-[--duration-base] sm:h-[26px]",
          onDark && "brightness-0 invert",
        )}
      />
    </Link>
  );
}
