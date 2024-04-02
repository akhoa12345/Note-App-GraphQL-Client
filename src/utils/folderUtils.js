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
