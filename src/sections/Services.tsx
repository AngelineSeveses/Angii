import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowDown, ArrowRight } from '@phosphor-icons/react'
import { Btn } from '../components/Btn'
import { Section, SectionHeader } from '../components/Layout'
import { featuredProjects } from '../content/projects'
import { services, type Service } from '../content/services'
import { useInquiry } from '../context/inquiry'
import { accentTints, canHover, ease, font } from '../theme/tokens'

const num = (i: number) => String(i + 1).padStart(2, '0')

// How much of each earlier card stays visible above the next one in the stack.
const PEEK = 76

export function Services() {
  return (
    <Section id="services" labelledBy="services-title" tone="ivory" sx={{ pt: { xs: 8, md: 10 } }}>
      <SectionHeader
        index="02"
        label="Services"
        titleId="services-title"
        title="Need a website, an interactive feature, or help figuring out how to build an idea?"
        lead="I work across design and development, depending on what a project needs. Here's where I can help."
      />
      {/* From md up the cards stick and stack as you scroll, deepest blue first. */}
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: { xs: 3, md: 6 } }}>
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
  const onDark = index < 2
  const example = featuredProjects.find((p) => p.slug === service.example)
  const titleId = `service-${service.id}-title`

  return (
    <Box
      component="li"
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
          onClick={() => startInquiry(service.need)}
          endIcon={<ArrowRight size={16} weight="bold" />}
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
              Good fit:{' '}
            </Box>
            {service.goodFit}
          </Typography>
        </Box>

        <Box sx={{ gridColumn: { md: example ? '6 / span 4' : '7 / span 6' } }}>
          <Typography variant="overline" component="h4" sx={{ m: 0, mb: 2, color: tint.muted }}>
            {service.includesLabel}
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              m: 0,
              p: 0,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: example ? '1fr' : '1fr 1fr' },
              columnGap: 6,
            }}
          >
            {service.includes.map((item) => (
              <Box component="li" key={item} sx={{ py: 2.5, boxShadow: `inset 0 -1px 0 ${tint.rule}` }}>
                {item}
              </Box>
            ))}
          </Box>
        </Box>

        {example && (
          <Box sx={{ gridColumn: { md: '10 / span 3' } }}>
            <Box
              component="a"
              href={`#work-${example.slug}`}
              sx={{
                display: 'block',
                color: 'inherit',
                textDecoration: 'none',
                '& img': { transition: `transform 600ms ${ease.out}` },
                [canHover]: { '&:hover img': { transform: 'scale(1.04)' } },
              }}
            >
              <Box sx={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '4 / 3', bgcolor: 'rgba(14,14,14,0.2)' }}>
                <Box
                  component="img"
                  src={example.images.desktop}
                  alt=""
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </Box>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 3, fontWeight: 500 }}>
                See an example: {example.name}
                <ArrowDown size={14} weight="bold" aria-hidden />
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Btn
        tone={onDark ? 'light' : 'primary'}
        onClick={() => startInquiry(service.need)}
        endIcon={<ArrowRight size={18} weight="bold" />}
        sx={{ display: { md: 'none' }, alignSelf: 'flex-start' }}
      >
        {service.cta}
      </Btn>
    </Box>
  )
}
