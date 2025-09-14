import React from 'react'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'

export type Block =
  | ({ __typename: 'Hero' } & {
      heading?: string
      subheading?: string
      ctaText?: string
      ctaLink?: string
    })
  | ({ __typename: 'Features' } & {
      items?: Array<{ title?: string; description?: string }>
    })
  | ({ __typename: 'Testimonials' } & {
      quotes?: Array<{ name?: string; quote?: string; role?: string }>
    })

export default function Renderer({ layout }: { layout: Block[] }) {
  if (!Array.isArray(layout)) return null

  return (
    <>
      {layout.map((block, i) => {
        switch (block.__typename) {
          case 'Hero': {
            const title = block.heading
            if (typeof title !== 'string' || !title) return null
            return (
              <Hero
                key={i}
                title={title}
                subtitle={block.subheading}
                ctaText={block.ctaText}
                ctaHref={block.ctaLink}
              />
            )
          }
          case 'Features': {
            type FeaturesBlock = Extract<Block, { __typename: 'Features' }>
            const b = block as FeaturesBlock
            const services = (b.items ?? []).map((it: { title?: string; description?: string }) => ({
              title: it?.title ?? '',
              description: it?.description ?? '',
            }))
            return <Services key={i} services={services} />
          }
          case 'Testimonials': {
            type TestimonialsBlock = Extract<Block, { __typename: 'Testimonials' }>
            const b = block as TestimonialsBlock
            const quotes = (b.quotes ?? []).map((q: { name?: string; quote?: string; role?: string }) => ({
              name: q?.name ?? '',
              quote: q?.quote ?? '',
              role: q?.role,
            }))
            return <Testimonials key={i} quotes={quotes} />
          }
          default:
            return null
        }
      })}
    </>
  )
}
