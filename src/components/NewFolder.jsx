import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CreateNewFolderOutlined from '@mui/icons-material/CreateNewFolderOutlined'

import { addNewFolder } from '../utils/folderUtils'

function NewFolder() {
  const [newFolderName, setNewFolderName] = useState()
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const popupName = searchParams.get('popup')

  const handleOpenPopup = () => {
    // setOpen(true)
    setSearchParams({ popup: 'add-folder' })
  }
  const handleClose = () => {
    // setOpen(false)
    setNewFolderName('')
    navigate(-1)
  }
  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value)
  }
  const handleAddNewFolder = async () => {
    const data = await addNewFolder({ name: newFolderName })

    handleClose()
  }

  useEffect(() => {
    if (popupName === 'add-folder') {
      setOpen(true)
      return
    }

    setOpen(false)
  }, [popupName])

  return (
    <>
      <Tooltip title='Add Folder' onClick={handleOpenPopup}>
        <IconButton>
          <CreateNewFolderOutlined sx={{ color: 'white' }}/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size='small'
            variant="standard"
            sx={{ width: '400px' }}
            autoComplete='off'
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewFolder
