import { z } from "zod"
import { API } from "$/api"

type RequestParams = {
  stop_when_error: boolean
  mode: "sequential" | "parallel"
  compound: ({ api: string; method: string; version: number } & Record<
    string,
    string | number | boolean | undefined
  >)[]
}

const RequestResponse = z.object({
  has_fail: z.boolean(),
  result: z.array(
    z.object({
      api: z.string(),
      method: z.string(),
      data: z.looseObject({}).optional(),
      success: z.boolean(),
      version: z.number()
    })
  )
})

export class SYNO_Entry_Request extends API {
  get request() {
    return this.method("request", {
      1: ctx => (params: RequestParams) => ctx.post(RequestResponse, params)
    })
  }
}
