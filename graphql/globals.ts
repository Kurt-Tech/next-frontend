import { gql } from '@apollo/client'

export const HEADER_QUERY = gql`
  query Header($draft: Boolean) {
    Header(draft: $draft) {
      logo { url alt }
      navLinks { label href external }
    }
  }
`
export const THEME_QUERY = gql`
  query Theme($draft: Boolean) {
    Theme(draft: $draft) {
      brand {
        primaryHex
        accentHex
        logo { url alt }
      }
      radius
    }
  }
`

