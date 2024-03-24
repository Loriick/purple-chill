import { lang } from '@src/fakeI18n/main'
import { IMAGE_BASE_URL } from '@src/utils/constant'
import type { Movie } from 'src/utils/types'
import { Link } from 'react-router-dom'

type HeroProps = {
  movie: Movie
}

export function Hero({ movie }: HeroProps) {
  console.log(`${IMAGE_BASE_URL}${movie.backdrop_path}`)
  return (
    <div
      style={{ '--image-url': `url(${IMAGE_BASE_URL}${movie.backdrop_path})` }}
      className={`h-[90%] bg-[image:var(--image-url)] w-full bg-cover bg-center bg-no-repeat relative`}
    >
      <div className="absolute w-full h-full bg-black/30 top-0 left-0 flex flex-col gap-y-2 items-end justify-end p-4 animate-[fade-in_0.8s_linear_forwards]">
        <h1 className="text-9xl w-2/3	text-right font-black opacity-0 animate-[fade-in_1s_0.8s_linear_forwards]">
          {movie.title}
        </h1>
        <Link
          className="bg-[#735CDD] md:hover:bg-[#6146D8] md:transition-colors md:ease-in-out md:duration-200 font-bold py-2 px-4 rounded-md"
          to={`/movie/${movie.id}`}
        >
          {lang['en'].viewMore}
        </Link>
      </div>
    </div>
  )
}
