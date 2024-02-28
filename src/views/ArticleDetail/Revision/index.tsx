import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import { toGlobalId, toPath } from '~/common/utils'
import {
  BackToHomeButton,
  EmptyLayout,
  Error,
  Head,
  Layout,
  Media,
  QueryError,
  Spinner,
  Throw404,
  Title,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import {
  ArticleAccessType,
  ArticleLatestVersionByNodeIdQuery,
  ArticleLatestVersionQuery,
  ArticleRevisionDetailPublicQuery,
} from '~/gql/graphql'

import Content from '../Content'
import CustomizedSummary from '../CustomizedSummary'
import License from '../License'
// import MetaInfo from '../MetaInfo'
import Placeholder from '../Placeholder'
import StickyTopBanner from '../StickyTopBanner'
import styles from '../styles.module.css'
import {
  ARTICLE_LATEST_VERSION,
  ARTICLE_LATEST_VERSION_BY_NODE_ID,
  ARTICLE_REVISION_DETAIL_PRIVATE,
  ARTICLE_REVISION_DETAIL_PUBLIC,
  ARTICLE_REVISION_DETAIL_PUBLIC_BY_NODE_ID,
} from './gql'
import InfoHeader from './InfoHeader'
import Versions from './Versions'

const DynamicCircleWall = dynamic(() => import('../Wall/Circle'), {
  ssr: true, // enable for first screen
  loading: () => <Spinner />,
})

const DynamicSensitiveWall = dynamic(() => import('../Wall/Sensitive'), {
  ssr: true, // enable for first screen
  loading: () => <Spinner />,
})

const isMediaHashPossiblyValid = (mediaHash?: string | null) => {
  // is there a better way to detect valid?
  // a valid mediaHash, should have length 49 or 59 chars
  // 'zdpuAsCXC87Tm1fFvAbysV7HVt7J8aV6chaTKeJZ5ryLALK3Z'
  // 'bafyreief6bryqsa4byabnmx222jvo4khlodvpypw27af43frecbumn6ocq'

  return (
    mediaHash &&
    ((mediaHash?.length === 49 && mediaHash.startsWith('zdpu')) ||
      (mediaHash?.length === 59 && mediaHash.startsWith('bafy')))
  )
}

const BaseArticleDetailRevision = ({
  article,
  version,
}: {
  article: NonNullable<ArticleRevisionDetailPublicQuery['article']>
  version: NonNullable<ArticleRevisionDetailPublicQuery['version']>
}) => {
  const viewer = useContext(ViewerContext)

  const [isSensitive, setIsSensitive] = useState<boolean>(
    article.sensitiveByAuthor || article.sensitiveByAdmin
  )

  const authorId = article.author?.id
  const isAuthor = viewer.id === authorId
  const circle = article.access.circle
  const canReadFullContent = !!(
    isAuthor ||
    !circle ||
    circle.isMember ||
    article.access.type === ArticleAccessType.Public
  )

  version = (version.__typename === 'ArticleVersion' ? version : undefined)!
  const title = article.title
  const summary = version.summary
  const content = version.contents.html

  return (
    <Layout.Main aside={<Versions.Sidebar article={article} />}>
      <Head
        title={`${title} - ${article?.author.displayName} (@${article.author.userName})`}
        path={
          toPath({
            page: 'articleDetail',
            article,
            versionId: version.id,
          }).href
        }
        noSuffix
        description={summary}
        image={article.cover}
        availableLanguages={article.availableTranslations || []}
      />

      <StickyTopBanner type="revision" article={article} />

      <section className={styles.content}>
        <Media lessThan="lg">
          <Versions.Dropdown article={article} />
        </Media>

        <InfoHeader article={article} version={version} />

        <section className={styles.title}>
          <Title type="article">{title}</Title>

          {/* <MetaInfo
            article={article}
            translated={false}
            canTranslate={false}
            toggleTranslate={() => {}} // TODO
            canReadFullContent={canReadFullContent}
            disabled
          /> */}
        </section>

        {article?.summaryCustomized && <CustomizedSummary summary={summary} />}

        {isSensitive && (
          <DynamicSensitiveWall
            sensitiveByAuthor={article.sensitiveByAuthor}
            sensitiveByAdmin={article.sensitiveByAdmin}
            expandAll={() => setIsSensitive(false)}
          />
        )}

        {!isSensitive && (
          <>
            <Content articleId={article.id} content={content} />

            {circle && !canReadFullContent && (
              <DynamicCircleWall circle={circle} />
            )}
          </>
        )}

        <License license={article.license} />
      </section>
    </Layout.Main>
  )
}

const ArticleDetailRevision = ({
  latestVersion,
}: {
  latestVersion: string
}) => {
  const { getQuery, router } = useRoute()
  const [needRefetchData, setNeedRefetchData] = useState(false)
  const mediaHash = getQuery('mediaHash')
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''
  const viewer = useContext(ViewerContext)

  /**
   * fetch public data
   */
  const isQueryByHash = !!(
    mediaHash &&
    isMediaHashPossiblyValid(mediaHash) &&
    !articleId
  )

  // backward compatible with:
  // - `/:username:/:articleId:-:slug:-:mediaHash`
  // - `/:username:/:articleId:`
  // - `/:username:/:slug:-:mediaHash:`
  const resultByHash = usePublicQuery<ArticleRevisionDetailPublicQuery>(
    ARTICLE_REVISION_DETAIL_PUBLIC,
    {
      variables: {
        mediaHash,
        version: latestVersion,
      },
      skip: !isQueryByHash,
    }
  )
  const resultByNodeId = usePublicQuery<ArticleRevisionDetailPublicQuery>(
    ARTICLE_REVISION_DETAIL_PUBLIC_BY_NODE_ID,
    {
      variables: {
        id: toGlobalId({ type: 'Article', id: articleId }),
        version: latestVersion,
      },
      skip: isQueryByHash,
    }
  )

  const {
    data,
    client,
    refetch: refetchPublic,
  } = resultByHash.data ? resultByHash : resultByNodeId
  const loading = resultByHash.loading || resultByNodeId.loading
  const error = resultByHash.error || resultByNodeId.error

  const { article, version } = data || {}
  const authorId = article?.author?.id
  const isAuthor = viewer.id === authorId

  /**
   * fetch private data
   */
  const loadPrivate = async () => {
    if (!viewer.isAuthed || !article) {
      return
    }

    await client.query({
      query: ARTICLE_REVISION_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: {
        id: article?.id,
      },
    })
  }

  useEffect(() => {
    // refetch data when URL query is changed
    ;(async () => {
      if (!needRefetchData) {
        return
      }
      await refetchPublic()
      await loadPrivate()
      setNeedRefetchData(false)
    })()
  }, [mediaHash])

  /**
   * Render:Loading
   */
  if (loading) {
    return (
      <Layout.Main>
        <Placeholder />
      </Layout.Main>
    )
  }

  /**
   * Render:Error
   */
  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  /**
   * Render:404
   */
  if (!article || !version || version.__typename !== 'ArticleVersion') {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  /**
   * Render:Archived/Banned
   */
  if (article.state !== 'active' && !isAuthor) {
    return (
      <EmptyLayout>
        <Error
          message={
            article.state === 'archived' ? (
              <Translate
                zh_hant="吶，作者親手掩蓋了這篇作品的痕跡，看看別的吧"
                zh_hans="呐，作者亲手掩盖了这篇作品的痕迹，看看别的吧"
                en="Hmm... It seems the author has hidden this work. Go see something else"
              />
            ) : article.state === 'banned' ? (
              <Translate
                zh_hant="該作品因違反社區約章，已被站方強制歸檔。"
                zh_hans="该作品因违反社区约章，已被站方强制封存。"
                en="This work is archived due to violation of community guidelines."
              />
            ) : null
          }
        >
          <BackToHomeButton />
        </Error>
      </EmptyLayout>
    )
  }

  /**
   * Render:Article
   */
  return <BaseArticleDetailRevision article={article} version={version} />
}

const ArticleDetailRevisionOuter = () => {
  const { getQuery, router } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''

  const isQueryByHash = !!(
    mediaHash &&
    isMediaHashPossiblyValid(mediaHash) &&
    !articleId
  )

  const resultByHash = usePublicQuery<ArticleLatestVersionQuery>(
    ARTICLE_LATEST_VERSION,
    { variables: { mediaHash }, skip: !isQueryByHash }
  )
  const resultByNodeId = usePublicQuery<ArticleLatestVersionByNodeIdQuery>(
    ARTICLE_LATEST_VERSION_BY_NODE_ID,
    {
      variables: { id: toGlobalId({ type: 'Article', id: articleId }) },
      skip: isQueryByHash,
    }
  )
  const { data } = resultByHash.data ? resultByHash : resultByNodeId
  const loading = resultByHash.loading || resultByNodeId.loading
  const latestVersion =
    data?.article?.__typename === 'Article' &&
    data.article.versions.edges[0]?.node.id

  /**
   * Rendering
   */
  if (loading) {
    return (
      <Layout.Main>
        <Placeholder />
      </Layout.Main>
    )
  }

  if (!latestVersion) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return <ArticleDetailRevision latestVersion={latestVersion} />
}

export default ArticleDetailRevisionOuter
