import gql from 'graphql-tag'
import React from 'react'

import { toPath } from '~/common/utils'
import {
  Card,
  DateTime,
  FormWrapper,
  LinkWrapper,
  Title,
  Translate,
} from '~/components'
import { DraftDigestFeedDraftFragment } from '~/gql/graphql'

import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import styles from './styles.css'

interface DraftDigestFeedProps {
  draft: DraftDigestFeedDraftFragment
}

const fragments = {
  draft: gql`
    fragment DraftDigestFeedDraft on Draft {
      id
      title
      slug
      updatedAt
      ...EditButtonDraft
      ...DeleteButtonDraft
    }
    ${EditButton.fragments.draft}
    ${DeleteButton.fragments.draft}
  `,
}

const DraftDigestFeed = ({ draft }: DraftDigestFeedProps) => {
  const { id, title, updatedAt, slug } = draft
  const path = toPath({
    page: 'draftDetail',
    slug,
    id,
  })

  return (
    <FormWrapper>
      <Card {...path} spacing={['base', 0]} bgActiveColor="none">
        <LinkWrapper {...path} textActiveColor="green">
          <Title type="feed" is="h2">
            {title || <Translate id="untitle" />}
          </Title>
        </LinkWrapper>

        <footer>
          <section className="left">
            <EditButton draft={draft} />
            <DeleteButton draft={draft} />
          </section>

          <section className="right">
            <DateTime date={updatedAt} type="relative" />
          </section>
        </footer>

        <style jsx>{styles}</style>
      </Card>
    </FormWrapper>
  )
}

/**
 * Memoizing
 */
type MemoizedDraftDigestFeedType = React.MemoExoticComponent<
  React.FC<DraftDigestFeedProps>
> & {
  fragments: typeof fragments
}

const MemoizedDraftDigestFeed = React.memo(
  DraftDigestFeed,
  () => true
) as MemoizedDraftDigestFeedType

MemoizedDraftDigestFeed.fragments = fragments

export default MemoizedDraftDigestFeed
