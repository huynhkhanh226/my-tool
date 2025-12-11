import { z } from "zod";

export const SearchSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

export type SearchType = z.infer<typeof SearchSchema>;
