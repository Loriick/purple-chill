import { Layout } from '@components/Layout'
import { useQueries } from '@tanstack/react-query'
import { getPopularMovies, getPopularSeries } from '@src/utils/api'
import { Hero } from '@components/Hero'
import { MediasSelection } from '@components/MediasSelection'
import { useContext } from 'react'
import { MainState } from '@src/context'
import { lang } from '@src/fakeI18n/main'
import { Loader } from '@components/Loader'
import { toast } from 'react-toastify'
import { Error } from '@pages/Error'

export function Home() {
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

  return (
    <Layout>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <main className="w-full h-full overflow-y-auto">
          <Hero
            movie={
              results[0].data.results[
                Math.round(Math.random() * results[0].data.results.length - 1)
              ]
            }
          />
          <br />
          <MediasSelection
            medias={results[0].data.results}
            title={lang[context.state.lang].topRatedMovie}
            type="movie"
          />
          <MediasSelection
            medias={results[1].data.results}
            title={lang[context.state.lang].topRatedSeries}
            type="tv"
          />
        </main>
      )}
    </Layout>
  )
}
