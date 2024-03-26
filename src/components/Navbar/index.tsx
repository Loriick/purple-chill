import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MainState } from '@src/context'
import { SET_LANGUAGE, TOGGLE_MODAL } from '@src/context/action'
import { lang } from '@src/fakeI18n/main'
import { Lang } from '@src/utils/types'

export function Navbar() {
  const context = useContext(MainState)

  if (!context) return undefined

  const { state, dispatch } = context

  const setLanguage = (lang: Lang) => {
    dispatch({
      type: SET_LANGUAGE,
      payload: lang,
    })
  }

  const setOpenModal = () => {
    dispatch({
      type: TOGGLE_MODAL,
      payload: !state.isModalOpen,
    })
  }
  return (
    <header className="h-[6%] px-6 flex items-center">
      <Link
        to="/"
        className="mr-auto text-[#735CDD] font-extrabold text-xl uppercase"
      >
        Purple chill
      </Link>
      <div className="mr-10 flex gap-x-2">
        <span
          className={`cursor-pointer ${state.lang === 'en' ? 'font-semibold text-[#735CDD]' : ''}`}
          onClick={() => setLanguage('en')}
        >
          EN
        </span>
        <span>|</span>
        <span
          className={`cursor-pointer ${state.lang === 'fr' ? 'font-semibold text-[#735CDD]' : ''}`}
          onClick={() => setLanguage('fr')}
        >
          FR
        </span>
      </div>
      <div onClick={setOpenModal} className="flex">
        <input
          type="text"
          className="text-[#343434] text-sm rounded-md focus:ring-[#6146D8] focus:border-[#6146D8] block w-full p-2.5 mr-4"
          placeholder="Barbie"
        />
        <button
          type="submit"
          className="hidden md:block bg-[#735CDD] md:hover:bg-[#6146D8] md:transition-colors md:ease-in-out md:duration-200 font-bold py-2 text-center rounded-md w-48"
        >
          {lang[state.lang].search}
        </button>
      </div>
    </header>
  )
}
