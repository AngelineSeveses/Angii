// Brand tokens. A warm light canvas and near-black type carry the page.
// Ultramarine is the one loud color, used in large blocks (services, footer),
// never for small text on the canvas. Brass stays a rare detail, mostly the
// slash in the a/s mark.
export const color = {
  ink: '#0E0E0E',
  slate: '#3D3D3A',
  muted: '#62625E', // 5.4:1 on canvas, 4.9:1 on sunk cards
  ivory: '#F1F0EC', // page canvas
  ivoryDeep: '#E6E5E0', // sunk cards and trays
  paper: '#FFFFFF',
  rule: 'rgba(14, 14, 14, 0.12)',
  ruleStrong: 'rgba(14, 14, 14, 0.24)',
  blue: '#2B3AF7', // focus rings and the odd inline link
  blueDeep: '#2B3AF7',
  brass: '#C6A477',

  // Ultramarine blocks. Canvas text clears 6:1 on accent, lilac is for large
  // display type only (4.45:1).
  accent: '#2B3AF7',
  onAccent: '#F1F0EC',
  lilac: '#C9CCFF',

  // On near-black surfaces
  inkRaised: '#1B1B1A',
  onInk: '#F1F0EC',
  onInkMuted: 'rgba(241, 240, 236, 0.62)',
  onInkRule: 'rgba(241, 240, 236, 0.14)',
} as const

// Service cards stack from deep to light ultramarine. Each tint carries the
// text color that clears 4.5:1 on it.
export const accentTints = [
  { bg: '#2B3AF7', fg: color.onAccent, muted: 'rgba(241, 240, 236, 0.74)', rule: 'rgba(241, 240, 236, 0.22)' },
  { bg: '#4552F8', fg: color.onAccent, muted: 'rgba(241, 240, 236, 0.8)', rule: 'rgba(241, 240, 236, 0.24)' },
  { bg: '#6A74F9', fg: color.ink, muted: 'rgba(14, 14, 14, 0.74)', rule: 'rgba(14, 14, 14, 0.18)' },
  { bg: '#B9BEFC', fg: color.ink, muted: 'rgba(14, 14, 14, 0.7)', rule: 'rgba(14, 14, 14, 0.14)' },
] as const

export const font = {
  display: '"General Sans", "Switzer", ui-sans-serif, system-ui, sans-serif',
  body: '"Switzer", ui-sans-serif, system-ui, sans-serif',
} as const

export const ease = {
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  inOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
  drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
} as const

// Hover motion only on devices that can actually hover.
export const canHover = '@media (hover: hover) and (pointer: fine)'
export const reducedMotion = '@media (prefers-reduced-motion: reduce)'
