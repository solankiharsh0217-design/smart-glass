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
            {/* Every third tile runs tall to break up the grid rhythm. */}
            <div
              className={`overflow-hidden rounded-2xl bg-bg ${
                i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
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
