import {css} from "../helpers/css";
import {useMemo} from "react";
import MintPageStore, {MintView} from "../store/MintPage.store";
import {observer} from "mobx-react";
import MintEdit from "../components/Mint/MintEdit";
import MintPreview from "../components/Mint/MintPreview";
import MintSelect from "../components/Mint/MintSelect";
import {appStore} from "../store/App.store";

const Mint = observer(() => {
  const store = useMemo(() => new MintPageStore(), [])
  return <div className={css("h-full", "w-full", "flex", "justify-center", "items-center")}>
    {appStore.auth.isAuthed && <>
      {store.currentView === MintView.Select && <MintSelect store={store}/>}
      {store.currentView === MintView.Edit && <MintEdit store={store}/>}
      {store.currentView == MintView.Preview && <MintPreview store={store}/>}
    </>}
    {!appStore.auth.isAuthed && <ConnectWalletWarning/>}
  </div>
})

const ConnectWalletWarning = observer(() => {
  return <div>
    <div>Please connect your wallet to mint</div>
  </div>
})

export default Mint
