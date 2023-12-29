import classNames from 'classnames'
import gql from 'graphql-tag'
import { useEffect, useState } from 'react'

import { ButtonProps, ReCaptchaProvider } from '~/components'
import {
  ArticleDetailPublicQuery,
  ToolbarArticlePrivateFragment,
  ToolbarArticlePublicFragment,
} from '~/gql/graphql'

import AppreciationButton from '../../AppreciationButton'
import CommentButton from '../CommentButton'
import DonationButton from '../DonationButton'
import styles from './styles.module.css'

export type FloatToolbarProps = {
  article: ToolbarArticlePublicFragment & Partial<ToolbarArticlePrivateFragment>
  articleDetails: NonNullable<ArticleDetailPublicQuery['article']>
  privateFetched: boolean
  show: boolean
}

const fragments = {
  article: {
    public: gql`
      fragment FloatToolbarArticlePublic on Article {
        id
        title
        ...DonationButtonArticle
        ...AppreciationButtonArticlePublic
        ...CommentButtonArticlePublic
      }
      ${DonationButton.fragments.article}
      ${AppreciationButton.fragments.article.public}
      ${CommentButton.fragments.article.public}
    `,
    private: gql`
      fragment FloatToolbarArticlePrivate on Article {
        id
        ...AppreciationButtonArticlePrivate
        ...CommentButtonArticlePrivate
      }
      ${AppreciationButton.fragments.article.private}
      ${CommentButton.fragments.article.private}
    `,
  },
}

const FloatToolbar = ({
  show,
  article,
  articleDetails,
  privateFetched,
}: FloatToolbarProps) => {
  const [mounted, setMounted] = useState(false)
  const [displayContainer, setDisplayContainer] = useState(false)
  useEffect(() => {
    if (show) {
      setDisplayContainer(show)
    }
    // delay to show container to trigger animation effects
    setTimeout(() => setMounted(true))

    return () => setMounted(false)
  }, [show])

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.showContainer]: show && mounted,
  })

  const buttonProps: ButtonProps = {
    spacing: ['baseTight', 'base'],
    bgColor: 'white',
    textColor: 'black',
    textActiveColor: 'greyDarker',
  }

  return (
    <section className={styles.wrapper}>
      <section
        className={containerClasses}
        style={{ display: displayContainer ? 'flex' : 'none' }}
        onTransitionEnd={() => {
          if (!show) {
            // If it's opacity=0, it's still clickable,
            // need hide container after transition
            setDisplayContainer(false)
          }
        }}
      >
        <section className={styles.toolbar}>
          <ReCaptchaProvider action="appreciateArticle">
            {/* TODO: confirm can appreciate your own article */}
            <AppreciationButton
              article={article}
              privateFetched={privateFetched}
              textIconSpacing="basexxtight"
              {...buttonProps}
            />
          </ReCaptchaProvider>

          <span className={styles.divider} />
          <DonationButton
            article={article}
            articleDetail={articleDetails}
            {...buttonProps}
          />

          <span className={styles.divider} />

          <CommentButton
            article={article}
            disabled={!article.canComment}
            textIconSpacing="basexxtight"
            {...buttonProps}
          />
        </section>
      </section>
    </section>
  )
}

FloatToolbar.fragments = fragments

export default FloatToolbar
