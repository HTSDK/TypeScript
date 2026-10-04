import { z } from "zod"

export const Verse = z.object({
  book_id: z.string(),
  book_name: z.string(),
  chapter: z.int(),
  verse: z.int(),
  text: z.string()
})

export const Input = z.object({
  reference: z.string(),
  verses: z.array(Verse),
  text: z.string(),
  translation_id: z.string(),
  translation_name: z.string(),
  translation_note: z.string()
})

export const Translation = z.object({
  identifier: z.string(),
  name: z.string(),
  language: z.string(),
  language_code: z.string(),
  license: z.string()
})

export const Translations = z.object({
  translations: z.array(
    Translation.extend({
      url: z.url()
    })
  )
})

export const Books = z.object({
  translation: Translation,
  books: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.url()
    })
  )
})

export const Chapters = z.object({
  translation: Translation,
  chapters: z.array(
    z.object({
      book_id: z.string(),
      book: z.string(),
      chapter: z.int(),
      url: z.url()
    })
  )
})

export const Verses = z.object({
  translation: Translation,
  verses: z.array(Verse)
})

export const Random = z.object({
  translation: Translation,
  random_verse: z.object({
    book_id: z.string(),
    book: z.string(),
    chapter: z.int(),
    verse: z.int(),
    text: z.string()
  })
})
