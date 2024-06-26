import { useEffect, useMemo, useState } from 'react'
import { useLoaderData, useLocation, useSubmit } from 'react-router-dom'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { debounce } from '@mui/material'

function Note() {
  const { note } = useLoaderData()
  const submit = useSubmit()
  const location = useLocation()
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  )
  const [rawHTML, setRawHTML] = useState(note?.content)

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note?.content)
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
    setEditorState(EditorState.createWithContent(state))
  }, [note?.id])

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname)
  }, [rawHTML, location.pathname])

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) return

      submit(
        {
          ...note,
          content: rawHTML
        },
        {
          method: 'post',
          action: pathname
        }
      )
    }, 1000)
  }, [])

  useEffect(() => {
    setRawHTML(note?.content)
  }, [note?.content])

  const handleOnChange = (e) => {
    setEditorState(e)
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())))
  }

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder='Write something!'
    />
  )
}

export default Note
