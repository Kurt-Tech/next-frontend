"use client"
import React from 'react'
import { ApolloProvider as Provider } from '@apollo/client/react'
import { createApolloClient } from '@/lib/apollo'

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  const client = createApolloClient()
  return <Provider client={client}>{children}</Provider>
}
