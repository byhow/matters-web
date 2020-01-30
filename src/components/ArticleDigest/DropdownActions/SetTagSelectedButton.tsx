import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'

import styles from './styles.css'

import { SetTagSelected } from './__generated__/SetTagSelected'
import { SetTagSelectedButtonArticle } from './__generated__/SetTagSelectedButtonArticle'

const SET_TAG_SELECTED = gql`
  mutation SetTagSelected($id: ID!, $articles: [ID!]) {
    putArticlesTags(input: { id: $id, articles: $articles, selected: true }) {
      id
      articles(input: { first: 0, selected: true }) {
        totalCount
      }
    }
  }
`

const fragments = {
  article: gql`
    fragment SetTagSelectedButtonArticle on Article {
      id
    }
  `
}

const SetTagSelectedButton = ({
  article,
  hideDropdown
}: {
  article: SetTagSelectedButtonArticle
  hideDropdown: () => void
}) => {
  const router = useRouter()
  const [update] = useMutation<SetTagSelected>(SET_TAG_SELECTED, {
    variables: { id: router.query.id, articles: [article.id] }
  })

  return (
    <button
      type="button"
      onClick={async event => {
        event.stopPropagation()

        await update()
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate
                  zh_hant="文章已添加至精選"
                  zh_hans="文章已添加至精选"
                />
              ),
              closeButton: true,
              duration: 2000
            }
          })
        )
        hideDropdown()
      }}
    >
      <TextIcon icon={<Icon.PinToTop />} spacing="tight">
        <Translate zh_hant="添加精選" zh_hans="添加精选" />
      </TextIcon>
      <style jsx>{styles}</style>
    </button>
  )
}

SetTagSelectedButton.fragments = fragments

export default SetTagSelectedButton
