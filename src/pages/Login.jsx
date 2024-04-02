import { useContext } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { AuthContext } from '../context/AuthProvider'
import { graphQLRequest } from '../utils/request'

function Login() {
  const auth = getAuth()
  /**
   * Chỗ này bị issue vì sử dụng hook useNavigate() ở bên ngoài useEffect
   * nên trường hợp không sử dụng useEffect thì nên sử dụng component Navigate thay vì sử dụng hook useNavigate()
   */
  // const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    const { user: { uid, displayName } } = await signInWithPopup(auth, provider)

    const { data } = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
        register(uid: $uid, name: $name) {
          uid
          name
        }
      }`,
      variables: {
        uid,
        name: displayName
      }
    })
    console.log('register: ', data)
  }

  if (localStorage.getItem('accessToken')) {
    // navigate('/')
    return <Navigate to='/' />
  }

  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: '10px' }}>Welcome to Note App</Typography>
      <Button variant='outlined' onClick={handleLoginWithGoogle}>Login with Google</Button>
    </>
  )
}

export default Login
