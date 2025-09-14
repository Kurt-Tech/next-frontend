import React from 'react'

type Service = { title: string; description: string; icon?: React.ReactNode }

export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">Our Services</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-foreground/10 bg-white/60 dark:bg-white/5 p-6 shadow-sm hover:shadow transition"
            >
              {s.icon && <div className="mb-4 text-blue-600">{s.icon}</div>}
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-foreground/70 text-sm leading-6">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

