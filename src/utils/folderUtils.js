import { graphQLRequest } from './request'

export const foldersUtils = async () => {
  const query = `query ExampleQuery {
      folders {
        id
        name
        createdAt
        author {
          uid
          name
        }
      }
    }
    `

  const data = await graphQLRequest({ query })
  return data
}

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`

  const data = await graphQLRequest({
    query,
    variables: { name: newFolder.name }
  })
  return data
}
