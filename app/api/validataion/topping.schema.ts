import { z } from "zod";

export const toppingSchema = z.object({
  name: z.string(),
  icon: z.string(),
  price: z.number().optional(),
});

export type topping = z.infer<typeof toppingSchema>;
