import dynamic from 'next/dynamic'
import { forwardRef } from 'react'
import FocusLock from 'react-focus-lock'

import { Z_INDEX } from '~/common/enums'

export type PopperInstance = any
export type PopperProps = import('@tippyjs/react').TippyProps

const DynamicLazyTippy = dynamic(() => import('./LazyTippy'), {
  ssr: true, // enable for first screen
})

type ForwardChildrenNode = ({
  ref,
}: {
  ref?: React.Ref<any>
}) => React.ReactNode

interface ForwardChildrenProps {
  children: ForwardChildrenNode
}

const ForwardChildren = forwardRef(
  ({ children }: ForwardChildrenProps, ref) => <>{children({ ref })}</>
)

ForwardChildren.displayName = 'ForwardChildren'

/**
 * Wrappers of <Tippy> with customize themes
 *
 * Usage:
 *
 * ```tsx
 * // <Dropdown> is usually used with <Menu>
 * <Dropdown content={<Menu><Menu.Item>發現</Menu.Item></Menu>}>
 *   <button type="button">menu</button>
 * <Dropdown>
 *
 * <Tooltip content="你最多可讚賞 5 次">
 *   <AppreciationButton />
 * <Tooltip>
 * ```
 *
 * @see {@url https://github.com/atomiks/tippy.js-react}
 */

export const Dropdown = ({
  children,
  ...props
}: Omit<PopperProps, 'children'> & ForwardChildrenProps) => (
  <DynamicLazyTippy
    arrow={false}
    trigger="click"
    interactive
    offset={[0, 4]}
    placement="bottom-end"
    animation="shift-away"
    theme="dropdown"
    zIndex={Z_INDEX.OVER_BOTTOM_BAR}
    appendTo={typeof window !== 'undefined' ? document.body : undefined}
    aria={{ content: 'describedby', expanded: true }}
    {...props}
    content={<FocusLock>{props.content}</FocusLock>}
  >
    <ForwardChildren>{children}</ForwardChildren>
  </DynamicLazyTippy>
)

export const Tooltip: React.FC<PopperProps> = (props) => (
  <DynamicLazyTippy
    arrow
    interactive={false}
    offset={[0, 12]}
    placement="right"
    animation="shift-away"
    theme="tooltip"
    zIndex={Z_INDEX.UNDER_GLOBAL_HEADER}
    aria={{ content: 'describedby', expanded: true }}
    {...props}
  />
)

/**
 * Hide popper when inside button was clicked
 * @param instance
 */
export const hidePopperOnClick = (instance: PopperInstance) => {
  const box = instance.popper.firstElementChild

  if (!box) {
    return
  }

  box.addEventListener('click', (event: any) => {
    const target = event.target as HTMLElement

    if (target?.closest && target.closest('[data-clickable], a, button')) {
      instance.hide()
    }
  })
}
