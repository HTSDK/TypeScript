import { API } from "$/api"
import { SYNO_ActiveInsight } from "$/SYNO/ActiveInsight"
import { SYNO_API } from "$/SYNO/API"
import { SYNO_Auth } from "$/SYNO/Auth"
import { SYNO_Backup } from "$/SYNO/Backup"

export class SYNO extends API {
  get activeInsight() {
    return this.API(SYNO_ActiveInsight)
  }

  get api() {
    return this.API(SYNO_API)
  }

  get auth() {
    return this.API(SYNO_Auth)
  }

  get backup() {
    return this.API(SYNO_Backup)
  }
}
