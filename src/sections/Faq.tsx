import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import { Section, SectionIndex } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { SplitWords } from '../components/SplitWords'
import { faqs } from '../content/faqs'
import { mailto } from '../content/site'
import { canHover, color, ease } from '../theme/tokens'

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
            <SectionIndex index="06" label="FAQ" tone="paper" />
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
