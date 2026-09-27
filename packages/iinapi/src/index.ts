export { Client } from "./client"

import { Client } from "./client"

const client = new Client({
  key: ""
})

console.log(await client.lookup(123456))
