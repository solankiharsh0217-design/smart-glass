import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { IMG } from "@/lib/site";

export function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-[1440px] px-7 py-20 md:py-28">
      <SectionHead
        title={"Recent\nwork"}
        heading="Panels, partitions and storefronts from installs across the UK and Ireland."
        note="A sample of completed projects."
      />

      <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {IMG.gallery.map((src, i) => (
          <Reveal key={src} delay={(i % 4) * 0.07}>
            {/* One ratio for every tile so rows align. The sources run from 0.75
                portrait to 1.0 square, and square splits that difference with the
                least cropping. */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Smart glass installation ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.05]"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
