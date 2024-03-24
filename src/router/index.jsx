import { Outlet, createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Login'
import Home from '../pages/Home'
import ErrorPage from '../pages/ErrorPage'
import NoteList from '../components/NoteList'
import Note from '../components/Note'
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
            element: <Home />,
            loader: async () => {
              const query = `query ExampleQuery {
                folders {
                  id
                  name
                  createdAt
                  author {
                    id
                    name
                  }
                }
              }
              `
              const res = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  query
                })
              })

              const { data } = await res.json()
              return data
            },
            children: [
              {
                path: 'folders/:folderId',
                element: <NoteList />,
                children: [
                  {
                    path: 'notes/:noteId',
                    element: <Note/>
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
])

export default router
