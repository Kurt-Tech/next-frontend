import { gql } from '@apollo/client'

export const PAGE_QUERY = gql`
  query Page($slug: String!, $draft: Boolean) {
    Pages(draft: $draft, where: { slug: { equals: $slug } }) {
      docs {
        title
        layout {
          __typename
          ... on Hero {
            slides {
              badge
              heading
              subheading
              ctaText
              ctaLink
              secondaryCtaText
              secondaryCtaLink
              image { url alt }
            }
          }
          ... on Features {
            heading
            items { title description image { url alt } }
          }
          ... on Testimonials {
            heading
            quotes { name role quote avatar { url alt } }
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
