export const faqs = [
  {
    q: 'What types of projects do you take on?',
    a: 'I focus on website design, WordPress development, and website maintenance. I can help with a new website, a redesign, improvements to an existing site, or ongoing updates.',
  },
  {
    q: 'Can you design and build my website?',
    a: 'Yes. I can work across the design and implementation stages, from planning the pages and designing the interface to building the website and checking the finished experience.',
  },
  {
    q: 'Can you work with an existing WordPress website?',
    a: 'Yes. Depending on the website, I can help with layout improvements, Elementor customization, responsive fixes, content changes, and other agreed updates.',
  },
  {
    q: 'Do you work with agencies?',
    a: "Yes. I'm open to collaborating with agencies and teams that need additional support with website design, WordPress development, or website maintenance.",
  },
  {
    q: 'Do you offer ongoing maintenance?',
    a: 'Yes. Maintenance can include content updates, WordPress and plugin updates, minor design changes, and troubleshooting, depending on the website and agreed scope.',
  },
  {
    q: 'How much does a website cost?',
    a: "Pricing depends on the project's scope, complexity, deliverables, and timeline. Once I understand what you need, I can provide a more relevant estimate.",
  },
  {
    q: 'How long does a project take?',
    a: "It depends on the size of the project, the requirements, and how quickly content and feedback are provided. I'll discuss the expected timeline before work begins.",
  },
  {
    q: "What if I'm not sure what I need yet?",
    a: "That's fine. Tell me a little about your business, your current website, and what you'd like to improve. We can work out a sensible starting point together.",
  },
]

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
