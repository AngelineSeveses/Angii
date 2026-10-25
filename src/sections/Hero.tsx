import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowDown, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { useLayoutEffect, useRef } from 'react'
import { BeforeAfter } from '../components/BeforeAfter'
import { Btn } from '../components/Btn'
import { Wrap } from '../components/Layout'
import { SplitWords } from '../components/SplitWords'
import { caseStudyHref, featuredProjects } from '../content/projects'
import { site } from '../content/site'
import { useInquiry } from '../context/inquiry'
import { finePointer, gsap, prefersReducedMotion } from '../motion/motion'
import { canHover, color, ease, font } from '../theme/tokens'

// The redesign shown in the hero's swipe card: the cleanest before/after pair.
const teaser = featuredProjects.find((p) => p.slug === 'ja-fence')

// Worked out from the PageSpeed data, so the claim stays true when it changes.
const tested = featuredProjects.filter((p) => p.pageSpeed)
const perfectSeo = tested.filter((p) => p.pageSpeed!.mobile.seo === 100 && p.pageSpeed!.desktop.seo === 100)
const testedOn = tested[0]?.pageSpeed?.measured.replace(/ \d+,/, '') // "Oct 2026"

// The hero speaks to the visitor: what they get, proof they can poke at on the
// right, and the clients behind it. The full work starts right below.
export function Hero() {
  const { startInquiry } = useInquiry()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const cleanups: (() => void)[] = []
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.hero-card')
      // The cards drop into their tilted spots one after another, once.
      gsap.from(cards, { autoAlpha: 0, y: 48, rotation: (i) => (i % 2 ? -8 : 8), duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.25 })
      gsap.from('.hero-clients > *', { autoAlpha: 0, y: 12, duration: 0.8, ease: 'power3.out', stagger: 0.05, delay: 0.7 })

      // With a mouse, each card drifts a little toward the pointer, the front ones more.
      if (finePointer()) {
        const movers = cards.map((card, i) => ({
          x: gsap.quickTo(card, 'x', { duration: 1, ease: 'power3.out' }),
          y: gsap.quickTo(card, 'y', { duration: 1, ease: 'power3.out' }),
          depth: 8 + i * 6,
        }))
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const dx = (e.clientX - r.left) / r.width - 0.5
          const dy = (e.clientY - r.top) / r.height - 0.5
          movers.forEach((m) => {
            m.x(dx * m.depth)
            m.y(dy * m.depth)
          })
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
    <Box component="section" ref={root} aria-labelledby="hero-title" sx={{ pt: { xs: 10, md: 12 }, pb: { xs: 4, md: 8 }, overflow: 'hidden' }}>
      <Wrap>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
            columnGap: 6,
            rowGap: { xs: 14, md: 10 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ gridColumn: { md: 'span 7' } }}>
            <Box
              component="p"
              sx={{
                m: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 1.5,
                borderRadius: '999px',
                bgcolor: color.lilac,
                color: color.ink,
                fontSize: '0.8125rem',
                fontWeight: 500,
              }}
            >
              <Box component="span" aria-hidden sx={{ width: 8, height: 8, borderRadius: '999px', bgcolor: color.accent }} />
              {site.name}, {site.role.toLowerCase()}
            </Box>
            <SplitWords
              component="h1"
              id="hero-title"
              text="Websites that make your business easy to understand."
              accent={['easy', 'to', 'understand.']}
              immediate
              delay={0.05}
              sx={{ typography: 'h1', m: 0, mt: { xs: 6, md: 8 }, maxWidth: 820 }}
            />
            <Typography variant="subtitle1" sx={{ color: color.slate, mt: { xs: 6, md: 8 }, maxWidth: 560 }}>
              I&rsquo;m Angeline, a web designer and developer. I plan the pages, design them, and build them in WordPress
              or React, so you work with one person from the first sketch to launch.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: { xs: 8, md: 10 } }}>
              <Btn tone="accent" onClick={() => startInquiry()} endIcon={<ArrowRight size={18} weight="bold" />}>
                Start a project
              </Btn>
              <Btn href="#work" tone="outline" endIcon={<ArrowDown size={18} weight="bold" />}>
                See the work
              </Btn>
            </Box>
          </Box>

          {/* Proof a client can check: a real redesign to swipe, and real scores. */}
          <Box
            sx={{
              gridColumn: { md: '8 / span 5' },
              position: 'relative',
              display: { xs: 'grid', md: 'block' },
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 4,
              height: { md: 520 },
            }}
          >
            {teaser?.compare && (
              <Box
                className="hero-card"
                sx={{
                  gridColumn: { sm: '1 / -1' },
                  position: { md: 'absolute' },
                  top: { md: 0 },
                  right: { md: 0 },
                  width: { md: '86%' },
                  p: 2,
                  borderRadius: '22px',
                  bgcolor: color.paper,
                  boxShadow: '0 30px 60px -30px rgba(14,14,14,0.35), 0 0 0 1px rgba(14,14,14,0.06)',
                  transform: { md: 'rotate(2deg)' },
                  zIndex: 1,
                }}
              >
                <Box
                  component="a"
                  href={caseStudyHref(teaser.slug)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    px: 2,
                    pt: 1,
                    pb: 3,
                    color: color.ink,
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    '& svg': { transition: `transform 200ms ${ease.out}` },
                    [canHover]: { '&:hover svg': { transform: 'translate(2px, -2px)' } },
                  }}
                >
                  {teaser.name}, before and after
                  <ArrowUpRight size={16} weight="bold" aria-hidden />
                </Box>
                <BeforeAfter pair={teaser.compare} name={teaser.name} sizes="(min-width: 900px) 40vw, 100vw" eager />
              </Box>
            )}

            {perfectSeo.length > 0 && (
              <Box
                className="hero-card"
                sx={{
                  position: { md: 'absolute' },
                  left: { md: 0 },
                  bottom: { md: 40 },
                  width: { md: '52%' },
                  p: { xs: 6, md: 7 },
                  borderRadius: '22px',
                  bgcolor: color.accent,
                  color: color.onAccent,
                  boxShadow: '0 30px 60px -30px rgba(43,58,247,0.6)',
                  transform: { md: 'rotate(-4deg)' },
                  zIndex: 2,
                }}
              >
                <Typography variant="overline" component="p" sx={{ m: 0, color: color.lilac }}>
                  SEO score
                </Typography>
                <Typography
                  component="p"
                  sx={{ m: 0, mt: 1, fontFamily: font.display, fontSize: { xs: '4.5rem', md: '5.5rem' }, lineHeight: 0.9, letterSpacing: '-0.05em' }}
                >
                  100
                </Typography>
                <Typography sx={{ mt: 3 }}>
                  on {perfectSeo.length} of my {tested.length} latest sites
                </Typography>
                <Typography variant="caption" component="p" sx={{ m: 0, mt: 2, color: color.lilac }}>
                  Google PageSpeed Insights, {testedOn}
                </Typography>
              </Box>
            )}

            <Box
              className="hero-card"
              sx={{
                position: { md: 'absolute' },
                right: { md: '2%' },
                bottom: { md: 0 },
                width: { md: '46%' },
                p: { xs: 6, md: 6 },
                borderRadius: '22px',
                bgcolor: color.lilac,
                color: color.ink,
                boxShadow: '0 24px 48px -28px rgba(14,14,14,0.35)',
                transform: { md: 'rotate(3deg)' },
                zIndex: 3,
              }}
            >
              <Typography variant="overline" component="p" sx={{ m: 0, color: color.slate }}>
                Design + build
              </Typography>
              <Typography sx={{ mt: 2, fontFamily: font.display, fontSize: '1.375rem', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
                One person, from the first sketch to launch.
              </Typography>
              <Box component="ul" aria-label="Tools" sx={{ listStyle: 'none', m: 0, mt: 4, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {['Figma', 'WordPress', 'React'].map((tool) => (
                  <Typography
                    component="li"
                    variant="caption"
                    key={tool}
                    sx={{ px: 2.5, py: 1, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.6)', color: color.ink }}
                  >
                    {tool}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Real clients, each linking to its project below. */}
        <Box
          className="hero-clients"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            columnGap: 4,
            rowGap: 2,
            mt: { xs: 14, md: 10 },
            pt: 5,
            boxShadow: `inset 0 1px 0 ${color.rule}`,
          }}
        >
          <Typography variant="body2" component="p" sx={{ m: 0, color: color.muted }}>
            Recent websites for
          </Typography>
          {featuredProjects.map((p) => (
            <Box
              component="a"
              key={p.slug}
              href={`#work-${p.slug}`}
              sx={{
                fontFamily: font.display,
                fontSize: { xs: '1.0625rem', md: '1.25rem' },
                letterSpacing: '-0.02em',
                color: color.ink,
                textDecoration: 'none',
                transition: 'color 200ms ease',
                [canHover]: { '&:hover': { color: color.accent } },
              }}
            >
              {p.name}
            </Box>
          ))}
        </Box>
      </Wrap>
    </Box>
  )
}
