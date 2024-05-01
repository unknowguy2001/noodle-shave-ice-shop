import { z } from "zod";

export const toppingSchema = z.object({
  name: z.string(),
  icon: z.string(),
  price: z.number(),
});

export type topping = z.infer<typeof toppingSchema>;
