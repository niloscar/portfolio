import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const INPUT_DIR = 'resources/images/originals'
const OUTPUT_DIR = 'frontend/src/assets'

const sizes = [440, 880]

await fs.mkdir(OUTPUT_DIR, { recursive: true })

const files = await fs.readdir(INPUT_DIR)

const supportedExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp'
])

for (const file of files) {
  const extension = path.extname(file).toLowerCase()

  if (!supportedExtensions.has(extension)) {
    continue
  }
  
  const inputPath = path.join(INPUT_DIR, file)
  const name = path.parse(file).name

  for (const size of sizes) {
    console.log('Processing:', inputPath)

    await sharp(inputPath)
      .resize(size, size, {
        fit: 'cover'
      })
      .webp({
        quality: 82
      })
      .toFile(path.join(OUTPUT_DIR, `${name}-${size}.webp`))

    console.log(`${name}-${size}.webp`)
  }
}
