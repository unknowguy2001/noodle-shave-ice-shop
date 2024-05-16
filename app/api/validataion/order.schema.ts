import { object, string, z } from "zod";

export const orderSchema = z.object({
  orderNumber: z.string(),
  customerName: z.string(),
  menus: z
    .object({
      menu: z.string(),
      toppings: z.object({ _id: z.string() }).array(),
    })
    .array(),
  totalPrice: z.number(),
});

export type order = z.infer<typeof orderSchema>;
