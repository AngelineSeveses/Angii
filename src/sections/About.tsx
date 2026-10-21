import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowRight, Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import { Btn } from '../components/Btn'
import { Section, SectionHeader, SectionIndex } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { site } from '../content/site'
import { useInquiry } from '../context/inquiry'
import { color, ease, font } from '../theme/tokens'

export function About() {
  const { startInquiry } = useInquiry()
  return (
    <Section id="about" labelledBy="about-title" tone="ivory">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: 6,
          rowGap: 12,
          alignItems: 'start',
        }}
      >
        <Reveal sx={{ gridColumn: { md: 'span 5' } }}>
          <Box component="figure" sx={{ m: 0 }}>
            <Box
              sx={{
                aspectRatio: '4 / 5',
                borderRadius: '12px',
                overflow: 'hidden',
                bgcolor: color.ink,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {site.portrait ? (
                <Box component="img" src={site.portrait} alt="Portrait of Angeline Seveses" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <>
                  <Typography
                    aria-hidden
                    sx={{
                      fontFamily: font.display,
                      fontWeight: 500,
                      fontSize: { xs: '6rem', lg: '8rem' },
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                      color: color.brass,
                    }}
                  >
                    AS
                  </Typography>
                  <Box sx={{ position: 'absolute', left: 24, right: 24, bottom: 24, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="overline" sx={{ color: color.onInkMuted }}>
                      Angeline Seveses
                    </Typography>
                    <Typography variant="overline" sx={{ color: color.onInkMuted }}>
                      Portfolio · {site.year}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            <Typography variant="caption" component="figcaption" sx={{ color: color.muted, mt: 3, display: 'block' }}>
              Web designer &amp; developer
            </Typography>
          </Box>
        </Reveal>

        <Box sx={{ gridColumn: { md: '7 / span 6' } }}>
          <Reveal>
            <SectionIndex index="07" label="About me" />
          </Reveal>
          <Reveal delay={60}>
            <Typography id="about-title" variant="h2" sx={{ mt: { xs: 6, md: 8 } }}>
              Hi, I&rsquo;m Angeline.
            </Typography>
          </Reveal>
          <Reveal delay={120}>
            <Typography variant="subtitle1" sx={{ color: color.ink, mt: 6 }}>
              I&rsquo;m a web designer and developer interested in the space between design, technology, and
              problem-solving.
            </Typography>
          </Reveal>
          <Reveal delay={160}>
            <Typography sx={{ color: color.slate, mt: 4 }}>
              My work includes website design, WordPress development, interactive web experiences, and 3DVista virtual
              tours. I also enjoy research and development&mdash;especially when there&rsquo;s a new tool to explore, a
              technical problem to solve, or an idea worth testing.
            </Typography>
            <Typography sx={{ color: color.slate, mt: 4 }}>
              I like work that gives me room to think, experiment, and improve. I&rsquo;m always building on what I know,
              whether that&rsquo;s refining my design process, learning more about frontend development, or finding a
              better way to implement an interaction.
            </Typography>
            <Typography sx={{ color: color.slate, mt: 4 }}>
              I&rsquo;m open to working with businesses, agencies, and teams that need help with websites, digital
              experiences, or ideas that need a practical technical approach.
            </Typography>
          </Reveal>
          <Reveal delay={200}>
            <Btn tone="ink" onClick={() => startInquiry()} endIcon={<ArrowRight size={18} weight="bold" />} sx={{ mt: 8 }}>
              Get in Touch
            </Btn>
          </Reveal>
        </Box>
      </Box>
    </Section>
  )
}

const toolGroups = [
  { group: 'Design', tools: ['Figma', 'Adobe Photoshop'] },
  { group: 'Website Development', tools: ['WordPress', 'Elementor'] },
  { group: 'Frontend', tools: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { group: 'Virtual Tours', tools: ['3DVista'] },
  { group: 'Version Control', tools: ['Git', 'GitHub'] },
  { group: 'Hosting & Deployment', tools: ['Vercel', 'Firebase'] },
  { group: 'Research & Development', tools: ['Technical research', 'Prototyping', 'Feasibility testing', 'Interface experiments'] },
]

export function Tools() {
  return (
    <Section labelledBy="tools-title" tone="paper">
      <SectionHeader
        index="08"
        label="Tools I use"
        titleId="tools-title"
        title="The tools behind the work."
        lead="I choose tools based on what a project needs. My current toolkit includes design software, website platforms, frontend technologies, and tools for managing and deploying code."
      />
      <Box component="dl" sx={{ m: 0, boxShadow: `inset 0 -1px 0 ${color.rule}` }}>
        {toolGroups.map((g, i) => (
          <Reveal
            key={g.group}
            delay={i * 40}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
              columnGap: 6,
              rowGap: 2,
              py: { xs: 4, md: 6 },
              boxShadow: `inset 0 1px 0 ${color.rule}`,
            }}
          >
            <Typography component="dt" variant="overline" sx={{ gridColumn: { md: 'span 3' }, color: color.muted, pt: { md: 1 } }}>
              {g.group}
            </Typography>
            <Box component="dd" sx={{ gridColumn: { md: '4 / span 9' }, m: 0 }}>
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', columnGap: 6, rowGap: 1 }}>
                {g.tools.map((t, j) => (
                  <Typography component="li" variant="h5" key={t} sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {t}
                    {j < g.tools.length - 1 && (
                      <Box component="span" aria-hidden sx={{ color: color.ruleStrong, fontWeight: 400 }}>
                        /
                      </Box>
                    )}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  )
}

const faqs = [
  {
    q: 'What kind of projects do you take on?',
    a: 'I work on website design, WordPress development, interactive web features, virtual tours, and selected research or prototyping projects.',
  },
  {
    q: 'Can you work with an existing website?',
    a: 'Yes. Depending on the platform and the issue, I can help improve layouts, refine responsive behavior, update pages, customize Elementor, or investigate frontend problems.',
  },
  {
    q: 'Can you design and develop a website?',
    a: "I can contribute to both design and implementation, depending on the project requirements. We'll discuss the scope, deliverables, and responsibilities before starting.",
  },
  {
    q: 'Do you work with agencies?',
    a: "I'm open to collaborating with agencies and creative teams that need support with web design, WordPress, interactive development, or related digital work.",
  },
  {
    q: 'Can you help if I only have an idea?',
    a: 'Yes. We can discuss the problem, explore possible approaches, and determine whether research or a small prototype would be a useful first step.',
  },
  {
    q: 'How much does a project cost?',
    a: 'It depends on the scope, complexity, deliverables, and timeline. Once I understand what you need, I can help define the work and provide an estimate.',
  },
  {
    q: 'How long will it take?',
    a: "Timelines depend on the project requirements, available content, technical complexity, and feedback process. I'll discuss a realistic timeline before work begins.",
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'We can discuss ongoing updates or support based on the project and what you need after launch.',
  },
]

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

export function Faq() {
  const [expanded, setExpanded] = useState<number | false>(false)
  return (
    <Section labelledBy="faq-title" tone="ivory">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: 6,
          rowGap: 12,
          alignItems: 'start',
        }}
      >
        <Box sx={{ gridColumn: { md: 'span 4' }, position: { md: 'sticky' }, top: { md: 112 } }}>
          <Reveal>
            <SectionIndex index="09" label="Project questions" />
          </Reveal>
          <Reveal delay={60}>
            <Typography id="faq-title" variant="h2" sx={{ mt: { xs: 6, md: 8 } }}>
              A few things you might want to know.
            </Typography>
          </Reveal>
          <Reveal delay={120}>
            <Typography sx={{ color: color.muted, mt: 6 }}>
              Something else on your mind?{' '}
              <Box component="a" href={`mailto:${site.email}`} sx={{ color: color.ink, textUnderlineOffset: '3px', textDecorationColor: color.ruleStrong }}>
                Email me directly
              </Box>
              .
            </Typography>
          </Reveal>
        </Box>

        <Reveal sx={{ gridColumn: { md: '6 / span 7' } }}>
          <Box sx={{ boxShadow: `inset 0 -1px 0 ${color.rule}` }}>
            {faqs.map((f, i) => (
              <Accordion
                key={f.q}
                expanded={expanded === i}
                onChange={(_, open) => setExpanded(open ? i : false)}
                slotProps={{ transition: { timeout: 300 }, heading: { component: 'h3' } }}
                sx={{ boxShadow: `inset 0 1px 0 ${color.rule}` }}
              >
                <AccordionSummary
                  expandIcon={<Plus size={18} />}
                  aria-controls={`faq-${i}-content`}
                  id={`faq-${i}-header`}
                  sx={{
                    px: 0,
                    py: 3,
                    minHeight: 0,
                    '& .MuiAccordionSummary-content': { m: 0, pr: 6 },
                    '& .MuiAccordionSummary-expandIconWrapper': { color: color.ink, transition: `transform 300ms ${ease.out}` },
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(45deg)' },
                    '@media (hover: hover) and (pointer: fine)': { '&:hover .faq-q': { color: color.slate } },
                  }}
                >
                  <Typography className="faq-q" variant="h5" component="span" sx={{ transition: 'color 200ms ease' }}>
                    {f.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0, pb: 6 }}>
                  <Typography sx={{ color: color.slate, maxWidth: 600 }}>{f.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Section>
  )
}
