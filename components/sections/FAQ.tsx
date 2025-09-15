import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

type FAQItem = { question: string; answer: string }

export default function FAQ({ heading, items }: { heading?: string; items: FAQItem[] }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {heading && <h2 className="text-2xl sm:text-3xl font-semibold">{heading}</h2>}
        <div className="mt-8 grid gap-4">
          {items.map((it, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <h3 className="font-medium">{it.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">{it.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

