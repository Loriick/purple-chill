import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Favorites } from '@pages/Favorites'
import { Detail, detailLoader } from '@pages/Detail'
import { Home } from '@pages/Home'
import { StateProvider } from './context'
import { NotFound } from '@pages/404'
import { ToastContainer } from 'react-toastify'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
  {
    path: '*',
    element: <NotFound />,
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </StateProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
