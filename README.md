# Angeline Seveses — portfolio

React 19 · TypeScript · MUI 9 · Vite. Fonts: General Sans + Switzer (Fontshare). Icons: Phosphor.

```bash
npm install
npm run dev
```

## Where things live

| What | File |
| --- | --- |
| Name, email, social links, portrait, experiments link | `src/content/site.ts` |
| Projects, screenshots, live URLs, role and tools | `src/content/projects.ts` |
| Services and the "What do you need?" options | `src/content/services.ts` |
| Brand colors, fonts, easing curves | `src/theme/tokens.ts` |
| Type scale and MUI overrides | `src/theme/theme.ts` |

## Before launch

- **Role and tools per project.** Anything in `[brackets]` in `projects.ts` renders with a dashed brass "draft" outline. Replace each with your actual contribution.
- **Contact form.** Copy `.env.example` to `.env.local` and set `VITE_FORM_ENDPOINT` (Formspree or any JSON endpoint). The form only shows the success message after the endpoint returns a 2xx.
- **Screenshots** are loaded from marjondoping.com. To self host, copy them to `public/images/projects/` and change `IMAGE_BASE` in `projects.ts`.
- **1 Day Junk** points at a staging domain. Swap in the production URL.
- **Social links, experiments link, portrait** are empty in `site.ts`. Empty links render as muted text, not dead links.
- **Budget ranges** in `src/sections/Contact.tsx` are placeholders. Adjust to your pricing.
- Add an `og:image` and `og:url` in `index.html` once the domain is live.
