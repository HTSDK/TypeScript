import { API } from "$/api"
import { SYNO_FileStation_Favorite } from "$/SYNO/FileStation/Favorite"

export type ListAdditional =
  | "real_path"
  | "owner"
  | "time"
  | "perm"
  | "mount_point_type"
  | "sync_share"
  | "volume_status"
  | "indexed"
  | "hybrid_share"
  | "worm_share"
  | "tiering_xattr"

export class SYNO_FileStation extends API {
  get Favorite() {
    return this.API(SYNO_FileStation_Favorite)
  }
}
