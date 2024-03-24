import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Movies } from '@pages/Movies'
import { Series } from '@pages/Series'
import { Favorites } from '@pages/Favorites'
import { Detail, detailLoader } from '@pages/Detail'
import { Home } from '@pages/Home'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
    path: '/:type/:id',
    loader: detailLoader,
    element: <Detail />,
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
