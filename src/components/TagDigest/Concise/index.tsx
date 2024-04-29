import gql from 'graphql-tag'

import { ReactComponent as IconDraft } from '@/public/static/icons/24px/draft.svg'
import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { TEST_ID } from '~/common/enums'
import { numAbbr, toPath } from '~/common/utils'
import { Icon, LinkWrapper, TextIcon } from '~/components'
import { TagDigestConciseTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type TagDigestConciseTagProps = {
  tag: TagDigestConciseTagFragment
  textSize?: 'sm' | 'mdS'
  showArticlesNum?: boolean
}

const fragments = {
  tag: gql`
    fragment TagDigestConciseTag on Tag {
      id
      content
      numArticles
    }
  `,
}

const Concise = ({
  tag,
  textSize = 'mdS',
  showArticlesNum,
}: TagDigestConciseTagProps) => {
  const path = toPath({
    page: 'tagDetail',
    tag,
  })
  return (
    <LinkWrapper {...path} testId={TEST_ID.DIGEST_TAG_CONCISE}>
      <section className={styles.content}>
        <TextIcon
          icon={<Icon icon={IconHashTag} color="grey" />}
          color="black"
          size={textSize}
          spacing="xxtight"
          weight="md"
        >
          {tag.content}
        </TextIcon>

        {showArticlesNum && (
          <TextIcon
            icon={<Icon icon={IconDraft} color="greyDark" size="xs" />}
            size="xs"
            spacing="xxtight"
            color="greyDark"
          >
            {numAbbr(tag.numArticles)}
          </TextIcon>
        )}
      </section>
    </LinkWrapper>
  )
}

Concise.fragments = fragments

export default Concise
