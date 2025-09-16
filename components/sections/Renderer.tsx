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
      featuresItems?: Array<{ title?: string; description?: string; image?: { url?: string; alt?: string } }>
    })
  | ({ __typename: 'Testimonials' } & {
      quotes?: Array<{ name?: string; quote?: string; role?: string }>
    })
  | ({ __typename: 'Callout' } & {
      calloutHeading: string
      content?: string
      ctaText?: string
      ctaLink?: string
      image?: { url?: string; alt?: string }
    })
  | ({ __typename: 'Faq' } & {
      faqHeading?: string
      faqItems?: Array<{ question?: string; answer?: string }>
    })

export default function Renderer({ layout }: { layout: Block[] }) {
  if (!Array.isArray(layout)) return null

  const content: React.ReactNode[] = []

  for (let i = 0; i < layout.length; i++) {
    const block = layout[i]
    switch (block.__typename) {
      case 'Hero': {
        // Group consecutive Hero blocks into a single slider
        const slides = [] as Array<{
          title: string
          subtitle?: string
          ctaText?: string
          ctaHref?: string
          image?: { url?: string; alt?: string }
        }>
        let j = i
        while (j < layout.length && layout[j]?.__typename === 'Hero') {
          const b = layout[j] as Extract<Block, { __typename: 'Hero' }>
          if (b.heading) {
            slides.push({
              title: b.heading,
              subtitle: b.subheading,
              ctaText: b.ctaText,
              ctaHref: b.ctaLink,
              image: b.image,
            })
          }
          j++
        }
        // Move outer loop index
        i = j - 1

        if (slides.length === 0) break
        content.push(<Hero key={`heroslider-${i}`} slides={slides} />)
        break
      }
          case 'Features': {
            type FeaturesBlock = Extract<Block, { __typename: 'Features' }>
            const b = block as FeaturesBlock
            const services = (b.featuresItems ?? []).map(
              (it: { title?: string; description?: string; image?: { url?: string; alt?: string } }) => ({
                title: it?.title ?? '',
                description: it?.description ?? '',
                image: it?.image,
              })
            )
            content.push(<Services key={`features-${i}`} services={services} />)
            break
          }
          case 'Testimonials': {
            type TestimonialsBlock = Extract<Block, { __typename: 'Testimonials' }>
            const b = block as TestimonialsBlock
            const quotes = (b.quotes ?? []).map((q: { name?: string; quote?: string; role?: string }) => ({
              name: q?.name ?? '',
              quote: q?.quote ?? '',
              role: q?.role,
            }))
            content.push(<Testimonials key={`testimonials-${i}`} quotes={quotes} />)
            break
          }
          case 'Callout': {
            const b = block as Extract<Block, { __typename: 'Callout' }>
            if (!b.calloutHeading) return null
            content.push(
              <Callout
                key={`callout-${i}`}
                heading={b.calloutHeading}
                content={b.content}
                ctaText={b.ctaText}
                ctaLink={b.ctaLink}
                image={b.image}
              />
            )
            break
          }
          case 'Faq': {
            const b = block as Extract<Block, { __typename: 'Faq' }>
            const items = (b.faqItems ?? []).map((it) => ({
              question: it?.question ?? '',
              answer: it?.answer ?? '',
            }))
            content.push(<FAQ key={`faq-${i}`} heading={b.faqHeading} items={items} />)
            break
          }
          default:
            break
    }
  }

  return <>{content}</>
}
