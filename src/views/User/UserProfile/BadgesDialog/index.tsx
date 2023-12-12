import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { BREAKPOINTS } from '~/common/enums'
import {
  Button,
  Dialog,
  IconClose20,
  useDialogSwitch,
  useMediaQuery,
} from '~/components'

import BadgeNomadDialogContent from '../BadgeNomadDialog/Content'
import { Badges, BadgesOptions } from '../Badges'

type Step = 'badges' | 'nomad'
interface BadgesDialogProps extends BadgesOptions {
  children: ({
    openDialog,
  }: {
    openDialog: (step?: Step) => void
  }) => React.ReactNode
  step?: Step
}

export const BaseBadgesDialog = ({
  children,
  hasNomadBadge,
  nomadBadgeLevel,
  totalReferredCount,
  hasTraveloggersBadge,
  hasSeedBadge,
  hasGoldenMotorBadge,
  hasArchitectBadge,
  isCivicLiker,
  shareLink,
  step: initStep = 'badges',
}: BadgesDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const [step, setStep] = useState<Step>(initStep)
  const isInBadgesStep = step === 'badges'
  const isInNomadStep = step === 'nomad'
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  const openStepDialog = (step?: Step) => {
    if (step) {
      setStep(step)
    }
    openDialog()
  }

  return (
    <>
      {children({ openDialog: openStepDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} dismissOnClickOutside>
        {isInBadgesStep && (
          <>
            <Dialog.Header
              title={
                <FormattedMessage
                  defaultMessage="Badges"
                  id="DYrDcG"
                  description="src/components/UserProfile/index.tsx"
                />
              }
              titleLeft
              rightBtn={
                <Button
                  onClick={closeDialog}
                  textColor="greyDarker"
                  textActiveColor="black"
                >
                  <IconClose20 size="mdS" />
                </Button>
              }
            />
            <Dialog.Content fixedHeight={!isSmUp}>
              <Badges
                isInDialog
                hasNomadBadge={hasNomadBadge}
                nomadBadgeLevel={nomadBadgeLevel}
                totalReferredCount={totalReferredCount}
                hasTraveloggersBadge={hasTraveloggersBadge}
                hasSeedBadge={hasSeedBadge}
                hasGoldenMotorBadge={hasGoldenMotorBadge}
                hasArchitectBadge={hasArchitectBadge}
                isCivicLiker={isCivicLiker}
                shareLink={shareLink}
                gotoNomadBadge={() => setStep('nomad')}
              />
            </Dialog.Content>

            <Dialog.Footer
              smUpBtns={
                <Dialog.TextButton
                  text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                  color="greyDarker"
                  onClick={closeDialog}
                />
              }
            />
          </>
        )}
        {isInNomadStep && !!nomadBadgeLevel && (
          <BadgeNomadDialogContent
            closeDialog={closeDialog}
            isNested
            nomadBadgeLevel={nomadBadgeLevel}
            shareLink={shareLink}
            goBack={() => setStep('badges')}
          />
        )}
      </Dialog>
    </>
  )
}

export const BadgesDialog = (props: BadgesDialogProps) => {
  const Children = ({ openDialog }: { openDialog: (step?: Step) => void }) => {
    return <>{props?.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseBadgesDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
