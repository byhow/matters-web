import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react'

import {
  Card,
  Dialog,
  List,
  QueryError,
  Spinner,
  Throw404,
  Translate,
  useMutation,
  UserDigest,
  useRoute,
} from '~/components'
import INVITE_CIRCLE from '~/components/GQL/mutations/invite'
import { StagingNode } from '~/components/SearchSelect/StagingArea'

import { INVITATIONS_CIRCLE } from './gql'
import PeriodOption from './PeriodOption'

import { InviteCircle } from '~/components/GQL/mutations/__generated__/InviteCircle'
import { InvitationsCircle } from './__generated__/InvitationsCircle'

interface Props {
  close: () => void
  confirm: () => void
  invitees: StagingNode[]
}

const BaseInviteePreSend = ({
  circleName,
  close,
  confirm,
  invitees,
}: Props & { circleName: string }) => {
  const [period, setPeriod] = useState<number>(1)
  const [invite, { loading: inviteLoading }] = useMutation<InviteCircle>(
    INVITE_CIRCLE
  )

  /**
   * Data Fetching
   */
  const { data, loading, error } = useQuery<InvitationsCircle>(
    INVITATIONS_CIRCLE,
    {
      variables: { name: circleName },
    }
  )

  /**
   * Rendering
   */
  const circle = data?.circle

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!circle) {
    return <Throw404 />
  }

  const send = async () => {
    const result = await invite({
      variables: {
        circleId: circle.id,
        freePeriod: period,
        invitees: [],
      },
    })

    if (!result) {
      return
    }
    confirm()
  }

  return (
    <>
      <Dialog.Message align="left">
        <p>
          <Translate
            zh_hant="用戶將收到你的圍爐免費資格邀請函，設置免費的時限，邀請他們一起加入吧！"
            zh_hans="用户将收到你的围炉免费资格邀请函，设置免费的时限，邀请他们一起加入吧！"
            en="Invitees will receiving trial invitations, so set the free period and send invitations"
          />
        </p>
      </Dialog.Message>

      <List hasBorder={false}>
        {invitees.map(
          ({ node }, i) =>
            node.__typename === 'User' && (
              <List.Item key={i}>
                <Card spacing={['xtight', 'base']}>
                  <UserDigest.Mini
                    user={node}
                    direction="column"
                    hasAvatar
                    hasDisplayName
                    hasUserName
                    disabled
                  />
                </Card>
              </List.Item>
            )
        )}
      </List>

      <PeriodOption period={period} onClick={setPeriod} />

      <Dialog.Footer>
        <Dialog.Footer.Button onClick={() => send()} loading={inviteLoading}>
          <Translate
            zh_hant="確認發送"
            zh_hans="确认发送"
            en="Confirm to Send"
          />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          bgColor="grey-lighter"
          textColor="black"
          onClick={close}
        >
          <Translate zh_hant="暫時不要" zh_hans="暂时不要" en="Not Now" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

const InviteePreSend = (props: Props) => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  return (
    <>
      <Dialog.Header
        title={<Translate zh_hant="寄出邀請" zh_hans="寄出邀请" en="Send" />}
        close={close}
        closeTextId="cancel"
      />
      <BaseInviteePreSend circleName={name} {...props} />
    </>
  )
}

export default InviteePreSend
