import { z } from "zod"

export const AlbumGenre = z.object({
  id: z.int(),
  name: z.string(),
  picture: z.url(),
  type: z.literal("genre")
})
