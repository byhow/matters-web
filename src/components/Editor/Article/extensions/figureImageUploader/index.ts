import { mergeAttributes, ReactNodeViewRenderer } from '@matters/matters-editor'
import { Node } from '@tiptap/core'

import Uploader, { getFileId, StorageAsset, UploaderProps } from './Uploader'

export { restoreImages } from './Uploader'

/**
 * FigureImageUploader is a extension to upload image and replace with FigureImage node after upload.
 */

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figureImageUploader: {
      insertFigureImageUploaders: (
        options: Pick<UploaderProps, 'upload'> & { files: File[]; pos?: number }
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
      file: { default: null },
      upload: { default: null },
    } as { [key in keyof UploaderProps]: { default: null } }
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
      insertFigureImageUploaders:
        ({ files, pos, ...restAttrs }) =>
        ({ chain }) => {
          if (!files.length) {
            return true
          }

          const assets = this.editor.storage[pluginName].assets as StorageAsset

          const content = [
            ...files.map((file) => {
              const fileId = getFileId(files[0])
              const asset = assets[fileId]

              // If asset is already uploaded, insert FigureImage
              if (asset?.path) {
                return {
                  type: 'figureImage',
                  attrs: { src: asset.previewSrc },
                  content: [],
                }
              }

              // Otherwise, insert FigureImageUploader
              return {
                type: this.name,
                attrs: { ...restAttrs, file },
                content: [],
              }
            }),
            // {
            //   type: 'paragraph',
            //   content: [],
            // },
          ]

          if (!pos) {
            return chain().insertContent(content).focus().run()
          }

          return chain().insertContentAt(pos, content).focus().run()
        },
    }
  },
})
