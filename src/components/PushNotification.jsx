import { useEffect, useState } from 'react'
import { createClient } from 'graphql-ws'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from '../utils/constants'

const client = createClient({
  url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
  options: {
    // shouldRetry: true
  }
})

const query = `subscription PushNotification {
  notification {
    message
  }
}`

function PushNotification() {
  const [invisible, setInvisible] = useState(true)
  const [notification, setNotification] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    if (notification) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    // setNotification('')
    setInvisible(true)
  }

  useEffect(() => {
    // subscription
    (async () => {
      const onNext = (data) => {
        setInvisible(false)

        const message = data?.data?.notification?.message
        setNotification(message)
        console.log('PUSH_NOTIFICATION:', { data })
      }

      await new Promise((resolve, reject) => {
        client.subscribe(
          {
            query: query
          },
          {
            next: onNext,
            error: reject,
            complete: resolve
          }
        )
      })
    })()

  }, [])

  return (
    <>
      <Badge color='secondary' variant='dot' invisible={invisible} onClick={handleClick}>
        <NotificationsIcon />
      </Badge>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>{notification}</MenuItem>
      </Menu>
    </>
  )
}

export default PushNotification
