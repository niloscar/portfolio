
import { readFile, writeFile } from 'node:fs/promises'

const BASE_URL = 'https://oscarnilsson.dev'

const projects = JSON.parse(
  await readFile('backend/data/projects.json', 'utf8')
)

const paths = [
  '/',
  '/lia',
  ...projects.map(project => `/project/${project.id}`)
]

const urls = paths.map(path => `
  <url>
    <loc>${new URL(path, BASE_URL).href}</loc>
  </url>`).join('')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`

await writeFile('frontend/public/sitemap.xml', sitemap)

console.log(`Generated sitemap with ${paths.length} URLs`)
