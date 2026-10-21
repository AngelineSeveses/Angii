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

// Posts the inquiry as JSON to VITE_FORM_ENDPOINT (Formspree, Web3Forms, a
// Vercel function, or a Firebase function all accept this shape). Resolves only
// when the endpoint answers with a 2xx status, so the UI never shows success
// for a message that was not delivered.
export async function submitInquiry(data: Inquiry): Promise<void> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined
  if (!endpoint) {
    throw new Error('VITE_FORM_ENDPOINT is not set. Add it to .env.local (see .env.example).')
  }
  if (data.website) return // bot: pretend it worked, send nothing

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company,
      needs: data.needs.join(', '),
      message: data.message,
      budget: data.budget,
      timeline: data.timeline,
      _subject: `New inquiry from ${data.name}`,
    }),
  })
  if (!res.ok) throw new Error(`Inquiry endpoint answered ${res.status}`)
}
