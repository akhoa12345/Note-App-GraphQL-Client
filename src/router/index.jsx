import { Outlet, createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Login'
import Home from '../pages/Home'
import ErrorPage from '../pages/ErrorPage'
import AuthProvider from '../context/AuthProvider'
import ProtectedRoute from './ProtectedRoute'

const AuthLayout = () => {
  return <AuthProvider>
    <Outlet />
  </AuthProvider>
}

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Home />
          }
        ]
      }
    ]
  }
])

export default router
