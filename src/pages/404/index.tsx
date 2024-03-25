import { Layout } from '@components/Layout'
import { MainState } from '@src/context'
import { lang } from '@src/fakeI18n/main'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export function NotFound() {
  const context = useContext(MainState)
  if (!context) return undefined
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="flex flex-col place-items-center h-full pt-10 gap-y-6">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXppYjJobGgxbXAyeGtpZGVsdGJpenl2aTM1ZGdrbHA5eTJtMjNtNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/m12EDnP8xGLy8/giphy.gif"
            alt="not found gif"
          />
          <Link
            className="bg-[#735CDD] md:hover:bg-[#6146D8] md:transition-colors md:ease-in-out md:duration-200 font-bold py-2 px-4 rounded-md"
            to="/"
          >
            {lang[context.state.lang].goBack}
          </Link>
        </div>
      </div>
    </Layout>
  )
}
