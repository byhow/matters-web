import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/72px/avatar-default.svg'
import CIRCLE_COVER from '@/public/static/images/circle-cover.svg'
import { REFETCH_CIRCLE_DETAIL } from '~/common/enums'
import { numAbbr, stripSpaces } from '~/common/utils'
import {
  CircleAvatar,
  Cover,
  Expandable,
  Head,
  Layout,
  Media,
  Spinner,
  SubscribeCircleDialog,
  Throw404,
  useEventListener,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import ShareButton from '~/components/Layout/Header/ShareButton'
import { CircleProfileCirclePublicQuery } from '~/gql/graphql'

import SubscriptionBanner from '../SubscriptionBanner'
import { AddCircleArticle } from './AddCircleArticle'
import AuthorWidget from './AuthorWidget'
import DropdownActions from './DropdownActions'
import FollowButton from './FollowButton'
import { FollowersDialog } from './FollowersDialog'
import { CIRCLE_PROFILE_PRIVATE, CIRCLE_PROFILE_PUBLIC } from './gql'
import { MembersDialog } from './MembersDialog'
import styles from './styles.css'

const CircleProfile = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')

  // public data
  const {
    data,
    loading,
    client,
    refetch: refetchPublic,
  } = usePublicQuery<CircleProfileCirclePublicQuery>(CIRCLE_PROFILE_PUBLIC, {
    variables: { name },
  })
  const circle = data?.circle
  const isOwner = circle?.owner.id === viewer.id
  const price = circle?.prices && circle?.prices[0]

  // private data
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async () => {
    if (!viewer.isAuthed) {
      return
    }

    await client.query({
      query: CIRCLE_PROFILE_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { name },
    })

    setPrivateFetched(true)
  }

  // fetch private data
  useEffect(() => {
    if (!circle?.id) {
      return
    }

    if (viewer.isAuthed) {
      loadPrivate()
    } else {
      setPrivateFetched(true)
    }
  }, [circle?.id])

  // refetch & pull to refresh
  const refetch = async () => {
    await refetchPublic()
    loadPrivate()
  }
  useEventListener(REFETCH_CIRCLE_DETAIL, refetch)

  const description = circle ? stripSpaces(circle.description) : ''

  /**
   * Render
   */

  const Right = () => (
    <>
      <span />
      {circle && (
        <section className="buttons">
          <ShareButton
            tags={
              [
                circle.displayName,
                circle.name,
                circle.owner.displayName,
                // circle.owner.userName,
              ].filter(Boolean) as string[]
            }
          />
          <DropdownActions circle={circle} />
          <style jsx>{styles}</style>
        </section>
      )}
    </>
  )
  const LayoutHeader = () => (
    <>
      {circle && (
        <Head
          title={`${circle.displayName} by ${circle.owner.displayName} (@${circle.owner.userName})`}
          description={description}
          keywords={
            [
              circle.displayName,
              circle.name,
              circle.owner.displayName,
              // circle.owner.userName,
            ] as string[]
          } // add top10 most used tags?
          image={
            circle.cover ||
            `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${CIRCLE_COVER.src}`
          }
          jsonLdData={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: circle.displayName,
            description,
            image:
              circle.avatar ||
              `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${ICON_AVATAR_DEFAULT.src}`,
            url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/~${circle.name}`,
          }}
        />
      )}
      <Media at="sm">
        <Layout.Header right={<Right />} mode="transparent-absolute" />
      </Media>
      <Media greaterThan="sm">
        <Layout.Header
          right={<Right />}
          rightSpace
          mode="transparent-absolute"
        />
      </Media>
    </>
  )

  if (loading) {
    return (
      <>
        <LayoutHeader />
        <Spinner />
      </>
    )
  }

  if (!circle) {
    return (
      <>
        <LayoutHeader />
        <Throw404 />
      </>
    )
  }

  return (
    <>
      <LayoutHeader />

      <section className="profile">
        <Cover cover={circle.cover} fallbackCover={CIRCLE_COVER} />

        <header>
          <section className="info">
            <CircleAvatar size="xxxl" circle={circle} />
            <h2 className="name">{circle.displayName}</h2>
          </section>

          {price && (
            <section className="price">
              <span className="amount">{price.amount}</span>
              <br />
              {price.currency} /{' '}
              <FormattedMessage defaultMessage="month" description="" />
            </section>
          )}
        </header>

        {circle.description && (
          <section className="description">
            <Expandable
              content={circle.description}
              color="grey-darker"
              spacingTop="base"
              size="md"
            >
              <p>{circle.description}</p>
            </Expandable>
          </section>
        )}

        {privateFetched && <SubscriptionBanner circle={circle} />}

        <footer>
          <section className="counts">
            <MembersDialog>
              {({ openDialog: openMembersDialog }) => (
                <button
                  type="button"
                  onClick={openMembersDialog}
                  aria-haspopup="dialog"
                >
                  <span className="count">
                    {numAbbr(circle.members.totalCount)}
                  </span>
                  {/* <Translate id="members" /> */}
                  <FormattedMessage defaultMessage="Members" description="" />
                </button>
              )}
            </MembersDialog>

            <FollowersDialog circle={circle}>
              {({ openDialog: openFollowersDialog }) => (
                <button
                  type="button"
                  onClick={openFollowersDialog}
                  aria-haspopup="dialog"
                >
                  <span className="count">
                    {numAbbr(circle.followers.totalCount)}
                  </span>
                  {/* <Translate id="follower" />  */}

                  <FormattedMessage defaultMessage="Followers" description="" />
                </button>
              )}
            </FollowersDialog>
          </section>

          {isOwner ? (
            <AddCircleArticle.Button circle={circle} />
          ) : (
            <FollowButton circle={circle} />
          )}
        </footer>
        <AuthorWidget circle={circle} />

        <SubscribeCircleDialog circle={circle} />

        <style jsx>{styles}</style>
      </section>
    </>
  )
}

export default CircleProfile
