"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useThemeBrand } from '@/components/providers/ThemeProvider'

const FALLBACK_LOGO = '/logo.png'

const NAV_GROUPS: Array<{ heading: string; links: Array<{ label: string; href: string }> }> = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Insights', href: '/insights' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Primary Care', href: '/services/primary-care' },
      { label: 'Specialty Clinics', href: '/services/specialty-clinics' },
      { label: 'Urgent Care', href: '/services/urgent-care' },
    ],
  },
]

const CONTACT_LINKS: Array<{ label: string; value: string; href: string }> = [
  { label: 'Phone', value: '(202) 555-0147', href: 'tel:+12025550147' },
  { label: 'Email', value: 'hello@apexmedical.lc', href: 'mailto:hello@apexmedical.lc' },
  { label: 'Visit', value: '912 Health Ave, Washington, DC', href: 'https://maps.google.com/?q=912+Health+Ave,+Washington,+DC' },
]

const SOCIAL_LINKS: Array<{ icon: React.ReactNode; href: string; label: string }> = [
  { icon: <Facebook className="h-4 w-4" />, href: 'https://facebook.com', label: 'Facebook' },
  { icon: <Instagram className="h-4 w-4" />, href: 'https://instagram.com', label: 'Instagram' },
  { icon: <Linkedin className="h-4 w-4" />, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Footer({ draft = false }: { draft?: boolean }) {
  void draft
  const { logo } = useThemeBrand()
  const logoSrc = logo?.url ?? FALLBACK_LOGO
  const logoAlt = logo?.alt || 'Apex Medical Group'
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 rounded-2xl bg-primary/10 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold text-primary">Need care fast?</p>
            <h2 className="mt-1 text-2xl font-bold text-foreground">Schedule your appointment today.</h2>
          </div>
          <Button asChild size="lg" className="min-w-[12rem]">
            <Link href="/book">Book an Appointment</Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="relative flex h-12 w-40 items-center" aria-label={logoAlt}>
              <Image src={logoSrc} alt={logoAlt} fill sizes="(max-width: 768px) 160px, 200px" className="object-contain" />
            </Link>
            <p className="text-sm leading-6 text-muted-foreground">
              Apex Medical Group brings coordinated, compassionate care to families across the DMV. From preventive visits to specialized treatment plans, we keep wellness close to home.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground/70 transition hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {NAV_GROUPS.map((group) => (
            <div key={group.heading} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">{group.heading}</h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link className="transition hover:text-foreground" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">Stay Connected</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              {CONTACT_LINKS.map((item) => (
                <li key={item.label}>
                  <a className="block transition hover:text-foreground" href={item.href}>
                    <span className="block text-xs font-semibold text-foreground/60">{item.label}</span>
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild variant="ghost" size="sm" className="gap-2 justify-start px-0 text-primary">
              <Link href="mailto:hello@apexmedical.lc">
                <Mail className="h-4 w-4" />
                Join our newsletter
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 bg-muted/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Apex Medical Group. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link className="transition hover:text-foreground" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="transition hover:text-foreground" href="/terms">
              Terms of Service
            </Link>
            <Link className="transition hover:text-foreground" href="/hipaa">
              HIPAA Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


