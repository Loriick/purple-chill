import { Layout } from '@components/Layout'
import { useQueries } from '@tanstack/react-query'
import { getPopularMovies, getPopularSeries } from '@src/utils/api'
import { Hero } from '@components/Hero'
import { MoviesSelection } from '@components/MoviesSelection'
import { useContext } from 'react'
import { MainState } from '@src/context'
import { lang } from '@src/fakeI18n/main'

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

  if (isLoading) return <p>Loading...</p>
  return (
    <Layout>
      <main className="w-full h-full overflow-y-auto ">
        <Hero
          movie={
            results[0].data.results[
              Math.round(Math.random() * results[0].data.results.length - 1)
            ]
          }
        />
        <br />
        <MoviesSelection
          movies={results[0].data.results}
          title={lang[context.state.lang].topRatedMovie}
          type="movie"
        />
        <MoviesSelection
          movies={results[1].data.results}
          title={lang[context.state.lang].topRatedSeries}
          type="tv"
        />
      </main>
    </Layout>
  )
}
