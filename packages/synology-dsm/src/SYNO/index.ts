import { API } from "$/api"
import { SYNO_API } from "$/SYNO/API"

export class SYNO extends API {
  get api() {
    return this.API(SYNO_API)
  }
}
