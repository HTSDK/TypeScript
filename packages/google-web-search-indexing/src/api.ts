import type { z } from "zod"

export const BASE_URL = "https://indexing.googleapis.com" as const

export type Options =
  | {
      token: string
    }
  | {
      key: string
    }

export abstract class API {
  private readonly options: Options

  constructor(options: Options) {
    this.options = options
  }

  private fetch(url: URL, init?: RequestInit) {
    if ("key" in this.options) {
      url.searchParams.set("key", this.options.key)
    }

    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...("token" in this.options ? { Authorization: `Bearer ${this.options.token}` } : {}),
        ...init?.headers
      },
      ...init
    })
  }

  protected async get<T extends z.ZodType>(
    path: string,
    output: T,
    params?: Record<string, string>
  ) {
    const url = new URL(`${BASE_URL}${path}`)
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value)
      }
    }

    const response = await this.fetch(url)

    if (response.ok) {
      return output.parse(await response.json())
    } else {
      const { error } = await response.json()
      throw new Error(`${error.code} ${error.status}: ${error.message}`)
    }
  }

  protected async post<I extends z.ZodType, O extends z.ZodType>(
    path: string,
    schemas: { input: I; output: O },
    body: z.input<I>
  ) {
    const url = new URL(`${BASE_URL}${path}`)

    const response = await this.fetch(url, {
      method: "POST",
      body: JSON.stringify(schemas.input.parse(body))
    })

    if (response.ok) {
      return schemas.output.parse(await response.json())
    } else {
      const { error } = await response.json()
      throw new Error(`${error.code} ${error.status}: ${error.message}`)
    }
  }
}
