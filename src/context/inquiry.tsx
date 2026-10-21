import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import type { Need } from '../content/services'

type Preset = { need: Need | null; nonce: number }

type InquiryApi = {
  preset: Preset
  // Scrolls to the contact form and preselects a need, if one is given.
  startInquiry: (need?: Need) => void
}

const InquiryContext = createContext<InquiryApi | null>(null)

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<Preset>({ need: null, nonce: 0 })

  const startInquiry = useCallback((need?: Need) => {
    setPreset((p) => ({ need: need ?? null, nonce: p.nonce + 1 }))
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    document.getElementById('field-name')?.focus({ preventScroll: true })
  }, [])

  const value = useMemo(() => ({ preset, startInquiry }), [preset, startInquiry])
  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
}

export function useInquiry() {
  const ctx = useContext(InquiryContext)
  if (!ctx) throw new Error('useInquiry must be used inside InquiryProvider')
  return ctx
}
