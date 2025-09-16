"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export type HeroSlide = {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  image?: { url?: string; alt?: string }
}

export default function Hero({ slides, auto = true, interval = 6000 }: { slides: HeroSlide[]; auto?: boolean; interval?: number }) {
  const [index, setIndex] = React.useState(0)
  const count = slides.length

  const go = React.useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + count) % count)
    },
    [count]
  )

  React.useEffect(() => {
    if (!auto || count <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearInterval(id)
  }, [auto, count, interval])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-background" onKeyDown={onKeyDown} aria-roledescription="carousel" aria-label="Hero">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
            {slides.map((s, i) => (
              <div key={i} className="min-w-full grid items-center gap-8 sm:grid-cols-2">
                <div className="text-center sm:text-left">
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">{s.title}</h1>
                  {s.subtitle && (
                    <p className="mt-4 text-base sm:text-lg text-foreground/70 max-w-xl mx-auto sm:mx-0 text-pretty">{s.subtitle}</p>
                  )}
                  {s.ctaText && s.ctaHref && (
                    <div className="mt-8 flex justify-center sm:justify-start">
                      <Button asChild>
                        {s.ctaHref.startsWith('/') ? <Link href={s.ctaHref}>{s.ctaText}</Link> : <a href={s.ctaHref}>{s.ctaText}</a>}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg hidden sm:block">
                  {s.image?.url ? (
                    <Image
                      src={s.image.url}
                      alt={s.image.alt || ''}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      priority={i === index}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {count > 1 ? (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() => go(-1)}
                  className="pointer-events-auto m-2 rounded-full bg-background/70 p-2 shadow-sm ring-1 ring-border backdrop-blur hover:bg-background"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M15.78 3.97a.75.75 0 01-.02 1.06L9.31 11.5l6.45 6.47a.75.75 0 01-1.06 1.06l-6.98-7a.75.75 0 010-1.06l6.98-7a.75.75 0 011.08 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() => go(1)}
                  className="pointer-events-auto m-2 rounded-full bg-background/70 p-2 shadow-sm ring-1 ring-border backdrop-blur hover:bg-background"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M8.22 20.03a.75.75 0 01.02-1.06l6.45-6.47-6.45-6.47A.75.75 0 019.28 4.97l6.98 7a.75.75 0 010 1.06l-6.98 7a.75.75 0 01-1.08 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition-colors ${i === index ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}
