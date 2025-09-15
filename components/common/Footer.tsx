"use client"
import React from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client/react'
import { FOOTER_QUERY } from '@/graphql/globals'

type FooterQueryResult = {
  Footer?: {
    links?: Array<{ label?: string; href?: string; external?: boolean }>
    copyright?: string
  }
}

export default function Footer({ draft = false }: { draft?: boolean }) {
  const { data } = useQuery<FooterQueryResult>(FOOTER_QUERY, { variables: { draft } })
  const footer = data?.Footer
  return (
    <footer className="border-t mt-10">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground/60">
          {footer?.copyright || `© ${new Date().getFullYear()} Apex Medical Group`}
        </p>
        <nav className="flex gap-4 text-sm">
          {(footer?.links ?? []).map((l, i: number) =>
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
    </footer>
  )
}
