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
        favoritesList: [...state.favoritesList, action.payload as Movie],
      }
    case REMOVE_TO_FAVORITES:
      return {
        ...state,
        favoritesList: state.favoritesList.filter(
          (movie) => movie.id !== (action.payload as Movie['id']),
        ),
      }
    default:
      return state
  }
}
