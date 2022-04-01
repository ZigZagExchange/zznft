import {useAccount, useConnect, useNetwork} from "wagmi";
import React, {useEffect, useState} from "react";
import Button, {ButtonSize, ButtonType} from "../Button/Button";
import Link from "next/link";
import {css} from "../../helpers/css";
import Modal from "../Modal/Modal";
import {connectorIds, connectorImageSrcMap} from "../../config/connectors";
import Image from "next/image"
import {debugToast} from "../Toast/toast";
import Dropdown from "../Dropdown/Dropdown";
import {appStore} from "../../store/App.store";
import {observer} from "mobx-react";
import useDisplayName from "../../hooks/useDisplayName";
import useNetworkWatcher from "../../hooks/useNetworkWatcher";
import useZkWalletConnector from "../../hooks/useZkWalletMobxSync";
import InitializeAccountModal from "./InitializeAccountModal";
import ConnectWalletModal from "./ConnectWalletModal";

const ConnectWallet = observer(() => {
  const [{data: accountData}] = useAccount()
  const [{loading}] = useConnect()
  const {isTargetChainConnected} = useNetworkWatcher()
  const {isZkWalletConnected} = useZkWalletConnector()

  useEffect(() => {
    if (isTargetChainConnected && isZkWalletConnected) {

    }
  }, [isTargetChainConnected, isZkWalletConnected])

  return <>
    {loading ? <div>loading</div> : null}
    {accountData && <WalletConnected/>}
    {!accountData && <ConnectWalletButton/>}
  </>
})

const ConnectWalletButton = () => {
  return <>
    <Button onClick={() => appStore.modals.isConnectWalletModalVisbile = true}>connect</Button>
    <ConnectWalletModal/>
    <InitializeAccountModal/>
  </>
}

const WalletConnected = () => {
  const [{data}, disconnect] = useAccount({fetchEns: true})
  const {displayName} = useDisplayName(data?.address)
  const [{data: networkData}] = useNetwork()
  return <Dropdown trigger={<Button>{displayName}</Button>}>
    <Dropdown.Item>
      <Link href={`/profile/${data!.address}`}>
        <a className={css("hover:underline", "text-lg")}>profile</a>
      </Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <a onClick={() => {
        disconnect()
        appStore.auth.logout()
        debugToast("Disconnected")
      }}
         className={css("hover:cursor-pointer", "hover:underline", "text-lg")}>
        disconnect
      </a>
    </Dropdown.Item>
    <Dropdown.Item>
      <div className={css("text-neutral-400", "text-sm", "text-right", "mt-2")}>
        network: {networkData && networkData.chain?.name}
      </div>
    </Dropdown.Item>
  </Dropdown>
}

export default ConnectWallet
