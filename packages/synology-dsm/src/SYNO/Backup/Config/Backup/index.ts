import { z } from "zod"
import { API } from "$/api"

const BackupListResponse = z.object({
  services: z.array(
    z.object({
      field: z.string(),
      id: z.string(),
      text: z.string()
    })
  )
})

const BackupStartResponse = z.object({
  task_id: z.string()
})

const BackupStatusResponse = z.object({
  finish: z.boolean(),
  task_id: z.string()
})

export class SYNO_Backup_Config_Backup extends API {
  get list() {
    return this.method("list", {
      1: ctx => () => ctx.post(BackupListResponse)
    })
  }

  get start() {
    return this.method("start", {
      1: ctx => () => ctx.post(BackupStartResponse)
    })
  }

  get status() {
    return this.method("status", {
      1: ctx => (taskId: string) => ctx.post(BackupStatusResponse, { task_id: taskId })
    })
  }
}
