import { z } from "zod"

/** Payload supplying the asset ids to modify, as well as tags to add/remove from those assets */
export const BatchAssetTagsPayload = z.object({
  /** Array of asset IDs to perform bulk operations on (provide the type of asset with the URL) */
  assetIds: z.int32().array(),
  /** Array of tag IDs to add to the supplied assets */
  tagIdsToAdd: z.int32().array(),
  /** Array of tag IDs to remove from the supplied assets */
  tagIdsToRemove: z.int32().array()
})

export const AssetTagUser = z.object({
  id: z.int32(),
  name: z.string(),
  email: z.string()
})

export const AssetTag = z.object({
  id: z.int32(),
  name: z.string(),
  description: z.string(),
  createTime: z.number(),
  updateTime: z.number(),
  createdByUserId: z.int32(),
  updatedByUserId: z.int32(),
  targetsCount: z.int32(),
  createdBy: AssetTagUser,
  updatedBy: AssetTagUser
})
