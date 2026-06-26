import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const draftsDir = join(root, '_drafts')

const SPECIAL_PATHS = {
  'homepage.md': 'index.md',
  'tools-av-va.md': 'tools/ava/index.md',
  'frameworks-grid-plus.md': 'frameworks/grid-plus/index.md',
}

function draftToPath(filename) {
  if (SPECIAL_PATHS[filename]) return SPECIAL_PATHS[filename]
  const base = filename.replace(/\.md$/, '')
  const dash = base.indexOf('-')
  const category = base.slice(0, dash)
  const slug = base.slice(dash + 1)
  return `${category}/${slug}/index.md`
}

function parseFrontmatter(content) {
  if (!content.startsWith('---\n')) return { frontmatter: '', body: content }
  const end = content.indexOf('\n---\n', 4)
  if (end === -1) return { frontmatter: '', body: content }
  return {
    frontmatter: content.slice(4, end),
    body: content.slice(end + 5),
  }
}

function normalizeInternalLinks(body) {
  return body.replace(/\]\((\/[^)\s#]+)\)/g, (match, path) => {
    if (path.endsWith('/')) return match
    if (/\.[a-z0-9]+$/i.test(path)) return match
    return `](${path}/)`
  })
}

function processDraftBody(raw, { homepage = false } = {}) {
  let lines = raw.replace(/\r\n/g, '\n').trimEnd().split('\n')

  // Drop Tags line
  lines = lines.filter((line) => !/^Tags:\s/.test(line))

  // Drop horizontal rules
  lines = lines.filter((line) => line.trim() !== '---')

  // Drop disclosure footnotes (*...* on their own line)
  lines = lines.filter((line) => !/^\*[^*\n]+\*$/.test(line.trim()))

  if (homepage) {
    // Skip # title and tagline — already in VitePress hero frontmatter
    while (lines.length && (lines[0].startsWith('# ') || lines[0].includes('·') || lines[0].trim() === '')) {
      lines.shift()
    }
  }

  return normalizeInternalLinks(lines.join('\n').trimEnd() + '\n')
}

function extractDraftTitle(raw) {
  const match = raw.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : null
}

function updateFrontmatterTitle(frontmatter, title) {
  if (!title) return frontmatter
  if (/^title:\s/m.test(frontmatter)) {
    return frontmatter.replace(/^title:\s.*$/m, `title: ${title}`)
  }
  return `title: ${title}\n${frontmatter}`
}

const draftFiles = readdirSync(draftsDir).filter((f) => f.endsWith('.md'))

for (const draftFile of draftFiles.sort()) {
  const targetPath = join(root, draftToPath(draftFile))
  const draftRaw = readFileSync(join(draftsDir, draftFile), 'utf8')
  const isHomepage = draftFile === 'homepage.md'

  let frontmatter = ''
  let existingBody = ''
  try {
    const existing = readFileSync(targetPath, 'utf8')
    ;({ frontmatter, body: existingBody } = parseFrontmatter(existing))
  } catch {
    console.warn(`Warning: no existing page at ${targetPath}, skipping`)
    continue
  }

  const draftTitle = extractDraftTitle(draftRaw)
  if (!isHomepage && draftTitle) {
    frontmatter = updateFrontmatterTitle(frontmatter, draftTitle)
  }

  const body = processDraftBody(draftRaw, { homepage: isHomepage })
  const output = `---\n${frontmatter.trimEnd()}\n---\n\n${body}`
  writeFileSync(targetPath, output)
  console.log(`Updated ${targetPath.replace(root + '/', '')}`)
}
