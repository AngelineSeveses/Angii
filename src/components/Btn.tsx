import Box from '@mui/material/Box'
import Button, { type ButtonProps } from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { canHover, color, ease } from '../theme/tokens'

// primary and ink are the same black pill; accent is the ultramarine pill for
// the one call to action that should pop; light and outlineLight sit on dark
// or ultramarine blocks.
export type Tone = 'primary' | 'ink' | 'accent' | 'outline' | 'light' | 'outlineLight'

type BtnProps = Omit<ButtonProps, 'variant' | 'color' | 'size'> & {
  tone?: Tone
  size?: 'md' | 'sm'
  target?: string
  rel?: string
}

const black: SxProps<Theme> = {
  bgcolor: color.ink,
  color: color.ivory,
  [canHover]: { '&:hover': { bgcolor: '#2A2A28' } },
}

const tones: Record<Tone, SxProps<Theme>> = {
  primary: black,
  ink: black,
  accent: {
    bgcolor: color.accent,
    color: color.onAccent,
    [canHover]: { '&:hover': { bgcolor: '#1F2CD6' } },
  },
  outline: {
    bgcolor: color.paper,
    color: color.ink,
    boxShadow: `inset 0 0 0 1px ${color.rule}`,
    [canHover]: { '&:hover': { boxShadow: `inset 0 0 0 1px ${color.ink}`, bgcolor: color.paper } },
  },
  light: {
    bgcolor: color.ivory,
    color: color.ink,
    [canHover]: { '&:hover': { bgcolor: '#FFFFFF' } },
  },
  outlineLight: {
    bgcolor: 'transparent',
    color: 'inherit',
    boxShadow: `inset 0 0 0 1px currentColor`,
    [canHover]: { '&:hover': { bgcolor: 'rgba(241, 240, 236, 0.12)' } },
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
          borderRadius: '999px',
          fontWeight: 500,
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

// A round chip that holds a button's end icon. Give the button a right padding
// equal to its top padding so the chip sits evenly inside the pill.
export function Bubble({ children, tone = 'ink', size = 36 }: { children: ReactNode; tone?: 'ink' | 'ivory'; size?: number }) {
  return (
    <Box
      component="span"
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        bgcolor: tone === 'ink' ? color.ink : color.ivory,
        color: tone === 'ink' ? color.ivory : color.ink,
      }}
    >
      {children}
    </Box>
  )
}

