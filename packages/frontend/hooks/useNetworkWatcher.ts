import {useAccount, useNetwork} from "wagmi";
import useWindowFocus from "./useWindowFocus";
import {useEffect, useState} from "react";
import {errorToast} from "../components/Toast/toast";
import {vars} from "../environment/vars";
import {AppStore} from "../store/AppStore";

const useNetworkWatcher = () => {
    // forces user to be connected the correct network

    const [{data: networkData}, changeNetwork] = useNetwork()
    const [, disconnect] = useAccount()
    const {isWindowFocused} = useWindowFocus()
    const [isTargetChainConnected, setIsTargetChainConnected] = useState(false)

    useEffect(() => {
        const syncChainToTarget = async () => {
            if (changeNetwork) {
                try {
                    const {error} = await changeNetwork(vars.TARGET_CHAIN_ID)
                    setIsTargetChainConnected(true)
                    if (error) {
                        console.log("debug:: changeNetwork hit", error)
                        throw new Error("Error connecting to correct network")
                    }
                } catch (e) {
                    errorToast("Please reconnect on correct chain")
                    disconnect()
                    AppStore.auth.logout()
                    setIsTargetChainConnected(false)
                }
            } else {
                errorToast("Please reconnect on correct chain")
                disconnect()
                AppStore.auth.logout()
                setIsTargetChainConnected(false)
            }
        }

        if (networkData.chain) {
            console.log("connected chain:", networkData.chain?.id)
            if (networkData.chain?.id !== vars.TARGET_CHAIN_ID && isWindowFocused) {
                syncChainToTarget()
            } else {
                setIsTargetChainConnected(true)
            }
        } else {
            setIsTargetChainConnected(false)
        }
    }, [networkData.chain?.id, isWindowFocused])
    return {
        isTargetChainConnected
    }
}

export default useNetworkWatcher
