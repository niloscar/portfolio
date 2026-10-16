import * as service from '../services/auth.service.js'
import * as repository from '../repositories/auth.repository.js'

import type { Request, Response } from 'express'

export async function login(req: Request, res: Response) {
  const { email, password } = req.body ?? {}

  if (
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    !password
  ) {
    return res.status(400).json({
      error: 'Email and password are required'
    })
  }

  const user = await service.authenticate({ email, password })

  if (!user) {
    return res.status(401).json({
      error: 'Invalid email or password'
    })
  }

  req.session.regenerate(error => {
    if (error) {
      return res.sendStatus(500)
    }

    req.session.userId = user.id

    res.status(200).json(user)
  })
}

export async function getCurrentUser(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.sendStatus(401)
  }

  const user = await repository.findUserById(req.session.userId)

  if (!user) {
    return res.sendStatus(401)
  }

  res.status(200).json(user)
}

export function logout(req: Request, res: Response) {
  req.session.destroy(error => {
    if (error) {
      return res.sendStatus(500)
    }

    res.clearCookie('portfolio.sid')
    res.sendStatus(204)
  })
}
