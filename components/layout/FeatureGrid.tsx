import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'

export type FeatureItem = {
  title: string
  description?: string
  image?: { url?: string; alt?: string }
}

export default function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">Our Features</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Card key={i} className="hover:shadow transition">
              <CardHeader>
                <div className="mb-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <CardTitle>{it.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {it.image?.url ? (
                  <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-md">
                    <Image src={it.image.url} alt={it.image.alt || ''} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                  </div>
                ) : null}
                {it.description ? <p className="text-sm text-muted-foreground leading-6">{it.description}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

