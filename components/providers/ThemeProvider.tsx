"use client"
import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/client/react'
import { THEME_QUERY } from '@/graphql/globals'
import { hexToHslString } from '@/lib/color'

type ThemeResult = {
  Theme?: {
    brand?: { primaryHex?: string; accentHex?: string; logo?: { url?: string; alt?: string } | null }
    radius?: 'none' | 'sm' | 'md' | 'lg'
  }
}

type ThemeContextValue = {
  logo?: { url: string; alt?: string } | null
}

const ThemeContext = createContext<ThemeContextValue>({})

export default function ThemeProvider({ draft = false, children }: { draft?: boolean; children: React.ReactNode }) {
  const { data } = useQuery<ThemeResult>(THEME_QUERY, { variables: { draft } })

  useEffect(() => {
    const t = data?.Theme
    if (!t) return
    const root = document.documentElement
    const primary = hexToHslString(t.brand?.primaryHex)
    if (primary) root.style.setProperty('--primary', primary)
    const accent = hexToHslString(t.brand?.accentHex)
    if (accent) root.style.setProperty('--accent', accent)
    type Radius = 'none' | 'sm' | 'md' | 'lg'
    const radiusMap: Record<Radius, string> = {
      none: '0rem',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
    }
    if (t.radius) root.style.setProperty('--radius', radiusMap[t.radius])
  }, [data])

  const value = useMemo<ThemeContextValue>(() => {
    const logo = data?.Theme?.brand?.logo
    if (!logo?.url) return {}
    return { logo: { url: logo.url, alt: logo.alt ?? undefined } }
  }, [data])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeBrand() {
  return useContext(ThemeContext)
}
