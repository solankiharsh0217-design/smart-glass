"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { BRAND, PRODUCTS, CONTACT, IMG } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const pathname = usePathname();

  // Only the home page has a dark full-bleed hero for the bar to sit over.
  const overHero = pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);

    const delta = latest - lastY.current;
    // Ignore sub-pixel jitter and rubber-banding past the top.
    if (Math.abs(delta) < 6 || latest < 0) return;
    lastY.current = latest;

    if (latest < 140) {
      setHidden(false);
      return;
    }
    setHidden(delta > 0);
  });

  // An open dropdown or mobile menu must never ride up offscreen with the bar.
  const offscreen = hidden && !open && !menu;
  const light = overHero && !scrolled && !open;

  const linkTone = light
    ? "text-white/90 hover:text-white"
    : "text-ink-body hover:text-ink";

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[100]"
      animate={{
        y: offscreen ? "-100%" : "0%",
        backgroundColor:
          !light && !open ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0)",
        boxShadow: !light && !open ? "0 1px 0 #e4e4e7" : "0 1px 0 rgba(0,0,0,0)",
        backdropFilter: !light && !open ? "blur(14px) saturate(1.4)" : "blur(0px)",
      }}
      transition={{
        y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        default: { duration: 0.25 },
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-7 py-4">
        <Link href="/" aria-label={BRAND.legal} className="shrink-0">
          {/* The wordmark ships white-on-transparent, so it needs flipping to
              black once the bar turns solid. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.logo}
            alt={BRAND.legal}
            className="h-9 w-auto object-contain object-left transition-[filter] duration-300 md:h-11"
            style={{ filter: light ? "none" : "brightness(0)" }}
          />
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-7 text-[0.95rem] font-medium md:flex">
            <Link href="/" className={`transition-colors ${linkTone}`}>
              Home
            </Link>

            {/* Products dropdown — hover on pointer devices, click-safe via focus-within */}
            <div
              className="relative"
              onMouseEnter={() => setMenu(true)}
              onMouseLeave={() => setMenu(false)}
            >
              <button
                onClick={() => setMenu((m) => !m)}
                aria-expanded={menu}
                className={`flex items-center gap-1.5 transition-colors ${linkTone}`}
              >
                Products
                <motion.span animate={{ rotate: menu ? 180 : 0 }} className="text-[0.7em]">
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {menu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 w-[320px] -translate-x-1/2 pt-4"
                  >
                    <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-2xl">
                      {PRODUCTS.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/products/${p.slug}`}
                          onClick={() => setMenu(false)}
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-peach"
                        >
                          <p className="font-semibold text-ink">{p.nav}</p>
                          <p className="mt-0.5 text-[0.85rem] text-ink-soft">{p.short}</p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/contact" className={`transition-colors ${linkTone}`}>
              Contact
            </Link>
          </nav>

          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden rounded-lg px-6 py-2.5 text-[0.95rem] font-semibold transition-all hover:-translate-y-px md:inline-flex ${
              light
                ? "bg-white text-ink hover:bg-accent hover:text-accent-ink"
                : "bg-accent text-accent-ink hover:brightness-95"
            }`}
          >
            Get a quote
          </a>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex w-7 flex-col gap-1.5 p-1 md:hidden"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className={`h-0.5 rounded ${light ? "bg-white" : "bg-ink"}`}
                animate={
                  open
                    ? i === 0
                      ? { rotate: 45, y: 7 }
                      : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
              />
            ))}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mb-4 flex flex-col gap-1 rounded-2xl border border-line bg-white p-4 shadow-2xl md:hidden"
          >
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-medium text-ink-body hover:bg-peach hover:text-ink"
            >
              Home
            </Link>
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-medium text-ink-body hover:bg-peach hover:text-ink"
              >
                {p.nav}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-medium text-ink-body hover:bg-peach hover:text-ink"
            >
              Contact
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-lg bg-accent px-3 py-3 text-center font-semibold text-accent-ink"
            >
              Get a quote
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
