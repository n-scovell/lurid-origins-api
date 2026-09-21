import { z } from "zod";

const noHtml = z.string().refine(
  (value) => !/<[^>]*>/i.test(value),
  {
    message: "HTML tags are not allowed.",
  }
);


export const movieSchema = z.object({
  movie: noHtml
  .trim()
  .min(1)
  .max(200)
  .refine(
    value => !/<[^>]*>/.test(value),
    "HTML is not allowed."
  ),

  year: z.number().int().min(1900),
  
  director: noHtml
  .trim()
  .max(100)
  .optional(),

  watched: z.boolean().optional(),

  era: z.string().optional(),

  franchise: z.string().optional(),

  tags: z.array(
    noHtml
    .trim()
    .min(1)
    .max(100)
  ).optional(),

  fansOf: z.array(
    noHtml
    .trim()
    .min(1)
    .max(100)
  ).optional(),

  actors: z.array(
    noHtml
    .trim()
    .min(1)
    .max(100)
    ).optional(),

  trailer: z.string()
  .url()
  .refine((url) => {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase();

      return (
        host === "youtube.com" ||
        host === "www.youtube.com" ||
        host === "youtu.be"
      );
    } catch {
      return false;
    }
  }, {
    message: "Trailer must be a YouTube URL."
  })
  .optional(),

  comment: noHtml
  .trim()
  .max(5000)
  .optional(),

  rating: z.coerce.number().min(0).max(10).optional(),
});