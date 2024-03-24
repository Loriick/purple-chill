import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Favorites } from '@pages/Favorites'
import { Detail, detailLoader } from '@pages/Detail'
import { Home } from '@pages/Home'

import './index.css'
import { Search } from '@pages/Search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <Search />,
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
