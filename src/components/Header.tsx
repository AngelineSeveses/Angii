import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { ArrowUpRight } from '@phosphor-icons/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { nav, mailto, site, type NavId } from '../content/site'
import { useInquiry } from '../context/inquiry'
import { useActiveSection } from '../hooks/useActiveSection'
import { sectionHref } from '../lib/links'
import { pauseScroll } from '../motion/motion'
import { canHover, color, ease, font, reducedMotion } from '../theme/tokens'
import { Btn, Bubble } from './Btn'
import { Wrap } from './Layout'

const navIds = nav.map((n) => n.id)

// The name is the logo: set in the display face, a size up from the nav, tightly tracked.
export function Wordmark({ tone = 'ink' }: { tone?: 'ink' | 'ivory' }) {
  return (
    <Typography
      component="span"
      sx={{
        fontFamily: font.display,
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: '28px',
        letterSpacing: '-0.04em',
        color: tone === 'ink' ? color.ink : color.onInk,
        whiteSpace: 'nowrap',
      }}
    >
      {site.name}
    </Typography>
  )
}

// A full-width white bar that stays at the top: name on the left, links in
// the middle, the call to action on the right. A hairline marks its edge at
// the top of the page; once the page scrolls under it, a soft shadow takes over.
export function Header() {
  const active = useActiveSection<NavId>(navIds)
  const { startInquiry } = useInquiry()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 8))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1200,
          height: 'var(--header-h)',
          bgcolor: color.paper,
          boxShadow: scrolled ? barShadow.raised : barShadow.rest,
          transition: 'box-shadow 300ms ease',
        }}
      >
        <Wrap
          sx={{
            height: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr auto', md: '1fr auto 1fr' },
            alignItems: 'center',
            columnGap: 4,
          }}
        >
          <Box
            component="a"
            href={sectionHref('top')}
            aria-label={`${site.name}, back to top`}
            onClick={() => setOpen(false)}
            sx={{ justifySelf: 'start', textDecoration: 'none', display: 'flex', alignItems: 'center', borderRadius: '8px' }}
          >
            <Wordmark />
          </Box>

          <NavLinks active={active} />

          <Box sx={{ justifySelf: 'end', display: 'flex', alignItems: 'center' }}>
            {/* The one blue thing in the bar: the action, kept apart from the
                dark pill that marks where you are. */}
            <Btn
              tone="accent"
              size="sm"
              onClick={() => startInquiry()}
              endIcon={
                <Bubble tone="ivory" size={30}>
                  <SwapArrow />
                </Bubble>
              }
              sx={{ display: { xs: 'none', md: 'inline-flex' }, pl: 5, pr: '5px', py: '5px', gap: 3, ...swapOnHover }}
            >
              Let&rsquo;s Talk
            </Btn>
            <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
          </Box>
        </Wrap>
      </Box>
      <MobileMenu open={open} onClose={close} active={active} />
    </>
  )
}

const barShadow = {
  rest: `0 1px 0 ${color.rule}`,
  raised: `0 1px 0 ${color.rule}, 0 12px 28px -18px rgba(10, 16, 90, 0.28)`,
}

// The phone menu card floats a little off the page, like a sheet.
const cardShadow = '0 0 0 1px rgba(14, 14, 14, 0.06), 0 1px 2px rgba(10, 16, 90, 0.08), 0 24px 48px -20px rgba(10, 16, 90, 0.4)'

// The arrow in the call to action leaves up and to the right on hover while
// a second one slides in from the bottom left, so it reads as "go".
function SwapArrow({ size = 14 }: { size?: number }) {
  const arrow = { position: 'absolute', inset: 0, display: 'flex', transition: `transform 240ms ${ease.out}` } as const
  return (
    <Box component="span" sx={{ position: 'relative', display: 'block', width: size, height: size, overflow: 'hidden' }}>
      <Box component="span" className="swap-out" sx={arrow}>
        <ArrowUpRight size={size} weight="bold" />
      </Box>
      <Box component="span" className="swap-in" sx={{ ...arrow, transform: 'translate(-110%, 110%)' }}>
        <ArrowUpRight size={size} weight="bold" />
      </Box>
    </Box>
  )
}

const swapOnHover = {
  // Btn nudges end icons on hover; the swap replaces that here.
  '&:hover .MuiButton-endIcon svg': { transform: 'none' },
  [canHover]: {
    '&:hover .swap-out': { transform: 'translate(110%, -110%)' },
    '&:hover .swap-in': { transform: 'none' },
  },
  [reducedMotion]: { '& .swap-out, & .swap-in': { transition: 'none' } },
} as const

const linkText = {
  display: 'block',
  px: 4,
  py: 2,
  fontSize: '0.875rem',
  lineHeight: '20px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
} as const

// The links, with one dark pill that marks where you are: it rests on the
// section you're reading and slides to whichever link the pointer is over.
// The pill is a second, dark copy of the links clipped to one link's shape,
// so the text color flips exactly at its edge and only clip-path animates.
function NavLinks({ active }: { active: NavId | null }) {
  const list = useRef<HTMLUListElement>(null)
  const [hovered, setHovered] = useState<NavId | null>(null)
  const [spans, setSpans] = useState<Partial<Record<NavId, { left: number; right: number }>>>({})
  const [lastClip, setLastClip] = useState('inset(0 50% 0 50% round 999px)')

  // Measured by a ResizeObserver: it fires once when observing starts, and
  // again when the web font arrives and the links change width.
  useEffect(() => {
    const ul = list.current
    if (!ul) return
    const ro = new ResizeObserver(() => {
      const width = ul.offsetWidth
      const next: Partial<Record<NavId, { left: number; right: number }>> = {}
      ul.querySelectorAll<HTMLElement>('[data-id]').forEach((a) => {
        next[a.dataset.id as NavId] = { left: a.offsetLeft, right: width - a.offsetLeft - a.offsetWidth }
      })
      setSpans(next)
    })
    ro.observe(ul)
    return () => ro.disconnect()
  }, [])

  const target = hovered ?? active
  const span = target ? spans[target] : undefined
  const clip = span ? `inset(0 ${span.right}px 0 ${span.left}px round 999px)` : lastClip
  // Remember the last position, so the pill fades out where it was instead of jumping.
  if (span && clip !== lastClip) setLastClip(clip)

  return (
    <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', md: 'block' } }}>
      <Box sx={{ position: 'relative' }} onPointerLeave={() => setHovered(null)}>
        <Box component="ul" ref={list} sx={{ display: 'flex', listStyle: 'none', m: 0, p: 0 }}>
          {nav.map((item) => (
            <li key={item.id}>
              <Box
                component="a"
                data-id={item.id}
                href={sectionHref(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                onPointerEnter={() => setHovered(item.id)}
                onFocus={() => setHovered(item.id)}
                onBlur={() => setHovered(null)}
                sx={{ ...linkText, color: color.slate, textDecoration: 'none', borderRadius: '999px' }}
              >
                {item.label}
              </Box>
            </li>
          ))}
        </Box>
        <Box
          component="ul"
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            listStyle: 'none',
            m: 0,
            p: 0,
            pointerEvents: 'none',
            bgcolor: color.ink,
            color: color.ivory,
            borderRadius: '999px',
            clipPath: clip,
            opacity: span ? 1 : 0,
            transition: `clip-path 260ms ${ease.out}, opacity 160ms ease`,
            [reducedMotion]: { transition: 'opacity 160ms ease' },
          }}
        >
          {nav.map((item) => (
            <Box component="li" key={item.id} sx={linkText}>
              {item.label}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const line = {
    position: 'absolute',
    left: 13,
    width: 14,
    height: '1.5px',
    borderRadius: 1,
    bgcolor: color.ivory,
    top: '50%',
    transition: `transform 400ms ${ease.out}`,
  } as const
  return (
    <ButtonBase
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? 'Close menu' : 'Open menu'}
      sx={{
        display: { xs: 'inline-flex', md: 'none' },
        position: 'relative',
        width: 40,
        height: 40,
        borderRadius: '50%',
        bgcolor: color.ink,
        transition: `transform 160ms ${ease.out}`,
        '&:active': { transform: 'scale(0.94)' },
      }}
    >
      <Box component="span" sx={{ ...line, transform: open ? 'translateY(-50%) rotate(45deg)' : 'translateY(calc(-50% - 3px))' }} />
      <Box component="span" sx={{ ...line, transform: open ? 'translateY(-50%) rotate(-45deg)' : 'translateY(calc(-50% + 3px))' }} />
    </ButtonBase>
  )
}

// On phones the menu opens as a white card just below the bar, anchored to
// the menu button, over a dimmed page. Tap outside or press Escape to close.
function MobileMenu({ open, onClose, active }: { open: boolean; onClose: () => void; active: NavId | null }) {
  const firstLink = useRef<HTMLAnchorElement>(null)
  const { startInquiry } = useInquiry()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    pauseScroll(true)
    firstLink.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const mq = window.matchMedia('(min-width: 900px)')
    const onWide = () => mq.matches && onClose()
    mq.addEventListener('change', onWide)
    return () => {
      document.body.style.overflow = prev
      pauseScroll(false)
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
    }
  }, [open, onClose])

  // Opening eases in over 260ms; closing is quicker, so it gets out of the way.
  const show = (ms: number, delay = 0) => (open ? `${ms}ms ${ease.out} ${delay}ms` : `160ms ${ease.out}`)

  return (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <Box
        aria-hidden
        onClick={onClose}
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1100,
          bgcolor: 'rgba(14, 14, 14, 0.36)',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: open ? 'opacity 260ms ease, visibility 0s' : 'opacity 160ms ease, visibility 0s 160ms',
        }}
      />
      <Box
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        data-lenis-prevent
        sx={{
          position: 'fixed',
          zIndex: 1150,
          top: 'calc(var(--header-h) + 8px)',
          left: { xs: '16px', sm: '24px' },
          right: { xs: '16px', sm: '24px' },
          maxHeight: 'calc(100svh - var(--header-h) - 24px)',
          overflowY: 'auto',
          bgcolor: color.paper,
          borderRadius: '28px',
          boxShadow: cardShadow,
          p: 2,
          transformOrigin: 'top right',
          opacity: open ? 1 : 0,
          transform: open ? 'none' : 'translateY(-8px) scale(0.97)',
          visibility: open ? 'visible' : 'hidden',
          transition: `opacity ${show(260)}, transform ${show(260)}, visibility 0s ${open ? 0 : 160}ms`,
          [reducedMotion]: { transform: 'none' },
        }}
      >
        <Box component="nav" aria-label="Mobile">
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {nav.map((item, i) => (
              <li key={item.id}>
                <Box
                  component="a"
                  ref={i === 0 ? firstLink : undefined}
                  href={sectionHref(item.id)}
                  onClick={onClose}
                  aria-current={active === item.id ? 'true' : undefined}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 4,
                    py: 3,
                    borderRadius: '18px',
                    textDecoration: 'none',
                    color: color.ink,
                    bgcolor: active === item.id ? color.ivory : 'transparent',
                    fontFamily: font.display,
                    fontWeight: 500,
                    fontSize: '1.75rem',
                    lineHeight: '36px',
                    letterSpacing: '-0.03em',
                    '&:active': { bgcolor: color.ivoryDeep },
                    // Links settle in one after another as the card opens.
                    opacity: open ? 1 : 0,
                    transform: open ? 'none' : 'translateY(10px)',
                    transition: `opacity ${show(360, 60 + i * 40)}, transform ${show(360, 60 + i * 40)}`,
                    [reducedMotion]: { transform: 'none' },
                  }}
                >
                  {item.label}
                  <Typography variant="overline" component="span" sx={{ color: color.muted }}>
                    0{i + 1}
                  </Typography>
                </Box>
              </li>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 3, mt: 2, p: 2, pt: 4, boxShadow: `inset 0 1px 0 ${color.rule}` }}>
          <Btn
            tone="accent"
            endIcon={
              <Bubble tone="ivory" size={36}>
                <SwapArrow size={16} />
              </Bubble>
            }
            onClick={() => {
              onClose()
              startInquiry()
            }}
            sx={{ justifyContent: 'space-between', pl: 6, pr: '6px', py: '6px', ...swapOnHover }}
          >
            Let&rsquo;s Talk
          </Btn>
          <Box component="a" href={mailto} sx={{ justifySelf: 'center', color: color.slate, fontSize: '0.9375rem', lineHeight: '24px', py: 1 }}>
            {site.email}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
