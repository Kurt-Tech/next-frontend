import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
              <Button asChild>
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
            ) : (
              <Button asChild>
                <a href={ctaHref}>{ctaText}</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
