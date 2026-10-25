// On the home page section links are plain hashes, so they glide in place;
// from a case study page they lead back to that section of the home page.
export const sectionHref = (id: string) => (window.location.pathname === '/' ? `#${id}` : `/#${id}`)
