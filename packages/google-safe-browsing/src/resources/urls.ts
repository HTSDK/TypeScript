import { z } from "zod"
import { API } from "../api"

export class URLsResource extends API {
  /**
   * Searches for URLs matching known threats. Each URL and its host-suffix and path-prefix expressions (up to a limited depth) are checked.
   * This means that the response may contain URLs that were not included in the request, but are expressions of the requested URLs.
   *
   * @param urls Required. The URLs to be looked up. Clients MUST NOT send more than 50 URLs.
   */
  search(urls: string[]) {
    return this.GET("/v5alpha1/urls:search", z.object(), { urls: urls.join(",") })
  }
}
