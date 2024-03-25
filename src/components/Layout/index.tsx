import { SearchModal } from '@components/Modal'
import { Navbar } from '@components/Navbar'
import { Sidebar } from '@components/Sidebar'
import { MainState } from '@src/context'
import { PropsWithChildren, useContext } from 'react'

export function Layout({ children }: PropsWithChildren) {
  const context = useContext(MainState)
  if (!context) return undefined

  return (
    <div className="h-lvh relative">
      <Navbar />
      <div className="w-full h-[94%] flex">
        <Sidebar />
        <div className="w-full md:w-4/5">{children}</div>
      </div>
      {context.state.isModalOpen ? <SearchModal /> : null}
    </div>
  )
}
