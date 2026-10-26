import { z } from "zod"

export type APIState = {
  info?: Record<string, number>
  sid?: string
  synotoken?: string
}

type APIContext = {
  url: string
  path: string
  state: APIState
  errors: Record<number, string>
}

type Context = {
  post<O extends z.ZodType>(output: O, params?: Record<string, string>): Promise<z.output<O>>
}

function createContext(context: APIContext, api: string, version: number, method: string): Context {
  return {
    async post<O extends z.ZodType>(
      output: O,
      params?: Record<string, string>
    ): Promise<z.output<O>> {
      const url = new URL(`${context.url}/webapi/${context.path}`)

      const body = new URLSearchParams()
      body.append("api", api)
      body.append("version", version.toString())
      body.append("method", method)

      if (params) {
        for (const key of Object.keys(params)) {
          const value = params[key]
          body.append(key, value)
        }
      }
      if (context.state.sid) body.append("_sid", context.state.sid)

      const headers: Record<string, string> = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Referer: context.url
      }
      if (context.state.synotoken) headers["X-SYNO-TOKEN"] = context.state.synotoken

      const response = await fetch(url, {
        method: "POST",
        body,
        redirect: "follow",
        headers
      })

      if (response.ok) {
        const result = z
          .object({
            success: z.boolean(),
            error: z
              .object({
                code: z.int(),
                errors: z.array(z.unknown()).optional()
              })
              .optional(),
            data: output.optional()
          })
          .parse(await response.json())

        if (result.data) {
          return result.data
        } else if (result.error) {
          const message = context.errors[result.error.code]
          throw new Error(
            `${api}.${method}(${version}) ${result.error.code}${message ? `: ${message}` : ""}`
          )
        } else if (result.success) {
          return undefined as z.output<O>
        } else {
          throw new Error("Failed to parse response")
        }
      } else {
        throw new Error("Unable to parse response")
      }
    }
  }
}

type MethodVersions = Record<
  number,
  (ctx: Context) => (...args: z.output<z.ZodAny>[]) => Promise<unknown>
>
type Versions<M extends MethodVersions> = keyof M & number
type MethodArgs<M extends MethodVersions, V extends Versions<M>> = Parameters<ReturnType<M[V]>>
type Output<M extends MethodVersions, V extends Versions<M>> = ReturnType<ReturnType<M[V]>>

type BuildTuple<N extends number, T extends unknown[] = []> = T["length"] extends N
  ? T
  : BuildTuple<N, [...T, unknown]>

type Gt<A extends number, B extends number> =
  BuildTuple<A> extends [...BuildTuple<B>, ...infer Rest] ? (Rest extends [] ? false : true) : false

type AnyGreater<O extends number, U extends number> = O extends unknown ? Gt<O, U> : never

type Max<T extends number, All extends number = T> = T extends unknown
  ? true extends AnyGreater<Exclude<All, T>, T>
    ? never
    : T
  : never

type Method<M extends MethodVersions> = {
  call<V extends Versions<M>>(...args: MethodArgs<M, V>): Output<M, V>
  latest(...args: MethodArgs<M, Max<Versions<M>>>): Output<M, Max<Versions<M>>>
} & {
  [V in Versions<M> as `v${V}`]: (...args: MethodArgs<M, V>) => Output<M, V>
}

export abstract class API {
  constructor(private readonly context: APIContext) {}

  protected get path(): string {
    return this.context.path
  }

  protected get errors(): Record<number, string> {
    return {
      ...this.context.errors,
      100: "Unknown error.",
      101: "no parameter of API, method or version.",
      102: "The requested API does not exist.",
      103: "The requested method does not exist.",
      104: "The requested version does not support the functionality.",
      105: "The logged in session does not have permission.",
      106: "Session timeout.",
      107: "Session interrupted by duplicated login.",
      108: "Failed to upload the file.",
      109: "The network connection is unstable or the system is busy.",
      110: "The network connection is unstable or the system is busy.",
      111: "The network connection is unstable or the system is busy.",
      114: "Lost parameters for this API.",
      115: "Not allowed to upload a file.",
      116: "Not allowed to perform for a demo site.",
      117: "The network connection is unstable or the system is busy.",
      118: "The network connection is unstable or the system is busy.",
      119: "Invalid session.",
      150: "Request source IP does not match the login IP."
    }
  }

  private get name(): string {
    return this.constructor.name.replaceAll("_", ".")
  }

  protected method<M extends MethodVersions>(method: string, versions: M): Method<M> {
    const context = { ...this.context, path: this.path, errors: this.errors }
    const api = this.name

    const numbers = Object.keys(versions).map(Number)
    const latest = Math.max(...numbers)

    // noinspection JSUnusedGlobalSymbols
    const result: Record<string, unknown> = {
      call<V extends Versions<M>>(...args: MethodArgs<M, V>): Output<M, V> {
        if (context.state.info?.[api]) {
          const ctx = createContext(context, api, context.state.info[api], method)
          return versions[context.state.info[api]](ctx)(args) as Output<M, V>
        } else {
          const ctx = createContext(context, api, latest, method)
          return versions[latest](ctx)(...args) as Output<M, V>
        }
      },
      latest(...args: MethodArgs<M, Max<Versions<M>>>): Output<M, Max<Versions<M>>> {
        const ctx = createContext(context, api, latest, method)
        return versions[latest](ctx)(...args) as Output<M, Max<Versions<M>>>
      }
    }

    for (const number of numbers) {
      const version = versions[number]
      const ctx = createContext(context, api, number, method)
      result[`v${version}`] = (...args: unknown[]) => version(ctx)(...args)
    }

    return result as Method<M>
  }

  protected API<T extends API>(api: new (context: APIContext) => T): T {
    return new api({
      ...this.context,
      path: this.path,
      errors: this.errors
    })
  }

  protected setStateInfo(info: Record<string, number>) {
    this.context.state.info = info
  }

  protected setStateCredentials(sid?: string, synotoken?: string) {
    this.context.state.sid = sid
    this.context.state.synotoken = synotoken
  }
}
