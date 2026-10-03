import { z } from "zod"
import { API } from "../api"

export class URLsResource extends API {
  /**
   * @param urls Required. The URLs to be looked up. Clients MUST NOT send more than 50 URLs.
   */
  search(urls: string[]) {
    return this.GET("/v5alpha1/urls:search", z.object(), { urls: urls.join(",") })
  }
}
