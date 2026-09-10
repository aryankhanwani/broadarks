import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* ------------------------------------------------------------------
   TYPEFACES

   Headings — Bricolage Grotesque. A variable display grotesque with
   a distinctive, slightly condensed personality at large sizes —
   it holds attention the way a purely neutral grotesque (Instrument
   Sans, Inter) doesn't, without tipping into a novelty face. Free,
   self-hosted via next/font/google, variable weight 200–800. Chosen
   over the Brand Book's Montserrat ExtraBold, which is a *logo*
   face: beautiful in the lockup, but its wide, circular bowls cost
   line-length and readability across the long institutional copy
   this site carries. The logo lockup itself is unchanged.

   Body — Inter. Designed for UI reading at small sizes; the highest
   readability-per-pixel of any open grotesque, and it sets tabular
   numerals cleanly for the proof figures.
   ------------------------------------------------------------------ */
const headingFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-heading-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://broadarks.com"),
  title: {
    default: "BroadArks — Workforce Skilling, EdTech & Social Impact | India",
    template: "%s | BroadArks",
  },
  description:
    "BroadArks Technology builds workforce capability, community impact, and sustainable livelihoods across India — through Y&Now, BroadArks Foundation, and specialist divisions. ISO 9001:2015 certified. Bhopal, MP.",
  openGraph: {
    siteName: "BroadArks Technology Pvt. Ltd.",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white font-body text-ink">
        {/* First tab stop. The header carries six nav links and a CTA
            before the content starts; without this a keyboard or screen
            reader user tabs through all of them on every page. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary-500 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
