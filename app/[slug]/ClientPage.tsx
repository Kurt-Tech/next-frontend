"use client"
import React from 'react'
import { useQuery } from '@apollo/client/react'
import type { Block } from '@/components/sections/Renderer'
import { PAGE_QUERY } from '@/graphql/pageQuery'
import Renderer from '@/components/sections/Renderer'

type PageQueryResult = {
  Pages?: { docs?: { title?: string; layout?: Block[] }[] }
}

export default function ClientPage({ slug, draft = false }: { slug: string; draft?: boolean }) {
  const { data, loading, error } = useQuery<PageQueryResult>(PAGE_QUERY, { variables: { slug, draft } })

  if (loading) return <div style={{ padding: '1rem' }}>Loading…</div>
  if (error) return <div style={{ padding: '1rem', color: 'crimson' }}>Error: {error.message}</div>

  const page = data?.Pages?.docs?.[0]
  if (!page) return <div style={{ padding: '1rem' }}>Not found</div>

  return (
    <div className="font-sans">
      {page.title ? <h1 className="sr-only">{page.title}</h1> : null}
      <Renderer layout={page.layout || []} />
    </div>
  )
}


