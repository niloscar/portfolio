const projectAssets = import.meta.glob('../assets/projects/**/*.{svg,webp}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

export function getProjectImage(slug: string, filename?: string, size = 640) {
  if (!filename) return undefined

  const name = filename.replace(/\.[^.]+$/, '')
  const path = `../assets/projects/${slug}/${name}-${size}.webp`

  return projectAssets[path]
}

export function getProjectIcon(slug: string) {
  return projectAssets[`../assets/projects/${slug}/icon.svg`]
    ?? projectAssets[`../assets/projects/${slug}/icon.webp`]
}
