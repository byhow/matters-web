import { useEffect, useState } from 'react'

import { toPath } from '~/common/utils'
import {
  Head,
  Layout,
  Media,
  SearchAutoComplete,
  SearchBar,
  SearchOverview,
  useRoute,
} from '~/components'

import AggregateResults from './AggregateResults'
import SearchArticles from './SearchArticles'
import SearchTags from './SearchTags'
import SearchUsers from './SearchUsers'

const Search = () => {
  const { getQuery, router } = useRoute()
  const type = getQuery('type')
  const q = getQuery('q')
  const [typingKey, setTypingKey] = useState('')
  const resetAutoComplete = () => setTypingKey('')
  const onCancel = () => {
    const path = toPath({ page: 'search' })
    router.push(path.href)
  }

  const isOverview = !q && !typingKey
  const isAutoComplete = typingKey
  const isTagOnly = !isAutoComplete && type === 'tag'
  const isUserOnly = !isAutoComplete && type === 'user'
  const isArticleOnly = !isAutoComplete && type === 'article'
  const isAggregate =
    !isOverview &&
    !isAutoComplete &&
    !isTagOnly &&
    !isUserOnly &&
    !isArticleOnly
  const showCancelButton = !isOverview

  useEffect(() => {
    router.events.on('routeChangeStart', resetAutoComplete)
    return () => router.events.off('routeChangeStart', resetAutoComplete)
  }, [])

  return (
    <Layout.Main smBgColor={isAggregate ? 'grey-lighter' : undefined}>
      <Layout.Header
        left={
          isOverview ? (
            <>
              <Media at="sm">
                <Layout.Header.MeButton />
              </Media>
              <Media greaterThan="sm">
                <Layout.Header.BackButton />
              </Media>
            </>
          ) : null
        }
        right={
          <>
            <SearchBar hasDropdown={false} onChange={setTypingKey} />

            {showCancelButton && (
              <span style={{ marginLeft: '1rem' }}>
                <Layout.Header.CancelButton onClick={onCancel} />
              </span>
            )}
          </>
        }
      />

      <Head title={{ id: 'search' }} />

      {isOverview && <SearchOverview inPage />}
      {isAutoComplete && <SearchAutoComplete searchKey={typingKey} inPage />}

      {isTagOnly && <SearchTags />}
      {isUserOnly && <SearchUsers />}
      {isArticleOnly && <SearchArticles />}
      {isAggregate && <AggregateResults />}
    </Layout.Main>
  )
}

export default Search
