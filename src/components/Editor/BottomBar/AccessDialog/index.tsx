import _get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch } from '~/components'

import SelectCampaign, { SelectCampaignProps } from '../../SelectCampaign'
import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'
import ToggleResponse, { ToggleResponseProps } from '../../ToggleResponse'
import styles from './styles.module.css'

type AccessDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & ToggleAccessProps &
  ToggleResponseProps &
  Partial<SelectCampaignProps>

const BaseAccessDialog = ({
  children,
  canComment,
  toggleComment,
  campaign,
  stage,
  editCampaign,
  ...props
}: AccessDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const campaignProps =
    campaign && editCampaign
      ? {
          campaign,
          stage,
          editCampaign,
        }
      : null

  const toggleResponseProps: ToggleResponseProps = {
    canComment,
    toggleComment,
    disableChangeCanComment: props.article?.canComment,
  }

  const CloseButton = () => (
    <Dialog.TextButton
      onClick={closeDialog}
      text={<FormattedMessage defaultMessage="Done" id="JXdbo8" />}
    />
  )

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Article Management" id="ZEMcZ6" />
          }
          leftBtn={<span />}
          rightBtn={<CloseButton />}
        />

        <Dialog.Content noSpacing>
          {campaignProps && (
            <section className={styles.campaign}>
              <h3 className={styles.title}>投稿七日书自由写</h3>
              <SelectCampaign {...campaignProps} />
            </section>
          )}

          <section className={styles.response}>
            <ToggleResponse {...toggleResponseProps} />
          </section>

          <section className={styles.access}>
            <ToggleAccess {...props} theme="bottomBar" />
          </section>
        </Dialog.Content>

        <Dialog.Footer smUpBtns={<CloseButton />} />
      </Dialog>
    </>
  )
}

const AccessDialog = (props: AccessDialogProps) => (
  <Dialog.Lazy mounted={<BaseAccessDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default AccessDialog
