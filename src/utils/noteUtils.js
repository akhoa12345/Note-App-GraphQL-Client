import { graphQLRequest } from './request'

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String) {
        folder(folderId: $folderId) {
        id
        name
        createdAt
        author {
            uid
            name
        }
        notes {
            id
            content
        }
        }
    }
    `

  const data = await graphQLRequest({
    query,
    variables: {
      folderId: folderId
    }
  })
  return data
}

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
    note(noteId: $noteId) {
      id
      content
    }
  }`

  const data = await graphQLRequest({
    query,
    variables: {
      noteId: noteId
    }
  })
  return data
}
