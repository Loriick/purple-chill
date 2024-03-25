import { MainState } from '@src/context'
import { TOGGLE_MODAL } from '@src/context/action'
import { lang } from '@src/fakeI18n/main'
import { searchMovie } from '@src/utils/api'
import { IMAGE_BASE_URL } from '@src/utils/constant'
import { Movie } from '@src/utils/types'
import { QueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { FaMicrophone } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const queryClient = new QueryClient({})

export function SearchModal() {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [data, setData] = useState<Movie[] | null>(null)
  const context = useContext(MainState)

  if (!context) return undefined

  const handleCloseModal = () => {
    context.dispatch({
      type: TOGGLE_MODAL,
      payload: false,
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['search'],
        queryFn: () => searchMovie(value),
      })

      setData(data.results)
      setTitle(value)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  // if (isLoading) return <p>Loading</p>

  return (
    <div className="overflow-y-auto py-40 fixed h-full top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full bg-black/75">
      <div className="h-full overflow-y-auto w-3/5 bg-zinc-800">
        <div className="w-full justify-center flex flex-col pt-8">
          <span
            onClick={handleCloseModal}
            className="self-end text-lg font-bold pr-10 cursor-pointer"
          >
            X
          </span>
          <form
            onSubmit={handleSubmit}
            className="flex w-full px-20 justify-center"
          >
            <div className="w-full flex bg-white rounded-md border border-gray-300 items-center">
              <input
                type="text"
                onChange={handleChange}
                className="w-full bg-gray-50  text-gray-900 text-sm rounded-lg block ps-6 p-2.5"
                placeholder="Ratatouille"
                value={value}
              />
              <FaMicrophone className="text-black text-lg" />
            </div>
            <button
              type="submit"
              className="ml-6 bg-[#735CDD] md:hover:bg-[#6146D8] md:transition-colors md:ease-in-out md:duration-200 font-bold py-2 px-4 rounded-md"
            >
              {lang[context.state.lang].search}
            </button>
          </form>

          {data ? (
            <div className="mt-10 w-4/5 mx-auto overflow-y-auto">
              <h3 className="font-semibold text-xl mb-2">{title}</h3>
              <div className="flex flex-wrap gap-4">
                {data.map((movie: Movie) => (
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
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
