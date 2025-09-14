import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import fetch from 'cross-fetch'

export function createApolloClient() {
  const uri = process.env.NEXT_PUBLIC_PAYLOAD_GRAPHQL_URL || 'http://localhost:3000/api/graphql'

  return new ApolloClient({
    link: new HttpLink({
      uri,
      fetch,
      // If you need auth cookies, uncomment the next line and configure CORS on the API
      // fetchOptions: { credentials: 'include' },
    }),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  })
}

