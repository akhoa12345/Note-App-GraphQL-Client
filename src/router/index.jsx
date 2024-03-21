import { Outlet, createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Login'
import Home from '../pages/Home'

const AuthLayout = () => {
  return <Outlet />
}

const router = createBrowserRouter([
  {
    element: <AuthLayout/>,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])

export default router
