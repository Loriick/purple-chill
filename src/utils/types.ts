// Movie or TV
type Lang = 'en' | 'fr'

type Movie = {
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
}

type Serie = Movie

type Genre = {
  id: number
  name: string
}

type Detail = {
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
  results: Movie[]
}

type DetailPage = {
  detail: Detail
  similar: Similar
}

export type { Movie, Serie, Genre, DetailPage, Lang }
