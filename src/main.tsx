import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './pages/App.tsx'
import './index.css'
import { Movies } from '@pages/Movies'
import { Series } from '@pages/Series'
import { Favorites } from '@pages/Favorites'
import { Detail } from '@pages/Detail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/movies',
    element: <Movies />,
  },
  {
    path: '/series',
    element: <Series />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '/movie/:movieId',
    element: <Detail />,
  },
  {
    path: '/serie/:showId',
    element: <Detail />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
