import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from '@phosphor-icons/react'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { BeforeAfter } from '../components/BeforeAfter'
import { Btn } from '../components/Btn'
import { PhoneFrame, ProjectShot } from '../components/Frames'
import { Section, SectionHeader } from '../components/Layout'
import { SpeedBadges } from '../components/PageSpeed'
import { Reveal } from '../components/Reveal'
import { allProjects, caseStudyHref, featuredProjects, moreProjects, type FeaturedProject } from '../content/projects'
import { pauseScroll, prefersReducedMotion } from '../motion/motion'
import { canHover, color, ease } from '../theme/tokens'

export function Work() {
  const [indexOpen, setIndexOpen] = useState(false)

  return (
    <Section id="work" labelledBy="work-title" tone="ivory">
      <SectionHeader
        index="01"
        label="Selected work"
        titleId="work-title"
        title="Different projects, different problems."
        count={featuredProjects.length}
        lead="Recent websites for an outsourcing company, a builder, two fence companies and a car repair shop."
        aside={
          <Btn tone="outline" onClick={() => setIndexOpen(true)} endIcon={<ArrowRight size={18} weight="bold" />} aria-haspopup="dialog">
            All {allProjects.length} projects
          </Btn>
        }
      />

      {/* One wide card, then pairs, so the grid never reads as one repeated shape. */}
      <Box
        component="ol"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          columnGap: { xs: 6, md: 8 },
          rowGap: { xs: 16, md: 20 },
        }}
      >
        {featuredProjects.map((project, i) => (
          <Box component="li" key={project.slug} sx={{ gridColumn: { md: i === 0 ? '1 / -1' : 'auto' } }}>
            <ProjectCard project={project} index={i} wide={i === 0} />
          </Box>
        ))}
      </Box>

      <MoreProjects />
      <ProjectIndex open={indexOpen} onClose={() => setIndexOpen(false)} />
    </Section>
  )
}

function ProjectCard({ project, index, wide }: { project: FeaturedProject; index: number; wide: boolean }) {
  const titleId = `project-${project.slug}`
  const tags = project.category.split(' · ')
  const caseStudy = caseStudyHref(project.slug)
  return (
    <Box component="article" id={`work-${project.slug}`} aria-labelledby={titleId} sx={{ scrollMarginTop: '16px' }}>
      <Reveal>
        {project.compare ? (
          <BeforeAfter pair={project.compare} name={project.name} sizes={wide ? '(min-width: 1440px) 1360px, 100vw' : '(min-width: 900px) 50vw, 100vw'} />
        ) : (
          <ProjectShot
            href={caseStudy}
            label={project.displayUrl}
            action="Read more"
            name={project.name}
            src={project.images.desktop}
            alt={`${project.name} homepage.`}
            aspect={wide ? '16 / 8' : '16 / 10'}
          />
        )}
      </Reveal>

      <Box
        sx={{
          mt: { xs: 5, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: wide ? 'repeat(12, minmax(0, 1fr))' : '1fr' },
          columnGap: 6,
          rowGap: 3,
        }}
      >
        <Box sx={{ gridColumn: { md: wide ? 'span 5' : 'auto' } }}>
          <Typography variant="overline" component="p" sx={{ m: 0, color: color.muted, fontVariantNumeric: 'tabular-nums' }}>
            ({String(index + 1).padStart(2, '0')})
          </Typography>
          <Typography id={titleId} variant="h3" component="h3" sx={{ mt: 1 }}>
            {project.name}
          </Typography>
        </Box>
        <Box sx={{ gridColumn: { md: wide ? '7 / span 6' : 'auto' } }}>
          <Typography sx={{ color: color.slate, maxWidth: 560 }}>{project.summary}</Typography>
          <Box component="ul" aria-label="Project type" sx={{ listStyle: 'none', m: 0, mt: 4, p: 0, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {tags.map((t) => (
              <Typography
                component="li"
                variant="caption"
                key={t}
                sx={{ px: 3, py: 1.5, borderRadius: '999px', bgcolor: color.ivoryDeep, color: color.ink }}
              >
                {t}
              </Typography>
            ))}
          </Box>
          {project.pageSpeed && <SpeedBadges speed={project.pageSpeed} />}
          {/* The full write-up lives on the project's case study page. */}
          <Box
            component="a"
            href={caseStudy}
            aria-label={`Read more about ${project.name}`}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              mt: 6,
              py: 1,
              color: color.ink,
              fontWeight: 500,
              textDecoration: 'none',
              boxShadow: `inset 0 -1px 0 ${color.ruleStrong}`,
              transition: 'box-shadow 200ms ease',
              '& svg': { transition: `transform 200ms ${ease.out}` },
              [canHover]: { '&:hover': { boxShadow: `inset 0 -1px 0 ${color.ink}` }, '&:hover svg': { transform: 'translateX(3px)' } },
            }}
          >
            Read more
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// A sideways rail of phone views. Arrow buttons step one card at a time;
// touch and trackpads scroll it directly.
function MoreProjects() {
  const rail = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  useEffect(() => {
    const el = rail.current
    if (!el) return
    const update = () => setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 })
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const step = (dir: 1 | -1) => {
    const el = rail.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <Box component="section" aria-labelledby="more-title" sx={{ mt: { xs: 20, md: 28 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 6, mb: { xs: 6, md: 8 } }}>
        <Box>
          <Typography id="more-title" variant="h3" component="h3">
            More projects
          </Typography>
          <Typography sx={{ color: color.muted, mt: 2 }}>A few more sites from different industries.</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <RailButton label="Previous projects" disabled={edge.start} onClick={() => step(-1)}>
            <ArrowLeft size={18} weight="bold" />
          </RailButton>
          <RailButton label="Next projects" disabled={edge.end} onClick={() => step(1)}>
            <ArrowRight size={18} weight="bold" />
          </RailButton>
        </Box>
      </Box>

      <Box
        component="ul"
        ref={rail}
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'flex',
          gap: 4,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {moreProjects.map((p) => (
          <Box component="li" key={p.slug} sx={{ flex: { xs: '0 0 72%', sm: '0 0 40%', md: '0 0 29%', lg: '0 0 23%' }, scrollSnapAlign: 'start' }}>
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
              <Box sx={{ bgcolor: color.ivoryDeep, borderRadius: '20px', px: { xs: 8, md: 10 }, pt: { xs: 8, md: 10 }, overflow: 'hidden', height: { xs: 360, md: 400 } }}>
                <Box className="more-phone">
                  <PhoneFrame src={p.images.mobile ?? p.images.desktop} alt="" width="100%" />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mt: 4 }}>
                <Box>
                  <Typography variant="h5" component="h4">
                    {p.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: color.muted, mt: 0.5 }}>
                    {p.category}
                  </Typography>
                </Box>
                <Box className="more-go" sx={{ color: color.muted, pt: 1, flexShrink: 0 }}>
                  <ArrowUpRight size={16} weight="bold" aria-hidden />
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

function RailButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      sx={{
        width: 48,
        height: 48,
        color: color.ink,
        bgcolor: color.paper,
        boxShadow: `inset 0 0 0 1px ${color.rule}`,
        transition: `transform 160ms ${ease.out}, opacity 200ms ease`,
        '&:active': { transform: 'scale(0.94)' },
        '&.Mui-disabled': { opacity: 0.4, color: color.ink },
        [canHover]: { '&:hover': { bgcolor: color.paper, boxShadow: `inset 0 0 0 1px ${color.ink}` } },
      }}
    >
      {children}
    </IconButton>
  )
}

function ProjectIndex({ open, onClose }: { open: boolean; onClose: () => void }) {
  const fullScreen = useMediaQuery('(max-width:639.95px)')

  // The page underneath stays put while the index is open.
  useEffect(() => {
    pauseScroll(open)
    return () => pauseScroll(false)
  }, [open])

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
            borderRadius: fullScreen ? 0 : '24px',
            boxShadow: '0 40px 80px -40px rgba(14,14,14,0.5)',
          },
        },
        backdrop: { sx: { bgcolor: 'rgba(14, 14, 14, 0.56)' } },
      }}
    >
      {/* data-lenis-prevent lets the wheel scroll this list, not the page. */}
      <Box data-lenis-prevent>
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
            sx={{ color: color.ink, bgcolor: color.paper, '&:active': { transform: 'scale(0.94)' } }}
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
                <Box sx={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '16 / 10', bgcolor: color.ivoryDeep }}>
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
      </Box>
    </Dialog>
  )
}
