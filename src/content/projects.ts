// Most screenshots are served from marjondoping.com. Integra Built, America's
// Fence & Deck and J&A Fence are self hosted in /public/images/projects/.
// To self host the rest, copy them there and point IMAGE_BASE at that path.
const IMAGE_BASE = 'https://marjondoping.com/images/projects/'

export type ProjectImages = {
  desktop: string // 1440 × 900 view of the homepage
  mobile?: string // 780 × 1688, used by the phone rail
}

const shots = (key: string): Required<ProjectImages> => ({
  desktop: `${IMAGE_BASE}${key}-desktop.webp`,
  mobile: `${IMAGE_BASE}${key}-mobile.webp`,
})

const localShot = (key: string): ProjectImages => ({ desktop: `/images/projects/${key}-desktop.jpg` })

export type Project = {
  slug: string
  name: string
  category: string
  url: string
  displayUrl: string
  images: ProjectImages
}

export type ComparePair = {
  before: string
  after: string
  // Larger copies for wide or high density screens, by width in px.
  srcSet?: { before: string; after: string }
  width: number
  height: number
  // When the Wayback Machine saved the old design, e.g. "Sep 2025".
  archivedOn?: string
  // The archive did not keep some of the old site's images (often the hero
  // photo), so the before shot shows gaps the real site did not have.
  missingImages?: boolean
  // The old site's address, when it lived on a different domain.
  archivedFrom?: string
}

// One Google PageSpeed Insights lab run (Lighthouse) for a single device type.
export type SpeedScores = {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  // Core timings as PageSpeed reports them.
  fcp: string
  lcp: string
  tbt: string
  cls: string
  speedIndex: string
}

export type PageSpeed = {
  measured: string // the day the test ran
  report: string // the shareable PageSpeed Insights report
  mobile: SpeedScores
  desktop: SpeedScores
}

export type FeaturedProject = Project & {
  // One line under the project name.
  summary: string
  // Shown under "Read the story", one paragraph per entry.
  story: string[]
  // Values wrapped in [brackets] are drafts and render with a "to confirm" marker.
  role: string
  tools?: string
  // The old site and the redesign in identical framing, so the swipe lines up.
  // Without one, the card shows a still screenshot of the live site.
  compare?: ComparePair
  // The live site as it tests today. Not a before/after claim: the old sites
  // can no longer be measured.
  pageSpeed?: PageSpeed
  // Technical SEO strengths found on the live site, as plain facts.
  seo?: { checked: string; points: string[] }
}

// Before/after images come from the case studies on the previous portfolio
// (angelineseveses.vercel.app), resized by its image service. Copy them into
// /public/images/ before that site goes offline.
const CASE_STUDY_BASE = 'https://angelineseveses.vercel.app'
const caseImage = (file: string, width: number) =>
  `${CASE_STUDY_BASE}/_next/image?url=${encodeURIComponent(`/images/${file}`)}&w=${width}&q=75`
const comparePair = (before: string, after: string, width: number, height: number): ComparePair => ({
  before: caseImage(before, 1920),
  after: caseImage(after, 1920),
  srcSet: {
    before: [1080, 1920, 3840].map((w) => `${caseImage(before, w)} ${w}w`).join(', '),
    after: [1080, 1920, 3840].map((w) => `${caseImage(after, w)} ${w}w`).join(', '),
  },
  width,
  height,
})

// Old designs recovered from the Wayback Machine (web.archive.org), captured at
// the same 1440 × 900 framing as the live site, so the swipe lines up.
const archivedPair = (key: string, archived: string, { missingImages = false, from }: { missingImages?: boolean; from?: string } = {}): ComparePair => ({
  before: `/images/projects/${key}-before.jpg`,
  after: `/images/projects/${key}-desktop.jpg`,
  width: 1440,
  height: 900,
  archivedOn: archived,
  missingImages,
  archivedFrom: from,
})

// Measured with pagespeed.web.dev on Oct 25, 2026 (Lighthouse 13.5). Rerun the
// reports and update these numbers whenever you refresh the portfolio.
const MEASURED = 'Oct 25, 2026'
const speed = (report: string, mobile: SpeedScores, desktop: SpeedScores): PageSpeed => ({
  measured: MEASURED,
  report: `https://pagespeed.web.dev/analysis/${report}`,
  mobile,
  desktop,
})

export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'new-media-services',
    name: 'New Media Services',
    category: 'Web Design · UI/UX · Website Development',
    url: 'https://newmediaservices.com/',
    displayUrl: 'newmediaservices.com',
    images: shots('nms'),
    summary: 'A clearer website for a global outsourcing company.',
    story: [
      'I worked on both the design and the build here, taking the design concepts all the way to working pages.',
      'New Media Services covers a lot of ground, so most of my effort went into structure: tidy layouts, one consistent look from page to page, and information people can find without digging for it.',
    ],
    role: 'Web design, UI/UX and development',
    compare: comparePair('old.webp', 'v2.webp', 4833, 2934),
    pageSpeed: speed(
      'https-newmediaservices-com/4xjetz29vw',
      { performance: 39, accessibility: 98, bestPractices: 96, seo: 92, fcp: '4.5 s', lcp: '8.9 s', tbt: '810 ms', cls: '0', speedIndex: '8.8 s' },
      { performance: 68, accessibility: 98, bestPractices: 96, seo: 92, fcp: '1.0 s', lcp: '1.5 s', tbt: '460 ms', cls: '0.006', speedIndex: '2.4 s' },
    ),
  },
  {
    slug: 'integra-built',
    name: 'Integra Built',
    category: 'UI/UX · WordPress Development · Responsive Design',
    url: 'https://www.integra-built.com/',
    displayUrl: 'integra-built.com',
    images: localShot('integra'),
    summary: 'A construction website where asking for a quote is the obvious next step.',
    story: [
      'Integra Built does construction and remodeling. I helped build their site in WordPress from the design, and worked on how the pages lead people along.',
      'There are a lot of services to explain, so I kept the content well organized and the interface consistent on every screen size. Visitors can see what the company does and get to the quote form without going in circles.',
    ],
    role: 'UI/UX and WordPress development',
    tools: 'WordPress',
    compare: archivedPair('integra', 'Sep 2025', { missingImages: true }),
    pageSpeed: speed(
      'https-www-integra-built-com/cylwbeeiq5',
      { performance: 69, accessibility: 95, bestPractices: 100, seo: 100, fcp: '3.9 s', lcp: '5.2 s', tbt: '120 ms', cls: '0', speedIndex: '4.7 s' },
      { performance: 93, accessibility: 96, bestPractices: 100, seo: 100, fcp: '1.0 s', lcp: '1.3 s', tbt: '10 ms', cls: '0.001', speedIndex: '1.6 s' },
    ),
    seo: {
      checked: MEASURED,
      points: [
        'An SEO score of 100 in Google PageSpeed Insights, on mobile and desktop.',
        '60 pages in the XML sitemap, including 20 location pages for the towns it serves and a home building guide.',
        'Local business structured data, so search engines can read the company details.',
        "A search title and description that fit Google's usual limits.",
        'One main heading that says what the company does and where.',
        'Alt text on every image on the homepage, all 30 of them.',
      ],
    },
  },
  {
    slug: 'americas-fence-and-deck',
    name: 'America’s Fence & Deck',
    category: 'Web Design · UX Improvements · WordPress',
    url: 'https://www.americasfence.com/',
    displayUrl: 'americasfence.com',
    images: localShot('americasfence'),
    summary: 'Helping homeowners pick the right fence, then ask for an estimate.',
    story: [
      'I turned the website design into a working WordPress site for homeowners comparing fence and deck options.',
      'The focus was practical: service pages that are easy to read, layouts that are easy to follow, and an estimate button that is never far away, from the first look at the options to the request itself.',
    ],
    role: 'Web design, UX improvements and WordPress',
    tools: 'WordPress',
    // Before the rebrand the company was O'Fallon Warrenton Fence; that domain now redirects here.
    compare: archivedPair('americasfence', 'Jun 2023', { missingImages: true, from: 'ofallonwarrentonfence.com' }),
    pageSpeed: speed(
      'https-www-americasfence-com/x45jx3478h',
      { performance: 71, accessibility: 97, bestPractices: 100, seo: 100, fcp: '3.9 s', lcp: '4.6 s', tbt: '120 ms', cls: '0.06', speedIndex: '5.4 s' },
      { performance: 87, accessibility: 100, bestPractices: 100, seo: 100, fcp: '1.0 s', lcp: '1.4 s', tbt: '160 ms', cls: '0.023', speedIndex: '2.0 s' },
    ),
    seo: {
      checked: MEASURED,
      points: [
        'An SEO score of 100 in Google PageSpeed Insights, on mobile and desktop.',
        'Detailed local business structured data: address, phone, opening hours, map location, service areas, services and review rating.',
        'FAQ and breadcrumb structured data.',
        '73 pages in the XML sitemap, including 11 service-area pages and buying guides on permits, materials and costs.',
        "A search title and description that fit Google's usual limits, and one main heading that names the service area.",
      ],
    },
  },
  {
    slug: 'ja-fence',
    name: 'J&A Fence',
    category: 'UI/UX · WordPress Development · Content Layout',
    url: 'https://jafence.com/',
    displayUrl: 'jafence.com',
    images: localShot('jafence'),
    summary: 'Fence services that are easy to browse and easy to ask about.',
    story: [
      'I helped build the J&A Fence site from its design, and spent most of my time on the service pages and how they read.',
      'The aim was simple. Someone should be able to look through the fencing options, understand what J&A offers, and always see how to ask for a free estimate.',
    ],
    role: 'UI/UX, WordPress development and content layout',
    tools: 'WordPress',
    compare: archivedPair('jafence', 'Jan 2026'),
    pageSpeed: speed(
      'https-jafence-com/98dd45jmhw',
      { performance: 51, accessibility: 94, bestPractices: 100, seo: 100, fcp: '3.5 s', lcp: '14.3 s', tbt: '510 ms', cls: '0', speedIndex: '5.4 s' },
      { performance: 43, accessibility: 94, bestPractices: 100, seo: 100, fcp: '1.0 s', lcp: '4.6 s', tbt: '730 ms', cls: '0.103', speedIndex: '2.3 s' },
    ),
    seo: {
      checked: MEASURED,
      points: [
        'An SEO score of 100 in Google PageSpeed Insights, on mobile and desktop.',
        'Local business structured data with the address, phone, opening hours, service areas, services and the Pennsylvania contractor license number.',
        'FAQ and breadcrumb structured data.',
        '80 pages in the XML sitemap, including 16 service-area pages and blog guides on fence types and costs.',
        'Alt text on every image on the homepage, all 27 of them.',
        "A search title and description that fit Google's usual limits, and one main heading that names the service area.",
      ],
    },
  },
  {
    slug: 'gl-auto',
    name: 'G&L Auto',
    category: 'Web Design · User Experience · WordPress',
    url: 'https://glauto.ca/',
    displayUrl: 'glauto.ca',
    images: { ...shots('glauto'), desktop: '/images/projects/glauto-desktop.jpg' },
    summary: 'Helping drivers find the right service and get in touch with the shop.',
    story: [
      'G&L Auto offers repairs, towing and used parts. I helped turn the site design into a working WordPress website for people looking for any of those.',
      'Most of the work went into the service information: making it easy to scan, so a visitor can find the right service, check the details and contact the shop without wondering where to go next.',
    ],
    role: 'Web design, user experience and WordPress',
    tools: 'WordPress',
    compare: archivedPair('glauto', 'Sep 2025', { missingImages: true }),
    pageSpeed: speed(
      'https-glauto-ca/lqcj9mha3c',
      { performance: 67, accessibility: 100, bestPractices: 100, seo: 100, fcp: '3.8 s', lcp: '5.6 s', tbt: '210 ms', cls: '0', speedIndex: '3.8 s' },
      { performance: 86, accessibility: 100, bestPractices: 100, seo: 100, fcp: '1.2 s', lcp: '1.6 s', tbt: '180 ms', cls: '0', speedIndex: '1.4 s' },
    ),
    seo: {
      checked: MEASURED,
      points: [
        'An SEO score of 100 in Google PageSpeed Insights, on mobile and desktop.',
        "Auto repair structured data with the shop's address, phone and service area, plus FAQ structured data.",
        'A preview image for links shared on social media and in messaging apps.',
        "A search title and description that fit Google's usual limits, and one main heading that names the service and the town.",
        'An XML sitemap listing 22 pages.',
      ],
    },
  },
]

export const moreProjects: Project[] = [
  {
    slug: 'clean-space',
    name: 'Clean Space',
    category: 'Commercial Cleaning · WordPress',
    url: 'https://cleanspaceonline.com/',
    displayUrl: 'cleanspaceonline.com',
    images: shots('cleanspace'),
  },
  {
    slug: 'impact-cleaning',
    name: 'Impact Cleaning Services',
    category: 'Commercial Cleaning',
    url: 'https://impact.ca/',
    displayUrl: 'impact.ca',
    images: shots('impact'),
  },
  {
    slug: 'dm-tilt-n-load',
    name: 'D&M Tilt ’n Load Inc.',
    category: 'Transportation & Logistics',
    url: 'https://dmtiltnload.ca/',
    displayUrl: 'dmtiltnload.ca',
    images: shots('dm'),
  },
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

// Each featured project gets its own case study page at /work/<slug>.
export const caseStudyHref = (slug: string) => `/work/${slug}`
export const findCaseStudy = (slug: string) => featuredProjects.find((p) => p.slug === slug)

export const isDraft = (value: string) => /\[.*\]/.test(value)
