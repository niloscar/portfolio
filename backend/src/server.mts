import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'

import { db } from './db.js'

import analyticsRouter from './routes/analytics.routes.js'
import authRouter from './routes/auth.routes.js'
import projectRouter from './routes/project.routes.js'
import techStackRouter from './routes/techStack.routes.js'

import type { ErrorRequestHandler } from 'express'

const SESSION_SECRET = process.env.SESSION_SECRET

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not defined')
}

const app = express()
const PgSession = connectPgSimple(session)

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

app.use(express.json())

app.use(session({
  name: 'portfolio.sid',
  store: new PgSession({
    pool: db,
    tableName: 'user_sessions',
    createTableIfMissing: true
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

app.use('/api/auth', authRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/projects', projectRouter)
app.use('/api/tech-stack', techStackRouter)

app.use(express.static('public'))

app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found'
  })
})

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  console.error(error)

  if (res.headersSent) {
    return next(error)
  }

  res.status(500).json({
    error: 'Internal Server Error'
  })
}

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})




