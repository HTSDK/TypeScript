import { API } from "$/api"
import { SYNO_ActiveInsight_CompleteCollection } from "$/SYNO/ActiveInsight/CompleteCollection"

export class SYNO_ActiveInsight extends API {
  get completeCollection() {
    return this.API(SYNO_ActiveInsight_CompleteCollection)
  }
}
