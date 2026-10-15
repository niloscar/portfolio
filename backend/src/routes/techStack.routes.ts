import router from 'express'
import { getTechStack, getVisibleTechs } from '../controllers/techStack.controller.js'

const techStackRouter = router()

techStackRouter.get('/visible', getVisibleTechs)
techStackRouter.get('/', getTechStack)

export default techStackRouter
