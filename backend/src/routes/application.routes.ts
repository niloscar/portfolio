import { Router } from 'express'
import { applicationRateLimit } from '../middleware/applicationRateLimit.js'
import { applicationHoneypot } from '../middleware/applicationHoneypot.js'
import { createApplication } from '../controllers/application.controller.js'

const applicationRouter = Router()

applicationRouter.post(
  '/', 
  applicationRateLimit, 
  applicationHoneypot, 
  createApplication
)

export default applicationRouter
