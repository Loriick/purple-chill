import { useContext, useEffect, useState } from 'react'
import { MainState } from '@src/context'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { lang } from '@src/fakeI18n/main'
import { ADD_TO_FAVORITES, REMOVE_TO_FAVORITES } from '@src/context/action'
import { useLocation } from 'react-router-dom'

export function Favorite({ id }: { id: number }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const context = useContext(MainState)
  const { pathname } = useLocation()

  useEffect(() => {
    if (context)
      setIsFavorite(
        context.state.idFavoritesList.some((movieId) => movieId === id),
      )
  }, [id, context])

  if (!context) return undefined

  const toggleToFavorites = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    event.preventDefault()
    context.dispatch({
      type: isFavorite ? REMOVE_TO_FAVORITES : ADD_TO_FAVORITES,
      payload: id,
    })

    setIsFavorite((previousValue) => !previousValue)
  }

  return (
    <div className="flex gap-x-2 items-center">
      <div className="cursor-pointer" onClick={toggleToFavorites}>
        {isFavorite ? (
          <FaHeart className="text-red-500 text-3xl" />
        ) : (
          <FaRegHeart className="text-3xl" />
        )}
      </div>

      {pathname.includes('/movie/') || pathname.includes('/serie/') ? (
        <p>
          {isFavorite ? lang['en'].inYourFavorites : lang['en'].addInFavorites}
        </p>
      ) : null}
    </div>
  )
}
