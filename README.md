# Veyl Glass

Marketing site for Veyl Glass — switchable privacy glass (PDLC) and
transparent LED display, supplied and installed across the UK and Ireland.

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4 and
Framer Motion.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Routes

| Route | Rendering | What it is |
| --- | --- | --- |
| `/` | Static | Hero, solutions, why-us, sectors, gallery, CTA |
| `/products/pdlc-smart-film` | SSG | Switchable privacy glass |
| `/products/crystal-clear-display` | SSG | Transparent LED display |
| `/products/t-grille` | SSG | Architectural LED grille |
| `/contact` | Static | Enquiry form + both offices |
| `/api/contact` | Dynamic | Form handler |

The three product pages are generated from one array via
`generateStaticParams`, so adding a product means adding an object — no new
route file.

## Where the content lives

**`src/lib/site.ts` is the single source of truth.** Brand, navigation,
products (features / specs / applications / FAQ), sectors, and both office
addresses all live there. Pages read from it, so copy changes never require
touching JSX, and the nav, footer, product routes and sitemap all derive from
the same data.

Image assignments in `IMG` are chosen against each asset's real aspect ratio so
`object-cover` never discards most of the frame — portrait shots go on the tall
gallery tiles, squares on the cards, 16:9 on the wide banners. Check the ratio
before swapping one.

## Two things to do before launch

**1. Wire up email.** `src/app/api/contact/route.ts` validates submissions and
returns proper errors, but currently only logs them. There is a marked block
where an email provider (Resend, Postmark, SES, SMTP) slots in. Until that is
done, enquiries reach nobody.

**2. Replace the placeholder brand.** "Veyl" is a placeholder wordmark, and the
office addresses and phone numbers in `src/lib/site.ts` are still sample data.
Swap both before this goes anywhere public.

## Styling

Design tokens are CSS custom properties in `src/app/globals.css`, exposed to
Tailwind via `@theme inline`. The brand accent is `--accent: #8ec73e` with
`--accent-ink: #1d3a07` for text on top of it.

Heading styles live in `@layer base` deliberately — without the layer, the base
`h1`/`h2`/`h3` colour would override Tailwind text utilities and dark-section
headings would render near-black on near-black.
