import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { validateCollectionTitle } from '~/common/utils'
import { Dialog, Form, LanguageContext, useMutation } from '~/components'
import { CreateCollectionMutation } from '~/gql/graphql'

import styles from './styles.module.css'

interface FormProps {
  closeDialog: () => void
  updateChecked?: (value: string) => void
}

interface FormValues {
  title: string
}

const CREATE_COLLECTION = gql`
  mutation CreateCollection($input: PutCollectionInput!) {
    putCollection(input: $input) {
      id
      title
    }
  }
`

const AddCollectionDialogContent: React.FC<FormProps> = ({
  closeDialog,
  updateChecked,
}) => {
  const [create] = useMutation<CreateCollectionMutation>(
    CREATE_COLLECTION,
    undefined,
    { showToast: false }
  )
  const { lang } = useContext(LanguageContext)
  const maxCollectionTitle = 40

  const formId = 'edit-new-collection-form'

  const intl = useIntl()
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      title: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ title }) =>
      _pickBy({
        title: validateCollectionTitle(title, lang),
      }),
    onSubmit: async ({ title }, { setSubmitting, setFieldError }) => {
      try {
        const response = await create({
          variables: {
            input: {
              title,
            },
          },
        })
        console.log({ response })
        if (updateChecked) {
          updateChecked(response.data?.putCollection.id || '')
        }
        setSubmitting(false)
        closeDialog()
      } catch (error) {
        setSubmitting(false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <section className={styles.container}>
        <Form.Input
          type="text"
          name="title"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Collection Name',
            description: '',
          })}
          hint={`${values.title.length}/${maxCollectionTitle}`}
          value={values.title}
          error={touched.title && errors.title}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength={maxCollectionTitle}
        />
      </section>
    </Form>
  )

  const SubmitButton = () => (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<FormattedMessage defaultMessage="Create" description="" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage defaultMessage="New Collection" description="" />
        }
        closeDialog={closeDialog}
        rightBtn={<SubmitButton />}
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" description="" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            <SubmitButton />
          </>
        }
      />
    </>
  )
}

export default AddCollectionDialogContent
