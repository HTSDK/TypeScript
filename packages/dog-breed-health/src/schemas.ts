import { z } from "zod"

export const BreedImage = z.object({
  url: z.url(),
  photographer: z.string(),
  source: z.string()
})

export const Breed = z.object({
  breed: z.string(),
  slug: z.string(),
  url: z.url(),
  median_lifespan_years: z.number(),
  size: z.enum(["giant", "large", "medium", "small", "toy"]).nullable(),
  brachycephalic: z.boolean(),
  conditions: z.array(z.string()),
  health_score: z.int(),
  grade: z.enum(["A", "B", "C", "D", "E"]),
  components: z.object({
    longevity: z.int(),
    conformation: z.int(),
    burden: z.int()
  })
})

export const List = z.object({
  dataset: z.string(),
  api_version: z.string(),
  licence: z.string(),
  source: z.string(),
  source_url: z.url(),
  attribution: z.string(),
  docs: z.url(),
  openapi: z.url(),
  total: z.int(),
  count: z.int(),
  breeds: z.array(Breed)
})

export const Get = z.object({
  dataset: z.string(),
  api_version: z.string(),
  licence: z.string(),
  source: z.string(),
  source_url: z.url(),
  attribution: z.string(),
  docs: z.url(),
  breed: Breed.extend({
    image: BreedImage,
    weight_kg: z.string().nullable()
  })
})

export const Discovery = z.object({
  dataset: z.string(),
  api_version: z.string(),
  licence: z.string(),
  attribution: z.string(),
  docs: z.url(),
  openapi: z.url(),
  endpoints: z.object({
    all_breeds: z.url(),
    breed: z.url()
  })
})

export type Discovery = z.infer<typeof Discovery>
