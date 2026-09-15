import { Reveal } from "./Reveal";
import { IMG } from "@/lib/site";

const POINTS = [
  {
    n: "01",
    title: "Surveyed before it is quoted",
    body: "We measure the opening, check the frame and confirm the power route on site, so the quote you get is the price you pay.",
  },
  {
    n: "02",
    title: "Installed by our own technicians",
    body: "No subcontracted fitters. The team that surveys the job is the team that commissions it.",
  },
  {
    n: "03",
    title: "Retrofit wherever possible",
    body: "Existing glazing can usually take adhesive film, which avoids replacing units and keeps the work to a single visit.",
  },
  {
    n: "04",
    title: "Supported after handover",
    body: "Switching gear, transformers and controls are all serviceable, and we hold spares for the systems we fit.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="mx-auto max-w-[1440px] px-7 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl bg-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG.filmInstall}
                alt="Technician installing smart glass film"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-[0.8rem] font-semibold tracking-[0.16em] text-accent-ink uppercase">
              Why work with us
            </p>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05] font-semibold">
              A small team that does the whole job.
            </h2>
            <p className="mt-6 max-w-[520px] text-[1.02rem] leading-relaxed text-ink-soft">
              Smart glass fails when the survey is rushed or the power route is an
              afterthought. We keep survey, supply and installation under one roof so
              nothing falls between trades.
            </p>
          </Reveal>

          <div className="mt-12 space-y-10">
            {POINTS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="flex gap-6 border-t border-line-dark pt-7">
                  <span className="text-[0.85rem] font-semibold text-accent-ink tabular-nums">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="text-[1.15rem] font-semibold">{p.title}</h3>
                    <p className="mt-2.5 max-w-[460px] text-[0.95rem] leading-relaxed text-ink-soft">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
