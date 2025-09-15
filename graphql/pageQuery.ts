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
            featuresItems: items { title description image { url alt } }
          }
          ... on Testimonials {
            quotes { name quote avatar { url alt } }
          }
          ... on Callout {
            calloutHeading: heading
            content
            ctaText
            ctaLink
            image { url alt }
          }
          ... on Faq {
            faqHeading: heading
            faqItems: items { question answer }
          }
        }
      }
    }
  }
`
