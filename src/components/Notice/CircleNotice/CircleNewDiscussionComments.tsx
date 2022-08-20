import gql from 'graphql-tag'
import { Fragment, useContext } from 'react'

import { Translate, ViewerContext } from '~/components'

import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CircleNewDiscussionComments as NoticeType } from './__generated__/CircleNewDiscussionComments'

type CircleNewDiscussionCommentsType = {
  notice: NoticeType
}

const CircleNewDiscussionComments = ({
  notice,
}: CircleNewDiscussionCommentsType) => {
  const viewer = useContext(ViewerContext)
  const { comments, replies, mentions } = notice

  if (!notice.actors) {
    return null
  }

  const isCircleOwner = notice.circle.owner.id === viewer.id
  const newDiscussionCount = comments?.length
  const replyCount = replies?.length
  const mentionCount = mentions?.length

  if (!newDiscussionCount && !replyCount && !mentionCount) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  return (
    <section className="container">
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="circle" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead>
          {notice.actors.slice(0, 2).map((actor, index) => (
            <Fragment key={index}>
              <NoticeActorName user={actor} />
              {isMultiActors && index < 1 && <span>、</span>}
            </Fragment>
          ))}{' '}
          {isMultiActors && (
            <Translate
              zh_hant={`等 ${numAbbr(actorsCount)} 人`}
              zh_hans={`等 ${numAbbr(actorsCount)} 人`}
              en={`etc. ${numAbbr(actorsCount)} users`}
            />
          )}
          <>
            {isCircleOwner ? (
              <Translate zh_hant="在你的圍爐 " zh_hans="在你的围炉 " en=" in" />
            ) : (
              <Translate zh_hant="在圍爐 " zh_hans="在围炉 " en=" in " />
            )}
            <NoticeCircleName circle={notice.circle} />
            {newDiscussionCount && !replyCount && !mentionCount && (
              <Translate
                zh_hant=" 眾聊中發表話題 "
                zh_hans=" 众聊中发表话题 "
                en=" posted new discussions "
              />
            )}
            {!newDiscussionCount && replyCount && !mentionCount && (
              <Translate
                zh_hant=" 眾聊中回覆話題 "
                zh_hans=" 众聊中回复话题 "
                en=" replied discussions "
              />
            )}
            {!newDiscussionCount && !replyCount && mentionCount && (
              <Translate
                zh_hant=" 眾聊提及了你 "
                zh_hans=" 众聊提及了你 "
                en=" mentioned you "
              />
            )}
            {newDiscussionCount && replyCount && !mentionCount && (
              <Translate
                zh_hant=" 眾聊中發表與回覆話題 "
                zh_hans=" 众聊中发表与回复话题 "
                en=" posted and replied discussions "
              />
            )}
            {newDiscussionCount && !replyCount && mentionCount && (
              <Translate
                zh_hant=" 眾聊中發表話題，其中有提及你 "
                zh_hans=" 众聊中发表话题，其中有提及你 "
                en=" posted new discussions and mentioned you "
              />
            )}
            {!newDiscussionCount && replyCount && mentionCount && (
              <Translate
                zh_hant=" 眾聊中回覆話題，其中有提到你 "
                zh_hans=" 众聊中回复话题，其中有提到你 "
                en=" replied discussions and mentioned you "
              />
            )}
            {newDiscussionCount && replyCount && mentionCount && (
              <Translate
                zh_hant=" 眾聊中發表與回覆話題，其中有提到你 "
                zh_hans=" 众聊中发表与回复话题，其中有提到你 "
                en=" posted and replied discussions, some mentioned you "
              />
            )}
          </>
          {isMultiActors && (
            <section className="multi-actor-avatars">
              {notice.actors.map((actor, index) => (
                <NoticeActorAvatar key={index} user={actor} size="md" />
              ))}
            </section>
          )}
        </NoticeHead>
        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CircleNewDiscussionComments.fragments = {
  notice: gql`
    fragment CircleNewDiscussionComments on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      circle: target {
        ...NoticeCircleCard
      }
      comments {
        id
      }
      replies {
        id
        replyTo {
          author {
            id
          }
        }
      }
      mentions {
        id
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewDiscussionComments