import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Reveal } from '../components/Reveal'
import { Section, SectionIndex } from '../components/Layout'
import { WordReveal } from '../components/WordReveal'
import { color, font } from '../theme/tokens'

export function Intro() {
  return (
    <Section labelledBy="intro-title" tone="ivory" sx={{ pt: { xs: 16, md: 20 }, boxShadow: `inset 0 1px 0 ${color.rule}` }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: 6,
          rowGap: 8,
        }}
      >
        <Reveal sx={{ gridColumn: { md: 'span 3' }, pt: { md: 4 } }}>
          <SectionIndex index="01" label="Introduction" />
        </Reveal>

        <Box sx={{ gridColumn: { md: '4 / span 9' } }}>
          <WordReveal
            id="intro-title"
            component="h2"
            text="A little design, a little development, and a lot of figuring things out."
            from="rgba(17, 24, 39, 0.22)"
            to={color.ink}
            sx={{
              m: 0,
              maxWidth: 880,
              fontFamily: font.display,
              fontWeight: 500,
              letterSpacing: '-0.025em',
              fontSize: { xs: '1.875rem', sm: '2.25rem', lg: '3rem' },
              lineHeight: { xs: '36px', sm: '40px', lg: 1.08 },
            }}
          />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              columnGap: { xs: 6, lg: 12 },
              rowGap: 6,
              mt: { xs: 12, md: 16 },
              maxWidth: 880,
            }}
          >
            <Reveal sx={{ gridColumn: { sm: '1 / -1' } }}>
              <Typography variant="h4" component="p" sx={{ color: color.ink, maxWidth: 560 }}>
                I like working on projects where design and technology come together.
              </Typography>
            </Reveal>
            <Reveal delay={60}>
              <Typography sx={{ color: color.slate }}>
                Sometimes that means designing a website that makes a business easier to understand. Sometimes
                it&rsquo;s building a WordPress page, working on a JavaScript interaction, or figuring out how to make a
                virtual tour behave the way it should.
              </Typography>
            </Reveal>
            <Reveal delay={120}>
              <Typography sx={{ color: color.slate }}>
                I also enjoy the research side of things&mdash;trying different approaches, testing ideas, and learning
                how to solve problems instead of settling for the first solution.
              </Typography>
              <Typography sx={{ color: color.slate, mt: 4 }}>
                I care about making things look good, but I also want to understand how they work and whether they make
                sense for the people using them.
              </Typography>
            </Reveal>
          </Box>
        </Box>
      </Box>
    </Section>
  )
}
