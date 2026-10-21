import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

type RevealProps = {
  children: ReactNode
  delay?: number
  component?: ElementType
  sx?: SxProps<Theme>
  id?: string
}

// Fades content up as it enters the viewport. Plays once.
export function Reveal({ children, delay = 0, component = 'div', sx, id }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Box
      ref={ref}
      id={id}
      component={component}
      className="reveal"
      data-in={inView}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
      sx={sx}
    >
      {children}
    </Box>
  )
}
