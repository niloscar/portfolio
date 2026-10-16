import { Router } from 'express'
import {
  login,
  logout,
  getCurrentUser
} from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/me', getCurrentUser)

export default authRouter
