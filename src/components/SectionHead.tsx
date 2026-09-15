import { Reveal } from "./Reveal";

/** Editorial 3-column section header used across the original site:
 *  left: huge section title | middle: descriptive heading | right: small note */
export function SectionHead({
  title,
  heading,
  note,
  dark = false,
}: {
  title: string;
  heading: string;
  note?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 border-t pt-10 md:grid-cols-[1fr_1.6fr_0.8fr] md:gap-10 ${
        dark ? "border-white/15" : "border-line-dark"
      }`}
    >
      <Reveal>
        <h2
          className={`text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] font-semibold whitespace-pre-line ${
            dark ? "text-white" : ""
          }`}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p
          className={`text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.2] font-medium ${
            dark ? "text-white/90" : ""
          }`}
        >
          {heading}
        </p>
      </Reveal>
      {note && (
        <Reveal delay={0.14} className="md:text-right">
          <p className={`text-[0.95rem] ${dark ? "text-white/55" : "text-ink-soft"}`}>{note}</p>
        </Reveal>
      )}
    </div>
  );
}
