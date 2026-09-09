import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** White-on-dark treatment, for use over the hero video or a deep panel. */
  onDark?: boolean;
  /** Renders an ↗ and target=_blank. */
  external?: boolean;
  className?: string;
  id?: string;
  /** Mainly for dismissing the mobile drawer on navigation. */
  onClick?: () => void;
}

/**
 * Button — the site's only CTA component.
 *
 * The arrow slides out of zero width on hover rather than being
 * always-present: it keeps the resting label tight and gives the
 * hover a single, quiet piece of feedback.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  onDark = false,
  external = false,
  className,
  id,
  onClick,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-0 rounded-pill px-6 py-3 text-sm font-semibold " +
    "transition-[background-color,border-color,color,box-shadow] duration-[--duration-base] " +
    "ease-[--ease-brand] active:scale-[0.98]";

  const styles: Record<Variant, string> = {
    primary: onDark
      ? "bg-white text-primary-600 hover:bg-secondary-50 shadow-card"
      : "bg-primary-500 text-white shadow-card hover:bg-primary-600 hover:shadow-lift",
    secondary: onDark
      ? "border border-white/35 text-white hover:border-white/70 hover:bg-white/10 backdrop-blur-sm"
      : "border border-line text-ink hover:border-primary-300 hover:bg-primary-50",
    ghost: onDark
      ? "text-white/90 hover:text-white px-0"
      : "text-primary-600 hover:text-primary-700 px-0",
  };

  const Icon = external ? ArrowUpRight : ArrowRight;

  const inner = (
    <span className="flex items-center">
      <span className="transition-[margin] duration-[--duration-base] ease-[--ease-brand] group-hover:mr-1.5">
        {children}
      </span>
      <span className="flex w-0 items-center overflow-hidden transition-[width] duration-[--duration-base] ease-[--ease-brand] group-hover:w-4">
        <Icon size={15} strokeWidth={2.5} aria-hidden />
      </span>
    </span>
  );

  const classes = cn(base, styles[variant], className);

  if (external) {
    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link id={id} href={href} className={classes} onClick={onClick}>
      {inner}
    </Link>
  );
}
