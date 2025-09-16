import React from 'react'
import HeroSection from '@/components/layout/HeroSection'
import FeatureGrid from '@/components/layout/FeatureGrid'
import TestimonialSlider from '@/components/layout/TestimonialSlider'
import CalloutSection from '@/components/layout/CalloutSection'
import FAQSection from '@/components/layout/FAQSection'

export type Block =
  | ({ __typename: 'Hero' } & {
      slides?: Array<{
        badge?: string | null
        heading?: string | null
        subheading?: string | null
        ctaText?: string | null
        ctaLink?: string | null
        secondaryCtaText?: string | null
        secondaryCtaLink?: string | null
        image?: {
          url?: string | null
          alt?: string | null
        } | null
      } | null>
    })
  | ({ __typename: 'Features' } & {
      heading?: string | null
      items?: Array<{
        title?: string | null
        description?: string | null
        image?: {
          url?: string | null
          alt?: string | null
        } | null
      } | null>
    })
  | ({ __typename: 'Testimonials' } & {
      heading?: string | null
      quotes?: Array<{
        name?: string | null
        role?: string | null
        quote?: string | null
        avatar?: {
          url?: string | null
          alt?: string | null
        } | null
      } | null>
    })
  | ({ __typename: 'Callout' } & {
      calloutHeading: string
      content?: string | null
      ctaText?: string | null
      ctaLink?: string | null
      image?: {
        url?: string | null
        alt?: string | null
      } | null
    })
  | ({ __typename: 'Faq' } & {
      faqHeading?: string | null
      faqItems?: Array<{
        question?: string | null
        answer?: string | null
      } | null>
    })

export default function Renderer({ layout }: { layout: Block[] }) {
  if (!Array.isArray(layout)) return null

  const content: React.ReactNode[] = []

  for (let i = 0; i < layout.length; i++) {
    const block = layout[i]
    switch (block.__typename) {
      case 'Hero': {
        const heroBlock = block as Extract<Block, { __typename: 'Hero' }>
        const slides = (heroBlock.slides ?? [])
          .map((slide) => {
            const title = slide?.heading?.trim() ?? ''
            if (!title) return null
            return {
              title,
              subtitle: slide?.subheading ?? undefined,
              ctaText: slide?.ctaText ?? undefined,
              ctaHref: slide?.ctaLink ?? undefined,
              badge: slide?.badge ?? undefined,
              secondaryCtaText: slide?.secondaryCtaText ?? undefined,
              secondaryCtaHref: slide?.secondaryCtaLink ?? undefined,
              image: slide?.image?.url
                ? { url: slide.image.url, alt: slide.image.alt ?? undefined }
                : undefined,
            }
          })
          .filter((slide): slide is NonNullable<typeof slide> => Boolean(slide))

        if (!slides.length) break
        content.push(<HeroSection key={`hero-${i}`} slides={slides} />)
        break
      }
      case 'Features': {
        type FeaturesBlock = Extract<Block, { __typename: 'Features' }>
        const b = block as FeaturesBlock
        const heading = b.heading ?? undefined
        const items = (b.items ?? [])
          .map((item) => {
            const title = item?.title?.trim() ?? ''
            if (!title) return null
            return {
              title,
              description: item?.description ?? undefined,
              image: item?.image?.url
                ? { url: item.image.url, alt: item.image.alt ?? undefined }
                : undefined,
            }
          })
          .filter((item): item is NonNullable<typeof item> => Boolean(item))

        if (!items.length) break
        content.push(<FeatureGrid key={`features-${i}`} heading={heading ?? undefined} items={items} />)
        break
      }
      case 'Testimonials': {
        type TestimonialsBlock = Extract<Block, { __typename: 'Testimonials' }>
        const b = block as TestimonialsBlock
        const heading = b.heading ?? undefined
        const quotes = (b.quotes ?? [])
          .map((quote) => {
            const name = quote?.name?.trim() ?? ''
            const testimony = quote?.quote?.trim() ?? ''
            if (!name || !testimony) return null
            return {
              name,
              quote: testimony,
              role: quote?.role ?? undefined,
              avatar: quote?.avatar?.url
                ? { url: quote.avatar.url, alt: quote.avatar.alt ?? undefined }
                : undefined,
            }
          })
          .filter((quote): quote is NonNullable<typeof quote> => Boolean(quote))

        if (!quotes.length) break
        content.push(<TestimonialSlider key={`testimonials-${i}`} heading={heading ?? undefined} quotes={quotes} />)
        break
      }
      case 'Callout': {
        const b = block as Extract<Block, { __typename: 'Callout' }>
        const heading = b.calloutHeading
        if (!heading) break
        content.push(
          <CalloutSection
            key={`callout-${i}`}
            heading={heading}
            content={b.content ?? undefined}
            ctaText={b.ctaText ?? undefined}
            ctaLink={b.ctaLink ?? undefined}
            image={b.image?.url ? { url: b.image.url, alt: b.image.alt ?? undefined } : undefined}
          />
        )
        break
      }
      case 'Faq': {
        const b = block as Extract<Block, { __typename: 'Faq' }>
        const items = (b.faqItems ?? [])
          .map((item) => {
            const question = item?.question?.trim() ?? ''
            const answer = item?.answer?.trim() ?? ''
            if (!question || !answer) return null
            return { question, answer }
          })
          .filter((item): item is NonNullable<typeof item> => Boolean(item))

        if (!items.length) break
        content.push(<FAQSection key={`faq-${i}`} heading={b.faqHeading ?? undefined} items={items} />)
        break
      }
      default:
        break
    }
  }

  return <>{content}</>
}
