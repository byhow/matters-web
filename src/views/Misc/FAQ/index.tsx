import { useContext } from 'react'

import { Head, LanguageContext } from '~/components'

import contentStyles from '~/common/styles/utils/content.article.css'
import detailsStyles from '~/common/styles/utils/details.css'
import { translate } from '~/common/utils'

import MiscTab from '../MiscTab'
import content from './content'

const FAQ = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <main>
      <Head title={{ id: 'faq' }} />

      <section className="l-row">
        <div className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
          <MiscTab />

          <article
            dangerouslySetInnerHTML={{
              __html: translate({
                ...content,
                lang
              })
            }}
          />
        </div>

        <style jsx global>
          {contentStyles}
        </style>
        <style jsx global>
          {detailsStyles}
        </style>
      </section>
    </main>
  )
}

export default FAQ
