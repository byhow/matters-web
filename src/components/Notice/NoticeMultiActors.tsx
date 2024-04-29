import { ReactComponent as IconMore } from '@/public/static/icons/24px/more.svg'
import { Button, Icon } from '~/components'

import NoticeActorAvatar, { size } from './NoticeActorAvatar'
import styles from './styles.module.css'

type NoticeMultiActorsProps = {
  actors: any[]
  size: size
}

const NoticeMultiActors = ({ actors, size }: NoticeMultiActorsProps) => {
  const actorsCount = actors.length
  const showAll = actorsCount <= 8

  if (showAll) {
    return (
      <>
        {actors.map((actor, index) => (
          <NoticeActorAvatar key={index} user={actor} size={size} />
        ))}
      </>
    )
  }

  return (
    <>
      {actors.slice(0, 7).map((actor, index) => (
        <NoticeActorAvatar key={index} user={actor} size={size} />
      ))}
      <span className={styles.moreActors}>
        <Button
          bgColor="greyLighter"
          bgActiveColor="greyLighter"
          borderRadius="5rem"
        >
          <Icon icon={IconMore} color="grey" size="lg" />
        </Button>
      </span>
    </>
  )
}

export default NoticeMultiActors
