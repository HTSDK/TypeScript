import type { Options } from "./api"
import { UrlNotificationsResource } from "./resources/url-notifications"

export class Client {
  private readonly options: Options

  constructor(options: Options) {
    this.options = options
  }

  get urlNotifications() {
    return new UrlNotificationsResource(this.options)
  }
}
