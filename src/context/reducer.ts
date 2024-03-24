import { Movie, Lang } from '@src/utils/types'
import { Action, State } from '.'
import { ADD_TO_FAVORITES, REMOVE_TO_FAVORITES, SET_LANGUAGE } from './action'

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        lang: action.payload as Lang,
      }
    case ADD_TO_FAVORITES:
      return {
        ...state,
        idFavoritesList: [
          ...state.idFavoritesList,
          action.payload as Movie['id'],
        ],
      }
    case REMOVE_TO_FAVORITES:
      // eslint-disable-next-line no-case-declarations
      const index = state.idFavoritesList.findIndex(
        (id) => id === action.payload,
      )

      return {
        ...state,
        idFavoritesList: state.idFavoritesList.splice(index, 1),
      }
    default:
      return state
  }
}
