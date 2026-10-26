import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { mailto, nav, site } from '../content/site'
import { canHover, color, ease, font } from '../theme/tokens'
import { sectionHref } from '../lib/links'
import { Wrap } from './Layout'
import { LogoMark } from './Logo'
import { Marquee } from './Marquee'
import { WaveDoodle } from './WaveDoodle'

const linkSx = {
  color: color.onAccent,
  textDecoration: 'none',
  fontSize: '1rem',
  lineHeight: '24px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  transition: 'opacity 200ms ease',
  [canHover]: { '&:hover': { opacity: 0.72 } },
} as const

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box>
      <Typography variant="overline" component="h2" sx={{ color: color.lilac, m: 0, mb: 4 }}>
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
    <Box component="footer" sx={{ bgcolor: color.accent, color: color.onAccent, pt: { xs: 20, md: 28 }, overflow: 'hidden' }}>
      <Wrap>
        {/* The waving doodle sits beside the email from lg up, above it on smaller screens. */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', lg: 'row' },
            alignItems: { xs: 'flex-start', lg: 'flex-end' },
            justifyContent: 'space-between',
            gap: { xs: 8, lg: 12 },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" component="p" sx={{ m: 0, color: color.lilac }}>
              Have a project in mind?
            </Typography>
            <Box
              component="a"
              href={mailto}
              sx={{
                display: 'inline-block',
                mt: { xs: 4, md: 6 },
                color: color.onAccent,
                fontFamily: font.display,
                fontWeight: 400,
                // Sized so the address fits on one line at every width (375px up);
                // breaking it mid-word is only the fallback.
                fontSize: { xs: '1.625rem', sm: '3.25rem', lg: '4.5rem', xl: '5.25rem' },
                lineHeight: 1,
                letterSpacing: '-0.045em',
                overflowWrap: 'anywhere',
                textDecoration: 'underline',
                textDecorationThickness: '0.04em',
                textUnderlineOffset: '0.14em',
                textDecorationColor: 'rgba(241, 240, 236, 0.4)',
                transition: 'text-decoration-color 200ms ease',
                [canHover]: { '&:hover': { textDecorationColor: color.onAccent } },
              }}
            >
              {site.email}
            </Box>
          </Box>
          <WaveDoodle sx={{ width: { xs: 140, md: 180, lg: 220 }, flexShrink: 0, color: color.lilac }} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(12, minmax(0, 1fr))' },
            columnGap: 6,
            rowGap: 12,
            mt: { xs: 16, md: 24 },
          }}
        >
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 4' } }}>
            <Typography sx={{ fontFamily: font.display, fontSize: '1.5rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{site.name}</Typography>
            <Typography sx={{ color: color.lilac, mt: 1 }}>{site.role}</Typography>
            <Typography sx={{ color: color.onAccent, mt: 4, maxWidth: 320 }}>{site.tagline}</Typography>
          </Box>
          <Box sx={{ gridColumn: { md: '6 / span 2' } }}>
            <Column title="Navigation">
              {nav.map((n) => (
                <li key={n.id}>
                  <Box component="a" href={sectionHref(n.id)} sx={linkSx}>
                    {n.label}
                  </Box>
                </li>
              ))}
            </Column>
          </Box>
          <Box sx={{ gridColumn: { md: '8 / span 2' } }}>
            <Column title="Connect">
              {/* Only profiles with a real link are listed. */}
              {site.social
                .filter((s) => s.href)
                .map((s) => (
                  <li key={s.label}>
                    <Box
                      component="a"
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      sx={{
                        ...linkSx,
                        '& svg': { transition: `transform 200ms ${ease.out}` },
                        [canHover]: { '&:hover': { opacity: 0.72 }, '&:hover svg': { transform: 'translate(2px, -2px)' } },
                      }}
                    >
                      {s.label}
                      <ArrowUpRight size={14} weight="bold" aria-hidden />
                    </Box>
                  </li>
                ))}
            </Column>
          </Box>
          <Box sx={{ gridColumn: { xs: '1 / -1', md: '10 / span 3' } }}>
            <Column title="Email">
              <li>
                <Box component="a" href={mailto} sx={linkSx}>
                  {site.email}
                </Box>
              </li>
            </Column>
          </Box>
        </Box>
      </Wrap>

      {/* Speaks to the visitor rather than repeating the name. */}
      <Marquee seconds={48} sx={{ mt: { xs: 16, md: 24 } }}>
        {[0, 1].map((k) => (
          <Box key={k} sx={{ display: 'flex', alignItems: 'center', gap: '0.25em', pr: '0.25em', fontSize: { xs: '4rem', md: '9vw' }, color: color.lilac }}>
            <Box
              component="span"
              sx={{ fontFamily: font.display, fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.05em', whiteSpace: 'nowrap', pb: '0.06em' }}
            >
              Let&rsquo;s talk about your project
            </Box>
            <Box sx={{ width: '0.62em', color: color.onAccent, flexShrink: 0 }}>
              <LogoMark size="100%" />
            </Box>
          </Box>
        ))}
      </Marquee>

      <Wrap>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 4,
            py: 6,
            boxShadow: 'inset 0 1px 0 rgba(241, 240, 236, 0.22)',
          }}
        >
          <Typography variant="body2" sx={{ color: color.lilac }}>
            &copy; {site.year} {site.name}. All rights reserved.
          </Typography>
          <Box
            component="a"
            href="#top"
            sx={{
              ...linkSx,
              fontSize: '0.875rem',
              lineHeight: '20px',
              '& svg': { transition: `transform 200ms ${ease.out}` },
              [canHover]: { '&:hover': { opacity: 0.72 }, '&:hover svg': { transform: 'translateY(-2px)' } },
            }}
          >
            Back to Top
            <ArrowUp size={14} weight="bold" aria-hidden />
          </Box>
        </Box>
      </Wrap>
    </Box>
  )
}
