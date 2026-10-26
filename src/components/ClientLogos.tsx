import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import type { SxProps, Theme } from '@mui/material/styles'
import { featuredProjects } from '../content/projects'
import { canHover, color } from '../theme/tokens'
import { Marquee } from './Marquee'

const clients = featuredProjects.filter((p) => p.logo)

// The clients' own logos in one slow gray band. Each logo turns back to its
// colors under the pointer, and the band pauses while the pointer is on it.
// The band is decorative; screen readers get the names as a plain list.
export function ClientLogos({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      sx={[
        { display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, gap: { xs: 4, md: 8 } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant="body2" component="p" id="clients-label" sx={{ m: 0, color: color.muted, flexShrink: 0 }}>
        Recent websites for
      </Typography>
      <Box component="ul" aria-labelledby="clients-label" sx={visuallyHidden}>
        {clients.map((p) => (
          <li key={p.slug}>{p.name}</li>
        ))}
      </Box>
      <Marquee
        seconds={36}
        pauseOnHover
        sx={{
          flex: 1,
          minWidth: 0,
          // Logos fade in and out at the edges instead of being cut off.
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        {/* Two sets per pass, so the band is always wider than the space it fills. */}
        {[0, 1].map((set) =>
          clients.map((p) => (
            <Box
              key={`${set}-${p.slug}`}
              component="img"
              src={p.logo!.src}
              alt=""
              width={p.logo!.width}
              height={p.logo!.height}
              loading="lazy"
              decoding="async"
              draggable={false}
              sx={{
                display: 'block',
                height: p.logo!.display,
                width: 'auto',
                mx: { xs: 6, md: 8 },
                alignSelf: 'center',
                // Gray on the page; white parts of a logo melt into the canvas.
                filter: 'grayscale(1) contrast(1.15)',
                opacity: 0.55,
                mixBlendMode: 'multiply',
                transition: 'filter 300ms ease, opacity 300ms ease',
                [canHover]: { '&:hover': { filter: 'none', opacity: 1 } },
              }}
            />
          )),
        )}
      </Marquee>
    </Box>
  )
}
