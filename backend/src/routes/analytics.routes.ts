import { Router } from 'express'
import { createEvent, getEvents } from '../controllers/analytics.controller.js'
import { requireAuth } from '../middleware/requireAuth.js'

const analyticsRouter = Router()

analyticsRouter.get('/', requireAuth, getEvents)
analyticsRouter.post('/', createEvent)

export default analyticsRouter
