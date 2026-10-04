import type { z } from "zod"

const BASE_URL = "https://breedhealthscore.com" as const

export abstract class API {
  protected async GET<O extends z.ZodType>(path: string, output: O) {
    const url = new URL(`${BASE_URL}${path}`)

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
