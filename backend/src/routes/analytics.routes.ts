import { Router } from 'express'
import { createEvent, getEvents, getSummary } from '../controllers/analytics.controller.js'
import { requireAuth } from '../middleware/requireAuth.js'

const analyticsRouter = Router()

analyticsRouter.post('/', createEvent)

analyticsRouter.get('/summary', requireAuth, getSummary)
analyticsRouter.get('/events', requireAuth, getEvents)

export default analyticsRouter
