export const faqs = [
  {
    q: 'How much does a project cost?',
    a: 'It depends on the scope, complexity, deliverables, and timeline. Once I understand what you need, I can help define the work and provide an estimate.',
  },
  {
    q: 'How long will it take?',
    a: "Timelines depend on the project requirements, available content, technical complexity, and feedback process. I'll discuss a realistic timeline before work begins.",
  },
  {
    q: 'What kind of projects do you take on?',
    a: 'I work on website design, WordPress development, interactive web features, and selected research or prototyping projects.',
  },
  {
    q: 'Can you work with an existing website?',
    a: 'Yes. Depending on the platform and the issue, I can help improve layouts, refine responsive behavior, update pages, customize Elementor, or investigate frontend problems.',
  },
  {
    q: 'Can you design and develop a website?',
    a: "I can contribute to both design and implementation, depending on the project requirements. We'll discuss the scope, deliverables, and responsibilities before starting.",
  },
  {
    q: 'Do you work with agencies?',
    a: "I'm open to collaborating with agencies and creative teams that need support with web design, WordPress, interactive development, or related digital work.",
  },
  {
    q: 'Can you help if I only have an idea?',
    a: 'Yes. We can discuss the problem, explore possible approaches, and determine whether research or a small prototype would be a useful first step.',
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'We can discuss ongoing updates or support based on the project and what you need after launch.',
  },
]

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
