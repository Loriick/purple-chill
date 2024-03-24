import { NavLink } from 'react-router-dom'
import { lang } from '@src/fakeI18n/main'
import { FaHome, FaStar } from 'react-icons/fa'
import { useContext } from 'react'
import { MainState } from '@src/context'

export function Sidebar() {
  const context = useContext(MainState)

  if (!context) return undefined

  return (
    <div className="hidden px-4 md:block md:w-1/5">
      <nav className="w-full h-full">
        <ul className="w-full h-full flex flex-col gap-y-2">
          <li className="w-full p-2 items-center rounded-md md:transition-colors md:ease-in-out md:duration-200 md:hover:bg-[#735CDD] md:hover:text-white">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full text-[#735CDD] font-semibold md:hover:text-current'
                  : 'flex w-full'
              }
              to="/"
            >
              <FaHome className="pr-2 text-2xl" />
              {lang[context.state.lang].home}
            </NavLink>
          </li>

          <li className="w-full p-2 items-center rounded-md md:transition-colors md:ease-in-out md:duration-200 md:hover:bg-[#735CDD] md:hover:text-white">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full text-[#735CDD] font-semibold'
                  : 'flex w-full'
              }
              to="/favorites"
            >
              <FaStar className="pr-2 text-2xl" />
              {lang[context.state.lang].favorites}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
