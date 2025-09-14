import React from 'react'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'

export type Block = {
  blockType: string
  heading?: string
  subheading?: string
  ctaText?: string
  ctaLink?: string
  items?: Array<{ title?: string; description?: string }>
  quotes?: Array<{ name?: string; quote?: string; role?: string }>
  [key: string]: unknown
}

export default function Renderer({ layout }: { layout: Block[] }) {
  if (!Array.isArray(layout)) return null

  return (
    <>
      {layout.map((block, i) => {
        switch (block.blockType) {
          case 'hero': {
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
          case 'features': {
            const services = Array.isArray(block.items)
              ? block.items.map((it) => ({ title: it?.title ?? '', description: it?.description ?? '' }))
              : []
            return <Services key={i} services={services} />
          }
          case 'testimonials': {
            const quotes = Array.isArray(block.quotes)
              ? block.quotes.map((q) => ({ name: q?.name ?? '', quote: q?.quote ?? '', role: q?.role }))
              : []
            return <Testimonials key={i} quotes={quotes} />
          }
          default:
            return null
        }
      })}
    </>
  )
}
