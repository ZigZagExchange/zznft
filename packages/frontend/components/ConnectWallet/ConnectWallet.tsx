import {useAccount, useConnect} from "wagmi";
import * as RadixDialog from "@radix-ui/react-dialog";
import classNames from "classnames";
import React, {useState} from "react";
import Button from "../Button/Button";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const ConnectWallet = () => {
  const [{data}] = useAccount({fetchEns: true})
  return <>
    {data && <WalletConnected/>}
    {!data && <ConnectWalletButton/>}
  </>
}

const ConnectWalletButton = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [{data: connectData, error: connectError}, connect] = useConnect()

  return <RadixDialog.Root open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
    <RadixDialog.Trigger asChild>
      <Button onClick={() => setModalOpen(true)}>connect</Button>
    </RadixDialog.Trigger>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={classNames("fixed", "bg-green-50")}/>
      <RadixDialog.Content
        style={{transform: "translate(-50%, -50%)"}}
        className={classNames("bg-white", "rounded-sm", "top-1/2", "left-1/2", "fixed")}>
        <RadixDialog.Title>Connect Wallet</RadixDialog.Title>
        <RadixDialog.Description>Connect that shit yo</RadixDialog.Description>
        <div className={classNames("flex", "flex-col")}>
          {connectData.connectors.map((connector) => <Button onClick={() => {
            connect(connector).then(() => setModalOpen(false))
          }}>
            <div key={connector.id}>
              {connector.name}
              {!connector.ready && <span className={classNames("text-red-600")}>unsupported</span>}
            </div>
          </Button>)}
        </div>
        {connectError && <div>{connectError.message ?? "Failed to Connect"}</div>}
        <RadixDialog.Close>close</RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
}

const WalletConnected = () => {
  const [{data, error}, disconnect] = useAccount({fetchEns: true})
  const [open, setOpen] = useState(false)


  return <div>
    <RadixDropdown.Root open={open} onOpenChange={() => setOpen(!open)}>
      <RadixDropdown.Trigger asChild>
        <Button onClick={() => setOpen(true)}>{data!.ens?.name ? data!.ens.name : data!.address}</Button>
      </RadixDropdown.Trigger>

      <RadixDropdown.Content style={{minWidth: "220px"}} className={classNames("bg-white")}>
        <RadixDropdown.Item>
          <Link href={`/profile/${data!.address}`}>
            <a>profile</a>
          </Link>
        </RadixDropdown.Item>
      </RadixDropdown.Content>
    </RadixDropdown.Root>
  </div>
}


export default ConnectWallet
