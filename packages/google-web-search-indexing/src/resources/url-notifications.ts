import { z } from "zod"
import { API } from "../api"
import {
  UrlNotification,
  UrlNotificationMetadata,
  type UrlNotificationType
} from "../schemas/url-notifications"

export class UrlNotificationsResource extends API {
  /**
   * Gets metadata about a Web Document. This method can _only_ be used to query URLs that were previously seen in successful Indexing API notifications.
   * Includes the latest `UrlNotification` received via this API.
   *
   * @param url URL that is being queried.
   */
  getMetadata(url: string) {
    return this.get("/v3/urlNotifications/metadata", UrlNotificationMetadata, { url })
  }

  /**
   * Notifies that a URL has been updated or deleted.
   */
  publish(notification: { url: string; type: z.infer<typeof UrlNotificationType> }) {
    return this.post(
      "/v3/urlNotifications:publish",
      {
        input: UrlNotification.omit({ notifyTime: true }),
        output: z.object({
          urlNotificationMetadata: UrlNotificationMetadata
        })
      },
      notification
    )
  }
}
