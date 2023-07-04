import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyLike,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
} from '~/components'
import { MeLikesReceivedQuery } from '~/gql/graphql'

import { Appreciation } from '../Appreciation'
import HistoryTabs from '../HistoryTabs'
import LikesTabs from '../LikesTabs'

const ME_APPRECIATED_RECEIVED = gql`
  query MeLikesReceived($after: String) {
    viewer {
      id
      activity {
        likesReceived: appreciationsReceived(
          input: { first: 20, after: $after }
        ) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...DigestAppreciation
            }
          }
        }
      }
    }
  }
  ${Appreciation.fragments.appreciation}
`

const BaseLikesReceived = () => {
  const { data, loading, fetchMore } = useQuery<MeLikesReceivedQuery>(
    ME_APPRECIATED_RECEIVED
  )

  if (loading) {
    return <Spinner />
  }

  if (!data?.viewer) {
    return null
  }

  const connectionPath = 'viewer.activity.likesReceived'
  const { edges, pageInfo } = data.viewer.activity.likesReceived

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <LikesTabs />

        <EmptyLike />
      </>
    )
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'appreciations_received',
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <>
      <LikesTabs />

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List responsiveWrapper>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <Appreciation appreciation={node} type="received" />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

const LikesReceived = () => {
  const intl = useIntl()
  const title = intl.formatMessage({
    defaultMessage: 'History',
    description: '',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.Title>{title}</Layout.Header.Title>}
      />

      <Head title={title} />

      <HistoryTabs />

      <BaseLikesReceived />
    </Layout.Main>
  )
}

export default LikesReceived
