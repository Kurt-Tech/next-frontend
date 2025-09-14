import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Service = { title: string; description: string; icon?: React.ReactNode }

export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">Our Services</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Card key={i} className="hover:shadow transition">
              <CardHeader>
                {s.icon && <div className="mb-2 text-primary">{s.icon}</div>}
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-6">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
