import { z } from "zod"
import { API } from "$/api"

type PersonMailAccountParams = {
  start?: number
  offset?: number
  limit?: number
}

const PersonMailAccountResponse = z.object({
  data: z.array(z.unknown())
})

export class SYNO_PersonMailAccount extends API {
  get get() {
    return this.method("get", {
      1: ctx => (params?: PersonMailAccountParams) => ctx.post(PersonMailAccountResponse, params)
    })
  }
}
