import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { ArrowRight, Check, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { Btn } from '../components/Btn'
import { Section, SectionIndex } from '../components/Layout'
import { Reveal } from '../components/Reveal'
import { needs } from '../content/services'
import { site } from '../content/site'
import { useInquiry } from '../context/inquiry'
import { submitInquiry, type Inquiry } from '../lib/submitInquiry'
import { canHover, color, ease, font } from '../theme/tokens'

export function FinalCta() {
  const { startInquiry } = useInquiry()
  return (
    <Section labelledBy="cta-title" tone="ink" sx={{ py: { xs: 24, md: 24 } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' }, columnGap: 6, rowGap: 8 }}>
        <Reveal sx={{ gridColumn: { md: 'span 3' }, pt: { md: 4 } }}>
          <SectionIndex index="10" label="Have something in mind?" tone="ink" />
        </Reveal>
        <Box sx={{ gridColumn: { md: '4 / span 9' } }}>
          <Reveal delay={60}>
            <Typography
              id="cta-title"
              variant="h1"
              component="h2"
              sx={{ color: color.onInk, fontSize: { xs: '2.25rem', sm: '3rem', lg: '3.75rem' }, maxWidth: 820 }}
            >
              Tell me what you&rsquo;re working on.
            </Typography>
          </Reveal>
          <Reveal delay={120}>
            <Typography variant="subtitle1" sx={{ color: color.onInkMuted, mt: 8, maxWidth: 600 }}>
              Need a website? Have an interactive idea you&rsquo;d like to explore? Or looking for someone who can help
              with both the design and technical side of a project?
            </Typography>
            <Typography variant="subtitle1" sx={{ color: color.onInk, mt: 4, maxWidth: 600 }}>
              Tell me a little about it. We can figure out the next step from there.
            </Typography>
          </Reveal>
          <Reveal delay={180} sx={{ mt: 10, display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 8, rowGap: 4 }}>
            <Btn tone="primary" onClick={() => startInquiry()} endIcon={<ArrowRight size={18} weight="bold" />}>
              Start a Project
            </Btn>
            <Box
              component="a"
              href={`mailto:${site.email}`}
              sx={{
                color: color.onInk,
                fontSize: '1rem',
                lineHeight: '24px',
                fontWeight: 500,
                textDecoration: 'underline',
                textDecorationColor: color.onInkRule,
                textUnderlineOffset: '6px',
                transition: 'text-decoration-color 200ms ease',
                [canHover]: { '&:hover': { textDecorationColor: color.onInk } },
              }}
            >
              {site.email}
            </Box>
          </Reveal>
          <Reveal delay={220}>
            <Typography variant="body2" sx={{ color: color.onInkMuted, mt: 8 }}>
              Not everything needs to be figured out before the first conversation.
            </Typography>
          </Reveal>
        </Box>
      </Box>
    </Section>
  )
}

const budgets = ['Not sure yet', 'Under $2,000', '$2,000 to $5,000', '$5,000 to $10,000', '$10,000+']
const timelines = ['Flexible', 'As soon as possible', 'Within a month', 'One to three months', 'Three months or more']

type Errors = Partial<Record<'name' | 'email' | 'needs' | 'message', string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const emptyForm: Inquiry = { name: '', email: '', company: '', needs: [], message: '', budget: '', timeline: '', website: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Inquiry): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please add your name.'
  if (!f.email.trim()) e.email = 'Please add your email so I can reply.'
  else if (!emailPattern.test(f.email.trim())) e.email = 'That email address looks incomplete.'
  if (f.needs.length === 0) e.needs = 'Pick at least one option, or choose "Something else".'
  if (f.message.trim().length < 10) e.message = 'A sentence or two about the project is enough.'
  return e
}

export function ContactForm() {
  const { preset } = useInquiry()
  const [form, setForm] = useState<Inquiry>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const successRef = useRef<HTMLDivElement>(null)

  // A service CTA elsewhere on the page preselects its matching need.
  useEffect(() => {
    if (!preset.need) return
    const need = preset.need
    setForm((f) => (f.needs.includes(need) ? f : { ...f, needs: [...f.needs, need] }))
    setStatus((s) => (s === 'sent' ? 'idle' : s))
  }, [preset])

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus()
  }, [status])

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    const next = { ...form, [key]: value }
    setForm(next)
    if (touched) setErrors(validate(next))
  }

  const toggleNeed = (need: string) =>
    set('needs', form.needs.includes(need) ? form.needs.filter((n) => n !== need) : [...form.needs, need])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const found = validate(form)
    setErrors(found)
    const first = (['name', 'email', 'needs', 'message'] as const).find((k) => found[k])
    if (first) {
      document.getElementById(`field-${first}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitInquiry(form)
      setStatus('sent')
      setForm(emptyForm)
      setTouched(false)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <Section id="contact" labelledBy="contact-title" tone="paper">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' }, columnGap: 6, rowGap: 12, alignItems: 'start' }}>
        <Box sx={{ gridColumn: { md: 'span 4' }, position: { md: 'sticky' }, top: { md: 112 } }}>
          <Reveal>
            <Typography id="contact-title" variant="h2">
              Let&rsquo;s talk about your project.
            </Typography>
          </Reveal>
          <Reveal delay={60}>
            <Typography variant="subtitle1" sx={{ color: color.slate, mt: 6 }}>
              A few details will help me understand what you&rsquo;re looking for.
            </Typography>
          </Reveal>
          <Reveal delay={120}>
            <Box sx={{ mt: 10, pt: 6, boxShadow: `inset 0 1px 0 ${color.rule}` }}>
              <Typography variant="overline" component="p" sx={{ color: color.muted, m: 0 }}>
                Prefer email?
              </Typography>
              <Box component="a" href={`mailto:${site.email}`} sx={{ color: color.ink, fontWeight: 500, textUnderlineOffset: '4px', textDecorationColor: color.ruleStrong }}>
                {site.email}
              </Box>
            </Box>
          </Reveal>
        </Box>

        <Reveal delay={80} sx={{ gridColumn: { md: '6 / span 7' } }}>
          {status === 'sent' ? (
            <Box
              ref={successRef}
              tabIndex={-1}
              role="status"
              sx={{
                p: { xs: 6, sm: 10 },
                borderRadius: '12px',
                bgcolor: color.ivory,
                boxShadow: `inset 0 0 0 1px ${color.rule}`,
                animation: `rise 600ms ${ease.out} both`,
              }}
            >
              <CheckCircle size={28} color={color.blueDeep} weight="regular" aria-hidden />
              <Typography variant="h4" component="p" sx={{ mt: 4 }}>
                Thanks for reaching out. Your message has been submitted.
              </Typography>
              <Btn tone="outline" size="sm" onClick={() => setStatus('idle')} sx={{ mt: 8 }}>
                Send another message
              </Btn>
            </Box>
          ) : (
            <Box component="form" noValidate onSubmit={onSubmit} aria-describedby="form-note" sx={{ display: 'grid', gap: 8 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 6 }}>
                <Field id="name" label="Name" error={errors.name}>
                  <TextInput id="name" autoComplete="name" value={form.name} onChange={(v) => set('name', v)} error={errors.name} />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <TextInput id="email" type="email" autoComplete="email" value={form.email} onChange={(v) => set('email', v)} error={errors.email} />
                </Field>
              </Box>

              <Field id="company" label="Company or team" optional>
                <TextInput id="company" autoComplete="organization" value={form.company} onChange={(v) => set('company', v)} />
              </Field>

              <Box component="fieldset" sx={{ border: 0, m: 0, p: 0, minWidth: 0 }} aria-describedby={errors.needs ? 'field-needs-error' : undefined}>
                <Box component="legend" sx={labelSx}>
                  What do you need?
                </Box>
                <Box id="field-needs" tabIndex={-1} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3, outline: 'none' }}>
                  {needs.map((n) => (
                    <NeedChip key={n} label={n} selected={form.needs.includes(n)} onToggle={() => toggleNeed(n)} />
                  ))}
                </Box>
                <ErrorText id="field-needs-error" message={errors.needs} />
              </Box>

              <Field id="message" label="Tell me about the project" error={errors.message}>
                <TextInput
                  id="message"
                  multiline
                  minRows={5}
                  value={form.message}
                  onChange={(v) => set('message', v)}
                  error={errors.message}
                  placeholder="What are you building, who is it for, and where are you stuck?"
                />
              </Field>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 6 }}>
                <Field id="budget" label="Budget range" optional>
                  <ChoiceSelect id="budget" value={form.budget} options={budgets} onChange={(v) => set('budget', v)} />
                </Field>
                <Field id="timeline" label="Target timeline" optional>
                  <ChoiceSelect id="timeline" value={form.timeline} options={timelines} onChange={(v) => set('timeline', v)} />
                </Field>
              </Box>

              {/* Honeypot, hidden from people and assistive tech. */}
              <Box aria-hidden sx={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
                <label htmlFor="field-website">Website</label>
                <input id="field-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} />
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, pt: 2 }}>
                <Btn type="submit" tone="primary" disabled={status === 'sending'} endIcon={status === 'sending' ? undefined : <ArrowRight size={18} weight="bold" />}>
                  {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
                </Btn>
                <Typography id="form-note" variant="caption" sx={{ color: color.muted }}>
                  Fields marked optional can be left blank.
                </Typography>
              </Box>

              {status === 'error' && (
                <Box
                  role="alert"
                  sx={{
                    display: 'flex',
                    gap: 3,
                    p: 4,
                    borderRadius: '8px',
                    bgcolor: '#FEF3F2',
                    boxShadow: 'inset 0 0 0 1px #FECDCA',
                    color: '#912018',
                    animation: `rise 400ms ${ease.out} both`,
                  }}
                >
                  <WarningCircle size={20} aria-hidden style={{ flexShrink: 0, marginTop: 2 }} />
                  <Typography variant="body2" sx={{ color: 'inherit' }}>
                    Something went wrong while sending your message. Please try again or{' '}
                    <Box component="a" href={`mailto:${site.email}`} sx={{ color: 'inherit', fontWeight: 600 }}>
                      email me directly
                    </Box>
                    .
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Reveal>
      </Box>
    </Section>
  )
}

const labelSx = {
  p: 0,
  fontFamily: font.body,
  fontSize: '0.875rem',
  lineHeight: '20px',
  fontWeight: 500,
  color: color.ink,
  display: 'flex',
  gap: 2,
  alignItems: 'baseline',
} as const

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <Box>
      <Box component="label" htmlFor={`field-${id}`} sx={labelSx}>
        {label}
        {optional && (
          <Typography component="span" variant="caption" sx={{ color: color.muted, fontWeight: 400 }}>
            optional
          </Typography>
        )}
      </Box>
      <Box sx={{ mt: 2 }}>{children}</Box>
      <ErrorText id={`field-${id}-error`} message={error} />
    </Box>
  )
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  return (
    <Typography
      id={id}
      variant="body2"
      aria-live="polite"
      sx={{ color: '#B42318', mt: message ? 2 : 0, minHeight: 0, display: 'flex', gap: 1, alignItems: 'center' }}
    >
      {message}
    </Typography>
  )
}

const inputSx = (invalid: boolean) => ({
  width: '100%',
  bgcolor: color.paper,
  borderRadius: '6px',
  fontSize: '1rem',
  lineHeight: '24px',
  '& .MuiOutlinedInput-input': { py: 3, px: 4, height: 'auto' },
  '&.MuiInputBase-multiline': { p: 0 },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: invalid ? '#B42318' : color.ruleStrong,
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
  },
  [canHover]: { '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: invalid ? '#B42318' : color.ink } },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: invalid ? '#B42318' : color.blueDeep,
    borderWidth: '1px',
    boxShadow: `0 0 0 3px ${invalid ? 'rgba(180,35,24,0.16)' : 'rgba(37,99,235,0.18)'}`,
  },
  '& ::placeholder': { color: color.muted, opacity: 1 },
})

type TextInputProps = {
  id: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  autoComplete?: string
  multiline?: boolean
  minRows?: number
  placeholder?: string
}

function TextInput({ id, value, onChange, error, type = 'text', autoComplete, multiline, minRows, placeholder }: TextInputProps) {
  return (
    <OutlinedInput
      id={`field-${id}`}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete={autoComplete}
      multiline={multiline}
      minRows={minRows}
      placeholder={placeholder}
      notched={false}
      inputProps={{
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? `field-${id}-error` : undefined,
      }}
      sx={inputSx(!!error)}
    />
  )
}

function ChoiceSelect({ id, value, options, onChange }: { id: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <Select
      id={`field-${id}-select`}
      value={value}
      displayEmpty
      onChange={(e) => onChange(e.target.value)}
      input={<OutlinedInput id={`field-${id}`} notched={false} sx={inputSx(false)} />}
      renderValue={(v) => (v ? v : <Box component="span" sx={{ color: color.muted }}>Choose one</Box>)}
      MenuProps={{
        slotProps: {
          paper: {
            sx: {
              mt: 1,
              borderRadius: '8px',
              boxShadow: `0 0 0 1px ${color.rule}, 0 16px 32px -16px rgba(17,24,39,0.24)`,
              '& .MuiMenuItem-root': { fontSize: '1rem', py: 2 },
            },
          },
        },
        transitionDuration: { enter: 180, exit: 120 },
      }}
    >
      {options.map((o) => (
        <MenuItem key={o} value={o}>
          {o}
        </MenuItem>
      ))}
    </Select>
  )
}

function NeedChip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <ButtonBase
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        px: 4,
        py: 2,
        borderRadius: '6px',
        fontSize: '0.875rem',
        lineHeight: '20px',
        fontWeight: 500,
        fontFamily: font.body,
        color: selected ? color.ivory : color.ink,
        bgcolor: selected ? color.ink : color.paper,
        boxShadow: `inset 0 0 0 1px ${selected ? color.ink : color.ruleStrong}`,
        transition: `background-color 200ms ease, color 200ms ease, box-shadow 200ms ease, transform 160ms ${ease.out}`,
        '&:active': { transform: 'scale(0.97)' },
        [canHover]: { '&:hover': { boxShadow: `inset 0 0 0 1px ${color.ink}` } },
        '& .chip-check': {
          width: selected ? 14 : 0,
          opacity: selected ? 1 : 0,
          transition: `width 200ms ${ease.out}, opacity 150ms ease`,
          display: 'inline-flex',
          overflow: 'hidden',
        },
      }}
    >
      <Box component="span" className="chip-check" aria-hidden>
        <Check size={14} weight="bold" />
      </Box>
      {label}
    </ButtonBase>
  )
}
