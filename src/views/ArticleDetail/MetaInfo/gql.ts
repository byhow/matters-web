import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment MetaInfoArticle on Article {
      id
      access {
        type
      }
      language
      slug
      mediaHash
      revisedAt
      createdAt
      author {
        id
        userName
      }
    }
  `,
  articleVersion: gql`
    fragment MetaInfoArticleVersion on ArticleVersion {
      id
      createdAt
    }
  `,
}
