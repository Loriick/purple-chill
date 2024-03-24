import { Layout } from '@components/Layout'
import { MainState } from '@src/context'
import { lang } from '@src/fakeI18n/main'
import { getPopularMovies, getPopularSeries } from '@src/utils/api'
import { IMAGE_BASE_URL } from '@src/utils/constant'
import { useQueries } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export function Favorites() {
  const context = useContext(MainState)

  const results = useQueries({
    queries: [
      {
        queryKey: ['popular-movies'],
        queryFn: getPopularMovies,
      },
      {
        queryKey: ['popular-series'],
        queryFn: getPopularSeries,
      },
    ],
  })

  if (!context) return undefined

  const isLoading = results.some((query) => query.isLoading)

  if (isLoading) return <p>Loading...</p>

  const favoritesList = results
    .flatMap((result) => result.data.results)
    .filter((data) => context.state.idFavoritesList.includes(data.id))

  return (
    <Layout>
      <main className="w-[95%] h-full overflow-y-auto">
        <h1 className="text-4xl font-bold">
          {lang[context.state.lang].favoritesTitle}
        </h1>
        <section className="mt-4 flex flex-wrap gap-4">
          {favoritesList.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="snap-center h-64	flex-shrink-0 rounded-md overflow-hidden max-w-56 block"
            >
              <img
                alt={movie.title}
                className="object-contain h-full"
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              />
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  )
}
