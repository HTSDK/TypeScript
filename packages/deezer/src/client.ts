import type { Config } from "./api"
import { AlbumResource } from "./resources/album"

export class Client {
  constructor(private readonly config?: Config) {}

  get albums() {
    return new AlbumResource(this.config)
  }
}
