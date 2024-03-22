import { useContext } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { AuthContext } from '../context/AuthProvider'

function Login() {
  const auth = getAuth()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    const result = await signInWithPopup(auth, provider)
    console.log('result', result)
  }

  if (user?.uid) {
    navigate('/')
    return
  }

  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: '10px' }}>Welcome to Note App</Typography>
      <Button variant='outlined' onClick={handleLoginWithGoogle}>Login with Google</Button>
    </>
  )
}

export default Login
