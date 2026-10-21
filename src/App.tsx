import Box from '@mui/material/Box'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InquiryProvider } from './context/inquiry'
import { About, Faq, faqSchema, Tools } from './sections/About'
import { Process, WhyMe } from './sections/Approach'
import { ContactForm, FinalCta } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'
import { Research } from './sections/Research'
import { Services } from './sections/Services'
import { Work } from './sections/Work'
import { color } from './theme/tokens'

export default function App() {
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
          borderRadius: '6px',
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
        <Hero />
        <Intro />
        <Work />
        <Services />
        <WhyMe />
        <Process />
        <Research />
        <About />
        <Tools />
        <Faq />
        <FinalCta />
        <ContactForm />
      </Box>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </InquiryProvider>
  )
}
