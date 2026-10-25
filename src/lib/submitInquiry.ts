import { site } from '../content/site'

export type Inquiry = {
  name: string
  email: string
  company: string
  needs: string[]
  message: string
  budget: string
  timeline: string
  // Honeypot. Real people never see or fill this field.
  website: string
}

// FormSubmit emails each inquiry to site.email with no account or server.
// The very first submission sends an "Activate Form" email to that address;
// nothing is delivered until that link is clicked once.
// Set VITE_FORM_ENDPOINT to post somewhere else instead (Formspree, a Vercel
// function, ...); any endpoint that takes JSON and answers 2xx works.
const endpoint = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || `https://formsubmit.co/ajax/${site.email}`

// Resolves only once the endpoint confirms delivery, so the UI never shows
// success for a message that was not sent.
export async function submitInquiry(data: Inquiry): Promise<void> {
  if (data.website) return // bot: pretend it worked, send nothing

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company || '—',
      needs: data.needs.join(', '),
      message: data.message,
      budget: data.budget || '—',
      timeline: data.timeline || '—',
      _subject: `New inquiry from ${data.name}`,
      _replyto: data.email,
      _template: 'table',
      _captcha: 'false',
    }),
  })
  if (!res.ok) throw new Error(`Inquiry endpoint answered ${res.status}`)

  // FormSubmit answers 200 even when it did not deliver (for example before
  // the form is activated), and says so in the body.
  const body = (await res.json().catch(() => null)) as { success?: boolean | string; message?: string } | null
  if (body && (body.success === false || body.success === 'false')) {
    throw new Error(body.message || 'Inquiry endpoint did not accept the message')
  }
}
