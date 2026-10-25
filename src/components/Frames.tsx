import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowUpRight } from '@phosphor-icons/react'
import { canHover, color, ease } from '../theme/tokens'

type ProjectShotProps = {
  src: string
  alt: string
  href: string
  label: string
  name: string
  // Text on the dark pill, e.g. "Read more" for a case study link.
  action?: string
  // Width / height of the frame. The screenshot is cropped from the top.
  aspect?: string
}

// A still screenshot in a rounded frame. External links open in a new tab;
// a case study link stays in the page.
export function ProjectShot({ src, alt, href, label, name, action = 'Open live site', aspect = '16 / 10' }: ProjectShotProps) {
  const external = /^https?:/.test(href)
  return (
    <Box
      component="a"
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      aria-label={external ? `${name}, open the live site in a new tab` : `${name}: ${action.toLowerCase()}`}
      sx={{
        display: 'block',
        position: 'relative',
        aspectRatio: aspect,
        overflow: 'hidden',
        borderRadius: { xs: '14px', md: '20px' },
        bgcolor: color.ivoryDeep,
        color: 'inherit',
        textDecoration: 'none',
        '& .shot-img': { transition: `transform 700ms ${ease.out}` },
        '& .shot-go': { transition: `transform 200ms ${ease.out}` },
        [canHover]: {
          '&:hover .shot-img': { transform: 'scale(1.025)' },
          '&:hover .shot-go': { transform: 'translate(2px, -2px)' },
        },
      }}
    >
      <Box
        component="img"
        className="shot-img"
        src={src}
        alt={alt}
        width={1440}
        height={900}
        loading="lazy"
        decoding="async"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 10, md: 16 },
          left: { xs: 10, md: 16 },
          right: { xs: 10, md: 16 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          pointerEvents: 'none',
        }}
      >
        <Typography
          variant="caption"
          sx={{ px: 3, py: 1.5, borderRadius: '999px', bgcolor: 'rgba(241, 240, 236, 0.92)', color: color.ink, backdropFilter: 'blur(8px)' }}
        >
          {label}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 3,
            py: 1.5,
            borderRadius: '999px',
            bgcolor: 'rgba(14, 14, 14, 0.82)',
            color: color.onInk,
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography variant="caption" component="span" aria-hidden>
            {action}
          </Typography>
          <Box className="shot-go" sx={{ display: 'flex' }}>
            <ArrowUpRight size={14} weight="bold" aria-hidden />
          </Box>
        </Box>
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
        bgcolor: dark ? '#0B0B0B' : color.ink,
        boxShadow: dark
          ? `inset 0 0 0 1px ${color.onInkRule}, 0 32px 64px -32px rgba(0,0,0,0.7)`
          : '0 24px 48px -28px rgba(14,14,14,0.45), 0 2px 4px rgba(14,14,14,0.08)',
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
