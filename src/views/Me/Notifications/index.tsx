import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { mergeConnections, shouldRenderNode } from '~/common/utils'
import {
  EmptyNotice,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Media,
  Notice,
  Spacer,
  SpinnerBlock,
  useMutation,
} from '~/components'
import { updateViewerUnreadNoticeCount } from '~/components/GQL'
import CampaignArticleNotice from '~/components/Notice/CampaignArticleNotice'
import CollectionNotice from '~/components/Notice/CollectionNotice'
import MomentNotice from '~/components/Notice/MomentNotice'
import {
  MarkAllNoticesAsReadMutation,
  MeNotificationsQuery,
} from '~/gql/graphql'

const renderableTypes = new Set([
  'ArticleArticleNotice',
  'CircleNotice',
  'ArticleNotice',
  'CollectionNotice',
  'CommentCommentNotice',
  'CommentNotice',
  'OfficialAnnouncementNotice',
  'TransactionNotice',
  'MomentNotice',
  'UserNotice',
  'CampaignArticleNotice',
])

const ME_NOTIFICATIONS = gql`
  query MeNotifications($after: String) {
    viewer {
      id
      notices(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            createdAt
            ...DigestNotice
            # FIXME: why CollectionNotice, CampaignArticleNotice and MomentNotice is not included in DigestNotice?
            ...CollectionNotice
            ...MomentNotice
            ...CampaignArticleNotice
          }
        }
      }
    }
  }
  ${Notice.fragments.notice}
  ${CollectionNotice.fragments.notice}
  ${MomentNotice.fragments.notice}
  ${CampaignArticleNotice.fragments.notice}
`
// FIXME: remove CollectionNotice fragment from ME_NOTIFICATIONS

const MARK_ALL_NOTICES_AS_READ = gql`
  mutation MarkAllNoticesAsRead {
    markAllNoticesAsRead
  }
`

const BaseNotifications = () => {
  const [markAllNoticesAsRead] = useMutation<MarkAllNoticesAsReadMutation>(
    MARK_ALL_NOTICES_AS_READ,
    {
      update: updateViewerUnreadNoticeCount,
    }
  )
  const { data, loading, fetchMore } = useQuery<
    MeNotificationsQuery,
    { first: number; after?: number }
  >(ME_NOTIFICATIONS, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    markAllNoticesAsRead()
  }, [])

  const connectionPath = 'viewer.notices'
  const { edges, pageInfo } = data?.viewer?.notices || {}

  if (loading) {
    return <SpinnerBlock />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyNotice />
  }

  const loadMore = () =>
    fetchMore({
      variables: { first: 20, after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore} eof>
      <List spacing={['xloose', 0]}>
        {edges.map(
          ({ node }) =>
            shouldRenderNode(node, renderableTypes) && (
              <List.Item key={node.id}>
                <Notice notice={node} />
              </List.Item>
            )
        )}
      </List>
    </InfiniteScroll>
  )
}

const Notifications = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Media at="sm">
        <Layout.Header
          // left={<Layout.Header.MeButton />}
          // right={<Layout.Header.Title id="notifications" />}
          left={
            <Layout.Header.Title>
              <FormattedMessage defaultMessage="Notifications" id="NAidKb" />
            </Layout.Header.Title>
          }
        />
        <Spacer size="sp16" />
      </Media>
      <Media greaterThan="sm">
        <Spacer size="sp32" />
      </Media>

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Notifications',
          id: 'NAidKb',
        })}
      />

      <Layout.Main.Spacing hasVertical={false}>
        <BaseNotifications />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Notifications
