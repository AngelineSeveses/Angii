import { useEffect, useRef, useState } from 'react'

type Listener = (visible: boolean) => void

// One IntersectionObserver per rootMargin, shared by every element that uses it.
const observers = new Map<string, IntersectionObserver>()
const listeners = new WeakMap<Element, Listener>()

function observerFor(rootMargin: string) {
  let io = observers.get(rootMargin)
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) listeners.get(entry.target)?.(entry.isIntersecting)
      },
      { rootMargin, threshold: 0 },
    )
    observers.set(rootMargin, io)
  }
  return io
}

type Options = { once?: boolean; rootMargin?: string }

export function useInView<T extends Element>({ once = true, rootMargin = '0px 0px -12% 0px' }: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = observerFor(rootMargin)
    listeners.set(el, (visible) => {
      if (visible) {
        setInView(true)
        if (once) {
          io.unobserve(el)
          listeners.delete(el)
        }
      } else if (!once) {
        setInView(false)
      }
    })
    io.observe(el)
    return () => {
      io.unobserve(el)
      listeners.delete(el)
    }
  }, [once, rootMargin])

  return [ref, inView] as const
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
