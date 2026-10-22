import { z } from 'zod'

export const createApplicationSchema = z.object({
  companyName: z.string().trim().min(1).max(200),
  location: z.string().trim().min(1).max(100),
  workplaceModel: z.enum(['On-site', 'Hybrid', 'Remote', '']),
  period: z.array(z.union([z.literal(1), z.literal(2)])).min(1),
  contactPerson: z.string().trim().min(1).max(150),
  email: z.email(),
  phone: z.string().max(50),
  message: z.string().max(5000)
})

export type CreateApplication = z.infer<typeof createApplicationSchema>
