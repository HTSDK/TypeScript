import { z } from "zod"
import { API } from "$/api"
import { SYNO_API_Auth_Type } from "$/SYNO/API/Auth/Type"
import { SYNO_API_Auth_UIConfig } from "$/SYNO/API/Auth/UIConfig"

type LoginParams = {
  account: string
  passwd: string
  otp_code?: string
  format?: "cookie"
  enable_syno_token?: "yes"
}

const LoginResponse = z.object({
  account: z.string(),
  device_id: z.string(),
  sid: z.string(),
  is_portal_port: z.boolean(),
  synotoken: z.string()
})

export class SYNO_API_Auth extends API {
  get type() {
    return this.API(SYNO_API_Auth_Type)
  }

  get uiConfig() {
    return this.API(SYNO_API_Auth_UIConfig)
  }

  get login() {
    return this.method("login", {
      7: ctx => async (params: LoginParams) => {
        const result = await ctx.post(LoginResponse, {
          format: "cookie",
          enable_syno_token: "yes",
          ...params
        })
        this.setStateCredentials(result.sid, result.synotoken)
        return result
      }
    })
  }

  get logout() {
    return this.method("logout", {
      1: ctx => async () => {
        await ctx.post(z.any())
        this.setStateCredentials(undefined, undefined)
      }
    })
  }
}
