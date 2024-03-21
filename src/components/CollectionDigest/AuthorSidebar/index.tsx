import classNames from 'classnames'
import gql from 'graphql-tag'

import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { IconAnthology24, LinkWrapper } from '~/components'
import { CollectionDigestAuthorSidebarCollectionFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type CollectionDigestAuthorSidebarProps = {
  collection: CollectionDigestAuthorSidebarCollectionFragment
  imageSize?: 'md'
}

const fragments = {
  collection: gql`
    fragment CollectionDigestAuthorSidebarCollection on Collection {
      id
      title
      cover
      author {
        id
        userName
      }
      articles(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}

export const CollectionDigestAuthorSidebar = ({
  collection,
  imageSize = 'md',
}: CollectionDigestAuthorSidebarProps) => {
  const {
    title,
    author: { userName },
  } = collection

  const containerClasses = classNames({
    [styles.container]: true,
    [styles[`imageSize${capitalizeFirstLetter(imageSize)}`]]: true,
  })

  const path = toPath({
    page: 'collectionDetail',
    collection,
    userName: userName || '',
  })

  return (
    <LinkWrapper {...path} textActiveColor="green">
      <section className={containerClasses}>
        <IconAnthology24 size="md" color="greyLight" />
        <header>{title}</header>
      </section>
    </LinkWrapper>
  )
}

CollectionDigestAuthorSidebar.fragments = fragments
