import router from 'express'
import { createEvent, getEvents } from '../controllers/analytics.controller.js'

const analyticsRouter = router()

analyticsRouter.get('/', getEvents)
analyticsRouter.post('/track', createEvent)

export default analyticsRouter
