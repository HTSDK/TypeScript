import type { z } from "zod"

type Domain = "nl" | "be" | "de" | "co.uk" | "com" | "es" | "fr"

export type Config = {
  domain: Domain
}

export abstract class API {
  constructor(private readonly config: Config) {}

  protected async GET<O extends z.ZodType>(
    path: string,
    output: O,
    params?: Record<string, string>
  ) {
    const url = new URL(`https://start.exactonline.${this.config.domain}${path}`)
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
