import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import ContactCTA from '@/components/sections/ContactCTA'
import Link from 'next/link'

export const metadata = {
  title: 'Apex Medical Group | Comprehensive Primary Care in Your Community',
  description:
    'Apex Medical Group provides comprehensive primary care, telehealth, urgent care, and specialty services. Compassionate, coordinated care for the whole family.',
}

export default function Home() {
  return (
    <div className="font-sans">
      <Hero
        title="Apex Medical Group"
        subtitle="Compassionate, coordinated care for the whole family - in person and online. Same-day visits available."
        ctaText="Book an Appointment"
        ctaHref="/contact"
      />

      <Services
        services={[
          {
            title: 'Primary Care',
            description: 'Preventive care, annual exams, chronic disease management, and wellness plans.',
          },
          {
            title: 'Pediatrics',
            description: 'Newborn care, immunizations, school physicals, and adolescent health.',
          },
          {
            title: 'Cardiology',
            description: 'Screenings, diagnostics, and ongoing management for heart conditions.',
          },
          {
            title: 'Telehealth',
            description: 'Video visits for follow-ups, minor illnesses, and medication management.',
          },
          {
            title: 'Lab Services',
            description: 'On-site bloodwork and routine testing for faster results.',
          },
          {
            title: 'Urgent Care',
            description: 'Walk-in care for minor injuries and illnesses. No appointment required.',
          },
        ]}
      />

      <Testimonials
        quotes={[
          {
            name: 'Samantha R.',
            role: 'Patient',
            quote: 'The team at Apex is caring and thorough. Scheduling was easy and the visit was on time.',
          },
          {
            name: 'Michael T.',
            role: 'Patient',
            quote: 'Telehealth made follow-ups quick and convenient. Highly recommend their providers!',
          },
          {
            name: 'Priya K.',
            role: 'Patient',
            quote: 'Beautiful facility and friendly staff. I felt heard and supported throughout my appointment.',
          },
        ]}
      />

      <ContactCTA />

      <footer className="border-t mt-10">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">© {new Date().getFullYear()} Apex Medical Group</p>
          <nav className="flex gap-4 text-sm">
            <Link className="hover:underline" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:underline" href="/terms">
              Terms
            </Link>
            <Link className="hover:underline" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
