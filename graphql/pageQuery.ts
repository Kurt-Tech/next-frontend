import { gql } from '@apollo/client'

export const PAGE_QUERY = gql`
  query Page($slug: String!, $draft: Boolean) {
    Pages(draft: $draft, where: { slug: { equals: $slug } }) {
      docs {
        title
        layout {
          __typename
          ... on Hero {
            heading
            subheading
            ctaText
            ctaLink
            image { url alt }
          }
          ... on Features {
            items { title description image { url alt } }
          }
          ... on Testimonials {
            quotes { name quote avatar { url alt } }
          }
          ... on Callout {
            heading
            content
            ctaText
            ctaLink
            image { url alt }
          }
          ... on Faq {
            heading
            items { question answer }
          }
        }
      }
    }
  }
`
