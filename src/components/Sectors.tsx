import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { SECTORS } from "@/lib/site";

export function Sectors() {
  return (
    <section id="sectors" className="bg-dark py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-7">
        <SectionHead
          dark
          title={"Where it\ngoes in"}
          heading="The same technology solves a different problem in each setting."
          note="Residential · Commercial · Hospitality · Healthcare"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <article className="group h-full overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10 transition-colors hover:bg-white/[0.07]">
                <div className="aspect-[5/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-[1.15rem] font-semibold text-white">{s.title}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-white/60">{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
