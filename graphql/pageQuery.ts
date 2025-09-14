import { gql } from '@apollo/client'

export const PAGE_QUERY = gql`
  query Page($slug: String!) {
    Pages(where: { slug: { equals: $slug } }) {
      docs {
        title
        layout {
          blockType
          ... on Hero { heading subheading ctaText ctaLink }
          ... on Features { heading items { title description } }
          ... on Testimonials { heading quotes { name quote } }
        }
      }
    }
  }
`

