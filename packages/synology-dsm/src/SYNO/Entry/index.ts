import { API } from "$/api"
import { SYNO_Entry_Request } from "$/SYNO/Entry/Request"

export class SYNO_Entry extends API {
  get request() {
    return this.API(SYNO_Entry_Request)
  }
}
