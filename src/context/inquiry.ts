import { createContext, useContext } from 'react'
import type { Need } from '../content/services'

export type Preset = { need: Need | null; nonce: number }

export type InquiryApi = {
  preset: Preset
  // Scrolls to the contact form and preselects a need, if one is given.
  startInquiry: (need?: Need) => void
}

export const InquiryContext = createContext<InquiryApi | null>(null)

export function useInquiry() {
  const ctx = useContext(InquiryContext)
  if (!ctx) throw new Error('useInquiry must be used inside InquiryProvider')
  return ctx
}
