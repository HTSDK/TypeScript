import { SystemResource } from "./resources/system"

export class Client {
  get system() {
    return new SystemResource()
  }
}
