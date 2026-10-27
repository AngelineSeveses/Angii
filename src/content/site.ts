export const site = {
  name: 'Angeline Seveses',
  role: 'Web Designer & WordPress Developer',
  tagline: 'Thoughtful websites, considered design, and practical development.',
  email: 'angelinseveses@gmail.com',
  // The live address. Search tags, the sitemap and link previews are built from it,
  // so change it here when the site moves to its own domain.
  url: 'https://angelineseveses.netlify.app',
  year: 2026,
  // Profiles from angelineseveses.vercel.app. Entries without an href are not
  // shown, so add a GitHub URL here to make it appear in the footer.
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/angeline-seveses/' },
    { label: 'Behance', href: 'https://www.behance.net/angelineseveses' },
    { label: 'GitHub', href: '' },
  ],
  // TODO: link once the experiments log exists (GitHub, a /lab page, etc.).
  experimentsHref: '',
  // TODO: optional portrait, e.g. '/images/angeline.webp'. Once set, it shows as a small
  // round photo beside "you work directly with me" in the hero.
  portrait: '' as string,
} as const

// What Google and link previews show for each page. vite.config.ts writes it into
// the page's HTML at build time, so crawlers read it without running JavaScript.
// Google cuts titles at about 60 characters and descriptions at about 155.
export const homeMeta = {
  title: `${site.name} · ${site.role}`,
  description: `${site.name} is a web designer and WordPress developer offering website design, WordPress development and website maintenance for businesses and agencies.`,
}

export const caseStudyMeta = (project: { name: string; summary: string }) => ({
  title: `${project.name} · Case study · ${site.name}`,
  description: `${project.summary} Case study by ${site.name}, web designer and WordPress developer.`,
})

// Every email link opens the visitor's mail app with a subject already filled in.
export const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Project inquiry')}`

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export type NavId = (typeof nav)[number]['id']
