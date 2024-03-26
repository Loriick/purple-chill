import { Media, Lang } from '@src/utils/types'
import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react'
import { reducer } from './reducer'

export type State = {
  lang: Lang
  idFavoritesList: Media['id'][]
  isModalOpen: boolean
}
export type Action = {
  type: string
  payload: Lang | Media['id'] | boolean
}

type Context = {
  state: State
  dispatch: Dispatch<Action>
}

const INITIAL_STATE: State = {
  lang: navigator.language.includes('fr') ? 'fr' : 'en',
  idFavoritesList: [],
  isModalOpen: false,
}

export const MainState = createContext<Context | null>(null)

export function StateProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <MainState.Provider value={{ state, dispatch }}>
      {children}
    </MainState.Provider>
  )
}
