"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useThemeBrand } from '@/components/providers/ThemeProvider'

const NAV_ITEMS: Array<{ label: string; href: string }> = [
  { label: 'Insights', href: '/insights' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
]

const CTA = { label: 'Request A Quote', href: '/quote' }
const FALLBACK_LOGO = 'https://mjlddpfohlirpfta.public.blob.vercel-storage.com/media/Apex%20Medical%20Group%20Logo.png'

export default function Header({ draft = false }: { draft?: boolean }) {
  void draft
  const { logo } = useThemeBrand()
  const logoSrc = logo?.url ?? FALLBACK_LOGO
  const logoAlt = logo?.alt || 'Apex Medical Group'

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-0 sm:px-6">
        <Link href="/" className="relative flex h-14 w-40 items-center md:w-48" aria-label={logoAlt}>
          <Image src={logoSrc} alt={logoAlt} fill priority sizes="(max-width: 768px) 180px, 220px" className="object-contain" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/80 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex">
            <Link href={CTA.href}>{CTA.label}</Link>
          </Button>
          <MobileMenu logoSrc={logoSrc} logoAlt={logoAlt} />
        </div>
      </div>
    </header>
  )
}

type MobileMenuProps = {
  logoSrc: string
  logoAlt: string
}

function MobileMenu({ logoSrc, logoAlt }: MobileMenuProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-72 max-w-full flex-col gap-8 bg-background px-6 pb-8 pt-6 shadow-2xl md:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="relative flex h-10 w-32 items-center" aria-label={logoAlt}>
              <Image src={logoSrc} alt={logoAlt} fill sizes="160px" className="object-contain" />
            </Link>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close navigation">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="flex flex-1 flex-col gap-4 text-base font-medium text-foreground/90">
            {NAV_ITEMS.map((item) => (
              <Dialog.Close asChild key={item.href}>
                <Link href={item.href} className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                  {item.label}
                </Link>
              </Dialog.Close>
            ))}
          </div>

          <Dialog.Close asChild>
            <Button asChild size="lg">
              <Link href={CTA.href}>{CTA.label}</Link>
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

