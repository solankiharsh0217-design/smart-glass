import type { Metadata } from "next";
import { Inter_Tight, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BRAND, SITE_URL, OFFICES, CONTACT } from "@/lib/site";

const heading = Inter_Tight({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TITLE = `${BRAND.name} — Switchable Privacy Glass & Transparent LED`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s — ${BRAND.name}` },
  description: BRAND.tagline,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: BRAND.legal,
    title: TITLE,
    description: BRAND.tagline,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: BRAND.tagline },
  robots: { index: true, follow: true },
};

/** LocalBusiness entries so both offices can surface in local search. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": OFFICES.map((o) => ({
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#${o.city.toLowerCase()}`,
    name: `${BRAND.legal} — ${o.city}`,
    url: SITE_URL,
    email: CONTACT.email,
    telephone: o.phone,
    description: BRAND.tagline,
    areaServed: o.region,
    address: {
      "@type": "PostalAddress",
      streetAddress: o.address.slice(0, -1).join(", "),
      addressLocality: o.city,
      addressCountry: o.region === "Ireland" ? "GB-NIR" : "GB",
    },
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${heading.variable} ${body.variable}`}>
      <body className="antialiased bg-[var(--bg)] text-[var(--ink-body)]">
        <script
          type="application/ld+json"
          // Built from our own static data — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
