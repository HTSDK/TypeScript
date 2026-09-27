import type { z } from "zod"

const BASE_URL = "https://api.iinapi.com" as const

export type Config = {
  key: string
}

export class API {
  constructor(private readonly config: Config) {}

  async get<O extends z.ZodType>(path: string, output: O, params?: Record<string, string>) {
    const url = new URL(`${BASE_URL}${path}`)
    url.searchParams.append("key", this.config.key)
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value)
      }
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })

    if (response.ok) {
      return output.parse(await response.json())
    } else {
      throw new Error(`Request failed with status ${response.status}`)
    }
  }
}
