// The mark: a bold, geometric two-storey "a" whose counter is an up-right
// arrow, the same arrow the site uses for its links. Drawn in a 64 × 64 grid
// and cropped to the glyph here; it takes currentColor, and the arrow is a true
// cut-out, so the background shows through on any surface.
// Keep public/favicon.svg, public/logo.svg and public/apple-touch-icon.png in
// sync with these paths.
export function LogoMark({ size = 28 }: { size?: number | string }) {
  return (
    <svg viewBox="14.5 14 36 36" width={size} height={size} aria-hidden focusable="false" style={{ display: 'block', flexShrink: 0 }}>
      <g fill="currentColor">
        <path d="M16 15H39C44.5 15 49 19.5 49 25V49H40V25C40 24.4 39.6 24 39 24H16Z" />
        <path
          fillRule="evenodd"
          d="M40 28V49H25C20 49 16 45 16 40V37C16 32 20 28 25 28Z M35 32L26 32L28.73 34.73L21.73 41.73L25.27 45.27L32.27 38.27L35 41Z"
        />
      </g>
    </svg>
  )
}
