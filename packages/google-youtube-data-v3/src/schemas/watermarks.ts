import { z } from "zod"

export const Watermark = z.object({
  /**
   * The `timing` object encapsulates information about the time during a video playback when a channel's watermark image will display.
   * This object is required when calling `watermarks.set`.
   */
  timing: z.object({}),
  /**
   * @deprecated The `position` object is deprecated and ignored by YouTube. Watermarks always display in the upper right corner of the video player.
   */
  position: z.object({
    type: z.string(),
    cornerPosition: z.string()
  }),
  /**
   * The URL for the channel's watermark image.
   * YouTube will generate this URL and return it in the API response to a `watermark.set` request.
   */
  imageUrl: z.string()
})
