import {useAccount, useConnect, useNetwork, useSigner} from "wagmi";
import React, {useEffect, useState} from "react";
import Button, {ButtonSize, ButtonType} from "../Button/Button";
import Link from "next/link";
import {abbreviate} from "../../helpers/strings";
import {css} from "../../helpers/css";
import Modal from "../Modal/Modal";
import {connectorIds, connectorImageSrcMap} from "../../services/wagmi";
import Image from "next/image"
import {debugToast, errorToast} from "../Toast/toast";
import Dropdown from "../Dropdown/Dropdown";
import {useStore} from "../../store/App.store";
import {observer} from "mobx-react";

const ConnectWallet = observer(() => {
  const targetChainId = Number(process.env.NEXT_PUBLIC_ETHEREUM_TARGET_CHAIN)
  const [{data: accountData}, disconnect] = useAccount()
  const [{data: signer}] = useSigner()
  const [{data: networkData}, changeNetwork] = useNetwork()
  const [{loading}] = useConnect()
  const store = useStore()

  useEffect(() => {
    const getZkWallet = async () => {
      try {
        await store.zk.connect(signer!)
      } catch (e) {
        console.error("debug:: error connecting to zksync wallet", e)
        errorToast("Could not get zkWallet")
        disconnect()
        store.zk.disconnect()
      }
    }

    if (signer && networkData.chain?.id === targetChainId) {
      console.log("debug:: hit 1", signer, networkData.chain?.id, targetChainId, loading)
      if (store.zk.wallet?.address() !== accountData?.address) {
        console.log("debug:: hit 2", store.zk.wallet?.address(), accountData?.address, loading)
        getZkWallet()
      }
    }
  }, [signer, accountData?.address, networkData.chain?.id])

  // force connecting to the correct chain
  useEffect(() => {
    const syncChainToTarget = async () => {
      if (changeNetwork) {
        try {
          const {error} = await changeNetwork(targetChainId)
          if (error) {
            console.log("debug:: changeNetwork hit", error)
            throw Error()
          }
        } catch (e) {
          errorToast("Please reconnect on correct chain")
          disconnect()
          store.zk.disconnect()
        }
      } else {
        errorToast("Please reconnect on correct chain")
        disconnect()
        store.zk.disconnect()
      }
    }

    if (networkData.chain && networkData.chain?.id !== targetChainId) {
      syncChainToTarget()
    }
  }, [networkData.chain?.id])

  return <>
    {loading ? <div>loading</div> : null}
    {accountData && <WalletConnected/>}
    {!accountData && <ConnectWalletButton/>}
  </>
})

const ConnectWalletButton = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [{data}, connect] = useConnect()
  return <>
    <Button onClick={() => setModalOpen(true)}>connect</Button>
    <Modal open={modalOpen} onChange={(value) => setModalOpen(value)} title={"Connect Wallet"}>
      <div className={css("flex", "flex-col")}>
        {data.connectors.map((connector, index) => {
          return <div className={css({"mt-6": index !== 0})} key={connector.id}>
            <Button
              block
              variant={ButtonType.Black}
              size={ButtonSize.lg}
              onClick={() => connect(connector)}>
             <div className={css("flex", "items-center")}>
               <Image src={connectorImageSrcMap[connector.id as connectorIds]} width={50} height={50}/>
               <div className={css("ml-4", "text-white", "text-xl", "font-mono")}>
                 {connector.name}
                 {!connector.ready && <span className={css("text-red-600")}>unsupported</span>}
               </div>
             </div>
            </Button>
          </div>
        })}
      </div>
    </Modal>
  </>
}

const WalletConnected = () => {
  const [{data}, disconnect] = useAccount({fetchEns: true})
  const displayName = data!.ens?.name ? data!.ens.name : abbreviate(data!.address)
  const [{data: networkData}] = useNetwork()
  const store = useStore()
  return <Dropdown trigger={<Button>{displayName}</Button>}>
    <Dropdown.Item>
      <Link href={`/profile/${data!.address}`}>
        <a className={css("hover:underline", "text-lg")}>profile</a>
      </Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <a onClick={() => {
        disconnect()
        store.zk.disconnect()
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
