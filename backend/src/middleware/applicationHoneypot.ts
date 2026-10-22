import type { Request, Response, NextFunction } from 'express'

export function applicationHoneypot(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const honeypot = req.body?.faxNumber

  if (typeof honeypot !== 'string' || honeypot.length > 0) {
    res.status(200).json({
      message: 'Ansökan har tagits emot.'
    })
    return
  }

  next()
}
