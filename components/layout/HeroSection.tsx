"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const FALLBACK_BADGE = 'Trusted Care'
const FALLBACK_SECONDARY_TEXT = 'Meet Our Providers'
const FALLBACK_SECONDARY_LINK = '/providers'

type SlideImage = { url?: string; alt?: string }

export type HeroSlide = {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  badge?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  image?: SlideImage
}

export default function HeroSection({ slides }: { slides: HeroSlide[] }) {
  const filteredSlides = slides?.filter((slide) => Boolean(slide?.title)) ?? []
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 6500)
    return () => clearInterval(autoplay)
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!filteredSlides.length) return null

  return (
    <section className="relative isolate overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {filteredSlides.map((slide, index) => {
            const showPrimary = Boolean(slide.ctaText?.trim() && slide.ctaHref?.trim())
            const primaryHref = slide.ctaHref?.trim() ?? ''
            const primaryLabel = slide.ctaText?.trim() ?? ''

            const hasBadgeOverride = slide.badge !== undefined
            const badgeLabel = (hasBadgeOverride ? slide.badge ?? '' : FALLBACK_BADGE).trim()
            const showBadge = hasBadgeOverride ? Boolean(badgeLabel) : Boolean(FALLBACK_BADGE)

            const hasSecondaryOverride = slide.secondaryCtaText !== undefined || slide.secondaryCtaHref !== undefined
            const secondaryLabel = (hasSecondaryOverride ? slide.secondaryCtaText ?? '' : FALLBACK_SECONDARY_TEXT).trim()
            const secondaryHref = (hasSecondaryOverride ? slide.secondaryCtaHref ?? '' : FALLBACK_SECONDARY_LINK).trim()
            const showSecondary = hasSecondaryOverride ? Boolean(secondaryLabel && secondaryHref) : true

            const backgroundImage = slide.image?.url ? {
              url: slide.image.url,
              alt: slide.image.alt ?? '',
            } : undefined

            return (
              <article key={index} className="relative min-w-0 shrink-0 grow-0 basis-full">
                <div className="relative flex h-[65vh] min-h-[420px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-white to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                  {backgroundImage ? (
                    <Image
                      src={backgroundImage.url}
                      alt={backgroundImage.alt}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-cover object-center brightness-95"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/75 to-background/30" />
                  <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 pt-0 md:px-10 md:pt-6 lg:px-12">
                    <div className="max-w-3xl text-balance text-center text-white drop-shadow md:text-left">
                      {showBadge && (
                        <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/90 shadow-sm">
                          {badgeLabel}
                        </span>
                      )}
                      <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>
                      {slide.subtitle ? (
                        <p className="mt-4 text-base text-foreground/80 sm:text-lg">
                          {slide.subtitle}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                      {showPrimary ? (
                        <Button asChild size="lg">
                          {primaryHref.startsWith('/') ? (
                            <Link href={primaryHref}>{primaryLabel}</Link>
                          ) : (
                            <a href={primaryHref} target="_blank" rel="noreferrer">
                              {primaryLabel}
                            </a>
                          )}
                        </Button>
                      ) : null}
                      {showSecondary ? (
                        <Button
                          variant="ghost"
                          size="lg"
                          asChild
                          className="bg-white/50 text-foreground shadow-sm backdrop-blur-md hover:bg-white/70"
                        >
                          {secondaryHref.startsWith('/') ? (
                            <Link href={secondaryHref}>{secondaryLabel}</Link>
                          ) : (
                            <a href={secondaryHref} target="_blank" rel="noreferrer">
                              {secondaryLabel}
                            </a>
                          )}
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-background/70 shadow-lg backdrop-blur md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-background/70 shadow-lg backdrop-blur md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              'h-2.5 w-8 rounded-full border border-white/40 bg-white/30 transition-all',
              index === selectedIndex && 'w-12 bg-primary shadow-md'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

