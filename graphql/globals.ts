import { gql } from '@apollo/client'

export const HEADER_QUERY = gql`
  query Header($draft: Boolean) {
    Header(draft: $draft) {
      logo { url alt }
      navLinks { label href external }
    }
  }
`

export const FOOTER_QUERY = gql`
  query Footer($draft: Boolean) {
    Footer(draft: $draft) {
      links { label href external }
      copyright
    }
  }
`

export const THEME_QUERY = gql`
  query Theme($draft: Boolean) {
    Theme(draft: $draft) {
      brand { primaryHex accentHex }
      radius
    }
  }
`
