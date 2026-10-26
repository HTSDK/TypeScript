import { API } from "$/api"
import { SYNO_Backup_Config_AutoBackup } from "$/SYNO/Backup/Config/AutoBackup"
import { SYNO_Backup_Config_Backup } from "$/SYNO/Backup/Config/Backup"

export class SYNO_Backup_Config extends API {
  get autoBackup() {
    return this.API(SYNO_Backup_Config_AutoBackup)
  }

  get backup() {
    return this.API(SYNO_Backup_Config_Backup)
  }
}
