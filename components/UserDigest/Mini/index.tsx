// External modules
import gql from 'graphql-tag'

// Internal modules
import { Avatar } from '~/components'
import styles from './styles.css'

/**
 * UserDigest.Mini is a component for presenting user's avatar and display name.
 *
 * Usage:
 *
 *   <UserDigest.Mini user={user} />
 */

const fragments = {
  user: gql`
    fragment UserDigestMiniUser on User {
      info {
        description
      }
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

const Mini = ({ user }: { user: any }) => (
  <section>
    <div className="container">
      <Avatar size="xxsmall" user={user} />
      <span className="name">{user.info.displayName}</span>
    </div>
    <style jsx>{styles}</style>
  </section>
)

Mini.fragments = fragments

export default Mini
