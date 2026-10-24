import type { z } from "zod"

export type Config = {
  url: string
}

export abstract class API {
  constructor(private readonly config: Config) {}

  private get api(): string {
    const split = this.constructor.name.split("_")
    split.pop()
    return split.join(".")
  }

  private get version(): number {
    const split = this.constructor.name.split("_")
    const version = split.pop()
    if (!version) throw new Error("No version found")
    return Number(version.replace("v", ""))
  }

  protected async POST<O extends z.ZodType>(
    method: string,
    output: O,
    params?: Record<string, string>,
    path: string = "entry.cgi"
  ) {
    const url = new URL(`${this.config.url}/webapi/${path}`)

    const body = new URLSearchParams()
    body.append("api", this.api)
    body.append("version", this.version.toString())
    body.append("method", method)

    if (params) {
      for (const key of Object.keys(params)) {
        const value = params[key]
        body.append(key, value)
      }
    }

    const response = await fetch(url, {
      method: "POST",
      body
    })

    if (response.ok) {
      return output.parse(await response.json())
    } else {
      throw new Error("Unable to parse response")
    }
  }
}
