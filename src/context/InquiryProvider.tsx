import { type ReactNode, useCallback, useMemo, useState } from 'react'
import type { Need } from '../content/services'
import { scrollToTarget } from '../motion/motion'
import { InquiryContext, type Preset } from './inquiry'

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<Preset>({ need: null, nonce: 0 })

  const startInquiry = useCallback((need?: Need) => {
    // On a case study page the form lives on the home page.
    if (!document.getElementById('contact')) {
      window.location.assign('/#contact')
      return
    }
    setPreset((p) => ({ need: need ?? null, nonce: p.nonce + 1 }))
    scrollToTarget('contact')
    document.getElementById('field-name')?.focus({ preventScroll: true })
  }, [])

  const value = useMemo(() => ({ preset, startInquiry }), [preset, startInquiry])
  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
}
