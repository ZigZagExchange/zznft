import {useAccount, useNetwork, useSigner} from "wagmi";
import {useEffect} from "react";
import {Signer} from "ethers";
import {vars} from "../environment/vars";
import {AppStore} from "../store/AppStore";

const useZkWalletMobxSync = () => {
    const [{data: signer}] = useSigner()
    const [{data: networkData}] = useNetwork()
    const [{data: accountData}, disconnect] = useAccount()
    useEffect(() => {
        const getZkWallet = async (_signer: Signer) => {
            try {
                await AppStore.auth.connect(_signer)
            } catch (e) {
                console.error("disconnecting wallets:", e)
                disconnect()
                AppStore.auth.logout()
            }
        }

        const runSync = async () => {
            try {
                if (signer && networkData.chain?.id === vars.TARGET_CHAIN_ID) {
                    const zkAddress = AppStore.auth.wallet?.address()
                    const accountAddress = accountData?.address
                    if (zkAddress !== accountAddress && !AppStore.auth.isWalletConnecting) {
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
        isZkWalletConnected: AppStore.auth.isWalletConnected
    }
}

export default useZkWalletMobxSync
