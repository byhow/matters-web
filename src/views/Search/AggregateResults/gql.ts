import gql from 'graphql-tag'

import { ArticleDigestConcise, TagDigest, UserDigest } from '~/components'

export const SEARCH_AGGREGATE_ARTICLES_PUBLIC = gql`
  query SearchAggregateArticlesPublic($key: String!, $after: String) {
    search(input: { type: Article, first: 30, key: $key, after: $after }) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Article {
            ...ArticleDigestConciseArticle
          }
        }
      }
    }
  }
  ${ArticleDigestConcise.fragments.article}
`

export const SEARCH_AGGREGATE_TAGS_PUBLIC = gql`
  query SearchAggregateTagsPublic($key: String!, $after: String) {
    search(
      input: {
        type: Tag
        version: v20221212
        first: 30
        key: $key
        after: $after
      }
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Tag {
            ...TagDigestConciseTag
          }
        }
      }
    }
  }
  ${TagDigest.Concise.fragments.tag}
`

export const SEARCH_AGGREGATE_USERS_PUBLIC = gql`
  query SearchAggregateUsersPublic($key: String!, $after: String) {
    search(
      input: {
        type: User
        version: v20221212
        first: 30
        key: $key
        after: $after
      }
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestConciseUser
          }
        }
      }
    }
  }
  ${UserDigest.Concise.fragments.user}
`
