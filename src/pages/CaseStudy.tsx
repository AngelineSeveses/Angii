import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from '@phosphor-icons/react'
import { type ReactNode, useEffect } from 'react'
import { BeforeAfter } from '../components/BeforeAfter'
import { Btn } from '../components/Btn'
import { DeviceShowcase, PhoneShell } from '../components/DeviceShowcase'
import { ProjectShot } from '../components/Frames'
import { Section, SectionIndex } from '../components/Layout'
import { SpeedReport } from '../components/PageSpeed'
import { Reveal } from '../components/Reveal'
import { SplitWords } from '../components/SplitWords'
import { caseStudyHref, featuredProjects, isDraft, type DeviceScreens, type FeaturedProject } from '../content/projects'
import { caseStudyMeta } from '../content/site'
import { sectionHref } from '../lib/links'
import { canHover, color, ease, font, glow, gradient } from '../theme/tokens'

type ChapterId = 'overview' | 'compare' | 'screens' | 'seo' | 'speed'

// A case study reads top to bottom: the work running on a laptop and a phone,
// then numbered chapters. Chapters without material for a project drop out
// and the rest renumber.
export function CaseStudy({ project }: { project: FeaturedProject }) {
  const index = featuredProjects.indexOf(project)
  const next = featuredProjects[(index + 1) % featuredProjects.length]
  const focus = project.category.split(' · ')

  const chapters = (
    [
      ['overview', true],
      ['compare', !!project.compare],
      ['screens', !!project.screens],
      ['seo', !!project.seo],
      ['speed', !!project.pageSpeed],
    ] as [ChapterId, boolean][]
  )
    .filter(([, present]) => present)
    .map(([id]) => id)
  const num = (id: ChapterId) => String(chapters.indexOf(id) + 1).padStart(2, '0')

  useEffect(() => {
    const previous = document.title
    document.title = caseStudyMeta(project).title
    return () => {
      document.title = previous
    }
  }, [project])

  return (
    <>
      <Section labelledBy="case-title" tone="ivory" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 12, md: 16 }, backgroundImage: glow('85% 70%', '60% 50%', 0.45) }}>
        <BackLink />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 3, mt: { xs: 10, md: 14 } }}>
          <Typography variant="overline" component="p" sx={{ m: 0, color: color.muted, fontVariantNumeric: 'tabular-nums' }}>
            Case study ({String(index + 1).padStart(2, '0')})
          </Typography>
          <Typography
            component="p"
            variant="overline"
            sx={{ m: 0, display: 'inline-flex', alignItems: 'center', gap: 2, px: 3, py: 1.5, borderRadius: '999px', bgcolor: color.lilac, color: color.ink }}
          >
            <Box component="span" aria-hidden sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color.accent }} />
            {project.name}
          </Typography>
        </Box>

        <Box component="h1" id="case-title" sx={{ m: 0, mt: { xs: 6, md: 8 } }}>
          <Box component="span" sx={visuallyHidden}>
            {project.name}:{' '}
          </Box>
          <SplitWords component="span" text={project.summary} immediate sx={{ display: 'block', typography: 'h2', maxWidth: 1120 }} />
        </Box>

        <Reveal delay={350}>
          <Box
            component="dl"
            sx={{
              m: 0,
              mt: { xs: 10, md: 14 },
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(auto-fit, minmax(0, 1fr))' },
              columnGap: 6,
              rowGap: 6,
            }}
          >
            <Meta term="Client">{project.name}</Meta>
            <Meta term="Focus">
              {focus.map((s) => (
                <Box component="span" key={s} sx={{ display: 'block' }}>
                  {s}
                </Box>
              ))}
            </Meta>
            <Meta term="My role">
              <DraftAware value={project.role} />
            </Meta>
            {project.tools && (
              <Meta term="Tools">
                <DraftAware value={project.tools} />
              </Meta>
            )}
            <Meta term="Website">
              <Box
                component="a"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.displayUrl} (opens in a new tab)`}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  color: color.ink,
                  textDecoration: 'none',
                  boxShadow: `inset 0 -1px 0 ${color.ruleStrong}`,
                  '& svg': { transition: `transform 200ms ${ease.out}` },
                  [canHover]: { '&:hover svg': { transform: 'translate(2px, -2px)' } },
                }}
              >
                {project.displayUrl}
                <ArrowUpRight size={14} weight="bold" aria-hidden />
              </Box>
            </Meta>
          </Box>
        </Reveal>

        <Box sx={{ mt: { xs: 10, md: 16 } }}>
          {project.screens ? (
            <DeviceShowcase screens={project.screens} name={project.name} href={project.url} label={project.displayUrl} />
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
      </Section>

      <Section labelledBy="overview-title" tone="ivory" sx={{ pt: { xs: 8, md: 12 } }}>
        <Chapter index={num('overview')} label="The project" title="What I worked on" titleId="overview-title">
          <Box sx={{ display: 'grid', gap: 6 }}>
            <Typography variant="subtitle1" sx={{ m: 0, color: color.slate }}>
              {project.challenge}
            </Typography>
            {project.story.map((paragraph) => (
              <Typography
                key={paragraph}
                sx={{ m: 0, fontFamily: font.display, fontSize: { xs: '1.25rem', md: '1.625rem' }, lineHeight: 1.35, letterSpacing: '-0.02em' }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
        </Chapter>

        {project.compare && (
          <Chapter
            index={num('compare')}
            label="Before and after"
            title="The old site and the new one"
            titleId="compare-title"
            wide
            note={
              <>
                Drag the handle, or use the arrow keys, to compare.{' '}
                {project.compare.archivedOn &&
                  `The old homepage is the version the Wayback Machine saved in ${project.compare.archivedOn}${
                    project.compare.archivedFrom ? `, when the company was still at ${project.compare.archivedFrom}` : ''
                  }.`}
                {project.compare.missingImages && ' The archive did not keep some of its images, so a few areas show up blank.'}
              </>
            }
          >
            <BeforeAfter pair={project.compare} name={project.name} sizes="(min-width: 1440px) 1360px, 100vw" />
          </Chapter>
        )}

        {project.screens && (
          <Chapter
            index={num('screens')}
            label="Desktop and mobile"
            title="Key screens, on desktop and mobile"
            titleId="screens-title"
            wide
            note={`Taken from the live homepage on ${project.screens.captured}, at 1440px on desktop and 390px on a phone.`}
          >
            <KeyScreens screens={project.screens} name={project.name} />
          </Chapter>
        )}

        {project.seo && <SeoBasics seo={project.seo} index={num('seo')} />}
        {project.pageSpeed && <SpeedReport speed={project.pageSpeed} name={project.name} index={num('speed')} />}
      </Section>

      <Section labelledBy="case-cta-title" tone="accent" sx={{ py: { xs: 20, md: 24 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' }, columnGap: 6, rowGap: 8, alignItems: 'end' }}>
          <Box sx={{ gridColumn: { md: 'span 8' } }}>
            <Typography variant="overline" component="p" sx={{ m: 0, color: 'rgba(241, 240, 236, 0.86)' }}>
              Have a project in mind?
            </Typography>
            <SplitWords id="case-cta-title" text="Let's make your website work better." sx={{ typography: 'h2', color: color.onAccent, m: 0, mt: { xs: 4, md: 6 } }} />
            <Typography variant="subtitle1" sx={{ color: 'rgba(241, 240, 236, 0.86)', mt: 6, maxWidth: 560 }}>
              You don&rsquo;t need to have every detail figured out before reaching out.
            </Typography>
          </Box>
          <Box sx={{ gridColumn: { md: '9 / span 4' }, display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: { md: 'flex-end' } }}>
            <Btn tone="white" href={sectionHref('contact')}>
              Start a Project
            </Btn>
            <Btn
              tone="whiteOutline"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} (opens in a new tab)`}
            >
              Visit the live site
            </Btn>
          </Box>
        </Box>
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

function BackLink() {
  return (
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
  )
}

function Meta({ term, children }: { term: string; children: ReactNode }) {
  return (
    <Box sx={{ pt: 4, boxShadow: `inset 0 1px 0 ${color.rule}` }}>
      <Typography component="dt" variant="overline" sx={{ color: color.muted, display: 'block' }}>
        {term}
      </Typography>
      <Typography component="dd" sx={{ m: 0, mt: 1, color: color.ink }}>
        {children}
      </Typography>
    </Box>
  )
}

function DraftAware({ value }: { value: string }) {
  if (!isDraft(value)) return <>{value}</>
  return (
    <Box
      component="span"
      title="Draft: confirm before publishing"
      sx={{ display: 'inline-block', px: 2, py: 0.5, borderRadius: '6px', color: '#7A5A2B', outline: `1px dashed ${color.brass}` }}
    >
      {value}
    </Box>
  )
}

type ChapterProps = {
  index: string
  label: string
  title: string
  titleId: string
  children: ReactNode
  // Wide chapters put the content under the heading at full width.
  wide?: boolean
  note?: ReactNode
}

// "(02) Before and after" with its heading on the left four columns.
function Chapter({ index, label, title, titleId, children, wide = false, note }: ChapterProps) {
  return (
    <Box
      component="section"
      aria-labelledby={titleId}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
        columnGap: 6,
        rowGap: { xs: 8, md: 12 },
        pt: { xs: 8, md: 10 },
        boxShadow: `inset 0 1px 0 ${color.rule}`,
        '& + &': { mt: { xs: 16, md: 24 } },
      }}
    >
      <Box sx={{ gridColumn: { md: 'span 4' } }}>
        <Reveal>
          <SectionIndex index={index} label={label} />
        </Reveal>
        <SplitWords id={titleId} text={title} sx={{ typography: 'h3', m: 0, mt: 3, maxWidth: 420 }} />
      </Box>
      {note && (
        <Typography variant="body2" sx={{ gridColumn: { md: '6 / span 7' }, color: color.muted, alignSelf: 'end', maxWidth: 640 }}>
          {note}
        </Typography>
      )}
      <Box sx={{ gridColumn: wide ? '1 / -1' : { md: '6 / span 7' } }}>{children}</Box>
    </Box>
  )
}

// Stills cropped from the same captures the devices scroll through, so the
// gallery costs no extra downloads.
function KeyScreens({ screens, name }: { screens: DeviceScreens; name: string }) {
  const desktop = [
    { at: 34, caption: 'Further down the homepage, on desktop' },
    { at: 74, caption: 'Lower on the homepage, on desktop' },
  ]
  const phone = [0, 46, 92]

  return (
    <Box sx={{ display: 'grid', gap: { xs: 6, md: 8 } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 6, md: 8 } }}>
        {desktop.map((shot, i) => (
          <Reveal key={shot.at} delay={i * 100} component="figure" sx={{ m: 0 }}>
            <Box
              sx={{
                aspectRatio: '16 / 10',
                overflow: 'hidden',
                borderRadius: { xs: '14px', md: '20px' },
                bgcolor: color.paper,
                boxShadow: `inset 0 0 0 1px ${color.rule}`,
              }}
            >
              <Box
                component="img"
                src={screens.laptop.src}
                alt={`${name} homepage, ${shot.caption.toLowerCase()}.`}
                width={screens.laptop.width}
                height={screens.laptop.height}
                loading="lazy"
                decoding="async"
                sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `50% ${shot.at}%` }}
              />
            </Box>
            <Typography variant="body2" component="figcaption" sx={{ color: color.muted, mt: 3 }}>
              {shot.caption}
            </Typography>
          </Reveal>
        ))}
      </Box>

      <Reveal component="figure" sx={{ m: 0 }}>
        <Box
          sx={{
            borderRadius: { xs: '20px', md: '32px' },
            background: gradient.stage,
            px: { xs: 4, sm: 10, md: 16 },
            py: { xs: 10, md: 16 },
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: { xs: 3, sm: 8, md: 12 },
            justifyItems: 'center',
          }}
        >
          {phone.map((at) => (
            <Box key={at} sx={{ width: '100%', maxWidth: 260 }}>
              <PhoneShell>
                <Box sx={{ aspectRatio: '390 / 844', overflow: 'hidden', borderRadius: '12.4% / 5.75%', bgcolor: color.paper }}>
                  <Box
                    component="img"
                    src={screens.phone.src}
                    alt=""
                    width={screens.phone.width}
                    height={screens.phone.height}
                    loading="lazy"
                    decoding="async"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `50% ${at}%` }}
                  />
                </Box>
              </PhoneShell>
            </Box>
          ))}
        </Box>
        <Typography variant="body2" component="figcaption" sx={{ color: color.muted, mt: 3 }}>
          The {name} homepage on a phone, from the top down.
        </Typography>
      </Reveal>
    </Box>
  )
}

// Technical SEO strengths of the live site, stated as facts about the site.
function SeoBasics({ seo, index }: { seo: NonNullable<FeaturedProject['seo']>; index: string }) {
  return (
    <Box
      component="section"
      aria-labelledby="seo-title"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
        columnGap: 6,
        rowGap: 8,
        mt: { xs: 16, md: 24 },
        pt: { xs: 8, md: 10 },
        boxShadow: `inset 0 1px 0 ${color.rule}`,
      }}
    >
      <Box sx={{ gridColumn: { md: 'span 4' } }}>
        <Reveal>
          <SectionIndex index={index} label="SEO basics" />
        </Reveal>
        <SplitWords id="seo-title" text="Set up to be found" sx={{ typography: 'h3', m: 0, mt: 3 }} />
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
