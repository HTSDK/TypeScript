# @htsdk/iinapi

A lightweight, type-safe TypeScript/JavaScript client for the [IIN API](https://iinapi.com) (BIN / IIN credit and debit card lookup service).

## Features

- **Type-Safe & Validated**: Built with TypeScript and validated at runtime with Zod schemas.
- **Card Metadata Lookup**: Retrieve card brand, card type, card category, issuing institution, and issuing country information using the first 6 to 11 digits of a card number.
- **Universal Runtime Support**: Works seamlessly across Node.js, Bun, Deno, and modern Edge/Browser runtimes using standard `fetch`.
- **Zero Config**: Simple and intuitive API client setup.

## Installation

Install the package using your preferred package manager:

```bash
# npm
npm install @htsdk/iinapi

# bun
bun add @htsdk/iinapi

# pnpm
pnpm add @htsdk/iinapi

# yarn
yarn add @htsdk/iinapi
```

## Quick Start

```typescript
import { Client } from "@htsdk/iinapi"

const client = new Client({
  key: process.env.IINAPI_KEY || "your_api_key_here"
})

async function main() {
  try {
    const result = await client.lookup(411111)
    console.log(result)
  } catch (error) {
    console.error("Lookup failed:", error)
  }
}

main()
```

## API Reference

### `Client`

#### `new Client(config: { key: string })`

Creates a new instance of the IIN API client.

- `config.key` *(string, required)*: Your API key from [iinapi.com](https://iinapi.com).

#### `client.lookup(digits: number): Promise<LookupResult>`

Performs an IIN/BIN lookup for the specified card number prefix.

- `digits` *(number, required)*: The first 6, 7, 8, 9, 10, or 11 digits of the payment card number.
- **Returns**: `Promise<LookupResult>` resolving to the card metadata.

### Response Structure

The `lookup` method returns an object matching the following structure:

```typescript
type LookupResult = {
  valid: boolean
  result: {
    Bin: number
    CardBrand: string
    IssuingInstitution: string
    CardType: string
    CardCategory: string
    IssuingCountry: string
    IssuingCountryCode: string
  }
}
```

#### Example Response

```json
{
  "valid": true,
  "result": {
    "Bin": 411111,
    "CardBrand": "VISA",
    "IssuingInstitution": "JPMORGAN CHASE BANK, N.A.",
    "CardType": "CREDIT",
    "CardCategory": "PLATINUM",
    "IssuingCountry": "UNITED STATES",
    "IssuingCountryCode": "US"
  }
}
```

## Error Handling

When an API request fails (e.g., due to an invalid key, non-200 HTTP status, or invalid response payload), the client throws an `Error`:

```typescript
try {
  const data = await client.lookup(411111)
} catch (error) {
  if (error instanceof Error) {
    console.error("API error:", error.message)
  }
}
```

## License

MIT
