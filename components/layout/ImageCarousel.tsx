"use client"
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

export type CarouselImage = { url: string; alt?: string }

export default function ImageCarousel({ images, options }: { images: CarouselImage[]; options?: Parameters<typeof useEmblaCarousel>[0] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selected, setSelected] = useState(0)
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  if (!images?.length) return null

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div className="relative min-w-0 shrink-0 grow-0 basis-full" key={i}>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image src={img.url} alt={img.alt || ''} fill sizes="100vw" className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={`h-2 w-2 rounded-full ${i === selected ? 'bg-primary' : 'bg-muted-foreground/30'}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}




