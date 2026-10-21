import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ArrowRight, ArrowUpRight, X } from '@phosphor-icons/react'
import { useState } from 'react'
import { Btn } from '../components/Btn'
import { BrowserFrame, PhoneFrame } from '../components/Frames'
import { Section, SectionHeader } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { allProjects, featuredProjects, isDraft, moreProjects, type FeaturedProject } from '../content/projects'
import { canHover, color, ease } from '../theme/tokens'

export function Work() {
  const [indexOpen, setIndexOpen] = useState(false)

  return (
    <Section id="work" labelledBy="work-title" tone="ink">
      <SectionHeader
        tone="ink"
        index="02"
        label="A few things I've worked on"
        titleId="work-title"
        title="Different projects, different problems."
        lead="Here's a selection of website and digital projects across different industries. Each one has its own requirements, from presenting services clearly to making information easier to navigate."
      />

      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {featuredProjects.map((project, i) => (
          <FeaturedRow key={project.slug} project={project} index={i} />
        ))}
      </Box>

      <MoreProjects onOpenIndex={() => setIndexOpen(true)} />
      <ProjectIndex open={indexOpen} onClose={() => setIndexOpen(false)} />
    </Section>
  )
}

function FeaturedRow({ project, index }: { project: FeaturedProject; index: number }) {
  const titleId = `project-${project.slug}`
  return (
    <Box
      component="li"
      sx={{
        py: { xs: 12, md: 16 },
        boxShadow: `inset 0 1px 0 ${color.onInkRule}`,
        '&:first-of-type': { pt: { xs: 12, md: 16 } },
      }}
    >
      <Box component="article" aria-labelledby={titleId}>
        <Reveal
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
            columnGap: 6,
            rowGap: 3,
            alignItems: 'end',
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box sx={{ gridColumn: { md: 'span 8' }, display: 'flex', alignItems: 'baseline', gap: { xs: 4, md: 6 } }}>
            <Typography variant="overline" component="span" sx={{ color: color.brass, fontVariantNumeric: 'tabular-nums' }}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
            <Box>
              <Typography id={titleId} variant="h3" component="h3" sx={{ color: color.onInk }}>
                {project.name}
              </Typography>
              <Typography variant="body2" sx={{ color: color.onInkMuted, mt: 1 }}>
                {project.category}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ gridColumn: { md: '9 / span 4' }, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            <ProjectLink href={project.url} name={project.name} />
          </Box>
        </Reveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
            columnGap: 6,
            rowGap: 8,
          }}
        >
          <Reveal delay={80} sx={{ gridColumn: { md: 'span 8' } }}>
            <BrowserFrame
              dark
              href={project.url}
              label={project.displayUrl}
              name={project.name}
              src={project.images.full}
              alt={`Full length homepage of ${project.name}.`}
            />
          </Reveal>

          <Reveal delay={160} sx={{ gridColumn: { md: '9 / span 4' }, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Typography sx={{ color: color.onInk }}>{project.summary}</Typography>
            {project.context && <Typography sx={{ color: color.onInkMuted }}>{project.context}</Typography>}

            <Box component="dl" sx={{ m: 0, display: 'grid', gap: 4, pt: 6, boxShadow: `inset 0 1px 0 ${color.onInkRule}` }}>
              <Detail term="What to look at" value={project.lookFor} />
              <Detail term="My role" value={project.role} />
              <Detail term="Tools" value={project.tools} />
            </Box>

            <Box sx={{ display: { md: 'none' } }}>
              <ProjectLink href={project.url} name={project.name} />
            </Box>
          </Reveal>
        </Box>
      </Box>
    </Box>
  )
}

function Detail({ term, value }: { term: string; value: string }) {
  const draft = isDraft(value)
  return (
    <Box>
      <Typography component="dt" variant="overline" sx={{ color: color.onInkMuted, display: 'block' }}>
        {term}
      </Typography>
      <Typography
        component="dd"
        variant="body2"
        title={draft ? 'Draft: confirm before publishing' : undefined}
        sx={{
          m: 0,
          mt: 1,
          color: draft ? color.brass : color.onInk,
          ...(draft && {
            display: 'inline-block',
            px: 2,
            py: 0.5,
            borderRadius: '4px',
            outline: `1px dashed ${color.brass}`,
            outlineOffset: 0,
          }),
        }}
      >
        {value}
      </Typography>
    </Box>
  )
}

function ProjectLink({ href, name }: { href: string; name: string }) {
  return (
    <Btn
      tone="outlineLight"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View project: ${name} (opens in a new tab)`}
      endIcon={<ArrowUpRight size={18} weight="bold" />}
      sx={{ [canHover]: { '&:hover .MuiButton-endIcon svg': { transform: 'translate(2px, -2px)' } } }}
    >
      View Project
    </Btn>
  )
}

function MoreProjects({ onOpenIndex }: { onOpenIndex: () => void }) {
  return (
    <Box component="section" aria-labelledby="more-title" sx={{ pt: { xs: 12, md: 16 }, boxShadow: `inset 0 1px 0 ${color.onInkRule}` }}>
      <Reveal
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 6,
          mb: { xs: 8, md: 12 },
        }}
      >
        <Box>
          <Typography id="more-title" variant="h3" component="h3" sx={{ color: color.onInk }}>
            More Projects
          </Typography>
          <Typography sx={{ color: color.onInkMuted, mt: 2 }}>
            A few more projects from different industries and types of work.
          </Typography>
        </Box>
        <Btn tone="light" onClick={onOpenIndex} endIcon={<ArrowRight size={18} weight="bold" />} aria-haspopup="dialog">
          Explore All Projects
        </Btn>
      </Reveal>

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: { xs: 'flex', md: 'grid' },
          gridTemplateColumns: { md: 'repeat(5, minmax(0, 1fr))' },
          gap: { xs: 4, md: 6 },
          overflowX: { xs: 'auto', md: 'visible' },
          scrollSnapType: { xs: 'x mandatory', md: 'none' },
          mx: { xs: -4, sm: -6, md: 0 },
          px: { xs: 4, sm: 6, md: 0 },
          pb: { xs: 2, md: 0 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {moreProjects.map((p, i) => (
          <Box component="li" key={p.slug} sx={{ flex: { xs: '0 0 58%', sm: '0 0 36%' }, scrollSnapAlign: 'start' }}>
            <Reveal delay={i * 60}>
              <Box
                component="a"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name}, ${p.category}. Open the live site in a new tab.`}
                sx={{
                  display: 'block',
                  color: 'inherit',
                  textDecoration: 'none',
                  '& .more-phone': { transition: `transform 500ms ${ease.out}` },
                  '& .more-go': { transition: `transform 200ms ${ease.out}` },
                  [canHover]: {
                    '&:hover .more-phone': { transform: 'translateY(-8px)' },
                    '&:hover .more-go': { transform: 'translate(2px, -2px)' },
                  },
                }}
              >
                <Box className="more-phone">
                  <PhoneFrame dark src={p.images.mobile} alt="" width="100%" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mt: 4 }}>
                  <Box>
                    <Typography variant="h5" component="h4" sx={{ color: color.onInk }}>
                      {p.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: color.onInkMuted, mt: 0.5 }}>
                      {p.category}
                    </Typography>
                  </Box>
                  <Box className="more-go" sx={{ color: color.onInkMuted, pt: 1, flexShrink: 0 }}>
                    <ArrowUpRight size={16} weight="bold" aria-hidden />
                  </Box>
                </Box>
              </Box>
            </Reveal>
          </Box>
        ))}
      </Box>
      <Typography variant="caption" sx={{ display: 'block', color: color.onInkMuted, mt: { xs: 8, md: 12 } }}>
        Every project links to its live website and opens in a new tab.
      </Typography>
    </Box>
  )
}

function ProjectIndex({ open, onClose }: { open: boolean; onClose: () => void }) {
  const fullScreen = useMediaQuery('(max-width:639.95px)')
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      aria-labelledby="index-title"
      transitionDuration={{ enter: 300, exit: 180 }}
      slotProps={{
        paper: {
          sx: {
            bgcolor: color.ivory,
            borderRadius: fullScreen ? 0 : '12px',
            boxShadow: '0 40px 80px -40px rgba(17,24,39,0.5)',
          },
        },
        backdrop: { sx: { bgcolor: 'rgba(17, 24, 39, 0.56)' } },
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          bgcolor: color.ivory,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 4, sm: 8 },
          py: 4,
          boxShadow: `0 1px 0 ${color.rule}`,
        }}
      >
        <Box>
          <Typography variant="overline" component="p" sx={{ color: color.muted, m: 0 }}>
            Project index · {allProjects.length} websites
          </Typography>
          <Typography id="index-title" variant="h4" component="h2">
            All projects
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          aria-label="Close project index"
          sx={{ color: color.ink, borderRadius: '6px', '&:active': { transform: 'scale(0.94)' } }}
        >
          <X size={20} />
        </IconButton>
      </Box>

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          px: { xs: 4, sm: 8 },
          py: { xs: 6, sm: 8 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 6,
        }}
      >
        {allProjects.map((p) => (
          <li key={p.slug}>
            <Box
              component="a"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name}, ${p.category}. Open the live site in a new tab.`}
              sx={{
                display: 'block',
                color: 'inherit',
                textDecoration: 'none',
                '& img': { transition: `transform 600ms ${ease.out}` },
                '& .index-go': { transition: `transform 200ms ${ease.out}` },
                [canHover]: {
                  '&:hover img': { transform: 'scale(1.03)' },
                  '&:hover .index-go': { transform: 'translate(2px, -2px)' },
                },
              }}
            >
              <Box sx={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '16 / 10', bgcolor: color.ivoryDeep, boxShadow: `inset 0 0 0 1px ${color.rule}` }}>
                <Box
                  component="img"
                  src={p.images.desktop}
                  alt=""
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2 }}>
                  <Typography variant="h5" component="h3">
                    {p.name}
                  </Typography>
                  <Box className="index-go" sx={{ color: color.muted, flexShrink: 0, display: 'flex' }}>
                    <ArrowUpRight size={14} weight="bold" aria-hidden />
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: color.muted }}>
                  {p.category}
                </Typography>
              </Box>
            </Box>
          </li>
        ))}
      </Box>
    </Dialog>
  )
}
