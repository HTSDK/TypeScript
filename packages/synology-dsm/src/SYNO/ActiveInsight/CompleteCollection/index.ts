import { z } from "zod"
import { API } from "$/api"

const CompleteCollectionResponse = z.object({
  enabled: z.boolean()
})

export class SYNO_ActiveInsight_CompleteCollection extends API {
  get get() {
    return this.method("get", {
      1: ctx => () => ctx.post(CompleteCollectionResponse)
    })
  }
}
