import { API } from "$/api"
import { SYNO_Backup_Config } from "$/SYNO/Backup/Config"

export class SYNO_Backup extends API {
  get config() {
    return this.API(SYNO_Backup_Config)
  }
}
