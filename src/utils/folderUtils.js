import { graphQLRequest } from './request'

export const foldersUtils = async () => {
  const query = `query ExampleQuery {
      folders {
        id
        name
        createdAt
        author {
          id
          name
        }
      }
    }
    `

  const data = await graphQLRequest({ query })
  return data
}
