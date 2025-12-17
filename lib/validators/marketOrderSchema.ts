import { z } from "zod"

export const MarketOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      name: z.string().min(1),
      quantity: z.string().min(1),
      notes: z.string().optional(),
    })
  ),

  dropoff: z.string().min(3),
  deliveryDate: z.string().min(1),
  estimate: z.object({
    subtotal: z.number(),
    service: z.number(),
    vat: z.number(),
    total: z.number(),
  }),

  userId: z.string().uuid().optional(),
})

export type MarketOrderType = z.infer<typeof MarketOrderSchema>
