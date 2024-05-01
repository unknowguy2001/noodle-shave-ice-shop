import { z } from "zod";

export const menuSchema = z.object({
  name: z.string(),
  image: z.string(),
  toppings: z.string().array(),
  price: z.number(),
  description: z.string(),
});

export type munu = z.infer<typeof menuSchema>;
