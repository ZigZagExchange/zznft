import {useAccount, useConnect, useNetwork} from "wagmi";
import React, {useEffect} from "react";
import Button from "../Button/Button";
import {css} from "../../helpers/css";
import {debugToast} from "../Toast/toast";
import Dropdown from "../Dropdown/Dropdown";
import {AppStore} from "../../store/AppStore";
import {observer} from "mobx-react";
import useDisplayName from "../../hooks/useDisplayName";
import useNetworkWatcher from "../../hooks/useNetworkWatcher";
import useZkWalletConnector from "../../hooks/useZkWalletMobxSync";
import DSLLink, {LinkSize, LinkType} from "../Link/Link"


// TODO: break up this functionality so we can plug connect wallet button elsewhere, without the rest of this functionality
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
    {accountData && <WalletConnected/>}
    {!accountData && <Button onClick={() => AppStore.modals.isConnectWalletModalVisbile = true}>connect</Button>}
  </>
})

const WalletConnected = () => {
  const [{data}, disconnect] = useAccount({fetchEns: true})
  const {displayName} = useDisplayName(data?.address)
  const [{data: networkData}] = useNetwork()
  return <Dropdown trigger={<Button>{displayName}</Button>}>
    <Dropdown.Item>
      <DSLLink href={`/profile/${data!.address}`} type={LinkType.Secondary} size={LinkSize.lg}>
        profile
      </DSLLink>
    </Dropdown.Item>
    <Dropdown.Item>
      <a onClick={() => {
        disconnect()
        AppStore.auth.logout()
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
