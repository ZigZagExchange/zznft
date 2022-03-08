import {defaultChains, chain} from "wagmi";
import {InjectedConnector} from 'wagmi/connectors/injected'
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect'
import {WalletLinkConnector} from 'wagmi/connectors/walletLink'

const infuraId = process.env.INFURA_ID

const chains = defaultChains

const connectors = ({ chainId }: {chainId?: number}) => {
  const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0]
  return [
    new InjectedConnector({chains, options: { shimDisconnect: true }}),
    new WalletConnectConnector({options: {infuraId, qrcode: true}}),
    new WalletLinkConnector({options: {appName: 'zzNFT', jsonRpcUrl: `${rpcUrl}/${infuraId}`}})
  ]
}

export default connectors
