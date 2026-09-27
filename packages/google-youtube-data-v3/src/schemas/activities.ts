import { z } from "zod"

export const Activity = z.object({
  /** Identifies the API resource's type. The value will be `youtube#activity`. */
  kind: z.literal("youtube#activity"),
  /** The Etag of this resource. */
  etag: z.string(),
  /** The ID that YouTube uses to uniquely identify the activity. */
  id: z.string(),
  /** The `snippet` object contains basic details about the activity, including the activity's type and group ID. */
  snippet: z.object({
    /** The date and time that the activity occurred. The value is specified in [ISO 8601](https://www.w3.org/TR/NOTE-datetime) format. */
    publishedAt: z.iso.datetime(),
    /** The ID that YouTube uses to uniquely identify the channel associated with the activity. */
    channelId: z.string(),
    /** The title of the resource primarily associated with the activity. */
    title: z.string(),
    /** The description of the resource primarily associated with the activity. */
    description: z.string(),
    /**
     * A map of thumbnail images associated with the resource that is primarily associated with the activity.
     * For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.
     *
     * Valid key values are:
     * - `default` – The default thumbnail image. The default thumbnail for a video – or a resource that refers to a video, such as a playlist item or search result – is 120px wide and 90px tall.
     *   The default thumbnail for a channel is 88px wide and 88px tall.
     * - `medium` – A higher resolution version of the thumbnail image. For a video (or a resource that refers to a video), this image is 320px wide and 180px tall.
     *   For a channel, this image is 240px wide and 240px tall.
     * - `high` – A higher resolution version of the thumbnail image. For a video (or a resource that refers to a video), this image is 480px wide and 360px tall.
     *   For a channel, this image is 800px wide and 800px tall.
     * - `standard` – An even higher resolution version of the thumbnail image than the `high` resolution image.
     *   This image is available for some videos, like playlist items or search results.
     *   This image is 640px wide and 480px tall.
     * - `maxres` – A high-resolution version of the thumbnail image.
     *   This image size is available for some videos and other resources that refer to videos, like playlist items or search results.
     *   This image is 1280px wide and 720px tall.
     * - `fhd` – The full high-definition (1080p) version of the thumbnail image.
     *   This image size is available for some videos. This image is 1920px wide and 1080px tall.
     * - `qhd` – The quad high-definition (1440p / 2K) version of the thumbnail image.
     *   This image size is available for some videos.
     *   This image is 2560px wide and 1440px tall.
     * - `uhd` – The ultra-high-definition (4K) version of the thumbnail image.
     *   This image size is available for some videos.
     *   This image is 3840px wide and 2160px tall.
     */
    thumbnails: z.record(
      z.enum(["default", "medium", "high", "standard", "maxres", "fhd", "qhd", "uhd"]),
      z.object({
        /** The image's URL. */
        url: z.string(),
        /** The image's width. */
        width: z.uint32(),
        /** The image's height. */
        height: z.uint32()
      })
    ),
    /** Channel title for the channel responsible for this activity. */
    channelTitle: z.string(),
    /**
     * The type of activity that the resource describes.
     *
     * Valid values for this property are:
     * - `channelItem`
     * - `comment` – (not currently returned)
     * - `playlistItem`
     * - `promotedItem`
     * - `recommendation`
     * - `social`
     * - `subscription`
     * - `upload`
     */
    type: z.enum([
      "channelItem",
      "comment",
      "playlistItem",
      "promotedItem",
      "recommendation",
      "social",
      "subscription",
      "upload"
    ]),
    /**
     * The group ID associated with the activity. A group ID identifies user events that are associated with the same user and resource.
     * For example, if a user uploads a video and watches the same video, the entries for those events would have the same group ID in the user's activity feed.
     * In your user interface, you can avoid repetition by grouping events with the same groupId value.
     */
    groupId: z.string()
  })
})
