import Link from "next/link";
import { PRODUCTS } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col justify-center px-7 py-32">
      <p className="text-[0.8rem] font-semibold tracking-[0.16em] text-accent-ink uppercase">
        404
      </p>
      <h1 className="mt-5 max-w-[760px] text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.04] font-semibold">
        That page has been moved or never existed.
      </h1>
      <p className="mt-6 max-w-[520px] text-[1.02rem] leading-relaxed text-ink-soft">
        Try one of these instead, or get in touch and we will point you at the
        right specification.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex rounded-lg bg-accent px-7 py-3.5 text-[0.98rem] font-semibold text-accent-ink transition-all hover:-translate-y-0.5 hover:brightness-95"
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className="inline-flex rounded-lg border border-line-dark px-7 py-3.5 text-[0.98rem] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-card"
        >
          Contact us
        </Link>
      </div>

      <ul className="mt-14 grid gap-3 border-t border-line-dark pt-8 sm:grid-cols-3">
        {PRODUCTS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/products/${p.slug}`}
              className="group block rounded-xl border border-line bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="font-semibold text-ink">{p.nav}</p>
              <p className="mt-1.5 text-[0.88rem] text-ink-soft">{p.short}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
