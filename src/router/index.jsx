import { Outlet, createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Login'
import Home from '../pages/Home'
import ErrorPage from '../pages/ErrorPage'
import NoteList from '../components/NoteList'
import Note from '../components/Note'
import AuthProvider from '../context/AuthProvider'
import ProtectedRoute from './ProtectedRoute'
import { notesLoader, noteLoader, addNewNote, updateNote } from '../utils/noteUtils'
import { foldersUtils } from '../utils/folderUtils'

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
            loader: foldersUtils,
            children: [
              {
                path: 'folders/:folderId',
                element: <NoteList />,
                action: addNewNote,
                loader: notesLoader,
                children: [
                  {
                    path: 'notes/:noteId',
                    element: <Note/>,
                    action: updateNote,
                    loader: noteLoader
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
