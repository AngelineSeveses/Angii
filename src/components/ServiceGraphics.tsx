import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import {
  Article,
  ArrowsClockwise,
  Check,
  Columns,
  Cursor,
  CursorClick,
  DeviceMobile,
  DotsSixVertical,
  Image as ImageIcon,
  Layout,
  Plug,
  Plus,
  TextH,
} from '@phosphor-icons/react'
import { type ReactNode, useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../motion/motion'
import { canHover, color, ease, reducedMotion } from '../theme/tokens'

// One graphic per service card, built from interface parts (panels, bars,
// icons) rather than screenshots. Each assembles once as it scrolls in, and
// answers when the pointer rests on its card (the card carries .svc-card).
// Positions are percentages of the 4:3 frame, so they scale with the card.

const soft = 'rgba(14, 14, 14, 0.12)'
const panelShadow = '0 24px 40px -20px rgba(14, 14, 14, 0.45)'
const at = (left: string, top: string, width: string, height: string) => ({ position: 'absolute', left, top, width, height }) as const

type Build = (tl: gsap.core.Timeline) => void

function Frame({ build, children, sx }: { build: Build; children: ReactNode; sx?: SxProps<Theme> }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      build(gsap.timeline({ defaults: { ease: 'expo.out', duration: 0.9 }, scrollTrigger: { trigger: el, start: 'top 85%', once: true } }))
    }, el)
    return () => ctx.revert()
  }, [build])

  return (
    <Box
      ref={ref}
      aria-hidden
      sx={[
        {
          position: 'relative',
          aspectRatio: '4 / 3',
          // Lets the hover moves use cqw / cqh, i.e. fractions of this frame.
          containerType: 'size',
          overflow: 'hidden',
          borderRadius: '14px',
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.16)',
          '& .hover-move': { transition: `transform 700ms ${ease.out}` },
          [reducedMotion]: { '& .hover-move': { transition: 'none' } },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  )
}

function Panel({ className, sx, children }: { className: string; sx: SxProps<Theme>; children: ReactNode }) {
  return (
    <Box className={className} sx={[{ position: 'absolute', bgcolor: color.paper, borderRadius: '10px', boxShadow: panelShadow, overflow: 'hidden' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {children}
    </Box>
  )
}

const bar = (bg: string) => ({ bgcolor: bg, borderRadius: '999px' })

// Website design: a page layout on a column grid, with its headline selected.
// On hover the cursor travels to the button and presses it.
const buildDesign: Build = (tl) => {
  tl.from('.d-col', { scaleY: 0, transformOrigin: '50% 0%', stagger: 0.05, duration: 0.8 })
    .from('.d-board', { y: 30, autoAlpha: 0 }, 0.1)
    .from('.d-bar', { scaleX: 0, transformOrigin: '0% 50%', stagger: 0.05, duration: 0.7 }, 0.35)
    .from('.d-card', { y: 12, autoAlpha: 0, stagger: 0.08 }, 0.55)
    .from('.d-select', { autoAlpha: 0, scale: 0.97 }, 0.85)
    .from('.d-cursor', { x: 40, y: 30, autoAlpha: 0, duration: 1.1 }, 0.8)
}

export function DesignGraphic() {
  return (
    <Frame
      build={buildDesign}
      sx={{
        [canHover]: {
          '.svc-card:hover & .d-cursor-move': { transform: 'translate(-44cqw, 19cqh)' },
          '.svc-card:hover & .d-cta-press': { transform: 'scale(0.9)', transitionDelay: '450ms' },
        },
        '& .d-cta-press': { transition: `transform 200ms ${ease.out}` },
      }}
    >
      <Box sx={{ position: 'absolute', inset: '0 8%', display: 'flex', gap: '3%' }}>
        {Array.from({ length: 6 }, (_, i) => (
          <Box key={i} className="d-col" sx={{ flex: 1, bgcolor: 'rgba(255, 255, 255, 0.07)' }} />
        ))}
      </Box>

      <Panel className="d-board" sx={at('12%', '14%', '76%', '94%')}>
        <Box sx={{ ...at('7%', '6%', '6%', '5%'), bgcolor: color.ink, borderRadius: '2px' }} />
        {['40%', '52%', '64%'].map((left) => (
          <Box key={left} sx={{ ...at(left, '7.4%', '9%', '2.4%'), ...bar(soft) }} />
        ))}
        <Box sx={{ ...at('79%', '5.6%', '14%', '6%'), ...bar(color.accent) }} />

        <Box className="d-bar" sx={{ ...at('7%', '20%', '70%', '7%'), bgcolor: color.ink, borderRadius: '3px' }} />
        <Box className="d-bar" sx={{ ...at('7%', '30%', '48%', '7%'), bgcolor: color.ink, borderRadius: '3px' }} />
        <Box className="d-bar" sx={{ ...at('7%', '42%', '78%', '3%'), ...bar(soft) }} />
        <Box className="d-bar" sx={{ ...at('7%', '47.5%', '60%', '3%'), ...bar(soft) }} />
        <Box sx={at('7%', '56%', '24%', '8%')}>
          <Box className="d-cta-press" sx={{ width: '100%', height: '100%', ...bar(color.accent) }} />
        </Box>

        {['7%', '37%', '67%'].map((left) => (
          <Box key={left} className="d-card" sx={{ ...at(left, '71%', '26%', '26%'), bgcolor: color.ivoryDeep, borderRadius: '6px' }}>
            <Box sx={{ ...at('12%', '62%', '56%', '9%'), ...bar(soft) }} />
          </Box>
        ))}

        {/* The headline is "selected", as in a design tool. */}
        <Box className="d-select" sx={{ ...at('4.5%', '17.5%', '75%', '22%'), boxShadow: `inset 0 0 0 1.5px ${color.accent}` }}>
          {[
            { left: -3, top: -3 },
            { right: -3, top: -3 },
            { left: -3, bottom: -3 },
            { right: -3, bottom: -3 },
          ].map((p, i) => (
            <Box key={i} sx={{ position: 'absolute', ...p, width: 6, height: 6, bgcolor: color.paper, boxShadow: `inset 0 0 0 1.5px ${color.accent}` }} />
          ))}
        </Box>
      </Panel>

      <Box className="d-cursor" sx={{ ...at('70%', '49%', '9%', 'auto'), aspectRatio: '1' }}>
        <Box
          className="hover-move d-cursor-move"
          sx={{ width: '100%', height: '100%', color: color.ink, filter: 'drop-shadow(0 0 1px #fff) drop-shadow(0 4px 6px rgba(14,14,14,0.3))' }}
        >
          <Cursor size="100%" weight="fill" />
        </Box>
      </Box>
    </Frame>
  )
}

// WordPress development: a block list beside its code. On hover the loose
// button block drops into its empty slot.
const buildWordPress: Build = (tl) => {
  tl.from('.w-code', { x: 24, autoAlpha: 0 })
    .from('.w-line', { scaleX: 0, transformOrigin: '0% 50%', stagger: 0.05, duration: 0.7 }, 0.25)
    .from('.w-panel', { y: 30, autoAlpha: 0 }, 0.1)
    .from('.w-row', { x: -16, autoAlpha: 0, stagger: 0.08 }, 0.4)
    .from('.w-drag', { x: 40, y: 30, rotation: 8, autoAlpha: 0, duration: 1.1 }, 0.75)
}

const rowSx = {
  display: 'flex',
  alignItems: 'center',
  gap: '4%',
  px: '4%',
  bgcolor: color.ivory,
  borderRadius: '6px',
} as const

const iconBox = (tint: string) => ({ height: '58%', aspectRatio: '1', flexShrink: 0, display: 'flex', color: tint }) as const

export function WordPressGraphic() {
  return (
    <Frame
      build={buildWordPress}
      sx={{ [canHover]: { '.svc-card:hover & .w-drag-move': { transform: 'translate(-28.4cqw, 13.4cqh) rotate(0deg)' } } }}
    >
      <Box className="w-code" sx={{ ...at('52%', '9%', '42%', '46%'), bgcolor: color.ink, borderRadius: '10px', boxShadow: panelShadow }}>
        <Box sx={{ position: 'absolute', left: '9%', top: '9%', display: 'flex', gap: '5px' }}>
          {[color.brass, color.lilac, 'rgba(255, 255, 255, 0.3)'].map((c) => (
            <Box key={c} sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: c }} />
          ))}
        </Box>
        {[
          { left: '9%', top: '30%', width: '50%', c: color.lilac },
          { left: '17%', top: '42%', width: '62%', c: 'rgba(255, 255, 255, 0.35)' },
          { left: '17%', top: '54%', width: '40%', c: color.brass },
          { left: '17%', top: '66%', width: '54%', c: 'rgba(255, 255, 255, 0.35)' },
          { left: '9%', top: '78%', width: '28%', c: color.lilac },
        ].map((l) => (
          <Box key={l.top} className="w-line" sx={{ ...at(l.left, l.top, l.width, '5%'), ...bar(l.c) }} />
        ))}
      </Box>

      <Panel className="w-panel" sx={at('8%', '18%', '60%', '90%')}>
        <Box sx={{ ...at('6%', '7%', '30%', '4%'), ...bar(color.ink) }} />
        <Box sx={{ ...at('80%', '4%', 'auto', '10%'), aspectRatio: '1', borderRadius: '50%', bgcolor: color.ivory, color: color.ink, display: 'grid', placeItems: 'center' }}>
          <Box sx={{ width: '55%', height: '55%', display: 'flex' }}>
            <Plus size="100%" weight="bold" />
          </Box>
        </Box>

        {[TextH, ImageIcon, Columns].map((Icon, i) => (
          <Box key={i} className="w-row" sx={{ ...at('6%', `${18 + i * 16}%`, '88%', '12%'), ...rowSx }}>
            <Box sx={iconBox(color.muted)}>
              <DotsSixVertical size="100%" weight="bold" />
            </Box>
            <Box sx={iconBox(color.ink)}>
              <Icon size="100%" />
            </Box>
            <Box sx={{ width: `${[46, 34, 40][i]}%`, height: '20%', ...bar(soft) }} />
          </Box>
        ))}
        {/* The empty slot the loose block belongs in. */}
        <Box
          className="w-row"
          sx={{ ...at('6%', '66%', '88%', '12%'), borderRadius: '6px', bgcolor: 'rgba(43, 58, 247, 0.06)', boxShadow: `inset 0 0 0 1.5px rgba(43, 58, 247, 0.35)` }}
        />
      </Panel>

      <Box className="w-drag" sx={at('40%', '64%', '52.8%', '10.8%')}>
        <Box
          className="hover-move w-drag-move"
          sx={{
            ...rowSx,
            width: '100%',
            height: '100%',
            bgcolor: color.paper,
            boxShadow: `inset 0 0 0 1.5px ${color.accent}, 0 16px 24px -12px rgba(14, 14, 14, 0.45)`,
            transform: 'rotate(-4deg)',
          }}
        >
          <Box sx={iconBox(color.muted)}>
            <DotsSixVertical size="100%" weight="bold" />
          </Box>
          <Box sx={iconBox(color.accent)}>
            <CursorClick size="100%" />
          </Box>
          <Box sx={{ width: '30%', height: '42%', ...bar(color.accent) }} />
        </Box>
      </Box>
    </Frame>
  )
}

// Website maintenance: a checklist that ticks itself off, over a run of
// steady checks. On hover the refresh arrows turn.
const buildMaintenance: Build = (tl) => {
  tl.from('.m-panel', { y: 30, autoAlpha: 0 })
    .from('.m-row', { y: 10, autoAlpha: 0, stagger: 0.08 }, 0.3)
    .from('.m-check', { scale: 0, stagger: 0.14, duration: 0.6, ease: 'back.out(2)' }, 0.75)
    .from('.m-bar', { scaleY: 0, transformOrigin: '50% 100%', stagger: 0.03, duration: 0.6 }, 0.6)
}

const heights = [40, 55, 35, 60, 50, 70, 45, 65, 80, 55, 75, 60, 85, 70, 90, 95]

export function MaintenanceGraphic() {
  return (
    <Frame build={buildMaintenance} sx={{ [canHover]: { '.svc-card:hover & .m-refresh-move': { transform: 'rotate(180deg)' } } }}>
      <Panel className="m-panel" sx={at('9%', '12%', '82%', '94%')}>
        <Box sx={{ ...at('6%', '7.2%', '3.2%', 'auto'), aspectRatio: '1', borderRadius: '50%', bgcolor: color.accent }} />
        <Box sx={{ ...at('11.5%', '7.2%', '30%', '3.6%'), ...bar(color.ink) }} />
        <Box sx={{ ...at('84%', '3.5%', 'auto', '11%'), aspectRatio: '1', borderRadius: '50%', bgcolor: color.ivory, color: color.ink, display: 'grid', placeItems: 'center' }}>
          <Box className="hover-move m-refresh-move" sx={{ width: '58%', height: '58%', display: 'flex' }}>
            <ArrowsClockwise size="100%" weight="bold" />
          </Box>
        </Box>

        {[Article, Plug, Layout, DeviceMobile].map((Icon, i) => (
          <Box key={i} className="m-row" sx={{ ...at('5%', `${19 + i * 13}%`, '90%', '10.5%'), ...rowSx, px: '2.5%' }}>
            <Box sx={{ height: '72%', aspectRatio: '1', borderRadius: '5px', bgcolor: color.paper, display: 'grid', placeItems: 'center', color: color.ink }}>
              <Box sx={{ width: '62%', height: '62%', display: 'flex' }}>
                <Icon size="100%" />
              </Box>
            </Box>
            <Box sx={{ width: `${[44, 36, 40, 32][i]}%`, height: '18%', ...bar(soft) }} />
            <Box className="m-check" sx={{ ml: 'auto', height: '62%', aspectRatio: '1', borderRadius: '50%', bgcolor: color.accent, color: color.paper, display: 'grid', placeItems: 'center' }}>
              <Box sx={{ width: '60%', height: '60%', display: 'flex' }}>
                <Check size="100%" weight="bold" />
              </Box>
            </Box>
          </Box>
        ))}

        <Box sx={{ ...at('5%', '74%', '90%', '16%'), display: 'flex', alignItems: 'flex-end', gap: '2%' }}>
          {heights.map((h, i) => (
            <Box
              key={i}
              className="m-bar"
              sx={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', bgcolor: i >= heights.length - 4 ? color.accent : 'rgba(43, 58, 247, 0.18)' }}
            />
          ))}
        </Box>
      </Panel>
    </Frame>
  )
}
