import { Badge } from '@components/Badge'
import { Layout } from '@components/Layout'
import { MoviesSelection } from '@components/MoviesSelection'
import { Rating } from '@components/Rating'
import { lang } from '@src/fakeI18n/main'
import { getDetails } from '@src/utils/api'
import { IMAGE_BASE_URL } from '@src/utils/constant'
import { DetailPage, Genre } from '@src/utils/types'
import { Params, useLoaderData, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { MainState } from '@src/context'
import { Favorite } from '@components/Favorite'
import { Loader } from '@components/Loader'
import { toast } from 'react-toastify'
import { Error } from '@pages/Error'

export function Detail() {
  const data = useLoaderData() as DetailPage
  const { type } = useParams()
  const context = useContext(MainState)

  if (!context) return undefined

  if (!data && typeof data !== 'string') {
    return (
      <Layout>
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      </Layout>
    )
  }

  if (!data && typeof data === 'string') {
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
    backdrop_path,
    id,
  } = data.detail

  return (
    <Layout>
      <main
        style={{
          '--image-url': `url(${IMAGE_BASE_URL}${backdrop_path})`,
        }}
        className="w-full bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat h-full relative"
      >
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-lg flex flex-col gap-y-4 p-14">
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
                  {lang['en'].release}:{' '}
                  {new Date(release_date).toLocaleDateString('fr')}
                </p>
              ) : null}
              {first_air_date ? (
                <p className="font-semibold">
                  {lang['en'].firstPublication}:{' '}
                  {new Date(first_air_date).toLocaleDateString('fr')}
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
              <Favorite id={id} />
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
        </div>
      </main>
    </Layout>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function detailLoader({
  params,
}: {
  params: Params
}): Promise<DetailPage | string | undefined> {
  const { type, id } = params

  return getDetails({ type, id })
}
