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
import {vars} from "../../environment";
import useDisplayName from "../../hooks/useDisplayName";

const ConnectWallet = observer(() => {
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

    if (signer && networkData.chain?.id === vars.TARGET_CHAIN_ID) {
      console.log("debug:: hit 1", signer, networkData.chain?.id, vars.TARGET_CHAIN_ID, loading)
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
          const {error} = await changeNetwork(vars.TARGET_CHAIN_ID)
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

    if (networkData.chain && networkData.chain?.id !== vars.TARGET_CHAIN_ID) {
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
    <Modal open={modalOpen} onChange={(value) => setModalOpen(value)} title={"Connect a Wallet"}>
      <div className={css("flex", "flex-col")}>
        {data.connectors.filter(connector => connector.ready).map((connector, index) => {
          return <div className={css({"mt-6": index !== 0})} key={connector.id}>
            <Button
              block
              variant={ButtonType.Black}
              size={ButtonSize.lg}
              onClick={() => connect(connector)}
              className={{
                "from-metamask-150": connector.name === "MetaMask",
                "via-metamask-100": connector.name === "MetaMask",
                "to-metamask-50": connector.name === "MetaMask",
                "from-coinbase-150": connector.name === "Coinbase Wallet",
                "via-coinbase-100": connector.name === "Coinbase Wallet",
                "to-coinbase-50": connector.name === "Coinbase Wallet",
                "from-walletConnect-150": connector.name === "WalletConnect",
                "via-walletConnect-100": connector.name === "WalletConnect",
                "to-walletConnect-50": connector.name === "WalletConnect"
              }}
            >
             <div className={css("flex", "items-center")}>
               <Image src={connectorImageSrcMap[connector.id as connectorIds]} width={50} height={50}/>
               <div className={css("ml-4", "text-xl", "font-mono")}>
                 {connector.name}
               </div>
             </div>
            </Button>
          </div>
        })}
        <div className={css("mt-6", "text-lg", "text-neutral-400")}>
          <div className={css("text-center")}>
            New to Ethereum?
          </div>
          <div className={css("text-center")}>
            <a
              target={"_blank"}
              rel={"noreferrer"}
              href={"https://ethereum.org/en/wallets/find-wallet/"}
              className={css("hover:underline", "hover:cursor-pointer", "hover:text-zz-150")}>Get a wallet</a>
          </div>
        </div>
      </div>
    </Modal>
  </>
}

const WalletConnected = () => {
  const [{data}, disconnect] = useAccount({fetchEns: true})
  const {displayName} = useDisplayName(data?.address)
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
