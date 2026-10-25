import { color } from '../theme/tokens'

// The "a/s" monogram: a small a over a brass solidus over a small s, after the
// old typesetter's fraction ligature (℁). Letters take currentColor, so the
// mark works on ivory and on graphite; the solidus stays brass on both.
// Keep public/favicon.svg and public/logo.svg in sync with these paths.
export function LogoMark({ size = 28 }: { size?: number | string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden focusable="false" style={{ display: 'block', flexShrink: 0 }}>
      <g fill="none" stroke="currentColor" strokeWidth="4.4">
        <circle cx="10.7" cy="10.7" r="7.5" />
        <path d="M18.2 1V20.4" />
        <path d="M44.6 32.21C43.42 30.66 41.25 29.8 38.49 29.8C34.95 29.8 32.39 31.35 32.39 33.59C32.39 36.01 35.14 36.61 38.3 37.13C41.65 37.64 44.8 38.33 44.8 41.01C44.8 43.42 42.04 44.8 38.3 44.8C35.34 44.8 32.58 43.85 31.4 41.87" />
      </g>
      <path d="M33.34 1H36.66L14.66 47H11.34Z" fill={color.brass} />
    </svg>
  )
}
