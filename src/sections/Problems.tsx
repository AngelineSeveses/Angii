import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowRight } from '@phosphor-icons/react'
import { Section, SectionIndex } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { SplitWords } from '../components/SplitWords'
import { ThinkingDoodle } from '../components/WaveDoodle'
import { color, font } from '../theme/tokens'

// Each card names a problem the visitor may recognise, then answers it.
const problems = [
  {
    label: 'An outdated website',
    question: 'Your business has moved forward. Has your website?',
    body: 'Your services have evolved, your brand has improved, but your website still feels like an older version of your business. It may not reflect the quality of your work or give potential customers a reason to trust you.',
    fix: "Let's bring your website up to date.",
    fixBody: 'Thoughtful design, clearer content, and a layout that better reflects your business today.',
  },
  {
    label: "Visitors aren't taking action",
    question: "People visit your website, but the enquiries aren't coming in.",
    body: 'When visitors struggle to understand what you offer, find the information they need, or figure out what to do next, they may leave without getting in touch.',
    fix: "Let's make the next step clearer.",
    fixBody: 'Better page structure, more useful content, and calls to action placed where they make sense.',
  },
  {
    label: "A website that's difficult to manage",
    question: 'Even small changes turn into a bigger job than they should be.',
    body: "Updating a service, replacing an image, or adding a new page shouldn't feel unnecessarily complicated. Your website should be practical to manage as your business changes.",
    fix: "Let's make your website easier to work with.",
    fixBody: 'A considered page structure, manageable layouts, and WordPress improvements suited to your needs.',
  },
  {
    label: "A design that doesn't work on every screen",
    question: "Your website looks fine on desktop. What about someone's phone?",
    body: 'Awkward spacing, difficult navigation, and inconsistent layouts can make your website frustrating to use on smaller screens.',
    fix: "Let's make the experience work across devices.",
    fixBody: 'Responsive layouts, clearer navigation, and attention to the details that matter on desktop and mobile.',
  },
  {
    label: 'Website issues that keep coming back',
    question: 'You need your website to work, not become another thing to worry about.',
    body: "Broken layouts, outdated plugins, display problems, and content that needs updating can build up when a website doesn't receive regular attention.",
    fix: "Let's keep your website in good shape.",
    fixBody: "Website updates, troubleshooting, maintenance, and improvements based on your website's needs.",
  },
]

const num = (i: number) => String(i + 1).padStart(2, '0')

// The title stays put on wide screens while the problems scroll past it.
export function Problems() {
  return (
    <Section labelledBy="problems-title" tone="paper">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: 6,
          rowGap: 12,
          alignItems: 'start',
        }}
      >
        <Box sx={{ gridColumn: { md: 'span 5' }, position: { md: 'sticky' }, top: { md: 112 } }}>
          <Reveal>
            <SectionIndex index="01" label="Common problems" tone="paper" />
          </Reveal>
          <SplitWords id="problems-title" text="Sounds familiar?" sx={{ typography: 'h2', m: 0, mt: { xs: 4, md: 6 } }} />
          <Typography variant="subtitle1" sx={{ color: color.muted, mt: 6, maxWidth: 440 }}>
            Your website is often the first impression people have of your business. If it isn&rsquo;t doing its job, it
            could be making it harder for the right people to choose you.
          </Typography>
          <ThinkingDoodle bg={color.paper} sx={{ width: { xs: 170, md: 220 }, mt: { xs: 10, md: 14 }, color: color.accent }} />
        </Box>

        <Box component="ol" sx={{ gridColumn: { md: '7 / span 6' }, listStyle: 'none', m: 0, p: 0, display: 'grid', gap: { xs: 3, md: 4 } }}>
          {problems.map((p, i) => (
            <Reveal
              component="li"
              key={p.label}
              sx={{ bgcolor: color.ivory, borderRadius: { xs: '20px', md: '28px' }, p: { xs: 2, md: 3 } }}
            >
              <Box sx={{ px: { xs: 4, md: 6 }, pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 8 } }}>
                <SectionIndex index={num(i)} label={p.label} />
                <Typography variant="h3" component="h3" sx={{ mt: { xs: 4, md: 5 }, maxWidth: 520 }}>
                  {p.question}
                </Typography>
                <Typography sx={{ color: color.slate, mt: 4, maxWidth: 560 }}>{p.body}</Typography>
              </Box>

              {/* The answer sits on its own white panel, so problem and fix read as a pair. */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  p: { xs: 5, md: 6 },
                  borderRadius: { xs: '14px', md: '20px' },
                  bgcolor: color.paper,
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: '999px',
                    bgcolor: color.accent,
                    color: color.onAccent,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <ArrowRight size={16} weight="bold" />
                </Box>
                <Box>
                  <Typography sx={{ fontFamily: font.display, fontSize: { xs: '1.25rem', md: '1.375rem' }, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                    {p.fix}
                  </Typography>
                  <Typography variant="body2" sx={{ color: color.slate, mt: 2 }}>
                    {p.fixBody}
                  </Typography>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  )
}
