import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../theme/tokens'

// Hand-drawn style doodles of a girl with shoulder-length hair, drawn in one
// line weight and flipped between two poses like a GIF. Pure SVG, so they stay
// sharp at any size and take their color from the text color. They run only
// while on screen; under reduced motion they hold the first pose.

type DoodleProps = {
  sx?: SxProps<Theme>
  children: ReactNode
  // Seconds for one full A-B-A cycle: quick for a wave, slower for thinking.
  period?: number
  // Fill for shapes drawn over other lines (className "solid"), matching the
  // surface behind the doodle so the lines underneath are hidden.
  bg?: string
}

function Doodle({ sx, children, period = 0.76, bg = 'none' }: DoodleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(false)

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
          '& .pose .solid': { fill: bg },
          '& .pose-a': { animation: `doodleA ${period}s steps(1, end) infinite`, animationPlayState: play },
          '& .pose-b': { animation: `doodleB ${period}s steps(1, end) infinite`, animationPlayState: play },
          '@keyframes doodleA': { '0%': { opacity: 1 }, '50%': { opacity: 0 } },
          '@keyframes doodleB': { '0%': { opacity: 0 }, '50%': { opacity: 1 } },
          [reducedMotion]: { '& .pose-a': { animation: 'none' }, '& .pose-b': { animation: 'none', opacity: 0 } },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <svg viewBox="0 0 250 220">{children}</svg>
    </Box>
  )
}

type Face = 'smile' | 'grin' | 'wink' | 'think-left' | 'think-right'

// Eyes looking up, one brow raised and a half-made mouth: working something out.
const thinkingFace = {
  'think-left': { eyes: ['M81 109 h0.1', 'M103 109 h0.1'], mouth: 'M90 132 L102 129' },
  'think-right': { eyes: ['M89 109 h0.1', 'M111 109 h0.1'], mouth: 'M89 132 Q95 135 102 129' },
}

function Girl({ face = 'smile', transform }: { face?: Face; transform?: string }) {
  if (face === 'think-left' || face === 'think-right') {
    const f = thinkingFace[face]
    return (
      <g transform={transform}>
        <Hair />
        {f.eyes.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d="M78 100 Q84 97 90 99" />
        <path d="M102 96 Q108 91 114 96" />
        <path d="M77 123 h4" />
        <path d="M111 123 h4" />
        <path d={f.mouth} />
        <path d="M89 149 V160" />
        <path d="M103 149 V160" />
        <path d="M89 160 Q96 170 103 160" />
      </g>
    )
  }
  return (
    <g transform={transform}>
      <Hair />
      {/* Eyes (a wink closes the left one), blush, mouth. */}
      <path d={face === 'wink' ? 'M80 111 Q85 115 90 111' : 'M80 112 Q85 107 90 112'} />
      <path d="M102 112 Q107 107 112 112" />
      <path d="M77 123 h4" />
      <path d="M111 123 h4" />
      {face === 'smile' ? <path d="M89 128 Q96 136 103 128" /> : <path d="M87 127 Q96 141 105 127 Q96 131 87 127 Z" />}
      {/* Neck and collar. */}
      <path d="M89 149 V160" />
      <path d="M103 149 V160" />
      <path d="M89 160 Q96 170 103 160" />
    </g>
  )
}

// Hair (outer shape, the fall beside the cheeks, one strand for texture),
// the face outline and a side-parted hairline.
function Hair() {
  return (
    <>
      <path d="M46 168 C54 170 58 166 57 158 C47 132 45 102 55 78 C65 55 80 46 96 46 C112 46 127 55 137 78 C147 102 145 132 135 158 C134 166 138 170 146 168" />
      <path d="M70 134 C68 146 66 156 64 164" />
      <path d="M122 134 C124 146 126 156 128 164" />
      <path d="M58 104 C54 122 55 138 60 150" />
      <path d="M68 96 C68 128 80 150 96 150 C112 150 124 128 124 96" />
      <path d="M106 50 C100 70 86 84 66 92" />
      <path d="M108 52 C114 70 120 82 125 92" />
    </>
  )
}

// Shoulders and the raised forearm, shared by the wave and the thumbs up.
function Body() {
  return (
    <>
      <path d="M48 172 C44 182 40 192 38 204" />
      <path d="M142 172 C150 178 158 186 164 196" />
      <path d="M190 150 C184 168 176 186 170 204" />
      <path d="M218 150 C210 170 202 188 196 206" />
    </>
  )
}

const waveHand =
  'M190 150 C188 140 186 132 184 126 C178 120 171 113 168 107 C166 102 171 98 175 101 C180 105 185 111 188 113 L188 80 C188 72 198 72 198 80 L198 106 L199 74 C199 66 209 66 209 74 L209 106 L210 80 C210 72 220 72 220 80 L220 108 L221 92 C221 85 229 85 229 92 L229 112 C229 128 224 140 218 150'

// A fist with the thumb up: thumb on the left, four curled fingers stacked on
// the right, the wrist meeting the forearm at the bottom.
function Thumb({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      <path d="M190 150 C186 140 184 132 184 124 L184 112 C184 106 188 103 194 103 C193 92 191 82 192 74 C193 65 204 64 205 73 C206 83 206 93 206 103 L219 103 C228 103 228 113 220 113 C229 113 229 123 220 123 C229 123 229 133 220 133 C227 133 227 143 219 143 C218 146 218 148 218 150" />
      <path d="M206 113 H219" />
      <path d="M206 123 H219" />
      <path d="M206 133 H218" />
    </g>
  )
}

// A "hello" for the footer: waving, the hand tipping side to side.
export function WaveDoodle({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Doodle sx={sx}>
      {/* Pose A: hand tipped left, big sparkle up top. */}
      <g className="pose pose-a">
        <path d="M34 46 Q34 60 48 60 Q34 60 34 74 Q34 60 20 60 Q34 60 34 46Z" />
        <path d="M20 106 Q20 112 26 112 Q20 112 20 118 Q20 112 14 112 Q20 112 20 106Z" />
        <Body />
        <Girl />
        <path d={waveHand} transform="rotate(-12 204 150)" />
        <path d="M238 70 Q244 82 238 94" />
        <path d="M228 56 Q238 72 232 90" />
      </g>

      {/* Pose B: hand tipped right, head tilts, the sparkles swap sizes. */}
      <g className="pose pose-b">
        <path d="M34 52 Q34 60 42 60 Q34 60 34 68 Q34 60 26 60 Q34 60 34 52Z" />
        <path d="M20 100 Q20 112 32 112 Q20 112 20 124 Q20 112 8 112 Q20 112 20 100Z" />
        <Body />
        <Girl transform="rotate(-3 96 160)" />
        <path d={waveHand} transform="rotate(10 204 150)" />
        <path d="M164 74 Q158 84 162 96" />
        <path d="M154 62 Q146 80 152 100" />
      </g>
    </Doodle>
  )
}

// A big grin and a thumbs up: the thumb rocks at the wrist and the girl winks.
export function ThumbsUpDoodle({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Doodle sx={sx}>
      {/* Pose A: thumb up, grinning, a sparkle at each side. */}
      <g className="pose pose-a">
        <path d="M34 46 Q34 60 48 60 Q34 60 34 74 Q34 60 20 60 Q34 60 34 46Z" />
        <path d="M20 106 Q20 112 26 112 Q20 112 20 118 Q20 112 14 112 Q20 112 20 106Z" />
        <Body />
        <Girl face="grin" />
        <Thumb transform="rotate(-4 204 150)" />
      </g>

      {/* Pose B: the thumb tips forward with a burst of lines, head tilts, a wink. */}
      <g className="pose pose-b">
        <path d="M34 52 Q34 60 42 60 Q34 60 34 68 Q34 60 26 60 Q34 60 34 52Z" />
        <path d="M20 100 Q20 112 32 112 Q20 112 20 124 Q20 112 8 112 Q20 112 20 100Z" />
        <Body />
        <Girl face="wink" transform="rotate(-3 96 160)" />
        <Thumb transform="rotate(6 204 150)" />
        <path d="M190 54 L184 46" />
        <path d="M207 48 V38" />
        <path d="M224 54 L230 46" />
      </g>
    </Doodle>
  )
}

// The chin resting on a fist, drawn over the neck; filled so the neck lines
// behind it don't show through.
function ChinRest() {
  return (
    <>
      <path d="M48 172 C44 182 40 192 38 204" />
      <path d="M142 172 C150 178 158 186 164 196" />
      <path d="M106 174 C116 186 124 196 130 208" />
      <path d="M90 176 C98 188 104 198 108 210" />
      <path className="solid" d="M84 161 C84 152 90 147 98 147 C106 147 112 152 112 161 C112 170 106 177 98 177 C90 177 84 170 84 161 Z" />
      <path d="M91 151 V157" />
      <path d="M98 149 V156" />
      <path d="M105 151 V157" />
    </>
  )
}

// A thought cloud with a question in it, up and to the right of the head.
function Thought({ transform, mark }: { transform?: string; mark: string }) {
  return (
    <g transform={transform}>
      <path d="M150 64 h0.1" />
      <path d="M162 50 C162 46 168 46 168 50 C168 54 162 54 162 50 Z" />
      <path d="M180 40 C174 30 184 18 196 22 C202 12 218 14 220 26 C232 26 236 40 226 46 C224 56 210 58 204 52 C196 58 182 54 182 46 C176 46 176 40 180 40 Z" />
      <path d={mark} />
      <path d="M201 45 h0.1" />
    </g>
  )
}

// Hand to chin, eyes up, a question in a cloud: weighing it up. Slower than
// the wave, since thinking takes a moment. Pass the surface color as `bg`.
export function ThinkingDoodle({ sx, bg }: { sx?: SxProps<Theme>; bg: string }) {
  return (
    <Doodle sx={sx} period={1.6} bg={bg}>
      {/* Pose A: eyes up to the left, a small sparkle. */}
      <g className="pose pose-a">
        <path d="M20 106 Q20 112 26 112 Q20 112 20 118 Q20 112 14 112 Q20 112 20 106Z" />
        <Girl face="think-left" />
        <ChinRest />
        <Thought mark="M196 31 C196 25 206 25 206 31 C206 35 201 35 201 39" />
      </g>

      {/* Pose B: head tilts, eyes swing right, the cloud lifts and the question leans. */}
      <g className="pose pose-b">
        <path d="M20 100 Q20 112 32 112 Q20 112 20 124 Q20 112 8 112 Q20 112 20 100Z" />
        <Girl face="think-right" transform="rotate(3 96 160)" />
        <ChinRest />
        <Thought transform="translate(2 -5)" mark="M197 30 C198 24 208 26 206 32 C205 36 200 36 201 40" />
      </g>
    </Doodle>
  )
}

