import { useEffect, useState } from 'react'

// Tracks which of the given section ids sits under the middle of the viewport.
export function useActiveSection<T extends string>(ids: readonly T[]) {
  const [active, setActive] = useState<T | null>(null)

  useEffect(() => {
    const visible = new Set<T>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as T
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
        }
        setActive(ids.find((id) => visible.has(id)) ?? null)
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [ids])

  return active
}
