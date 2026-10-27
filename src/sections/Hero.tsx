import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Pause, Play } from '@phosphor-icons/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Btn } from '../components/Btn'
import { ClientLogos } from '../components/ClientLogos'
import { PhoneShell, ScrollingScreen } from '../components/DeviceShowcase'
import { Wrap } from '../components/Layout'
import { LogoMark } from '../components/Logo'
import { BrowserFrame } from '../components/Mockup'
import { SplitWords } from '../components/SplitWords'
import { featuredProjects } from '../content/projects'
import { site } from '../content/site'
import { useInquiry } from '../context/inquiry'
import { useScreenLoops } from '../hooks/useScreenLoops'
import { quotedScore } from '../lib/pageSpeed'
import { finePointer, gsap, prefersReducedMotion } from '../motion/motion'
import { canHover, color, ease, font, gradient } from '../theme/tokens'

const featured = featuredProjects.find((p) => p.slug === 'ja-fence')!

// The hero makes its case with real things: the copy and calls to action on
// the left; on the right, a client's live homepage in a browser and on a phone,
// pinned with that site's actual PageSpeed Insights score; the clients' own
// logos underneath.
export function Hero() {
  const { startInquiry } = useInquiry()
  const surface = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = surface.current
    if (!el || prefersReducedMotion()) return
    const cleanups: (() => void)[] = []
    const ctx = gsap.context(() => {
      // The card opens out from just inside its final edges, the headline rises
      // word by word (SplitWords), the rest of the copy follows in a short
      // stagger, and the work settles in beside it. Everything is readable and
      // clickable within about a second.
      const radius = getComputedStyle(el).borderTopLeftRadius
      gsap
        .timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 })
        .fromTo(
          el,
          { clipPath: 'inset(3% 2.5% 3% 2.5% round 48px)' },
          { clipPath: `inset(0% 0% 0% 0% round ${radius})`, duration: 1.2, clearProps: 'clipPath' },
        )
        .from('.hp-rise', { y: 16, autoAlpha: 0, duration: 0.9, stagger: 0.06 }, 0.2)
        .from('.hp-mark', { scale: 0.9, rotation: -6, autoAlpha: 0, duration: 1.8 }, 0.2)
        .from('.hp-window', { y: 40, autoAlpha: 0, duration: 1.3 }, 0.3)
        .from('.hp-phone', { y: 90, autoAlpha: 0, duration: 1.4 }, 0.55)
        .from('.hp-chip', { y: 16, scale: 0.92, autoAlpha: 0, duration: 1 }, 1)

      // Scrolling on, the card recedes a touch, like a page being set down.
      gsap.to(el, {
        scale: 0.96,
        transformOrigin: '50% 0%',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.4 },
      })

      // With a mouse, the window and the score drift a touch with the pointer,
      // and the big mark behind them drifts the other way. The phone holds still.
      if (finePointer()) {
        const movers = [
          { sel: '.hp-mark-move', depth: -14 },
          { sel: '.hp-window-move', depth: 6 },
          { sel: '.hp-chip-move', depth: 11 },
        ].map(({ sel, depth }) => ({
          x: gsap.quickTo(sel, 'x', { duration: 1, ease: 'power3.out' }),
          y: gsap.quickTo(sel, 'y', { duration: 1, ease: 'power3.out' }),
          depth,
        }))
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const dx = (e.clientX - r.left) / r.width - 0.5
          const dy = (e.clientY - r.top) / r.height - 0.5
          movers.forEach((m) => (m.x(dx * m.depth), m.y(dy * m.depth)))
        }
        const settle = () => movers.forEach((m) => (m.x(0), m.y(0)))
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', settle)
        cleanups.push(() => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', settle)
        })
      }
    }, el)
    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <Box component="section" aria-labelledby="hero-title" sx={{ pt: { xs: '8px', md: '12px' }, pb: { xs: 8, md: 10 } }}>
      <Wrap>
        {/* The hero is one blue surface: lilac light gathering behind the work
            (top right on wide screens, bottom on narrow ones, so it never sits
            under the text), deepening to ultramarine. */}
        <Box
          ref={surface}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            isolation: 'isolate',
            borderRadius: { xs: '24px', md: '36px' },
            background: { xs: gradient.heroStacked, md: gradient.hero },
            color: color.onAccent,
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.14)',
            px: { xs: 5, sm: 8, md: 10, lg: 14 },
            // Fills the screen below the bar on a laptop, with the content
            // centered, so the next section starts right at the fold.
            minHeight: { xs: 'calc(100svh - var(--header-h) - 16px)', md: 'calc(100svh - var(--header-h) - 24px)' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            py: { xs: 12, md: 12 },
            // Focus rings in light, so they show on the blue.
            '& :focus-visible': { outlineColor: color.onAccent },
            '& .Mui-focusVisible': { outlineColor: `${color.onAccent} !important` },
          }}
        >
          {/* The mark, oversized and faint, behind the work. */}
          <Box
            className="hp-mark"
            aria-hidden
            sx={{ position: 'absolute', zIndex: -1, right: { xs: '-30%', md: '-8%' }, bottom: { xs: '-14%', md: '-34%' }, width: { xs: '90%', md: '52%' }, color: '#FFFFFF' }}
          >
            <Box className="hp-mark-move" sx={{ opacity: 0.12 }}>
              <LogoMark size="100%" />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
              columnGap: 6,
              rowGap: { xs: 14, md: 10 },
              alignItems: 'center',
            }}
          >
            <Box sx={{ gridColumn: { md: 'span 6' } }}>
              <Typography variant="overline" component="p" className="hp-rise" sx={{ m: 0, display: 'flex', alignItems: 'center', gap: 3, color: onBlueMuted }}>
                <Box component="span" aria-hidden sx={{ width: 28, height: '1px', bgcolor: color.onAccent }} />
                Web designer &amp; WordPress developer
              </Typography>
              <SplitWords
                component="h1"
                id="hero-title"
                text="Your website should work as hard as you do."
                immediate
                delay={0.3}
                sx={{
                  typography: 'h1',
                  fontSize: { xs: '2.75rem', sm: '3.75rem', md: '3.5rem', lg: '4.75rem' },
                  color: color.onAccent,
                  m: 0,
                  mt: { xs: 6, md: 8 },
                  maxWidth: 640,
                }}
              />
              <Typography variant="subtitle1" className="hp-rise" sx={{ color: onBlueMuted, mt: { xs: 6, md: 8 }, maxWidth: 540 }}>
                I design, build, and maintain websites that help businesses communicate clearly, present their work
                professionally, and make it easier for customers to take the next step.
              </Typography>
              <Box className="hp-rise" sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 4, maxWidth: 540 }}>
                {site.portrait && (
                  <Box component="img" src={site.portrait} alt="" sx={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                )}
                <Typography sx={{ color: onBlueMuted }}>From the first idea to the finished website, you work directly with me.</Typography>
              </Box>
              <Box className="hp-rise" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: { xs: 8, md: 10 } }}>
                <Btn href="#work" tone="white">
                  Explore My Work
                </Btn>
                <Btn tone="whiteOutline" onClick={() => startInquiry()}>
                  Start a Project
                </Btn>
              </Box>
            </Box>

            <Box sx={{ gridColumn: { md: '7 / span 6' } }}>
              <LivePreview />
            </Box>
          </Box>
        </Box>

        <ClientLogos sx={{ mt: { xs: 10, md: 12 } }} />
      </Wrap>
    </Box>
  )
}

// Softer ivory for the hero's supporting text; 5.22:1 at the lightest blue.
const onBlueMuted = 'rgba(241, 240, 236, 0.86)'

// A soft, layered shadow like a real window resting on the blue; tinted deep
// blue rather than gray so it sits in the gradient instead of on top of it.
const lift = '0 1px 1px rgba(10,16,90,0.08), 0 12px 24px -12px rgba(10,16,90,0.32), 0 48px 80px -32px rgba(10,16,90,0.55)'


// J&A Fence's homepage scrolling slowly in a browser window and on a phone.
// The loops pause offscreen, under the pointer and with the toolbar button;
// under reduced motion they wait for the button.
function LivePreview() {
  const root = useRef<HTMLElement>(null)
  const [playing, setPlaying] = useState(() => !prefersReducedMotion())
  // A little slower than the case studies: here the page is read in passing.
  useScreenLoops(root, playing, '.hp-stage', undefined, 1.4)
  const screens = featured.screens!
  const speed = featured.pageSpeed!
  const quote = quotedScore(speed, featured.speedHighlight)

  return (
    <Box ref={root} component="figure" sx={{ m: 0 }}>
      <Box className="hp-stage" sx={{ position: 'relative', aspectRatio: { xs: '7 / 6', md: '6 / 5' } }}>
        <Box className="hp-window" sx={{ position: 'absolute', top: 0, right: 0, width: '92%' }}>
          <BrowserFrame
            className="hp-window-move"
            url={featured.displayUrl}
            sx={{ boxShadow: `${lift}, 0 0 0 1px rgba(14,14,14,0.08)` }}
            action={
              <ButtonBase
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause the scrolling previews' : 'Play the scrolling previews'}
                sx={{
                  width: { xs: 22, md: 28 },
                  height: { xs: 22, md: 28 },
                  borderRadius: '50%',
                  color: color.slate,
                  transition: `background-color 200ms ease, transform 160ms ${ease.out}`,
                  '&:active': { transform: 'scale(0.92)' },
                  [canHover]: { '&:hover': { bgcolor: 'rgba(14,14,14,0.06)', color: color.ink } },
                }}
              >
                {playing ? <Pause size={12} weight="fill" /> : <Play size={12} weight="fill" />}
              </ButtonBase>
            }
          >
            <ScrollingScreen kind="laptop" shot={screens.laptop} aspect="16 / 10" radius="0" priority alt={`The ${featured.name} homepage in a desktop browser.`} />
          </BrowserFrame>
        </Box>

        <Box className="hp-phone" sx={{ position: 'absolute', left: 0, bottom: 0, width: '28%' }}>
          <Box className="hp-phone-move">
            <PhoneShell>
              <ScrollingScreen kind="phone" shot={screens.phone} aspect="390 / 844" radius="12.4% / 5.75%" alt={`The ${featured.name} homepage on a phone.`} />
            </PhoneShell>
          </Box>
        </Box>

        {/* The site's real score, straight from its PageSpeed Insights report (a label, not a link). */}
        <Box className="hp-chip" sx={{ position: 'absolute', right: { xs: 0, md: '-2%' }, bottom: { xs: '10%', md: '14%' } }}>
          <Box className="hp-chip-move">
            <Box
              role="group"
              aria-label={`${quote.score} out of 100, ${quote.device} ${quote.category} for ${featured.displayUrl}. Google PageSpeed Insights, tested ${quote.tested}.`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 2.5, md: 3.5 },
                p: { xs: 2, md: 3 },
                pr: { xs: 3.5, md: 5 },
                borderRadius: '14px',
                bgcolor: color.paper,
                color: color.ink,
                boxShadow: `${lift}, 0 0 0 1px rgba(14,14,14,0.06)`,
              }}
            >
              <Gauge score={quote.score} />
              <Box aria-hidden sx={{ display: 'grid', gap: 0.25 }}>
                <Box component="span" sx={{ fontWeight: 600, fontSize: { xs: '0.8125rem', md: '0.9375rem' }, lineHeight: 1.25 }}>
                  {quote.device} {quote.category}
                </Box>
                <Box component="span" sx={{ fontSize: { xs: '0.6875rem', md: '0.75rem' }, lineHeight: 1.35, color: color.muted }}>
                  PageSpeed Insights · {quote.tested}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// Drawn like the gauges in a PageSpeed Insights report, in Google's colors for
// each band (90 and up green, 50 to 89 orange, under 50 red).
function Gauge({ score }: { score: number }) {
  const tone = score >= 90 ? { ring: '#0C6', text: '#080', fill: 'rgba(0, 204, 102, 0.1)' } : score >= 50 ? { ring: '#FA3', text: '#C33300', fill: 'rgba(255, 170, 51, 0.1)' } : { ring: '#F33', text: '#C00', fill: 'rgba(255, 51, 51, 0.1)' }
  const r = 20
  const length = 2 * Math.PI * r
  return (
    <Box component="svg" viewBox="0 0 48 48" aria-hidden sx={{ width: { xs: 38, md: 48 }, height: { xs: 38, md: 48 }, flexShrink: 0 }}>
      <circle cx="24" cy="24" r={r} fill={tone.fill} stroke={tone.ring} strokeOpacity={0.15} strokeWidth="4" />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke={tone.ring}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * length} ${length}`}
        transform="rotate(-90 24 24)"
      />
      <text x="24" y="24" textAnchor="middle" dominantBaseline="central" fill={tone.text} style={{ font: `600 15px ${font.body}` }}>
        {score}
      </text>
    </Box>
  )
}
