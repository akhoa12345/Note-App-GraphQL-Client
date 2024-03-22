import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Login() {
  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: '10px' }}>Welcome to Note App</Typography>
      <Button variant='outlined'>Login with Google</Button>
    </>
  )
}

export default Login
