import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Section, SectionHeader } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { color, font } from '../theme/tokens'

// What working together feels like, one line each. The steps carry the detail,
// so these stay short enough to scan.
const promises = [
  'I think about the purpose first.',
  'I work across design and implementation.',
  "I'm comfortable figuring things out.",
  'I care about the details.',
  'I keep communication straightforward.',
]

const steps = [
  {
    title: 'Understand',
    body: "We discuss what you need, who the project is for, and what you're trying to achieve. I'll review any existing materials, requirements, or references.",
  },
  {
    title: 'Explore',
    body: "I'll look into possible approaches, organize the requirements, and work out the best direction for the project. Depending on the scope, this may include research, wireframes, or a small prototype.",
  },
  {
    title: 'Design & Build',
    body: "Once the direction is clear, I'll work on the design and implementation. The tools and approach depend on the project, whether it's a WordPress website, a landing page, or an interactive interface.",
  },
  {
    title: 'Test & Refine',
    body: "I'll review the work, check relevant screen sizes and interactions, and address issues within the agreed scope.",
  },
  {
    title: 'Handoff',
    body: "We'll review the completed work and go through the agreed deliverables and next steps.",
  },
]

const num = (i: number) => String(i + 1).padStart(2, '0')

export function Process() {
  return (
    <Section labelledBy="process-title" tone="paper">
      <SectionHeader
        index="03"
        label="Process"
        titleId="process-title"
        title="No unnecessary complications. Just a clear process."
        lead="The exact process depends on the project's size, requirements, and timeline."
      />

      {/* Steps sit as cards in one soft tray. */}
      <Box
        component="ol"
        sx={{
          listStyle: 'none',
          m: 0,
          p: { xs: 2, md: 3 },
          borderRadius: { xs: '20px', md: '28px' },
          bgcolor: color.ivory,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(5, minmax(0, 1fr))' },
          gap: { xs: 2, md: 3 },
        }}
      >
        {steps.map((s, i) => (
          <Reveal
            component="li"
            key={s.title}
            delay={i * 60}
            sx={{
              bgcolor: color.ivoryDeep,
              borderRadius: { xs: '14px', md: '20px' },
              p: { xs: 6, md: 7 },
              minHeight: { lg: 360 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 10,
              // The fifth card closes the row on two-column layouts.
              gridColumn: { sm: i === steps.length - 1 ? '1 / -1' : 'auto', lg: 'auto' },
            }}
          >
            <Box
              aria-hidden
              sx={{
                width: 40,
                height: 40,
                borderRadius: '999px',
                bgcolor: i === 0 ? color.accent : color.ink,
                color: color.ivory,
                display: 'grid',
                placeItems: 'center',
                fontSize: '0.8125rem',
                fontWeight: 500,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {num(i)}
            </Box>
            <Box>
              <Typography variant="h4" component="h3">
                {s.title}
              </Typography>
              <Typography variant="body2" sx={{ color: color.slate, mt: 3 }}>
                {s.body}
              </Typography>
            </Box>
          </Reveal>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: 6,
          rowGap: 6,
          mt: { xs: 20, md: 28 },
        }}
      >
        <Typography variant="overline" component="h3" sx={{ gridColumn: { md: 'span 4' }, color: color.muted, m: 0, pt: { md: 3 } }}>
          What you can expect
        </Typography>
        <Box component="ul" sx={{ gridColumn: { md: '5 / span 8' }, listStyle: 'none', m: 0, p: 0 }}>
          {promises.map((p) => (
            <Box
              component="li"
              key={p}
              sx={{
                py: { xs: 3, md: 4 },
                boxShadow: `inset 0 -1px 0 ${color.rule}`,
                fontFamily: font.display,
                fontSize: { xs: '1.5rem', md: '2.25rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              {p}
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  )
}
