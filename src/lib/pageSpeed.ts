import type { PageSpeed, ScoreCategory, SpeedHighlight } from '../content/projects'

const categoryLabel: Record<ScoreCategory, string> = {
  performance: 'Performance',
  accessibility: 'Accessibility',
  bestPractices: 'Best Practices',
  seo: 'SEO',
}

// "Oct 25, 2026" -> "October 2026"
const testedMonth = (measured: string) => new Date(measured).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

// The one score a project quotes, read from its report: desktop performance
// unless the project picks another category.
export function quotedScore(speed: PageSpeed, pick: SpeedHighlight = { device: 'desktop', category: 'performance' }) {
  return {
    score: speed[pick.device][pick.category],
    device: pick.device === 'desktop' ? 'Desktop' : 'Mobile',
    category: categoryLabel[pick.category],
    tested: testedMonth(speed.measured),
  }
}
