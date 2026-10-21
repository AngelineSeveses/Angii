import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { nav, site } from '../content/site'
import { canHover, color, ease, font } from '../theme/tokens'
import { Wrap } from './Layout'

const linkSx = {
  color: color.onInk,
  textDecoration: 'none',
  fontSize: '1rem',
  lineHeight: '24px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  transition: 'color 200ms ease',
  [canHover]: { '&:hover': { color: color.onInkMuted } },
} as const

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box>
      <Typography variant="overline" component="h2" sx={{ color: color.onInkMuted, m: 0, mb: 4 }}>
        {title}
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 2 }}>
        {children}
      </Box>
    </Box>
  )
}

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: color.ink, color: color.onInk, pt: { xs: 20, md: 24 }, pb: 10 }}>
      <Wrap>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(12, minmax(0, 1fr))' },
            columnGap: 6,
            rowGap: 12,
            pb: { xs: 16, md: 20 },
          }}
        >
          <Box sx={{ gridColumn: { sm: '1 / -1', md: '1 / span 4' } }}>
            <Typography sx={{ fontFamily: font.display, fontWeight: 500, fontSize: { xs: '1.875rem', md: '2.25rem' }, lineHeight: { xs: '36px', md: '40px' }, letterSpacing: '-0.02em' }}>
              {site.name}
            </Typography>
            <Typography sx={{ color: color.brass, mt: 1 }}>{site.role}</Typography>
            <Typography sx={{ color: color.onInkMuted, mt: 6, maxWidth: 360 }}>
              Websites, interactive experiences, virtual tours, and digital experiments.
            </Typography>
          </Box>

          <Box sx={{ gridColumn: { md: '6 / span 2' } }}>
            <Column title="Navigation">
              {nav.map((n) => (
                <li key={n.id}>
                  <Box component="a" href={`#${n.id}`} sx={linkSx}>
                    {n.label}
                  </Box>
                </li>
              ))}
            </Column>
          </Box>

          <Box sx={{ gridColumn: { md: 'span 2' } }}>
            <Column title="Elsewhere">
              {site.social.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <Box component="a" href={s.href} target="_blank" rel="noopener noreferrer" sx={linkSx}>
                      {s.label}
                      <ArrowUpRight size={14} weight="bold" aria-hidden />
                    </Box>
                  ) : (
                    <Box component="span" sx={{ ...linkSx, color: color.onInkMuted }} title="Profile link coming soon">
                      {s.label}
                    </Box>
                  )}
                </li>
              ))}
            </Column>
          </Box>

          <Box sx={{ gridColumn: { md: '10 / span 3' } }}>
            <Column title="Email">
              <li>
                <Box component="a" href={`mailto:${site.email}`} sx={{ ...linkSx, overflowWrap: 'anywhere' }}>
                  {site.email}
                </Box>
              </li>
            </Column>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            pt: 6,
            boxShadow: `inset 0 1px 0 ${color.onInkRule}`,
          }}
        >
          <Typography variant="body2" sx={{ color: color.onInkMuted }}>
            &copy; {site.year} {site.name}. All rights reserved.
          </Typography>
          <Box
            component="a"
            href="#top"
            sx={{
              ...linkSx,
              fontSize: '0.875rem',
              lineHeight: '20px',
              color: color.onInkMuted,
              '& svg': { transition: `transform 200ms ${ease.out}` },
              [canHover]: { '&:hover': { color: color.onInk }, '&:hover svg': { transform: 'translateY(-2px)' } },
            }}
          >
            Back to top
            <ArrowUp size={14} weight="bold" aria-hidden />
          </Box>
        </Box>
      </Wrap>
    </Box>
  )
}
