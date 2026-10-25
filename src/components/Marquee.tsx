import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../theme/tokens'

// An endless band: the content is rendered twice and the track slides by half
// its width, so the loop has no seam. It only runs while on screen, and stands
// still under reduced motion. Decorative, so hidden from assistive tech.
export function Marquee({ children, seconds = 40, sx }: { children: ReactNode; seconds?: number; sx?: SxProps<Theme> }) {
  const ref = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Box ref={ref} aria-hidden sx={[{ overflow: 'hidden', display: 'flex', userSelect: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Box
        sx={{
          display: 'flex',
          flexShrink: 0,
          width: 'max-content',
          animation: `marquee ${seconds}s linear infinite`,
          animationPlayState: running ? 'running' : 'paused',
          [reducedMotion]: { animation: 'none' },
        }}
      >
        <Box sx={{ display: 'flex', flexShrink: 0 }}>{children}</Box>
        <Box sx={{ display: 'flex', flexShrink: 0 }}>{children}</Box>
      </Box>
    </Box>
  )
}
