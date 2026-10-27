import { type RefObject, useEffect, useLayoutEffect, useRef } from 'react'
import { finePointer, gsap, ScrollTrigger } from '../motion/motion'

export type ScreenKind = 'laptop' | 'phone'

// Seconds to travel one screen height: slow enough to read along.
const PACE: Record<ScreenKind, number> = { laptop: 3.2, phone: 3.4 }
// The phone starts a beat after the laptop so the two never move in lockstep.
const OFFSET: Record<ScreenKind, number> = { laptop: 0.8, phone: 2.2 }

// Glides every [data-screen] capture inside `root` from top to bottom and back.
// The loops run only while `playing`, while root is on screen, and while the
// pointer is not resting on `hoverTarget`. They are rebuilt when that element
// changes width, keeping their place. `key` rebuilds them for new captures.
// `pace` stretches the travel time: 1.4 scrolls 40% slower than the default.
export function useScreenLoops(root: RefObject<HTMLElement | null>, playing: boolean, hoverTarget: string, key?: unknown, pace = 1) {
  const playingRef = useRef(playing)
  const applyRef = useRef<() => void>(() => {})

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    let visible = true
    let hovering = false
    let loops: gsap.core.Timeline[] = []
    let built = false

    const apply = () => {
      const run = playingRef.current && visible && !hovering
      for (const tl of loops) {
        if (run) tl.play()
        else tl.pause()
      }
    }
    applyRef.current = apply

    const build = () => {
      const progress = loops.map((tl) => tl.progress())
      loops.forEach((tl) => tl.kill())
      loops = [...el.querySelectorAll<HTMLElement>('[data-screen]')].map((screen, i) => {
        const kind = screen.dataset.screen as ScreenKind
        const shot = screen.querySelector<HTMLElement>('img')!
        const view = screen.clientHeight
        const travel = Math.max(0, shot.offsetHeight - view)
        const tl = gsap.timeline({ repeat: -1, paused: true, delay: built ? 0 : OFFSET[kind] })
        tl.fromTo(shot, { y: 0 }, { y: -travel, duration: (travel / view) * PACE[kind] * pace, ease: 'sine.inOut' })
          .to(shot, { y: 0, duration: 2.4, ease: 'power3.inOut' }, '+=2.2')
          .to({}, { duration: 1.6 })
        if (progress[i]) tl.progress(progress[i])
        return tl
      })
      built = true
      apply()
    }

    const watch = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        visible = self.isActive
        apply()
      },
    })

    const target = el.querySelector<HTMLElement>(hoverTarget)!
    const onEnter = () => {
      if (!finePointer()) return
      hovering = true
      apply()
    }
    const onLeave = () => {
      hovering = false
      apply()
    }
    target.addEventListener('pointerenter', onEnter)
    target.addEventListener('pointerleave', onLeave)

    let width = 0
    let frame = 0
    const ro = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width)
      if (next === width) return
      width = next
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(build)
    })
    ro.observe(target)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
      target.removeEventListener('pointerenter', onEnter)
      target.removeEventListener('pointerleave', onLeave)
      watch.kill()
      loops.forEach((tl) => tl.kill())
      applyRef.current = () => {}
    }
  }, [root, hoverTarget, key, pace])

  useEffect(() => {
    playingRef.current = playing
    applyRef.current()
  }, [playing])
}
