import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { CTABand } from "@/components/CTABand";
import { PRODUCTS, productBySlug } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const others = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <>
      {/* Header — sits below the fixed nav, so it carries its own top padding */}
      <section className="mx-auto max-w-[1440px] px-7 pt-32 pb-16 md:pt-40">
        <Reveal>
          <nav aria-label="Breadcrumb" className="text-[0.85rem] text-ink-soft">
            <Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-ink md:min-h-0">
              Home
            </Link>
            <span className="mx-2 text-muted">/</span>
            <span className="text-ink">{product.nav}</span>
          </nav>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <Reveal>
            <p className="text-[0.8rem] font-semibold tracking-[0.16em] text-accent-ink uppercase">
              {product.short}
            </p>
            <h1 className="mt-5 text-[clamp(2.2rem,5.2vw,4.2rem)] leading-[1.03] font-semibold">
              {product.hero}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[1.02rem] leading-relaxed text-ink-soft">{product.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-lg bg-accent px-7 py-3.5 text-[0.98rem] font-semibold text-accent-ink transition-all hover:-translate-y-0.5 hover:brightness-95"
              >
                Request a quote
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="mt-14 overflow-hidden rounded-3xl bg-bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1440px] px-7 pb-20 md:pb-28">
        <Reveal>
          <h2 className="border-t border-line-dark pt-10 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight font-semibold">
            What it does
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {product.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div>
                <span className="inline-block h-1 w-10 rounded bg-accent" />
                <h3 className="mt-5 text-[1.15rem] font-semibold">{f.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Specs + applications */}
      <section className="bg-dark py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-7 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight font-semibold text-white">
                Specifications
              </h2>
            </Reveal>
            <dl className="mt-10">
              {product.specs.map((s, i) => (
                <Reveal key={s.label} delay={Math.min(i, 6) * 0.05}>
                  <div className="flex flex-col gap-1 border-t border-white/12 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <dt className="text-[0.92rem] text-white/50">{s.label}</dt>
                    <dd className="text-[0.98rem] font-medium text-white sm:text-right">
                      {s.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <div>
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight font-semibold text-white">
                Typical uses
              </h2>
            </Reveal>
            <ul className="mt-10 space-y-3.5">
              {product.applications.map((a, i) => (
                <Reveal key={a} delay={Math.min(i, 6) * 0.05}>
                  <li className="flex gap-3.5 text-[0.98rem] leading-snug text-white/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {a}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1440px] px-7 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight font-semibold">
              Common questions
            </h2>
          </Reveal>

          <div>
            {product.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.07}>
                <details className="group border-t border-line-dark py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.08rem] font-semibold text-ink marker:hidden">
                    {f.q}
                    <span className="mt-1 shrink-0 text-accent-ink transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[640px] text-[0.98rem] leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="mx-auto max-w-[1440px] px-7 pb-20 md:pb-28">
        <Reveal>
          <h2 className="border-t border-line-dark pt-10 text-[1.4rem] font-semibold">
            Also available
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/products/${p.slug}`}
                className="group flex items-center gap-5 overflow-hidden rounded-2xl border border-line bg-card p-4 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-bg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-[1.08rem] leading-tight font-semibold">{p.name}</h3>
                  <p className="mt-1.5 text-[0.9rem] text-ink-soft">{p.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand title={`Specifying ${product.nav}?`} />
    </>
  );
}
