import { createTheme } from '@mui/material/styles'
import { color, ease, font } from './tokens'

// Spacing is a 4px grid. Only the steps 0.5 1 2 3 4 6 8 10 12 16 20 24
// (2 4 8 12 16 24 32 40 48 64 80 96px) are used across the site.
export const theme = createTheme({
  spacing: 4,
  shape: { borderRadius: 6 },
  breakpoints: {
    values: { xs: 0, sm: 640, md: 900, lg: 1200, xl: 1440 },
  },
  palette: {
    mode: 'light',
    primary: { main: color.blueDeep, contrastText: '#FFFFFF' },
    secondary: { main: color.ink, contrastText: color.ivory },
    error: { main: '#B42318' },
    text: { primary: color.ink, secondary: color.muted },
    background: { default: color.ivory, paper: color.paper },
    divider: color.rule,
  },
  typography: {
    fontFamily: font.body,
    htmlFontSize: 16,
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontFamily: font.display,
      fontWeight: 500,
      fontSize: '2.25rem', // 36
      lineHeight: 1.12,
      letterSpacing: '-0.025em',
      '@media (min-width:640px)': { fontSize: '3rem', lineHeight: 1.04 }, // 48
      '@media (min-width:1200px)': { fontSize: '3.75rem', lineHeight: 1.02 }, // 60
    },
    h2: {
      fontFamily: font.display,
      fontWeight: 500,
      fontSize: '1.875rem', // 30
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (min-width:640px)': { fontSize: '2.25rem', lineHeight: 1.12 }, // 36
      '@media (min-width:1200px)': { fontSize: '3rem', lineHeight: 1.06 }, // 48
    },
    h3: {
      fontFamily: font.display,
      fontWeight: 500,
      fontSize: '1.5rem', // 24
      lineHeight: 1.333,
      letterSpacing: '-0.015em',
      '@media (min-width:900px)': { fontSize: '1.875rem', lineHeight: 1.2 }, // 30
    },
    h4: {
      fontFamily: font.display,
      fontWeight: 500,
      fontSize: '1.25rem', // 20
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontFamily: font.display,
      fontWeight: 500,
      fontSize: '1.125rem', // 18
      lineHeight: 1.556,
      letterSpacing: '-0.005em',
    },
    subtitle1: { fontSize: '1.125rem', lineHeight: 1.556, fontWeight: 400 }, // lead 18/28
    body1: { fontSize: '1rem', lineHeight: 1.5 }, // 16/24
    body2: { fontSize: '0.875rem', lineHeight: 1.4286 }, // 14/20
    overline: {
      fontFamily: font.body,
      fontSize: '0.75rem', // 12/16
      lineHeight: 1.333,
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    caption: { fontSize: '0.75rem', lineHeight: 1.333, fontWeight: 500, letterSpacing: '0.01em' },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
  },
  transitions: {
    easing: {
      easeOut: ease.out,
      easeInOut: ease.inOut,
      sharp: ease.out,
      easeIn: ease.out, // never ease-in on UI
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: color.ivory, color: color.ink },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': { outline: `2px solid ${color.blue}`, outlineOffset: 3 },
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0, square: true },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '&::before': { display: 'none' },
        },
      },
    },
  },
})
