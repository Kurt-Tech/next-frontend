export function hexToHslString(hex?: string): string | undefined {
  if (!hex) return undefined
  let c = hex.trim().replace('#', '')
  if (c.length === 3) c = c.split('').map((x) => x + x).join('')
  if (!/^([0-9a-fA-F]{6})$/.test(c)) return undefined
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  const hh = Math.round(h * 360)
  const ss = Math.round(s * 100)
  const ll = Math.round(l * 100)
  return `${hh} ${ss}% ${ll}%`
}
