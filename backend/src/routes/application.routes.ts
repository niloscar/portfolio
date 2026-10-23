import { Router } from 'express'
import { applicationRateLimit } from '../middleware/applicationRateLimit.js'
import { applicationHoneypot } from '../middleware/applicationHoneypot.js'
import { createApplication, getApplications } from '../controllers/application.controller.js'
import { requireAuth } from '../middleware/requireAuth.js'

const applicationRouter = Router()

applicationRouter.get(
  '/', 
  requireAuth, 
  getApplications
)

applicationRouter.post(
  '/', 
  applicationRateLimit, 
  applicationHoneypot, 
  createApplication
)

export default applicationRouter
