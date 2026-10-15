import { readFile, writeFile } from 'node:fs/promises'

export async function readJsonData<T>(FILE_PATH: string) {
  const file = await readFile(FILE_PATH, 'utf8')
  return JSON.parse(file) as T
}

export async function writeJsonData<T>(FILE_PATH: string, data: T) {
  const jsonData = JSON.stringify(data, null, 2)
  await writeFile(FILE_PATH, jsonData, 'utf8')
}

export async function appendJsonData<T>(FILE_PATH: string, data: T) {
  const existingData = await readJsonData<T[]>(FILE_PATH)

  existingData.push(data)

  await writeJsonData(FILE_PATH, existingData)
}
