import Button, { type ButtonProps } from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'
import { canHover, color, ease } from '../theme/tokens'

export type Tone = 'primary' | 'ink' | 'outline' | 'light' | 'outlineLight'

type BtnProps = Omit<ButtonProps, 'variant' | 'color' | 'size'> & {
  tone?: Tone
  size?: 'md' | 'sm'
  target?: string
  rel?: string
}

const tones: Record<Tone, SxProps<Theme>> = {
  primary: {
    bgcolor: color.blueDeep,
    color: '#FFFFFF',
    [canHover]: { '&:hover': { bgcolor: '#1D4ED8' } },
  },
  ink: {
    bgcolor: color.ink,
    color: color.ivory,
    [canHover]: { '&:hover': { bgcolor: color.slate } },
  },
  outline: {
    bgcolor: 'transparent',
    color: color.ink,
    boxShadow: `inset 0 0 0 1px ${color.ruleStrong}`,
    [canHover]: { '&:hover': { boxShadow: `inset 0 0 0 1px ${color.ink}`, bgcolor: 'transparent' } },
  },
  light: {
    bgcolor: color.ivory,
    color: color.ink,
    [canHover]: { '&:hover': { bgcolor: '#FFFFFF' } },
  },
  outlineLight: {
    bgcolor: 'transparent',
    color: color.onInk,
    boxShadow: `inset 0 0 0 1px ${color.onInkRule}`,
    [canHover]: { '&:hover': { boxShadow: `inset 0 0 0 1px ${color.onInkMuted}`, bgcolor: 'transparent' } },
  },
}

export function Btn({ tone = 'primary', size = 'md', sx, children, ...rest }: BtnProps) {
  return (
    <Button
      disableElevation
      {...rest}
      sx={[
        {
          minWidth: 0,
          borderRadius: '6px',
          fontWeight: 600,
          fontSize: size === 'md' ? '1rem' : '0.875rem',
          lineHeight: size === 'md' ? '24px' : '20px',
          px: size === 'md' ? 6 : 4,
          py: size === 'md' ? 3 : 2,
          gap: 2,
          whiteSpace: 'nowrap',
          transition: `transform 160ms ${ease.out}, background-color 200ms ease, box-shadow 200ms ease, color 200ms ease`,
          '&:active': { transform: 'scale(0.97)' },
          '& .MuiButton-endIcon, & .MuiButton-startIcon': { m: 0 },
          '& .MuiButton-endIcon svg': { transition: `transform 200ms ${ease.out}` },
          [canHover]: { '&:hover .MuiButton-endIcon svg': { transform: 'translate(2px, 0)' } },
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
