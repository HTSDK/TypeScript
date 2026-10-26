import { API } from "$/api"
import { SYNO_API_Auth } from "$/SYNO/API/Auth"
import { SYNO_API_Encryption } from "$/SYNO/API/Encryption"
import { SYNO_API_Info } from "$/SYNO/API/Info"

export class SYNO_API extends API {
  get auth() {
    return this.API(SYNO_API_Auth)
  }

  get encryption() {
    return this.API(SYNO_API_Encryption)
  }

  get info() {
    return this.API(SYNO_API_Info)
  }
}
