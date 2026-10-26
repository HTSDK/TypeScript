import { z } from "zod"
import { API } from "$/api"
import { SYNO_API_Auth_Type } from "$/SYNO/API/Auth/Type"
import { SYNO_API_Auth_UIConfig } from "$/SYNO/API/Auth/UIConfig"

type LoginParams = {
  account: string
  passwd: string
  otp_code?: string
  session?: string
  format?: "cookie" | "sid"
  enable_syno_token?: "yes" | "no"
  enable_device_token?: "yes" | "no"
  device_name?: string
  device_id?: string
}

const LoginResponse = z.object({
  account: z.string(),
  device_id: z.string(),
  sid: z.string(),
  is_portal_port: z.boolean(),
  synotoken: z.string()
})

const TokenResponse = z.object({
  is_portal_port: z.boolean(),
  synotoken: z.string()
})

export class SYNO_API_Auth extends API {
  get errors() {
    return {
      ...super.errors,
      400: "No such account or incorrect password.",
      401: "Disabled account.",
      402: "Denied permission.",
      403: "2-factor authentication code required.",
      404: "Failed to authenticate 2-factor authentication code.",
      406: "Enforce to authenticate with 2-factor authentication code.",
      407: "Blocked IP source.",
      408: "Expired password cannot change.",
      409: "Expired password.",
      410: "Password must be changed."
    }
  }

  get type() {
    return this.API(SYNO_API_Auth_Type)
  }

  get uiConfig() {
    return this.API(SYNO_API_Auth_UIConfig)
  }

  get login() {
    return this.method("login", {
      6: ctx => async (params: LoginParams) => {
        const result = await ctx.post(LoginResponse, {
          format: "cookie",
          enable_syno_token: "yes",
          ...params
        })
        this.setStateCredentials(result.sid, result.synotoken)
        return result
      },
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
      6: ctx => async () => {
        await ctx.post(z.any())
        this.setStateCredentials(undefined, undefined)
      }
    })
  }

  get token() {
    return this.method("token", {
      6: ctx => () => ctx.post(TokenResponse)
    })
  }
}
