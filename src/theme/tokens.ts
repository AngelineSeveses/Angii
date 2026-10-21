// Brand tokens. Graphite + Warm Ivory carry the page, Electric Blue is reserved
// for actions and focus, Brass is a rare editorial detail.
export const color = {
  ink: '#111827', // Graphite
  slate: '#374151',
  // Brand "Muted Gray" is #6B7280, which lands at 4.4:1 on ivory. This step
  // darker keeps the same hue and clears WCAG AA for small metadata text.
  muted: '#5C6370',
  ivory: '#F7F5F0',
  ivoryDeep: '#EEEBE3',
  paper: '#FFFFFF',
  rule: 'rgba(17, 24, 39, 0.12)',
  ruleStrong: 'rgba(17, 24, 39, 0.24)',
  blue: '#3B82F6', // Electric Blue, for accents on dark and focus rings
  blueDeep: '#2563EB', // Button fill; white text on #3B82F6 fails AA at 16px
  brass: '#C6A477',

  // On graphite surfaces
  inkRaised: '#1A2230',
  onInk: '#F7F5F0',
  onInkMuted: 'rgba(247, 245, 240, 0.64)',
  onInkRule: 'rgba(247, 245, 240, 0.14)',
} as const

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
