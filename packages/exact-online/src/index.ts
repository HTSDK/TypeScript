export { Client } from "./client"

import { Client } from "./client"

const client = new Client()

console.log(await client.system.getMe())
