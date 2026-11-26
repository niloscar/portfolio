import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const INPUT_DIR = 'resources/images/originals'
const OUTPUT_DIR = 'frontend/src/assets/projects'

const sizes = [640, 960, 1280]

const supportedExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp'
])

const projects = await fs.readdir(INPUT_DIR, { withFileTypes: true })

for (const project of projects) {
  if (!project.isDirectory()) {
    continue
  }

  const inputDir = path.join(INPUT_DIR, project.name)
  const outputDir = path.join(OUTPUT_DIR, project.name)

  await fs.mkdir(outputDir, { recursive: true })

  const files = await fs.readdir(inputDir)

  for (const file of files) {
    const extension = path.extname(file).toLowerCase()
    const name = path.parse(file).name

    if (!supportedExtensions.has(extension)) {
      continue
    }

    if (name !== 'cover' && !name.startsWith('cover-')) {
      continue
    }

    const inputPath = path.join(inputDir, file)

    for (const width of sizes) {
      const height = width * 9 / 16
      const outputFile = `${name}-${width}.webp`

      console.log('Processing:', inputPath)

      await sharp(inputPath)
        .resize(width, height, {
          fit: 'cover'
        })
        .webp({
          quality: 82
        })
        .toFile(path.join(outputDir, outputFile))

      console.log(`${project.name}/${outputFile}`)
    }
  }
}
