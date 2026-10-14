import router from 'express'
import path from 'node:path'
import { readFile } from 'node:fs/promises'
import { getProjectById, getProjects } from '../controllers/project.controller.js'

const projectRouter = router()

projectRouter.get('/:id', getProjectById)
projectRouter.get('/', getProjects)

export default projectRouter
