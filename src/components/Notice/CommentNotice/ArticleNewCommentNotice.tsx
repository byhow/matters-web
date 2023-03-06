import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleNewCommentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const ArticleNewCommentNotice = ({
  notice,
}: {
  notice: ArticleNewCommentNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1
  const commentArticle =
    notice.comment?.node.__typename === 'Article'
      ? notice.comment.node
      : undefined

  return (
    <section className="container" data-test-id={TEST_ID.ARTICLE_NEW_COMMENT}>
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="comment" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeHeadActors actors={notice.actors} />
          <FormattedMessage
            defaultMessage="commented on"
            description="src/components/Notice/CommentNotice/ArticleNewCommentNotice.tsx"
          />
          {commentArticle && <NoticeArticleTitle article={commentArticle} />}
        </NoticeHead>

        {isMultiActors ? (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} size="md" />
            ))}
          </section>
        ) : (
          <NoticeComment comment={notice.comment} />
        )}

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleNewCommentNotice.fragments = {
  notice: gql`
    fragment ArticleNewCommentNotice on CommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      comment: target {
        ...NoticeComment
        node {
          ... on Article {
            ...NoticeArticleTitle
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticleNewCommentNotice
