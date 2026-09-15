import Link from "next/link";
import { BRAND, PRODUCTS, OFFICES, CONTACT } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-[1440px] px-7 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
          <div>
            <p className="text-[2.2rem] leading-none font-semibold tracking-[-0.03em] text-white">
              {BRAND.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-4 max-w-[380px] text-[0.95rem] leading-relaxed text-white/60">
              {BRAND.tagline}
            </p>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex rounded-lg bg-accent px-6 py-3 text-[0.95rem] font-semibold text-accent-ink transition-all hover:-translate-y-0.5 hover:brightness-95"
            >
              Message us on WhatsApp
            </a>
          </div>

          <div>
            <p className="text-[0.8rem] font-semibold tracking-[0.12em] text-white/40 uppercase">
              Products
            </p>
            <ul className="mt-5 space-y-3">
              {PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="inline-flex min-h-11 items-center text-[0.95rem] text-white/70 transition-colors hover:text-accent md:min-h-0"
                  >
                    {p.nav}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center text-[0.95rem] text-white/70 transition-colors hover:text-accent md:min-h-0"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[0.8rem] font-semibold tracking-[0.12em] text-white/40 uppercase">
              Offices
            </p>
            <ul className="mt-5 space-y-6">
              {OFFICES.map((o) => (
                <li key={o.city}>
                  <p className="text-[0.95rem] font-semibold text-white">{o.city}</p>
                  <address className="mt-1.5 text-[0.9rem] leading-relaxed text-white/60 not-italic">
                    {o.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={o.phoneHref}
                    className="mt-1.5 inline-flex min-h-11 items-center text-[0.9rem] text-white/70 transition-colors hover:text-accent md:min-h-0"
                  >
                    {o.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.85rem] text-white/45">
            © {new Date().getFullYear()} {BRAND.legal}. All rights reserved.
          </p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex min-h-11 items-center text-[0.85rem] text-white/60 transition-colors hover:text-accent md:min-h-0"
          >
            {CONTACT.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
