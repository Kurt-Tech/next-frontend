"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@apollo/client/react'
import { HEADER_QUERY } from '@/graphql/globals'

type HeaderQueryResult = {
  Header?: {
    logo?: { url?: string; alt?: string }
    navLinks?: Array<{ label?: string; href?: string; external?: boolean }>
  }
}

export default function Header({ draft = false }: { draft?: boolean }) {
  const { data } = useQuery<HeaderQueryResult>(HEADER_QUERY, { variables: { draft } })
  const header = data?.Header
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          {header?.logo?.url ? (
            <Image src={header.logo.url} alt={header.logo.alt || ''} width={28} height={28} className="rounded" />
          ) : null}
          <span>Apex Medical Group</span>
        </Link>
        <nav className="flex gap-4 text-sm">
          {(header?.navLinks ?? []).map((l, i: number) =>
            l?.external ? (
              <a key={i} href={l.href} className="hover:underline" target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ) : (
              <Link key={i} href={l.href || '#'} className="hover:underline">
                {l.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  )
}
