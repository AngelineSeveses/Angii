import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowDown, ArrowRight } from '@phosphor-icons/react'
import type { CSSProperties } from 'react'
import { BrowserFrame, PhoneFrame } from '../components/Frames'
import { Btn } from '../components/Btn'
import { Wrap } from '../components/Layout'
import { featuredProjects } from '../content/projects'
import { useInquiry } from '../context/inquiry'
import { color } from '../theme/tokens'

const heroProject = featuredProjects[0]
const skills = ['Website Design', 'WordPress Development', 'JavaScript', 'React', '3DVista', 'R&D']

const at = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export function Hero() {
  const { startInquiry } = useInquiry()

  return (
    <Box component="section" aria-labelledby="hero-title" sx={{ pt: { xs: 12, md: 20 }, pb: { xs: 20, md: 24 } }}>
      <Wrap>
        <Box className="rise" style={at(0)} sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: { xs: 6, md: 8 } }}>
          <Box aria-hidden sx={{ width: 6, height: 6, bgcolor: color.brass, borderRadius: '1px' }} />
          <Typography variant="overline" component="p" sx={{ color: color.muted, m: 0 }}>
            Web design · WordPress · Interactive development
          </Typography>
        </Box>

        <Typography
          id="hero-title"
          variant="h1"
          sx={{
            fontSize: { xs: '2.25rem', sm: '3rem', xl: '3.75rem' },
            lineHeight: { xs: 1.12, sm: 1.06, xl: 1.04 },
            '& > span': { display: { lg: 'block' } },
          }}
        >
          <span className="rise" style={at(80)}>
            I design websites, build things for the web,{' '}
          </span>
          <Box component="span" className="rise" style={at(160)} sx={{ color: color.slate }}>
            and figure out how to make them work better.
          </Box>
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
            columnGap: 6,
            rowGap: 6,
            mt: { xs: 8, md: 12 },
          }}
        >
          <Box className="rise" style={at(260)} sx={{ gridColumn: { md: 'span 6' } }}>
            <Typography variant="subtitle1" sx={{ color: color.slate, maxWidth: 560 }}>
              I&rsquo;m a web designer and developer working across website design, WordPress, JavaScript, and
              interactive experiences. I enjoy taking an idea, figuring out what it needs, and turning it into
              something people can actually use.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 8 }}>
              <Btn href="#work" tone="primary" endIcon={<ArrowDown size={18} weight="bold" />}>
                View My Work
              </Btn>
              <Btn tone="outline" onClick={() => startInquiry()} endIcon={<ArrowRight size={18} weight="bold" />}>
                Have a Project in Mind?
              </Btn>
            </Box>
          </Box>

          <Box
            className="rise"
            style={at(340)}
            sx={{ gridColumn: { md: '8 / span 5' }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}
          >
            <Typography variant="body1" sx={{ color: color.muted, maxWidth: 420 }}>
              From business websites and custom interfaces to 3DVista virtual tours, I work across both the design and
              technical sides of a project.
            </Typography>
            <Box component="ul" aria-label="Disciplines" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, listStyle: 'none', m: 0, p: 0 }}>
              {skills.map((s) => (
                <Box
                  component="li"
                  key={s}
                  sx={{
                    fontSize: '0.75rem',
                    lineHeight: '16px',
                    fontWeight: 500,
                    color: color.slate,
                    px: 2,
                    py: 1,
                    borderRadius: '4px',
                    boxShadow: `inset 0 0 0 1px ${color.rule}`,
                  }}
                >
                  {s}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box component="figure" className="unveil" style={at(420)} sx={{ m: 0, mt: { xs: 12, md: 20 } }}>
          <Box sx={{ position: 'relative', pr: { md: 20, lg: 24 } }}>
            <BrowserFrame
              priority
              href={heroProject.url}
              label={heroProject.displayUrl}
              name={heroProject.name}
              src={heroProject.images.full}
              alt="G&L Auto homepage: auto repair, towing and used parts, with a service request form beside the hero."
            />
            <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', right: 0, bottom: { md: -48, lg: -64 } }}>
              <PhoneFrame priority src={heroProject.images.mobile} alt="G&L Auto homepage on a phone." width={{ md: 160, lg: 200 }} />
            </Box>
          </Box>
          <Box
            component="figcaption"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'space-between',
              mt: { xs: 4, md: 6 },
              pr: { md: 64, lg: 72 },
            }}
          >
            <Typography variant="caption" sx={{ color: color.muted }}>
              <Box component="span" sx={{ color: color.ink }}>
                Fig. 01
              </Box>
              &ensp;{heroProject.name}, automotive business website
            </Typography>
            <Typography variant="caption" sx={{ color: color.muted, display: { xs: 'none', md: 'block' } }}>
              Hover the frame to scroll the full homepage
            </Typography>
          </Box>
        </Box>
      </Wrap>
    </Box>
  )
}
