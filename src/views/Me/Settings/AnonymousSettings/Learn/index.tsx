import { useContext } from 'react'

import { Form, LanguageContext, Translate } from '~/components'

import { GUIDE_LINKS, PATHS } from '~/common/enums'

const Learn = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Form.List
      groupName={
        <Translate zh_hant="暸解更多" zh_hans="了解更多" en="Learn More" />
      }
    >
      <Form.List.Item
        ariaRole="link"
        title={<Translate id="about" />}
        href={PATHS.ABOUT}
      />
      <Form.List.Item
        ariaRole="link"
        title={<Translate id="guide" />}
        href={PATHS.GUIDE}
      />
      <Form.List.Item
        ariaRole="link"
        title={<Translate id="community" />}
        href={PATHS.COMMUNITY}
      />
      <Form.List.Item
        ariaRole="link"
        title={<Translate id="migrationSideBar" />}
        href={PATHS.MIGRATION}
      />
      <Form.List.Item
        ariaRole="link"
        title={<Translate id="term" />}
        href={PATHS.TOS}
      />
      <Form.List.Item
        ariaRole="link"
        title={<Translate id="downloadApp" />}
        href={GUIDE_LINKS.PWA[lang]}
      />
    </Form.List>
  )
}

export default Learn
