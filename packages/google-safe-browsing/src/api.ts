import type { z } from "zod"

const BASE_URL = "https://safebrowsing.googleapis.com" as const

export type Config = {
  key: string
}

export abstract class API {
  constructor(protected readonly config: Config) {}

  protected async GET<O extends z.ZodType>(
    path: string,
    output: O,
    params?: Record<string, string>
  ) {
    const url = new URL(`${BASE_URL}${path}`)
    url.searchParams.set("key", this.config.key)
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value)
      }
    }

    const response = await fetch(url, {
      method: "GET"
    })

    if (response.ok) {
      return output.parse(await response.json())
    } else {
      throw new Error(`Request failed with status ${response.status}`)
    }
  }
}
