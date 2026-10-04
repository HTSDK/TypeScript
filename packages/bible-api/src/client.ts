import { API } from "./api"
import { Books, Chapters, Input, Random, Translations, Verses } from "./schemas"

// noinspection JSUnusedGlobalSymbols
export class Client extends API {
  input(input: string, chapter?: number, verse?: string | number, translation?: string) {
    let path = `/${input}`
    if (chapter) path += ` ${chapter}`
    if (verse) path += `:${verse}`

    return this.GET(path, Input, translation ? { translation } : undefined)
  }

  listTranslations() {
    return this.GET("/data", Translations)
  }

  listBooks(translation: string) {
    return this.GET(`/data/${translation}`, Books)
  }

  listChapters(translation: string, book: string) {
    return this.GET(`/data/${translation}/${book}`, Chapters)
  }

  listVerses(translation: string, book: string, chapter: number) {
    return this.GET(`/data/${translation}/${book}/${chapter}`, Verses)
  }

  random(translation: string, books?: string[]) {
    return this.GET(`/data/${translation}/random${books ? `/${books.join(",")}` : ""}`, Random)
  }
}
