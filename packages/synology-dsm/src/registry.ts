import { z } from "zod"

export type Registry = {
  apis: Record<string, Definition>
}

export type Definition = {
  /** @default "entry.cgi" */
  path?: string
  apis?: Record<string, Definition>
  methods?: Record<string, Method>
}

export type Method = Record<number, Version>

export type Version<I extends z.ZodType = z.ZodType, O extends z.ZodType = z.ZodType> = {
  /** @default true */
  respond?: boolean
  input?: {
    schema: I
    defaults?: Partial<z.input<NoInfer<I>>>
  }
  output?: O
  setSession?: {
    sid?: keyof z.output<O> | { value: string | null }
    synotoken?: keyof z.output<O> | { value: string | null }
  }
}

export const registry = <const R extends Registry>(r: R) => r
export const definition = <const D extends Definition>(d: D) => d
export const method = <const M extends Method>(m: M) => m
export const version = <const I extends z.ZodType, const O extends z.ZodType>(v: Version<I, O>) => v

export const REGISTRY = registry({
  apis: {
    SYNO: definition({
      apis: {
        TEST: definition({
          methods: {
            hello: method({
              1: version({}),
              2: version({})
            })
          }
        })
      },
      methods: {
        test: method({
          1: version({
            input: {
              schema: z.object({
                test: z.string()
              }),
              defaults: {
                test: "kdfk"
              }
            },
            output: z.object({
              test: z.string()
            })
          })
        })
      }
    })
  }
})

export const reg = REGISTRY as Registry
