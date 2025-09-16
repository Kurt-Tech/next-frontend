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
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {footer?.copyright || `© ${year} Apex Medical Group`}
        </p>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-foreground/80">
          {(footer?.links ?? []).map((l, i: number) =>
            l?.external ? (
              <a
                key={i}
                href={l.href}
                className="rounded px-2 py-1 hover:text-foreground transition-colors hover:underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={i}
                href={l.href || '#'}
                className="rounded px-2 py-1 hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </footer>
  )
}

