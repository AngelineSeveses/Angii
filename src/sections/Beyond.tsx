import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import {
  type SimpleIcon,
  siCss,
  siElementor,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siReact,
  siVercel,
  siWordpress,
} from 'simple-icons'
import { Section, SectionHeader } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { ThumbsUpDoodle } from '../components/WaveDoodle'
import { canHover, color, ease, font, reducedMotion } from '../theme/tokens'

// Brand marks from Simple Icons (CC0), named for the people who can't see them.
const tools: { name: string; icon: SimpleIcon }[] = [
  { name: 'Figma', icon: siFigma },
  { name: 'WordPress', icon: siWordpress },
  { name: 'Elementor', icon: siElementor },
  { name: 'HTML', icon: siHtml5 },
  { name: 'CSS', icon: siCss },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'React', icon: siReact },
  { name: 'Git', icon: siGit },
  { name: 'GitHub', icon: siGithub },
  { name: 'Vercel', icon: siVercel },
  { name: 'Firebase', icon: siFirebase },
]

// On hover a tile fills with the brand's own color; the mark turns ink on the
// light ones (JavaScript yellow, React cyan) and stays white on the rest.
const markOn = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? color.ink : '#FFFFFF'
}

// Who is behind the work and how she works, on a dark band between the
// projects and the process. The About link in the menu lands here.
export function Beyond() {
  return (
    <Section id="about" labelledBy="beyond-title" tone="ink">
      <SectionHeader
        index="04"
        label="Beyond the screens"
        titleId="beyond-title"
        title="Design matters. So does how it works."
        tone="ink"
        lead="I don't look at a website as just a collection of pages. The structure, the implementation, the smaller interactions, and how the experience behaves across devices all contribute to the finished result."
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: 6,
          rowGap: 12,
          alignItems: 'start',
          pt: { xs: 10, md: 14 },
          boxShadow: `inset 0 1px 0 ${color.onInkRule}`,
        }}
      >
        <Box sx={{ gridColumn: { md: 'span 6' } }}>
          <Typography
            sx={{
              m: 0,
              fontFamily: font.display,
              fontSize: { xs: '1.5rem', md: '2rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              color: color.onInk,
              maxWidth: 620,
            }}
          >
            My background includes working with frontend technologies and interactive digital experiences, alongside
            website design and WordPress development.
          </Typography>
          <ThumbsUpDoodle sx={{ width: { xs: 170, md: 230 }, mt: { xs: 10, md: 14 }, color: color.lilac }} />
        </Box>

        <Box sx={{ gridColumn: { md: '8 / span 5' } }}>
          <Typography variant="overline" component="h3" id="beyond-tools" sx={{ m: 0, color: color.onInkMuted }}>
            Some of the tools I work with
          </Typography>
          <Reveal>
            <Box
              component="ul"
              aria-labelledby="beyond-tools"
              sx={{ listStyle: 'none', m: 0, mt: 4, p: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: 2 }}
            >
              {tools.map(({ name, icon }) => (
                <Box
                  component="li"
                  key={name}
                  sx={{
                    position: 'relative',
                    aspectRatio: '1',
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '14px',
                    bgcolor: color.inkRaised,
                    color: color.onInk,
                    boxShadow: `inset 0 0 0 1px ${color.onInkRule}`,
                    transition: `background-color 250ms ease, color 250ms ease, transform 300ms ${ease.out}`,
                    [canHover]: {
                      '&:hover': { bgcolor: `#${icon.hex}`, color: markOn(icon.hex), transform: 'translateY(-4px)' },
                      '&:hover .tool-name': { opacity: 1, transform: 'translate(-50%, 0)' },
                    },
                    [reducedMotion]: { '&:hover': { transform: 'none' } },
                  }}
                >
                  <Box component="svg" viewBox="0 0 24 24" aria-hidden sx={{ width: '42%', height: '42%', fill: 'currentColor' }}>
                    <path d={icon.path} />
                  </Box>
                  <Box component="span" sx={visuallyHidden}>
                    {name}
                  </Box>
                  {/* The name shows above the tile while the pointer rests on it. */}
                  <Box
                    component="span"
                    aria-hidden
                    className="tool-name"
                    sx={{
                      position: 'absolute',
                      bottom: 'calc(100% + 8px)',
                      left: '50%',
                      px: 2.5,
                      py: 1,
                      borderRadius: '999px',
                      bgcolor: color.onInk,
                      color: color.ink,
                      fontSize: '0.75rem',
                      lineHeight: '16px',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      opacity: 0,
                      transform: 'translate(-50%, 4px)',
                      transition: `opacity 150ms ease, transform 200ms ${ease.out}`,
                    }}
                  >
                    {name}
                  </Box>
                </Box>
              ))}
            </Box>
          </Reveal>

          <Typography sx={{ color: color.onInkMuted, mt: 8 }}>
            These skills support my approach to design and implementation, whether I&rsquo;m improving a website, working
            through a technical challenge, or building something more interactive.
          </Typography>
        </Box>
      </Box>
    </Section>
  )
}
