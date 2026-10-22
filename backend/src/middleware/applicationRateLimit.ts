import { rateLimit } from 'express-rate-limit'

export const applicationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    error: 'För många försök. Vänta en stund och försök igen.'
  }
})
