import { z } from "zod"
import { API } from "$/api"

const EncryptionInfoSchema = z.object({
  cipherkey: z.string(),
  ciphertoken: z.string(),
  public_key: z.string(),
  server_time: z.number()
})

export class SYNO_API_Encryption extends API {
  get getInfo() {
    return this.method("getinfo", {
      1: ctx => () => ctx.post(EncryptionInfoSchema)
    })
  }
}
