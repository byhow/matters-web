import { mergeAttributes, ReactNodeViewRenderer } from '@matters/matters-editor'
import { Node } from '@tiptap/core'

import Uploader, { UploaderProps } from './Uploader'

/**
 * FigureImageUploader is a extension to upload image and replace with FigureImage node after upload.
 */

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figureImageUploader: {
      insertFigureImageUploader: (
        options: UploaderProps & { pos?: number }
      ) => ReturnType
    }
  }
}

const pluginName = 'figureImageUploader'

export const FigureImageUploader = Node.create({
  name: pluginName,
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      previewSrc: { default: null },
      file: { default: null },
      upload: { default: null },
    }
  },

  addStorage() {
    return {
      assets: {},
    }
  },

  parseHTML() {
    return [{ tag: 'figure-image-uploader' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['figure-image-uploader', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Uploader, {
      className: 'figure-image-uploader',
    })
  },

  addCommands() {
    return {
      insertFigureImageUploader:
        (attrs) =>
        ({ chain }) => {
          const content = [{ type: this.name, attrs, content: [] }]

          if (!attrs.pos) {
            return chain().insertContent(content).run()
          }

          return chain().insertContentAt(attrs.pos, content).run()
        },
    }
  },
})
