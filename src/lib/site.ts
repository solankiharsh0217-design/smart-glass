/**
 * Single source of truth for brand, navigation, product data and contact
 * details. Pages read from here so copy changes never require touching JSX.
 */

/** Canonical origin. Override with NEXT_PUBLIC_SITE_URL per environment. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://smartglassuk.com";

export const BRAND = {
  name: "Smart Glass",
  legal: "Smart Glass UK",
  tagline: "Switchable privacy glass and transparent LED display, supplied and installed across the UK and Ireland.",
} as const;

/**
 * Self-hosted from `public/images` — originals were resized to 2560px max and
 * recompressed (34MB -> 4.3MB). Nothing here depends on an external CDN.
 */
const UPLOADS = "/images";

/**
 * Chosen against each asset's real aspect ratio so `object-cover` never has to
 * throw most of the frame away:
 *   hero 1.78 → 1.6 box      portraits 0.75 → the tall gallery tiles
 *   squares 1.0 → 1.25 cards  Shenzhen panel shots 1.6 → product banners
 * Smart-glass-1/-3 are the 4.2:1 wordmark, so they are logo-only — never a photo.
 */
export const IMG = {
  logo: `${UPLOADS}/Smart-glass-3.png`,
  // PDLC lamination on the factory floor — authentic, and 1.78 fits the 1.6 box.
  heroPartition: `${UPLOADS}/IMG-20250224-WA0007.jpeg`,
  // Portrait 0.75, matches the 4/5 panel in WhyUs, and shows real partition work.
  filmInstall: `${UPLOADS}/IMG-20251015-WA0042.jpg`,
  filmDetail: `${UPLOADS}/c324b9b1-3827-4d4a-b060-3d66d3d0356c.jpg`,
  office: `${UPLOADS}/411cb9e4-5e01-443e-9c7e-9155151663c8.jpg`,
  residential: `${UPLOADS}/94b74c4b-cf39-40e8-9711-a997c5d2a08c.jpg`,
  hospitality: `${UPLOADS}/dad1bcf0-680b-4018-8bb2-b84ee1fe745b.jpg`,
  healthcare: `${UPLOADS}/abab2073-6d27-4df8-85c8-0cc6c9eff8dc.jpg`,
  crystalA: `${UPLOADS}/Shenzhen-Yinhan-Tech-Company-Profile-3181_251028_192339-18.png`,
  // The actual grille panel product shot (1327x819).
  grilleA: `${UPLOADS}/Shenzhen-Yinhan-Tech-Company-Profile-3181_251028_192339-20-Copy.png`,
  // Tall tiles fall on indices 0, 3 and 6 — the portrait shots sit there.
  gallery: [
    `${UPLOADS}/IMG-20251015-WA0030.jpg`,
    `${UPLOADS}/unnamed-5.jpg`,
    `${UPLOADS}/Untitled-design-5-1.jpg`,
    `${UPLOADS}/IMG-20251015-WA0023.jpg`,
    `${UPLOADS}/IMG-20250224-WA0028.jpeg`,
    `${UPLOADS}/411cb9e4-5e01-443e-9c7e-9155151663c8.jpg`,
    `${UPLOADS}/IMG-20250903-WA0004.jpg`,
    `${UPLOADS}/dad1bcf0-680b-4018-8bb2-b84ee1fe745b.jpg`,
  ],
} as const;

export type Product = {
  slug: string;
  name: string;
  short: string;
  nav: string;
  summary: string;
  intro: string;
  hero: string;
  image: string;
  features: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  applications: string[];
  faq: { q: string; a: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "pdlc-smart-film",
    name: "PDLC Smart Window Film",
    nav: "PDLC Smart Film",
    short: "Switchable privacy glass",
    summary: "Clear to opaque in milliseconds, at the touch of a switch.",
    hero: "Privacy on demand, without a single blind or curtain.",
    intro:
      "PDLC film suspends liquid crystals between two conductive layers. Apply power and the crystals align so light passes straight through; cut the power and they scatter it, turning the panel to a clean frosted white. There are no moving parts, no maintenance and no track hardware to clean around.",
    image: IMG.filmDetail,
    features: [
      {
        title: "Instant switching",
        body: "Clear to private in milliseconds via wall switch, remote, mobile app or your building's automation system.",
      },
      {
        title: "Blocks 98% of UV",
        body: "Cuts glare and protects flooring, artwork and furnishings from sun bleaching year-round.",
      },
      {
        title: "Quieter rooms",
        body: "The laminated construction reduces transmitted noise by roughly 25–30%, useful in meeting rooms and street-facing glazing.",
      },
      {
        title: "Doubles as a screen",
        body: "In its opaque state the panel is a high-gain rear-projection surface, so a partition becomes a presentation display.",
      },
      {
        title: "Retrofit or new build",
        body: "Supplied as laminated panels for new glazing, or as self-adhesive film applied to glass you already have in place.",
      },
      {
        title: "Fitted by our own team",
        body: "Surveyed, installed and commissioned by our technicians — no specialist trade required on your side.",
      },
    ],
    specs: [
      { label: "Technology", value: "PDLC laminated between ITO conductive glass" },
      { label: "Switching", value: "Instant — no moving parts" },
      { label: "UV rejection", value: "Over 98%" },
      { label: "Noise reduction", value: "Approx. 25–30%" },
      { label: "Control", value: "Wall switch, remote, app or building automation" },
      { label: "Formats", value: "Laminated panel or retrofit adhesive film" },
    ],
    applications: [
      "Office partitions and meeting rooms",
      "Bathroom and en-suite glazing",
      "Retail storefronts and window displays",
      "Clinics, consulting rooms and treatment areas",
      "Executive offices and boardrooms",
      "Residential windows, doors and rooflights",
    ],
    faq: [
      {
        q: "Can it be fitted to windows we already have?",
        a: "Yes. The adhesive film version is applied directly to existing glazing, so there is no need to replace the unit or disturb the frame.",
      },
      {
        q: "What happens in a power cut?",
        a: "The panel defaults to its opaque state. Privacy is preserved when power is lost, which is the safer failure mode for bathrooms and consulting rooms.",
      },
      {
        q: "Does it reduce energy bills?",
        a: "It helps. Blocking the large majority of UV and a share of solar heat gain lowers the cooling load in summer, and the laminated build adds a small amount of insulation in winter.",
      },
      {
        q: "How much power does it draw?",
        a: "Very little — comparable to low-voltage LED lighting, and only while the panel is held in its clear state.",
      },
    ],
  },
  {
    slug: "crystal-clear-display",
    name: "LED 3D Crystal Clear Display",
    nav: "Crystal Clear Display",
    short: "Transparent LED display",
    summary: "Over 87% transparent, so the display disappears when it is off.",
    hero: "A display that leaves the view intact.",
    intro:
      "Crystal Clear is a transparent LED panel that mounts to glazing and carries full-colour motion content while keeping more than 87% of the light coming through. Shoppers still see the products behind it, staff still see daylight, and the storefront does not turn into a black rectangle after hours.",
    image: IMG.crystalA,
    features: [
      {
        title: "Over 87% transparency",
        body: "The view through the glass is effectively unchanged, so the panel adds content without closing the space in.",
      },
      {
        title: "3000 cd/m² brightness",
        body: "Bright enough to stay legible in a daylit shopfront rather than washing out behind window glare.",
      },
      {
        title: "3840Hz refresh",
        body: "Flicker-free on camera, which matters for filmed content, live streaming and broadcast backdrops.",
      },
      {
        title: "3.5 kg per m²",
        body: "Light enough to mount to existing glazing and partitions without additional structural support.",
      },
      {
        title: "160° viewing angle",
        body: "Legible across the full width of a shopfront, not only head-on.",
      },
      {
        title: "Made to your opening",
        body: "Panels are cut to suit the shape and size of the glass, up to 1500mm wide per module.",
      },
    ],
    specs: [
      { label: "Pixel pitch", value: "6mm (H) × 6mm (V)" },
      { label: "Transparency", value: "Greater than 87%" },
      { label: "Brightness", value: "3000 cd/m²" },
      { label: "Viewing angle", value: "160° horizontal and vertical" },
      { label: "Refresh rate", value: "3840Hz or higher" },
      { label: "LED lifespan", value: "100,000 hours or more" },
      { label: "Power supply", value: "DC 5V" },
      { label: "Module weight", value: "3.5 kg/m²" },
      { label: "Operating temperature", value: "−20°C to +55°C" },
      { label: "Custom width", value: "Up to 1500mm" },
    ],
    applications: [
      "Retail windows and storefront promotions",
      "Corporate reception and lobby glazing",
      "Showroom and product display cases",
      "Exhibition stands and events",
      "Hotel and restaurant frontages",
      "Airport and transport retail units",
    ],
    faq: [
      {
        q: "Can you still see through it while content is playing?",
        a: "Yes. Unlike a conventional LED wall, which is a solid opaque panel, the emitters sit on a fine transparent grid, so the view behind the display stays open even mid-playback.",
      },
      {
        q: "Will it fit a non-rectangular window?",
        a: "Custom configurations are made to suit the shape and dimensions of the glass, including stepped and angled openings.",
      },
      {
        q: "How is content loaded?",
        a: "The panel takes a standard video feed, so it accepts anything from a scheduled media player to a live desktop or CMS-driven playlist.",
      },
    ],
  },
  {
    slug: "t-grille",
    name: "TGRILLE 3D Display",
    nav: "TGRILLE 3D Display",
    short: "Architectural LED grille",
    summary: "Facade-scale LED at 8000 cd/m², light enough to hang on existing steel.",
    hero: "Facade-scale display, a fraction of the weight.",
    intro:
      "TGRILLE is an outdoor LED grille built on an ultra-light aluminium profile. It is designed for building facades and large-format advertising where a conventional LED wall would demand far heavier secondary steel — and where the building still needs daylight and airflow through the elevation.",
    image: IMG.grilleA,
    features: [
      {
        title: "40% lighter",
        body: "Panels weigh 15 kg/m² against a conventional system's typical load, opening up facades that could not otherwise carry a screen.",
      },
      {
        title: "Up to 8000 cd/m²",
        body: "Engineered to hold its own in direct sunlight on an exposed elevation.",
      },
      {
        title: "45–60% transparent",
        body: "Daylight and air still pass through the elevation, so the display does not seal the building behind it.",
      },
      {
        title: "Fast to install",
        body: "Roughly 10 seconds per square metre, and a single fitter can hang it — lower access costs and shorter road closures.",
      },
      {
        title: "Lighter secondary steel",
        body: "Supporting structure comes in around 10 kg/m², roughly 80% below a traditional build-up.",
      },
      {
        title: "Efficient DIP LEDs",
        body: "Lower power draw per square metre, with heat dissipation engineered into the profile itself.",
      },
    ],
    specs: [
      { label: "Pixel pitch options", value: "7.8/15.6, 15.6/15.6, 15.6/31.2, 25/25, 31.2/31.2" },
      { label: "Brightness", value: "6,500 – 8,000 cd/m² by model" },
      { label: "Transparency", value: "45 – 60% by model" },
      { label: "Panel weight", value: "15 kg/m²" },
      { label: "Steel structure", value: "Approx. 10 kg/m²" },
      { label: "LED type", value: "DIP LED" },
      { label: "Install rate", value: "Approx. 10 seconds per m², single fitter" },
      { label: "Finish", value: "Multiple profile colours available" },
    ],
    applications: [
      "Building facades and curtain walling",
      "Large-format outdoor advertising",
      "Stadium and arena exteriors",
      "Car park and multi-storey elevations",
      "Retail park and roadside signage",
      "Architectural and landmark lighting",
    ],
    faq: [
      {
        q: "Why is transparency useful outdoors?",
        a: "A transparent grille lets daylight into the floors behind the elevation and lets wind pass through it, which cuts the wind loading the supporting structure has to be designed for.",
      },
      {
        q: "Does it need heavy secondary steel?",
        a: "No — that is the main advantage. At roughly 10 kg/m² of supporting structure, many facades can take it without significant strengthening works.",
      },
      {
        q: "Is it rated for UK weather?",
        a: "It is built as an outdoor system. We confirm the exact ingress rating against the specific model and exposure at survey stage.",
      },
    ],
  },
];

export const SECTORS = [
  {
    title: "Residential",
    body: "Windows, rooflights, bathroom glazing and garden rooms — privacy without blinds to clean or replace.",
    image: IMG.residential,
  },
  {
    title: "Commercial offices",
    body: "Meeting room partitions that switch private for a confidential conversation and clear again afterwards.",
    image: IMG.office,
  },
  {
    title: "Hospitality",
    body: "Hotels, restaurants, resorts and spas, where the same panel handles privacy, projection and atmosphere.",
    image: IMG.hospitality,
  },
  {
    title: "Healthcare",
    body: "Consulting rooms, treatment areas and ward glazing, with a wipe-clean surface and no fabric to launder.",
    image: IMG.healthcare,
  },
] as const;

export const OFFICES = [
  {
    region: "United Kingdom",
    city: "London",
    phone: "020 7971 7748",
    phoneHref: "tel:+442079717748",
    address: ["71–75 Shelton Street", "Covent Garden", "London WC2H 9JQ"],
  },
  {
    region: "Ireland",
    city: "Belfast",
    phone: "028 9600 5825",
    phoneHref: "tel:+442896005825",
    address: ["Unit 5, 370–374 Upper Newtownards Road", "Belfast BT4 3EY"],
  },
] as const;

export const CONTACT = {
  email: "simon@smartglassuk.com",
  whatsapp: "https://wa.me/447391650896",
  whatsappLabel: "+44 7391 650896",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  ...PRODUCTS.map((p) => ({ href: `/products/${p.slug}`, label: p.nav })),
  { href: "/contact", label: "Contact" },
];

export function productBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
