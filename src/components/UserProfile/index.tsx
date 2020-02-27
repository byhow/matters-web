import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import _some from 'lodash/some'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  Avatar,
  Expandable,
  FollowButton,
  Icon,
  ShareButton,
  Spinner,
  Throw404,
  Tooltip,
  Translate,
  ViewerContext
} from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'
import { getQuery, numAbbr, toPath } from '~/common/utils'

import Cover from './Cover'
import DropdownActions from './DropdownActions'
import EditProfileButton from './EditProfileButton'
import styles from './styles.css'

import { MeProfileUser } from './__generated__/MeProfileUser'
import { UserProfileUser } from './__generated__/UserProfileUser'

const fragments = {
  user: gql`
    fragment ProfileUser on User {
      id
      userName
      displayName
      liker {
        civicLiker
      }
      info {
        badges {
          type
        }
        description
        profileCover
      }
      followees(input: { first: 0 }) {
        totalCount
      }
      followers(input: { first: 0 }) {
        totalCount
      }
      status {
        state
      }
      ...AvatarUser
      ...FollowButtonUser @skip(if: $isMe)
      ...DropdownActionsUser
    }
    ${Avatar.fragments.user}
    ${FollowButton.fragments.user}
    ${DropdownActions.fragments.user}
  `
}

const USER_PROFILE = gql`
  query UserProfileUser($userName: String!, $isMe: Boolean = false) {
    user(input: { userName: $userName }) {
      ...ProfileUser
    }
  }
  ${fragments.user}
`

const ME_PROFILE = gql`
  query MeProfileUser($isMe: Boolean = true) {
    viewer {
      ...ProfileUser
    }
  }
  ${fragments.user}
`

const SeedBadge = () => (
  <Tooltip content={<Translate zh_hant="種子用戶" zh_hans="种子用户" />}>
    <span>
      <Icon.SeedBadge />
    </span>
  </Tooltip>
)

const CivicLikerBadge = () => (
  <>
    <a href={EXTERNAL_LINKS.CIVIC_LIKER_SUPPORT} target="_blank">
      <span className="badge-civic-liker">Civic Liker</span>
    </a>
    <style jsx>{styles}</style>
  </>
)

const CoverContainer: React.FC = ({ children }) => (
  <div className="cover-container l-row">
    <section className="l-col-4 l-col-md-8 l-col-lg-12">{children}</section>

    <style jsx>{styles}</style>
  </div>
)

export const UserProfile = () => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const userName = getQuery({ router, key: 'userName' })
  const isMe = !userName || viewer.userName === userName

  const containerClass = classNames({
    container: true
  })

  const { data, loading } = useQuery<MeProfileUser | UserProfileUser>(
    isMe ? ME_PROFILE : USER_PROFILE,
    {
      variables: isMe ? {} : { userName }
    }
  )
  const user = isMe ? _get(data, 'viewer') : _get(data, 'user')

  if (loading) {
    return (
      <section className={containerClass}>
        <CoverContainer>
          <Spinner />
        </CoverContainer>

        <style jsx>{styles}</style>
      </section>
    )
  }

  if (!user || user?.status?.state === 'archived') {
    return <Throw404 />
  }

  const userFollowersPath = toPath({
    page: 'userFollowers',
    userName: user.userName
  })
  const userFolloweesPath = toPath({
    page: 'userFollowees',
    userName: user.userName
  })
  const badges = user.info.badges || []
  const hasSeedBadge = _some(badges, { type: 'seed' })
  const profileCover = user.info.profileCover || ''
  const isCivicLiker = user.liker.civicLiker
  const isUserArchived = user.status.state === 'archived'
  const isUserBanned = user.status.state === 'banned'
  const isUserFrozen = user.status.state === 'frozen'
  const isUserInactive = isUserArchived || isUserBanned || isUserFrozen

  return (
    <section className={containerClass}>
      <CoverContainer>
        <Cover cover={profileCover} />
      </CoverContainer>

      <div className="content-container l-row">
        <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
          <section className="content">
            <div className="avatar-container">
              <Avatar
                size="xxl"
                user={!isMe && isUserInactive ? undefined : user}
              />

              {!isMe && (
                <section className="buttons">
                  <span className="follows">
                    <FollowButton user={user} size="lg" />
                    <section className="u-sm-down-hide follow-state">
                      {!isMe && <FollowButton.State user={user} />}
                    </section>
                  </span>

                  <span className="u-sm-up-hide">
                    <DropdownActions user={user} />
                    <ShareButton size="md-s" />
                  </span>
                </section>
              )}
            </div>

            <section className="info">
              <header className="header">
                <section className="basic">
                  {!isUserInactive && (
                    <>
                      <span className="name">{user.displayName}</span>
                      <span className="username">@{user.userName}</span>
                      {hasSeedBadge && <SeedBadge />}
                      {isCivicLiker && <CivicLikerBadge />}
                      <span className="u-sm-up-hide">
                        {!isMe && <FollowButton.State user={user} />}
                      </span>
                    </>
                  )}

                  {isUserArchived && (
                    <span>
                      <Translate id="accountArchived" />
                    </span>
                  )}

                  {isUserFrozen && (
                    <span>
                      <Translate id="accountFrozen" />
                    </span>
                  )}

                  {isUserBanned && (
                    <span>
                      <Translate id="accountBanned" />
                    </span>
                  )}
                </section>

                <section className="buttons">
                  {isMe && !isUserInactive && <EditProfileButton user={user} />}

                  <span className={!isMe ? 'u-sm-down-hide' : ''}>
                    {!isMe && <DropdownActions user={user} />}
                    <ShareButton size="md-s" />
                  </span>
                </section>
              </header>

              {!isUserInactive && (
                <Expandable>
                  <p className="description">{user.info.description}</p>
                </Expandable>
              )}

              <section className="info-follow">
                <Link {...userFollowersPath}>
                  <a className="followers">
                    <span className="count">
                      {numAbbr(user.followers.totalCount)}
                    </span>
                    <Translate id="follower" />
                  </a>
                </Link>

                <Link {...userFolloweesPath}>
                  <a className="followees">
                    <span className="count">
                      {numAbbr(user.followees.totalCount)}
                    </span>
                    <Translate id="following" />
                  </a>
                </Link>
              </section>
            </section>
          </section>
        </section>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}
