import { useContext, useEffect } from 'react'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import { numAbbr, translate } from '~/common/utils'
import {
  Avatar,
  Button,
  Cover,
  Error,
  Expandable,
  FollowUserButton,
  IconRss32,
  LanguageContext,
  Layout,
  RssFeedDialog,
  Spinner,
  Throw404,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import ShareButton from '~/components/Layout/Header/ShareButton'
import {
  AuthorRssFeedFragment,
  UserProfileUserPublicQuery,
} from '~/gql/graphql'

import {
  ArchitectBadge,
  CivicLikerBadge,
  GoldenMotorBadge,
  SeedBadge,
  TraveloggersBadge,
} from './Badges'
import CircleWidget from './CircleWidget'
import DropdownActions from './DropdownActions'
import { FollowersDialog } from './FollowersDialog'
import { FollowingDialog } from './FollowingDialog'
import { USER_PROFILE_PRIVATE, USER_PROFILE_PUBLIC } from './gql'
import styles from './styles.css'
import TraveloggersAvatar from './TraveloggersAvatar'
import WalletLabel from './WalletLabel'

interface FingerprintButtonProps {
  user: AuthorRssFeedFragment
}

const RssFeedButton = ({ user }: FingerprintButtonProps) => {
  const { lang } = useContext(LanguageContext)

  return (
    <RssFeedDialog user={user}>
      {({ openDialog }) => (
        <Button
          onClick={openDialog}
          spacing={['xxtight', 'xtight']}
          aria-label={translate({ id: 'contentFeedEntrance', lang })}
          aria-haspopup="dialog"
        >
          <IconRss32 color="green" size="lg" />
        </Button>
      )}
    </RssFeedDialog>
  )
}

export const UserProfile = () => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)

  // public user data
  const userName = getQuery('name')
  const isMe = !userName || viewer.userName === userName
  const { data, loading, client } = usePublicQuery<UserProfileUserPublicQuery>(
    USER_PROFILE_PUBLIC,
    {
      variables: { userName },
    }
  )
  const user = data?.user

  // fetch private data
  useEffect(() => {
    if (!viewer.isAuthed || !user) {
      return
    }

    client.query({
      query: USER_PROFILE_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { userName },
    })
  }, [user?.id, viewer.id])

  /**
   * Render
   */
  const LayoutHeader = () => (
    <Layout.Header
      left={<Layout.Header.BackButton mode="black-solid" />}
      right={
        <>
          <span />
          {user && (
            <section className="buttons">
              <ShareButton
                tags={
                  [user.displayName, user.userName].filter(Boolean) as string[]
                }
              />
              <DropdownActions user={user} isMe={isMe} />
              <style jsx>{styles}</style>
            </section>
          )}
        </>
      }
      mode="transparent-absolute"
    />
  )

  if (loading) {
    return (
      <>
        <LayoutHeader />
        <Spinner />
      </>
    )
  }

  if (!user) {
    return (
      <>
        <LayoutHeader />
        <Throw404 />
      </>
    )
  }

  if (user?.status?.state === 'archived') {
    return (
      <>
        <LayoutHeader />
        <Error
          statusCode={404}
          message={
            <Translate
              zh_hant="此帳戶因為違反社區約章而被註銷"
              zh_hans="此帐户因为违反社区约章而被注销"
              en="This account is archived due to violation of community guidelines"
            />
          }
        />
      </>
    )
  }

  const badges = user.info.badges || []
  const circles = user.ownCircles || []
  const hasSeedBadge = badges.some((b) => b.type === 'seed')
  const hasArchitectBadge = badges.some((b) => b.type === 'architect')
  const hasGoldenMotorBadge = badges.some((b) => b.type === 'golden_motor')
  const hasTraveloggersBadge = !!user.info.cryptoWallet?.hasNFTs

  const profileCover = user.info.profileCover || ''
  const userState = user.status?.state as string
  const isCivicLiker = user.liker.civicLiker
  const isUserArchived = userState === 'archived'
  const isUserBanned = userState === 'banned'
  const isUserInactive = isUserArchived || isUserBanned

  /**
   * Inactive User
   */
  if (isUserInactive) {
    return (
      <>
        <LayoutHeader />
        <section className="user-profile">
          <Cover fallbackCover={IMAGE_COVER.src} />

          <header>
            <section className="avatar">
              <Avatar size="xxxl" />
            </section>
          </header>

          <section className="info">
            <section className="display-name">
              <h1 className="name">
                {isUserArchived && <Translate id="accountArchived" />}
                {isUserBanned && <Translate id="accountBanned" />}
              </h1>
            </section>
          </section>

          <style jsx>{styles}</style>
        </section>
      </>
    )
  }

  /**
   * Active or Onboarding User
   */
  return (
    <>
      <LayoutHeader />

      <section className="user-profile">
        <Cover cover={profileCover} fallbackCover={IMAGE_COVER.src} />

        <header>
          <section className="avatar">
            {hasTraveloggersBadge ? (
              <TraveloggersAvatar user={user} isMe={isMe} />
            ) : (
              <Avatar size="xxxl" user={user} inProfile />
            )}
          </section>

          <section className="right">
            {!isMe && <FollowUserButton user={user} size="lg" />}

            {user?.articles.totalCount > 0 && user?.info.ipnsKey && (
              <RssFeedButton user={user} />
            )}
          </section>
        </header>

        <section className="info">
          <section className="display-name">
            <h1 className="name">{user.displayName}</h1>
            {hasTraveloggersBadge && <TraveloggersBadge />}
            {hasSeedBadge && <SeedBadge />}
            {hasGoldenMotorBadge && <GoldenMotorBadge />}
            {hasArchitectBadge && <ArchitectBadge />}
            {isCivicLiker && <CivicLikerBadge />}
          </section>

          <section className="username">
            <span className="name">@{user.userName}</span>
            {!isMe && <FollowUserButton.State user={user} />}
          </section>

          {user?.info.ethAddress && <WalletLabel user={user} isMe={isMe} />}

          <Expandable
            content={user.info.description}
            color="grey-darker"
            size="md"
            spacingTop="base"
          >
            <p className="description">{user.info.description}</p>
          </Expandable>
        </section>

        <footer>
          <FollowersDialog user={user}>
            {({ openDialog: openFollowersDialog }) => (
              <button type="button" onClick={openFollowersDialog}>
                <span className="count">
                  {numAbbr(user.followers.totalCount)}
                </span>
                <Translate id="follower" />
              </button>
            )}
          </FollowersDialog>

          <FollowingDialog user={user}>
            {({ openDialog: openFollowingDialog }) => (
              <button type="button" onClick={openFollowingDialog}>
                <span className="count">
                  {numAbbr(user.following.users.totalCount)}
                </span>
                <Translate id="following" />
              </button>
            )}
          </FollowingDialog>
        </footer>

        <CircleWidget circles={circles} isMe={isMe} />

        <style jsx>{styles}</style>
      </section>
    </>
  )
}

export default UserProfile
