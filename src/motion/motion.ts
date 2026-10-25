import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Lenis is the only smooth-scroll engine on the page. It is skipped entirely
// under reduced motion, where the browser's own instant scrolling is used.
let lenis: Lenis | null = null

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {}

  const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
  lenis = instance
  // Handy for checking sections from the console during development.
  if (import.meta.env.DEV) Object.assign(window, { __lenis: instance })
  instance.on('scroll', ScrollTrigger.update)
  const raf = (time: number) => instance.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  // In-page links glide instead of jumping, then hand focus to the target so
  // keyboard users land where they expect.
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const link = (e.target as Element).closest?.('a[href^="#"]') as HTMLAnchorElement | null
    const hash = link?.getAttribute('href')
    if (!link || !hash || hash === '#') return
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!target) return
    e.preventDefault()
    scrollToTarget(target)
    history.pushState(null, '', hash)
  }
  document.addEventListener('click', onClick)

  // Layout settles after fonts and lazy images arrive; re-measure triggers then.
  const refresh = () => ScrollTrigger.refresh()
  document.fonts?.ready.then(refresh)
  window.addEventListener('load', refresh)

  return () => {
    document.removeEventListener('click', onClick)
    window.removeEventListener('load', refresh)
    gsap.ticker.remove(raf)
    instance.destroy()
    lenis = null
  }
}

// immediate: jump without the glide, e.g. when a page opens on /#contact.
export function scrollToTarget(target: HTMLElement | string, { immediate = false }: { immediate?: boolean } = {}) {
  const el = typeof target === 'string' ? document.getElementById(target) : target
  if (!el) return
  const focus = () => {
    if (el.hasAttribute('tabindex') || el.matches('a, button, input, select, textarea')) el.focus({ preventScroll: true })
  }
  if (lenis) {
    // Same landing spot as a native anchor jump (header padding plus the
    // target's scroll-margin-top), measured from the real scroll position:
    // Lenis's own copy can lag a frame behind a scroll it has not seen yet.
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    lenis.scrollTo(el.getBoundingClientRect().top + window.scrollY - margin - padding, { immediate, onComplete: focus })
  } else {
    el.scrollIntoView({ behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    focus()
  }
}

// Overlays (the phone menu, dialogs) freeze the page underneath.
export function pauseScroll(paused: boolean) {
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}
