import { timeout } from '~/common/utils'

const TEST_HASH = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
const PUBLIC_GATEWAYS: string[] = [
  'https://gateway.ipfs.io/ipfs/:hash',
  'https://cloudflare-ipfs.com/ipfs/:hash',
  'https://gateway.pinata.cloud/ipfs/:hash',
  'https://ipfs.io/ipfs/:hash',
  'https://cf-ipfs.com/ipfs/:hash',
  'https://4everland.io/ipfs/:hash',
  'https://storry.tv/ipfs/:hash',
  'https://ipfs.runfission.com/ipfs/:hash',
  'https://konubinix.eu/ipfs/:hash',
  'https://starbase.gw3.io/ipfs/:hash',
]

// check accessbility for a given hash and gateway
const checkGateway = async (
  hash: string,
  gatewayUrl: string
): Promise<boolean> => {
  const testUrl = `${gatewayUrl.replace(
    ':hash',
    hash
  )}#x-ipfs-companion-no-redirect`

  try {
    // const res = await fetch(testUrl)
    const res = (await timeout(2000, fetch(testUrl))) as Response
    if (res && res.ok) {
      return true
    }
    return false
  } catch (err) {
    console.log(`Gateway not alive, skipping: ${gatewayUrl}`)
    return false
  }
}

const gatewayUrlsResolver = async () => {
  const checkers = await Promise.all(
    PUBLIC_GATEWAYS.map((url) =>
      checkGateway(TEST_HASH, url).then((alive: boolean) => ({ url, alive }))
    )
  )

  const gatwayUrls = checkers.filter(({ alive }) => alive).map(({ url }) => url)

  // meson network use 302 redirect, so we have to push it in mannually
  gatwayUrls.unshift(
    'https://ipfs.filebase.io/ipfs/:hash',
    'https://pz-matters.meson.network/ipfs/:hash'
  )

  return gatwayUrls
}

export default gatewayUrlsResolver
