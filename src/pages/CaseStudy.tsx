import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { BeforeAfter } from '../components/BeforeAfter'
import { Btn } from '../components/Btn'
import { ProjectShot } from '../components/Frames'
import { Section } from '../components/Layout'
import { SpeedReport } from '../components/PageSpeed'
import { SplitWords } from '../components/SplitWords'
import { caseStudyHref, featuredProjects, isDraft, type FeaturedProject } from '../content/projects'
import { site } from '../content/site'
import { canHover, color, ease, font } from '../theme/tokens'

// Interim case study page: the write-up, the before/after and a link to the
// live site, so "Read more" never lands on a dead end. The full case study
// design replaces this later.
export function CaseStudy({ project }: { project: FeaturedProject }) {
  const index = featuredProjects.indexOf(project)
  const next = featuredProjects[(index + 1) % featuredProjects.length]
  const tags = project.category.split(' · ')

  useEffect(() => {
    const previous = document.title
    document.title = `${project.name} · Case study · ${site.name}`
    return () => {
      document.title = previous
    }
  }, [project])

  return (
    <>
      <Section labelledBy="case-title" tone="ivory" sx={{ pt: { xs: 10, md: 14 } }}>
        <Box
          component="a"
          href="/#work"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            color: color.slate,
            textDecoration: 'none',
            fontWeight: 500,
            '& svg': { transition: `transform 200ms ${ease.out}` },
            [canHover]: { '&:hover': { color: color.ink }, '&:hover svg': { transform: 'translateX(-3px)' } },
          }}
        >
          <ArrowLeft size={16} weight="bold" aria-hidden />
          All work
        </Box>

        <Typography variant="overline" component="p" sx={{ m: 0, mt: { xs: 10, md: 14 }, color: color.muted, fontVariantNumeric: 'tabular-nums' }}>
          Case study ({String(index + 1).padStart(2, '0')})
        </Typography>
        <SplitWords component="h1" id="case-title" text={project.name} immediate sx={{ typography: 'h1', m: 0, mt: 4 }} />
        <Typography variant="subtitle1" sx={{ color: color.slate, mt: 6, maxWidth: 640 }}>
          {project.summary}
        </Typography>
        <Box component="ul" aria-label="Project type" sx={{ listStyle: 'none', m: 0, mt: 6, p: 0, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {tags.map((t) => (
            <Typography component="li" variant="caption" key={t} sx={{ px: 3, py: 1.5, borderRadius: '999px', bgcolor: color.ivoryDeep, color: color.ink }}>
              {t}
            </Typography>
          ))}
        </Box>

        <Box sx={{ mt: { xs: 10, md: 14 } }}>
          {project.compare ? (
            <>
              <BeforeAfter pair={project.compare} name={project.name} sizes="(min-width: 1440px) 1360px, 100vw" eager />
              <Typography variant="body2" sx={{ color: color.muted, mt: 3, maxWidth: 720 }}>
                Drag the handle to compare.{' '}
                {project.compare.archivedOn &&
                  `The old homepage is the version the Wayback Machine saved in ${project.compare.archivedOn}${
                    project.compare.archivedFrom ? `, when the company was still at ${project.compare.archivedFrom}` : ''
                  }.`}
                {project.compare.missingImages && ' The archive did not keep some of its images, so a few areas show up blank.'}
              </Typography>
            </>
          ) : (
            <ProjectShot
              href={project.url}
              label={project.displayUrl}
              name={project.name}
              src={project.images.desktop}
              alt={`${project.name} homepage.`}
              aspect="16 / 9"
            />
          )}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
            columnGap: 6,
            rowGap: 12,
            mt: { xs: 12, md: 20 },
          }}
        >
          <Box sx={{ gridColumn: { md: 'span 7' }, display: 'grid', gap: 6 }}>
            {project.story.map((paragraph) => (
              <Typography
                key={paragraph}
                sx={{ m: 0, fontFamily: font.display, fontSize: { xs: '1.25rem', md: '1.5rem' }, lineHeight: 1.35, letterSpacing: '-0.015em' }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>

          <Box sx={{ gridColumn: { md: '9 / span 4' } }}>
            <Box component="dl" sx={{ m: 0, display: 'grid', gap: 6 }}>
              <Detail term="My role" value={project.role} />
              {project.tools && <Detail term="Tools" value={project.tools} />}
              <Detail term="Website" value={project.displayUrl} />
            </Box>
            <Btn
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              tone="primary"
              endIcon={<ArrowUpRight size={18} weight="bold" />}
              aria-label={`Visit ${project.name} (opens in a new tab)`}
              sx={{ mt: 10 }}
            >
              Visit the live site
            </Btn>
          </Box>
        </Box>
        {project.seo && <SeoBasics seo={project.seo} />}
        {project.pageSpeed && <SpeedReport speed={project.pageSpeed} name={project.name} />}
      </Section>

      <Section labelledBy="next-title" tone="paper" sx={{ py: { xs: 16, md: 20 } }}>
        <Typography id="next-title" variant="overline" component="h2" sx={{ m: 0, color: color.muted }}>
          Next project
        </Typography>
        <Box
          component="a"
          href={caseStudyHref(next.slug)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 6,
            mt: 4,
            color: color.ink,
            textDecoration: 'none',
            '& svg': { transition: `transform 250ms ${ease.out}`, flexShrink: 0 },
            [canHover]: { '&:hover svg': { transform: 'translateX(6px)' } },
          }}
        >
          <Box component="span" sx={{ typography: 'h2' }}>
            {next.name}
          </Box>
          <ArrowRight size={40} weight="light" aria-hidden />
        </Box>
      </Section>
    </>
  )
}

// Technical SEO strengths of the live site, stated as facts about the site.
function SeoBasics({ seo }: { seo: NonNullable<FeaturedProject['seo']> }) {
  return (
    <Box
      component="section"
      aria-labelledby="seo-title"
      sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' }, columnGap: 6, rowGap: 8, mt: { xs: 16, md: 24 } }}
    >
      <Box sx={{ gridColumn: { md: 'span 4' } }}>
        <Typography variant="overline" component="p" sx={{ m: 0, color: color.muted }}>
          SEO basics
        </Typography>
        <Typography id="seo-title" variant="h3" component="h2" sx={{ mt: 2 }}>
          Set up to be found
        </Typography>
        <Typography variant="body2" sx={{ color: color.muted, mt: 4, maxWidth: 360 }}>
          What search engines find on the live site, checked {seo.checked}.
        </Typography>
      </Box>
      <Box component="ul" sx={{ gridColumn: { md: '6 / span 7' }, listStyle: 'none', m: 0, p: 0 }}>
        {seo.points.map((point) => (
          <Box
            component="li"
            key={point}
            sx={{ display: 'flex', gap: 3, alignItems: 'baseline', py: 3, boxShadow: `inset 0 -1px 0 ${color.rule}` }}
          >
            <Box component="span" aria-hidden sx={{ display: 'flex', color: color.accent, transform: 'translateY(2px)' }}>
              <Check size={16} weight="bold" />
            </Box>
            {point}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

function Detail({ term, value }: { term: string; value: string }) {
  const draft = isDraft(value)
  return (
    <Box sx={{ pt: 4, boxShadow: `inset 0 1px 0 ${color.rule}` }}>
      <Typography component="dt" variant="overline" sx={{ color: color.muted, display: 'block' }}>
        {term}
      </Typography>
      <Typography
        component="dd"
        title={draft ? 'Draft: confirm before publishing' : undefined}
        sx={{
          m: 0,
          mt: 1,
          color: color.ink,
          ...(draft && { display: 'inline-block', px: 2, py: 0.5, borderRadius: '6px', color: '#7A5A2B', outline: `1px dashed ${color.brass}` }),
        }}
      >
        {value}
      </Typography>
    </Box>
  )
}
