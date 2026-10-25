import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import { Fragment, type ElementType, type ReactNode, useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../motion/motion'
import { color } from '../theme/tokens'

type SplitWordsProps = {
  text: string
  component?: ElementType
  id?: string
  sx?: SxProps<Theme>
  // rise: words slide up out of a mask, once, as the block enters.
  // fill: words darken one by one, tied to scroll position.
  mode?: 'rise' | 'fill'
  // Seconds. Only for rise.
  delay?: number
  // Play on mount instead of on scroll (the hero).
  immediate?: boolean
  // Starting opacity for fill. High enough that the line reads before it fills.
  dim?: number
  // Decorative extra after the last word, such as a raised count.
  suffix?: ReactNode
  // Words to set in the accent color, matched case-insensitively without punctuation.
  accent?: string[]
}

// Screen readers get the sentence once, from the hidden copy; the split words
// are decorative and hidden from them.
export function SplitWords({ text, component = 'h2', id, sx, mode = 'rise', delay = 0, immediate = false, dim = 0.22, suffix, accent }: SplitWordsProps) {
  const ref = useRef<HTMLElement>(null)
  const words = text.split(' ')
  const bare = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}'’-]/gu, '')
  const accented = new Set((accent ?? []).map(bare))

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const inner = el.querySelectorAll('.sw-in')
      if (mode === 'rise') {
        gsap.fromTo(
          inner,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.04,
            delay,
            scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 90%', once: true },
          },
        )
      } else {
        gsap.fromTo(
          inner,
          { opacity: dim },
          { opacity: 1, ease: 'none', stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: 0.6 } },
        )
      }
    }, el)
    return () => ctx.revert()
  }, [mode, delay, immediate, dim, text])

  return (
    <Box ref={ref} component={component} id={id} sx={sx}>
      <Box component="span" sx={visuallyHidden}>
        {text}
      </Box>
      <Box component="span" aria-hidden>
        {words.map((word, i) => (
          <Fragment key={i}>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                verticalAlign: 'top',
                // The mask clips the rising word; the padding keeps descenders.
                ...(mode === 'rise' && { overflow: 'hidden', pb: '0.12em', mb: '-0.12em' }),
              }}
            >
              <Box component="span" className="sw-in" sx={{ display: 'inline-block', ...(accented.has(bare(word)) && { color: color.accent }) }}>
                {word}
              </Box>
            </Box>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
        {suffix}
      </Box>
    </Box>
  )
}
