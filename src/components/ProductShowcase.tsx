"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHead } from "./SectionHead";
import { PRODUCTS, type Product } from "@/lib/site";

/** One band per product, darkening as you scroll through the stack. */
const BANDS = [
  { bg: "#8ec73e", ink: "#1d3a07", soft: "rgba(29,58,7,0.70)", rule: "rgba(29,58,7,0.20)", btn: "#1d3a07", btnInk: "#ffffff" },
  { bg: "#294c0c", ink: "#ffffff", soft: "rgba(255,255,255,0.72)", rule: "rgba(255,255,255,0.22)", btn: "#8ec73e", btnInk: "#1d3a07" },
  { bg: "#18181b", ink: "#ffffff", soft: "rgba(255,255,255,0.68)", rule: "rgba(255,255,255,0.18)", btn: "#8ec73e", btnInk: "#1d3a07" },
];

/** Three headline specs per product, pulled straight from its spec table. */
const HIGHLIGHTS: Record<string, number[]> = {
  "pdlc-smart-film": [2, 3, 1],
  "crystal-clear-display": [1, 2, 0],
  "t-grille": [1, 2, 3],
};

function Card({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const band = BANDS[index % BANDS.length];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image drifts against the scroll; the card itself eases back as the next
  // one rides over the top of it.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0.5, 1], [0, 0.18]);

  const picks = (HIGHLIGHTS[product.slug] ?? [0, 1, 2])
    .map((i) => product.specs[i])
    .filter(Boolean);

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `calc(5rem + ${index * 2.5}rem)` }}
    >
      <motion.article
        style={{ backgroundColor: band.bg, scale }}
        className="relative overflow-hidden rounded-3xl shadow-2xl"
      >
        {/* Extra bottom padding on mobile: the next card overlaps this one, and
            the slack keeps it off the CTA. */}
        <div className="grid gap-8 p-8 pb-24 md:grid-cols-2 md:items-center md:gap-12 md:p-12 md:pb-12 lg:p-16">
          <div>
            <p
              className="text-[0.75rem] font-semibold tracking-[0.16em] uppercase"
              style={{ color: band.soft }}
            >
              {String(index + 1).padStart(2, "0")} · {product.short}
            </p>

            <h3
              className="mt-5 text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] font-semibold"
              style={{ color: band.ink }}
            >
              {product.name}
            </h3>

            <p
              className="mt-5 max-w-[440px] text-[1rem] leading-relaxed"
              style={{ color: band.soft }}
            >
              {product.summary}
            </p>

            <dl className="mt-8 space-y-0">
              {picks.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-wrap items-baseline justify-between gap-3 border-t py-3"
                  style={{ borderColor: band.rule }}
                >
                  <dt className="text-[0.85rem]" style={{ color: band.soft }}>
                    {s.label}
                  </dt>
                  <dd
                    className="text-[0.95rem] font-semibold"
                    style={{ color: band.ink }}
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href={`/products/${product.slug}`}
              className="mt-9 inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[0.95rem] font-semibold transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: band.btn, color: band.btnInk }}
            >
              View specifications
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Stacked single-column, the photo leads — below the CTA it would be
              clipped by the next card riding over this one. */}
          <div className="relative order-first overflow-hidden rounded-2xl md:order-none">
            {/* Taller than the frame so the parallax drift never exposes an edge. */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:aspect-[4/3]">
              <motion.img
                src={product.image}
                alt={product.name}
                style={{ y: imageY }}
                className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Darkens as the following card slides over this one. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: dim }}
        />
      </motion.article>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section id="products" className="mx-auto max-w-[1440px] px-7 py-20 md:py-28">
      <SectionHead
        title={"Our\nsolutions"}
        heading="Three systems, one common idea — glass that does more than separate two spaces."
        note="Supplied, installed and commissioned in-house."
      />

      {/* Trailing space lets the final card sit still before the next section. */}
      <div className="mt-14 space-y-8 pb-[18vh]">
        {PRODUCTS.map((p, i) => (
          <Card key={p.slug} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
