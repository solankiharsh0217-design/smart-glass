import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { OFFICES, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a specification and a price for switchable privacy glass or transparent LED display. Offices in London and Belfast.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-7 pt-32 pb-20 md:pt-40 md:pb-28">
        <Reveal>
          <p className="text-[0.8rem] font-semibold tracking-[0.16em] text-accent-ink uppercase">
            Get in touch
          </p>
          <h1 className="mt-5 max-w-[900px] text-[clamp(2.2rem,5.2vw,4.2rem)] leading-[1.03] font-semibold">
            Tell us about the opening.
          </h1>
          <p className="mt-6 max-w-[560px] text-[1.02rem] leading-relaxed text-ink-soft">
            Send dimensions, a photo, or just a rough description. We will come back
            with a specification and a price, and arrange a survey if the job needs one.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-10">
              <div className="rounded-2xl bg-dark p-8">
                <p className="text-[0.8rem] font-semibold tracking-[0.12em] text-white/40 uppercase">
                  Fastest route
                </p>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-lg bg-accent px-7 py-3.5 text-[0.98rem] font-semibold text-accent-ink transition-all hover:-translate-y-0.5 hover:brightness-95"
                >
                  WhatsApp {CONTACT.whatsappLabel}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-5 inline-flex min-h-11 items-center text-[0.95rem] text-white/70 transition-colors hover:text-accent md:min-h-0"
                >
                  {CONTACT.email}
                </a>
              </div>

              {OFFICES.map((o) => (
                <div key={o.city} className="border-t border-line-dark pt-7">
                  <p className="text-[0.8rem] font-semibold tracking-[0.12em] text-accent-ink uppercase">
                    {o.region}
                  </p>
                  <h2 className="mt-3 text-[1.3rem] font-semibold">{o.city}</h2>
                  <address className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft not-italic">
                    {o.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={o.phoneHref}
                    className="mt-3 inline-flex min-h-11 items-center text-[0.98rem] font-medium text-ink transition-colors hover:text-accent-ink md:min-h-0"
                  >
                    {o.phone}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
