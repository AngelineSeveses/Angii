# Angeline Seveses — portfolio

React 19 · TypeScript · MUI 9 · Vite. Motion: GSAP + ScrollTrigger, Lenis for smooth scrolling (the only scroll engine). Fonts: General Sans + Switzer (Fontshare). Icons: Phosphor.

Under `prefers-reduced-motion` Lenis never starts, nothing animates in, the before/after slider skips its hint, and the footer band and waving doodle hold still.

```bash
npm install
npm run dev
```

## Where things live

| What | File |
| --- | --- |
| Name, email, social links, portrait, experiments link | `src/content/site.ts` |
| The "a" mark with the arrow counter, used in the footer band and the hero gradient (also `public/favicon.svg`, `public/logo.svg`, `public/apple-touch-icon.png`). The header logo is the name alone, `Wordmark` in `src/components/Header.tsx` | `src/components/Logo.tsx` |
| FAQ copy | `src/content/faqs.ts` |
| Projects, screenshots, live URLs, role and tools | `src/content/projects.ts` |
| Capabilities (three services) and the "What do you need?" options | `src/content/services.ts` |
| "Sounds familiar?" problems and answers | `src/sections/Problems.tsx` |
| "Beyond the screens" and its tool logos | `src/sections/Beyond.tsx` |
| Graphics on the three Capabilities cards | `src/components/ServiceGraphics.tsx` |
| Process steps (they light up on hover or tap) and "What you can expect from me" | `src/sections/Approach.tsx` |
| FAQ layout | `src/sections/Faq.tsx` |
| Hero: copy, the gradient stage with the J&A Fence browser and phone preview, its PageSpeed gauge | `src/sections/Hero.tsx` |
| Full-width sticky nav bar, with the dark pill that slides between links | `src/components/Header.tsx` |
| Project cards' desktop and phone mockups, which scroll on hover; the browser frame shared with the hero | `src/components/Mockup.tsx` |
| Gray client logo band under the hero | `src/components/ClientLogos.tsx`, `logo` in `projects.ts` |
| Brand colors, fonts, easing curves | `src/theme/tokens.ts` |
| Type scale and MUI overrides | `src/theme/theme.ts` |
| Smooth scroll, in-page links, reduced-motion switch | `src/motion/motion.ts` |
| Before/after swipe on case study pages (drag, touch or arrow keys) | `src/components/BeforeAfter.tsx` |
| Case study pages at `/work/<slug>`, linked from "Read more" | `src/pages/CaseStudy.tsx` |
| Laptop and phone header that slowly scrolls the live homepage | `src/components/DeviceShowcase.tsx` |
| Line doodles, two poses each like a GIF: waving in the footer, thumbs up in Beyond the screens | `src/components/WaveDoodle.tsx` |
| Word-by-word headings | `src/components/SplitWords.tsx` |
| The slow scroll of the browser, laptop and phone previews | `src/hooks/useScreenLoops.ts` |
| Colors for the stacked service cards, all text at 4.5:1 or better | `accentTints` in `src/theme/tokens.ts` |

## Before launch

- **Project write-ups.** The five featured projects (story, role, tools) live in `featuredProjects` in `projects.ts`. Cards show the one-liner, the challenge and the focus tags; the challenge, story, role and tools are on each project's case study page at `/work/<slug>`. Anything in `[brackets]` renders with a dashed brass "draft" outline. New Media Services has no tools listed; add `tools` if you want them shown.
- **Case study device screenshots** (`screens` in `projects.ts`, files `*-laptop.webp` and `*-phone.webp` in `public/images/projects/`) are full-length captures of each live homepage taken Oct 26, 2026 with headless Chrome: 1440px wide for the laptop (resized to 1200, cut at about 6,000px) and 390px @2x for the phone (resized to 600). J&A Fence's laptop capture stops above an empty map box. Recapture them when a client's homepage changes. The key-screens gallery crops the same files, so it needs no extra images.
- **Hosting the case study pages.** `/work/<slug>` is handled in the browser, so the host must serve `index.html` for those paths (a single-page-app fallback). `vercel.json` already does this on Vercel; on another host, add the same rewrite of `/work/*` to `/index.html`.
- **Contact form.** Inquiries are emailed to `site.email` through FormSubmit, no account needed. The very first submission sends an "Activate Form" email to that address; click it once, then submit again. Nothing is delivered before that. To use Formspree or your own endpoint instead, set `VITE_FORM_ENDPOINT` in `.env.local` (see `.env.example`).
- **Screenshots.** Integra Built, America's Fence & Deck and J&A Fence are 1440 × 900 captures of the live sites in `public/images/projects/`. The rest load from marjondoping.com; to self host them, copy them into the same folder and change `IMAGE_BASE` in `projects.ts`. Clean Space, Impact Cleaning and D&M moved from the featured grid to More projects.
- **1 Day Junk** points at a staging domain. Swap in the production URL.
- **Profile links.** LinkedIn and Behance come from angelineseveses.vercel.app. Profiles without a URL in `site.ts` are not shown, so add a GitHub URL there to make it appear. The old site also linked a generic instagram.com, which was left out.
- **Before/after images** (`compare` in `projects.ts`).
  - New Media Services: the old and new site from the case study on angelineseveses.vercel.app. Copy `old.webp` and `v2.webp` into `public/images/` before that site goes offline.
  - Integra Built (Sep 2025), J&A Fence (Jan 2026) and G&L Auto (Sep 2025): the last homepage the Wayback Machine saved before each redesign, captured at 1440 × 900 like the live site. The archive did not keep the hero photos for Integra Built and G&L Auto, so those areas show up blank; the case study page says so. G&L also had a short-lived version in early 2026 that the archive did not save properly.
  - America's Fence & Deck: before the rebrand the company was O'Fallon Warrenton Fence at ofallonwarrentonfence.com, which now redirects to americasfence.com. The before image is that site as the archive saved it in June 2023 (its small logo image is missing).
- **Experiments link and portrait** are empty in `site.ts`. Once `portrait` is set, a small round photo appears beside "you work directly with me" in the hero. A real photo is the single biggest step toward a hero that feels personal.
- **Budget ranges** in `src/sections/Contact.tsx` are placeholders. Adjust to your pricing.
- **Research section** (`src/sections/Research.tsx`) is built but not on the page until there's a published experiment. Add `<Research />` back in `src/App.tsx` after Beyond and set `site.experimentsHref`.
- **Related work** on the Capabilities cards comes from `related` in `services.ts` (G&L Auto and America's Fence & Deck for website design, Integra Built and New Media Services for WordPress). The "Explore …" button scrolls to the first of them in Selected Work. Website Maintenance has no related work, so its button opens the contact form with "Website Maintenance" picked.
- **Hero preview.** The browser and phone scroll the same J&A Fence captures as its case study. The gauge pinned to them is J&A Fence's real Desktop SEO score (100) from its PageSpeed Insights report, chosen through `speedHighlight`, and links to that report.
- **Client logos** (`public/images/clients/`) were downloaded from each client's own site on Oct 26, 2026 (New Media Services from newmediaservices.com.au, which newmediaservices.com forwards to) and resized. The page shows them in gray and in color under the pointer. Replace a file if a client updates its logo.
- **PageSpeed scores** (`pageSpeed` in `projects.ts`) are lab results from pagespeed.web.dev, tested Oct 25, 2026, each with a link to its report (checked against those saved reports on Oct 26, 2026). Each project card quotes one score from its report, such as "93/100 Desktop Performance", and links to it: desktop performance by default, or the category set in `speedHighlight` (New Media Services quotes Desktop Accessibility, 98, and J&A Fence quotes Desktop SEO, 100, because their desktop performance is 68 and 43). They describe the live sites today, not a before/after, and they drift as clients change content, plugins and hosting, so rerun the reports and update the numbers when you refresh the portfolio.
- **SEO basics** (`seo` in `projects.ts`) list technical strengths found on each live site on Oct 25, 2026: structured data, sitemap pages, titles and descriptions, alt text and the PageSpeed SEO score. They describe the site, not who set each item up. New Media Services has none listed: its homepage has no meta description or structured data, and it points search engines to newmediaservices.com.au.
- **Tool logos** in "Beyond the screens" come from the `simple-icons` package (CC0 artwork; the trademarks belong to each company). Hovering a tile fills it with the brand's color and shows the name.
- Add an `og:image` and `og:url` in `index.html` once the domain is live.
