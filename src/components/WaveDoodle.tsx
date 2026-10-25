import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { useEffect, useId, useRef, useState } from 'react'
import { reducedMotion } from '../theme/tokens'

// A hand-drawn style "hello": a girl with shoulder-length hair waving, drawn
// in one line weight and flipped between two poses like a GIF. Pure SVG, so
// it stays sharp at any size and takes its color from the text color.
// Runs only while on screen; under reduced motion it holds the first pose.
export function WaveDoodle({ sx }: { sx?: SxProps<Theme> }) {
  const ref = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(false)
  const id = useId()
  const hand = `${id}-hand`
  const girl = `${id}-girl`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const play = running ? 'running' : 'paused'

  return (
    <Box
      ref={ref}
      aria-hidden
      sx={[
        {
          '& svg': { display: 'block', width: '100%', height: 'auto', overflow: 'visible' },
          '& .pose': { fill: 'none', stroke: 'currentColor', strokeWidth: 6, strokeLinecap: 'round', strokeLinejoin: 'round' },
          '& .pose-a': { animation: 'doodleA 0.76s steps(1, end) infinite', animationPlayState: play },
          '& .pose-b': { animation: 'doodleB 0.76s steps(1, end) infinite', animationPlayState: play },
          '@keyframes doodleA': { '0%': { opacity: 1 }, '50%': { opacity: 0 } },
          '@keyframes doodleB': { '0%': { opacity: 0 }, '50%': { opacity: 1 } },
          [reducedMotion]: { '& .pose-a': { animation: 'none' }, '& .pose-b': { animation: 'none', opacity: 0 } },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <svg viewBox="0 0 250 220">
        <defs>
          <path
            id={hand}
            d="M190 150 C188 140 186 132 184 126 C178 120 171 113 168 107 C166 102 171 98 175 101 C180 105 185 111 188 113 L188 80 C188 72 198 72 198 80 L198 106 L199 74 C199 66 209 66 209 74 L209 106 L210 80 C210 72 220 72 220 80 L220 108 L221 92 C221 85 229 85 229 92 L229 112 C229 128 224 140 218 150"
          />
          <g id={girl}>
            {/* Hair: outer shape, the fall beside the cheeks, one strand for texture. */}
            <path d="M46 168 C54 170 58 166 57 158 C47 132 45 102 55 78 C65 55 80 46 96 46 C112 46 127 55 137 78 C147 102 145 132 135 158 C134 166 138 170 146 168" />
            <path d="M70 134 C68 146 66 156 64 164" />
            <path d="M122 134 C124 146 126 156 128 164" />
            <path d="M58 104 C54 122 55 138 60 150" />
            {/* Face and a side-parted hairline. */}
            <path d="M68 96 C68 128 80 150 96 150 C112 150 124 128 124 96" />
            <path d="M106 50 C100 70 86 84 66 92" />
            <path d="M108 52 C114 70 120 82 125 92" />
            {/* Smiling eyes, blush, mouth. */}
            <path d="M80 112 Q85 107 90 112" />
            <path d="M102 112 Q107 107 112 112" />
            <path d="M77 123 h4" />
            <path d="M111 123 h4" />
            <path d="M89 128 Q96 136 103 128" />
            {/* Neck and collar. */}
            <path d="M89 149 V160" />
            <path d="M103 149 V160" />
            <path d="M89 160 Q96 170 103 160" />
          </g>
        </defs>

        {/* Pose A: hand tipped left, big sparkle up top. */}
        <g className="pose pose-a">
          <path d="M34 46 Q34 60 48 60 Q34 60 34 74 Q34 60 20 60 Q34 60 34 46Z" />
          <path d="M20 106 Q20 112 26 112 Q20 112 20 118 Q20 112 14 112 Q20 112 20 106Z" />
          <path d="M48 172 C44 182 40 192 38 204" />
          <path d="M142 172 C150 178 158 186 164 196" />
          <path d="M190 150 C184 168 176 186 170 204" />
          <path d="M218 150 C210 170 202 188 196 206" />
          <use href={`#${girl}`} />
          <use href={`#${hand}`} transform="rotate(-12 204 150)" />
          <path d="M238 70 Q244 82 238 94" />
          <path d="M228 56 Q238 72 232 90" />
        </g>

        {/* Pose B: hand tipped right, head tilts, the sparkles swap sizes. */}
        <g className="pose pose-b">
          <path d="M34 52 Q34 60 42 60 Q34 60 34 68 Q34 60 26 60 Q34 60 34 52Z" />
          <path d="M20 100 Q20 112 32 112 Q20 112 20 124 Q20 112 8 112 Q20 112 20 100Z" />
          <path d="M48 172 C44 182 40 192 38 204" />
          <path d="M142 172 C150 178 158 186 164 196" />
          <path d="M190 150 C184 168 176 186 170 204" />
          <path d="M218 150 C210 170 202 188 196 206" />
          <use href={`#${girl}`} transform="rotate(-3 96 160)" />
          <use href={`#${hand}`} transform="rotate(10 204 150)" />
          <path d="M164 74 Q158 84 162 96" />
          <path d="M154 62 Q146 80 152 100" />
        </g>
      </svg>
    </Box>
  )
}
