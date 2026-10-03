import type { Config } from "./api"
import { URLsResource } from "./resources/urls"

export class Client {
  constructor(private readonly config: Config) {}

  get urls() {
    return new URLsResource(this.config)
  }
}
