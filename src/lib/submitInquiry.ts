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

// Netlify Forms receives each inquiry, filters spam, keeps a copy under Forms in
// the Netlify dashboard and emails it to the addresses set in Forms > Submission
// notifications. Netlify finds the form through the hidden copy in index.html, so
// the form name and field names there must match these. Replying to the
// notification email answers the sender, because the form has an `email` field.
const FORM_NAME = 'inquiry'

// Resolves only once Netlify accepts the message, so the UI never shows success
// for a message that was not received.
export async function submitInquiry(data: Inquiry): Promise<void> {
  if (data.website) return // bot: pretend it worked, send nothing

  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'form-name': FORM_NAME,
      name: data.name,
      email: data.email,
      company: data.company || '—',
      needs: data.needs.join(', '),
      message: data.message,
      budget: data.budget || '—',
      timeline: data.timeline || '—',
      website: '',
    }).toString(),
  })
  // Netlify answers 404 when it doesn't know the form, for example before form
  // detection is turned on, or when running locally.
  if (!res.ok) throw new Error(`Form submission answered ${res.status}`)
}
