import type { OpenApiObject3 } from "openapi-3.0-types"
import { z } from "zod"
import { API } from "./api"
import { Discovery, Get, List } from "./schemas"

export class Client extends API {
  /** All 155 breeds (list, enveloped). */
  list() {
    return this.GET("/api/breeds.json", List)
  }

  /** One breed, full detail (components, conditions, image). */
  get(slug: string) {
    return this.GET(`/api/v1/breeds/${slug}.json`, Get)
  }

  /** OpenAPI 3.0.3 spec. */
  openapi(): Promise<OpenApiObject3> {
    return this.GET("/api/v1/openapi.json", z.any())
  }

  /** Discovery: endpoints, docs, and license. */
  discovery(): Promise<Discovery> {
    return this.GET("/api/v1/index.json", Discovery)
  }
}
