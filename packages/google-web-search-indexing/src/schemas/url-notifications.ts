import { z } from "zod"

export const UrlNotificationType = z.enum([
  "URL_NOTIFICATION_TYPE_UNSPECIFIED",
  "URL_UPDATED",
  "URL_DELETED"
])

export const UrlNotification = z.object({
  /**
   * The object of this notification.
   * The URL must be owned by the publisher of this notification and, in the case of `URL_UPDATED` notifications, it _must_ be crawlable by Google.
   */
  url: z.string(),
  /** The URL life cycle event that Google is being notified about. */
  type: UrlNotificationType,
  /**
   * Creation timestamp for this notification. Users should not specify it, the field is ignored at the request time.
   *
   * A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: `"2014-10-02T15:01:23.045123456Z"`.
   */
  notifyTime: z.iso.datetime({ offset: false, precision: 9 })
})

export const UrlNotificationMetadata = z.object({
  /** URL to which this metadata refers. */
  url: z.string(),
  /** The latest notification received with the type `URL_UPDATED`. */
  latestUpdate: UrlNotification.optional(),
  /** The latest notification received with the type `URL_REMOVED`. */
  latestRemove: UrlNotification.optional()
})
