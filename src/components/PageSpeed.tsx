import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import { ArrowUpRight } from '@phosphor-icons/react'
import type { PageSpeed, SpeedScores } from '../content/projects'
import { canHover, color, ease } from '../theme/tokens'

// Google's own bands: 90–100 good, 50–89 needs work, 0–49 poor. The dot uses
// the same colors as the PageSpeed report; the number always sits beside it,
// so the color is never the only signal.
const band = (score: number) => (score >= 90 ? '#0CCE6B' : score >= 50 ? '#FFA400' : '#FF4E42')

function Dot({ score }: { score: number }) {
  return <Box component="span" aria-hidden sx={{ width: 8, height: 8, borderRadius: '999px', bgcolor: band(score), flexShrink: 0 }} />
}

// Compact version for the project cards: speed on mobile and desktop.
export function SpeedBadges({ speed }: { speed: PageSpeed }) {
  const pill = (label: string, score: number) => (
    <Typography
      component="li"
      variant="caption"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, px: 3, py: 1.5, borderRadius: '999px', boxShadow: `inset 0 0 0 1px ${color.rule}`, color: color.ink }}
    >
      <Dot score={score} />
      {label}
      <Box component="span" sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
        {score}
      </Box>
      <Box component="span" sx={visuallyHidden}>
        out of 100
      </Box>
    </Typography>
  )
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mt: 4 }}>
      <Typography variant="caption" component="p" sx={{ m: 0, color: color.muted }} title={`Google PageSpeed Insights, tested ${speed.measured}`}>
        PageSpeed
      </Typography>
      <Box component="ul" aria-label={`PageSpeed performance scores, tested ${speed.measured}`} sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {pill('Mobile', speed.mobile.performance)}
        {pill('Desktop', speed.desktop.performance)}
      </Box>
    </Box>
  )
}

const scoreRows: { key: keyof SpeedScores; label: string }[] = [
  { key: 'performance', label: 'Performance' },
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'bestPractices', label: 'Best practices' },
  { key: 'seo', label: 'SEO' },
]

const timingRows: { key: keyof SpeedScores; label: string }[] = [
  { key: 'fcp', label: 'First Contentful Paint' },
  { key: 'lcp', label: 'Largest Contentful Paint' },
  { key: 'tbt', label: 'Total Blocking Time' },
  { key: 'cls', label: 'Cumulative Layout Shift' },
  { key: 'speedIndex', label: 'Speed Index' },
]

// Full results for a case study page.
export function SpeedReport({ speed, name }: { speed: PageSpeed; name: string }) {
  const cell = { py: 3, px: 0, textAlign: 'right' as const, fontVariantNumeric: 'tabular-nums', boxShadow: `inset 0 -1px 0 ${color.rule}` }
  const head = { ...cell, textAlign: 'left' as const, fontWeight: 400, color: color.slate }

  return (
    <Box
      component="section"
      aria-labelledby="speed-title"
      sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' }, columnGap: 6, rowGap: 10, mt: { xs: 16, md: 24 } }}
    >
      <Box sx={{ gridColumn: { md: 'span 4' } }}>
        <Typography variant="overline" component="p" sx={{ m: 0, color: color.muted }}>
          PageSpeed Insights
        </Typography>
        <Typography id="speed-title" variant="h3" component="h2" sx={{ mt: 2 }}>
          How the live site tests
        </Typography>
        <Typography variant="body2" sx={{ color: color.muted, mt: 4, maxWidth: 360 }}>
          Lab results from Google PageSpeed Insights, tested {speed.measured}. Scores change as a site&rsquo;s content,
          plugins and hosting change.
        </Typography>
        <Box
          component="a"
          href={speed.report}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View the full PageSpeed report for ${name} (opens in a new tab)`}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            mt: 6,
            color: color.ink,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: `inset 0 -1px 0 ${color.ruleStrong}`,
            '& svg': { transition: `transform 200ms ${ease.out}` },
            [canHover]: { '&:hover svg': { transform: 'translate(2px, -2px)' } },
          }}
        >
          View the full report
          <ArrowUpRight size={14} weight="bold" aria-hidden />
        </Box>
      </Box>

      <Box sx={{ gridColumn: { md: '6 / span 7' }, overflowX: 'auto' }}>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
          <Box component="caption" sx={visuallyHidden}>
            PageSpeed Insights results for {name}, mobile and desktop, tested {speed.measured}
          </Box>
          <thead>
            <tr>
              <Box component="th" scope="col" sx={{ ...head, color: color.muted }}>
                <Box component="span" sx={visuallyHidden}>
                  Measure
                </Box>
              </Box>
              <Box component="th" scope="col" sx={{ ...cell, fontWeight: 500, color: color.muted }}>
                Mobile
              </Box>
              <Box component="th" scope="col" sx={{ ...cell, fontWeight: 500, color: color.muted }}>
                Desktop
              </Box>
            </tr>
          </thead>
          <tbody>
            {scoreRows.map(({ key, label }) => (
              <tr key={key}>
                <Box component="th" scope="row" sx={head}>
                  {label}
                </Box>
                {(['mobile', 'desktop'] as const).map((device) => {
                  const score = speed[device][key] as number
                  return (
                    <Box component="td" key={device} sx={cell}>
                      <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontWeight: 600 }}>
                        <Dot score={score} />
                        {score}
                      </Box>
                    </Box>
                  )
                })}
              </tr>
            ))}
            {timingRows.map(({ key, label }) => (
              <tr key={key}>
                <Box component="th" scope="row" sx={head}>
                  {label}
                </Box>
                <Box component="td" sx={cell}>
                  {speed.mobile[key]}
                </Box>
                <Box component="td" sx={cell}>
                  {speed.desktop[key]}
                </Box>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>
    </Box>
  )
}
