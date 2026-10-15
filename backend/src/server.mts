import 'dotenv/config'
import express from 'express'

import analyticsRouter from './routes/analytics.routes.js'
import projectRouter from './routes/project.routes.js'
import techStackRouter from './routes/techStack.routes.js'

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use('/api/analytics', analyticsRouter)
app.use('/api/projects', projectRouter)
app.use('/api/tech-stack', techStackRouter)

app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found'
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
