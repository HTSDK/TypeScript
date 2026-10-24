import { z } from "zod"
import { API } from "$/api"

export class SYNO_Core_System_v3 extends API {
  info() {
    return this.POST("info", z.object())
  }
}
