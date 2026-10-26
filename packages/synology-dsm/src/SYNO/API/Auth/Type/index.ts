import { z } from "zod"
import { API } from "$/api"

type AuthTypeParams = {
  account?: string
}

const AuthTypeResponse = z
  .object({
    type: z.string()
  })
  .array()

export class SYNO_API_Auth_Type extends API {
  get get() {
    return this.method("get", {
      1: ctx => (params?: AuthTypeParams) => ctx.post(AuthTypeResponse, params)
    })
  }
}
