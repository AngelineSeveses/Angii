import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Btn } from '../components/Btn'
import { Section, SectionHeader } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { site } from '../content/site'
import { color } from '../theme/tokens'

const entryFormat = [
  { label: 'The problem', hint: 'What I was trying to find out' },
  { label: 'The approach I tested', hint: 'How I set the experiment up' },
  { label: 'What worked', hint: 'And what did not' },
  { label: 'What I learned', hint: 'What I would do next time' },
]

const interests = ['JavaScript interactions', 'React interfaces', '3DVista customization', 'Design & dev workflow tools']

export function Research() {
  const hasLink = Boolean(site.experimentsHref)

  return (
    <Section labelledBy="rnd-title" tone="ink">
      <SectionHeader
        tone="ink"
        index="06"
        label="Experiments · Prototypes · Technical exploration"
        titleId="rnd-title"
        title="I'm always curious about how an idea could work."
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: 6,
          rowGap: 12,
        }}
      >
        <Box sx={{ gridColumn: { md: '4 / span 4' }, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Reveal>
            <Typography variant="subtitle1" sx={{ color: color.onInk }}>
              Some of the most interesting parts of digital work happen before the final result exists.
            </Typography>
          </Reveal>
          <Reveal delay={60}>
            <Typography sx={{ color: color.onInkMuted }}>
              I enjoy exploring new approaches, testing interactions, investigating technical limitations, and building
              small prototypes to see whether an idea is practical.
            </Typography>
          </Reveal>
          <Reveal delay={120}>
            <Typography sx={{ color: color.onInkMuted }}>
              I see research and development as a way to ask better questions, test assumptions, and learn what works
              before building something bigger.
            </Typography>
          </Reveal>
          <Reveal delay={180}>
            <Typography variant="overline" component="h3" sx={{ color: color.onInkMuted, mt: 4, mb: 3 }}>
              Current interests
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {interests.map((t) => (
                <Box
                  component="li"
                  key={t}
                  sx={{
                    fontSize: '0.875rem',
                    lineHeight: '20px',
                    color: color.onInk,
                    px: 3,
                    py: 1,
                    borderRadius: '4px',
                    boxShadow: `inset 0 0 0 1px ${color.onInkRule}`,
                  }}
                >
                  {t}
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>

        <Reveal delay={120} sx={{ gridColumn: { md: '9 / span 4' } }}>
          <Box
            component="figure"
            sx={{ m: 0, p: { xs: 4, sm: 6 }, borderRadius: '12px', bgcolor: color.inkRaised, boxShadow: `inset 0 0 0 1px ${color.onInkRule}` }}
          >
            <Typography variant="overline" component="figcaption" sx={{ color: color.brass, display: 'block' }}>
              Lab notebook · entry format
            </Typography>
            <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, mt: 6 }}>
              {entryFormat.map((row, i) => (
                <Box component="li" key={row.label} sx={{ py: 4, boxShadow: `inset 0 1px 0 ${color.onInkRule}` }}>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'baseline' }}>
                    <Typography variant="overline" component="span" sx={{ color: color.onInkMuted, minWidth: 24 }}>
                      {String(i + 1).padStart(2, '0')}
                    </Typography>
                    <Box>
                      <Typography variant="h5" component="span" sx={{ color: color.onInk, display: 'block' }}>
                        {row.label}
                      </Typography>
                      <Typography variant="body2" component="span" sx={{ color: color.onInkMuted }}>
                        {row.hint}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Typography variant="body2" sx={{ color: color.onInkMuted, mt: 2, pt: 4, boxShadow: `inset 0 1px 0 ${color.onInkRule}` }}>
              As I publish more experiments, this section will include the problem, the approach I tested, what worked,
              and what I learned.
            </Typography>
          </Box>

          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
            <Btn
              tone="light"
              href={hasLink ? site.experimentsHref : undefined}
              target={hasLink ? '_blank' : undefined}
              rel={hasLink ? 'noopener noreferrer' : undefined}
              disabled={!hasLink}
              endIcon={<ArrowUpRight size={18} weight="bold" />}
            >
              Explore My Experiments
            </Btn>
            {!hasLink && (
              <Typography variant="caption" sx={{ color: color.onInkMuted }}>
                Not published yet
              </Typography>
            )}
          </Box>
        </Reveal>
      </Box>
    </Section>
  )
}
