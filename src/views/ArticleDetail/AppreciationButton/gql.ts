import gql from 'graphql-tag'

export const fragments = {
  article: {
    public: gql`
      fragment AppreciationButtonArticlePublic on Article {
        id
        shortHash
        author {
          id
        }
        likesReceivedTotal: appreciationsReceivedTotal
        appreciateLimit
      }
    `,
    private: gql`
      fragment AppreciationButtonArticlePrivate on Article {
        id
        hasAppreciate
        appreciateLeft
        canSuperLike @include(if: $includeCanSuperLike)
        author {
          id
          isBlocking
        }
      }
    `,
  },
}

export const APPRECIATE_ARTICLE = gql`
  mutation AppreciateArticle(
    $id: ID!
    $amount: amount_Int_NotNull_min_1!
    $token: String!
    $superLike: Boolean
  ) {
    appreciateArticle(
      input: { id: $id, amount: $amount, token: $token, superLike: $superLike }
    ) {
      id
      canSuperLike
    }
  }
`
