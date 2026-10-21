// Screenshots are currently served from marjondoping.com. To self host, copy
// the files into /public/images/projects/ and set IMAGE_BASE to that path.
const IMAGE_BASE = 'https://marjondoping.com/images/projects/'

export type ProjectImages = {
  desktop: string // 1440 × 900 hero crop
  mobile: string // 780 × 1688
  full: string // 1200 wide, full length homepage
}

const shots = (key: string): ProjectImages => ({
  desktop: `${IMAGE_BASE}${key}-desktop.webp`,
  mobile: `${IMAGE_BASE}${key}-mobile.webp`,
  full: `${IMAGE_BASE}${key}-full.webp`,
})

export type Project = {
  slug: string
  name: string
  category: string
  url: string
  displayUrl: string
  images: ProjectImages
}

export type FeaturedProject = Project & {
  summary: string
  context?: string
  lookFor: string
  // Values wrapped in [brackets] are drafts and render with a "to confirm" marker.
  role: string
  tools: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'gl-auto',
    name: 'G&L Auto',
    category: 'Automotive · Business Website',
    url: 'https://glauto.ca/',
    displayUrl: 'glauto.ca',
    images: shots('glauto'),
    summary:
      'A website for an automotive business offering services across auto repair, towing, and used auto parts.',
    context:
      'The challenge with service-based websites is helping visitors quickly understand what the business offers and where to go next.',
    lookFor: 'Service presentation, page structure, and how visitors find relevant information.',
    role: '[Add your actual contribution.]',
    tools: '[Add the tools you personally used.]',
  },
  {
    slug: 'clean-space',
    name: 'Clean Space',
    category: 'Commercial Cleaning · WordPress',
    url: 'https://cleanspaceonline.com/',
    displayUrl: 'cleanspaceonline.com',
    images: shots('cleanspace'),
    summary: 'A commercial cleaning website focused on presenting the business and its services clearly.',
    context:
      'The goal of a website like this is to give potential customers the information they need without making them work to find it.',
    lookFor: 'Content hierarchy, page layouts, and service presentation.',
    role: '[Add your actual contribution.]',
    tools: 'WordPress · Elementor [confirm]',
  },
  {
    slug: 'impact-cleaning',
    name: 'Impact Cleaning Services',
    category: 'Commercial Cleaning · Website Design & Development',
    url: 'https://impact.ca/',
    displayUrl: 'impact.ca',
    images: shots('impact'),
    summary:
      "A service-based website where clear messaging and straightforward navigation help visitors understand the company's offering.",
    lookFor: 'Layout consistency, service information, and responsive presentation.',
    role: '[Add your actual contribution.]',
    tools: 'WordPress · Elementor [confirm]',
  },
  {
    slug: 'new-media-services',
    name: 'New Media Services',
    category: 'BPO · Customer Experience · Technology',
    url: 'https://newmediaservices.com.au/',
    displayUrl: 'newmediaservices.com.au',
    images: shots('nms'),
    summary:
      'A corporate website for a business working across customer experience and technology-enabled services.',
    context:
      'For businesses with several offerings, organizing information clearly is an important part of helping visitors understand what they do.',
    lookFor: 'Corporate content structure, service presentation, and visual consistency.',
    role: '[Add your actual contribution.]',
    tools: '[Add the tools you personally used.]',
  },
  {
    slug: 'dm-tilt-n-load',
    name: 'D&M Tilt ’n Load Inc.',
    category: 'Transportation · Logistics',
    url: 'https://dmtiltnload.ca/',
    displayUrl: 'dmtiltnload.ca',
    images: shots('dm'),
    summary: 'A website for a transportation and heavy-haul business.',
    context:
      'The focus of a project like this is making specialized services understandable and helping visitors find the information relevant to their needs.',
    lookFor: 'Service organization, content structure, and responsive layouts.',
    role: '[Add your actual contribution.]',
    tools: '[Add the tools you personally used.]',
  },
]

export const moreProjects: Project[] = [
  {
    slug: 'burlington-food-hall',
    name: 'Burlington Food Hall',
    category: 'Food & Hospitality',
    url: 'https://burlingtonfoodhall.com/',
    displayUrl: 'burlingtonfoodhall.com',
    images: shots('burlington'),
  },
  {
    slug: '1-day-junk',
    name: '1 Day Junk',
    category: 'Junk Removal & Local Services',
    // TODO: this is a staging domain. Swap for the production URL when known.
    url: 'https://1dayjunk.brinkunlimited.website/',
    displayUrl: '1dayjunk',
    images: shots('onedayjunk'),
  },
  {
    slug: 'dutch-dragons',
    name: 'Dutch Dragons',
    category: 'Business & Investment',
    url: 'https://www.dutchdragons.nl/',
    displayUrl: 'dutchdragons.nl',
    images: shots('dutchdragons'),
  },
  {
    slug: 'dhcb',
    name: 'DHCB',
    category: 'Business Operations & Automation',
    url: 'https://dhcb.io/',
    displayUrl: 'dhcb.io',
    images: shots('dhcb'),
  },
  {
    slug: 'canadian-towing-ottawa',
    name: 'Canadian Towing Ottawa',
    category: 'Towing & Roadside Assistance',
    url: 'https://canadiantowingottawa.com/',
    displayUrl: 'canadiantowingottawa.com',
    images: shots('towing'),
  },
]

export const allProjects: Project[] = [...featuredProjects, ...moreProjects]

export const isDraft = (value: string) => /\[.*\]/.test(value)
