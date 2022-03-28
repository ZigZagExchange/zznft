import {defaultChains, chain} from "wagmi";
import {InjectedConnector} from 'wagmi/connectors/injected'
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect'
import {WalletLinkConnector} from 'wagmi/connectors/walletLink'

const infuraId = process.env.INFURA_ID
const chains = [chain.mainnet, chain.rinkeby]

const connectors = ({ chainId }: {chainId?: number}) => {
  const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0]
  return [
    new InjectedConnector({chains, options: { shimDisconnect: true, shimChainChangedDisconnect: false }}),
    new WalletConnectConnector({chains, options: {infuraId, qrcode: true}}),
    new WalletLinkConnector({chains, options: {appName: 'zzNFT', jsonRpcUrl: `${rpcUrl}/${infuraId}`}})
  ]
}

export type connectorIds = "injected" | "walletConnect" | "walletLink"

export const connectorImageSrcMap: {[key in connectorIds]: string} = {
  injected: "/images/metamask.svg",
  walletConnect: "/images/walletconnect.svg",
  walletLink: "/images/coinbasewallet.png"
}

export default connectors
