import { z } from "zod"
import { API } from "../api"

export class SystemResource extends API {
  getMe() {
    return this.GET("/api/v1/current/Me", z.any())
  }
}
