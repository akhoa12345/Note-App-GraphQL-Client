import { useEffect, useState } from 'react'
import { Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { IconButton, Tooltip } from '@mui/material'
import NoteAddOutlined from '@mui/icons-material/NoteAddOutlined'


function NoteList() {
  const { folder } = useLoaderData()
  const { noteId, folderId } = useParams()
  const [activeNoteId, setActiveNoteId] = useState(noteId)
  const submit = useSubmit()
  const navigate = useNavigate()

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId)
      return
    }

    if (folder?.notes?.[0]) {
      navigate(`notes/${folder.notes[0].id}`)
    }
  }, [noteId, folder.notes])

  const handleAddNewNote = () => {
    submit(
      {
        content: '',
        folderId: folderId
      },
      { method: 'POST', action: `/folders/${folderId}` }
    )
  }

  return (
    <Grid container height='100%'>
      <Grid
        item
        xs={4}
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: '#f0ebe3',
          height: '100%',
          overflow: 'auto',
          padding: '10px',
          textAlign: 'left'
        }}>
        <List
          subheader={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Notes</Typography>
              <Tooltip title='Add Note' onClick={handleAddNewNote}>
                <IconButton size='small'>
                  <NoteAddOutlined/>
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {folder?.notes?.map(({ id, content }) => {
            return (
              <Link
                key={id}
                to={`notes/${id}`}
                style={{ textDecoration: 'none' }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card sx={{ mb: '5px', backgroundColor: id === activeNoteId ? 'rgb(255 211 140)' : null }}>
                  <CardContent sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}>
                    <div
                      style={{ fontSize: '14px', fontWeight: 'bold' }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || 'Empty'}`
                      }}
                    />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default NoteList
