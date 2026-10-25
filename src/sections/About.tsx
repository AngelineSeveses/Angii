import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowRight, Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import { Btn } from '../components/Btn'
import { Section, SectionIndex } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { SplitWords } from '../components/SplitWords'
import { faqs } from '../content/faqs'
import { mailto, site } from '../content/site'
import { useInquiry } from '../context/inquiry'
import { canHover, color, ease, font } from '../theme/tokens'

const toolGroups = [
  { group: 'Design', tools: ['Figma', 'Adobe Photoshop'] },
  { group: 'Websites', tools: ['WordPress', 'Elementor'] },
  { group: 'Frontend', tools: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { group: 'Code & hosting', tools: ['Git', 'GitHub', 'Vercel', 'Firebase'] },
]

// The one dark section: who is behind the work, opened by a single line that
// fills in as you scroll. It starts legible, so nobody has to scroll to read it.
export function About() {
  const { startInquiry } = useInquiry()
  return (
    <Section id="about" labelledBy="about-title" tone="ink">
      <Reveal>
        <SectionIndex index="04" label="About" tone="ink" />
      </Reveal>
      <SplitWords
        id="about-title"
        mode="fill"
        dim={0.26}
        text="A little design, a little development, and a lot of figuring things out."
        sx={{
          m: 0,
          mt: { xs: 6, md: 8 },
          maxWidth: 1240,
          fontFamily: font.display,
          fontWeight: 400,
          fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '5.5rem' },
          lineHeight: 1,
          letterSpacing: '-0.045em',
          color: color.onInk,
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: 6,
          rowGap: 16,
          alignItems: 'start',
          mt: { xs: 16, md: 24 },
        }}
      >
        <Box sx={{ gridColumn: { md: 'span 6' } }}>
          {site.portrait && (
            <Reveal sx={{ mb: 10, maxWidth: 360 }}>
              <Box
                component="img"
                src={site.portrait}
                alt="Portrait of Angeline Seveses"
                sx={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: '20px' }}
              />
            </Reveal>
          )}
          <Typography
            component="h3"
            sx={{ m: 0, fontFamily: font.display, fontWeight: 400, fontSize: { xs: '1.75rem', md: '2.25rem' }, lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            Hi, I&rsquo;m Angeline.
          </Typography>
          <Typography variant="subtitle1" sx={{ color: color.onInk, mt: 6, maxWidth: 560 }}>
            I&rsquo;m a web designer and developer interested in the space between design, technology, and
            problem-solving.
          </Typography>
          <Typography sx={{ color: color.onInkMuted, mt: 4, maxWidth: 560 }}>
            I work on website design, WordPress development, and interactive web experiences, and I enjoy the research
            side too: testing a new tool, working through a technical problem, or prototyping an idea before it&rsquo;s
            built. I&rsquo;m open to working with businesses, agencies, and teams.
          </Typography>
          <Btn tone="light" onClick={() => startInquiry()} endIcon={<ArrowRight size={18} weight="bold" />} sx={{ mt: 10 }}>
            Get in touch
          </Btn>
        </Box>

        <Box sx={{ gridColumn: { md: '8 / span 5' } }}>
          <Typography variant="overline" component="h3" sx={{ m: 0, color: color.onInkMuted }}>
            Toolkit
          </Typography>
          <Box component="dl" sx={{ m: 0, mt: 4 }}>
            {toolGroups.map((g) => (
              <Box key={g.group} sx={{ py: { xs: 4, md: 5 }, boxShadow: `inset 0 1px 0 ${color.onInkRule}` }}>
                <Typography component="dt" variant="overline" sx={{ color: color.onInkMuted }}>
                  {g.group}
                </Typography>
                <Typography
                  component="dd"
                  sx={{ m: 0, mt: 1, fontFamily: font.display, fontSize: { xs: '1.5rem', md: '1.875rem' }, lineHeight: 1.15, letterSpacing: '-0.03em' }}
                >
                  {g.tools.join(', ')}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  )
}

export function Faq() {
  // The first answer starts open, which also shows the rest can be expanded.
  const [expanded, setExpanded] = useState<number | false>(0)
  return (
    <Section labelledBy="faq-title" tone="paper">
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
            <SectionIndex index="05" label="Questions" tone="paper" />
          </Reveal>
          <SplitWords id="faq-title" text="A few things you might want to know." sx={{ typography: 'h2', m: 0, mt: { xs: 4, md: 6 }, maxWidth: 520 }} />
          <Typography sx={{ color: color.muted, mt: 6 }}>
            Something else on your mind?{' '}
            <Box component="a" href={mailto} sx={{ color: color.ink, textUnderlineOffset: '3px', textDecorationColor: color.ruleStrong }}>
              Email me directly
            </Box>
            .
          </Typography>
        </Box>

        <Box sx={{ gridColumn: { md: '7 / span 6' }, display: 'grid', gap: 2 }}>
          {faqs.map((f, i) => (
            <Accordion
              key={f.q}
              expanded={expanded === i}
              onChange={(_, open) => setExpanded(open ? i : false)}
              slotProps={{ transition: { timeout: 250 }, heading: { component: 'h3' } }}
              sx={{ bgcolor: color.ivory, borderRadius: '16px', overflow: 'hidden', px: { xs: 5, md: 6 } }}
            >
              <AccordionSummary
                expandIcon={<Plus size={18} />}
                aria-controls={`faq-${i}-content`}
                id={`faq-${i}-header`}
                sx={{
                  px: 0,
                  py: 4,
                  minHeight: 0,
                  '& .MuiAccordionSummary-content': { m: 0, pr: 6 },
                  '& .MuiAccordionSummary-expandIconWrapper': { color: color.ink, transition: `transform 250ms ${ease.out}` },
                  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(45deg)' },
                  [canHover]: { '&:hover .faq-q': { color: color.slate } },
                }}
              >
                <Typography className="faq-q" variant="h5" component="span" sx={{ transition: 'color 200ms ease' }}>
                  {f.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pt: 0, pb: 6 }}>
                <Typography sx={{ color: color.slate, maxWidth: 560 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Section>
  )
}
