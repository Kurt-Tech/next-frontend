import { gql } from '@apollo/client'

export const PAGE_QUERY = gql`
  query Page($slug: String!) {
    Pages(where: { slug: { equals: $slug } }) {
      docs {
        title
        layout {
          __typename
          ... on Hero {
            heading
            subheading
            ctaText
            ctaLink
          }
          ... on Features {
            items { title description }
          }
          ... on Testimonials {
            quotes { name quote }
          }
        }
      }
    }
  }
`
