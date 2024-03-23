import { useContext, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { AuthContext } from '../context/AuthProvider'

function UserMenu() {
  const { user: { displayName, photoURL, auth } } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    auth.signOut()
  }


  return (
    <>
      <Box sx={{ display: 'flex' }} onClick={handleClick}>
        <Typography>{displayName}</Typography>
        <Avatar alt="avatar" src={photoURL} sx={{ width: 24, height: 24, marginLeft: '5px' }} />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
