import Button, { type ButtonProps } from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'
import { canHover, color, ease } from '../theme/tokens'

// Buttons come in blue and white only. blue is the main action on light
// surfaces; white is the main action on blue surfaces and the quieter action
// on light ones (with a hairline edge); whiteOutline is the second action on
// blue. Labels only: no arrows.
export type Tone = 'blue' | 'white' | 'whiteOutline'

type BtnProps = Omit<ButtonProps, 'variant' | 'color' | 'size'> & {
  tone?: Tone
  size?: 'md' | 'sm'
  target?: string
  rel?: string
}

const tones: Record<Tone, SxProps<Theme>> = {
  blue: {
    bgcolor: color.accent,
    color: color.onAccent,
    [canHover]: { '&:hover': { bgcolor: '#1F2CD6' } },
  },
  white: {
    bgcolor: color.paper,
    color: color.ink,
    boxShadow: `inset 0 0 0 1px ${color.rule}`,
    [canHover]: { '&:hover': { bgcolor: color.paper, boxShadow: `inset 0 0 0 1px ${color.ink}` } },
  },
  whiteOutline: {
    bgcolor: 'transparent',
    color: color.paper,
    boxShadow: `inset 0 0 0 1px ${color.paper}`,
    [canHover]: { '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.12)' } },
  },
}

export function Btn({ tone = 'blue', size = 'md', sx, children, ...rest }: BtnProps) {
  return (
    <Button
      disableElevation
      {...rest}
      sx={[
        {
          minWidth: 0,
          borderRadius: '999px',
          fontWeight: 500,
          fontSize: size === 'md' ? '1rem' : '0.875rem',
          lineHeight: size === 'md' ? '24px' : '20px',
          px: size === 'md' ? 7 : 5,
          py: size === 'md' ? 3 : 2.5,
          whiteSpace: 'nowrap',
          transition: `transform 160ms ${ease.out}, background-color 200ms ease, box-shadow 200ms ease, color 200ms ease`,
          '&:active': { transform: 'scale(0.97)' },
          '&.Mui-disabled': { opacity: 0.56, color: 'inherit' },
        },
        tones[tone],
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Button>
  )
}
