import { readFile } from 'node:fs/promises'

export default async function readJsonData<T>(FILE_PATH: string) {
  const file = await readFile(FILE_PATH, 'utf8')
  return JSON.parse(file) as T
}
