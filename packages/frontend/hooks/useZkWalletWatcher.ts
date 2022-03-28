import {useAppStore} from "../store/App.store";
import {useAccount, useConnect, useNetwork, useSigner} from "wagmi";
import {useEffect} from "react";
import {errorToast} from "../components/Toast/toast";
import {Signer} from "ethers";
import {vars} from "../environment/vars";

const useZkWalletConnector = () => {
    // sets zkwallet to app store

    const store = useAppStore()
    const [{data: signer}] = useSigner()
    const [{data: networkData}, changeNetwork] = useNetwork()
    const [{data: accountData}, disconnect] = useAccount()
    const [{loading}] = useConnect()

    useEffect(() => {
        const getZkWallet = async (_signer: Signer) => {
            try {
                await store.zk.connect(_signer)
            } catch (e) {
                console.error("debug:: error connecting to zksync wallet", e)
                errorToast("Could not get zkWallet")
                disconnect()
                store.zk.disconnect()
            }
        }

        const runSync = async () => {
            try {
                if (signer && networkData.chain?.id === vars.TARGET_CHAIN_ID) {
                    const zkAddress = store.zk.wallet?.address()
                    const accountAddress = accountData?.address
                    console.log("checking zkAddress & accountAddress", zkAddress, accountAddress)
                    if (zkAddress !== accountAddress && !store.zk.isWalletConnecting) {
                        await getZkWallet(signer)
                    }
                }
            } catch (e) {
                console.log("????")
            }
        }

        runSync()

    }, [signer, accountData?.address, networkData.chain?.id])
    return  {
        isZkWalletConnected: store.zk.isConnected
    }
}

export default useZkWalletConnector
