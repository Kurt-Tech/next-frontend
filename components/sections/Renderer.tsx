import React from 'react'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Callout from '@/components/sections/Callout'
import FAQ from '@/components/sections/FAQ'

export type Block =
  | ({ __typename: 'Hero' } & {
      heading?: string
      subheading?: string
      ctaText?: string
      ctaLink?: string
      image?: { url?: string; alt?: string }
    })
  | ({ __typename: 'Features' } & {
      items?: Array<{ title?: string; description?: string; image?: { url?: string; alt?: string } }>
    })
  | ({ __typename: 'Testimonials' } & {
      quotes?: Array<{ name?: string; quote?: string; role?: string }>
    })
  | ({ __typename: 'Callout' } & {
      heading: string
      content?: string
      ctaText?: string
      ctaLink?: string
      image?: { url?: string; alt?: string }
    })
  | ({ __typename: 'Faq' } & {
      heading?: string
      items?: Array<{ question?: string; answer?: string }>
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
            const services = (b.items ?? []).map(
              (it: { title?: string; description?: string; image?: { url?: string; alt?: string } }) => ({
                title: it?.title ?? '',
                description: it?.description ?? '',
                image: it?.image,
              })
            )
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
          case 'Callout': {
            const b = block as Extract<Block, { __typename: 'Callout' }>
            if (!b.heading) return null
            return (
              <Callout
                key={i}
                heading={b.heading}
                content={b.content}
                ctaText={b.ctaText}
                ctaLink={b.ctaLink}
                image={b.image}
              />
            )
          }
          case 'Faq': {
            const b = block as Extract<Block, { __typename: 'Faq' }>
            const items = (b.items ?? []).map((it) => ({
              question: it?.question ?? '',
              answer: it?.answer ?? '',
            }))
            return <FAQ key={i} heading={b.heading} items={items} />
          }
          default:
            return null
        }
      })}
    </>
  )
}
