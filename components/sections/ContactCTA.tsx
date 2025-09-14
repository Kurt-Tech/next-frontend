import React from 'react'
import Link from 'next/link'

export default function ContactCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold">Ready to schedule an appointment?</h2>
        <p className="mt-3 text-foreground/70">
          We offer same-day visits and telehealth. Our care team is here to help.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="tel:+15551234567" className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-white shadow hover:bg-blue-700">
            Call (555) 123-4567
          </a>
          <Link href="/contact" className="inline-flex items-center rounded-lg border px-5 py-3 hover:bg-foreground/5">
            Contact Us
          </Link>
        </div>
        <p className="mt-3 text-xs text-foreground/60">In case of emergency, call 911.</p>
      </div>
    </section>
  )
}
