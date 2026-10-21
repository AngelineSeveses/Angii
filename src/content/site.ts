export const site = {
  name: 'Angeline Seveses',
  role: 'Web Designer & Developer',
  email: 'angelineseveses@gmail.com',
  year: 2026,
  // TODO: add profile URLs. Empty links render as muted, non-clickable text.
  social: [
    { label: 'LinkedIn', href: '' },
    { label: 'GitHub', href: '' },
    { label: 'Behance', href: '' },
  ],
  // TODO: link once the experiments log exists (GitHub, a /lab page, etc.).
  experimentsHref: '',
  // TODO: optional portrait for the About section, e.g. '/images/angeline.webp'.
  portrait: '' as string,
} as const

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export type NavId = (typeof nav)[number]['id']
