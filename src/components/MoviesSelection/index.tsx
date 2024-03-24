import { Link } from 'react-router-dom'
import { IMAGE_BASE_URL } from '@src/utils/constant'
import { Movie } from '@src/utils/types'
import { Favorite } from '@components/Favorite'

type MoviesSelectionProps = {
  title: string
  type: string
  movies: Movie[]
}

export function MoviesSelection({ title, movies, type }: MoviesSelectionProps) {
  const cleanedMoviesList = movies.filter((movie) => movie.poster_path)
  return (
    <div className="py-2">
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <div className="snap-mandatory snap-x flex gap-x-4 w-full overflow-x-auto">
        {cleanedMoviesList.map((movie) => (
          <Link
            to={`/${type}/${movie.id}`}
            key={movie.id}
            className="snap-center h-64	flex-shrink-0 rounded-md overflow-hidden max-w-56 block relative"
          >
            <img
              alt={movie.title}
              className="object-contain h-full"
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/70 pt-2 pl-2 opacity-0 transition-opacity hover:opacity-100">
              <Favorite id={movie.id} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
