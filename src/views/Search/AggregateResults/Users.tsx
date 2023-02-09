import { analytics, toPath } from '~/common/utils'
import {
  Card,
  List,
  Spinner,
  usePublicQuery,
  UserDigest,
  useRoute,
} from '~/components'
import { SearchAggregateUsersPublicQuery } from '~/gql/graphql'

import { SEARCH_AGGREGATE_USERS_PUBLIC } from './gql'
import styles from './styles.css'
import ViewMoreButton from './ViewMoreButton'

const AggregateUserResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading } = usePublicQuery<SearchAggregateUsersPublicQuery>(
    SEARCH_AGGREGATE_USERS_PUBLIC,
    { variables: { key: q } }
  )

  const { edges, pageInfo } = data?.search || {}

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  return (
    <section className="aggregate-section">
      <List>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'User' && (
              <List.Item key={cursor}>
                <Card
                  spacing={['xtight', 'base']}
                  {...toPath({
                    page: 'userProfile',
                    userName: node.userName || '',
                  })}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search',
                      contentType: 'user',
                      location: i,
                      id: node.id,
                    })
                  }
                >
                  <UserDigest.Mini
                    user={node}
                    hasAvatar
                    hasUserName
                    hasDisplayName
                  />
                </Card>
              </List.Item>
            )
        )}
      </List>

      <ViewMoreButton q={q} type="user" />

      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateUserResults
