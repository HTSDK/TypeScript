import { API, type Config } from "./api"
import { LookupResult } from "./schemas"

export class Client {
  constructor(private readonly config: Config) {}

  /**
   * #### IIN/BIN Lookup,
   * When performing a GET request, this end-point accepts the first 6, 7, 8, 9, 10, or 11 numbers from the credit card
   * or debit card and returns vendor, location, and other meta-information.
   *
   * @param digits First 6, 7, 8, 9, 10, or 11 digits of the card number
   */
  lookup(digits: number) {
    const api = new API(this.config)
    return api.get("/iin", LookupResult, { digits: digits.toString() })
  }
}
