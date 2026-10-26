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
import { SplitWords } from '../components/SplitWords'
import { needs } from '../content/services'
import { mailto, site } from '../content/site'
import { useInquiry } from '../context/inquiry'
import { submitInquiry, type Inquiry } from '../lib/submitInquiry'
import { canHover, color, ease, font } from '../theme/tokens'

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
  if (f.needs.length === 0) e.needs = 'Pick at least one option, or choose "Not sure yet".'
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
  const [seenNonce, setSeenNonce] = useState(preset.nonce)

  // A service CTA elsewhere on the page preselects its matching need.
  // Adjusted during render rather than in an effect, so it lands in the same commit.
  if (preset.nonce !== seenNonce) {
    setSeenNonce(preset.nonce)
    const need = preset.need
    if (need) {
      setForm((f) => (f.needs.includes(need) ? f : { ...f, needs: [...f.needs, need] }))
      setStatus((s) => (s === 'sent' ? 'idle' : s))
    }
  }

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
    <Section id="contact" labelledBy="contact-title" tone="ivory">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' }, columnGap: 6, rowGap: 12, alignItems: 'start' }}>
        <Box sx={{ gridColumn: { md: 'span 5' }, position: { md: 'sticky' }, top: { md: 112 } }}>
          <Reveal>
            <SectionIndex index="07" label="Contact" />
          </Reveal>
          <SplitWords id="contact-title" text="Let's make your website work better." sx={{ typography: 'h2', m: 0, mt: { xs: 4, md: 6 }, maxWidth: 560 }} />
          <Typography variant="subtitle1" sx={{ color: color.slate, mt: 6 }}>
            Whether you&rsquo;re planning a new website, looking to improve an existing one, or need help keeping it up to
            date, tell me a little about what you&rsquo;re working on.
          </Typography>
          <Typography variant="body2" sx={{ color: color.muted, mt: 4 }}>
            You don&rsquo;t need to have every detail figured out before reaching out.
          </Typography>
          <Box sx={{ mt: 10, pt: 6, boxShadow: `inset 0 1px 0 ${color.rule}` }}>
            <Typography variant="overline" component="p" sx={{ color: color.muted, m: 0 }}>
              Email
            </Typography>
            <Box component="a" href={mailto} sx={{ color: color.ink, fontWeight: 500, textUnderlineOffset: '4px', textDecorationColor: color.ruleStrong }}>
              {site.email}
            </Box>
          </Box>
        </Box>

        <Box sx={{ gridColumn: { md: '7 / span 6' }, bgcolor: color.paper, borderRadius: { xs: '20px', md: '28px' }, p: { xs: 5, sm: 8, md: 10 } }}>
          {status === 'sent' ? (
            <Box
              ref={successRef}
              tabIndex={-1}
              role="status"
              sx={{
                p: { xs: 2, sm: 4 },
                outline: 'none',
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
            <Box component="form" noValidate onSubmit={onSubmit} aria-labelledby="form-title" sx={{ display: 'grid', gap: 8 }}>
              <Typography id="form-title" variant="h3" component="h3" sx={{ m: 0 }}>
                Tell me about your project.
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 6 }}>
                <Field id="name" label="Name" required error={errors.name}>
                  <TextInput id="name" autoComplete="name" value={form.name} onChange={(v) => set('name', v)} error={errors.name} />
                </Field>
                <Field id="email" label="Email" required error={errors.email}>
                  <TextInput id="email" type="email" autoComplete="email" value={form.email} onChange={(v) => set('email', v)} error={errors.email} />
                </Field>
              </Box>

              <Field id="company" label="Company or team" optional>
                <TextInput id="company" autoComplete="organization" value={form.company} onChange={(v) => set('company', v)} />
              </Field>

              <Box component="fieldset" sx={{ border: 0, m: 0, p: 0, minWidth: 0 }} aria-describedby={errors.needs ? 'field-needs-error' : undefined}>
                <Box component="legend" sx={labelSx}>
                  What do you need?
                  <Marker>Required</Marker>
                </Box>
                <Box id="field-needs" tabIndex={-1} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3, outline: 'none' }}>
                  {needs.map((n) => (
                    <NeedChip key={n} label={n} selected={form.needs.includes(n)} onToggle={() => toggleNeed(n)} />
                  ))}
                </Box>
                <ErrorText id="field-needs-error" message={errors.needs} />
              </Box>

              <Field id="message" label="A little about your project" required error={errors.message}>
                <TextInput
                  id="message"
                  multiline
                  minRows={5}
                  value={form.message}
                  onChange={(v) => set('message', v)}
                  error={errors.message}
                  placeholder="What does your business do? What are you hoping to build or improve?"
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
                  {status === 'sending' ? 'Sending…' : 'Send Project Inquiry'}
                </Btn>
                <Typography variant="body2" sx={{ color: color.muted }}>
                  Prefer email? Write to{' '}
                  <Box component="a" href={mailto} sx={{ color: color.ink, textUnderlineOffset: '3px', textDecorationColor: color.ruleStrong }}>
                    {site.email}
                  </Box>
                  .
                </Typography>
              </Box>

              {status === 'error' && (
                <Box
                  role="alert"
                  sx={{
                    display: 'flex',
                    gap: 3,
                    p: 4,
                    borderRadius: '12px',
                    bgcolor: '#FEF3F2',
                    boxShadow: 'inset 0 0 0 1px #FECDCA',
                    color: '#912018',
                    animation: `rise 400ms ${ease.out} both`,
                  }}
                >
                  <WarningCircle size={20} aria-hidden style={{ flexShrink: 0, marginTop: 2 }} />
                  <Typography variant="body2" sx={{ color: 'inherit' }}>
                    Something went wrong while sending your message. Please try again or{' '}
                    <Box component="a" href={mailto} sx={{ color: 'inherit', fontWeight: 600 }}>
                      email me directly
                    </Box>
                    .
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
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

function Marker({ children }: { children: string }) {
  return (
    <Typography component="span" variant="caption" sx={{ color: color.muted, fontWeight: 400 }}>
      {children}
    </Typography>
  )
}

type FieldProps = { id: string; label: string; required?: boolean; optional?: boolean; error?: string; children: ReactNode }

function Field({ id, label, required, optional, error, children }: FieldProps) {
  return (
    <Box>
      <Box component="label" htmlFor={`field-${id}`} sx={labelSx}>
        {label}
        {required && <Marker>Required</Marker>}
        {optional && <Marker>Optional</Marker>}
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
  bgcolor: color.ivory,
  borderRadius: '12px',
  fontSize: '1rem',
  lineHeight: '24px',
  '& .MuiOutlinedInput-input': { py: 3, px: 4, height: 'auto' },
  '&.MuiInputBase-multiline': { p: 0 },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: invalid ? '#B42318' : 'transparent',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
  },
  [canHover]: { '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: invalid ? '#B42318' : color.ink } },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: invalid ? '#B42318' : color.blueDeep,
    borderWidth: '1px',
    boxShadow: `0 0 0 3px ${invalid ? 'rgba(180,35,24,0.16)' : 'rgba(43,58,247,0.18)'}`,
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
              borderRadius: '12px',
              boxShadow: `0 0 0 1px ${color.rule}, 0 16px 32px -16px rgba(14,14,14,0.24)`,
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
        borderRadius: '999px',
        fontSize: '0.875rem',
        lineHeight: '20px',
        fontWeight: 500,
        fontFamily: font.body,
        color: selected ? color.ivory : color.ink,
        bgcolor: selected ? color.ink : color.ivory,
        boxShadow: `inset 0 0 0 1px ${selected ? color.ink : 'transparent'}`,
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
