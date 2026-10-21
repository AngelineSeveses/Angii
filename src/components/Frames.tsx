import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowUpRight } from '@phosphor-icons/react'
import { canHover, color, ease, reducedMotion } from '../theme/tokens'

type BrowserFrameProps = {
  src: string
  alt: string
  href: string
  label: string
  name: string
  dark?: boolean
  priority?: boolean
}

// A quiet browser frame. On hover it slowly scrolls the full length homepage
// screenshot inside the 16:10 viewport, so visitors can read the whole page.
export function BrowserFrame({ src, alt, href, label, name, dark = false, priority = false }: BrowserFrameProps) {
  const frameBg = dark ? color.inkRaised : color.ivoryDeep
  const ring = dark ? color.onInkRule : color.rule
  const meta = dark ? color.onInkMuted : color.muted

  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name}, open the live site in a new tab`}
      sx={{
        display: 'block',
        borderRadius: '12px',
        p: 2,
        pt: 0,
        bgcolor: frameBg,
        boxShadow: `inset 0 0 0 1px ${ring}`,
        color: 'inherit',
        textDecoration: 'none',
        '& .frame-shot': {
          transform: 'translateY(0)',
          transition: `transform 1100ms ${ease.out}`,
        },
        '& .frame-go': { transition: `transform 200ms ${ease.out}, opacity 200ms ease`, opacity: 0.6 },
        [canHover]: {
          '&:hover .frame-shot, &:focus-visible .frame-shot': {
            // 62.5cqw is the viewport height (16:10) in container units.
            transform: 'translateY(calc(-100% + 62.5cqw))',
            transition: 'transform 9s cubic-bezier(0.65, 0, 0.35, 1)',
          },
          '&:hover .frame-go': { transform: 'translate(2px, -2px)', opacity: 1 },
        },
        [reducedMotion]: {
          '&:hover .frame-shot, &:focus-visible .frame-shot': { transform: 'none' },
        },
      }}
    >
      <Box sx={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
        <Typography variant="caption" sx={{ color: meta, fontVariantNumeric: 'tabular-nums' }}>
          {label}
        </Typography>
        <Box className="frame-go" sx={{ display: 'flex', color: meta }}>
          <ArrowUpRight size={14} weight="bold" aria-hidden />
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          // outer 12px radius minus 8px inset
          borderRadius: '4px',
          containerType: 'inline-size',
          bgcolor: dark ? '#0B0F17' : color.paper,
        }}
      >
        <Box
          component="img"
          className="frame-shot"
          src={src}
          alt={alt}
          width={1200}
          height={5250}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sx={{ position: 'absolute', inset: '0 0 auto 0', width: '100%', height: 'auto' }}
        />
      </Box>
    </Box>
  )
}

type PhoneFrameProps = {
  src: string
  alt: string
  dark?: boolean
  priority?: boolean
  width?: number | string | Record<string, number>
}

export function PhoneFrame({ src, alt, dark = false, priority = false, width = 168 }: PhoneFrameProps) {
  return (
    <Box
      sx={{
        width,
        p: '6px',
        borderRadius: '28px',
        bgcolor: dark ? '#0B0F17' : color.ink,
        boxShadow: dark
          ? `inset 0 0 0 1px ${color.onInkRule}, 0 32px 64px -32px rgba(0,0,0,0.7)`
          : '0 32px 64px -32px rgba(17,24,39,0.45), 0 2px 4px rgba(17,24,39,0.08)',
      }}
    >
      <Box sx={{ borderRadius: '22px', overflow: 'hidden', aspectRatio: '780 / 1688', bgcolor: color.paper }}>
        <Box
          component="img"
          src={src}
          alt={alt}
          width={780}
          height={1688}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      </Box>
    </Box>
  )
}
