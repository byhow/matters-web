import { DataProxy } from 'apollo-cache'

import {
  ArticleAvailableTranslationsQuery,
  ArticleDetailPublicQuery,
  UserLanguage,
} from '~/gql/graphql'

export const updateArticlePublic = ({
  cache,
  shortHash,
  routerLang,
  type,
}: {
  cache: DataProxy
  shortHash: string
  routerLang: UserLanguage
  type:
    | 'deleteComment'
    | 'addComment'
    | 'addSecondaryComment'
    | 'deleteSecondaryComment'
}) => {
  // FIXME: circular dependencies
  const {
    ARTICLE_DETAIL_PUBLIC,
    ARTICLE_AVAILABLE_TRANSLATIONS,
  } = require('~/views/ArticleDetail/gql.ts')

  try {
    const translationResult =
      cache.readQuery<ArticleAvailableTranslationsQuery>({
        query: ARTICLE_AVAILABLE_TRANSLATIONS,
        variables: { shortHash },
      })

    if (!translationResult) {
      return
    }

    const includeTranslation =
      !!routerLang &&
      (translationResult?.article?.availableTranslations || []).includes(
        routerLang
      )

    const detailQueryVariables = {
      shortHash,
      language: routerLang || UserLanguage.ZhHant,
      includeTranslation,
    }
    const data = cache.readQuery<ArticleDetailPublicQuery>({
      query: ARTICLE_DETAIL_PUBLIC,
      variables: detailQueryVariables,
    })

    if (data?.article?.__typename !== 'Article') {
      return
    }
    let commentCount = data.article.commentCount
    let totalCount = data.article.comments.totalCount
    switch (type) {
      case 'addComment':
        totalCount += 1
        commentCount += 1
        break
      case 'deleteComment':
        totalCount -= 1
        commentCount -= 1
        break
      case 'addSecondaryComment':
        commentCount += 1
        break
      case 'deleteSecondaryComment':
        commentCount -= 1
        break
    }

    cache.writeQuery({
      query: ARTICLE_DETAIL_PUBLIC,
      variables: detailQueryVariables,
      data: {
        article: {
          ...data.article,
          commentCount: commentCount,
          comments: {
            ...data.article.comments,
            totalCount: totalCount,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}