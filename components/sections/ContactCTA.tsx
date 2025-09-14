import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ContactCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold">Ready to schedule an appointment?</h2>
        <p className="mt-3 text-foreground/70">
          We offer same-day visits and telehealth. Our care team is here to help.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild>
            <a href="tel:+15551234567">Call (555) 123-4567</a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
        <p className="mt-3 text-xs text-foreground/60">In case of emergency, call 911.</p>
      </div>
    </section>
  )
}
