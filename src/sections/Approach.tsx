import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Section, SectionHeader } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { useInView } from '../hooks/useInView'
import { color, ease } from '../theme/tokens'

const reasons = [
  {
    title: 'I think about the purpose first.',
    body: "Before getting into layouts or code, I want to understand what the project needs to do, who it's for, and what a good result should look like.",
  },
  {
    title: 'I can work across design and implementation.',
    body: 'My work covers website design, WordPress, frontend interactions, and virtual tours. I enjoy understanding how the visual design translates into the actual experience.',
  },
  {
    title: "I'm comfortable figuring things out.",
    body: 'Not every project has a ready-made solution. I research, test approaches, and work through technical problems to find a practical way forward.',
  },
  {
    title: 'I care about the details.',
    body: 'Small things matter: how a page behaves on mobile, whether a button does what people expect, how information is organized, and whether an interaction feels right.',
  },
  {
    title: 'I value straightforward communication.',
    body: "I prefer clear requirements, honest conversations, and sharing progress along the way. If something needs further investigation, I'd rather work that out early than make promises I can't support.",
  },
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
    body: "Once the direction is clear, I'll work on the design and implementation. The tools and approach depend on the project, whether it's a WordPress website, an interactive interface, or a 3DVista tour.",
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

export function WhyMe() {
  return (
    <Section labelledBy="why-title" tone="paper">
      <SectionHeader index="04" label="Why work with me?" titleId="why-title" title="I like understanding how things work, not just how they look." />
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, boxShadow: `inset 0 -1px 0 ${color.rule}` }}>
        {reasons.map((r, i) => (
          <Reveal
            component="li"
            key={r.title}
            delay={i * 40}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
              columnGap: 6,
              rowGap: 2,
              py: { xs: 6, md: 8 },
              boxShadow: `inset 0 1px 0 ${color.rule}`,
            }}
          >
            <Typography variant="overline" component="span" sx={{ gridColumn: { md: 'span 3' }, color: color.muted, pt: { md: 1 }, fontVariantNumeric: 'tabular-nums' }}>
              {num(i)}
            </Typography>
            <Typography variant="h4" component="h3" sx={{ gridColumn: { md: 'span 4' } }}>
              {r.title}
            </Typography>
            <Typography sx={{ gridColumn: { md: '8 / span 5' }, color: color.slate }}>{r.body}</Typography>
          </Reveal>
        ))}
      </Box>
    </Section>
  )
}

export function Process() {
  const [lineRef, drawn] = useInView<HTMLDivElement>({ rootMargin: '0px 0px -20% 0px' })
  return (
    <Section labelledBy="process-title" tone="ivory">
      <SectionHeader index="05" label="How I work" titleId="process-title" title="No unnecessary complications. Just a clear process." />

      <Box ref={lineRef} sx={{ position: 'relative' }}>
        {/* The connecting rule draws left to right once, explaining the sequence. */}
        <Box
          aria-hidden
          sx={{
            display: { xs: 'none', lg: 'block' },
            position: 'absolute',
            top: 3,
            left: 0,
            right: 0,
            height: '1px',
            bgcolor: color.ruleStrong,
            transformOrigin: 'left',
            transform: drawn ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform 1600ms ${ease.out}`,
            '@media (prefers-reduced-motion: reduce)': { transform: 'none', transition: 'none' },
          }}
        />
        <Box
          component="ol"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(5, minmax(0, 1fr))' },
            columnGap: 6,
            rowGap: { xs: 8, lg: 0 },
          }}
        >
          {steps.map((s, i) => (
            <Reveal component="li" key={s.title} delay={200 + i * 120} sx={{ position: 'relative' }}>
              <Box aria-hidden sx={{ width: 7, height: 7, bgcolor: i === 0 ? color.blueDeep : color.ink, borderRadius: '1px', mb: 6 }} />
              <Typography variant="overline" component="p" sx={{ color: color.muted, m: 0, fontVariantNumeric: 'tabular-nums' }}>
                {num(i)}
              </Typography>
              <Typography variant="h4" component="h3" sx={{ mt: 1 }}>
                {s.title}
              </Typography>
              <Typography variant="body2" sx={{ color: color.slate, mt: 3, maxWidth: 320 }}>
                {s.body}
              </Typography>
            </Reveal>
          ))}
        </Box>
      </Box>

      <Reveal>
        <Typography variant="caption" component="p" sx={{ color: color.muted, m: 0, pt: { xs: 12, md: 16 } }}>
          The exact process depends on the project&rsquo;s size, requirements, and timeline.
        </Typography>
      </Reveal>
    </Section>
  )
}
