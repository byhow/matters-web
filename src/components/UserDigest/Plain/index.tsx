import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { LinkWrapper } from '~/components'
import { UserDigestPlainUserFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.css'

export type UserDigestPlainProps = {
  user: UserDigestPlainUserFragment

  disabled?: boolean
  hasUnderline?: boolean
  onClick?: () => void
}

const Plain = ({
  user,
  disabled,
  onClick,
  hasUnderline,
}: UserDigestPlainProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  const containerClasses = classNames({
    container: true,
    disabled,
  })

  const displayNameClasses = classNames({
    name: true,
    hasUnderline,
  })

  return (
    <LinkWrapper
      {...path}
      disabled={disabled}
      onClick={onClick}
      testId={TEST_ID.DIGEST_USER_MINI}
    >
      <section className={containerClasses}>
        <span className={displayNameClasses}>{user.displayName}</span>
        <style jsx>{styles}</style>
      </section>
    </LinkWrapper>
  )
}

Plain.fragments = fragments

export default Plain
