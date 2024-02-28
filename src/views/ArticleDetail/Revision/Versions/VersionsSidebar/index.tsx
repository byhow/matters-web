import classNames from 'classnames'
import format from 'date-fns/format'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Label } from '~/components'
import { VersionsArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const VersionsSidebar = ({ article }: { article: VersionsArticleFragment }) => {
  const versions = article.versions.edges.map((edge) => edge?.node!)

  if (versions.length < 1) {
    return null
  }

  return (
    <section className={styles.versions}>
      <ul>
        {versions.map((version, index) => (
          <li
            key={version.id}
            className={classNames({
              [styles.item]: true,
              [styles.active]: index === 0,
            })}
          >
            <Link
              href={
                toPath({
                  page: 'articleRevision',
                  article,
                  versionId: version.id,
                }).href
              }
            >
              <a className={styles.link}>
                <span
                  className={classNames({
                    [styles.date]: true,
                    [styles.active]: index === 0,
                  })}
                >
                  <span>
                    {format(new Date(version.createdAt), 'yyyy-MM-dd')}
                  </span>

                  {index === 0 && (
                    <Label color="green">
                      <FormattedMessage defaultMessage="Latest" id="adThp5" />
                    </Label>
                  )}
                </span>
                <span
                  className={classNames({
                    [styles.time]: true,
                    [styles.active]: index === 0,
                  })}
                >
                  {format(new Date(version.createdAt), 'HH:mm')}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default VersionsSidebar
