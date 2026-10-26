import { z } from "zod"
import { API } from "$/api"

export class SYNO_API_Info extends API {
  get query() {
    return this.method("query", {
      1: ctx => async () => {
        const result = await ctx.post(
          z.record(
            z.string(),
            z.object({
              maxVersion: z.int().positive(),
              minVersion: z.int().positive(),
              path: z.string(),
              requestFormat: z.string().optional()
            })
          )
        )
        this.setContextInfo(
          Object.fromEntries(Object.entries(result).map(([key, value]) => [key, value.maxVersion]))
        )
        return result
      }
    })
  }
}
