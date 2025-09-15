"use client"
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import { THEME_QUERY } from '@/graphql/globals'
import { hexToHslString } from '@/lib/color'

type ThemeResult = {
  Theme?: { brand?: { primaryHex?: string; accentHex?: string }; radius?: 'none' | 'sm' | 'md' | 'lg' }
}

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

  return <>{children}</>
}
