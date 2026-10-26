import { API } from "$/api"
import { SYNO_Auth_RescueEmail } from "$/SYNO/Auth/RescueEmail"

export class SYNO_Auth extends API {
  get rescueEmail() {
    return this.API(SYNO_Auth_RescueEmail)
  }
}
