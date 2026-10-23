import { z } from 'zod'

export const createApplicationSchema = z.object({
  companyName: z.string().trim()
    .min(1, 'Ange företagets namn.')
    .max(200, 'Företagsnamnet får innehålla högst 200 tecken.'),

  website: z.string().trim()
    .max(2048, 'Webbadressen är för lång.'),

  location: z.string().trim()
    .min(1, 'Ange vilken stad företaget finns i.')
    .max(100, 'Staden får innehålla högst 100 tecken.'),

  workplaceModel: z.enum(['On-site', 'Hybrid', 'Remote', ''], {
    error: 'Välj en giltig arbetsform.'
  }),

  periods: z.array(z.union([z.literal(1), z.literal(2)]))
    .min(1, 'Välj minst en LIA-period.')
    .max(2, 'Du kan välja högst två LIA-perioder.')
    .refine(
      (periods) => new Set(periods).size === periods.length,
      'Samma LIA-period kan inte väljas flera gånger.'
    ),

  contactPerson: z.string().trim()
    .min(1, 'Ange kontaktpersonens namn.')
    .max(150, 'Namnet får innehålla högst 150 tecken.'),

  email: z.string().trim().toLowerCase()
    .pipe(
      z.email('Ange en giltig e-postadress.')
        .max(254, 'E-postadressen får innehålla högst 254 tecken.')
    ),

  phone: z.string()
    .max(50, 'Telefonnumret får innehålla högst 50 tecken.'),

  message: z.string()
    .max(5000, 'Meddelandet får innehålla högst 5000 tecken.')
})

export type CreateApplication = z.infer<typeof createApplicationSchema>
