export abstract class API {
  private readonly cache = new Map<string, unknown>()

  protected memo<T>(key: string, make: () => T): T {
    if (!this.cache.has(key)) this.cache.set(key, make())
    return this.cache.get(key) as T
  }
}
