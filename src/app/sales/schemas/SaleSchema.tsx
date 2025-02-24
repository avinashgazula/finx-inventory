import { z } from "zod";

export const saleSchema = z.object({
  user: z.number({}),
  vehicle: z.number(),
  selling_price: z.number(),
  date: z.string().date(),
});
