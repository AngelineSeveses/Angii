import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { ArrowRight, Plus } from '@phosphor-icons/react'
import { type KeyboardEvent, useRef, useState } from 'react'
import { Btn } from '../components/Btn'
import { Section, SectionHeader } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { services, type Service } from '../content/services'
import { useInquiry } from '../context/inquiry'
import { canHover, color, ease } from '../theme/tokens'

const num = (i: number) => String(i + 1).padStart(2, '0')

export function Services() {
  return (
    <Section id="services" labelledBy="services-title" tone="ivory">
      <SectionHeader
        index="03"
        label="What I can help with"
        titleId="services-title"
        title="Need a website, an interactive feature, or help figuring out how to build an idea?"
        lead="I work across design and development, depending on what a project needs. Here's where I can help."
      />
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <ServiceTabs />
      </Box>
      <Box sx={{ display: { md: 'none' } }}>
        <ServiceAccordion />
      </Box>
    </Section>
  )
}

function ServiceTabs() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number) => {
    const next = (i + services.length) % services.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: services.length - 1 }
    if (e.key in map) {
      e.preventDefault()
      select(map[e.key])
    }
  }

  const service = services[active]

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', columnGap: 6 }}>
      <Reveal sx={{ gridColumn: 'span 4' }}>
        <Box role="tablist" aria-orientation="vertical" aria-label="Services" onKeyDown={onKeyDown} sx={{ position: 'sticky', top: 96 }}>
          {services.map((s, i) => {
            const selected = i === active
            return (
              <ButtonBase
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`panel-${s.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 4,
                  py: 4,
                  textAlign: 'left',
                  boxShadow: `inset 0 1px 0 ${color.rule}`,
                  '&:last-of-type': { boxShadow: `inset 0 1px 0 ${color.rule}, inset 0 -1px 0 ${color.rule}` },
                  color: selected ? color.ink : color.muted,
                  transition: 'color 200ms ease',
                  [canHover]: { '&:hover': { color: color.ink } },
                  '& .tab-arrow': {
                    ml: 'auto',
                    opacity: selected ? 1 : 0,
                    transform: selected ? 'translateX(0)' : 'translateX(-8px)',
                    transition: `opacity 200ms ease, transform 300ms ${ease.out}`,
                    color: color.blueDeep,
                  },
                }}
              >
                <Typography variant="overline" component="span" sx={{ color: selected ? color.blueDeep : color.muted, minWidth: 24, fontVariantNumeric: 'tabular-nums' }}>
                  {num(i)}
                </Typography>
                <Typography variant="h5" component="span" sx={{ color: 'inherit' }}>
                  {s.title}
                </Typography>
                <Box className="tab-arrow" sx={{ display: 'flex' }}>
                  <ArrowRight size={18} weight="bold" aria-hidden />
                </Box>
              </ButtonBase>
            )
          })}
        </Box>
      </Reveal>

      <Box
        key={service.id}
        role="tabpanel"
        id={`panel-${service.id}`}
        aria-labelledby={`tab-${service.id}`}
        tabIndex={0}
        sx={{
          gridColumn: '6 / span 7',
          minHeight: 560,
          animation: `panelIn 420ms ${ease.out} both`,
          '@keyframes panelIn': { from: { opacity: 0, transform: 'translateY(8px)', filter: 'blur(2px)' } },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          '&:focus-visible': { outlineOffset: 8 },
        }}
      >
        <ServiceDetail service={service} index={active} showTitle />
      </Box>
    </Box>
  )
}

function ServiceDetail({ service, index, showTitle = false }: { service: Service; index: number; showTitle?: boolean }) {
  const { startInquiry } = useInquiry()
  return (
    <Box>
      {showTitle && (
        <Typography variant="overline" component="p" sx={{ color: color.muted, m: 0, mb: 4 }}>
          {num(index)} · {service.title}
        </Typography>
      )}
      <Typography variant="h3" component="h3" sx={{ maxWidth: 600 }}>
        {service.headline}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: color.slate, mt: 4, maxWidth: 600 }}>
        {service.body}
      </Typography>

      <Typography variant="overline" component="h4" sx={{ color: color.muted, mt: 10, mb: 4 }}>
        {service.includesLabel}
      </Typography>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          columnGap: 6,
        }}
      >
        {service.includes.map((item) => (
          <Box
            component="li"
            key={item}
            sx={{
              display: 'flex',
              gap: 3,
              alignItems: 'baseline',
              py: 3,
              boxShadow: `inset 0 -1px 0 ${color.rule}`,
              color: color.ink,
            }}
          >
            <Box aria-hidden sx={{ width: 6, height: 6, flexShrink: 0, bgcolor: color.brass, borderRadius: '1px', transform: 'translateY(-2px)' }} />
            {item}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mt: 10,
          p: { xs: 4, sm: 6 },
          borderRadius: '8px',
          bgcolor: color.paper,
          boxShadow: `inset 0 0 0 1px ${color.rule}`,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { lg: 'center' },
          justifyContent: 'space-between',
          gap: 6,
        }}
      >
        <Box sx={{ maxWidth: 400 }}>
          <Typography variant="overline" component="p" sx={{ color: color.muted, m: 0 }}>
            Good fit for
          </Typography>
          <Typography sx={{ mt: 1 }}>{service.goodFit}</Typography>
        </Box>
        <Btn tone="primary" onClick={() => startInquiry(service.need)} endIcon={<ArrowRight size={18} weight="bold" />} sx={{ flexShrink: 0, alignSelf: { xs: 'flex-start', lg: 'center' } }}>
          {service.cta}
        </Btn>
      </Box>
    </Box>
  )
}

function ServiceAccordion() {
  const [expanded, setExpanded] = useState<string | false>(services[0].id)
  return (
    <Box sx={{ boxShadow: `inset 0 -1px 0 ${color.rule}` }}>
      {services.map((s, i) => (
        <Accordion
          key={s.id}
          expanded={expanded === s.id}
          onChange={(_, open) => setExpanded(open ? s.id : false)}
          slotProps={{ transition: { timeout: 320, unmountOnExit: true }, heading: { component: 'h3' } }}
          sx={{ boxShadow: `inset 0 1px 0 ${color.rule}` }}
        >
          <AccordionSummary
            expandIcon={<Plus size={18} />}
            aria-controls={`svc-${s.id}-content`}
            id={`svc-${s.id}-header`}
            sx={{
              px: 0,
              py: 2,
              minHeight: 0,
              '& .MuiAccordionSummary-content': { m: 0, gap: 4, alignItems: 'baseline' },
              '& .MuiAccordionSummary-expandIconWrapper': { color: color.ink, transition: `transform 300ms ${ease.out}` },
              '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(45deg)' },
            }}
          >
            <Typography variant="overline" component="span" sx={{ color: color.muted, minWidth: 24 }}>
              {num(i)}
            </Typography>
            <Typography variant="h5" component="span">
              {s.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 2, pb: 10 }}>
            <ServiceDetail service={s} index={i} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
