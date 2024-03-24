import { Layout } from '@components/Layout'
import { useQueries } from '@tanstack/react-query'
import { getPopularMovies, getPopularSeries } from '@src/utils/api'
import { Hero } from '@components/Hero'
import { MoviesSelection } from '@components/MoviesSelection'

export function Home() {
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

  console.log(results)

  const isLoading = results.some((query) => query.isLoading)

  if (isLoading) return <p>Loading...</p>
  return (
    <Layout>
      <main className="w-full h-full overflow-y-auto">
        <Hero
          movie={
            results[0].data.results[
              Math.round(Math.random() * results[0].data.results.length - 1)
            ]
          }
        />
        <MoviesSelection
          movies={results[0].data.results}
          title="Top rated movies"
          type="movie"
        />
        <MoviesSelection
          movies={results[1].data.results}
          title="Top rated series"
          type="tv"
        />
      </main>
    </Layout>
  )
}
