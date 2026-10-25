import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { nav, mailto, site, type NavId } from '../content/site'
import { useInquiry } from '../context/inquiry'
import { useActiveSection } from '../hooks/useActiveSection'
import { sectionHref } from '../lib/links'
import { pauseScroll } from '../motion/motion'
import { canHover, color, ease, font } from '../theme/tokens'
import { Btn } from './Btn'
import { Wrap } from './Layout'
import { LogoMark } from './Logo'

const navIds = nav.map((n) => n.id)

export function Wordmark({ tone = 'ink' }: { tone?: 'ink' | 'ivory' }) {
  return (
    <Typography
      component="span"
      sx={{
        fontFamily: font.display,
        fontWeight: 500,
        fontSize: '1.0625rem',
        lineHeight: '28px',
        letterSpacing: '-0.025em',
        color: tone === 'ink' ? color.ink : color.onInk,
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2.5,
      }}
    >
      <LogoMark size={28} />
      {site.name}
    </Typography>
  )
}

export function Header() {
  const active = useActiveSection<NavId>(navIds)
  const { startInquiry } = useInquiry()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Box ref={sentinel} aria-hidden sx={{ position: 'absolute', top: 0, left: 0, height: 8, width: 1 }} />
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1200,
          height: 'var(--header-h)',
          // Frosted ivory: the page keeps moving underneath instead of
          // disappearing behind a solid bar.
          bgcolor: 'rgba(241, 240, 236, 0.86)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: scrolled ? `0 1px 0 ${color.rule}` : `0 1px 0 transparent`,
          transition: 'box-shadow 300ms ease',
          '@media (prefers-reduced-transparency: reduce)': { bgcolor: color.ivory, backdropFilter: 'none', WebkitBackdropFilter: 'none' },
        }}
      >
        <Wrap sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
          {/* Mark and name, then the page links beside them; the call to action sits alone on the right. */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Box
              component="a"
              href={sectionHref('top')}
              aria-label={`${site.name}, back to top`}
              onClick={() => setOpen(false)}
              sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
              <Wordmark />
            </Box>
            <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box component="ul" sx={{ display: 'flex', gap: 8, listStyle: 'none', m: 0, p: 0 }}>
                {nav.map((item) => (
                  <li key={item.id}>
                    <NavLink href={sectionHref(item.id)} current={active === item.id}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </Box>
            </Box>
          </Box>

          <Btn
            tone="ink"
            size="sm"
            onClick={() => startInquiry()}
            endIcon={<ArrowUpRight size={16} weight="bold" />}
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          >
            Let&rsquo;s talk
          </Btn>

          <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
        </Wrap>
      </Box>
      <MobileMenu open={open} onClose={close} active={active} />
    </>
  )
}

function NavLink({ href, current, children }: { href: string; current: boolean; children: string }) {
  return (
    <Box
      component="a"
      href={href}
      aria-current={current ? 'true' : undefined}
      sx={{
        position: 'relative',
        display: 'inline-block',
        py: 1,
        fontSize: '0.875rem',
        lineHeight: '20px',
        fontWeight: 500,
        textDecoration: 'none',
        color: current ? color.ink : color.slate,
        transition: 'color 200ms ease',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '1px',
          bgcolor: current ? color.blue : color.ink,
          transform: current ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: `transform 400ms ${ease.out}, background-color 200ms ease`,
        },
        [canHover]: {
          '&:hover': { color: color.ink },
          '&:hover::after': { transform: 'scaleX(1)' },
        },
      }}
    >
      {children}
    </Box>
  )
}

function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const line = {
    position: 'absolute',
    left: 10,
    width: 20,
    height: '1.5px',
    borderRadius: 1,
    bgcolor: color.ink,
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
        borderRadius: '6px',
        mr: -2,
        transition: `transform 160ms ${ease.out}`,
        '&:active': { transform: 'scale(0.94)' },
      }}
    >
      <Box component="span" sx={{ ...line, transform: open ? 'translateY(-50%) rotate(45deg)' : 'translateY(calc(-50% - 4px))' }} />
      <Box component="span" sx={{ ...line, transform: open ? 'translateY(-50%) rotate(-45deg)' : 'translateY(calc(-50% + 4px))' }} />
    </ButtonBase>
  )
}

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

  return (
    <Box
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      sx={{
        position: 'fixed',
        inset: 'var(--header-h) 0 0 0',
        zIndex: 1100,
        bgcolor: color.ivory,
        display: { xs: 'flex', md: 'none' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: { xs: 4, sm: 6 },
        pt: 8,
        pb: 10,
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: open
          ? `opacity 300ms ${ease.out}, visibility 0s`
          : `opacity 200ms ${ease.out}, visibility 0s 200ms`,
      }}
    >
      <Box component="nav" aria-label="Mobile">
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {nav.map((item, i) => (
            <Box component="li" key={item.id} sx={{ overflow: 'hidden', borderBottom: `1px solid ${color.rule}` }}>
              <Box
                component="a"
                ref={i === 0 ? firstLink : undefined}
                href={sectionHref(item.id)}
                onClick={onClose}
                aria-current={active === item.id ? 'true' : undefined}
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 4,
                  py: 4,
                  textDecoration: 'none',
                  color: color.ink,
                  fontFamily: font.display,
                  fontWeight: 500,
                  fontSize: '2.25rem',
                  lineHeight: '40px',
                  letterSpacing: '-0.02em',
                  transform: open ? 'translateY(0)' : 'translateY(48px)',
                  opacity: open ? 1 : 0,
                  transition: open
                    ? `transform 700ms ${ease.out} ${100 + i * 50}ms, opacity 700ms ${ease.out} ${100 + i * 50}ms`
                    : `transform 200ms ${ease.out}, opacity 150ms ease`,
                }}
              >
                <Typography variant="overline" component="span" sx={{ color: color.muted, minWidth: 24 }}>
                  0{i + 1}
                </Typography>
                {item.label}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          opacity: open ? 1 : 0,
          transition: open ? `opacity 600ms ${ease.out} 350ms` : 'opacity 150ms ease',
        }}
      >
        <Btn
          tone="primary"
          endIcon={<ArrowRight size={18} weight="bold" />}
          onClick={() => {
            onClose()
            startInquiry()
          }}
          sx={{ alignSelf: 'flex-start' }}
        >
          Let&rsquo;s Talk
        </Btn>
        <Box component="a" href={mailto} sx={{ color: color.slate, fontSize: '1rem', lineHeight: '24px' }}>
          {site.email}
        </Box>
      </Box>
    </Box>
  )
}
