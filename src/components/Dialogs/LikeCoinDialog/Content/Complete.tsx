import { redirectToTarget } from '~/common/utils'
import { Dialog, Translate } from '~/components'

const Complete: React.FC = () => {
  return (
    <>
      <Dialog.Message spacing="md">
        <p>
          <Translate
            zh_hant="你的專屬 Liker ID 已就位！"
            zh_hans="你的专属 Liker ID 已就位！"
            en="Your Liker ID is ready!"
          />
        </p>
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={() => {
            redirectToTarget({
              fallback: 'current',
            })
          }}
        >
          <Translate id="done" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Complete
