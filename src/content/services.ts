export const needs = ['Website Design', 'WordPress Development', 'Website Maintenance', 'Not sure yet'] as const

export type Need = (typeof needs)[number]

export type Service = {
  id: string
  title: string
  headline: string
  body: string
  includes: string[]
  bestFor: string
  // Small print under "Best for", e.g. what the scope depends on.
  note?: string
  // Slugs of featured projects that show this service, linking to their cards in Work.
  related?: string[]
  cta: string
  // Without `related`, the button opens the contact form with this need picked.
  // With it, "Explore …" leads to the first related project instead.
  need: Need
}

export const services: Service[] = [
  {
    id: 'website-design',
    title: 'Website Design',
    headline: 'A better website starts with a clearer direction.',
    body: "I design websites around your business, your content, and the people you're trying to reach. Every layout should have a purpose, from how information is organized to where visitors go next.",
    includes: [
      'Website and landing page design',
      'Page structure and content planning',
      'UI design and wireframes',
      'Responsive layouts',
      'Figma designs and prototypes',
      'Website redesigns and interface improvements',
    ],
    bestFor: 'Businesses that need a new website or want their current one to feel more considered, clear, and professional.',
    related: ['gl-auto', 'americas-fence-and-deck'],
    cta: 'Explore Website Design',
    need: 'Website Design',
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    headline: 'A thoughtful design, built into a working website.',
    body: 'I develop and customize WordPress websites using WordPress and Elementor. I focus on turning design decisions into responsive pages with practical functionality and a structure that suits the project.',
    includes: [
      'WordPress website development',
      'Elementor page building and customization',
      'Business websites and landing pages',
      'Responsive implementation',
      'Frontend fixes and layout adjustments',
      'Improvements to existing WordPress websites',
    ],
    bestFor: 'Businesses and agencies that need a new WordPress build or support implementing and improving an existing website.',
    related: ['integra-built', 'new-media-services'],
    cta: 'Explore WordPress Development',
    need: 'WordPress Development',
  },
  {
    id: 'maintenance',
    title: 'Website Maintenance',
    headline: "Your website doesn't stop needing attention after launch.",
    body: 'I help businesses keep their websites updated, address issues, and make changes as their needs evolve. The aim is to make ongoing website upkeep more manageable.',
    includes: [
      'Content and image updates',
      'WordPress and plugin updates',
      'Minor design and layout changes',
      'Troubleshooting website issues',
      'Basic responsive and functionality checks',
      'Ongoing website improvements',
    ],
    bestFor: 'Businesses that already have a website but need someone to help keep it current and working as expected.',
    note: 'Maintenance scope depends on the website, access, and agreed requirements.',
    cta: 'Discuss Website Maintenance',
    need: 'Website Maintenance',
  },
]
