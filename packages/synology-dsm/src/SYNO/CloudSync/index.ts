import { z } from "zod"
import { API } from "$/api"

const ConnectionList = z.object({
  conn: z.array(z.unknown()),
  is_admin_mode: z.boolean(),
  is_pause: z.boolean(),
  notification: z
    .object({
      file_count: z.number()
    })
    .nullable(),
  total: z.number(),
  tray_status: z.enum(["suspended"])
})

type ConnectionListParams = {
  is_tray?: boolean
  group_by?: "group_by_user"
}

const AvailableClouds = z.object({
  available_clouds: z.array(z.unknown())
})

const Config = z.object({
  admin_mode: z.enum(["enable"]),
  log_count: z.number(),
  repo_vol_path: z.string(),
  sync_mode: z.boolean(),
  volume_count: z.number(),
  volume_list: z.array(
    z.object({
      desc: z.string(),
      display: z.string(),
      mount_point: z.string(),
      size_free: z.string(),
      size_total: z.string(),
      value: z.string(),
      vol_desc: z.string()
    })
  ),
  worker_count: z.number()
})

export class SYNO_CloudSync extends API {
  get listConn() {
    return this.method("list_conn", {
      1: ctx => (params?: ConnectionListParams) => ctx.post(ConnectionList, params)
    })
  }

  get getAvailableClouds() {
    return this.method("get_available_clouds", {
      1: ctx => () => ctx.post(AvailableClouds)
    })
  }

  get getConfig() {
    return this.method("get_config", {
      1: ctx => () => ctx.post(Config)
    })
  }
}
