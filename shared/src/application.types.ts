export type CreateApplication = {
  companyName: string
  website: string
  location: string
  workplaceModel: string
  periods: number[]
  contactPerson: string
  email: string
  phone: string
  message: string
}

export type Application = CreateApplication & {
  id: number
  createdAt: string
}
