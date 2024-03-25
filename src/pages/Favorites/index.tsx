import { Layout } from '@components/Layout'
import { Loader } from '@components/Loader'
import { MainState } from '@src/context'
import { lang } from '@src/fakeI18n/main'
import { getPopularMovies, getPopularSeries } from '@src/utils/api'
import { IMAGE_BASE_URL } from '@src/utils/constant'
import { useQueries } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Error } from '@pages/Error'

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
  const isError = results.some((query) => query.isError)

  if (isError) {
    toast.error(lang[context.state.lang].error, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })

    return <Error />
  }

  const favoritesList = results
    .flatMap((result) => result.data.results)
    .filter((data) => context.state.idFavoritesList.includes(data.id))

  return (
    <Layout>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
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
      )}
    </Layout>
  )
}
