import { Link } from 'react-router-dom'
import { lang } from '../../fakeI18n/main'
import { FaTv, FaVideo, FaHome, FaStar } from 'react-icons/fa'

const defaultLang = 'fr'

export function Sidebar() {
  return (
    <div className="hidden px-4 md:block md:w-1/5">
      <nav className="w-full h-full">
        <ul className="w-full h-full flex flex-col gap-y-2">
          <li className="w-full p-2 items-center rounded-md md:transition-colors md:ease-in-out md:duration-200 md:hover:bg-[#735CDD]">
            <Link className="flex w-full" to="/">
              <FaHome className="pr-2 text-2xl" />
              {lang[defaultLang].home}
            </Link>
          </li>

          <li className="w-full p-2 items-center rounded-md md:transition-colors md:ease-in-out md:duration-200 md:hover:bg-[#735CDD]">
            <Link className="flex w-full" to="/movies">
              <FaVideo className="pr-2 text-2xl" />
              {lang[defaultLang].movies}
            </Link>
          </li>

          <li className="w-full p-2 items-center rounded-md md:transition-colors md:ease-in-out md:duration-200 md:hover:bg-[#735CDD]">
            <Link className="flex w-full" to="/series">
              <FaTv className="pr-2 text-2xl" />
              {lang[defaultLang].series}
            </Link>
          </li>

          <li className="w-full p-2 items-center rounded-md md:transition-colors md:ease-in-out md:duration-200 md:hover:bg-[#735CDD]">
            <Link className="flex w-full" to="/favorites">
              <FaStar className="pr-2 text-2xl" />
              {lang[defaultLang].favorites}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
