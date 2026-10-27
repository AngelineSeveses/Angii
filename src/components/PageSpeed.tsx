import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import { ArrowUpRight } from '@phosphor-icons/react'
import type { PageSpeed, SpeedHighlight as ScorePick, SpeedScores } from '../content/projects'
import { quotedScore } from '../lib/pageSpeed'
import { canHover, color, ease, font } from '../theme/tokens'
import { SectionIndex } from './Layout'

// Google's own bands: 90–100 good, 50–89 needs work, 0–49 poor. The dot uses
// the same colors as the PageSpeed report; the number always sits beside it,
// so the color is never the only signal.
const band = (score: number) => (score >= 90 ? '#0CCE6B' : score >= 50 ? '#FFA400' : '#FF4E42')

function Dot({ score }: { score: number }) {
  return <Box component="span" aria-hidden sx={{ width: 8, height: 8, borderRadius: '999px', bgcolor: band(score), flexShrink: 0 }} />
}

const scoreGreen = '#008800'

// One score on a project card, e.g. "93/100 Desktop Performance", with where
// it comes from. A plain label, not a link: the full report is linked from the
// project's case study.
export function SpeedHighlight({ speed, pick, sx }: { speed: PageSpeed; pick?: ScorePick; sx?: SxProps<Theme> }) {
  const { score, device, category, tested } = quotedScore(speed, pick)
  const label = `${device} ${category}`
  const source = `Google PageSpeed Insights, tested ${tested}`
  return (
    <Box
      component="p"
      sx={[
        {
          display: 'inline-flex',
          alignItems: 'center',
          gap: { xs: 4, md: 5 },
          m: 0,
          mt: 6,
          py: 3,
          pl: { xs: 4, md: 5 },
          pr: { xs: 4, md: 5 },
          borderRadius: '18px',
          bgcolor: color.paper,
          color: color.ink,
          boxShadow: `inset 0 0 0 1px ${color.rule}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* The score in PageSpeed green (4.6:1 on white). */}
      <Box
        component="span"
        sx={{ fontFamily: font.display, fontSize: { xs: '2rem', md: '2.25rem' }, lineHeight: 1, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', color: scoreGreen }}
      >
        {score}
        <Box component="span" sx={{ fontSize: '0.5em', letterSpacing: '-0.01em', color: color.muted }}>
          /100
        </Box>
      </Box>
      <Box component="span" sx={{ display: 'grid', gap: 0.5 }}>
        <Box component="span" sx={{ fontWeight: 500, fontSize: '0.9375rem', lineHeight: 1.3 }}>
          {label}
        </Box>
        <Box component="span" sx={{ fontSize: '0.75rem', lineHeight: 1.35, color: color.muted }}>
          {source}
        </Box>
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
// index: the chapter number on a case study page, e.g. "05".
export function SpeedReport({ speed, name, index }: { speed: PageSpeed; name: string; index?: string }) {
  const cell = { py: 3, px: 0, textAlign: 'right' as const, fontVariantNumeric: 'tabular-nums', boxShadow: `inset 0 -1px 0 ${color.rule}` }
  const head = { ...cell, textAlign: 'left' as const, fontWeight: 400, color: color.slate }

  return (
    <Box
      component="section"
      aria-labelledby="speed-title"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
        columnGap: 6,
        rowGap: 10,
        mt: { xs: 16, md: 24 },
        ...(index && { pt: { xs: 8, md: 10 }, boxShadow: `inset 0 1px 0 ${color.rule}` }),
      }}
    >
      <Box sx={{ gridColumn: { md: 'span 4' } }}>
        {index ? (
          <SectionIndex index={index} label="PageSpeed Insights" />
        ) : (
          <Typography variant="overline" component="p" sx={{ m: 0, color: color.muted }}>
            PageSpeed Insights
          </Typography>
        )}
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
