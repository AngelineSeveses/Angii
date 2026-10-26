import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowDown, ArrowRight } from '@phosphor-icons/react'
import { Fragment, type ReactNode } from 'react'
import { Btn } from '../components/Btn'
import { Section, SectionHeader } from '../components/Layout'
import { DesignGraphic, MaintenanceGraphic, WordPressGraphic } from '../components/ServiceGraphics'
import { featuredProjects } from '../content/projects'
import { services, type Service } from '../content/services'
import { useInquiry } from '../context/inquiry'
import { accentTints, canHover, color, font } from '../theme/tokens'

const num = (i: number) => String(i + 1).padStart(2, '0')

// Each card's graphic, by service id.
const graphics: Record<string, () => ReactNode> = {
  'website-design': DesignGraphic,
  wordpress: WordPressGraphic,
  maintenance: MaintenanceGraphic,
}

// How much of each earlier card stays visible above the next one in the stack.
const PEEK = 76

export function Services() {
  return (
    <Section id="capabilities" labelledBy="capabilities-title" tone="ivory">
      <SectionHeader
        index="02"
        label="Capabilities"
        titleId="capabilities-title"
        title="Here's where I come in."
        lead="Whether you need a new website, a better experience for your visitors, or help looking after a website you've already built, I can help you figure out what needs to change and put it into practice."
      />
      {/* From md up the cards stick and stack as you scroll, deepest blue first. */}
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: { xs: 3, md: 6 } }}>
        {services.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </Box>
    </Section>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { startInquiry } = useInquiry()
  const tint = accentTints[index % accentTints.length]
  const onDark = tint.fg === color.onAccent
  const related = (service.related ?? []).flatMap((slug) => featuredProjects.filter((p) => p.slug === slug))
  const example = related[0]
  const titleId = `service-${service.id}-title`
  const Graphic = graphics[service.id] ?? DesignGraphic
  // "Explore …" leads to the related work; otherwise the button opens the form.
  const cta = example
    ? { href: `#work-${example.slug}`, icon: ArrowDown }
    : { onClick: () => startInquiry(service.need), icon: ArrowRight }

  return (
    <Box
      component="li"
      className="svc-card"
      id={`service-${service.id}`}
      aria-labelledby={titleId}
      sx={{
        position: { md: 'sticky' },
        top: { md: `calc(var(--header-h) + 16px + ${index * PEEK}px)` },
        // Links from the hero land the card exactly where it sticks in the stack.
        scrollMarginTop: { xs: '16px', md: `${16 + index * PEEK}px` },
        bgcolor: tint.bg,
        color: tint.fg,
        borderRadius: { xs: '20px', md: '28px' },
        p: { xs: 6, md: 10 },
        minHeight: { md: `min(600px, calc(100svh - var(--header-h) - 48px - ${index * PEEK}px))` },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 8, md: 12 },
        boxShadow: index > 0 ? '0 -24px 48px -32px rgba(14,14,14,0.35)' : 'none',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, minHeight: { md: PEEK - 40 } }}>
        <Typography
          id={titleId}
          component="h3"
          sx={{ m: 0, fontFamily: font.display, fontWeight: 400, fontSize: { xs: '1.75rem', md: '2.5rem' }, lineHeight: 1, letterSpacing: '-0.035em' }}
        >
          {service.title}
          <Box component="sup" sx={{ fontSize: '0.4em', letterSpacing: 0, ml: '0.3em', position: 'relative', top: '-0.1em' }}>
            ({num(index)})
          </Box>
        </Typography>
        <Btn
          tone={onDark ? 'light' : 'primary'}
          size="sm"
          href={cta.href}
          onClick={cta.onClick}
          endIcon={<cta.icon size={16} weight="bold" />}
          sx={{ display: { xs: 'none', md: 'inline-flex' } }}
        >
          {service.cta}
        </Btn>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: 6,
          rowGap: 8,
          mt: 'auto',
        }}
      >
        <Box sx={{ gridColumn: { md: 'span 5' } }}>
          <Typography component="p" sx={{ m: 0, fontFamily: font.display, fontSize: { xs: '1.375rem', md: '1.75rem' }, lineHeight: 1.15, letterSpacing: '-0.025em' }}>
            {service.headline}
          </Typography>
          <Typography sx={{ color: tint.muted, mt: 4, maxWidth: 480 }}>{service.body}</Typography>
          <Typography variant="body2" sx={{ color: tint.muted, mt: 6, maxWidth: 480 }}>
            <Box component="span" sx={{ color: tint.fg, fontWeight: 500 }}>
              Best for:{' '}
            </Box>
            {service.bestFor}
          </Typography>
          {service.note && (
            <Typography variant="caption" component="p" sx={{ color: tint.muted, m: 0, mt: 3, maxWidth: 480 }}>
              {service.note}
            </Typography>
          )}
        </Box>

        <Box sx={{ gridColumn: { md: '6 / span 4' } }}>
          <Typography variant="overline" component="h4" sx={{ m: 0, mb: 2, color: tint.muted }}>
            What I can help with
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              m: 0,
              p: 0,
              display: 'grid',
              gridTemplateColumns: '1fr',
            }}
          >
            {service.includes.map((item) => (
              <Box component="li" key={item} sx={{ py: 2.5, boxShadow: `inset 0 -1px 0 ${tint.rule}` }}>
                {item}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ gridColumn: { md: '10 / span 3' } }}>
          <Graphic />
          {related.length > 0 && (
            <Typography variant="body2" component="p" sx={{ m: 0, mt: 3 }}>
              <Box component="span" sx={{ color: tint.muted }}>
                Related work:
              </Box>{' '}
              {related.map((p, i) => (
                <Fragment key={p.slug}>
                  {i > 0 && ' · '}
                  <Box
                    component="a"
                    href={`#work-${p.slug}`}
                    sx={{
                      color: 'inherit',
                      fontWeight: 500,
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                      textDecorationColor: tint.rule,
                      transition: 'text-decoration-color 200ms ease',
                      [canHover]: { '&:hover': { textDecorationColor: 'currentColor' } },
                    }}
                  >
                    {p.name}
                  </Box>
                </Fragment>
              ))}
            </Typography>
          )}
        </Box>
      </Box>

      <Btn
        tone={onDark ? 'light' : 'primary'}
        href={cta.href}
        onClick={cta.onClick}
        endIcon={<cta.icon size={18} weight="bold" />}
        // Long labels like "Explore WordPress Development" wrap on small phones
        // instead of pushing the card past the screen edge.
        sx={{ display: { md: 'none' }, alignSelf: 'flex-start', maxWidth: '100%', whiteSpace: 'normal', textAlign: 'left' }}
      >
        {service.cta}
      </Btn>
    </Box>
  )
}
