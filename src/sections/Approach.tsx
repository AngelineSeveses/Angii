import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Check } from '@phosphor-icons/react'
import { useState } from 'react'
import { Section, SectionHeader } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { color, ease, font, reducedMotion } from '../theme/tokens'

// What working together feels like, one line each. The steps carry the detail,
// so these stay short enough to scan.
const promises = [
  'Direct communication',
  'Thoughtful design decisions',
  'Attention to implementation details',
  'A clear understanding of the agreed scope',
  'A practical approach to solving problems',
]

const steps = [
  {
    title: 'Understand',
    body: "We discuss your business, your audience, what you need, and what isn't working. I'll review any existing website, requirements, and references.",
  },
  {
    title: 'Plan',
    body: "I'll organize the requirements and establish a direction for the project. Depending on the scope, this may include page planning, content structure, or wireframes.",
  },
  {
    title: 'Design & Build',
    body: "I'll work through the design and implementation based on the agreed scope, whether that's a new website, a WordPress build, or improvements to an existing site.",
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
    <Section id="process" labelledBy="process-title" tone="paper">
      <SectionHeader
        index="05"
        label="Process"
        titleId="process-title"
        title="Good work needs a clear process."
        lead="Every project is different, but I keep the process straightforward: understand the problem, agree on a direction, do the work, and refine it before handoff."
      />

      <Steps />

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
          What you can expect from me
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

// Steps sit as cards in one soft tray. Pointing at a step (or tapping it)
// lights it up and ticks off the steps before it, so the order reads as a path.
function Steps() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <Box
      component="ol"
      onPointerLeave={(e) => e.pointerType !== 'touch' && setActive(null)}
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
      {steps.map((s, i) => {
        const on = active === i
        const done = active !== null && i < active
        return (
          <Reveal
            component="li"
            key={s.title}
            delay={i * 60}
            sx={{
              display: 'flex',
              // The fifth card closes the row on two-column layouts.
              gridColumn: { sm: i === steps.length - 1 ? '1 / -1' : 'auto', lg: 'auto' },
            }}
          >
            <Box
              onPointerEnter={(e) => e.pointerType !== 'touch' && setActive(i)}
              onClick={() => setActive(i)}
              sx={{
                flex: 1,
                bgcolor: on ? color.accent : color.ivoryDeep,
                color: on ? color.onAccent : color.ink,
                borderRadius: { xs: '14px', md: '20px' },
                p: { xs: 6, md: 7 },
                minHeight: { lg: 360 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 10,
                transform: on ? 'translateY(-6px)' : 'none',
                boxShadow: on ? '0 28px 44px -28px rgba(43, 58, 247, 0.8)' : '0 0 0 rgba(43, 58, 247, 0)',
                transition: `background-color 300ms ease, color 300ms ease, box-shadow 300ms ease, transform 400ms ${ease.out}`,
                [reducedMotion]: { transform: 'none' },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: 'relative',
                  width: 40,
                  height: 40,
                  borderRadius: '999px',
                  bgcolor: on ? color.ivory : done || (active === null && i === 0) ? color.accent : color.ink,
                  color: on ? color.ink : color.ivory,
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                  transition: 'background-color 300ms ease, color 300ms ease',
                  '& > span': { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', transition: `opacity 200ms ease, transform 300ms ${ease.out}` },
                }}
              >
                <Box component="span" sx={{ opacity: done ? 0 : 1, transform: done ? 'scale(0.6)' : 'none' }}>
                  {num(i)}
                </Box>
                <Box component="span" sx={{ opacity: done ? 1 : 0, transform: done ? 'none' : 'scale(0.6)' }}>
                  <Check size={16} weight="bold" />
                </Box>
              </Box>
              <Box>
                <Typography variant="h4" component="h3" sx={{ color: 'inherit' }}>
                  {s.title}
                </Typography>
                <Typography variant="body2" sx={{ color: on ? 'rgba(241, 240, 236, 0.86)' : color.slate, mt: 3, transition: 'color 300ms ease' }}>
                  {s.body}
                </Typography>
              </Box>
            </Box>
          </Reveal>
        )
      })}
    </Box>
  )
}
