import { Layout } from '@components/Layout'
import { MainState } from '@src/context'
import { lang } from '@src/fakeI18n/main'
import { useContext } from 'react'

export function Error() {
  const context = useContext(MainState)
  if (!context) return undefined

  const handleReload = () => location.reload()

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center pt-40 gap-y-4">
        <p className="text-4xl font-bold">
          {lang[context.state.lang].sorry} :(
        </p>
        <button
          onClick={handleReload}
          className="bg-[#735CDD] md:hover:bg-[#6146D8] md:transition-colors md:ease-in-out md:duration-200 font-bold py-2 px-4 rounded-md"
        >
          {lang[context.state.lang].goBack}
        </button>
      </div>
    </Layout>
  )
}
