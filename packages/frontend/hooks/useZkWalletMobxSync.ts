import {useAccount, useNetwork, useSigner} from "wagmi";
import {useEffect} from "react";
import {Signer} from "ethers";
import {vars} from "../environment/vars";
import {appStore} from "../store/App.store";

const useZkWalletMobxSync = () => {
    const [{data: signer}] = useSigner()
    const [{data: networkData}] = useNetwork()
    const [{data: accountData}, disconnect] = useAccount()
    useEffect(() => {
        const getZkWallet = async (_signer: Signer) => {
            try {
                await appStore.auth.connect(_signer)
            } catch (e) {
                console.error(e)
                disconnect()
                appStore.auth.logout()
            }
        }

        const runSync = async () => {
            try {
                if (signer && networkData.chain?.id === vars.TARGET_CHAIN_ID) {
                    const zkAddress = appStore.auth.wallet?.address()
                    const accountAddress = accountData?.address
                    console.log("checking zkAddress & accountAddress", zkAddress, accountAddress)
                    if (zkAddress !== accountAddress && !appStore.auth.isWalletConnecting) {
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
        isZkWalletConnected: appStore.auth.isWalletConnected
    }
}

export default useZkWalletMobxSync
