import type { NextFunction, Request, Response } from 'express'

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    return res.sendStatus(401)
  }

  next()
}
