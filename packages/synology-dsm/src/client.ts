import type { APIState } from "$/api"
import { SYNO } from "$/SYNO"

type Config =
  | {
      url: string
    }
  | {
      quickconnect: string
    }

export class Client {
  private readonly url: string
  private readonly state: APIState = {}

  constructor(config: Config) {
    if ("url" in config) {
      this.url = config.url
    } else {
      this.url = `https://${config.quickconnect}.de.quickconnect.to`
    }
  }

  get syno() {
    return new SYNO({
      url: this.url,
      path: "entry.cgi",
      state: this.state
    })
  }

  getState() {
    return this.state
  }

  setStateInfo(info: APIState["info"]) {
    this.state.info = info
  }

  setStateCredentials(sid: APIState["sid"], synotoken: APIState["synotoken"]) {
    this.state.sid = sid
    this.state.synotoken = synotoken
  }
}
