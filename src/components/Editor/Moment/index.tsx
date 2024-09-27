import { useApolloClient } from '@apollo/react-hooks'
import {
  Editor,
  EditorContent,
  Mention,
  momentEditorExtensions,
  PasteDropFile,
  Placeholder,
  useEditor,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { ADD_MOMENT_ASSETS } from '~/common/enums'
import { getValidFiles } from '~/common/utils'

import {
  CustomShortcuts,
  makeMentionSuggestion,
  SmartLink,
} from '../Article/extensions'
import { makeSmartLinkOptions } from '../Article/extensions/smartLink/utils'
import styles from './styles.module.css'

interface Props {
  content: string
  update: (params: { content: string }) => void
  onSubmit: () => any
  placeholder?: string
  setEditor?: (editor: Editor | null) => void
}

const MomentEditor: React.FC<Props> = ({
  content,
  update,
  onSubmit,
  placeholder,
  setEditor,
}) => {
  const client = useApolloClient()
  const intl = useIntl()
  placeholder =
    placeholder ||
    intl.formatMessage({
      id: 't1wXVG',
      defaultMessage: 'Say something? Someone might listen.',
      description: 'MOMENT_FORM',
    })

  const editor = useEditor({
    // autofocus: true,
    content: content || '',
    onUpdate: async ({ editor, transaction }) => {
      const content = editor.getHTML()
      update({ content })
    },
    extensions: [
      CustomShortcuts.configure({
        onModEnter: () => onSubmit(),
      }),
      Placeholder.configure({
        placeholder,
      }),
      Mention.configure({
        suggestion: makeMentionSuggestion({ client }),
      }),
      SmartLink.configure(makeSmartLinkOptions({ client })),
      PasteDropFile.configure({
        onDrop: async (editor, files, pos) => {
          const validFiles = await getValidFiles(files)
          window.dispatchEvent(
            new CustomEvent(ADD_MOMENT_ASSETS, {
              detail: { files: validFiles },
            })
          )
        },
        onPaste: async (editor, files) => {
          const validFiles = await getValidFiles(files)
          window.dispatchEvent(
            new CustomEvent(ADD_MOMENT_ASSETS, {
              detail: { files: validFiles },
            })
          )
        },
      }),
      ...momentEditorExtensions,
    ],
  })

  useEffect(() => {
    setEditor?.(editor)
  }, [editor])

  return (
    <div
      className={classNames('u-content-moment', styles.momentEditor)}
      id="editor" // anchor for mention plugin
    >
      <EditorContent editor={editor} />
    </div>
  )
}

export default MomentEditor
