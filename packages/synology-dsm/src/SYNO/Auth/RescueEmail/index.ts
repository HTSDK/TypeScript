import { z } from "zod"
import { API } from "$/api"

const RescueEmailResponse = z.object({
  verified: z.boolean()
})

export class SYNO_Auth_RescueEmail extends API {
  get get() {
    return this.method("get", {
      1: ctx => () => ctx.post(RescueEmailResponse)
    })
  }

  get set() {
    return this.method("set", {
      1: ctx => async () => {
        await ctx.post(z.any())
      }
    })
  }
}
