import { z } from 'zod'

export const productSchema = z.object({
  id: z.number(),
  name: z.string().max(100),
  price: z.number().min(0).max(999999.99),
})

export const createProductSchema = productSchema.omit({ id: true })

export const deleteProductSchema = productSchema.pick({ id: true })
