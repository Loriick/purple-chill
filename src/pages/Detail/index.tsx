import { Badge } from '@components/Badge'
import { Layout } from '@components/Layout'
import { MoviesSelection } from '@components/MoviesSelection'
import { Rating } from '@components/Rating'
import { lang } from '@src/fakeI18n/main'
import { getDetails } from '@src/utils/api'
import { IMAGE_BASE_URL } from '@src/utils/constant'
import { DetailPage, Genre } from '@src/utils/types'
import { Params, useLoaderData, useParams } from 'react-router-dom'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { useState } from 'react'

export function Detail() {
  const [isFavorite, setIsFavorite] = useState(false)
  const data = useLoaderData() as DetailPage
  const { type } = useParams()

  console.log(data)

  const {
    title,
    poster_path,
    overview,
    release_date,
    genres,
    vote_count,
    vote_average,
    homepage,
    original_name,
    first_air_date,
    seasons,
  } = data.detail

  return (
    <Layout>
      <main className="w-[95%] h-full overflow-y-auto flex flex-col gap-y-4 ">
        <h1 className="text-4xl font-bold">{title ?? original_name}</h1>
        <section className="flex w-full">
          <div className="w-2/6">
            <img
              className="h-96"
              src={`${IMAGE_BASE_URL}${poster_path}`}
              alt={title}
            />
          </div>
          <div className="w-4/6 flex flex-col gap-y-3">
            <p>{overview}</p>
            {release_date ? (
              <p className="font-semibold">
                {lang['en'].release}: {release_date}
              </p>
            ) : null}
            {first_air_date ? (
              <p className="font-semibold">
                {lang['en'].firstPublication}: {first_air_date}
              </p>
            ) : null}

            {seasons ? (
              <p className="font-semibold">
                {lang['en'].seasons}: {seasons.length}
              </p>
            ) : null}
            <div>
              {genres.map((genre: Genre) => (
                <Badge key={genre.id} genre={genre.name} />
              ))}
            </div>
            <Rating numberOfVotes={vote_count} rate={vote_average} />

            <div className="flex gap-x-2 items-center">
              <div onClick={() => setIsFavorite((prev) => !prev)}>
                {isFavorite ? (
                  <FaHeart className="text-red-500 text-3xl" />
                ) : (
                  <FaRegHeart className="text-3xl" />
                )}
              </div>

              <p>
                {isFavorite
                  ? lang['en'].inYourFavorites
                  : lang['en'].addInFavorites}
              </p>
            </div>

            {homepage ? (
              <a
                href={homepage}
                target="blank"
                className="w-fit mt-auto self-end text-center bg-[#735CDD] md:hover:bg-[#6146D8] md:transition-colors md:ease-in-out md:duration-200 font-bold py-2 px-4 rounded-md"
              >
                {lang['en'].websiteLink}
              </a>
            ) : null}
          </div>
        </section>
        {type ? (
          <MoviesSelection
            title={lang['en'].similar}
            movies={data.similar.results}
            type={type}
          />
        ) : null}
      </main>
    </Layout>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function detailLoader({
  params,
}: {
  params: Params
}): Promise<DetailPage | undefined> {
  const { type, id } = params

  return getDetails({ type, id })
}
