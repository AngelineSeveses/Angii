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
| Logo mark (also `public/favicon.svg`, `public/logo.svg`) | `src/components/Logo.tsx` |
| FAQ copy | `src/content/faqs.ts` |
| Projects, screenshots, live URLs, role and tools | `src/content/projects.ts` |
| Services and the "What do you need?" options | `src/content/services.ts` |
| Brand colors, fonts, easing curves | `src/theme/tokens.ts` |
| Type scale and MUI overrides | `src/theme/theme.ts` |
| Smooth scroll, in-page links, reduced-motion switch | `src/motion/motion.ts` |
| Before/after swipe on project cards (drag, touch or arrow keys) | `src/components/BeforeAfter.tsx` |
| Case study pages at `/work/<slug>` (interim layout, linked from "Read more") | `src/pages/CaseStudy.tsx` |
| Waving line doodle in the footer (two poses, like a GIF) | `src/components/WaveDoodle.tsx` |
| Word-by-word headings and the scroll-filled About line | `src/components/SplitWords.tsx` |
| Ultramarine tints for the stacked service cards | `accentTints` in `src/theme/tokens.ts` |

## Before launch

- **Project write-ups.** The five featured projects (story, role, tools) live in `featuredProjects` in `projects.ts`. Cards show the one-liner and tags; the story, role and tools are on each project's case study page at `/work/<slug>`, which is a simple interim layout until the real case study design is built. Anything in `[brackets]` renders with a dashed brass "draft" outline. New Media Services has no tools listed; add `tools` if you want them shown.
- **Hosting the case study pages.** `/work/<slug>` is handled in the browser, so the host must serve `index.html` for those paths (a single-page-app fallback). `vercel.json` already does this on Vercel; on another host, add the same rewrite of `/work/*` to `/index.html`.
- **Contact form.** Inquiries are emailed to `site.email` through FormSubmit, no account needed. The very first submission sends an "Activate Form" email to that address; click it once, then submit again. Nothing is delivered before that. To use Formspree or your own endpoint instead, set `VITE_FORM_ENDPOINT` in `.env.local` (see `.env.example`).
- **Screenshots.** Integra Built, America's Fence & Deck and J&A Fence are 1440 × 900 captures of the live sites in `public/images/projects/`. The rest load from marjondoping.com; to self host them, copy them into the same folder and change `IMAGE_BASE` in `projects.ts`. Clean Space, Impact Cleaning and D&M moved from the featured grid to More projects.
- **1 Day Junk** points at a staging domain. Swap in the production URL.
- **Profile links.** LinkedIn and Behance come from angelineseveses.vercel.app. Profiles without a URL in `site.ts` are not shown, so add a GitHub URL there to make it appear. The old site also linked a generic instagram.com, which was left out.
- **Before/after images** (`compare` in `projects.ts`).
  - New Media Services: the old and new site from the case study on angelineseveses.vercel.app. Copy `old.webp` and `v2.webp` into `public/images/` before that site goes offline.
  - Integra Built (Sep 2025), J&A Fence (Jan 2026) and G&L Auto (Sep 2025): the last homepage the Wayback Machine saved before each redesign, captured at 1440 × 900 like the live site. The archive did not keep the hero photos for Integra Built and G&L Auto, so those areas show up blank; the case study page says so. G&L also had a short-lived version in early 2026 that the archive did not save properly.
  - America's Fence & Deck: before the rebrand the company was O'Fallon Warrenton Fence at ofallonwarrentonfence.com, which now redirects to americasfence.com. The before image is that site as the archive saved it in June 2023 (its small logo image is missing).
- **Experiments link and portrait** are empty in `site.ts`. Once `portrait` is set, the photo appears above the About text.
- **Budget ranges** in `src/sections/Contact.tsx` are placeholders. Adjust to your pricing.
- **Research section** (`src/sections/Research.tsx`) is built but not on the page until there's a published experiment. Add `<Research />` back in `src/App.tsx` after About and set `site.experimentsHref`.
- **"See an example" links** in Services point at G&L Auto (website design) and Clean Space (WordPress) through `example` in `services.ts`. Change or remove them if those aren't the best proof of that service.
- **PageSpeed scores** (`pageSpeed` in `projects.ts`) are lab results from pagespeed.web.dev, tested Oct 25, 2026, each with a link to its report. They describe the live sites today, not a before/after, and they drift as clients change content, plugins and hosting, so rerun the reports and update the numbers when you refresh the portfolio.
- **SEO basics** (`seo` in `projects.ts`) list technical strengths found on each live site on Oct 25, 2026: structured data, sitemap pages, titles and descriptions, alt text and the PageSpeed SEO score. They describe the site, not who set each item up. New Media Services has none listed: its homepage has no meta description or structured data, and it points search engines to newmediaservices.com.au.
- Add an `og:image` and `og:url` in `index.html` once the domain is live.
