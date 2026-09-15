"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND, IMG, CONTACT } from "@/lib/site";

const STATS = [
  { value: "98%", label: "UV rays blocked" },
  { value: "25–30%", label: "Noise reduction" },
  { value: "2", label: "Offices · UK & Ireland" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const radius = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const inset = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -60]);

  return (
    <section ref={ref} id="top" className="relative h-[175vh] bg-bg">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: radius, top: inset, left: inset, right: inset, bottom: inset }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.heroPartition}
            alt="Switchable smart glass partition in a modern office"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 mx-auto flex max-w-[1440px] flex-col justify-end px-7 pt-28 pb-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[0.8rem] font-semibold tracking-[0.16em] text-accent uppercase"
          >
            {BRAND.legal}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[960px] text-[clamp(2.4rem,6.4vw,5rem)] leading-[1.02] font-semibold text-white"
          >
            Glass that turns private at the flick of a switch.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <p className="max-w-[420px] text-[1.02rem] leading-snug font-medium text-white/90">
              Switchable privacy film and transparent LED display, surveyed and
              installed by our own technicians across the UK and Ireland.
            </p>
            <span className="hidden h-12 w-px bg-white/40 sm:block" />
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-4 sm:py-3.5 text-[1rem] font-semibold text-accent-ink transition-all hover:-translate-y-0.5 hover:brightness-95 active:scale-[0.98]"
              >
                Book a free consultation
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/35 px-7 py-4 sm:py-3.5 text-[1rem] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid grid-cols-3 gap-4 border-t border-white/20 pt-6 md:mt-14 md:flex md:flex-wrap md:gap-16 md:pt-7"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <p className="text-[clamp(1.25rem,5.5vw,2.4rem)] leading-none font-semibold text-white">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[0.78rem] leading-snug text-white/70 md:max-w-[160px] md:text-[0.85rem]">
                    {s.label}
                  </p>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
