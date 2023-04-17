import { distance } from 'fastest-levenshtein'

import { toSizedImageURL } from '../url'

/**
 * Remove html tag and merge multiple spaces into one.
 */
export const stripHtml = (html: string | null | undefined, replacement = ' ') =>
  (html || '')
    .replace(/(<\/p><p>|&nbsp;)/g, ' ') // replace line break and space first
    .replace(/(<([^>]+)>)/gi, replacement)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

export const makeSummary = (html: string, length = 140) => {
  // buffer for search
  const buffer = 20

  // split on sentence breaks
  const sections = stripHtml(html, '')
    .replace(/([?!。？！]|(\.\s))\s*/g, '$1|')
    .split('|')

  // grow summary within buffer
  let summary = ''
  while (summary.length < length - buffer && sections.length > 0) {
    const el = sections.shift() || ''

    const addition =
      el.length + summary.length > length + buffer
        ? `${el.substring(0, length - summary.length)}…`
        : el

    summary = summary.concat(addition)
  }

  return summary
}

/**
 * Removes leading and trailing line breaks from (Quill's) HTML string.
 */
export const trimLineBreaks = (html: string) => {
  const LINE_BREAK = '<p><br></p>'
  const re = new RegExp(`(^(${LINE_BREAK})*)|((${LINE_BREAK})*$)`, 'g')
  return html.replace(re, '')
}

/**
 * Simple words' length counting.
 */
export const countChars = (text: string) => {
  if (!text) {
    return 0
  }

  return text.split('').reduce((count, char, index) => {
    return count + (text.charCodeAt(index) < 256 ? 1 : 2)
  }, 0)
}

/**
 * Simple substring title by words' length counting.
 */
export const normalizeArticleTitle = (text: string, limit: number) => {
  const buffer = 3
  const length = countChars(text)

  if (text && length > limit) {
    let sum = 0
    let lastIndex = 0
    for (let index = 0; index < text.length; index++) {
      sum = sum + (text.charCodeAt(index) < 256 ? 1 : 2)
      if (sum >= limit - buffer && lastIndex === 0) {
        lastIndex = index
        break
      }
    }

    return text.substring(0, lastIndex) + '…'
  }

  return text
}

/**
 * Optimize embed images & iframes
 *
 * 1) Add loading=lazy attribute
 * 2) Responsive Images
 *
 * @see `<ResponsiveImage>`
 */
export const optimizeEmbed = (content: string) => {
  return content
    .replace(/\<iframe /g, '<iframe loading="lazy"')
    .replace(
      /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g,
      (match, src, offset) => {
        return /* html */ `
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet=${toSizedImageURL({ url: src, size: '1080w' })}
          onerror="this.srcset='${src}'"
        />

        <source
          srcSet=${toSizedImageURL({ url: src, size: '540w' })}
        />

        <img
          src=${src}
          srcSet=${toSizedImageURL({ url: src, size: '540w' })}
          loading="lazy"
        />
      </picture>
    `
      }
    )
}

/**
 * Get distances of two context diffs.
 */
export const measureDiffs = (source: string, target: string) =>
  distance(source, target)
