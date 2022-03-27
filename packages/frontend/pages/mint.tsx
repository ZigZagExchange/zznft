import {css} from "../helpers/css";
import {useMemo} from "react";
import MintPageStore, {MintView} from "../store/MintPage.store";
import {observer} from "mobx-react";
import {useAppStore} from "../store/App.store";
import MintEdit from "../components/Mint/MintEdit";
import MintPreview from "../components/Mint/MintPreview";
import MintSelect from "../components/Mint/MintSelect";

const Mint = observer(() => {
  const appStore = useAppStore()
  const store = useMemo(() => new MintPageStore(), [])
  return <div className={css("h-full", "w-full", "flex", "justify-center", "items-center")}>
    {/*{appStore.zk.isConnected && <>*/}
      {store.currentView === MintView.Select && <MintSelect store={store}/>}
      {store.currentView === MintView.Edit && <MintEdit store={store}/>}
      {store.currentView == MintView.Preview && <MintPreview store={store}/>}
    {/*</>}*/}
    {/*{!appStore.zk.isConnected && <ConnectWalletWarning/>}*/}
  </div>
})

const ConnectWalletWarning = observer(() => {
  return <div>
    <div>Please connect your wallet to mint</div>
  </div>
})

export default Mint
