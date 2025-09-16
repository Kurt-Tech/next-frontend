"use client"
import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'

export type Quote = { name: string; role?: string; quote: string; avatar?: { url?: string; alt?: string } }

export default function TestimonialSlider({ quotes }: { quotes: Quote[] }) {
  if (!quotes?.length) return null
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">What Our Patients Say</h2>
        <div className="mt-8">
          <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 5000 }} spaceBetween={16} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
            {quotes.map((q, i) => (
              <SwiperSlide key={i}>
                <Card>
                  <CardContent className="pt-6">
                    <blockquote className="text-sm leading-6 text-muted-foreground">“{q.quote}”</blockquote>
                  </CardContent>
                  <CardFooter className="text-sm font-medium gap-3 items-center">
                    {q.avatar?.url ? (
                      <Image src={q.avatar.url} alt={q.avatar.alt || ''} width={28} height={28} className="rounded-full" />
                    ) : null}
                    <span>
                      {q.name}
                      {q.role ? <span className="text-muted-foreground"> ・ {q.role}</span> : null}
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

