import { API } from "$/api"
import { SYNO_API_Info } from "$/SYNO/API/Info"

export class SYNO_API extends API {
  get info() {
    return this.API(SYNO_API_Info)
  }
}
