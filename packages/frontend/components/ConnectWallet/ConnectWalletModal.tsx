import {css} from "../../helpers/css";
import Button, {ButtonSize, ButtonType} from "../Button/Button";
import Image from "next/image";
import {connectorIds, connectorImageSrcMap} from "../../config/connectors";
import Modal from "../Modal/Modal";
import React from "react";
import {useConnect} from "wagmi";
import {AppStore} from "../../store/AppStore";
import {observer} from "mobx-react";
import Link, {LinkType} from "../Link/Link";

interface ConnectWalletModalProps {

}

const ConnectWalletModal = observer(({}: ConnectWalletModalProps) => {
  const [{data}, connect] = useConnect()
  return <Modal
    open={AppStore.modals.isConnectWalletModalVisbile}
    onChange={(isOpen) => AppStore.modals.isConnectWalletModalVisbile = isOpen}
    title={"Connect a Wallet"}
  >
    <div className={css("flex", "flex-col")}>
      {data.connectors.filter(connector => connector.ready).map((connector, index) => {
        return <div className={css({"mt-6": index !== 0})} key={connector.id}>
          <Button
            block
            type={ButtonType.Black}
            size={ButtonSize.lg}
            onClick={() => {
              connect(connector).then(() => AppStore.modals.isConnectWalletModalVisbile = false)
            }}
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
        <div className={css("text-center", "mt-2")}>
          <Link
            type={LinkType.Grey}
            isExternal
            href={"https://ethereum.org/en/wallets/find-wallet/"}
          >
            Get a wallet
          </Link>
        </div>
      </div>
    </div>
  </Modal>
})

export default ConnectWalletModal