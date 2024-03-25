import { BASE_URL } from './constant'
import { DetailPage } from './types'

async function getPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message)
      return error.message
    }
    throw error
  }
}

async function getPopularSeries() {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${import.meta.env.VITE_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message)
      return error.message
    }
    throw error
  }
}

async function getDetails({
  type,
  id,
}: {
  type?: string
  id?: string
}): Promise<DetailPage | string | undefined> {
  if (!type || !id) return undefined

  try {
    const response = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${import.meta.env.VITE_API_KEY}`,
    )

    const responseSimilar = await fetch(
      `${BASE_URL}/${type}/${id}/similar?api_key=${import.meta.env.VITE_API_KEY}`,
    )

    if (!response.ok || !responseSimilar.ok) {
      throw new Error('Failed to fetch data')
    }

    return {
      detail: await response.json(),
      similar: await responseSimilar.json(),
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message)
      return error.message
    }
    throw error
  }
}

async function searchMovie(title: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/collection?query=${title}&page=1&api_key=${import.meta.env.VITE_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message)
      return error.message
    }
    throw error
  }
}

export { getPopularMovies, getPopularSeries, getDetails, searchMovie }
