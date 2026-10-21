import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { color } from '../theme/tokens'
import { Reveal } from './Reveal'

export type Surface = 'ivory' | 'paper' | 'ink'

export const surface: Record<Surface, { bg: string; fg: string; muted: string; rule: string }> = {
  ivory: { bg: color.ivory, fg: color.ink, muted: color.muted, rule: color.rule },
  paper: { bg: color.paper, fg: color.ink, muted: color.muted, rule: color.rule },
  ink: { bg: color.ink, fg: color.onInk, muted: color.onInkMuted, rule: color.onInkRule },
}

// 1280px content column with responsive gutters (16 / 24 / 40px).
export function Wrap({ children, sx }: { children: ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Box sx={[{ width: '100%', maxWidth: 1360, mx: 'auto', px: { xs: 4, sm: 6, lg: 10 } }, ...(Array.isArray(sx) ? sx : [sx])]}>
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
        { bgcolor: s.bg, color: s.fg, py: { xs: 20, md: 24 }, position: 'relative' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Wrap>{children}</Wrap>
    </Box>
  )
}

// "04 —— Selected work" label used as the left rail of each section.
export function SectionIndex({ index, label, tone = 'ivory' }: { index: string; label: string; tone?: Surface }) {
  const s = surface[tone]
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Typography variant="overline" sx={{ color: s.fg, fontVariantNumeric: 'tabular-nums' }}>
        {index}
      </Typography>
      <Box aria-hidden sx={{ width: 24, height: '1px', bgcolor: s.rule }} />
      <Typography variant="overline" sx={{ color: s.muted }}>
        {label}
      </Typography>
    </Box>
  )
}

type SectionHeaderProps = {
  index: string
  label: string
  title: ReactNode
  titleId: string
  lead?: ReactNode
  tone?: Surface
  aside?: ReactNode
}

// Swiss style header: index rail on the left three columns, title on the right nine.
export function SectionHeader({ index, label, title, titleId, lead, tone = 'ivory', aside }: SectionHeaderProps) {
  const s = surface[tone]
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
        columnGap: 6,
        rowGap: 6,
        mb: { xs: 12, md: 20 },
      }}
    >
      <Reveal sx={{ gridColumn: { md: 'span 3' }, pt: { md: 3 } }}>
        <SectionIndex index={index} label={label} tone={tone} />
      </Reveal>
      <Box sx={{ gridColumn: { md: aside ? 'span 6' : '4 / span 8' } }}>
        <Reveal delay={60}>
          <Typography id={titleId} variant="h2" component="h2" sx={{ color: s.fg }}>
            {title}
          </Typography>
        </Reveal>
        {lead && (
          <Reveal delay={120}>
            <Typography variant="subtitle1" component="div" sx={{ color: s.muted, mt: 6, maxWidth: 640 }}>
              {lead}
            </Typography>
          </Reveal>
        )}
      </Box>
      {aside && (
        <Box sx={{ gridColumn: { md: 'span 3' }, display: 'flex', alignItems: 'flex-end', justifyContent: { md: 'flex-end' } }}>
          {aside}
        </Box>
      )}
    </Box>
  )
}
