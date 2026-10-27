import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from '@phosphor-icons/react'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { Btn } from '../components/Btn'
import { PhoneFrame } from '../components/Frames'
import { Section, SectionHeader } from '../components/Layout'
import { ProjectMockup } from '../components/Mockup'
import { SpeedHighlight } from '../components/PageSpeed'
import { Reveal } from '../components/Reveal'
import { allProjects, caseStudyHref, featuredProjects, moreProjects, type FeaturedProject } from '../content/projects'
import { useInquiry } from '../context/inquiry'
import { pauseScroll, prefersReducedMotion } from '../motion/motion'
import { canHover, color, ease, font } from '../theme/tokens'

export function Work() {
  const [indexOpen, setIndexOpen] = useState(false)

  return (
    <Section id="work" labelledBy="work-title" tone="ivory" sx={{ pt: { xs: 8, md: 10 } }}>
      <SectionHeader
        index="03"
        label="Selected work"
        titleId="work-title"
        title="Real projects. Practical solutions."
        count={featuredProjects.length}
        lead="Every business has different needs. My work spans service businesses, construction, outsourcing, automotive, and other industries, with an emphasis on making websites easier to understand and use."
      />

      {/* White cards, two to a row. With an odd number of projects, the last
          slot invites the visitor to start one. */}
      <Box
        component="ol"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
          gap: { xs: 4, md: 6 },
        }}
      >
        {featuredProjects.map((project, i) => (
          <Reveal component="li" key={project.slug} delay={(i % 2) * 80} sx={{ display: 'flex' }}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
        {featuredProjects.length % 2 === 1 && (
          <Reveal component="li" delay={80} sx={{ display: 'flex' }}>
            <StartCard />
          </Reveal>
        )}
      </Box>

      <MoreProjects onViewAll={() => setIndexOpen(true)} />
      <ProjectIndex open={indexOpen} onClose={() => setIndexOpen(false)} />
    </Section>
  )
}

// One project in a white card: the live homepage on desktop and phone (both
// scroll while the pointer rests on the card), then the write-up and its
// real PageSpeed score. The before/after comparison lives on the case study.
function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const titleId = `project-${project.slug}`
  const tags = project.category.split(' · ')
  const caseStudy = caseStudyHref(project.slug)
  return (
    <Box
      component="article"
      className="project-card"
      id={`work-${project.slug}`}
      aria-labelledby={titleId}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: color.paper,
        borderRadius: { xs: '24px', md: '28px' },
        p: { xs: 2, md: 3 },
        scrollMarginTop: 'calc(var(--header-h) + 16px)',
        boxShadow: '0 0 0 1px rgba(14, 14, 14, 0.04)',
        transition: 'box-shadow 300ms ease',
        [canHover]: { '&:hover': { boxShadow: '0 0 0 1px rgba(14, 14, 14, 0.06), 0 28px 56px -32px rgba(14, 14, 14, 0.32)' } },
      }}
    >
      {/* The picture repeats the "View Project" link below, so it stays out of the tab order. */}
      <Box component="a" href={caseStudy} tabIndex={-1} aria-hidden sx={{ display: 'block' }}>
        {project.screens ? (
          <ProjectMockup project={project} />
        ) : (
          <Box sx={{ aspectRatio: '16 / 11', borderRadius: { xs: '16px', md: '20px' }, overflow: 'hidden', bgcolor: color.ivory }}>
            <Box component="img" src={project.images.desktop} alt="" loading="lazy" decoding="async" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </Box>
        )}
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', px: { xs: 3, md: 5 }, pt: { xs: 6, md: 7 }, pb: { xs: 4, md: 5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 4 }}>
          <Typography id={titleId} variant="h3" component="h3">
            {project.name}
          </Typography>
          <Typography variant="overline" component="p" sx={{ m: 0, color: color.muted, fontVariantNumeric: 'tabular-nums' }}>
            ({String(index + 1).padStart(2, '0')})
          </Typography>
        </Box>
        <Typography sx={{ mt: 3, fontFamily: font.display, fontSize: { xs: '1.1875rem', md: '1.3125rem' }, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          {project.summary}
        </Typography>
        <Typography sx={{ color: color.slate, mt: 3 }}>{project.challenge}</Typography>

        <Typography variant="overline" component="p" id={`${titleId}-focus`} sx={{ m: 0, mt: 5, color: color.muted }}>
          Focus
        </Typography>
        <Box component="ul" aria-labelledby={`${titleId}-focus`} sx={{ listStyle: 'none', m: 0, mt: 2, p: 0, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {tags.map((t) => (
            <Typography component="li" variant="caption" key={t} sx={{ px: 3, py: 1.5, borderRadius: '999px', bgcolor: color.ivory, color: color.ink }}>
              {t}
            </Typography>
          ))}
        </Box>

        {/* Pinned to the bottom, so the two cards in a row line up. */}
        <Box sx={{ mt: 'auto', pt: 6, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
          {project.pageSpeed && <SpeedHighlight speed={project.pageSpeed} pick={project.speedHighlight} sx={{ mt: 0 }} />}
          {/* The full write-up lives on the project's case study page. */}
          <Btn href={caseStudy} tone="white" aria-label={`View the ${project.name} project`}>
            View Project
          </Btn>
        </Box>
      </Box>
    </Box>
  )
}

// Fills the empty slot after an odd number of projects with the next step.
function StartCard() {
  const { startInquiry } = useInquiry()
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: { xs: 360, md: 'auto' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
        p: { xs: 8, md: 12 },
        borderRadius: { xs: '24px', md: '28px' },
        bgcolor: color.accent,
        color: color.onAccent,
      }}
    >
      <Typography variant="overline" component="p" sx={{ m: 0, color: 'rgba(241, 240, 236, 0.86)' }}>
        Have a project in mind?
      </Typography>
      <Box>
        <Typography component="h3" sx={{ typography: 'h2', color: 'inherit', maxWidth: 520 }}>
          Let&rsquo;s make your website work better.
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 5, color: 'rgba(241, 240, 236, 0.86)', maxWidth: 440 }}>
          You don&rsquo;t need to have every detail figured out before reaching out.
        </Typography>
        <Btn
          tone="white"
          onClick={() => startInquiry()}
          sx={{ mt: 8 }}
        >
          Start a Project
        </Btn>
      </Box>
    </Box>
  )
}

// A sideways rail of phone views. Arrow buttons step one card at a time;
// touch and trackpads scroll it directly.
function MoreProjects({ onViewAll }: { onViewAll: () => void }) {
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
            More Work
          </Typography>
          <Typography sx={{ color: color.muted, mt: 2 }}>Additional projects across different industries.</Typography>
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

      <Btn tone="white" onClick={onViewAll} aria-haspopup="dialog" sx={{ mt: { xs: 8, md: 10 } }}>
        View All Projects
      </Btn>
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
