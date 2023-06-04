import classNames from 'classnames'

import { capitalizeFirstLetter } from '@/src/common/utils'

import styles from './styles.module.css'

type SpacingX = 0 | 'tight' | 'base' | 'xloose'
type SpacingY = 0 | 'tight' | 'base' | 'xloose'

interface DialogContentProps {
  // Note: only apply in "sm-up" if the spacing is large than "base"
  spacing?: [SpacingY, SpacingX]
  hasFixed?: boolean
  hasGrow?: boolean
}

const DialogContent: React.FC<React.PropsWithChildren<DialogContentProps>> = ({
  spacing = [0, 0],
  hasFixed,
  hasGrow,

  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.hasFixed]: !!hasFixed,
    [styles.hasGrow]: !!hasGrow,
    [styles[`spacingY${capitalizeFirstLetter(spacing[0] + '')}`]]: true,
    [styles[`spacingX${capitalizeFirstLetter(spacing[1] + '')}`]]: true,
  })

  return <section className={contentClasses}>{children}</section>
}

export default DialogContent
