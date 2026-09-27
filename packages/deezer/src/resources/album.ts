import { API } from "../api"
import { Album } from "../schemas/album"

export class AlbumResource extends API {
  get(id: number) {
    return this.GET(`/album/${id}`, Album)
  }
}
