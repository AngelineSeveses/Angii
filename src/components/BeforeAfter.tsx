import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { type ChangeEvent, useCallback, useLayoutEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import type { ComparePair } from '../content/projects'
import { gsap, prefersReducedMotion } from '../motion/motion'
import { canHover, color } from '../theme/tokens'

const clamp = (v: number) => Math.min(100, Math.max(0, v))

// A swipe comparison: the old site on the left of the handle, the redesign on
// the right. Drag anywhere on the image, or use the arrow keys on the slider.
// On touch the image only takes over once the finger moves sideways, so
// vertical swipes still scroll the page.
// eager: load right away, for a comparison that opens the page.
export function BeforeAfter({ pair, name, sizes, eager = false }: { pair: ComparePair; name: string; sizes: string; eager?: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const beforeLayer = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const range = useRef<HTMLInputElement>(null)
  const beforeTag = useRef<HTMLSpanElement>(null)
  const afterTag = useRef<HTMLSpanElement>(null)
  const drag = useRef<{ id: number; x: number; y: number; active: boolean } | null>(null)
  const nudge = useRef<gsap.core.Timeline | null>(null)

  // Position changes are written straight to the elements, not through React
  // state, so dragging stays at the display's frame rate.
  const apply = useCallback((value: number) => {
    const v = clamp(value)
    if (beforeLayer.current) beforeLayer.current.style.clipPath = `inset(0 ${100 - v}% 0 0)`
    if (handle.current) handle.current.style.left = `${v}%`
    if (beforeTag.current) beforeTag.current.style.opacity = v < 14 ? '0' : '1'
    if (afterTag.current) afterTag.current.style.opacity = v > 86 ? '0' : '1'
    if (range.current) {
      range.current.value = String(Math.round(v))
      range.current.setAttribute('aria-valuetext', `${Math.round(v)}% before, ${100 - Math.round(v)}% after`)
    }
  }, [])

  // Once, as it comes into view, the handle sweeps a little to show it moves.
  useLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const state = { v: 50 }
      nudge.current = gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 70%', once: true }, onUpdate: () => apply(state.v) })
        .to(state, { v: 32, duration: 0.7, ease: 'power2.inOut' })
        .to(state, { v: 64, duration: 0.8, ease: 'power2.inOut' })
        .to(state, { v: 50, duration: 0.6, ease: 'power2.out' })
    }, el)
    return () => ctx.revert()
  }, [apply])

  const fromPointer = (clientX: number) => {
    const r = root.current!.getBoundingClientRect()
    return ((clientX - r.left) / r.width) * 100
  }

  const begin = (e: ReactPointerEvent<HTMLDivElement>) => {
    drag.current!.active = true
    nudge.current?.kill()
    root.current?.setPointerCapture(e.pointerId)
    apply(fromPointer(e.clientX))
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, active: false }
    // A mouse click jumps straight to the spot; touch waits for a sideways move.
    if (e.pointerType === 'mouse') begin(e)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (!d.active) {
      const dx = Math.abs(e.clientX - d.x)
      if (dx < 6 || dx < Math.abs(e.clientY - d.y)) return
      begin(e)
      return
    }
    apply(fromPointer(e.clientX))
  }

  const end = () => {
    drag.current = null
  }

  const tagSx = {
    position: 'absolute',
    top: { xs: 10, md: 16 },
    zIndex: 3,
    px: 3,
    py: 1.5,
    borderRadius: '999px',
    pointerEvents: 'none',
    transition: 'opacity 200ms ease',
    backdropFilter: 'blur(8px)',
  } as const

  return (
    <Box
      ref={root}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      sx={{
        position: 'relative',
        aspectRatio: `${pair.width} / ${pair.height}`,
        overflow: 'hidden',
        borderRadius: { xs: '14px', md: '20px' },
        bgcolor: color.ivoryDeep,
        touchAction: 'pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        [canHover]: { cursor: 'ew-resize' },
        '& img': { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' },
        // Keyboard focus lands on the hidden slider; show it on the handle.
        '&:has(input:focus-visible) .ba-grip': { outline: `2px solid ${color.blue}`, outlineOffset: 3 },
      }}
    >
      <Box
        component="img"
        src={pair.after}
        srcSet={pair.srcSet?.after}
        sizes={sizes}
        alt={`${name} redesign`}
        width={pair.width}
        height={pair.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      <Box ref={beforeLayer} sx={{ position: 'absolute', inset: 0, zIndex: 1, clipPath: 'inset(0 50% 0 0)' }}>
        <Box
          component="img"
          src={pair.before}
          srcSet={pair.srcSet?.before}
          sizes={sizes}
          alt={`${name} before the redesign`}
          width={pair.width}
          height={pair.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </Box>

      <Typography ref={beforeTag} component="span" variant="caption" aria-hidden sx={{ ...tagSx, left: { xs: 10, md: 16 }, bgcolor: 'rgba(14, 14, 14, 0.78)', color: color.onInk }}>
        {pair.archivedOn ? `Before · ${pair.archivedOn}` : 'Before'}
      </Typography>
      <Typography ref={afterTag} component="span" variant="caption" aria-hidden sx={{ ...tagSx, right: { xs: 10, md: 16 }, bgcolor: 'rgba(241, 240, 236, 0.92)', color: color.ink }}>
        After
      </Typography>

      <Box
        ref={handle}
        aria-hidden
        sx={{ position: 'absolute', top: 0, bottom: 0, left: '50%', zIndex: 2, width: 0, pointerEvents: 'none' }}
      >
        <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: -1, width: 2, bgcolor: color.paper, boxShadow: '0 0 0 1px rgba(14,14,14,0.12)' }} />
        <Box
          className="ba-grip"
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: 48,
            height: 48,
            transform: 'translate(-50%, -50%)',
            borderRadius: '999px',
            bgcolor: color.paper,
            color: color.ink,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px -8px rgba(14,14,14,0.45), 0 0 0 1px rgba(14,14,14,0.08)',
          }}
        >
          <CaretLeft size={14} weight="bold" />
          <CaretRight size={14} weight="bold" />
        </Box>
      </Box>

      <Box
        component="input"
        ref={range}
        type="range"
        min={0}
        max={100}
        step={1}
        defaultValue={50}
        aria-label={`Compare ${name} before and after the redesign`}
        aria-valuetext="50% before, 50% after"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          nudge.current?.kill()
          apply(Number(e.target.value))
        }}
        sx={visuallyHidden}
      />
    </Box>
  )
}
