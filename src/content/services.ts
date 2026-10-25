export const needs = [
  'Website design',
  'WordPress development',
  'Interactive web development',
  'Research & development',
  'Something else',
] as const

export type Need = (typeof needs)[number]

export type Service = {
  id: string
  title: string
  headline: string
  body: string
  includesLabel: string
  includes: string[]
  goodFit: string
  cta: string
  need: Need
  // The visitor's own words for this service, used in the hero's "What do you need?" list.
  prompt: string
  // Slug of a featured project that shows this service. Links to its row in Work.
  example?: string
}

export const services: Service[] = [
  {
    id: 'website-design',
    prompt: 'A new website or a redesign',
    title: 'Website Design',
    headline: "A website that's clear, easy to navigate, and built around what matters.",
    body: 'I design websites and landing pages with attention to layout, visual hierarchy, content, and how people move through a page.',
    includesLabel: 'This can include',
    includes: [
      'Website and landing page design',
      'Page structure and content planning',
      'UI design and wireframes',
      'Responsive layouts',
      'Figma designs and prototypes',
      'Redesigns and interface improvements',
    ],
    goodFit: 'Businesses that need a new website or want to improve an existing one.',
    cta: 'Discuss a Website Project',
    need: 'Website design',
    example: 'gl-auto',
  },
  {
    id: 'wordpress',
    prompt: 'A WordPress site built or fixed',
    title: 'WordPress Development',
    headline: 'Turning designs into working websites.',
    body: "I work with WordPress and Elementor to build and customize websites that fit the project's requirements.",
    includesLabel: 'This can include',
    includes: [
      'WordPress website development',
      'Elementor page building and customization',
      'Landing pages and business websites',
      'Responsive implementation',
      'Layout adjustments and frontend fixes',
      'Existing website improvements',
    ],
    goodFit: 'Businesses and agencies that need help building, updating, or refining a WordPress website.',
    cta: 'Discuss a WordPress Project',
    need: 'WordPress development',
    example: 'integra-built',
  },
  {
    id: 'interactive',
    prompt: 'An interactive feature or prototype',
    title: 'Interactive Web Development',
    headline: 'For ideas that need more than a static page.',
    body: 'I use JavaScript and React where appropriate to build interactive features, interface components, and working prototypes.',
    includesLabel: 'This can include',
    includes: [
      'JavaScript interactions',
      'Custom frontend features',
      'Interactive maps and visual elements',
      'React-based interfaces and prototypes',
      'UI behavior improvements',
      'Experiments and proof of concepts',
    ],
    goodFit: 'Projects that need a custom interaction, a more engaging interface, or a prototype to test an idea.',
    cta: 'Tell Me About Your Idea',
    need: 'Interactive web development',
  },
  {
    id: 'research',
    prompt: 'Help working out an idea',
    title: 'Research & Development',
    headline: "Have an idea but aren't sure how to approach it?",
    body: "I enjoy investigating problems, testing different approaches, and finding out what's practical before committing to a solution.",
    includesLabel: 'Depending on the project, I can help with',
    includes: [
      'Technical research',
      'Feasibility checks',
      'Interface experiments',
      'JavaScript and React prototypes',
      'Workflow improvements',
      'Testing different implementation approaches',
    ],
    goodFit: 'Teams and businesses that want to explore a digital idea before investing in a larger build.',
    cta: "Let's Explore the Idea",
    need: 'Research & development',
  },
]
