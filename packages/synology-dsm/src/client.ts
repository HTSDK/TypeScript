import type { z } from "zod"
import type { Definition, Method, REGISTRY, Version } from "$/registry"

type Highest<K extends number, I extends unknown[] = [], Last = never> = I["length"] extends 64
  ? Last
  : Highest<K, [...I, unknown], I["length"] extends K ? I["length"] : Last>

type InputOf<V extends Version> = V extends { input?: infer In }
  ? In extends { schema?: infer S extends z.ZodObject; defaults?: infer D }
    ? Omit<z.input<S>, keyof D> & Partial<D>
    : In extends { schema: infer S extends z.ZodObject }
      ? z.input<S>
      : number
  : string

type OutputOf<V extends Version> = V extends { respond: boolean }
  ? never
  : V extends Version<z.ZodType, infer O>
    ? z.output<O>
    : never

type Args<V extends Version> =
  InputOf<V> extends undefined
    ? [input?: InputOf<V>]
    : InputOf<V> extends Record<string, unknown>
      ? [input?: InputOf<V>]
      : [input: InputOf<V>]
type Call<V extends Version> = (...args: Args<V>) => Promise<OutputOf<V>>

type ApiOf<D extends Definition> = D extends {
  readonly apis: infer A extends Record<string, Definition>
}
  ? A
  : never
type MethodsOf<D extends Definition> = D extends {
  readonly methods: infer M extends Record<string, Method>
}
  ? M
  : never

export class SynologyError extends Error {
  constructor(
    public readonly api: string,
    public readonly method: string,
    public readonly code: number | undefined
  ) {
    super(`${api}.${method} failed${code !== undefined ? ` (code ${code})` : ""}`)
    this.name = "SynologyError"
  }
}

export type ClientOptions = {
  baseUrl: string
  fetch?: typeof fetch
  sid?: string
  synotoken?: string
}

type ClientDefinition<D extends Definition> = {
  readonly [K in keyof ApiOf<D>]: ClientDefinition<ApiOf<D>[K]>
} & {
  readonly [K in keyof MethodsOf<D>]: Call<MethodsOf<D>[K][1]>
} & {
  readonly [K in keyof MethodsOf<D>]: {
    readonly [V in Extract<keyof MethodsOf<D>[K], number> as `v${V}`]: Call<MethodsOf<D>[K][V]>
  }
}

type ClientAPI = {
  readonly [API in keyof ApiOf<typeof REGISTRY>]: ClientDefinition<ApiOf<typeof REGISTRY>[API]>
}

// biome-ignore lint/correctness/noUnusedVariables: safe
interface Client extends ClientAPI {}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: needed
class Client {
  private readonly baseUrl: string
  private fetch: typeof fetch
  private sid: string | undefined
  private synotoken: string | undefined

  constructor(options: ClientOptions) {
    this.baseUrl = options.baseUrl
    this.fetch = options.fetch ?? fetch
    this.sid = options.sid
    this.synotoken = options.synotoken
  }
}

Object.defineProperty(Client.prototype, "SYNO", {
  enumerable: true,
  get() {
    return "Hello"
  }
})

export { Client }
