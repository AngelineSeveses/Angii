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

// Gradients from the two brand blues: soft lilac light breaking in,
// deepening to ultramarine. Used for the hero and on case study pages. Text
// only sits on the ones with a color noted, checked at the lightest point.
export const gradient = {
  // The home page hero, under ivory text (6.57) or ivory at 0.86 (5.22) on the
  // left; the lilac light gathers top right, behind the preview.
  hero: [
    'radial-gradient(55% 75% at 90% 10%, rgba(201, 204, 255, 0.6) 0%, rgba(201, 204, 255, 0) 60%)',
    'radial-gradient(45% 55% at 70% 100%, rgba(85, 98, 248, 0.5) 0%, rgba(85, 98, 248, 0) 70%)',
    'linear-gradient(155deg, #2635EC 0%, #2230D8 45%, #18219E 100%)',
  ].join(', '),
  // The same for narrow screens, where the preview sits under the text: the
  // lilac light moves to the bottom right, away from it.
  heroStacked: [
    'radial-gradient(90% 40% at 100% 100%, rgba(201, 204, 255, 0.55) 0%, rgba(201, 204, 255, 0) 60%)',
    'linear-gradient(165deg, #2635EC 0%, #2230D8 45%, #18219E 100%)',
  ].join(', '),
  // Imagery only (case study device trays): no text sits on it.
  stage: [
    'radial-gradient(90% 70% at 8% 0%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 60%)',
    'linear-gradient(140deg, #D5D9FF 0%, #9AA3FB 28%, #5562F8 58%, #2B3AF7 80%, #1E2BD0 100%)',
  ].join(', '),
  // Ultramarine under ivory text (6.57), lilac (4.84) or ivory at 0.86 (5.22):
  // the case study's closing call to action.
  brand: [
    'radial-gradient(70% 90% at 100% 0%, rgba(154, 163, 251, 0.4) 0%, rgba(154, 163, 251, 0) 60%)',
    'linear-gradient(155deg, #2635EC 0%, #2230D8 45%, #1A24B8 100%)',
  ].join(', '),
} as const

// A soft lilac glow over the light canvas. Kept at 0.5 or less so muted gray
// text still clears 4.5:1 inside it.
export const glow = (at: string, size = '55% 60%', strength = 0.5) =>
  `radial-gradient(${size} at ${at}, rgba(201, 204, 255, ${strength}) 0%, rgba(201, 204, 255, 0) 70%)`

// Service cards stack from deep ultramarine to pale lilac. Each tint carries
// text colors that clear 4.5:1 on it, the softer one included:
// 7.97 / 5.58, 6.04 / 4.83 and 10.9 / 5.80. Mid blues are skipped on purpose;
// neither ink nor ivory text reads well on them.
export const accentTints = [
  { bg: '#1E2BD0', fg: color.onAccent, muted: 'rgba(241, 240, 236, 0.8)', rule: 'rgba(241, 240, 236, 0.22)' },
  { bg: '#2B3AF7', fg: color.onAccent, muted: 'rgba(241, 240, 236, 0.86)', rule: 'rgba(241, 240, 236, 0.24)' },
  { bg: '#B9BEFC', fg: color.ink, muted: 'rgba(14, 14, 14, 0.72)', rule: 'rgba(14, 14, 14, 0.16)' },
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
