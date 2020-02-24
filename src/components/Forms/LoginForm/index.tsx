import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  PageHeader,
  Translate
} from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'

import { ADD_TOAST, ANALYTICS_EVENTS, ERROR_CODES, TEXT } from '~/common/enums'
import {
  analytics,
  // clearPersistCache,
  redirectToTarget,
  translate,
  validateEmail,
  validatePassword
} from '~/common/utils'

import {
  PasswordResetDialogButton,
  PasswordResetRedirectButton,
  SignUpDialogButton,
  SignUpRedirectionButton
} from './Buttons'

import { UserLogin } from './__generated__/UserLogin'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  closeDialog?: () => void
}

interface FormValues {
  email: string
  password: ''
}

export const USER_LOGIN = gql`
  mutation UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      auth
    }
  }
`

export const LoginForm: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog
}) => {
  const [login] = useMutation<UserLogin>(USER_LOGIN)
  const { lang } = useContext(LanguageContext)

  const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'
  const formId = 'login-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: ({ email, password }) => {
      return {
        email: validateEmail(email, lang, { allowPlusSign: true }),
        password: validatePassword(password, lang)
      }
    },
    onSubmit: async ({ email, password }, { setErrors, setSubmitting }) => {
      try {
        await login({ variables: { input: { email, password } } })

        if (submitCallback) {
          submitCallback()
        }

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate
                  zh_hant={TEXT.zh_hant.loginSuccess}
                  zh_hans={TEXT.zh_hans.loginSuccess}
                />
              )
            }
          })
        )
        analytics.identifyUser()
        analytics.trackEvent(ANALYTICS_EVENTS.LOG_IN)

        // await clearPersistCache()

        redirectToTarget({
          fallback: !!isInPage ? 'homepage' : 'current'
        })
      } catch (error) {
        const errorCodes = getErrorCodes(error)

        if (errorCodes.indexOf(ERROR_CODES.USER_EMAIL_NOT_FOUND) >= 0) {
          setErrors({
            email: translate({
              zh_hant: TEXT.zh_hant.error.USER_EMAIL_NOT_FOUND,
              zh_hans: TEXT.zh_hans.error.USER_EMAIL_NOT_FOUND,
              lang
            })
          })
        } else if (errorCodes.indexOf(ERROR_CODES.USER_PASSWORD_INVALID) >= 0) {
          setErrors({
            password: translate({
              zh_hant: TEXT.zh_hant.error.USER_PASSWORD_INVALID,
              zh_hans: TEXT.zh_hans.error.USER_PASSWORD_INVALID,
              lang
            })
          })
        } else {
          setErrors({
            email: translate({
              zh_hant: TEXT.zh_hant.error.UNKNOWN_ERROR,
              zh_hans: TEXT.zh_hans.error.UNKNOWN_ERROR,
              lang
            })
          })
        }

        analytics.trackEvent(ANALYTICS_EVENTS.LOG_IN_FAILED, {
          email,
          error
        })
      }

      setSubmitting(false)
    }
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={
          <Translate
            zh_hant={TEXT.zh_hant.email}
            zh_hans={TEXT.zh_hans.email}
          />
        }
        type="email"
        name="email"
        required
        placeholder={translate({
          zh_hant: TEXT.zh_hant.enterEmail,
          zh_hans: TEXT.zh_hans.enterEmail,
          lang
        })}
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Input
        label={
          <Translate
            zh_hant={TEXT.zh_hant.password}
            zh_hans={TEXT.zh_hans.password}
          />
        }
        type="password"
        name="password"
        required
        placeholder={translate({
          zh_hant: TEXT.zh_hant.enterPassword,
          zh_hans: TEXT.zh_hans.enterPassword,
          lang
        })}
        value={values.password}
        error={touched.password && errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        extraButton={
          <>
            {isInDialog && <PasswordResetDialogButton />}
            {isInPage && <PasswordResetRedirectButton />}
          </>
        }
      />

      {isInDialog && <SignUpDialogButton />}
      {isInPage && <SignUpRedirectionButton />}
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!_isEmpty(errors) || isSubmitting}
      text={
        <Translate
          zh_hant={TEXT.zh_hant.confirm}
          zh_hans={TEXT.zh_hans.confirm}
        />
      }
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <PageHeader
          title={
            <Translate
              zh_hant={TEXT.zh_hant.login}
              zh_hans={TEXT.zh_hans.login}
            />
          }
          hasNoBorder
        >
          {SubmitButton}
        </PageHeader>

        {InnerForm}
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title={
            <Translate
              zh_hant={TEXT.zh_hant.login}
              zh_hans={TEXT.zh_hans.login}
            />
          }
          close={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  )
}
