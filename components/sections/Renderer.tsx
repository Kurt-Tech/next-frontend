import React from 'react'
import HeroSection from '@/components/layout/HeroSection'
import FeatureGrid from '@/components/layout/FeatureGrid'
import TestimonialSlider from '@/components/layout/TestimonialSlider'
import CalloutSection from '@/components/layout/CalloutSection'
import FAQSection from '@/components/layout/FAQSection'

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
      quotes?: Array<{ name?: string; quote?: string; role?: string; avatar?: { url?: string; alt?: string } }>
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
        content.push(<HeroSection key={`hero-${i}`} slides={slides} />)
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
            content.push(<FeatureGrid key={`features-${i}`} items={services} />)
            break
          }
          case 'Testimonials': {
            type TestimonialsBlock = Extract<Block, { __typename: 'Testimonials' }>
            const b = block as TestimonialsBlock
            const quotes = (b.quotes ?? []).map((q: { name?: string; quote?: string; role?: string; avatar?: { url?: string; alt?: string } }) => ({
              name: q?.name ?? '',
              quote: q?.quote ?? '',
              role: q?.role,
              avatar: (q as any)?.avatar,
            }))
            content.push(<TestimonialSlider key={`testimonials-${i}`} quotes={quotes} />)
            break
          }
          case 'Callout': {
            const b = block as Extract<Block, { __typename: 'Callout' }>
            if (!b.calloutHeading) return null
            content.push(
              <CalloutSection
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
            content.push(<FAQSection key={`faq-${i}`} heading={b.faqHeading} items={items} />)
            break
          }
          default:
            break
    }
  }

  return <>{content}</>
}
