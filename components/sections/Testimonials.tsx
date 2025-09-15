import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'

type Quote = { name: string; role?: string; quote: string; avatar?: { url?: string; alt?: string } }

export default function Testimonials({ quotes }: { quotes: Quote[] }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">What Our Patients Say</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <blockquote className="text-sm leading-6 text-muted-foreground">“{q.quote}”</blockquote>
              </CardContent>
              <CardFooter className="text-sm font-medium gap-3 items-center">
                {q.avatar?.url ? (
                  <Image src={q.avatar.url} alt={q.avatar.alt || ''} width={28} height={28} className="rounded-full" />
                ) : null}
                <span>
                  {q.name}
                  {q.role ? <span className="text-muted-foreground"> · {q.role}</span> : null}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
