import { z } from "zod"
import { AlbumGenre } from "./genre"

// noinspection JSUnusedGlobalSymbols
export const Album = z.object({
  /** The Deezer album id */
  id: z.int(),
  /** The album title */
  title: z.string(),
  /** The album UPC */
  upc: z.string(),
  /** The url of the album on Deezer */
  link: z.url(),
  /** The share link of the album on Deezer */
  share: z.url(),
  /** The url of the album's cover. Add `size` parameter to the url to change size. Can be `small`, `medium`, `big`, `xl` */
  cover: z.url(),
  /** The url of the album's cover in size small. */
  cover_small: z.url(),
  /** The url of the album's cover in size medium. */
  cover_medium: z.url(),
  /** The url of the album's cover in size big. */
  cover_big: z.url(),
  /** The url of the album's cover in size xl. */
  cover_xl: z.url(),
  md5_image: z.string(),
  /** The album's first genre id (You should use the genre list instead). NB: -1 for not found */
  genre_id: z.int(),
  genres: z.object({
    data: AlbumGenre.array()
  }),
  /** The album's label name */
  label: z.string(),
  /** The album's provider name */
  provider: z.string().optional(),
  nb_tracks: z.int(),
  /** The album's duration (seconds) */
  duration: z.int(),
  /** The number of album's Fans */
  fans: z.int(),
  /** The album's release date */
  release_date: z.iso.date(),
  /** The record type of the album (EP / ALBUM / etc...) */
  record_type: z.string(),
  available: z.boolean(),
  /** Return an alternative album object if the current album is not available */
  get alternative() {
    return Album.optional()
  },
  /** API Link to the tracklist of this album */
  tracklist: z.url(),
  /** Whether the album contains explicit lyrics */
  explicit_lyrics: z.boolean(),
  /**
   * The explicit content lyrics values
   * 0. Not Explicit
   * 1. Explicit
   * 2. Unknown
   * 3. Edited
   * 4. Partially Explicit (Album "lyrics" only)
   * 5. Partially Unknown (Album "lyrics" only)
   * 6. No Advice Available
   * 7. Partially No Advice Available (Album "lyrics" only)
   */
  explicit_content_lyrics: z.int().min(0).max(7),
  /**
   * The explicit cover values
   * 0. Not Explicit
   * 1. Explicit
   * 2. Unknown
   * 3. Edited
   * 4. Partially Explicit (Album "lyrics" only)
   * 5. Partially Unknown (Album "lyrics" only)
   * 6. No Advice Available
   * 7. Partially No Advice Available (Album "lyrics" only)
   */
  explicit_content_cover: z.int().min(0).max(7),
  contributors: z
    .object({
      id: z.int(),
      name: z.string(),
      link: z.url(),
      share: z.url(),
      picture: z.url(),
      picture_small: z.url(),
      picture_medium: z.url(),
      picture_big: z.url(),
      picture_xl: z.url(),
      radio: z.boolean(),
      tracklist: z.url(),
      type: z.string(),
      role: z.string()
    })
    .array(),
  fallback: z.object({ id: z.int(), status: z.any() }).optional(),
  artist: z.object({
    id: z.int(),
    name: z.string(),
    picture: z.url(),
    picture_small: z.url(),
    picture_medium: z.url(),
    picture_big: z.url(),
    picture_xl: z.url()
  }),
  tracks: z.object({
    data: z
      .object({
        /** The track's Deezer id */
        id: z.int(),
        /** true if the track is readable in the player for the current user */
        readable: z.boolean(),
        /** The track's full title */
        title: z.string(),
        /** The track's short title */
        title_short: z.string(),
        /** The track version */
        title_version: z.string(),
        /** The url of the track on Deezer */
        link: z.url(),
        /** The track's duration in seconds */
        duration: z.int(),
        /** The track's Deezer rank */
        rank: z.int(),
        /** Whether the track contains explicit lyrics */
        explicit_lyrics: z.boolean(),
        /** The url of track's preview file. This file contains the first 30 seconds of the track */
        preview: z.url(),
        /** artist object containing: id, name */
        artist: z.object({
          id: z.int(),
          name: z.string(),
          tracklist: z.url(),
          type: z.string()
        }),
        /** album object containing: id, title, cover, cover_small, cover_medium, cover_big, cover_xl */
        album: z.object({
          id: z.int(),
          title: z.string(),
          cover: z.url(),
          cover_small: z.url(),
          cover_medium: z.url(),
          cover_big: z.url(),
          cover_xl: z.url(),
          md5_image: z.string(),
          tracklist: z.url(),
          type: z.string()
        })
      })
      .array()
  })
})
