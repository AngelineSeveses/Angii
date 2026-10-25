import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Section } from './components/Layout'
import { faqSchema } from './content/faqs'
import { findCaseStudy } from './content/projects'
import { InquiryProvider } from './context/InquiryProvider'
import { scrollToTarget, startSmoothScroll } from './motion/motion'
import { CaseStudy } from './pages/CaseStudy'
import { About, Faq } from './sections/About'
import { Process } from './sections/Approach'
import { ContactForm } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Work } from './sections/Work'
import { color } from './theme/tokens'

// Two kinds of page: the home page, and a case study at /work/<slug>.
const caseSlug = window.location.pathname.match(/^\/work\/([^/]+)\/?$/)?.[1]
const caseStudy = caseSlug ? findCaseStudy(decodeURIComponent(caseSlug)) : undefined

export default function App() {
  useEffect(() => {
    const stop = startSmoothScroll()
    // Arriving from a case study at /#contact or /#work: land on that section.
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) requestAnimationFrame(() => scrollToTarget(id, { immediate: true }))
    return stop
  }, [])

  return (
    <InquiryProvider>
      <Box id="top" />
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: 1300,
          px: 4,
          py: 2,
          borderRadius: '999px',
          bgcolor: color.ink,
          color: color.ivory,
          fontWeight: 600,
          textDecoration: 'none',
          transform: 'translateY(-200%)',
          '&:focus-visible': { transform: 'none' },
        }}
      >
        Skip to content
      </Box>
      <Header />
      <Box component="main" id="main" tabIndex={-1} sx={{ outline: 'none' }}>
        {caseStudy ? (
          <CaseStudy project={caseStudy} />
        ) : caseSlug ? (
          <NotFound />
        ) : (
          <>
            <Hero />
            <Work />
            <Services />
            <Process />
            <About />
            <Faq />
            <ContactForm />
          </>
        )}
      </Box>
      <Footer />
      {!caseSlug && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </InquiryProvider>
  )
}

function NotFound() {
  return (
    <Section labelledBy="missing-title" tone="ivory">
      <Typography id="missing-title" variant="h2" component="h1">
        This case study isn&rsquo;t here.
      </Typography>
      <Box component="a" href="/#work" sx={{ display: 'inline-block', mt: 6, color: color.ink, fontWeight: 500 }}>
        See all the work
      </Box>
    </Section>
  )
}
