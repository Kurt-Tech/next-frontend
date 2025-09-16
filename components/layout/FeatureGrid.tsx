import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'

type FeatureGridProps = {
  heading?: string
  items: FeatureItem[]
}

export type FeatureItem = {
  title: string
  description?: string
  image?: { url?: string; alt?: string }
}

export default function FeatureGrid({ heading, items }: FeatureGridProps) {
  const providedHeading = heading ?? undefined
  const sectionHeading = providedHeading === undefined ? 'Our Features' : providedHeading.trim()
  const visibleItems = items.filter((item) => Boolean(item.title))

  if (!visibleItems.length) return null

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {sectionHeading ? <h2 className="text-2xl sm:text-3xl font-semibold">{sectionHeading}</h2> : null}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((it, i) => (
            <Card key={i} className="transition hover:shadow">
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
                {it.description ? <p className="text-sm leading-6 text-muted-foreground">{it.description}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
