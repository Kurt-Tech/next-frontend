"use client"
import React from 'react'
import { useQuery } from '@apollo/client/react'
import type { Block } from '@/components/sections/Renderer'
import { PAGE_QUERY } from '@/graphql/pageQuery'
import Renderer from '@/components/sections/Renderer'

type PageQueryResult = {
  Pages?: { docs?: { title?: string; layout?: Block[] }[] }
}

export default function ClientPage({ slug }: { slug: string }) {
  const { data, loading, error } = useQuery<PageQueryResult>(PAGE_QUERY, { variables: { slug } })

  if (loading) return <div style={{ padding: '1rem' }}>Loading…</div>
  if (error) return <div style={{ padding: '1rem', color: 'crimson' }}>Error: {error.message}</div>

  const page = data?.Pages?.docs?.[0]
  if (!page) return <div style={{ padding: '1rem' }}>Not found</div>

  return (
    <div className="font-sans">
      {page.title && (
        <div className="mx-auto max-w-6xl px-6 pt-8">
          <h1 className="sr-only">{page.title}</h1>
        </div>
      )}
      <Renderer layout={page.layout || []} />
    </div>
  )
}
