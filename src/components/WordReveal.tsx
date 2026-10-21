import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { type ElementType, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useInView'
import { ease } from '../theme/tokens'

type WordRevealProps = {
  text: string
  component?: ElementType
  id?: string
  sx?: SxProps<Theme>
  from: string
  to: string
}

// Each word moves from a muted tone to full ink in reading order as the block
// scrolls through the viewport. The scroll listener is only attached while the
// block is on screen and is throttled to one read per animation frame.
export function WordReveal({ text, component = 'p', id, sx, from, to }: WordRevealProps) {
  const words = text.split(' ')
  const ref = useRef<HTMLElement>(null)
  const [lit, setLit] = useState(() => (prefersReducedMotion() ? words.length : 0))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    let frame = 0
    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.85 // first word lights when the block top is here
      const end = vh * 0.4 // last word lights when the block bottom is here
      const progress = (start - rect.top) / (rect.height + start - end)
      setLit(Math.round(Math.min(1, Math.max(0, progress)) * words.length))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true })
        measure()
      } else {
        window.removeEventListener('scroll', onScroll)
      }
    })
    io.observe(el)

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [words.length])

  return (
    <Box ref={ref} id={id} component={component} sx={sx}>
      {words.map((word, i) => (
        <Box
          key={i}
          component="span"
          sx={{ color: i < lit ? to : from, transition: `color 600ms ${ease.out}` }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </Box>
      ))}
    </Box>
  )
}
