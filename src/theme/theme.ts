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
    // Display sizes run large and regular weight with tight tracking; the
    // tracking loosens as the size drops.
    h1: {
      fontFamily: font.display,
      fontWeight: 400,
      fontSize: '2.75rem', // 44
      lineHeight: 1,
      letterSpacing: '-0.04em',
      '@media (min-width:640px)': { fontSize: '4rem' }, // 64
      '@media (min-width:1200px)': { fontSize: '5.5rem', lineHeight: 0.96 }, // 88
    },
    h2: {
      fontFamily: font.display,
      fontWeight: 400,
      fontSize: '2.25rem', // 36
      lineHeight: 1.04,
      letterSpacing: '-0.035em',
      '@media (min-width:640px)': { fontSize: '3rem' }, // 48
      '@media (min-width:1200px)': { fontSize: '4.5rem', lineHeight: 1 }, // 72
    },
    h3: {
      fontFamily: font.display,
      fontWeight: 400,
      fontSize: '1.75rem', // 28
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      '@media (min-width:900px)': { fontSize: '2.25rem', lineHeight: 1.06 }, // 36
    },
    h4: {
      fontFamily: font.display,
      fontWeight: 500,
      fontSize: '1.375rem', // 22
      lineHeight: 1.27,
      letterSpacing: '-0.02em',
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
    // Small sentence-case labels, not shouting caps.
    overline: {
      fontFamily: font.body,
      fontSize: '0.8125rem', // 13/18
      lineHeight: 1.385,
      fontWeight: 500,
      letterSpacing: '0.005em',
      textTransform: 'none',
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
