import Link from "next/link";
import { Reveal } from "./Reveal";
import { CONTACT } from "@/lib/site";

export function CTABand({
  title = "Tell us about the opening.",
  body = "Send dimensions or a photo and we will come back with a specification and a price. Site surveys across the UK and Ireland.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-7 pb-20 md:pb-28">
      <Reveal>
        <div className="overflow-hidden rounded-3xl bg-accent px-8 py-14 md:px-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
            <div>
              <h2 className="max-w-[640px] text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-semibold text-accent-ink">
                {title}
              </h2>
              <p className="mt-5 max-w-[520px] text-[1rem] leading-relaxed text-accent-ink/75">
                {body}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-accent-ink px-7 py-3.5 text-[0.98rem] font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-125"
              >
                Request a quote
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-accent-ink/30 px-7 py-3.5 text-[0.98rem] font-semibold text-accent-ink transition-all hover:-translate-y-0.5 hover:bg-accent-ink/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
