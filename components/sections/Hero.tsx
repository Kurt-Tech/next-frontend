import React from 'react'
import Link from 'next/link'

type Props = {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
}

export default function Hero({ title, subtitle, ctaText, ctaHref }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-background">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto text-pretty">
            {subtitle}
          </p>
        )}
        {ctaText && ctaHref && (
          <div className="mt-10">
            {ctaHref.startsWith('/') ? (
              <Link
                href={ctaHref}
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-white shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {ctaText}
              </Link>
            ) : (
              <a
                href={ctaHref}
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-white shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {ctaText}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
