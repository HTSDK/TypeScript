export { Client } from "./client"

import { Client } from "./client"

const client = new Client()

const response = await client.albums.get(302127)
console.log(response)
