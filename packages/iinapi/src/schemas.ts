import { z } from "zod"

export const LookupResult = z.object({
  valid: z.boolean(),
  result: z.object({
    Bin: z.int(),
    CardBrand: z.string(),
    IssuingInstitution: z.string(),
    CardType: z.string(),
    CardCategory: z.string(),
    IssuingCountry: z.string(),
    IssuingCountryCode: z.string()
  })
})
