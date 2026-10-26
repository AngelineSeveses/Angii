import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { ArrowUpRight, Pause, Play } from '@phosphor-icons/react'
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import type { DeviceScreens, Screen } from '../content/projects'
import { type ScreenKind, useScreenLoops } from '../hooks/useScreenLoops'
import { gsap, prefersReducedMotion } from '../motion/motion'
import { canHover, color, ease, gradient } from '../theme/tokens'

const bezel = '#0E0E0E'
const bezelEdge = '#2C2C2B'

type DeviceShowcaseProps = {
  screens: DeviceScreens
  name: string
  href: string
  label: string
}

// The case study's opening image: the live homepage on a laptop and a phone,
// each screen gliding from top to bottom and back on its own. The loops stop
// offscreen, while the pointer rests on the devices, and with the pause
// button. Under reduced motion nothing moves until the visitor presses play.
export function DeviceShowcase({ screens, name, href, label }: DeviceShowcaseProps) {
  const root = useRef<HTMLElement>(null)
  const [playing, setPlaying] = useState(() => !prefersReducedMotion())
  useScreenLoops(root, playing, '.ds-devices', screens)

  useLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.ds-tray', { autoAlpha: 0, y: 48, duration: 1.3 }, 0.25)
        .from('.ds-laptop', { y: 90, scale: 0.94, transformOrigin: '50% 100%', duration: 1.6 }, 0.35)
        .from('.ds-phone-body', { y: 160, autoAlpha: 0, duration: 1.6 }, 0.6)

      // A little depth on the way out: the phone drifts up faster than the laptop.
      gsap.to('.ds-phone', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 55%', end: 'bottom top', scrub: 0.6 },
      })
    }, el)
    return () => ctx.revert()
  }, [screens])

  return (
    <Box ref={root} component="figure" sx={{ m: 0 }}>
      <Box
        className="ds-tray"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: { xs: '20px', md: '32px' },
          background: gradient.stage,
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
          px: { xs: 5, sm: 10, md: 16 },
          pt: { xs: 10, sm: 12, md: 16 },
          pb: { xs: 16, sm: 18, md: 20 },
        }}
      >
        {/* Capped so the whole stage fits a 1280 × 800 laptop screen under the header. */}
        <Box className="ds-devices" sx={{ position: 'relative', maxWidth: 1000, mx: 'auto', pr: { xs: '15%', md: '11%' } }}>
          <Laptop>
            <ScrollingScreen kind="laptop" shot={screens.laptop} aspect="16 / 10" radius="3px" priority alt={`${name} homepage on a laptop.`} />
          </Laptop>
          <Box className="ds-phone" sx={{ position: 'absolute', right: 0, bottom: { xs: '-16%', md: '-11%' }, width: { xs: '29%', md: '21%' } }}>
            <Box className="ds-phone-body">
              <PhoneShell>
                <ScrollingScreen kind="phone" shot={screens.phone} aspect="390 / 844" radius="12.4% / 5.75%" alt={`${name} homepage on a phone.`} />
              </PhoneShell>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        component="figcaption"
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', columnGap: 6, rowGap: 3, mt: 4 }}
      >
        <Typography variant="body2" sx={{ color: color.muted, maxWidth: 560 }}>
          The live homepage at 1440px and 390px wide, captured {screens.captured}.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Pill
            onClick={() => setPlaying((p) => !p)}
            label={playing ? 'Pause the scrolling screens' : 'Play the scrolling screens'}
            icon={playing ? <Pause size={14} weight="fill" /> : <Play size={14} weight="fill" />}
          >
            {playing ? 'Pause' : 'Play'}
          </Pill>
          <Pill href={href} label={`Visit ${label} (opens in a new tab)`} icon={<ArrowUpRight size={14} weight="bold" />} iconEnd>
            {label}
          </Pill>
        </Box>
      </Box>
    </Box>
  )
}

// Plain geometry, no rendered artwork: lid, bezel, screen, and a base with a
// thumb notch. Padding percentages scale with the laptop's width.
function Laptop({ children }: { children: ReactNode }) {
  return (
    <Box className="ds-laptop">
      <Box
        sx={{
          position: 'relative',
          p: '2.2% 2.2% 3%',
          bgcolor: bezel,
          borderRadius: { xs: '10px 10px 3px 3px', md: '18px 18px 5px 5px' },
          boxShadow: `inset 0 0 0 1px ${bezelEdge}`,
        }}
      >
        <Box aria-hidden sx={{ position: 'absolute', top: '1%', left: '50%', width: 5, height: 5, ml: '-2.5px', borderRadius: '50%', bgcolor: bezelEdge }} />
        {children}
      </Box>
      <Box
        aria-hidden
        sx={{
          position: 'relative',
          mx: '-6.5%',
          height: { xs: 8, sm: 12, md: 16 },
          bgcolor: '#CFCDC6',
          borderRadius: { xs: '1px 1px 8px 8px', md: '2px 2px 14px 14px' },
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), 0 28px 36px -22px rgba(14,14,14,0.5)',
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: '50%', width: '15%', height: '45%', transform: 'translateX(-50%)', bgcolor: '#B9B7B0', borderRadius: '0 0 6px 6px' }} />
      </Box>
    </Box>
  )
}

// Outer corner 15% of the width; the screen's corner is that minus the bezel.
export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        p: '3.4%',
        bgcolor: bezel,
        borderRadius: '15% / 7.2%',
        boxShadow: `inset 0 0 0 1px ${bezelEdge}, 0 40px 60px -32px rgba(14,14,14,0.55), 0 4px 10px rgba(14,14,14,0.12)`,
      }}
    >
      {children}
    </Box>
  )
}

type ScrollingScreenProps = { kind: ScreenKind; shot: Screen; aspect: string; radius: string; alt: string; priority?: boolean }

// The full-length capture sits at the top of the screen; GSAP moves it.
// Without JavaScript it simply shows the first screen.
export function ScrollingScreen({ kind, shot, aspect, radius, alt, priority = false }: ScrollingScreenProps) {
  return (
    <Box data-screen={kind} sx={{ position: 'relative', aspectRatio: aspect, overflow: 'hidden', borderRadius: radius, bgcolor: color.paper }}>
      <Box
        component="img"
        src={shot.src}
        alt={alt}
        width={shot.width}
        height={shot.height}
        loading="eager"
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', willChange: 'transform', userSelect: 'none' }}
      />
    </Box>
  )
}

type PillProps = {
  children: ReactNode
  label: string
  icon: ReactNode
  iconEnd?: boolean
  href?: string
  onClick?: () => void
}

function Pill({ children, label, icon, iconEnd = false, href, onClick }: PillProps) {
  return (
    <ButtonBase
      {...(href ? { component: 'a' as const, href, target: '_blank', rel: 'noopener noreferrer' } : { onClick })}
      aria-label={label}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        px: 3,
        py: 1.5,
        borderRadius: '999px',
        fontSize: '0.8125rem',
        lineHeight: '18px',
        fontWeight: 500,
        color: color.ink,
        bgcolor: color.paper,
        boxShadow: `inset 0 0 0 1px ${color.rule}`,
        transition: `transform 160ms ${ease.out}, box-shadow 200ms ease`,
        '&:active': { transform: 'scale(0.97)' },
        '& svg': { transition: `transform 200ms ${ease.out}` },
        [canHover]: {
          '&:hover': { boxShadow: `inset 0 0 0 1px ${color.ink}` },
          ...(iconEnd && { '&:hover svg': { transform: 'translate(2px, -2px)' } }),
        },
      }}
    >
      {!iconEnd && <Box component="span" aria-hidden sx={{ display: 'flex' }}>{icon}</Box>}
      {children}
      {iconEnd && <Box component="span" aria-hidden sx={{ display: 'flex' }}>{icon}</Box>}
    </ButtonBase>
  )
}
