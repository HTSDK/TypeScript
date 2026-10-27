import { z } from "zod"
import { API } from "$/api"
import type { ListAdditional } from "$/SYNO/FileStation"

type ListParams = {
  filetype?: "dir"
  sort_by?: "name"
  check_dir?: boolean
  additional?: ListAdditional[]
  enum_cluster?: boolean
  node?: string
}

const ListResponse = z.object({
  favorites: z.array(
    z.object({
      path: z.string(),
      name: z.string(),
      status: z.enum(["valid", "broken"])
    })
  ),
  offset: z.number(),
  total: z.number()
})

export class SYNO_FileStation_Favorite extends API {
  get list() {
    return this.method("list", {
      1: ctx => (params?: ListParams) =>
        ctx.post(ListResponse, { ...params, additional: params?.additional?.join(",") }),
      2: ctx => (params?: ListParams) =>
        ctx.post(ListResponse, { ...params, additional: params?.additional?.join(",") })
    })
  }
}
