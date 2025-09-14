import React from 'react'

type Quote = { name: string; role?: string; quote: string }

export default function Testimonials({ quotes }: { quotes: Quote[] }) {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-blue-50/40 dark:from-background dark:to-blue-950/20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">What Our Patients Say</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <figure key={i} className="rounded-xl border border-foreground/10 p-6 bg-white/60 dark:bg-white/5">
              <blockquote className="text-sm leading-6 text-foreground/80">“{q.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium">
                {q.name}
                {q.role ? <span className="text-foreground/60"> · {q.role}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

