import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { caseStudyHref, featuredProjects } from './src/content/projects.ts'
import { caseStudyMeta, homeMeta, site } from './src/content/site.ts'

type Page = { path: string; title: string; description: string }

const pages: Page[] = [
  { path: '/', ...homeMeta },
  ...featuredProjects.map((p) => ({ path: caseStudyHref(p.slug), ...caseStudyMeta(p) })),
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Who the site belongs to, in the form Google reads for the name and profile links
// it shows in results.
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      jobTitle: site.role,
      url: `${site.url}/`,
      email: `mailto:${site.email}`,
      sameAs: site.social.map((s) => s.href).filter(Boolean),
      knowsAbout: ['Website design', 'WordPress development', 'Website maintenance', 'UI/UX design', 'Responsive web design'],
    },
    { '@type': 'WebSite', '@id': `${site.url}/#website`, url: `${site.url}/`, name: site.name, publisher: { '@id': `${site.url}/#person` } },
  ],
}

const headTags = (page: Page) => {
  const url = site.url + page.path
  return [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:image" content="${site.url}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(homeMeta.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

const block = (page: Page) => `<!-- seo -->\n    ${headTags(page)}\n    <!-- /seo -->`
const blockPattern = /<!-- seo -->[\s\S]*?<!-- \/seo -->/

// Writes each page's title, description, address and preview tags into its HTML.
// The home page fills index.html; every case study gets its own copy at
// /work/<slug>.html, which Netlify serves at /work/<slug>. sitemap.xml and
// robots.txt point Google at all of them.
function seo(): Plugin {
  return {
    name: 'seo',
    // After Vite's own HTML step, so index.html is in the bundle to copy from.
    enforce: 'post',
    transformIndexHtml: (html) => html.replace('<!-- seo -->', block(pages[0])),
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (index?.type !== 'asset') return
      const html = String(index.source)
      for (const page of pages.slice(1)) {
        this.emitFile({ type: 'asset', fileName: `${page.path.slice(1)}.html`, source: html.replace(blockPattern, block(page)) })
      }
      const urls = pages.map((p) => `  <url><loc>${site.url}${p.path}</loc></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n` })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
})
