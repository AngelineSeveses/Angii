import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { LockSimple } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import type { FeaturedProject, Screen } from '../content/projects'
import { canHover, color, ease, reducedMotion } from '../theme/tokens'
import { PhoneShell } from './DeviceShowcase'

type BrowserFrameProps = {
  url: string
  children: ReactNode
  // A control on the right of the toolbar, e.g. pause.
  action?: ReactNode
  // Smaller toolbar for the project cards.
  compact?: boolean
  className?: string
  sx?: SxProps<Theme>
}

// A desktop browser window: traffic lights, a locked address bar with the
// site's real address, then the page.
export function BrowserFrame({ url, children, action, compact = false, className, sx }: BrowserFrameProps) {
  const dot = compact ? { xs: 6, md: 8 } : { xs: 8, md: 11 }
  return (
    <Box
      className={className}
      sx={[
        { bgcolor: color.paper, borderRadius: compact ? { xs: '6px', md: '10px' } : { xs: '8px', md: '12px' }, overflow: 'hidden' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 2, md: 3 },
          height: compact ? { xs: 22, md: 30 } : { xs: 30, md: 40 },
          px: compact ? { xs: 2, md: 3 } : { xs: 2.5, md: 4 },
          bgcolor: '#F7F6F3',
          boxShadow: `inset 0 -1px 0 ${color.rule}`,
        }}
      >
        <Box aria-hidden sx={{ display: 'flex', gap: compact ? { xs: '4px', md: '5px' } : { xs: '5px', md: '7px' } }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <Box key={c} sx={{ width: dot, height: dot, borderRadius: '50%', bgcolor: c, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.14)' }} />
          ))}
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              width: '60%',
              minWidth: 0,
              height: compact ? { xs: 14, md: 20 } : { xs: 20, md: 26 },
              borderRadius: compact ? '5px' : '7px',
              bgcolor: 'rgba(14,14,14,0.05)',
              color: color.slate,
              fontSize: compact ? { xs: '0.5625rem', md: '0.6875rem' } : { xs: '0.6875rem', md: '0.8125rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <LockSimple size={compact ? 9 : 11} weight="bold" aria-hidden />
            {url}
          </Box>
        </Box>
        {action ?? <Box aria-hidden sx={{ width: dot, flexShrink: 0 }} />}
      </Box>
      {children}
    </Box>
  )
}

type HoverScreenProps = { shot: Screen; aspect: string; radius?: string; alt: string }

// easeInOutSine (easings.net): an even, readable pace for scrolling a page.
const readPace = 'cubic-bezier(0.37, 0, 0.63, 1)'

// A full-length capture shown from the top. While the pointer rests on the
// card around it (.project-card), it scrolls slowly to the bottom of the
// capture, and glides back when the pointer leaves. Not on touch screens or
// under reduced motion, where it simply shows the top.
function HoverScreen({ shot, aspect, radius = '0', alt }: HoverScreenProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: aspect,
        // cqh = a percent of this screen's height, so the image can stop exactly at its end.
        containerType: 'size',
        overflow: 'hidden',
        borderRadius: radius,
        bgcolor: color.paper,
        '& img': { transition: `transform 1100ms ${ease.out}` },
        [canHover]: {
          '.project-card:hover & img': { transform: 'translateY(calc(-100% + 100cqh))', transition: `transform 9s ${readPace} 150ms` },
        },
        [reducedMotion]: { '.project-card:hover & img': { transform: 'none' } },
      }}
    >
      <Box
        component="img"
        src={shot.src}
        alt={alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
        draggable={false}
        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', userSelect: 'none' }}
      />
    </Box>
  )
}

// A project's live homepage on a desktop browser and a phone, side by side on
// a soft tray. Both screens scroll while the pointer rests on the card.
export function ProjectMockup({ project }: { project: FeaturedProject }) {
  const screens = project.screens!
  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '16 / 11',
        borderRadius: { xs: '16px', md: '20px' },
        bgcolor: color.ivory,
        overflow: 'hidden',
      }}
    >
      <BrowserFrame
        compact
        url={project.displayUrl}
        sx={{
          position: 'absolute',
          left: '7%',
          top: '9%',
          width: '74%',
          boxShadow: '0 0 0 1px rgba(14,14,14,0.06), 0 18px 40px -22px rgba(14,14,14,0.45)',
        }}
      >
        <HoverScreen shot={screens.laptop} aspect="16 / 10" alt={`The ${project.name} homepage on a desktop browser.`} />
      </BrowserFrame>
      <Box sx={{ position: 'absolute', right: '7%', bottom: '-14%', width: '22%' }}>
        <PhoneShell>
          <HoverScreen shot={screens.phone} aspect="390 / 844" radius="12.4% / 5.75%" alt={`The ${project.name} homepage on a phone.`} />
        </PhoneShell>
      </Box>
    </Box>
  )
}
