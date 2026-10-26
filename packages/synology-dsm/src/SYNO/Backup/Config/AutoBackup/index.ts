import { z } from "zod"
import { API } from "$/api"

const AutoBackupResponse = z.object({
  enable: z.boolean(),
  enc_method: z.string(),
  last_status: z.string(),
  myds_account: z.string(),
  pwd: z.string()
})

const AutoBackupStatusResponse = z.object({
  last_status: z.string()
})

export class SYNO_Backup_Config_AutoBackup extends API {
  get get() {
    return this.method("get", {
      1: ctx => () => ctx.post(AutoBackupResponse)
    })
  }

  get status() {
    return this.method("status", {
      1: ctx => () => ctx.post(AutoBackupStatusResponse)
    })
  }
}
