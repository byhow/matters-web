import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'

import FieldHeader from './'

describe('<Form.Field.Header>', () => {
  it('should render an Form.Field.Header', () => {
    const name = 'userName'
    const fieldId = `field-${name}`

    render(
      <FieldHeader
        label={name}
        hasLabel
        htmlFor={fieldId}
        extraButton={<span>Extra Button</span>}
      />
    )

    const $label = screen.getByText(name)
    expect($label).toBeInTheDocument()
    expect($label).toHaveAttribute('for', fieldId)

    const $extraButton = screen.getByText('Extra Button')
    expect($extraButton).toBeInTheDocument()
  })
})
