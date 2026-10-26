import { API } from "$/api"
import { SYNO_ActiveInsight } from "$/SYNO/ActiveInsight"
import { SYNO_API } from "$/SYNO/API"
import { SYNO_Auth } from "$/SYNO/Auth"
import { SYNO_Backup } from "$/SYNO/Backup"
import { SYNO_CloudSync } from "$/SYNO/CloudSync"
import { SYNO_Entry } from "$/SYNO/Entry"
import { SYNO_FileStation } from "$/SYNO/FileStation"
import { SYNO_PersonMailAccount } from "$/SYNO/PersonMailAccount"

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

  get cloudSync() {
    return this.API(SYNO_CloudSync)
  }

  get entry() {
    return this.API(SYNO_Entry)
  }

  get FileStation() {
    return this.API(SYNO_FileStation)
  }

  get personMailAccount() {
    return this.API(SYNO_PersonMailAccount)
  }
}
