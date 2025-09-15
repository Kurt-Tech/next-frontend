import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

type Props = {
  heading: string
  content?: string
  ctaText?: string
  ctaLink?: string
  image?: { url?: string; alt?: string }
}

export default function Callout({ heading, content, ctaText, ctaLink, image }: Props) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Card>
          <CardContent className="p-6 grid gap-6 sm:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-semibold">{heading}</h2>
              {content && <p className="mt-3 text-muted-foreground">{content}</p>}
              {ctaText && ctaLink && (
                <div className="mt-6">
                  <Button asChild>
                    {ctaLink.startsWith('/') ? (
                      <Link href={ctaLink}>{ctaText}</Link>
                    ) : (
                      <a href={ctaLink}>{ctaText}</a>
                    )}
                  </Button>
                </div>
              )}
            </div>
            {image?.url ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image src={image.url} alt={image.alt || ''} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

