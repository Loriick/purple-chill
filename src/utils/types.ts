type Lang = 'en' | 'fr'

type Media = {
  adult: string
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  media_type?: string
}

type Genre = {
  id: number
  name: string
}

type Detail = {
  id: number
  title?: string
  original_name?: string
  poster_path: string
  overview: string
  release_date?: string
  first_air_date?: string
  genres: Genre[]
  vote_count: number
  vote_average: number
  homepage: string
  backdrop_path: string
  seasons?: string[]
}

type Similar = {
  results: Media[]
}

type DetailPage = {
  detail: Detail
  similar: Similar
}

export type { Media, Genre, DetailPage, Lang }
