export const site = {
  name: 'Angeline Seveses',
  role: 'Web Designer & Developer',
  tagline: 'Thoughtful websites, considered design, and practical development.',
  email: 'angelinseveses@gmail.com',
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
