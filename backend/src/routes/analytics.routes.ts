import { Router } from 'express'
import { createEvent, getEvents, getSummary, getChart } from '../controllers/analytics.controller.js'
import { requireAuth } from '../middleware/requireAuth.js'

const analyticsRouter = Router()

analyticsRouter.post('/', createEvent)

analyticsRouter.get('/summary', requireAuth, getSummary)
analyticsRouter.get('/events', requireAuth, getEvents)
analyticsRouter.get('/chart', requireAuth, getChart)

export default analyticsRouter
