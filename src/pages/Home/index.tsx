import { Layout } from '@components/Layout'
import { useQueries } from '@tanstack/react-query'
import { getPopularMovies, getPopularSeries } from '../../utils/api'
import { Hero } from '@pages/Hero'
import { HomeMoviesSection } from '@pages/HomeMoviesSection'

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
        <HomeMoviesSection
          movies={results[0].data.results}
          title="Top rated movies"
          category="movie"
        />
        <HomeMoviesSection
          movies={results[1].data.results}
          title="Top rated series"
          category="serie"
        />
      </main>
    </Layout>
  )
}
