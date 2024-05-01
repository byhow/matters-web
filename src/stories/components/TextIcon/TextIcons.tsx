import React from 'react'

import { ReactComponent as IconDonate } from '@/public/static/icons/24px/donate.svg'
import { ReactComponent as IconExpand } from '@/public/static/icons/24px/expand.svg'
import { ReactComponent as IconExternal } from '@/public/static/icons/24px/external.svg'
import { ReactComponent as IconPin } from '@/public/static/icons/24px/pin.svg'
import { Icon, TextIcon, Translate } from '~/components'

import styles from './styles.module.css'

const Toasts = () => (
  <section className={styles.container}>
    <ul>
      <li>
        <TextIcon
          icon={<Icon icon={IconPin} size={24} />}
          size={16}
          spacing={16}
        >
          <Translate id="pinArticle" />
        </TextIcon>
      </li>

      <li>
        <TextIcon
          icon={<Icon icon={IconDonate} size={20} />}
          weight="medium"
          spacing={8}
          size={14}
        >
          100
        </TextIcon>
      </li>

      <li>
        <TextIcon icon={<Icon icon={IconExternal} color="grey" size={14} />} />
      </li>

      <li>
        <TextIcon
          icon={<Icon icon={IconExpand} size={12} />}
          placement="left"
          weight="normal"
          color="grey"
        >
          <Translate zh_hant="打開" zh_hans="展开" />
        </TextIcon>
      </li>

      <li>
        <TextIcon
          color="greyDark"
          size={14}
          weight="normal"
          placement="left"
          decoration="underline"
        >
          <Translate
            zh_hant="改使用 Google 搜尋關鍵字"
            zh_hans="改使用 Google 搜索关键字"
          />
        </TextIcon>
      </li>
    </ul>
  </section>
)

export default Toasts
