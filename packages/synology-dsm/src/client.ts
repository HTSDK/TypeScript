import type { Config } from "$/api"
import { SYNO } from "$/SYNO"

export class Client {
  constructor(private readonly config: Config) {}

  get SYNO() {
    return new SYNO(this.config)
  }
}

const client = new Client({ url: "https://pcrolinnas.quickconnect.to" })

console.log(await client.SYNO)
