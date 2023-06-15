import Link from 'next/link'
import { useIntl } from 'react-intl'

import { PATHS } from '~/common/enums'
import { IconLogo, IconLogoGraph, Media } from '~/components'

import styles from './styles.module.css'

const Logo = () => {
  const intl = useIntl()

  return (
    <section className={styles.logo}>
      <Link href={PATHS.HOME} legacyBehavior>
        <a
          aria-label={intl.formatMessage({
            defaultMessage: 'Discover',
            description: '',
          })}
        >
          <Media at="md">
            <IconLogoGraph />
          </Media>
          <Media greaterThan="md">
            <IconLogo />
          </Media>
        </a>
      </Link>
    </section>
  )
}

export default Logo
