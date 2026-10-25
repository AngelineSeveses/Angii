import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { color } from '../theme/tokens'
import { Reveal } from './Reveal'
import { SplitWords } from './SplitWords'

export type Surface = 'ivory' | 'paper' | 'ink' | 'accent'

const surface: Record<Surface, { bg: string; fg: string; muted: string; rule: string }> = {
  ivory: { bg: color.ivory, fg: color.ink, muted: color.muted, rule: color.rule },
  paper: { bg: color.paper, fg: color.ink, muted: color.muted, rule: color.rule },
  ink: { bg: color.ink, fg: color.onInk, muted: color.onInkMuted, rule: color.onInkRule },
  accent: { bg: color.accent, fg: color.onAccent, muted: 'rgba(241, 240, 236, 0.74)', rule: 'rgba(241, 240, 236, 0.22)' },
}

// Content column with responsive gutters (16 / 24 / 40px).
export function Wrap({ children, sx }: { children: ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Box sx={[{ width: '100%', maxWidth: 1440, mx: 'auto', px: { xs: 4, sm: 6, lg: 10 } }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {children}
    </Box>
  )
}

type SectionProps = {
  id?: string
  labelledBy?: string
  tone?: Surface
  children: ReactNode
  sx?: SxProps<Theme>
}

export function Section({ id, labelledBy, tone = 'ivory', children, sx }: SectionProps) {
  const s = surface[tone]
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={labelledBy}
      data-surface={tone}
      sx={[
        { bgcolor: s.bg, color: s.fg, py: { xs: 20, md: 30 }, position: 'relative' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Wrap>{children}</Wrap>
    </Box>
  )
}

// "(01)  Selected work": the small label above each section title.
export function SectionIndex({ index, label, tone = 'ivory' }: { index: string; label: string; tone?: Surface }) {
  const s = surface[tone]
  return (
    <Typography variant="overline" component="p" sx={{ m: 0, display: 'flex', gap: 3, color: s.muted }}>
      <Box component="span" sx={{ color: s.fg, fontVariantNumeric: 'tabular-nums' }}>
        ({index})
      </Box>
      {label}
    </Typography>
  )
}

type SectionHeaderProps = {
  index: string
  label: string
  title: string
  titleId: string
  lead?: ReactNode
  tone?: Surface
  aside?: ReactNode
  // Small raised number after the title, e.g. how many projects follow.
  count?: number
}

// Big title on the left eight columns, the lead and any action on the right.
export function SectionHeader({ index, label, title, titleId, lead, tone = 'ivory', aside, count }: SectionHeaderProps) {
  const s = surface[tone]
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
        columnGap: 6,
        rowGap: 6,
        alignItems: 'end',
        mb: { xs: 12, md: 16 },
      }}
    >
      <Box sx={{ gridColumn: { md: 'span 8' } }}>
        <Reveal>
          <SectionIndex index={index} label={label} tone={tone} />
        </Reveal>
        <SplitWords
          id={titleId}
          text={title}
          suffix={count !== undefined ? <Count value={count} /> : undefined}
          sx={{ typography: 'h2', color: s.fg, m: 0, mt: { xs: 4, md: 6 }, maxWidth: 920 }}
        />
      </Box>
      {(lead || aside) && (
        <Box sx={{ gridColumn: { md: '9 / span 4' }, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
          {lead && (
            <Typography variant="subtitle1" component="div" sx={{ color: s.muted, maxWidth: 440 }}>
              {lead}
            </Typography>
          )}
          {aside}
        </Box>
      )}
    </Box>
  )
}

function Count({ value }: { value: number }) {
  return (
    <Box
      component="sup"
      sx={{ fontFamily: 'inherit', fontSize: '0.32em', letterSpacing: 0, verticalAlign: 'top', position: 'relative', top: '0.35em', ml: '0.2em' }}
    >
      ({String(value).padStart(2, '0')})
    </Box>
  )
}
