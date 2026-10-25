import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { type ElementType, type ReactNode, useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../motion/motion'

type RevealProps = {
  children: ReactNode
  delay?: number // ms
  component?: ElementType
  sx?: SxProps<Theme>
  id?: string
}

// Fades a block up as it enters the viewport, once. Used for labels, headings
// and media, not running text: paragraphs are there the moment they scroll in.
export function Reveal({ children, delay = 0, component = 'div', sx, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        delay: delay / 1000,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [delay])

  return (
    <Box ref={ref} id={id} component={component} sx={sx}>
      {children}
    </Box>
  )
}
