// https://testing-library.com/docs/react-testing-library/setup#custom-render
// https://formatjs.io/docs/guides/testing/#react-testing-library

import { ApolloProvider } from '@apollo/react-common'
import { render, RenderOptions } from '@testing-library/react'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import React, { ReactElement, useContext } from 'react'
import { IntlProvider } from 'react-intl'

import TRANSLATIONS_EN from '@/compiled-lang/en.json'
import TRANSLATIONS_ZH_HANS from '@/compiled-lang/zh-Hans.json'
import TRANSLATIONS_ZH_HANT from '@/compiled-lang/zh-Hant.json'
import {
  FeaturesProvider,
  LanguageContext,
  LanguageProvider,
  MediaContextProvider,
} from '~/components'
import { UserLanguage } from '~/gql/graphql'

import { toLocale } from './language'

const TranslationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useContext(LanguageContext)
  const translations = {
    [UserLanguage.ZhHant]: TRANSLATIONS_ZH_HANT,
    [UserLanguage.ZhHans]: TRANSLATIONS_ZH_HANS,
    [UserLanguage.En]: TRANSLATIONS_EN,
  }

  return (
    <IntlProvider locale={toLocale(lang)} messages={translations[lang]}>
      {children}
    </IntlProvider>
  )
}

// src/components/Root/index.tsx
const wrapper = ({ children }: { children: React.ReactNode }) => {
  // src/common/utils/withApollo.ts
  const client = new ApolloClient({
    link: ApolloLink.empty(),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <LanguageProvider headers={undefined}>
        <FeaturesProvider official={undefined}>
          <MediaContextProvider>
            <TranslationsProvider>{children}</TranslationsProvider>
          </MediaContextProvider>
        </FeaturesProvider>
      </LanguageProvider>
    </ApolloProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper, ...options })

// re-export & override render method
export * from '@testing-library/react'
export { customRender as render, wrapper }
