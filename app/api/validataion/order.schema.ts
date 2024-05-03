import { object, string, z } from "zod";

export const orderSchema = z.object({
  orderNumber: z.string(),
  customerName: z.string(),
  menus: z
    .object({
      menu: z.string(),
      toppings: z.object({ topping: z.string() }).array(),
    })
    .array()
    .array(),
});

export type order = z.infer<typeof orderSchema>;
