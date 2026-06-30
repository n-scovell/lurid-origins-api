import { z } from "zod";

export const movieSchema = z.object({
  movie: z.string().min(1),
  year: z.number().int().min(1900),
  director: z.string().optional(),

  watched: z.boolean().optional(),

  era: z.string().optional(),
  franchise: z.string().optional(),

  tags: z.array(z.string()).optional(),
  fansOf: z.array(z.string()).optional(),
  actors: z.array(z.string()).optional(),

  trailer: z.string().url().optional(),
  comment: z.string().optional(),
  rating: z.coerce.number().min(0).max(10).optional(),
});