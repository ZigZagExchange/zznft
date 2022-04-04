import {css} from "../helpers/css";
import {useMemo} from "react";
import MintPageStore, {MintView} from "../store/MintPage.store";
import {observer} from "mobx-react";
import MintEdit from "../components/Mint/MintEdit";
import MintSubmit from "../components/Mint/MintSubmit";
import MintSelect from "../components/Mint/MintSelect";
import {AppStore} from "../store/AppStore";
import MintReceipt from "../components/Mint/MintReceipt";

const Mint = observer(() => {
  const store = useMemo(() => new MintPageStore(), [])
  return <div className={css("h-full", "w-full", "flex", "justify-center", "items-center")}>
    {AppStore.auth.isAuthed && <>
      {store.currentView === MintView.Select && <MintSelect store={store}/>}
      {store.currentView === MintView.Edit && <MintEdit store={store}/>}
      {store.currentView === MintView.Submit && <MintSubmit store={store}/>}
      {store.currentView === MintView.Receipt && <MintReceipt store={store}/>}
    </>}
    {!AppStore.auth.isAuthed && <ConnectWalletWarning/>}
  </div>
})

const ConnectWalletWarning = observer(() => {
  return <div>
    <div>Please connect your wallet to mint</div>
  </div>
})

export default Mint
