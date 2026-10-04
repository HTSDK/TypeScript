import type { z } from "zod"

const BASE_URL = "https://bible-api.com" as const

export abstract class API {
  protected async GET<O extends z.ZodType>(
    path: string,
    output: O,
    params?: Record<string, string>
  ) {
    const url = new URL(`${BASE_URL}${path}`)
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value)
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
