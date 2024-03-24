import { Navbar } from '@components/Navbar'
import { Sidebar } from '@components/Sidebar'
import { PropsWithChildren } from 'react'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-lvh">
      <Navbar />
      <div className="w-full h-[94%] flex">
        <Sidebar />
        <div className="w-full md:w-4/5">{children}</div>
      </div>
    </div>
  )
}
