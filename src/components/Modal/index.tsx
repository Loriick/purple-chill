import { useContext, useEffect, useState } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FaMicrophone } from 'react-icons/fa'
import { MainState } from '@src/context'
import { TOGGLE_MODAL } from '@src/context/action'
import { lang } from '@src/fakeI18n/main'
import { useSpeechRecognition } from '@src/hooks/useSpeechRecognition'
import { searchMedia } from '@src/utils/api'
import { IMAGE_BASE_URL } from '@src/utils/constant'
import { Media } from '@src/utils/types'

const queryClient = new QueryClient({})

export function SearchModal() {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [data, setData] = useState<Media[] | null>(null)
  const context = useContext(MainState)
  const {
    text,
    startListening,
    stopListening,
    hasRecognitionSupport,
    isListening,
  } = useSpeechRecognition()

  useEffect(() => {
    if (!isListening && text) {
      setValue(text)
    }
  }, [isListening, text])

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
    const data = await queryClient.fetchQuery({
      queryKey: ['search'],
      queryFn: () => searchMedia(value),
    })

    setData(data.results)
    setTitle(value)
  }

  return (
    <div className="overflow-y-auto py-40 fixed h-full top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full bg-black/75">
      <div className="h-full overflow-y-auto w-full md:w-3/5 bg-zinc-800">
        <div className="w-full justify-center flex flex-col pt-8">
          <span
            onClick={handleCloseModal}
            className="self-end text-lg font-bold pr-10 cursor-pointer"
          >
            X
          </span>
          <form
            onSubmit={handleSubmit}
            className="flex w-full px-6 md:px-20 justify-center gap-x-2"
          >
            <span className="bg-gray-50 rounded-full p-4">
              {hasRecognitionSupport ? (
                <FaMicrophone
                  onClick={isListening ? stopListening : startListening}
                  className={`text-lg cursor-pointer ${isListening ? 'text-[#735CDD]' : 'text-black'}`}
                />
              ) : null}
            </span>

            <input
              type="text"
              onChange={handleChange}
              className="w-3/5 bg-gray-50 text-gray-900 text-sm rounded-lg block ps-6 px-2.5 py-4"
              placeholder={lang[context.state.lang].searchPlaceholder}
              value={value}
            />
            <button
              type="submit"
              className="bg-[#735CDD] md:hover:bg-[#6146D8] md:transition-colors md:ease-in-out md:duration-200 font-bold px-4 rounded-md"
            >
              {lang[context.state.lang].search}
            </button>
          </form>
          {data ? (
            <div className="mt-10 w-full md:w-4/5 mx-auto overflow-y-auto">
              <h3 className="font-semibold text-xl mb-2">{title}</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {data
                  .filter((media) => media.poster_path)
                  .map((media: Media) => (
                    <Link
                      to={`/${media.media_type}/${media.id}`}
                      key={media.id}
                      className="snap-center h-64	flex-shrink-0 rounded-md overflow-hidden max-w-56 block"
                      onClick={handleCloseModal}
                    >
                      <img
                        alt={media.title}
                        className="object-contain h-full"
                        src={`${IMAGE_BASE_URL}${media.poster_path}`}
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
