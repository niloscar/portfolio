import { Router } from 'express'
import { getTechStack, getVisibleTechs } from '../controllers/techStack.controller.js'

const techStackRouter = Router()

techStackRouter.get('/visible', getVisibleTechs)
techStackRouter.get('/', getTechStack)

export default techStackRouter
