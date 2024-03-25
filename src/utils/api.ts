import { BASE_URL } from './constant'

async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`,
  )
  return response.json()
}

async function getPopularSeries() {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${import.meta.env.VITE_API_KEY}`,
  )
  return response.json()
}

async function getDetails({ type, id }: { type?: string; id?: string }) {
  if (!type || !id) return undefined

  const response = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${import.meta.env.VITE_API_KEY}`,
  )

  const responseSimilar = await fetch(
    `${BASE_URL}/${type}/${id}/similar?api_key=${import.meta.env.VITE_API_KEY}`,
  )

  return {
    detail: await response.json(),
    similar: await responseSimilar.json(),
  }
}

async function searchMovie(title: string) {
  const response = await fetch(
    `${BASE_URL}/search/collection?query=${title}&page=1&api_key=${import.meta.env.VITE_API_KEY}`,
  )

  return response.json()
}

export { getPopularMovies, getPopularSeries, getDetails, searchMovie }
