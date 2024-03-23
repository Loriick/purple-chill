const BASE_URL = 'https://api.themoviedb.org/3'

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

async function getTrendingAll() {
  const response = await fetch(
    `${BASE_URL}/trending/all/day?api_key=${import.meta.env.VITE_API_KEY}`,
  )
  return response.json()
}

export { getPopularMovies, getPopularSeries, getTrendingAll }
