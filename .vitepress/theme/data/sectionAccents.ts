export const SECTION_ACCENTS: Record<string, string> = {
  'ai-analytics': '#534AB7',
  evaluation: '#0F6E56',
  about: '#F5A800',
  writing: '#F5A800',
  builds: '#F5A800',
}

export const DEFAULT_SECTION_ACCENT = '#F5A800'

export function sectionSlugFromPath(path: string): string | undefined {
  const parts = path.replace(/\.html$/i, '').replace(/\/$/, '').split('/').filter(Boolean)
  return parts[0]
}

export function sectionAccentForPath(path: string): string | undefined {
  const slug = sectionSlugFromPath(path)
  if (!slug) return undefined
  return SECTION_ACCENTS[slug] ?? DEFAULT_SECTION_ACCENT
}
