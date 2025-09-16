"use client"
import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'

export type Quote = { name: string; role?: string; quote: string; avatar?: { url?: string; alt?: string } }

type Props = {
  heading?: string
  quotes: Quote[]
}

export default function TestimonialSlider({ heading, quotes }: Props) {
  const sectionHeading = heading === undefined ? 'What Our Patients Say' : heading?.trim()
  const visibleQuotes = quotes.filter((quote) => Boolean(quote.name && quote.quote))

  if (!visibleQuotes.length) return null

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {sectionHeading ? <h2 className="text-2xl font-semibold sm:text-3xl">{sectionHeading}</h2> : null}
        <div className="mt-8">
          <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 5000 }} spaceBetween={16} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
            {visibleQuotes.map((q, i) => (
              <SwiperSlide key={i}>
                <Card>
                  <CardContent className="pt-6">
                    <blockquote className="text-sm leading-6 text-muted-foreground">&ldquo;{q.quote}&rdquo;</blockquote>
                  </CardContent>
                  <CardFooter className="items-center gap-3 text-sm font-medium">
                    {q.avatar?.url ? (
                      <Image src={q.avatar.url} alt={q.avatar.alt || ''} width={28} height={28} className="rounded-full" />
                    ) : null}
                    <span>
                      {q.name}
                      {q.role ? <span className="text-muted-foreground"> - {q.role}</span> : null}
                    </span>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
